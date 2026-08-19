import { NextResponse } from 'next/server'

/**
 * Per-article view counter, backed by Upstash Redis over its REST API (so no
 * SDK dependency and nothing to install). Two env vars turn it on:
 *
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * With them unset (local dev, previews) every call returns `{ count: null }`
 * and the <ViewCount> badge simply hides — the pages work exactly as before.
 *
 *   GET  /api/views/:slug  → current count (for display, no increment)
 *   POST /api/views/:slug  → increment, then return the new count
 *
 * The browser calls this same-origin, so CSP `connect-src 'self'` covers it;
 * the server→Upstash call is not subject to the page CSP.
 */

const REST_URL = process.env.UPSTASH_REDIS_REST_URL
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

// Keep the Redis key safe and bounded — slugs are [a-z0-9-] by construction.
function keyFor(slug: string): string {
  return `views:${slug.replace(/[^a-z0-9-]/gi, '').slice(0, 128)}`
}

async function redis(command: 'INCR' | 'GET', key: string): Promise<number | null> {
  if (!REST_URL || !REST_TOKEN) return null
  try {
    const res = await fetch(
      `${REST_URL}/${command}/${encodeURIComponent(key)}`,
      {
        headers: { Authorization: `Bearer ${REST_TOKEN}` },
        cache: 'no-store',
      },
    )
    if (!res.ok) return null
    const data = (await res.json()) as { result?: unknown }
    const n = Number(data.result ?? 0)
    return Number.isFinite(n) ? n : 0
  } catch {
    return null
  }
}

type Ctx = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params
  const count = await redis('GET', keyFor(slug))
  return NextResponse.json({ count })
}

export async function POST(_req: Request, { params }: Ctx) {
  const { slug } = await params
  const count = await redis('INCR', keyFor(slug))
  return NextResponse.json({ count })
}
