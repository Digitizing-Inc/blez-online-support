import type { LucideIcon } from 'lucide-react'

export interface ArticleSection {
  /** URL fragment id, used by the on-this-page TOC */
  id: string
  /** H2 heading shown above the section body */
  heading: string
  /** Section copy. Plain text; paragraphs separated by `\n\n`. */
  body: string
}

export interface Article {
  slug: string
  topicSlug: string
  title: string
  summary: string
  /** Plain text. Multiple paragraphs separated by `\n\n` (consumers split
   *  on the double-newline). Swap to MDX once the CMS is wired. */
  body: string
  /** ISO date string */
  lastUpdated: string
  /**
   * Article sections used to render an on-this-page TOC. If a row in the
   * `articles` table doesn't define this, the helper in `./sections.ts`
   * fills in a topic-appropriate default.
   */
  sections?: ArticleSection[]
}

export interface Topic {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  order: number
}
