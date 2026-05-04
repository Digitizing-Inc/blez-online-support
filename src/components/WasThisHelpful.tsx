'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react'
import { cn } from '@/lib/cn'

interface WasThisHelpfulProps {
  /** Article slug — passed to the eventual backend so feedback is attributable. */
  articleSlug: string
}

/**
 * Two-button "Was this helpful?" row with a follow-up textarea on No.
 * UI is fully wired but submission is a no-op for the prototype — the
 * dev should swap the placeholder `submit()` for a POST to `/api/feedback`
 * including `articleSlug`, `verdict`, and the optional comment.
 */
export default function WasThisHelpful({ articleSlug }: WasThisHelpfulProps) {
  const [verdict, setVerdict] = useState<'yes' | 'no' | null>(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function pick(value: 'yes' | 'no') {
    setVerdict(value)
    if (value === 'yes') {
      // Yes is a one-click submit — no follow-up question for positives.
      submit('yes', '')
    }
  }

  async function submit(v: 'yes' | 'no', text: string) {
    // Placeholder. Replace with: await fetch('/api/feedback', { ... })
    void articleSlug
    void v
    void text
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-secondary)]">
        <Check
          className="h-4 w-4 flex-shrink-0 text-[var(--success)]"
          strokeWidth={2.5}
        />
        Thanks — your feedback helps us prioritize what to fix next.
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
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit('no', comment.trim())
          }}
          className="mt-4 flex flex-col gap-3"
        >
          <label
            htmlFor={`feedback-${articleSlug}`}
            className="text-sm text-[var(--text-secondary)]"
          >
            What was missing or wrong?
          </label>
          <div className="input-shell h-auto py-2">
            <textarea
              id={`feedback-${articleSlug}`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Optional, but helpful."
              className="resize-none bg-transparent leading-relaxed"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm self-start"
          >
            Send feedback
          </button>
        </form>
      )}
    </div>
  )
}
