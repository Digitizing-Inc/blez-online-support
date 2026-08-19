import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Breadcrumb from '@/components/Breadcrumb'
import TableOfContents from '@/components/TableOfContents'
import WasThisHelpful from '@/components/WasThisHelpful'
import StillNeedHelp from '@/components/StillNeedHelp'
import ShopCTA from '@/components/ShopCTA'
import JsonLd, {
  articleSchema,
  breadcrumbSchema,
} from '@/lib/seo/jsonld'
import { siteConfig } from '@/lib/config'
import {
  articles,
  getArticle,
  getArticleSections,
  getArticlesForTopic,
  getTopic,
} from '@/lib/topics'

interface ArticlePageProps {
  params: Promise<{ topic: string; slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ topic: a.topicSlug, slug: a.slug }))
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { topic, slug } = await params
  const article = getArticle(topic, slug)
  if (!article) return { title: 'Not found' }
  const url = `/articles/${topic}/${slug}`
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: url },
    // Placeholder bodies stay out of the index until real copy ships — flip
    // NEXT_PUBLIC_ALLOW_INDEX=true to release. See siteConfig.allowIndex.
    robots: siteConfig.allowIndex ? undefined : { index: false, follow: true },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary,
      url,
      publishedTime: article.lastUpdated,
      modifiedTime: article.lastUpdated,
    },
    twitter: {
      title: article.title,
      description: article.summary,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { topic: topicSlug, slug } = await params
  const article = getArticle(topicSlug, slug)
  const topic = getTopic(topicSlug)
  if (!article || !topic) notFound()

  const sections = getArticleSections(article)
  const tocItems = sections.map((s) => ({ id: s.id, heading: s.heading }))

  const related = getArticlesForTopic(topicSlug)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4)

  const ripCopy =
    topicSlug === 'getting-started'
      ? {
          title: 'New to Blez?',
          body: 'See how it works — browse packs and find your first great card.',
          cta: 'Browse packs',
        }
      : topicSlug === 'ripping-reveals'
        ? {
            title: 'Ready to rip?',
            body: 'Browse hand-curated packs of real cards and open one on the spot.',
            cta: 'Browse packs',
          }
        : {
            title: 'Ready to rip?',
            body: 'Ship what you pull or sell it back instantly at 90% — browse the packs.',
            cta: 'Browse packs',
          }

  const base = siteConfig.siteUrl.replace(/\/$/, '')
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Support Articles', url: base },
    { name: topic.title, url: `${base}/articles/${topic.slug}` },
    { name: article.title },
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={[articleSchema(article, topic), breadcrumbLd]} />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] xl:gap-16 xl:grid-cols-[minmax(0,1fr)_240px]">
        {/* Main column */}
        <div className="min-w-0">
          <Breadcrumb
            trail={[
              { label: 'Support Articles', href: '/' },
              { label: topic.title, href: `/articles/${topic.slug}` },
              { label: article.title },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 text-base text-[var(--text-secondary)] sm:text-lg">
            {article.summary}
          </p>
          <p className="mt-4 text-xs text-[var(--text-faint)]">
            Last updated{' '}
            <time dateTime={article.lastUpdated}>{article.lastUpdated}</time>
          </p>

          {/* Mobile-only TOC: native <details> disclosure so phone readers
              can still jump between sections of long articles. The desktop
              sticky sidebar handles `lg+`. */}
          {tocItems.length > 1 && (
            <details className="mt-8 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] [&[open]>summary>svg]:rotate-90 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
                <span className="flex items-center gap-2">
                  <span className="eyebrow eyebrow-sm">On this page</span>
                </span>
                <ChevronRight
                  className="h-4 w-4 text-[var(--text-muted)] transition-transform"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </summary>
              <ul className="border-t border-[var(--border-subtle)] px-4 py-3">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      {item.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <article className="mt-12 flex flex-col gap-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                  {section.body.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <div className="mt-12 flex flex-col gap-8">
            <WasThisHelpful
              articleSlug={article.slug}
              articleTitle={article.title}
            />
            <StillNeedHelp subject={`Help with: ${article.title}`} />
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-[var(--border-subtle)] pt-12">
              {/* H3 (not H2) so it doesn't compete with article section
                  H2s in the document outline. Eyebrow style preserved. */}
              <h3 className="eyebrow">More in {topic.title}</h3>
              <ul className="mt-4 flex flex-col divide-y divide-[var(--border-subtle)] overflow-hidden rounded-lg border border-[var(--border-subtle)]">
                {related.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/articles/${topic.slug}/${a.slug}`}
                      className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[var(--blez-blue-ghost)]"
                    >
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {a.title}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 flex-shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--blez-blue)]"
                        strokeWidth={2}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--blez-blue)] hover:no-underline"
            >
              Prefer a deep dive? Browse our guides
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Right TOC sidebar — hidden on small screens */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      </div>

      <div className="mt-16">
        <ShopCTA title={ripCopy.title} body={ripCopy.body} cta={ripCopy.cta} />
      </div>
    </div>
  )
}
