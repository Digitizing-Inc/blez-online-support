'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import SearchDialog from './SearchDialog'

/**
 * Header search affordance — makes search reachable from every page (not just
 * the home hero). Opens the shared SearchDialog on click or ⌘K / Ctrl-K.
 */
export default function HeaderSearch() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        return
      }
      // "/" is a common search shortcut — but only when the user isn't
      // already typing into a field (input, textarea, or contenteditable).
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target as HTMLElement | null
        const typing =
          !!t &&
          (t.tagName === 'INPUT' ||
            t.tagName === 'TEXTAREA' ||
            t.isContentEditable)
        if (!typing) {
          e.preventDefault()
          setOpen(true)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        aria-keyshortcuts="Meta+K Control+K /"
        className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--border-default)] px-3 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
      >
        <Search className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <span className="hidden md:inline">Search</span>
        <kbd className="hidden rounded border border-[var(--border-default)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-faint)] lg:inline">
          ⌘K
        </kbd>
      </button>
      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
