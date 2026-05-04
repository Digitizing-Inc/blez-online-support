'use client'

import { Copy, Check, ThumbsUp, ThumbsDown, RotateCw } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { FeedbackVerdict } from '@/lib/chat/types'

interface MessageActionsProps {
  copied: boolean
  feedback: FeedbackVerdict
  canRegenerate: boolean
  onCopy: () => void
  onFeedback: (v: 'up' | 'down') => void
  onRegenerate: () => void
}

/**
 * Hover-revealed action row under each assistant reply: copy, thumb up,
 * thumb down, regenerate. Always visible on touch devices via the
 * surrounding container's responsive opacity rules.
 */
export default function MessageActions({
  copied,
  feedback,
  canRegenerate,
  onCopy,
  onFeedback,
  onRegenerate,
}: MessageActionsProps) {
  return (
    <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity duration-150 focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
      <ActionButton
        label={copied ? 'Copied' : 'Copy'}
        active={copied}
        onClick={onCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-[var(--success)]" strokeWidth={2} />
        ) : (
          <Copy className="h-4 w-4" strokeWidth={2} />
        )}
      </ActionButton>
      <ActionButton
        label="Helpful"
        active={feedback === 'up'}
        onClick={() => onFeedback('up')}
      >
        <ThumbsUp className="h-4 w-4" strokeWidth={2} />
      </ActionButton>
      <ActionButton
        label="Not helpful"
        active={feedback === 'down'}
        onClick={() => onFeedback('down')}
      >
        <ThumbsDown className="h-4 w-4" strokeWidth={2} />
      </ActionButton>
      {canRegenerate && (
        <ActionButton label="Regenerate" onClick={onRegenerate}>
          <RotateCw className="h-4 w-4" strokeWidth={2} />
        </ActionButton>
      )}
    </div>
  )
}

function ActionButton({
  children,
  label,
  active,
  onClick,
}: {
  children: React.ReactNode
  label: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--blez-blue-ghost)] hover:text-[var(--text-primary)]',
        active && 'text-[var(--blez-blue)]',
      )}
    >
      {children}
    </button>
  )
}
