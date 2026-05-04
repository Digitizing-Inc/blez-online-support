/**
 * Site-wide configuration constants. The values here are the defaults the
 * front-end ships with — the dev who wires the backend should swap to env
 * vars where appropriate (e.g. NEXT_PUBLIC_SUPPORT_EMAIL).
 */
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
   * Base URL of the main Blez Online storefront. Used for footer links
   * back to the shop, inventory, etc. Swap to a relative path or env var
   * if/when the support site is mounted at the same origin.
   */
  mainSiteUrl: 'https://blezonline.com',
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
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'pt', label: 'Português' },
    { code: 'ja', label: '日本語' },
  ],
} as const

export type LanguageCode = (typeof siteConfig.languages)[number]['code']
