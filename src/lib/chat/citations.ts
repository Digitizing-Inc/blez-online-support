import { articles } from '@/lib/topics'
import type { Citation } from './types'

/**
 * Pick citations by simple token-overlap with the user's question.
 * Returns up to `n` citations or an empty array if nothing overlaps.
 *
 * The dev wiring the real backend should DELETE this and instead use
 * the citations returned by the RAG retrieval step.
 */
export function pickCitations(question: string, n = 3): Citation[] {
  const tokens = question
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length > 2)
  if (tokens.length === 0) return []

  return articles
    .map((a) => {
      const haystack = `${a.title} ${a.summary}`.toLowerCase()
      const score = tokens.reduce(
        (acc, t) => acc + (haystack.includes(t) ? 1 : 0),
        0,
      )
      return { article: a, score }
    })
    .filter((s) => s.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, n)
    .map((s) => ({
      topicSlug: s.article.topicSlug,
      slug: s.article.slug,
      title: s.article.title,
    }))
}

/**
 * Build a placeholder assistant reply. When the backend lands, this
 * function should be deleted and the real model output used instead.
 */
export function placeholderReplyFor(_question: string): string {
  void _question
  return [
    'This is a **placeholder reply**. The BlezBot UI is wired but not connected to a model yet — the dev will swap this for a stream from Claude (or another LLM).',
    '',
    "Until then, here's what's working:",
    '',
    '- Markdown rendering (you can see it now)',
    '- Streaming responses, character by character',
    '- Citation chips below this reply',
    '- Per-message actions: copy, thumbs, regenerate',
    '- `/reset`, `/email`, `/feedback` slash commands',
    '',
    'Try one of the suggested prompts to see citations land.',
  ].join('\n')
}
