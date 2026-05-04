import type { Article } from './types'

/** Cap a placeholder article body so its 'placeholder' status is loud.
 *  Drop this helper once real bodies ship from the CMS. */
const placeholder = (intro: string) =>
  `${intro}\n\nThis article is a placeholder. Final copy will be written before launch — the structure and data shape are stable so backend wiring can proceed.`

export const articles: Article[] = [
  // ── Getting Started ──────────────────────────────────────────
  {
    slug: 'what-is-blez-online',
    topicSlug: 'getting-started',
    title: 'What is Blez Online? How virtual packs work',
    summary:
      'A quick tour of how Blez Online works — virtual packs of real cards, ripped on screen, shipped or sold back.',
    body: placeholder(
      'Blez Online is a digital pack-ripping marketplace. You pick a pack, rip it on screen, and the real cards inside are yours — to ship to your door or sell back instantly.',
    ),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'pick-rip-reveal-walkthrough',
    topicSlug: 'getting-started',
    title: 'How "Pick. Rip. Reveal." works — full walkthrough',
    summary: 'Step-by-step: choose a pack, rip it, see the cards.',
    body: placeholder('Pick. Rip. Reveal. — the three-step flow.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'creating-account-id-verification',
    topicSlug: 'getting-started',
    title: 'Creating an account and verifying your identity',
    summary:
      'How to sign up and complete identity verification before your first rip.',
    body: placeholder(
      'Account creation takes about two minutes. Identity verification adds another step but is required by law for most accounts.',
    ),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'why-id-age-verification',
    topicSlug: 'getting-started',
    title: 'Why we ask for ID/age verification',
    summary: 'The legal and safety reasons we verify identity.',
    body: placeholder('We verify ID and age to comply with applicable law.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'blez-points',
    topicSlug: 'getting-started',
    title: 'Blez Points: what they are, how to earn them, how to spend them',
    summary:
      'The full guide to Blez Points — earning, redeeming, expiry, and how they appear on your account.',
    body: placeholder(
      'Blez Points are an in-app credit you can earn on certain rips and use toward future packs.',
    ),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'using-promo-codes',
    topicSlug: 'getting-started',
    title: 'Using promo codes (BLEZ20, etc.)',
    summary: 'How to enter a code, when codes apply, and why some are denied.',
    body: placeholder(
      'Promo codes apply at checkout. Some are tied to a specific account or pack tier.',
    ),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'card-architects',
    topicSlug: 'getting-started',
    title: 'How "Card Architects" curate repacks',
    summary: 'Who picks the cards in your repacks and how they decide.',
    body: placeholder(
      'Card Architects are the curators behind every repack — what goes in, why, and at what odds.',
    ),
    lastUpdated: '2026-04-15',
  },

  // ── Buying & Payments ────────────────────────────────────────
  {
    slug: 'accepted-payment-methods',
    topicSlug: 'buying-payments',
    title: 'Accepted payment methods',
    summary: 'Cards, wallets, and other payment methods supported on Blez.',
    body: placeholder('Accepted methods include major credit/debit cards.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'why-payment-declined',
    topicSlug: 'buying-payments',
    title: 'Why my payment was declined',
    summary:
      'Common reasons for declines and what to try if your payment is rejected.',
    body: placeholder('Payments can decline for several reasons.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'sales-tax',
    topicSlug: 'buying-payments',
    title: 'Sales tax and how it\'s calculated',
    summary: 'When sales tax applies, where, and at what rates.',
    body: placeholder('Tax is calculated based on your shipping address.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'currency-international-payments',
    topicSlug: 'buying-payments',
    title: 'Currency and international payments',
    summary: 'How currency conversion works on international purchases.',
    body: placeholder('Prices are billed in the listed currency.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'order-confirmation-receipts',
    topicSlug: 'buying-payments',
    title: 'Order confirmation and receipts',
    summary: 'Where to find your order confirmation and download receipts.',
    body: placeholder('Order confirmations are sent by email immediately.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'cancel-after-purchase',
    topicSlug: 'buying-payments',
    title: 'Can I cancel an order after purchase?',
    summary: 'Cancellation rules and the short window we can act in.',
    body: placeholder('Once a pack is ripped, the rip is final.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'refund-policy',
    topicSlug: 'buying-payments',
    title: 'Refund policy (and the "all sales final" rule explained)',
    summary:
      'When refunds are possible, when they aren\'t, and the reasoning behind "all sales final".',
    body: placeholder(
      'Most rips are final. We make exceptions only in narrow cases.',
    ),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'chargebacks-disputes',
    topicSlug: 'buying-payments',
    title: 'Chargebacks and disputes — what happens to your account',
    summary: 'How disputes affect your standing and balance on Blez.',
    body: placeholder(
      'Chargebacks have account-level consequences. Talk to us first.',
    ),
    lastUpdated: '2026-04-15',
  },

  // ── Ripping Packs & Reveals ──────────────────────────────────
  {
    slug: 'how-card-odds-work',
    topicSlug: 'ripping-reveals',
    title: 'How card odds work in our repacks',
    summary: 'Where the odds come from and how they\'re shown.',
    body: placeholder('Each repack is published with its odds.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'fairness-policy',
    topicSlug: 'ripping-reveals',
    title: 'Are repacks truly random? Our fairness policy',
    summary: 'How randomness is enforced and audited.',
    body: placeholder('Randomness is provably fair via a published method.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'reveal-glitch',
    topicSlug: 'ripping-reveals',
    title: 'What happens if a reveal glitches mid-rip',
    summary: 'Recovery flow when something interrupts a rip in progress.',
    body: placeholder('A glitched rip is recoverable. Your cards are safe.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'pack-tiers',
    topicSlug: 'ripping-reveals',
    title: 'Pack tiers and what\'s typically inside each',
    summary: 'A look at Value Pack, Breakers Box, Ultimate Multipack, Prize Edition.',
    body: placeholder('Each pack tier has its own typical card mix.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'why-no-preview-before-rip',
    topicSlug: 'ripping-reveals',
    title: 'Why you can\'t see the cards before you rip',
    summary:
      'The integrity reason we keep packs sealed (visually) until rip time.',
    body: placeholder('Pre-rip visibility would break randomness guarantees.'),
    lastUpdated: '2026-04-15',
  },

  // ── Ship It vs. Cash Out ─────────────────────────────────────
  {
    slug: 'ship-vs-instant-offer',
    topicSlug: 'selling-withdrawals',
    title:
      'Choosing between shipping your card and taking the instant offer',
    summary: 'How to decide between shipping and selling back.',
    body: placeholder('Both options are fine. Pick what fits your goals.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'instant-offer-values',
    topicSlug: 'selling-withdrawals',
    title: 'How instant offer values are calculated',
    summary: 'The inputs that drive the instant offer for any given card.',
    body: placeholder(
      'Offers come from market comps adjusted for condition and tier.',
    ),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'time-limit-ship-vs-cash',
    topicSlug: 'selling-withdrawals',
    title: 'Time limit for deciding to ship vs. cash out',
    summary: 'How long you have to decide before the default kicks in.',
    body: placeholder('You have a fixed window to decide.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'change-mind-after-choosing',
    topicSlug: 'selling-withdrawals',
    title: 'Can I change my mind after choosing?',
    summary: 'When a decision is reversible and when it isn\'t.',
    body: placeholder('Some decisions are reversible within a short window.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'cashing-out-points-vs-real-money',
    topicSlug: 'selling-withdrawals',
    title: 'Cashing out: how funds are credited (Blez Points vs. real money)',
    summary: 'When you get points and when you get real money.',
    body: placeholder(
      'Cash-out destination depends on the pack and option you chose.',
    ),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'withdrawing-balance',
    topicSlug: 'selling-withdrawals',
    title: 'Withdrawing your balance — minimums, methods, processing time',
    summary: 'Minimums, supported methods, and how long withdrawals take.',
    body: placeholder('Withdrawals process within a stated window.'),
    lastUpdated: '2026-04-15',
  },

  // ── Shipping ─────────────────────────────────────────────────
  {
    slug: 'domestic-shipping',
    topicSlug: 'shipping',
    title: 'Domestic shipping rates and timelines',
    summary: 'What you pay and how fast it gets to you in the US.',
    body: placeholder('Domestic shipping rates and timelines are listed here.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'international-shipping',
    topicSlug: 'shipping',
    title: 'International shipping — countries we ship to',
    summary: 'The current list of supported destinations and any restrictions.',
    body: placeholder('We ship internationally to the following regions.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'combined-vault-shipping',
    topicSlug: 'shipping',
    title: 'Combined/vault shipping (holding cards to ship together)',
    summary: 'How the vault works and when to use it.',
    body: placeholder(
      'Hold cards in the vault and ship them in a single package.',
    ),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'vault-hold-duration',
    topicSlug: 'shipping',
    title: 'How long we\'ll hold your cards before shipping',
    summary: 'Hold limits and what happens past them.',
    body: placeholder('Holds last for a defined window.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'shipping-insurance',
    topicSlug: 'shipping',
    title: 'Shipping insurance and signature requirements',
    summary: 'When insurance is included and when signature is required.',
    body: placeholder('Higher-value shipments include insurance.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'tracking-shipment',
    topicSlug: 'shipping',
    title: 'Tracking your shipment',
    summary: 'Where to find tracking and what each status means.',
    body: placeholder('Tracking links appear on your order page.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'lost-stolen-damaged',
    topicSlug: 'shipping',
    title: 'Lost, stolen, or damaged packages — claim process',
    summary: 'How and when to file a claim and what to expect.',
    body: placeholder('File a claim within the stated window.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'customs-duties',
    topicSlug: 'shipping',
    title: 'Customs, duties, and international taxes',
    summary: 'Who pays what at the border.',
    body: placeholder('Duties are typically the recipient\'s responsibility.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'address-changes',
    topicSlug: 'shipping',
    title: 'Address changes after an order is placed',
    summary: 'When an address change is possible and how to request one.',
    body: placeholder('Address changes are limited once shipping starts.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'returned-to-sender',
    topicSlug: 'shipping',
    title: 'What happens if a package is returned to sender',
    summary: 'How returns are handled and what it costs to reship.',
    body: placeholder('Returned packages can be reshipped after correction.'),
    lastUpdated: '2026-04-15',
  },

  // ── Card Quality & Condition ─────────────────────────────────
  {
    slug: 'protecting-non-graded-cards',
    topicSlug: 'card-quality',
    title: 'How non-graded cards are protected and stored',
    summary: 'The materials and process behind safe storage.',
    body: placeholder('Cards are stored in protective sleeves and toploaders.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'condition-grades-mint-nm',
    topicSlug: 'card-quality',
    title: 'What "Mint" or "NM" means in our listings',
    summary: 'How we describe condition — and what each label promises.',
    body: placeholder('Each condition label maps to a defined visual standard.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'condition-disputes',
    topicSlug: 'card-quality',
    title: 'Condition disputes — how to file',
    summary: 'When and how to dispute a card\'s described condition.',
    body: placeholder('Open a dispute within the stated window with photos.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'damaged-on-arrival',
    topicSlug: 'card-quality',
    title: 'Damaged-on-arrival claims (timeline, photos required)',
    summary: 'What to do if a card arrives damaged.',
    body: placeholder('Open a claim within the window. Photos required.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'graded-cards',
    topicSlug: 'card-quality',
    title: 'Graded cards: PSA, BGS, SGC — what we accept and sell',
    summary: 'The grading services we honor and how we list graded cards.',
    body: placeholder(
      'We accept and sell cards graded by PSA, BGS, and SGC.',
    ),
    lastUpdated: '2026-04-15',
  },

  // ── Account & Security ───────────────────────────────────────
  {
    slug: 'updating-profile',
    topicSlug: 'account-security',
    title: 'Updating your profile, email, and password',
    summary: 'How to change profile details, email, and password.',
    body: placeholder('Profile changes are made under Account Settings.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'two-factor-auth',
    topicSlug: 'account-security',
    title: 'Two-factor authentication',
    summary: 'How 2FA works on Blez and how to set it up.',
    body: placeholder('We strongly recommend enabling 2FA.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'cant-log-in',
    topicSlug: 'account-security',
    title: 'I can\'t log into my account',
    summary: 'Steps to recover access when you can\'t log in.',
    body: placeholder('Try password reset, then contact support.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'suspicious-activity',
    topicSlug: 'account-security',
    title: 'Suspicious activity / account compromise',
    summary: 'What to do if you suspect your account was compromised.',
    body: placeholder('Lock the account, then contact support immediately.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'closing-account',
    topicSlug: 'account-security',
    title: 'Closing your account and what happens to your balance/cards',
    summary: 'How closure works for balances, vault items, and points.',
    body: placeholder('Closure has implications for balance and vault items.'),
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'account-suspended-banned',
    topicSlug: 'account-security',
    title: 'Why an account might be suspended or banned',
    summary: 'The behaviors that lead to action and how appeals work.',
    body: placeholder(
      'Bans are reserved for serious or repeated policy breaches.',
    ),
    lastUpdated: '2026-04-15',
  },

  // ── Money & Limits ───────────────────────────────────────────
  {
    slug: 'tax-forms-1099',
    topicSlug: 'money-limits',
    title: 'Tax forms and 1099s on cash-outs',
    summary:
      'When Blez issues tax documents, what thresholds trigger them, and how to access them.',
    body: placeholder(
      'Tax docs are issued when cash-out totals cross IRS reporting thresholds in a calendar year.',
    ),
    lastUpdated: '2026-04-22',
  },
  {
    slug: 'where-blez-is-available',
    topicSlug: 'money-limits',
    title: 'Where Blez is available',
    summary:
      'Countries and US states where you can use Blez, and any feature restrictions by region.',
    body: placeholder(
      'Blez operates where rules around digital collectibles and cash-out are clear and compliant.',
    ),
    lastUpdated: '2026-04-22',
  },
  {
    slug: 'deposit-withdrawal-limits',
    topicSlug: 'money-limits',
    title: 'Deposit and withdrawal limits',
    summary:
      'Daily, weekly, and monthly caps on adding funds and pulling money out.',
    body: placeholder(
      'Limits scale with verification tier. Early accounts have lower caps; verified accounts unlock more.',
    ),
    lastUpdated: '2026-04-22',
  },
  {
    slug: 'rip-limits',
    topicSlug: 'money-limits',
    title: 'Daily and weekly rip limits',
    summary:
      'How many packs you can rip in a window, and why the limits exist.',
    body: placeholder(
      'Limits protect responsible collecting and keep the platform compliant.',
    ),
    lastUpdated: '2026-04-22',
  },
  {
    slug: 'aml-kyc-compliance',
    topicSlug: 'money-limits',
    title: 'AML and KYC compliance, explained',
    summary:
      'How Blez complies with anti-money-laundering and know-your-customer regulations, and what it means for you.',
    body: placeholder(
      'KYC is a one-time verification at signup. AML is an ongoing monitoring layer that occasionally pauses transactions for review.',
    ),
    lastUpdated: '2026-04-22',
  },
  {
    slug: 'dispute-timelines',
    topicSlug: 'money-limits',
    title: 'Dispute timelines and SLAs — quick reference',
    summary:
      'Filing windows, response targets, and resolution timelines for every dispute type, in one table.',
    body: placeholder(
      'Most disputes resolve within 7 business days. Chargebacks can run longer because the card network drives the clock.',
    ),
    lastUpdated: '2026-04-22',
  },
]

export function getArticle(
  topicSlug: string,
  slug: string,
): Article | undefined {
  return articles.find((a) => a.topicSlug === topicSlug && a.slug === slug)
}

export function getArticlesForTopic(slug: string): Article[] {
  return articles.filter((a) => a.topicSlug === slug)
}
