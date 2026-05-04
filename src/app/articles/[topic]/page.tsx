import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import Breadcrumb from '@/components/Breadcrumb'
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
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ul className="flex flex-col divide-y divide-[var(--border-subtle)] overflow-hidden rounded-lg border border-[var(--border-subtle)]">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/articles/${topic.slug}/${article.slug}`}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[var(--blez-blue-ghost)] hover:no-underline sm:px-6"
              >
                <div className="flex flex-col gap-1 min-w-0">
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
    </>
  )
}
