'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, X, Mail, ArrowRight, Library } from 'lucide-react'
import { search } from '@/lib/search'
import { getUrgentLinks } from '@/lib/quicklinks'
import { siteConfig } from '@/lib/config'
import SearchResultList from './SearchResultList'

const DEBOUNCE_MS = 100

/**
 * Full-screen search overlay opened from the header (and ⌘K / Ctrl-K), so
 * search is reachable from every page — not just the home hero. Unified
 * across help articles + resources, with keyboard navigation, a zero-state
 * of common issues, and a contact fallback on no match.
 */
export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [active, setActive] = useState(0)
  const urgent = useMemo(() => getUrgentLinks(), [])

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query), DEBOUNCE_MS)
    return () => window.clearTimeout(id)
  }, [query])

  const trimmed = query.trim()
  const hits = useMemo(() => (trimmed ? search(trimmed) : []), [trimmed, debounced])

  // Reset + focus on open; lock body scroll while open.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const t = window.setTimeout(() => inputRef.current?.focus(), 20)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => setActive(0), [debounced])

  if (!open) return null

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, hits.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && hits[active]) {
      e.preventDefault()
      onClose()
      router.push(hits[active].href)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center px-4 pt-[10vh] sm:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm"
      />

      <div className="relative z-10 flex max-h-[78vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-xl)]">
        {/* input */}
        <div className="input-shell h-14 rounded-none border-0 border-b border-[var(--border-subtle)]">
          <Search
            className="h-5 w-5 text-[var(--text-muted)]"
            strokeWidth={2}
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search help articles and guides…"
            aria-label="Search help articles and guides"
            aria-activedescendant={
              hits.length ? `dialog-hit-${active}` : undefined
            }
            className="text-base"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--blez-blue-ghost)] hover:text-[var(--text-primary)]"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-y-auto">
          {!trimmed ? (
            <div className="flex flex-col gap-5 p-5">
              <div>
                <p className="eyebrow eyebrow-sm mb-3">Common issues</p>
                <div className="flex flex-wrap gap-2">
                  {urgent.map((u) => (
                    <Link
                      key={u.href}
                      href={u.href}
                      onClick={onClose}
                      className="chip chip-pill"
                    >
                      {u.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/resources"
                onClick={onClose}
                className="flex items-center justify-between gap-3 rounded-md border border-[var(--border-subtle)] px-4 py-3 text-sm transition-colors hover:border-[var(--blez-blue)] hover:no-underline"
              >
                <span className="flex items-center gap-2 text-[var(--text-primary)]">
                  <Library
                    className="h-4 w-4 text-[var(--blez-blue)]"
                    strokeWidth={2}
                  />
                  Browse guides &amp; collecting tips
                </span>
                <ArrowRight
                  className="h-4 w-4 text-[var(--text-muted)]"
                  strokeWidth={2}
                />
              </Link>
            </div>
          ) : hits.length > 0 ? (
            <SearchResultList
              hits={hits}
              idPrefix="dialog-hit"
              activeIndex={active}
              onSelect={onClose}
            />
          ) : (
            <div className="flex flex-col gap-4 p-5">
              <p className="text-sm text-[var(--text-secondary)]">
                No matches for{' '}
                <span className="font-medium text-[var(--text-primary)]">
                  “{trimmed}”
                </span>
                .
              </p>
              <Link
                href={`/contact?subject=${encodeURIComponent(`Help with: ${trimmed}`)}`}
                onClick={onClose}
                className="btn btn-primary btn-sm self-start"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                Contact support
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
