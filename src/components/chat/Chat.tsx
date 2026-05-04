'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowDown, Menu } from 'lucide-react'

import { useChatStore } from '@/lib/chat/storage'
import { fakeStream } from '@/lib/chat/streaming'
import { pickCitations, placeholderReplyFor } from '@/lib/chat/citations'
import type { Conversation, Message } from '@/lib/chat/types'
import type { SlashCommand } from '@/lib/chat/commands'
import { siteConfig } from '@/lib/config'

import Sidebar from './Sidebar'
import EmptyState from './EmptyState'
import MessageRow from './MessageRow'
import InputBar from './InputBar'
import Toast from './Toast'

// ── UTF-8 safe base64 (used by share-URL encode/decode) ───────────────
// `escape`/`unescape` are deprecated and corrupt astral-plane characters
// (emoji, CJK). TextEncoder is the right tool.
function utf8ToBase64(s: string): string {
  const bytes = new TextEncoder().encode(s)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}
function base64ToUtf8(b64: string): string {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

// ── Validation for shared payloads ────────────────────────────────────
// We accept untrusted JSON from the URL; coerce to a known shape and
// drop anything else. Markdown link safety is handled separately by
// `Markdown.tsx`'s `urlTransform`.
interface SharedPayload {
  title?: string
  messages?: Message[]
}
function validateSharedPayload(raw: unknown): SharedPayload | null {
  if (!raw || typeof raw !== 'object') return null
  const obj = raw as Record<string, unknown>
  const out: SharedPayload = {}
  if (typeof obj.title === 'string') out.title = obj.title.slice(0, 200)
  if (Array.isArray(obj.messages)) {
    out.messages = obj.messages
      .filter(
        (m): m is Message =>
          !!m &&
          typeof m === 'object' &&
          typeof (m as Message).role === 'string' &&
          ((m as Message).role === 'user' ||
            (m as Message).role === 'assistant') &&
          typeof (m as Message).content === 'string',
      )
      .map((m) => ({
        id: String((m as Message).id ?? ''),
        role: (m as Message).role,
        content: String((m as Message).content),
        createdAt:
          typeof (m as Message).createdAt === 'number'
            ? (m as Message).createdAt
            : Date.now(),
        // Drop streaming/feedback/stopped flags from imported chats —
        // they shouldn't carry over.
      }))
  }
  return out
}

export default function Chat() {
  const store = useChatStore()
  const searchParams = useSearchParams()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [scrolledUp, setScrolledUp] = useState(false)
  const [, startTransition] = useTransition()
  const [toast, setToast] = useState<{ message: string; visible: boolean }>(
    { message: '', visible: false },
  )
  // Holds the most recent assistant message content for screen-reader
  // announcement on stream completion. Drives the polite live region.
  const [announce, setAnnounce] = useState('')

  const cancelRef = useRef<(() => void) | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const autoSentRef = useRef(false)
  const importedShareRef = useRef(false)
  const generatingRef = useRef(false)
  generatingRef.current = generating

  const {
    hydrated,
    conversations,
    activeId,
    activeConversation,
    newConversation,
    setActive,
    deleteConversation,
    renameConversation,
    appendMessage,
    updateMessage,
    removeMessagesFrom,
    uid,
  } = store

  const messages: Message[] = activeConversation?.messages ?? []
  const isEmpty = messages.length === 0

  // ── auto-scroll on new content (unless user has scrolled up) ──
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    if (scrolledUp) return
    el.scrollTop = el.scrollHeight
  }, [messages, generating, scrolledUp])

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const distance = el.scrollHeight - el.clientHeight - el.scrollTop
    setScrolledUp(distance > 80)
  }

  function scrollToBottom() {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    setScrolledUp(false)
  }

  // ── send a user message and start generating an assistant reply ──
  // Stable across renders because all dependencies (store callbacks +
  // refs) are themselves stable. `generating` is read via ref.
  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || generatingRef.current) return

      let convoId = activeId
      if (!convoId) convoId = newConversation()
      if (!convoId) return

      const userMsg: Message = {
        id: uid(),
        role: 'user',
        content: trimmed,
        createdAt: Date.now(),
      }
      appendMessage(convoId, userMsg)

      const assistantMsg: Message = {
        id: uid(),
        role: 'assistant',
        content: '',
        streaming: true,
        citations: pickCitations(trimmed),
        createdAt: Date.now(),
      }
      appendMessage(convoId, assistantMsg)

      setGenerating(true)
      setScrolledUp(false)

      const stream = fakeStream(placeholderReplyFor(trimmed), {
        charsPerSecond: 70,
        onToken: (partial) => {
          updateMessage(convoId!, assistantMsg.id, { content: partial })
        },
        onDone: (final, cancelled) => {
          updateMessage(convoId!, assistantMsg.id, {
            content: final,
            streaming: false,
            stopped: cancelled,
          })
          setGenerating(false)
          // Announce the final reply once for screen-reader users.
          setAnnounce(final)
          cancelRef.current = null
        },
      })
      cancelRef.current = stream.cancel
    },
    [activeId, newConversation, appendMessage, updateMessage, uid],
  )

  // Keep a ref to send so the auto-send effect can call it without
  // depending on `send` (which would re-run on every activeId change).
  const sendRef = useRef(send)
  useEffect(() => {
    sendRef.current = send
  }, [send])

  // ── Cancel any in-flight stream on unmount ──
  useEffect(() => {
    return () => {
      cancelRef.current?.()
    }
  }, [])

  // ── auto-send `?q=...` deep links once per page load ──
  useEffect(() => {
    if (autoSentRef.current) return
    if (!hydrated) return
    const q = searchParams?.get('q')?.trim()
    if (q) {
      autoSentRef.current = true
      sendRef.current(q)
    }
  }, [hydrated, searchParams])

  // ── decode `?share=...` once on first hydration ──
  useEffect(() => {
    if (importedShareRef.current) return
    if (!hydrated) return
    const encoded = searchParams?.get('share')
    if (!encoded) return
    importedShareRef.current = true
    try {
      const json = base64ToUtf8(encoded)
      const incoming = validateSharedPayload(JSON.parse(json))
      if (!incoming) throw new Error('invalid share payload')
      const newId = newConversation()
      if (incoming.title) renameConversation(newId, incoming.title)
      for (const m of incoming.messages ?? []) {
        appendMessage(newId, { ...m, id: uid() })
      }
      const url = new URL(window.location.href)
      url.searchParams.delete('share')
      window.history.replaceState({}, '', url.toString())
      setToast({ message: 'Shared chat imported', visible: true })
    } catch {
      setToast({ message: "Couldn't load shared chat", visible: true })
    }
  }, [
    hydrated,
    searchParams,
    appendMessage,
    newConversation,
    renameConversation,
    uid,
  ])

  // ── Stop generating ──
  function stop() {
    cancelRef.current?.()
  }

  // ── Regenerate: truncate from the user msg before this assistant
  //    reply, then re-stream. Removing both the assistant AND its prior
  //    user message — `send` will append a fresh user message with the
  //    same content, avoiding the duplicate that the previous version
  //    produced. ──
  function regenerate(assistantId: string) {
    if (!activeConversation || generating) return
    const idx = activeConversation.messages.findIndex(
      (m) => m.id === assistantId,
    )
    if (idx < 1) return
    const prior = activeConversation.messages[idx - 1]
    if (prior.role !== 'user') return
    removeMessagesFrom(activeConversation.id, prior.id)
    send(prior.content)
  }

  function setFeedback(messageId: string, verdict: 'up' | 'down') {
    if (!activeConversation) return
    const current = activeConversation.messages.find(
      (m) => m.id === messageId,
    )
    const next = current?.feedback === verdict ? null : verdict
    updateMessage(activeConversation.id, messageId, { feedback: next })
  }

  function handleCommand(cmd: SlashCommand) {
    if (cmd.payload.kind === 'reset') {
      cancelRef.current?.()
      newConversation()
      // After resetting, return focus to the textarea so the user can
      // start typing immediately.
      requestAnimationFrame(() => textareaRef.current?.focus())
      return
    }
    if (cmd.payload.kind === 'mailto') {
      window.location.href = cmd.payload.href
      return
    }
    if (cmd.payload.kind === 'feedback') {
      window.location.href = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent('BlezBot feedback')}`
      return
    }
  }

  function handleShare(conversationId: string) {
    const c: Conversation | undefined = conversations.find(
      (x) => x.id === conversationId,
    )
    if (!c) return
    try {
      const payload: SharedPayload = {
        title: c.title,
        messages: c.messages.map((m) => ({
          ...m,
          // Strip transient state from shared copies.
          streaming: undefined,
          stopped: undefined,
          feedback: null,
        })),
      }
      const encoded = utf8ToBase64(JSON.stringify(payload))
      const shareUrl = `${window.location.origin}/chat?share=${encoded}`
      navigator.clipboard.writeText(shareUrl)
      setToast({ message: 'Share link copied', visible: true })
    } catch {
      setToast({ message: "Couldn't copy share link", visible: true })
    }
  }

  function selectConversation(id: string) {
    // Switching can re-render a long message list — wrap in a
    // transition so it doesn't block the click.
    startTransition(() => setActive(id))
    setSidebarOpen(false)
    requestAnimationFrame(() => textareaRef.current?.focus())
  }

  function startNewConversation() {
    cancelRef.current?.()
    newConversation()
    setSidebarOpen(false)
    requestAnimationFrame(() => textareaRef.current?.focus())
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] min-h-[520px] overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={selectConversation}
        onNew={startNewConversation}
        onDelete={deleteConversation}
        onShare={handleShare}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <section className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center gap-2 border-b border-[var(--border-subtle)] px-3 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open conversations"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--blez-blue-ghost)] hover:text-[var(--text-primary)]"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>
          <div className="flex-1 truncate text-sm font-medium text-[var(--text-primary)]">
            {activeConversation?.title ?? 'BlezBot'}
          </div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="relative flex-1 overflow-y-auto"
          aria-label="Conversation"
        >
          {isEmpty ? (
            <EmptyState onPick={send} />
          ) : (
            <ul className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 sm:px-8">
              {messages.map((m) => (
                <li key={m.id}>
                  <MessageRow
                    message={m}
                    onCopy={() =>
                      setToast({ message: 'Copied', visible: true })
                    }
                    onFeedback={
                      m.role === 'assistant'
                        ? (v) => setFeedback(m.id, v)
                        : undefined
                    }
                    onRegenerate={
                      m.role === 'assistant' && !m.streaming
                        ? () => regenerate(m.id)
                        : undefined
                    }
                  />
                </li>
              ))}
            </ul>
          )}

          {scrolledUp && (
            <div className="sticky bottom-3 z-10 mx-auto flex w-fit -translate-y-2">
              <button
                type="button"
                onClick={scrollToBottom}
                aria-label="Scroll to latest"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] shadow-[var(--shadow-md)] transition-colors hover:text-[var(--text-primary)]"
              >
                <ArrowDown className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          )}
        </div>

        {/* Polite live region for SR users — announces only the final
            assistant reply text, not every streamed token. */}
        <div role="status" aria-live="polite" className="sr-only">
          {announce}
        </div>

        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]/85 backdrop-blur">
          <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-8">
            <InputBar
              ref={textareaRef}
              generating={generating}
              onSubmit={send}
              onStop={stop}
              onCommand={handleCommand}
            />
            <p className="mt-2 text-center text-xs text-[var(--text-faint)]">
              Replies are AI-generated and can be wrong on account-specific
              questions.
            </p>
          </div>
        </div>
      </section>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </div>
  )
}
