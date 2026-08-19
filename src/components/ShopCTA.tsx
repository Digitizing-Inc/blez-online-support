import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'

/**
 * Bottom-of-page conversion banner back to the storefront, styled after the
 * main site's "Ready to start ripping?" call-to-action. Copy is passed per
 * page so it matches the surrounding context. Opens the shop in a new tab.
 */
export default function ShopCTA({
  title = 'Ready to start ripping?',
  body = 'Create your account and get your first points today.',
  cta = 'Start ripping now',
}: {
  title?: string
  body?: string
  cta?: string
}) {
  return (
    <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-12 text-center sm:py-16">
      <h2 className="display display-h3 not-italic mx-auto max-w-2xl text-[var(--text-primary)]">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-[var(--text-secondary)] sm:text-lg">
        {body}
      </p>
      <a
        href={siteConfig.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-lg mt-8 uppercase tracking-wider hover:no-underline"
      >
        {cta}
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </a>
    </section>
  )
}
