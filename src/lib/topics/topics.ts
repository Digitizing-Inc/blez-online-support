import {
  Sparkles,
  CreditCard,
  Package,
  Wallet,
  Truck,
  ShieldCheck,
  Lock,
  Scale,
} from 'lucide-react'
import type { Topic } from './types'
import { articles } from './articles'
import type { Article } from './types'

export const topics: readonly Topic[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Sign up. Verify. Rip your first pack.',
    icon: Sparkles,
    order: 0,
  },
  {
    slug: 'buying-payments',
    title: 'Buying & Payments',
    description: 'Pay, get charged, get refunded.',
    icon: CreditCard,
    order: 1,
  },
  {
    slug: 'ripping-reveals',
    title: 'Ripping Packs & Reveals',
    description: "Odds, fairness, what's actually in the pack.",
    icon: Package,
    order: 2,
  },
  {
    slug: 'selling-withdrawals',
    title: 'Selling Back & Withdrawals',
    description: 'Ship it or cash it. Then pull your money out.',
    icon: Wallet,
    order: 3,
  },
  {
    slug: 'shipping',
    title: 'Shipping',
    description: 'Rates, vault, tracking, claims, customs.',
    icon: Truck,
    order: 4,
  },
  {
    slug: 'card-quality',
    title: 'Card Quality & Condition',
    description: 'Storage, grades, damage claims, graded slabs.',
    icon: ShieldCheck,
    order: 5,
  },
  {
    slug: 'account-security',
    title: 'Account & Security',
    description: 'Login, 2FA, lockouts, account holds.',
    icon: Lock,
    order: 6,
  },
  {
    slug: 'money-limits',
    title: 'Money & Limits',
    description: 'Taxes, regions, KYC, deposit & rip limits.',
    icon: Scale,
    order: 7,
  },
] as const

/** Compile-time string union of every topic slug. Use this on consumers
 *  that index by slug (URGENT_SLUGS, defaultSectionsByTopic) so renames
 *  break the build instead of failing silently at runtime. */
export type TopicSlug = (typeof topics)[number]['slug']

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug)
}

/**
 * Articles surfaced in the BlezBot empty-state suggested prompts. Slugs
 * must exist in the `articles` table.
 */
const URGENT: ReadonlyArray<{ topicSlug: TopicSlug; slug: string }> = [
  { topicSlug: 'ripping-reveals', slug: 'reveal-glitch' },
  { topicSlug: 'buying-payments', slug: 'why-payment-declined' },
  { topicSlug: 'shipping', slug: 'lost-stolen-damaged' },
  { topicSlug: 'account-security', slug: 'cant-log-in' },
]

export function getUrgentArticles(): Article[] {
  return URGENT.map(({ topicSlug, slug }) =>
    articles.find((a) => a.topicSlug === topicSlug && a.slug === slug),
  ).filter((a): a is Article => Boolean(a))
}
