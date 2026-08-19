'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

/**
 * The little 👁 view counter shown in an article/resource meta line. On first
 * visit within a browser session it POSTs to increment; a refresh in the same
 * session just GETs (so refreshing doesn't inflate the count). Renders nothing
 * until a positive count comes back — so with no backend configured, or on a
 * brand-new page, it stays invisible instead of showing a lonely "0".
 */
export default function ViewCount({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const key = `blez-viewed:${slug}`
    let cancelled = false

    let already: string | null = null
    try {
      already = sessionStorage.getItem(key)
      if (!already) sessionStorage.setItem(key, '1')
    } catch {
      // sessionStorage unavailable — fall back to a plain read (GET).
      already = '1'
    }

    fetch(`/api/views/${encodeURIComponent(slug)}`, {
      method: already ? 'GET' : 'POST',
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { count?: number | null } | null) => {
        if (!cancelled && data && typeof data.count === 'number') {
          setCount(data.count)
        }
      })
      .catch(() => {
        // Counter is non-essential — swallow errors and stay hidden.
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (count === null || count <= 0) return null

  return (
    <span
      className="inline-flex items-center gap-1 text-xs text-[var(--text-faint)]"
      title={`${count.toLocaleString()} ${count === 1 ? 'view' : 'views'}`}
    >
      <span aria-hidden="true" className="mr-1">
        ·
      </span>
      <Eye className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      {count.toLocaleString()}
    </span>
  )
}
