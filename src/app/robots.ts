import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.siteUrl.replace(/\/$/, '')
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block API routes that may exist once the chatbot backend is
        // wired (e.g. /api/chat). Search engines have no business
        // crawling them.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    // Explicit canonical host removes www/non-www ambiguity for legacy
    // crawlers that still honor the directive.
    host: base,
  }
}
