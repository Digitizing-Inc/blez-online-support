import Link from 'next/link'
import { LifeBuoy, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'

/**
 * Persistent contact escape-hatch shown at the bottom of every article and
 * resource — a customer should never be one search away from a dead end.
 */
export default function StillNeedHelp({ subject }: { subject?: string }) {
  const href = subject
    ? `/contact?subject=${encodeURIComponent(subject)}`
    : '/contact'
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
