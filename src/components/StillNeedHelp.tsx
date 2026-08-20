import Link from 'next/link'
import { LifeBuoy, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'

/**
 * Contact escape-hatch. Default is a wide horizontal card for the content
 * flow; `compact` renders a narrow vertical card for the TOC sidebar.
 */
export default function StillNeedHelp({
  subject,
  compact = false,
}: {
  subject?: string
  compact?: boolean
}) {
  const href = subject
    ? `/contact?subject=${encodeURIComponent(subject)}`
    : '/contact'

  if (compact) {
    return (
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--blez-blue-ghost)] text-[var(--blez-blue)]">
            <LifeBuoy className="h-4 w-4" strokeWidth={2} />
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Still need help?
          </p>
        </div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          {siteConfig.supportResponseTime}
        </p>
        <Link
          href={href}
          className="btn btn-secondary btn-sm mt-3 w-full justify-center"
        >
          Contact support
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--blez-blue-ghost)] text-[var(--blez-blue)]">
          <LifeBuoy className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Still need help?
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            {siteConfig.supportResponseTime}
          </p>
        </div>
      </div>
      <Link
        href={href}
        className="btn btn-secondary btn-md self-start sm:self-auto"
      >
        Contact support
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </Link>
    </div>
  )
}
