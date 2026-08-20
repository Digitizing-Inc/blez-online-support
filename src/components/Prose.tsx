import { Fragment } from 'react'
import type { ResourceSource } from '@/lib/resources'

/**
 * Renders a plain-text body into paragraphs and bullet lists. Blocks are
 * split on blank lines (`\n\n`); a block whose lines start with "- " becomes
 * a <ul>, everything else becomes a <p>.
 *
 * Inline citations: a `[N]` token in the text (1-indexed into `sources`) is
 * rendered as a superscript link to that source, so specific claims are
 * cited in place and cross-reference the Sources bibliography.
 */
export default function Prose({
  body,
  sources,
}: {
  body: string
  sources?: ResourceSource[]
}) {
  const blocks = body.split('\n\n').map((b) => b.trim()).filter(Boolean)

  return (
    <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
      {blocks.map((block, i) => {
        const lines = block.split('\n')
        const isList = lines.every((l) => l.trim().startsWith('- '))
        if (isList) {
          return (
            <ul key={i} className="flex list-disc flex-col gap-2 pl-5 marker:text-[var(--blez-blue)]">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^\s*-\s+/, ''), sources)}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {renderInline(l, sources)}
              </Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}

/** Splits text on `[N]` citation tokens and renders each as a superscript link. */
function renderInline(text: string, sources?: ResourceSource[]) {
  if (!sources || sources.length === 0 || !text.includes('[')) return text
  const parts = text.split(/(\[\d+\])/g)
  return parts.map((part, i) => {
    const m = part.match(/^\[(\d+)\]$/)
    if (m) {
      const n = Number(m[1])
      const src = sources[n - 1]
      if (src) {
        return (
          <sup key={i} className="whitespace-nowrap">
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-0.5 text-[0.7em] font-medium text-[var(--blez-blue)] hover:underline"
              aria-label={`Source ${n}: ${src.publisher ?? src.title}`}
            >
              [{n}]
            </a>
          </sup>
        )
      }
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}
