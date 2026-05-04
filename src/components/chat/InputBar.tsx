'use client'

import { useEffect, useRef, useState, type Ref } from 'react'
import { Send, Square, Slash } from 'lucide-react'
import {
  matchSlashCommands,
  type SlashCommand,
} from '@/lib/chat/commands'
import { cn } from '@/lib/cn'

interface InputBarProps {
  /** True while the assistant is generating; flips Send to Stop. */
  generating: boolean
  onSubmit: (text: string) => void
  onStop: () => void
  onCommand: (cmd: SlashCommand) => void
  /** Optional ref to the underlying textarea, so the parent can focus
   *  it after `New chat` / conversation switch. */
  ref?: Ref<HTMLTextAreaElement>
}

const MAX_ROWS = 6
const MIN_HEIGHT_PX = 24 // single row of text at our line-height

/**
 * Multi-line auto-growing textarea + send-or-stop button. Includes a
 * slash-command picker that appears when the input starts with `/`.
 */
export default function InputBar({
  generating,
  onSubmit,
  onStop,
  onCommand,
  ref: externalRef,
}: InputBarProps) {
  const [value, setValue] = useState('')
  const [cmdSelected, setCmdSelected] = useState(0)
  const ref = useRef<HTMLTextAreaElement>(null)

  // Forward the textarea ref to the parent so it can `.focus()` on
  // events outside this component (new chat, conversation switch).
  useEffect(() => {
    if (typeof externalRef === 'function') externalRef(ref.current)
    else if (externalRef) {
      ;(externalRef as React.MutableRefObject<HTMLTextAreaElement | null>).current =
        ref.current
    }
  }, [externalRef])

  // Auto-grow: reset then size to scrollHeight, capped at MAX_ROWS.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = '0px'
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 22
    const max = lineHeight * MAX_ROWS
    el.style.height = Math.min(max, Math.max(MIN_HEIGHT_PX, el.scrollHeight)) + 'px'
  }, [value])

  const trimmed = value.trim()
  const matchedCommands = matchSlashCommands(trimmed)
  const showCommands =
    trimmed.startsWith('/') && matchedCommands.length > 0 && !generating

  function send() {
    if (!trimmed || generating) return
    if (trimmed.startsWith('/')) {
      // Pick the highlighted command instead of sending text.
      const cmd =
        matchedCommands[
          Math.min(cmdSelected, matchedCommands.length - 1)
        ]
      if (cmd) {
        setValue('')
        setCmdSelected(0)
        onCommand(cmd)
        return
      }
    }
    onSubmit(trimmed)
    setValue('')
    setCmdSelected(0)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (showCommands) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCmdSelected((i) => (i + 1) % matchedCommands.length)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCmdSelected(
          (i) => (i - 1 + matchedCommands.length) % matchedCommands.length,
        )
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        const cmd = matchedCommands[cmdSelected]
        if (cmd) setValue(`/${cmd.name} `)
        return
      }
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="relative">
      {showCommands && (
        <ul className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]">
          {matchedCommands.map((cmd, i) => (
            <li key={cmd.name}>
              <button
                type="button"
                onMouseEnter={() => setCmdSelected(i)}
                onClick={() => {
                  setValue('')
                  setCmdSelected(0)
                  onCommand(cmd)
                }}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors',
                  i === cmdSelected
                    ? 'bg-[var(--blez-blue-ghost)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]',
                )}
              >
                <Slash
                  className="h-3.5 w-3.5 text-[var(--text-muted)]"
                  strokeWidth={2}
                />
                <span className="font-medium">/{cmd.name}</span>
                <span className="text-xs text-[var(--text-muted)]">
                  {cmd.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
        className="flex w-full items-end gap-2"
      >
        <div className="input-shell flex-1 min-h-[44px] py-2">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask a question or type / for commands…"
            rows={1}
            className="resize-none bg-transparent leading-relaxed"
            aria-label="Message"
          />
        </div>
        {generating ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop generating"
            className="btn btn-secondary btn-icon btn-md"
            title="Stop generating"
          >
            <Square className="h-4 w-4" strokeWidth={2.5} />
          </button>
        ) : (
          <div className="group relative">
            <button
              type="submit"
              className="btn btn-primary btn-icon btn-md"
              disabled={!trimmed}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
            {!trimmed && (
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs text-[var(--text-primary)] opacity-0 shadow-[var(--shadow-md)] transition-opacity duration-150 group-hover:opacity-100"
              >
                Ask a question to send
              </span>
            )}
          </div>
        )}
      </form>

      <p className="mt-2 hidden text-right text-[11px] text-[var(--text-faint)] sm:block">
        <kbd className="inline-block rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono">
          ↵
        </kbd>{' '}
        send ·{' '}
        <kbd className="inline-block rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono">
          ⇧↵
        </kbd>{' '}
        new line ·{' '}
        <kbd className="inline-block rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono">
          /
        </kbd>{' '}
        commands
      </p>
    </div>
  )
}
