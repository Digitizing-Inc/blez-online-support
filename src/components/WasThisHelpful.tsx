'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ThumbsUp, ThumbsDown, Check, Mail } from 'lucide-react'
import { cn } from '@/lib/cn'

interface WasThisHelpfulProps {
  /** Article slug — passed to the eventual backend so feedback is attributable. */
  articleSlug: string
  /** Article title — used to pre-fill the contact form on an unhelpful vote. */
  articleTitle: string
}

/**
 * "Was this helpful?" with two upgrades over a basic thumbs widget:
 *   1. The vote is remembered per-article (localStorage) so we don't re-ask.
 *   2. An unhelpful vote escalates — it routes to the contact form with the
 *      article + the user's comment carried through, instead of dead-ending.
 * Submission itself is still a no-op stub; the dev should POST to
 * `/api/feedback` with `articleSlug`, `verdict`, and the optional comment.
 */
export default function WasThisHelpful({
  articleSlug,
  articleTitle,
}: WasThisHelpfulProps) {
  const [verdict, setVerdict] = useState<'yes' | 'no' | null>(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState<null | 'yes' | 'no'>(null)

  const storageKey = `blez-helpful:${articleSlug}`

  // Don't re-ask if this reader already voted on this article.
  useEffect(() => {
    try {
      const prior = window.localStorage.getItem(storageKey)
      if (prior === 'yes' || prior === 'no') setSubmitted(prior)
    } catch {
      // localStorage unavailable — just show the prompt.
    }
  }, [storageKey])

  function record(v: 'yes' | 'no') {
    // No backend yet — persist locally so we don't re-ask this reader. When
    // /api/feedback lands, also POST { articleSlug, verdict: v } from here.
    try {
      window.localStorage.setItem(storageKey, v)
    } catch {
      // ignore
    }
  }

  function pick(value: 'yes' | 'no') {
    setVerdict(value)
    record(value)
    // Yes → thank them immediately. No → keep the escalation form open so they
    // can send detail to the team (a real path, not a dropped stub).
    if (value === 'yes') setSubmitted('yes')
  }

  const contactHref = `/contact?subject=${encodeURIComponent(
    `Help with: ${articleTitle}`,
  )}${comment.trim() ? `&note=${encodeURIComponent(comment.trim())}` : ''}`

  if (submitted) {
    return (
      <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Check
            className="h-4 w-4 flex-shrink-0 text-[var(--success)]"
            strokeWidth={2.5}
          />
          Thanks — your feedback helps us prioritize what to fix next.
        </div>
        {submitted === 'no' && (
          <div className="mt-4 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--text-primary)]">
              Still need a hand? Our team can help.
            </p>
            <Link
              href={contactHref}
              className="btn btn-primary btn-sm self-start sm:self-auto"
            >
              <Mail className="h-4 w-4" strokeWidth={2} />
              Contact support
            </Link>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-[var(--text-primary)]">
          Was this helpful?
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => pick('yes')}
            aria-label="Yes, this was helpful"
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors',
              verdict === 'yes'
                ? 'border-[var(--blez-blue)] bg-[var(--blez-blue-ghost)] text-[var(--blez-blue)]'
                : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
            )}
          >
            <ThumbsUp className="h-4 w-4" strokeWidth={2} />
            Yes
          </button>
          <button
            type="button"
            onClick={() => pick('no')}
            aria-label="No, this was not helpful"
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors',
              verdict === 'no'
                ? 'border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]'
                : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
            )}
          >
            <ThumbsDown className="h-4 w-4" strokeWidth={2} />
            No
          </button>
        </div>
      </div>

      {verdict === 'no' && (
        <div className="mt-4 flex flex-col gap-3">
          <label
            htmlFor={`feedback-${articleSlug}`}
            className="text-sm text-[var(--text-secondary)]"
          >
            Sorry about that. Tell our team what was missing and we&rsquo;ll
            help.
          </label>
          <div className="input-shell h-auto py-2">
            <textarea
              id={`feedback-${articleSlug}`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="What were you looking for? (optional)"
              className="resize-none bg-transparent leading-relaxed"
            />
          </div>
          <Link href={contactHref} className="btn btn-primary btn-sm self-start">
            <Mail className="h-4 w-4" strokeWidth={2} />
            Send to our team
          </Link>
        </div>
      )}
    </div>
  )
}
