'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Plus, Search, X, MessageSquare, Trash2, Share2 } from 'lucide-react'
import type { Conversation } from '@/lib/chat/types'
import { cn } from '@/lib/cn'

interface SidebarProps {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
  onShare: (id: string) => void
  /** Mobile-only: true when sidebar is open as a drawer. */
  open: boolean
  onClose: () => void
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts
  const m = 60_000
  const h = 60 * m
  const d = 24 * h
  if (diff < m) return 'just now'
  if (diff < h) return `${Math.floor(diff / m)}m ago`
  if (diff < d) return `${Math.floor(diff / h)}h ago`
  if (diff < 7 * d) return `${Math.floor(diff / d)}d ago`
  return new Date(ts).toLocaleDateString()
}

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  onShare,
  open,
  onClose,
}: SidebarProps) {
  const [query, setQuery] = useState('')
  const asideRef = useRef<HTMLElement>(null)

  // Mobile drawer: close on Esc + trap focus inside the panel so Tab
  // can't escape into the (visually obscured) chat behind the scrim.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const aside = asideRef.current
      if (!aside) return
      const focusables = aside.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const sorted = [...conversations].sort(
      (a, b) => b.updatedAt - a.updatedAt,
    )
    if (!q) return sorted
    return sorted.filter((c) => {
      if (c.title.toLowerCase().includes(q)) return true
      return c.messages.some((m) => m.content.toLowerCase().includes(q))
    })
  }, [conversations, query])

  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        ref={asideRef}
        className={cn(
          'flex h-full w-72 flex-shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-transform duration-200',
          // Drawer behavior on mobile
          'fixed inset-y-0 left-0 z-40 md:static md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
        aria-label="Conversations"
      >
        <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] px-4 py-3">
          <button
            type="button"
            onClick={() => {
              onNew()
              onClose()
            }}
            className="btn btn-primary btn-sm flex-1 justify-center"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            New chat
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--blez-blue-ghost)] hover:text-[var(--text-primary)] md:hidden"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="border-b border-[var(--border-subtle)] px-4 py-3">
          <label className="input-shell h-9 px-3 text-sm">
            <Search
              className="h-4 w-4 text-[var(--text-muted)]"
              strokeWidth={2}
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats"
              aria-label="Search conversations"
              className="text-sm"
            />
          </label>
        </div>

        <ul className="flex-1 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center text-xs text-[var(--text-muted)]">
              {conversations.length === 0
                ? 'No conversations yet.'
                : 'No matches.'}
            </li>
          ) : (
            filtered.map((c) => {
              const isActive = c.id === activeId
              return (
                <li key={c.id}>
                  <div
                    className={cn(
                      'group flex items-center gap-2 px-3 py-2 transition-colors',
                      isActive
                        ? 'bg-[var(--blez-blue-ghost)]'
                        : 'hover:bg-[var(--blez-blue-ghost)]/40',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(c.id)
                        onClose()
                      }}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <MessageSquare
                        className={cn(
                          'h-4 w-4 flex-shrink-0',
                          isActive
                            ? 'text-[var(--blez-blue)]'
                            : 'text-[var(--text-muted)]',
                        )}
                        strokeWidth={2}
                      />
                      <span className="flex flex-col min-w-0">
                        <span className="truncate text-sm text-[var(--text-primary)]">
                          {c.title}
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {relativeTime(c.updatedAt)}
                        </span>
                      </span>
                    </button>
                    <div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                      <button
                        type="button"
                        onClick={() => onShare(c.id)}
                        aria-label="Share conversation"
                        title="Share"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      >
                        <Share2 className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Delete this conversation?')) {
                            onDelete(c.id)
                          }
                        }}
                        aria-label="Delete conversation"
                        title="Delete"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--danger)]"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </li>
              )
            })
          )}
        </ul>

        <div className="border-t border-[var(--border-subtle)] px-4 py-3 text-[11px] text-[var(--text-faint)]">
          Conversations are saved locally on this device.
        </div>
      </aside>
    </>
  )
}
