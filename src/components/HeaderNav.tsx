'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

/**
 * Primary nav with a visible "you are here" state, so it's always clear
 * whether you're in the Help Center or the Resources library.
 */
export default function HeaderNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Primary" className="hidden items-center sm:flex">
      {LINKS.map((l) => {
        const active = l.isActive(pathname)
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? 'page' : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:no-underline ${
              active
                ? 'bg-[var(--blez-blue-ghost)] font-semibold text-[var(--blez-blue)]'
                : 'text-[var(--text-secondary)] hover:bg-[var(--blez-blue-ghost)] hover:text-[var(--text-primary)]'
            }`}
          >
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
