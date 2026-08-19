import type { Metadata } from 'next'
import CardStackBanner from '@/components/CardStackBanner'
import SearchBar from '@/components/SearchBar'
import TopicTile from '@/components/TopicTile'
import { topics } from '@/lib/topics'

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
    </>
  )
}
