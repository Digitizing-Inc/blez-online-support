'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

/**
 * Mobile primary nav. HeaderNav is `hidden sm:flex`, so below 640px the two
 * primary links (Help Center / Resources) would otherwise be unreachable —
 * this hamburger surfaces them. Hidden at `sm`+ where HeaderNav takes over.
 */
const LINKS = [
  {
    href: '/',
    label: 'Help Center',
    isActive: (p: string) => p === '/' || p.startsWith('/articles'),
  },
  {
    href: '/resources',
    label: 'Resources',
    isActive: (p: string) => p.startsWith('/resources'),
  },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  // Close when the route changes (a link was followed).
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
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
  }, [open])

  return (
    <div ref={ref} className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-default)] text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
      >
        {open ? (
          <X className="h-5 w-5" strokeWidth={2} />
        ) : (
          <Menu className="h-5 w-5" strokeWidth={2} />
        )}
      </button>
      {open && (
        <nav
          aria-label="Primary"
          className="absolute right-0 top-full z-50 mt-2 min-w-44 overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]"
        >
          {LINKS.map((l) => {
            const active = l.isActive(pathname)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors hover:no-underline ${
                  active
                    ? 'bg-[var(--blez-blue-ghost)] text-[var(--blez-blue)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--blez-blue-ghost)] hover:text-[var(--text-primary)]'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
      )}
    </div>
  )
}
