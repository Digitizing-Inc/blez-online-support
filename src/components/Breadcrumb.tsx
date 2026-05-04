import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbProps {
  trail: Crumb[]
}

/**
 * Breadcrumb — matches the Figma spec verbatim:
 *   - Container: 6px gap, 12px bottom margin
 *   - Inactive crumb: Inter 400 / 14px / `--text-muted` (#A3A3A3)
 *   - Active crumb: Inter 600 / 14px / `--text-primary` (#FAFAFA)
 *   - Separator: 24×24 ChevronRight icon, 2px stroke, --text-muted
 */
export default function Breadcrumb({ trail }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="pb-3">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="font-normal text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="font-semibold text-[var(--text-primary)]"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="h-6 w-6 flex-shrink-0 text-[var(--text-muted)]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
