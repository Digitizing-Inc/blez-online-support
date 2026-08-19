'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getAllResources } from '@/lib/resources'
import ResourceCard from './ResourceCard'

/** Tiles shown per page. Grows-with-you: pagination appears once there's
 *  more than one page, so a monthly cadence stays browsable. */
const PAGE_SIZE = 5

export default function ResourcesList() {
  const all = getAllResources()
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE))
  const [page, setPage] = useState(0)
  const current = Math.min(page, totalPages - 1)
  const visible = all.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE)

  if (all.length === 0) {
    return <p className="text-[var(--text-muted)]">No resources yet.</p>
  }

  const pageBtn =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm font-medium transition-colors'
  const arrowBtn =
    'inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-default)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] disabled:cursor-default disabled:opacity-40 disabled:hover:border-[var(--border-default)] disabled:hover:text-[var(--text-secondary)]'

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((r) => (
          <li key={r.slug} className="flex">
            <ResourceCard resource={r} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav
          className="mt-10 flex items-center justify-center gap-1.5"
          aria-label="Resources pagination"
        >
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current === 0}
            aria-label="Previous page"
            className={arrowBtn}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              aria-current={i === current ? 'page' : undefined}
              className={`${pageBtn} ${
                i === current
                  ? 'border-[var(--blez-blue)] bg-[var(--blez-blue-ghost)] text-[var(--blez-blue)]'
                  : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current === totalPages - 1}
            aria-label="Next page"
            className={arrowBtn}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </nav>
      )}
    </div>
  )
}
