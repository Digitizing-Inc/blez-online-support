import type { Resource, ResourceCategory } from './types'
import data from './resources.data.json'

/**
 * Editorial "Resources" content. Rewritten from marketing/SEO source docs
 * into structured data. Internal SEO-strategy/briefing docs were excluded.
 *
 * `publishedAt` values are PLACEHOLDER launch dates for a natural-looking
 * library — set real authored dates before launch. HUMAN REVIEW PENDING.
 *
 * Populated below the helpers.
 */

/** Human labels for the category chip shown on tiles and post headers. */
export const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  guide: 'Guide',
  comparison: 'Comparison',
  faq: 'FAQ',
  about: 'About',
}

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug)
}

/** All resources, newest first. */
export function getAllResources(): Resource[] {
  return [...resources].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export const resources: Resource[] = data as unknown as Resource[]
