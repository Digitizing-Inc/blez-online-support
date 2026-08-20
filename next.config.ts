import type { NextConfig } from 'next'

/**
 * Baseline Content-Security-Policy. `'unsafe-inline'` is required on
 * script-src/style-src because Next injects an inline bootstrap + streaming
 * script and inline styles, and this static build has no nonce pipeline.
 * It still meaningfully restricts *origins* (scripts/styles/fonts/images/
 * connections are self-only), blocks framing, plugins, and cross-origin
 * form posts. Harden to a nonce- or hash-based policy — and widen
 * connect-src/img-src for whatever backend, analytics, and CDN hosts the
 * real site uses — when that infrastructure lands.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "form-action 'self'",
].join('; ')

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // /articles existed historically; now the article tile grid lives
      // at `/`. Use a 308 permanent redirect so SEO signal consolidates.
      {
        source: '/articles',
        destination: '/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
