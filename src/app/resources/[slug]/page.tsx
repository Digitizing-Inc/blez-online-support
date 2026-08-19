import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Breadcrumb from '@/components/Breadcrumb'
import ResourceThumb from '@/components/ResourceThumb'
import ResourceCard from '@/components/ResourceCard'
import Prose from '@/components/Prose'
import ShopCTA from '@/components/ShopCTA'
import TableOfContents from '@/components/TableOfContents'
import ReadingProgress from '@/components/ReadingProgress'
import SectionHeading from '@/components/SectionHeading'
import ViewCount from '@/components/ViewCount'
import JsonLd, {
  blogPostingSchema,
  breadcrumbSchema,
  faqPageSchema,
} from '@/lib/seo/jsonld'
import { siteConfig } from '@/lib/config'
import {
  resources,
  getResource,
  getAllResources,
  CATEGORY_LABELS,
} from '@/lib/resources'
import { formatDate } from '@/lib/date'

interface ResourcePageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) return { title: 'Not found' }
  const url = `/resources/${slug}`
  return {
    title: resource.title,
    description: resource.excerpt,
    alternates: { canonical: url },
    // Real editorial content, but kept out of the index until the site goes
    // live alongside the rest (flip NEXT_PUBLIC_ALLOW_INDEX at launch).
    robots: siteConfig.allowIndex ? undefined : { index: false, follow: true },
    openGraph: {
      type: 'article',
      title: resource.title,
      description: resource.excerpt,
      url,
      publishedTime: resource.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.title,
      description: resource.excerpt,
    },
  }
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) notFound()

  const tocItems = resource.sections.map((s) => ({
    id: s.id,
    heading: s.heading,
  }))

  const base = siteConfig.siteUrl.replace(/\/$/, '')
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Support Articles', url: base },
    { name: 'Resources', url: `${base}/resources` },
    { name: resource.title },
  ])
  const schemas: Record<string, unknown>[] = [
    blogPostingSchema(resource),
    breadcrumbLd,
  ]
  if (resource.faq && resource.faq.length > 0) {
    schemas.push(faqPageSchema(resource.faq))
  }

  const related = getAllResources()
    .filter((r) => r.slug !== resource.slug)
    .sort((a, b) => (a.category === resource.category ? -1 : 0))
    .slice(0, 3)

  const shopCopy =
    resource.category === 'comparison'
      ? {
          title: 'See it for yourself',
          body: 'Browse Blez packs and rip one on the spot — with instant 90% buyback on every card.',
        }
      : {
          title: 'Ready to rip?',
          body: 'Browse hand-curated packs of real cards and open one on the spot.',
        }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <ReadingProgress />
      <JsonLd data={schemas} />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] xl:gap-16 xl:grid-cols-[minmax(0,1fr)_240px]">
        {/* Main column */}
        <div className="min-w-0">
          <Breadcrumb
            trail={[
              { label: 'Support Articles', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: resource.title },
            ]}
          />

          <div className="mt-6 flex items-center gap-2 text-[var(--text-muted)]">
            <span className="badge badge-brand">
              {CATEGORY_LABELS[resource.category]}
            </span>
            <span className="text-sm">
              <time dateTime={resource.publishedAt}>
                {formatDate(resource.publishedAt)}
              </time>
            </span>
            <span className="text-sm text-[var(--text-faint)]">
              · {resource.readMinutes} min read
            </span>
            <ViewCount slug={resource.slug} />
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-tight text-[var(--text-primary)] sm:text-3xl">
            {resource.title}
          </h1>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            {resource.excerpt}
          </p>

          <div className="mt-8 h-48 w-full overflow-hidden rounded-xl sm:h-60">
            <ResourceThumb slug={resource.slug} category={resource.category} />
          </div>

          {/* Mobile-only TOC (desktop uses the sticky sidebar). */}
          {tocItems.length > 1 && (
            <details className="mt-8 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] [&[open]>summary>svg]:rotate-90 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
                <span className="eyebrow eyebrow-sm">On this page</span>
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

          <article className="mt-10 flex flex-col gap-10">
            {resource.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <SectionHeading id={section.id}>
                  {section.heading}
                </SectionHeading>
                <div className="mt-4">
                  <Prose body={section.body} sources={resource.sources} />
                </div>
              </section>
            ))}
          </article>

          {resource.sources && resource.sources.length > 0 && (
            <section
              id="sources"
              className="mt-14 scroll-mt-24 border-t border-[var(--border-subtle)] pt-8"
            >
              <h2 className="eyebrow mb-4">Sources</h2>
              <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-[var(--text-secondary)] marker:text-[var(--text-faint)]">
                {resource.sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--blez-blue)] underline underline-offset-2 hover:text-[var(--blez-blue-hover)]"
                    >
                      {s.title}
                    </a>
                    {s.publisher && (
                      <span className="text-[var(--text-muted)]">
                        {' '}
                        — {s.publisher}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div className="mt-12">
            <ShopCTA title={shopCopy.title} body={shopCopy.body} />
          </div>

          <div className="mt-14 border-t border-[var(--border-subtle)] pt-8">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--blez-blue)]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              All resources
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="eyebrow mb-5">Keep reading</h2>
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug} className="flex">
                    <ResourceCard resource={r} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right TOC sidebar — hidden on small screens */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      </div>
    </div>
  )
}
