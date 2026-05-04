'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

export interface TocItem {
  id: string
  heading: string
}

interface TableOfContentsProps {
  items: TocItem[]
}

/**
 * Sticky on-this-page sidebar. Tracks the section currently visible in the
 * viewport via IntersectionObserver and highlights it in the list, similar
 * to support.claude.com.
 */
export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const isClickingRef = useRef(false)

  useEffect(() => {
    if (items.length === 0) return

    const ids = items.map((i) => i.id)
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return
        // Sort the visible entries by where they sit in the page so the
        // topmost one wins when several are on screen at once.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          )
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-96px 0px -55% 0px',
        threshold: [0, 1],
      },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    isClickingRef.current = true
    setActiveId(id)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
    // Re-enable scrollspy once smooth scroll settles.
    window.setTimeout(() => {
      isClickingRef.current = false
    }, 600)
  }

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="eyebrow eyebrow-sm">On this page</p>
      <ul className="mt-4 flex flex-col gap-1 border-l border-[var(--border-subtle)]">
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id} className="relative">
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -left-px top-0 h-full w-px bg-[var(--blez-blue)]"
                />
              )}
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'block py-1.5 pl-4 pr-2 leading-snug transition-colors',
                  isActive
                    ? 'font-medium text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                )}
              >
                {item.heading}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
