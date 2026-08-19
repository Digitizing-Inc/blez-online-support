import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import Breadcrumb from '@/components/Breadcrumb'
import ShopCTA from '@/components/ShopCTA'
import JsonLd, { breadcrumbSchema } from '@/lib/seo/jsonld'
import { siteConfig } from '@/lib/config'
import {
  topics,
  getTopic,
  getArticlesForTopic,
} from '@/lib/topics'

interface TopicPageProps {
  params: Promise<{ topic: string }>
}

export async function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { topic: slug } = await params
  const topic = getTopic(slug)
  if (!topic) return { title: 'Not found' }
  const url = `/articles/${slug}`
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: url },
    // Kept out of the index until article content is real — flip
    // NEXT_PUBLIC_ALLOW_INDEX=true to release. See siteConfig.allowIndex.
    robots: siteConfig.allowIndex ? undefined : { index: false, follow: true },
    openGraph: {
      title: topic.title,
      description: topic.description,
      url,
    },
    twitter: {
      title: topic.title,
      description: topic.description,
    },
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic: slug } = await params
  const topic = getTopic(slug)
  if (!topic) notFound()

  const articles = getArticlesForTopic(topic.slug)
  const Icon = topic.icon
  const base = siteConfig.siteUrl.replace(/\/$/, '')
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Support Articles', url: base },
    { name: topic.title },
  ])

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Breadcrumb
            trail={[
              { label: 'Support Articles', href: '/' },
              { label: topic.title },
            ]}
          />

          <div className="mt-6 flex items-start gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--blez-blue-ghost)] text-[var(--blez-blue)]">
              <Icon className="h-6 w-6" strokeWidth={2} />
            </div>
            <div>
              <h1 className="display display-h3 not-italic">{topic.title}</h1>
              <p className="mt-3 max-w-2xl text-lg text-[var(--text-secondary)]">
                {topic.description}
              </p>
              <p className="eyebrow eyebrow-sm mt-4">
                {articles.length} {articles.length === 1 ? 'article' : 'articles'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ul className="flex flex-col divide-y divide-[var(--border-subtle)] overflow-hidden rounded-lg border border-[var(--border-subtle)]">
          {articles.map((article, i) => (
            <li key={article.slug}>
              <Link
                href={`/articles/${topic.slug}/${article.slug}`}
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[var(--blez-blue-ghost)] hover:no-underline sm:gap-5 sm:px-6"
              >
                {/* Branded index — fixed width + right-aligned so single and
                    double digits share the same edge; lights up on row hover. */}
                <span
                  aria-hidden="true"
                  className="display display-h4 not-italic w-11 flex-shrink-0 text-right leading-none text-[var(--text-faint)] transition-colors group-hover:text-[var(--blez-blue)] sm:w-14"
                >
                  {i + 1}
                </span>
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <span className="text-base font-medium text-[var(--text-primary)]">
                    {article.title}
                  </span>
                  <span className="line-clamp-1 text-sm text-[var(--text-secondary)]">
                    {article.summary}
                  </span>
                </div>
                <ArrowRight
                  className="h-4 w-4 flex-shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--blez-blue)]"
                  strokeWidth={2}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            All topics
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <ShopCTA />
      </section>
    </>
  )
}
