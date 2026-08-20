import MiniSearch from 'minisearch'
import { articles, getTopic } from './topics'
import { getAllResources, CATEGORY_LABELS } from './resources'

/**
 * Unified search across BOTH the support help center (`/articles`) and the
 * Resources content library (`/resources`), so a customer's query surfaces
 * whichever answer actually helps. Lazy-built and held in module scope.
 *
 * Imported from `@/lib/search` (a dedicated path) so MiniSearch stays out of
 * bundles that don't search.
 */

export interface SearchHit {
  id: string
  type: 'article' | 'resource'
  title: string
  excerpt: string
  href: string
  /** Topic title (articles) or category label (resources) — the kicker. */
  section: string
}

interface IndexDoc extends SearchHit {
  body: string
}

let cached: MiniSearch<IndexDoc> | null = null

function buildDocs(): IndexDoc[] {
  const docs: IndexDoc[] = []

  for (const a of articles) {
    const topic = getTopic(a.topicSlug)
    docs.push({
      id: `article:${a.topicSlug}/${a.slug}`,
      type: 'article',
      title: a.title,
      excerpt: a.summary,
      href: `/articles/${a.topicSlug}/${a.slug}`,
      section: topic?.title ?? 'Help center',
      body: `${a.summary} ${a.body} ${(a.sections ?? [])
        .map((s) => `${s.heading} ${s.body}`)
        .join(' ')}`,
    })
  }

  for (const r of getAllResources()) {
    docs.push({
      id: `resource:${r.slug}`,
      type: 'resource',
      title: r.title,
      excerpt: r.excerpt,
      href: `/resources/${r.slug}`,
      section: CATEGORY_LABELS[r.category],
      body: `${r.excerpt} ${r.sections
        .map((s) => `${s.heading} ${s.body}`)
        .join(' ')} ${(r.faq ?? [])
        .map((f) => `${f.q} ${f.a}`)
        .join(' ')}`,
    })
  }

  return docs
}

function ensureIndex() {
  if (cached) return cached
  const ms = new MiniSearch<IndexDoc>({
    idField: 'id',
    fields: ['title', 'excerpt', 'body'],
    storeFields: ['type', 'title', 'excerpt', 'href', 'section'],
    searchOptions: {
      boost: { title: 4, excerpt: 2 },
      prefix: true,
      fuzzy: 0.2,
      combineWith: 'AND',
    },
  })
  ms.addAll(buildDocs())
  cached = ms
  return ms
}

export function search(query: string, limit = 12): SearchHit[] {
  const q = query.trim()
  if (!q) return []
  return ensureIndex()
    .search(q)
    .slice(0, limit)
    .map((h) => ({
      id: h.id as string,
      type: h.type as SearchHit['type'],
      title: h.title as string,
      excerpt: h.excerpt as string,
      href: h.href as string,
      section: h.section as string,
    }))
}
