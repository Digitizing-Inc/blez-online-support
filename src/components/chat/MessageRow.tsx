'use client'

import { memo, useState } from 'react'
import BlezMark from '@/components/BlezMark'
import Markdown from './Markdown'
import MessageActions from './MessageActions'
import CitationChips from './CitationChips'
import type { Message } from '@/lib/chat/types'
import { cn } from '@/lib/cn'

interface MessageRowProps {
  message: Message
  /** Called when the user clicks regenerate on this assistant message. */
  onRegenerate?: () => void
  /** Called when the user copies the assistant message — used to fire a toast. */
  onCopy?: () => void
  /** Called when the user thumbs up/down. */
  onFeedback?: (verdict: 'up' | 'down') => void
}

/**
 * One conversation message rendered in document style (avatar prefix +
 * full-width text), not as a bubble. Assistant messages get markdown,
 * citations, and an action row.
 *
 * Memoized at the bottom of the file so non-streaming rows don't
 * re-render every time the streaming row picks up a new token.
 */
function MessageRowInner({
  message,
  onRegenerate,
  onCopy,
  onFeedback,
}: MessageRowProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  async function copy() {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* noop */
    }
  }

  return (
    <article
      className={cn('group flex gap-4', isUser ? 'flex-row-reverse' : '')}
      aria-label={isUser ? 'Your message' : 'BlezBot reply'}
    >
      <div className="flex-shrink-0 pt-0.5">
        {isUser ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] text-xs font-semibold text-[var(--text-secondary)]">
            You
          </div>
        ) : (
          <BlezMark size="sm" thinking={message.streaming} />
        )}
      </div>

      <div
        className={cn(
          'min-w-0 flex-1',
          isUser && 'flex flex-col items-end text-right',
        )}
      >
        {isUser ? (
          // User messages stay plain text — no markdown, no actions.
          <div className="whitespace-pre-wrap rounded-lg bg-[var(--bg-elevated)] px-4 py-3 text-base leading-relaxed text-[var(--text-primary)]">
            {message.content}
          </div>
        ) : (
          <>
            <div className="text-base text-[var(--text-primary)]">
              {message.content ? (
                <Markdown text={message.content} />
              ) : message.streaming ? (
                <span className="italic text-[var(--text-muted)]">
                  BlezBot is thinking…
                </span>
              ) : null}
              {message.streaming && message.content && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-[var(--blez-blue)]"
                />
              )}
              {message.stopped && !message.streaming && (
                <span className="mt-2 block text-xs text-[var(--text-muted)]">
                  Stopped by you.
                </span>
              )}
            </div>

            {message.citations && message.citations.length > 0 && (
              <CitationChips citations={message.citations} />
            )}

            {!message.streaming && message.content && (
              <MessageActions
                copied={copied}
                feedback={message.feedback ?? null}
                canRegenerate={Boolean(onRegenerate)}
                onCopy={copy}
                onFeedback={(v) => onFeedback?.(v)}
                onRegenerate={() => onRegenerate?.()}
              />
            )}
          </>
        )}
      </div>
    </article>
  )
}

const MessageRow = memo(MessageRowInner, (prev, next) => {
  const a = prev.message
  const b = next.message
  return (
    a.id === b.id &&
    a.content === b.content &&
    a.streaming === b.streaming &&
    a.stopped === b.stopped &&
    a.feedback === b.feedback &&
    prev.onCopy === next.onCopy &&
    prev.onFeedback === next.onFeedback &&
    prev.onRegenerate === next.onRegenerate
  )
})

export default MessageRow
