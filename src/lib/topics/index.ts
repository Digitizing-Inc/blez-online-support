/**
 * Public surface for topic + article data. Full-text search lives in
 * `@/lib/search` (unified across help articles + resources) so MiniSearch
 * stays out of bundles that don't search.
 */

export type { Article, ArticleSection, Topic } from './types'
export { topics, getTopic, type TopicSlug } from './topics'
export { articles, getArticle, getArticlesForTopic } from './articles'
export { getArticleSections } from './sections'
