import Link from 'next/link'
import type { SearchHit } from '@/lib/search'

/**
 * Presentational list of unified search hits, shared by the home hero search
 * and the header search dialog. Supports keyboard navigation via `activeIndex`
 * (renders `aria-selected` + a stable id per row for `aria-activedescendant`).
 */
export default function SearchResultList({
  hits,
  idPrefix = 'search-hit',
  activeIndex = -1,
  onSelect,
}: {
  hits: SearchHit[]
  idPrefix?: string
  activeIndex?: number
  onSelect?: () => void
}) {
  return (
    <ul className="py-2" role="listbox" aria-label="Search results">
      {hits.map((hit, i) => (
        <li key={hit.id} role="option" aria-selected={i === activeIndex}>
          <Link
            id={`${idPrefix}-${i}`}
            href={hit.href}
            onClick={onSelect}
            className={`flex flex-col gap-1 px-5 py-3 transition-colors hover:no-underline ${
              i === activeIndex
                ? 'bg-[var(--blez-blue-ghost)]'
                : 'hover:bg-[var(--blez-blue-ghost)]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="eyebrow eyebrow-sm">{hit.section}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                  hit.type === 'resource'
                    ? 'bg-[var(--blez-blue-ghost)] text-[var(--blez-blue)]'
                    : 'bg-[var(--bg-surface-2)] text-[var(--text-muted)]'
                }`}
              >
                {hit.type === 'resource' ? 'Guide' : 'Help'}
              </span>
            </span>
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {hit.title}
            </span>
            <span className="line-clamp-1 text-xs text-[var(--text-muted)]">
              {hit.excerpt}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
