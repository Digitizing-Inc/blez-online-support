import MiniSearch from 'minisearch'
import { articles } from './articles'
import type { Article } from './types'

/**
 * Lazy MiniSearch index. Built once on first call from `searchArticles`
 * so importers that only need types or data don't pay the ~25 KB
 * MiniSearch cost. The index is held in module scope after the first
 * build, so subsequent calls are fast.
 *
 * Imported from `@/lib/topics/search` (NOT the index barrel) to keep
 * MiniSearch out of bundles that don't use search.
 */

const ID = (a: Article) => `${a.topicSlug}/${a.slug}`

let cached: MiniSearch<Article & { _id: string }> | null = null

function ensureIndex() {
  if (cached) return cached
  const ms = new MiniSearch<Article & { _id: string }>({
    idField: '_id',
    fields: ['title', 'summary', 'body'],
    storeFields: ['_id'],
    searchOptions: {
      boost: { title: 3, summary: 2 },
      prefix: true,
      fuzzy: 0.2,
      combineWith: 'AND',
    },
  })
  ms.addAll(articles.map((a) => ({ ...a, _id: ID(a) })))
  cached = ms
  return ms
}

export function searchArticles(query: string): Article[] {
  const q = query.trim()
  if (!q) return []
  const ms = ensureIndex()
  const hits = ms.search(q).slice(0, 12)
  return hits
    .map((h) => articles.find((a) => ID(a) === h.id))
    .filter((a): a is Article => Boolean(a))
}
