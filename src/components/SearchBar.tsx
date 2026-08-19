'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Search, X, Mail } from 'lucide-react'
import { searchArticles } from '@/lib/topics/search'
import { getTopic } from '@/lib/topics'
import { siteConfig } from '@/lib/config'

const SEARCH_DEBOUNCE_MS = 100

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Debounce the query feeding into MiniSearch so each keystroke isn't a
  // full search. Fast at 52 docs; matters at 500+.
  useEffect(() => {
    const id = window.setTimeout(
      () => setDebouncedQuery(query),
      SEARCH_DEBOUNCE_MS,
    )
    return () => window.clearTimeout(id)
  }, [query])

  const results = useMemo(
    () => searchArticles(debouncedQuery),
    [debouncedQuery],
  )

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('mousedown', onClickOutside)
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('mousedown', onClickOutside)
      window.removeEventListener('keydown', onEsc)
    }
  }, [])

  const trimmed = query.trim()
  const showResults = open && trimmed.length > 0

  return (
    <div ref={containerRef} className="relative">
      <div className="input-shell h-14">
        <Search
          className="h-5 w-5 text-[var(--text-muted)]"
          strokeWidth={2}
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search for answers…"
          aria-label="Search support articles"
          className="text-base"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setOpen(false)
            }}
            aria-label="Clear search"
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--blez-blue-ghost)] hover:text-[var(--text-primary)]"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]">
          {results.length === 0 ? (
            <NoMatchPanel query={trimmed} />
          ) : (
            <ul className="max-h-96 overflow-y-auto py-2">
              {results.map((r) => {
                const topic = getTopic(r.topicSlug)
                return (
                  <li key={`${r.topicSlug}-${r.slug}`}>
                    <Link
                      href={`/articles/${r.topicSlug}/${r.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-1 px-5 py-3 transition-colors hover:bg-[var(--blez-blue-ghost)] hover:no-underline"
                    >
                      <span className="eyebrow eyebrow-sm">
                        {topic?.title ?? r.topicSlug}
                      </span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {r.title}
                      </span>
                      <span className="line-clamp-1 text-xs text-[var(--text-muted)]">
                        {r.summary}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Shown when fuzzy search returns no hits. Always offers a recoverable
 * path — email support with the exact query pre-filled in the subject.
 * A search dead-end without this is the audit's #2 P0 finding.
 */
function NoMatchPanel({ query }: { query: string }) {
  return (
    <div className="flex flex-col gap-4 px-5 py-5">
      <p className="text-sm text-[var(--text-secondary)]">
        No matches for{' '}
        <span className="font-medium text-[var(--text-primary)]">
          “{query}”
        </span>
        .
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <a
          href={`mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(
            `Help with: ${query}`,
          )}`}
          className="btn btn-primary btn-sm flex-1 justify-center"
        >
          <Mail className="h-4 w-4" strokeWidth={2} />
          Email support
        </a>
      </div>
    </div>
  )
}
