import type { Metadata } from 'next'
import JsonLd, { breadcrumbSchema } from '@/lib/seo/jsonld'
import { siteConfig } from '@/lib/config'
import { getAllResources } from '@/lib/resources'
import ResourcesList from '@/components/ResourcesList'
import ShopCTA from '@/components/ShopCTA'

export const metadata: Metadata = {
  title: 'Resources — Guides, Comparisons & Collecting Tips',
  description:
    'Long-form guides, platform comparisons, and collecting tips from Blez Online — how digital repacks work, card grading, protecting your collection, and more.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Blez Online Resources',
    description:
      'Guides, comparisons, and collecting tips from Blez Online — digital repacks, grading, investing, and protecting your collection.',
    url: '/resources',
  },
}

export default function ResourcesPage() {
  const resources = getAllResources()
  const base = siteConfig.siteUrl.replace(/\/$/, '')

  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blez Online Resources',
    url: `${base}/resources`,
    inLanguage: 'en-US',
    blogPost: resources.map((r) => ({
      '@type': 'BlogPosting',
      headline: r.title,
      url: `${base}/resources/${r.slug}`,
      datePublished: r.publishedAt,
      description: r.excerpt,
    })),
  }
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Support Articles', url: base },
    { name: 'Resources' },
  ])

  return (
    <>
      <JsonLd data={[blogLd, breadcrumbLd]} />
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <span className="eyebrow">Resources</span>
          <h1 className="display display-h2 not-italic mt-3">
            Guides &amp; collecting tips
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-[var(--text-secondary)] sm:text-xl">
            Long-form guides, honest platform comparisons, and everything we
            know about ripping, grading, and building a collection.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ResourcesList />

        <div className="mt-12">
          <ShopCTA />
        </div>
      </section>
    </>
  )
}
