import { siteConfig } from '@/lib/config'
import type { Article, Topic } from '@/lib/topics'

/**
 * JSON-LD schema builders. All schemas use absolute URLs so the dev
 * doesn't need to think about resolution at render time.
 */

const base = siteConfig.siteUrl.replace(/\/$/, '')

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: base,
    description:
      'Answers and help for Blez Online — packs, payments, ripping, shipping, and your account.',
    inLanguage: 'en-US',
    // Renders the sitelinks search box in Google when matched.
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blez Online',
    url: siteConfig.mainSiteUrl,
    logo: `${base}/blez-logo.webp`,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.x,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ],
  }
}

export function breadcrumbSchema(
  trail: Array<{ name: string; url?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: c.url } : {}),
    })),
  }
}

export function articleSchema(article: Article, topic: Topic) {
  const url = `${base}/articles/${topic.slug}/${article.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    url,
    datePublished: article.lastUpdated,
    dateModified: article.lastUpdated,
    inLanguage: 'en-US',
    author: { '@type': 'Organization', name: 'Blez Online' },
    publisher: {
      '@type': 'Organization',
      name: 'Blez Online',
      logo: { '@type': 'ImageObject', url: `${base}/blez-logo.webp` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: topic.title,
  }
}

/**
 * Renders one or more JSON-LD blocks. Use a single `<JsonLd>` per page
 * with an array of schemas to keep the markup tidy.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[]
}) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
