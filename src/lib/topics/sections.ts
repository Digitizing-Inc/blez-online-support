import type { Article, ArticleSection } from './types'
import type { TopicSlug } from './topics'

/**
 * Topic-flavored default sections for articles that don't ship with their
 * own. Keeps the on-this-page TOC populated in the prototype phase. The
 * keys are typed against `TopicSlug` so adding/renaming a topic without
 * adding an entry here is a build error.
 *
 * Once the CMS is wired and articles ship with explicit `sections`, this
 * fallback can be deleted.
 */
const defaultSectionsByTopic: Record<
  TopicSlug,
  (a: Article) => ArticleSection[]
> = {
  'getting-started': (a) => [
    { id: 'overview', heading: 'Overview', body: a.summary },
    { id: 'walkthrough', heading: 'Walkthrough', body: a.body },
    {
      id: 'tips',
      heading: 'Tips & gotchas',
      body: 'A few things worth knowing before you start. Final copy lands when the CMS is wired.',
    },
    {
      id: 'next',
      heading: 'Where to next',
      body: 'Browse other Getting Started articles, or ask the BlezBot.',
    },
  ],
  'buying-payments': (a) => [
    { id: 'overview', heading: 'Overview', body: a.summary },
    { id: 'how-it-works', heading: 'How it works', body: a.body },
    {
      id: 'common-issues',
      heading: 'Common issues',
      body: 'The most frequent reasons something goes wrong, and what to try first.',
    },
    {
      id: 'still-stuck',
      heading: 'Still stuck?',
      body: "Email support with your order ID and we'll take a look.",
    },
  ],
  'ripping-reveals': (a) => [
    { id: 'overview', heading: 'Overview', body: a.summary },
    { id: 'how-it-works', heading: 'How it works', body: a.body },
    {
      id: 'fairness',
      heading: 'Fairness & transparency',
      body: "Every rip is auditable. Here's how we make that work.",
    },
    {
      id: 'next',
      heading: 'What to do next',
      body: 'Pick a pack and rip — or browse Top Pulls to see what people are hitting today.',
    },
  ],
  'selling-withdrawals': (a) => [
    { id: 'overview', heading: 'Overview', body: a.summary },
    { id: 'how-it-works', heading: 'How it works', body: a.body },
    {
      id: 'when-to-pick-each',
      heading: 'When to pick each option',
      body: 'A quick framework for deciding between shipping and cashing out.',
    },
    {
      id: 'related',
      heading: 'Related help',
      body: 'See cash-out methods, withdrawal processing times, and shipping rates.',
    },
  ],
  shipping: (a) => [
    { id: 'overview', heading: 'Overview', body: a.summary },
    { id: 'details', heading: 'The details', body: a.body },
    {
      id: 'edge-cases',
      heading: 'Edge cases',
      body: 'Returns, address changes, and other less-common situations.',
    },
    {
      id: 'contact',
      heading: 'When to contact us',
      body: 'If your shipment is missing or damaged, follow these steps.',
    },
  ],
  'card-quality': (a) => [
    { id: 'overview', heading: 'Overview', body: a.summary },
    { id: 'how-it-works', heading: 'How it works', body: a.body },
    {
      id: 'filing-claim',
      heading: 'Filing a claim',
      body: 'Documentation, timelines, and what to include.',
    },
    {
      id: 'related',
      heading: 'Related help',
      body: 'See condition grading, graded cards, and storage policies.',
    },
  ],
  'account-security': (a) => [
    { id: 'overview', heading: 'Overview', body: a.summary },
    { id: 'how-it-works', heading: 'How it works', body: a.body },
    {
      id: 'security-tips',
      heading: 'Security tips',
      body: 'A few practices that keep accounts safe.',
    },
    {
      id: 'need-help',
      heading: 'Need help?',
      body: "Lost access entirely? Email support and we'll verify and recover the account.",
    },
  ],
  'money-limits': (a) => [
    { id: 'overview', heading: 'Overview', body: a.summary },
    { id: 'the-rules', heading: 'The rules', body: a.body },
    {
      id: 'thresholds',
      heading: 'Thresholds & numbers',
      body: 'Specific dollar amounts, time windows, and document triggers will live in this section once the CMS is wired.',
    },
    {
      id: 'related',
      heading: 'Related help',
      body: 'See AML/KYC, deposit limits, and tax docs for adjacent topics.',
    },
  ],
}

export function getArticleSections(article: Article): ArticleSection[] {
  if (article.sections && article.sections.length > 0) return article.sections
  const builder =
    defaultSectionsByTopic[article.topicSlug as TopicSlug]
  if (builder) return builder(article)
  return [
    { id: 'overview', heading: 'Overview', body: article.summary },
    { id: 'details', heading: 'Details', body: article.body },
  ]
}
