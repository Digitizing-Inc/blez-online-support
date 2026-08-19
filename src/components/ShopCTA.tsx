import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'

/**
 * Conversion CTA back to the storefront. Placed on the Resources posts and
 * listing (the surfaces SEO traffic lands on) so a reader's natural next step
 * — "browse packs" — is one tap away. Opens the main shop in a new tab.
 */
export default function ShopCTA({
  title = 'Ready to rip?',
  body = 'Browse hand-curated packs of real cards and open one on the spot.',
  cta = 'Browse packs',
}: {
  title?: string
  body?: string
  cta?: string
}) {
  return (
    <a
      href={siteConfig.shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-5 overflow-hidden rounded-xl border border-[var(--blez-blue)] p-6 hover:no-underline sm:flex-row sm:items-center sm:justify-between sm:p-7"
      style={{
        background:
          'linear-gradient(225.32deg, rgba(0, 92, 153, 0.95) 0%, rgba(0, 153, 255, 0.95) 51.93%, rgba(0, 92, 153, 0.95) 100%)',
        boxShadow: 'var(--glow-blue-soft)',
      }}
    >
      <div className="min-w-0">
        <p className="display display-h5 not-italic text-white">{title}</p>
        <p className="mt-1.5 text-white/85">{body}</p>
      </div>
      <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-md bg-white px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--blez-blue-deep)] transition-transform group-hover:-translate-y-0.5">
        {cta}
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </span>
    </a>
  )
}
