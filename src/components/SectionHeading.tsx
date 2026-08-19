'use client'

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'

/**
 * Section heading with a hover "copy deep link" affordance. The anchor target
 * is the wrapping <section id>, so the copied URL jumps straight to this
 * section. The icon stays hidden until hover or keyboard focus to keep the
 * reading view clean. Renders the same h2 styling the pages used inline before.
 */
export default function SectionHeading({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard blocked (e.g. insecure context) — still update the hash so
      // the address bar itself becomes the shareable deep link.
    }
    history.replaceState(null, '', `#${id}`)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <h2 className="group/heading flex items-center gap-2 text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl">
      <span>{children}</span>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Link copied' : 'Copy link to this section'}
        className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-[var(--text-faint)] opacity-0 transition-all hover:bg-[var(--blez-blue-ghost)] hover:text-[var(--blez-blue)] focus-visible:opacity-100 group-hover/heading:opacity-100"
      >
        {copied ? (
          <Check className="h-4 w-4 text-[var(--success)]" strokeWidth={2.5} />
        ) : (
          <Link2 className="h-4 w-4" strokeWidth={2} />
        )}
      </button>
    </h2>
  )
}
