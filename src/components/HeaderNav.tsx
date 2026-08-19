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
    <nav aria-label="Primary" className="hidden items-center gap-6 sm:flex">
      {LINKS.map((l) => {
        const active = l.isActive(pathname)
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? 'page' : undefined}
            className={`relative py-1 text-sm font-medium transition-colors hover:no-underline after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-[var(--blez-blue)] after:transition-opacity ${
              active
                ? 'text-[var(--text-primary)] after:opacity-100'
                : 'text-[var(--text-secondary)] after:opacity-0 hover:text-[var(--text-primary)]'
            }`}
          >
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
