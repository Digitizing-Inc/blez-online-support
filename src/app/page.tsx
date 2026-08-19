import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CardStackBanner from '@/components/CardStackBanner'
import SearchBar from '@/components/SearchBar'
import TopicTile from '@/components/TopicTile'
import ResourceCard from '@/components/ResourceCard'
import { topics } from '@/lib/topics'
import { getAllResources } from '@/lib/resources'

export const metadata: Metadata = {
  title: 'Support Articles',
  description:
    'Search for answers or browse Blez Online support articles by topic.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Support Articles',
    description:
      'Search for answers or browse Blez Online support articles by topic.',
    url: '/',
  },
}

export default function HomePage() {
  const sorted = [...topics].sort((a, b) => a.order - b.order)
  const recentResources = getAllResources().slice(0, 3)

  return (
    <>
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
          <CardStackBanner />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="display display-h2 not-italic">Search for answers</h1>
            <p className="mt-3 text-lg text-[var(--text-secondary)] sm:text-xl">
              Or browse by topic.
            </p>
            <div className="mt-8 text-left">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((t) => (
            <li key={t.slug} className="flex">
              <TopicTile topic={t} />
            </li>
          ))}
        </ul>
      </section>

      {recentResources.length > 0 && (
        <section className="border-t border-[var(--border-subtle)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Resources</span>
                <h2 className="display display-h4 not-italic mt-2">
                  Guides &amp; collecting tips
                </h2>
                <p className="mt-2 max-w-xl text-[var(--text-secondary)]">
                  Long-form guides, platform comparisons, and everything we
                  know about ripping, grading, and building a collection.
                </p>
              </div>
              <Link
                href="/resources"
                className="btn btn-secondary btn-md shrink-0"
              >
                Browse all resources
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentResources.map((r) => (
                <li key={r.slug} className="flex">
                  <ResourceCard resource={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
