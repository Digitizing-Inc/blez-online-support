'use client'

import { memo, useState } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, Check } from 'lucide-react'

interface MarkdownProps {
  text: string
}

// ── Link safety ─────────────────────────────────────────────────────────
// react-markdown 10 follows links as-is; a malicious shared chat could
// inject `[click](javascript:alert(1))`. Reject anything that isn't a
// safe scheme.
const SAFE_SCHEMES = /^(https?:|mailto:|tel:|#|\/)/i

function safeHref(href: string | undefined): string | undefined {
  if (!href) return undefined
  // Allow relative paths and fragments, plus the explicit safe schemes.
  if (SAFE_SCHEMES.test(href)) return href
  return undefined
}

// ── Renderers (lifted out so they're stable across renders) ─────────────

function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const text = extractText(children)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* noop */
    }
  }

  return (
    <div className="group relative my-4">
      <pre className="overflow-x-auto rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4 text-sm leading-relaxed text-[var(--text-primary)]">
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-muted)] opacity-0 transition-opacity hover:text-[var(--text-primary)] group-hover:opacity-100 focus-visible:opacity-100"
      >
        {copied ? (
          <Check className="h-4 w-4 text-[var(--success)]" strokeWidth={2} />
        ) : (
          <Copy className="h-4 w-4" strokeWidth={2} />
        )}
      </button>
    </div>
  )
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    const props = (node as { props?: { children?: React.ReactNode } }).props
    if (props && 'children' in props) return extractText(props.children)
  }
  return ''
}

// Defined once, outside the component, so react-markdown doesn't see a
// new `components` object on every render — keeps streaming fast.
const COMPONENTS: Components = {
  a: ({ children, href }) => {
    const safe = safeHref(href)
    if (!safe) return <span>{children}</span>
    const external = safe.startsWith('http')
    return (
      <a
        href={safe}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-[var(--blez-blue)] underline underline-offset-4 hover:text-[var(--blez-blue-hover)]"
      >
        {children}
      </a>
    )
  },
  code: ({ children, className, ...props }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code
          {...props}
          className="rounded bg-[var(--bg-surface-2)] px-1.5 py-0.5 text-[0.9em] text-[var(--text-primary)]"
        >
          {children}
        </code>
      )
    }
    return (
      <code {...props} className={className}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  ul: ({ children }) => (
    <ul className="my-3 ml-5 list-disc marker:text-[var(--text-muted)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 ml-5 list-decimal marker:text-[var(--text-muted)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="my-1">{children}</li>,
  h1: ({ children }) => (
    <h1 className="mb-3 mt-5 text-xl font-semibold text-[var(--text-primary)]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-5 text-lg font-semibold text-[var(--text-primary)]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-4 text-base font-semibold text-[var(--text-primary)]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-3 leading-relaxed first:mt-0 last:mb-0">{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-[var(--blez-blue)] pl-4 italic text-[var(--text-secondary)]">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-md border border-[var(--border-subtle)]">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--bg-surface-2)] text-left text-[var(--text-secondary)]">
      {children}
    </thead>
  ),
  th: ({ children }) => <th className="px-3 py-2 font-medium">{children}</th>,
  td: ({ children }) => (
    <td className="border-t border-[var(--border-subtle)] px-3 py-2">
      {children}
    </td>
  ),
}

const REMARK_PLUGINS = [remarkGfm]

function MarkdownInner({ text }: MarkdownProps) {
  return (
    <div className="prose-chat">
      <ReactMarkdown
        remarkPlugins={REMARK_PLUGINS}
        // urlTransform applied to every URL react-markdown sees (links AND
        // images), as a second layer of defense behind the renderer above.
        urlTransform={(url) => safeHref(url) ?? ''}
        components={COMPONENTS}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}

const Markdown = memo(MarkdownInner)
export default Markdown
