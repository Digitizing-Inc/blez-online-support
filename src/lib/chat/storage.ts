'use client'

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react'
import type { ChatStore, Conversation, Message } from './types'

const STORAGE_KEY = 'blez-support-chat'
const SCHEMA_VERSION = 1
const SAVE_DEBOUNCE_MS = 250

interface PersistedEnvelope {
  version: number
  store: ChatStore
}

function uid(): string {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }
  return `id-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`
}

function emptyStore(): ChatStore {
  return { conversations: [], activeId: null }
}

/**
 * Read persisted store. Migrates older payloads if/when the version
 * field doesn't match — for now there's only one version, so any other
 * shape is treated as malformed and dropped.
 */
function loadStore(): ChatStore {
  if (typeof window === 'undefined') return emptyStore()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyStore()
    const parsed = JSON.parse(raw) as Partial<PersistedEnvelope> | ChatStore
    // New envelope shape
    if (
      parsed &&
      typeof parsed === 'object' &&
      'version' in parsed &&
      parsed.version === SCHEMA_VERSION &&
      parsed.store &&
      Array.isArray(parsed.store.conversations)
    ) {
      return parsed.store
    }
    // Legacy: pre-versioned payload was the bare store
    if (
      parsed &&
      typeof parsed === 'object' &&
      'conversations' in parsed &&
      Array.isArray((parsed as ChatStore).conversations)
    ) {
      return parsed as ChatStore
    }
    return emptyStore()
  } catch {
    return emptyStore()
  }
}

function saveStore(store: ChatStore) {
  if (typeof window === 'undefined') return
  try {
    const env: PersistedEnvelope = { version: SCHEMA_VERSION, store }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(env))
  } catch {
    /* quota or private mode — silently drop */
  }
}

function titleFromMessage(text: string): string {
  const trimmed = text.trim().replace(/\s+/g, ' ')
  if (trimmed.length <= 60) return trimmed
  return trimmed.slice(0, 57) + '…'
}

function isStreaming(store: ChatStore): boolean {
  for (const c of store.conversations) {
    for (const m of c.messages) {
      if (m.streaming) return true
    }
  }
  return false
}

/**
 * Local-only chat persistence. Conversations live in localStorage. The
 * dev wiring the backend should swap `loadStore` / `saveStore` for a
 * real fetch + sync layer (and likely add an account id to the key).
 *
 * Saves are debounced 250ms AND skipped while any message is actively
 * streaming — token-tick updates would otherwise hammer localStorage.
 * The trailing save catches the final state when streaming stops.
 */
export function useChatStore() {
  const [store, setStore] = useState<ChatStore>(() => emptyStore())
  const [hydrated, setHydrated] = useState(false)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setStore(loadStore())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      // While streaming, defer until we get a non-streaming snapshot.
      if (isStreaming(store)) return
      saveStore(store)
    }, SAVE_DEBOUNCE_MS)
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [store, hydrated])

  // Flush on unload so the user doesn't lose anything mid-stream.
  useEffect(() => {
    if (!hydrated) return
    const flush = () => saveStore(store)
    window.addEventListener('beforeunload', flush)
    return () => window.removeEventListener('beforeunload', flush)
  }, [store, hydrated])

  const activeConversation: Conversation | null = useMemo(() => {
    if (!store.activeId) return null
    return store.conversations.find((c) => c.id === store.activeId) ?? null
  }, [store.activeId, store.conversations])

  const newConversation = useCallback(() => {
    const id = uid()
    const now = Date.now()
    const fresh: Conversation = {
      id,
      title: 'New chat',
      createdAt: now,
      updatedAt: now,
      messages: [],
    }
    setStore((s) => ({
      conversations: [fresh, ...s.conversations],
      activeId: id,
    }))
    return id
  }, [])

  const setActive = useCallback((id: string) => {
    setStore((s) => ({ ...s, activeId: id }))
  }, [])

  const deleteConversation = useCallback((id: string) => {
    setStore((s) => {
      const filtered = s.conversations.filter((c) => c.id !== id)
      const newActive =
        s.activeId === id ? filtered[0]?.id ?? null : s.activeId
      return { conversations: filtered, activeId: newActive }
    })
  }, [])

  const renameConversation = useCallback((id: string, title: string) => {
    setStore((s) => ({
      ...s,
      conversations: s.conversations.map((c) =>
        c.id === id ? { ...c, title, updatedAt: Date.now() } : c,
      ),
    }))
  }, [])

  const appendMessage = useCallback(
    (conversationId: string, message: Message) => {
      setStore((s) => ({
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                messages: [...c.messages, message],
                updatedAt: Date.now(),
                title:
                  c.title === 'New chat' && message.role === 'user'
                    ? titleFromMessage(message.content)
                    : c.title,
              }
            : c,
        ),
      }))
    },
    [],
  )

  const updateMessage = useCallback(
    (conversationId: string, messageId: string, patch: Partial<Message>) => {
      setStore((s) => ({
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === messageId ? { ...m, ...patch } : m,
                ),
                updatedAt: Date.now(),
              }
            : c,
        ),
      }))
    },
    [],
  )

  /**
   * Remove `messageId` AND every message after it. Used by regenerate to
   * truncate back to the user message before the assistant reply.
   */
  const removeMessagesFrom = useCallback(
    (conversationId: string, messageId: string) => {
      setStore((s) => ({
        ...s,
        conversations: s.conversations.map((c) => {
          if (c.id !== conversationId) return c
          const idx = c.messages.findIndex((m) => m.id === messageId)
          if (idx < 0) return c
          return {
            ...c,
            messages: c.messages.slice(0, idx),
            updatedAt: Date.now(),
          }
        }),
      }))
    },
    [],
  )

  return {
    hydrated,
    conversations: store.conversations,
    activeId: store.activeId,
    activeConversation,
    newConversation,
    setActive,
    deleteConversation,
    renameConversation,
    appendMessage,
    updateMessage,
    removeMessagesFrom,
    uid,
  }
}
