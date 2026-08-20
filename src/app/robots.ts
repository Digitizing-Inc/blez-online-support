import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.siteUrl.replace(/\/$/, '')
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block any API routes that get wired in later — search engines
        // have no business crawling them.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    // Explicit canonical host removes www/non-www ambiguity for legacy
    // crawlers that still honor the directive.
    host: base,
  }
}
