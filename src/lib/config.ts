/**
 * Site-wide configuration constants. The values here are the defaults the
 * front-end ships with — the dev who wires the backend should swap to env
 * vars where appropriate (e.g. NEXT_PUBLIC_SUPPORT_EMAIL).
 */

// Main storefront origin. Keep shopUrl and other storefront links in sync.
const MAIN_SITE_URL = 'https://blezonline.com'

export const siteConfig = {
  name: 'Blez Online Support',
  tagline: 'Rip a Pack, Score Big.',
  supportEmail: 'support@blezonline.com',
  /**
   * Canonical site URL. Used by Next's `metadataBase`, the sitemap, and
   * robots. Falls back to the current dev origin via env var override
   * (`NEXT_PUBLIC_SITE_URL`) so previews can self-identify.
   */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://support.blezonline.com',
  /**
   * Search-engine indexing switch. Defaults to OFF so the prototype's
   * placeholder article bodies don't get indexed as thin/duplicate content.
   * Set `NEXT_PUBLIC_ALLOW_INDEX=true` in the deploy env once real article
   * copy is wired — that flips article/topic pages to indexable and adds
   * them back to the sitemap. The home page is always indexable.
   */
  allowIndex: process.env.NEXT_PUBLIC_ALLOW_INDEX === 'true',
  /**
   * Base URL of the main Blez Online storefront. Used for footer links
   * back to the shop, inventory, etc. Swap to a relative path or env var
   * if/when the support site is mounted at the same origin.
   */
  mainSiteUrl: MAIN_SITE_URL,
  /** Storefront shop/pack-browsing page — the primary conversion target. */
  shopUrl: `${MAIN_SITE_URL}/shop`,
  /**
   * Customer-facing support response expectation, shown on the contact
   * surfaces. TODO: confirm the real SLA with the support team before launch.
   */
  supportResponseTime: 'Most emails get a reply within 1 business day.',
  /** Categories offered in the contact form (helps triage/route tickets). */
  contactCategories: [
    'Buying & Payments',
    'Ripping & Reveals',
    'Selling & Withdrawals',
    'Shipping',
    'Card Quality & Condition',
    'Account & Security',
    'Something else',
  ],
  social: {
    facebook: 'https://www.facebook.com/blezonline',
    x: 'https://x.com/blezonline',
    instagram: 'https://www.instagram.com/blezonline/',
    youtube: 'https://www.youtube.com/@BLEZSportsCards',
  },
  /**
   * The product owner has not yet specified the language list. Keeping
   * English as the only confirmed locale; the additional entries below are
   * placeholders so the language switcher renders with realistic options.
   */
  languages: [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ],
} as const

export type LanguageCode = (typeof siteConfig.languages)[number]['code']
