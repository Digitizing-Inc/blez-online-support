import { getArticle } from './topics'

/**
 * Curated "urgent / most-common" issues, surfaced as one-click chips in the
 * search zero-state and on the home page. These are the high-anxiety tasks
 * most people arrive needing. Slugs are validated against the article table
 * at call time so a rename can't leave a dead chip.
 */
const URGENT: ReadonlyArray<{
  topicSlug: string
  slug: string
  label: string
}> = [
  { topicSlug: 'buying-payments', slug: 'why-payment-declined', label: 'Payment declined' },
  { topicSlug: 'shipping', slug: 'lost-stolen-damaged', label: 'Lost or damaged package' },
  { topicSlug: 'account-security', slug: 'cant-log-in', label: 'Can’t log in' },
  { topicSlug: 'selling-withdrawals', slug: 'withdrawing-balance', label: 'Withdraw my balance' },
  { topicSlug: 'getting-started', slug: 'creating-account-id-verification', label: 'ID / KYC verification' },
  { topicSlug: 'buying-payments', slug: 'refund-policy', label: 'Refunds' },
]

export interface QuickLink {
  href: string
  label: string
}

export function getUrgentLinks(): QuickLink[] {
  return URGENT.filter((u) => getArticle(u.topicSlug, u.slug)).map((u) => ({
    href: `/articles/${u.topicSlug}/${u.slug}`,
    label: u.label,
  }))
}
