import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { topics, articles } from '@/lib/topics'
import { getAllResources } from '@/lib/resources'

/**
 * Sitemap generated at build time from the topic + article tables.
 *
 * `lastModified` is computed per-row from real signals (article
 * `lastUpdated`, max-of-children for topics). The home route uses the
 * most recent article date so its freshness tracks content updates
 * rather than build time — crawlers learn to trust the signal.
 *
 * When the CMS lands, this file should keep working as long as the
 * accessors return current rows; trigger a revalidation hook on
 * publish.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, '')

  const articleDates = articles
    .map((a) => new Date(a.lastUpdated).getTime())
    .filter((n) => Number.isFinite(n))
  const latest = articleDates.length
    ? new Date(Math.max(...articleDates))
    : new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: latest,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  const topicRoutes: MetadataRoute.Sitemap = topics.map((t) => {
    const topicArticleDates = articles
      .filter((a) => a.topicSlug === t.slug)
      .map((a) => new Date(a.lastUpdated).getTime())
      .filter((n) => Number.isFinite(n))
    const lastModified = topicArticleDates.length
      ? new Date(Math.max(...topicArticleDates))
      : latest
    return {
      url: `${base}/articles/${t.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  })

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/articles/${a.topicSlug}/${a.slug}`,
    lastModified: new Date(a.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const resources = getAllResources()
  const resourceRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/resources`,
      lastModified: resources.length
        ? new Date(resources[0].publishedAt)
        : latest,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...resources.map((r) => ({
      url: `${base}/resources/${r.slug}`,
      lastModified: new Date(r.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  // Until real article copy ships (NEXT_PUBLIC_ALLOW_INDEX), advertise only
  // the home route so crawlers aren't handed ~60 placeholder URLs. Article,
  // topic, and resource pages also carry a page-level noindex in that state.
  if (!siteConfig.allowIndex) return staticRoutes

  return [
    ...staticRoutes,
    ...topicRoutes,
    ...articleRoutes,
    ...resourceRoutes,
  ]
}
