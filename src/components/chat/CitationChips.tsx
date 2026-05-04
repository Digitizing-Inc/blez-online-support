import Link from 'next/link'
import { FileText } from 'lucide-react'
import type { Citation } from '@/lib/chat/types'

interface CitationChipsProps {
  citations: Citation[]
}

export default function CitationChips({ citations }: CitationChipsProps) {
  if (citations.length === 0) return null
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {citations.map((c) => (
        <li key={`${c.topicSlug}-${c.slug}`}>
          <Link
            href={`/articles/${c.topicSlug}/${c.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--blez-blue)]/50 hover:text-[var(--text-primary)] hover:no-underline"
          >
            <FileText className="h-3 w-3" strokeWidth={2} />
            {c.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
