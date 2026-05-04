/**
 * Public surface for topic + article data. Note: `searchArticles` lives
 * in `./search.ts` and is NOT re-exported here. Import it from
 * `@/lib/topics/search` directly to keep MiniSearch out of bundles
 * that don't need it.
 */

export type { Article, ArticleSection, Topic } from './types'
export { topics, getTopic, getUrgentArticles, type TopicSlug } from './topics'
export { articles, getArticle, getArticlesForTopic } from './articles'
export { getArticleSections } from './sections'
