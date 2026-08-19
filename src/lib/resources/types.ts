/**
 * Resources = the SEO/editorial content library (blog-style long-form
 * articles), distinct from the support help-center articles under
 * `/articles`. Lives at `/resources`.
 */

export interface ResourceSection {
  /** URL-fragment id for the on-this-page anchor */
  id: string
  /** H2 heading shown above the section body */
  heading: string
  /** Plain text; paragraphs split on `\n\n`. Lines beginning with '- '
   *  render as a bulleted list. */
  body: string
}

export interface ResourceFaq {
  q: string
  a: string
}

/** A cited source for the article's bibliography (builds trust + E-E-A-T). */
export interface ResourceSource {
  /** Title of the cited page/article. */
  title: string
  /** Publisher or site name (e.g. "PSA", "ESPN"). */
  publisher?: string
  url: string
}

export type ResourceCategory = 'guide' | 'comparison' | 'faq' | 'about'

export interface Resource {
  slug: string
  title: string
  category: ResourceCategory
  /** ISO date the piece was published. NOTE: placeholder launch dates —
   *  set to real authored dates before/at launch. */
  publishedAt: string
  /** One–two sentence summary; used on the tile and as the meta description. */
  excerpt: string
  /** Estimated read time in minutes. */
  readMinutes: number
  sections: ResourceSection[]
  /** Present on FAQ-style posts; drives FAQPage structured data. */
  faq?: ResourceFaq[]
  /** Cited sources rendered as a bibliography + BlogPosting `citation`. */
  sources?: ResourceSource[]
}
