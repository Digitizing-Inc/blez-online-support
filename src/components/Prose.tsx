import { Fragment } from 'react'

/**
 * Renders a plain-text body into paragraphs and bullet lists. Blocks are
 * split on blank lines (`\n\n`); a block whose lines start with "- " becomes
 * a <ul>, everything else becomes a <p>. Keeps content data free of markup
 * while still supporting the bullet lists the source articles use.
 */
export default function Prose({ body }: { body: string }) {
  const blocks = body.split('\n\n').map((b) => b.trim()).filter(Boolean)

  return (
    <div className="flex flex-col gap-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
      {blocks.map((block, i) => {
        const lines = block.split('\n')
        const isList = lines.every((l) => l.trim().startsWith('- '))
        if (isList) {
          return (
            <ul key={i} className="flex list-disc flex-col gap-2 pl-5 marker:text-[var(--blez-blue)]">
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^\s*-\s+/, '')}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {l}
              </Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}
