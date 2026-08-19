'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail } from 'lucide-react'
import { siteConfig } from '@/lib/config'

/**
 * Contact form. With no backend yet, submit composes a fully pre-filled
 * email (subject, category, order id, message) and hands off to the user's
 * mail client — a working path today. The dev should swap `composeAndSend`
 * for a POST to `/api/contact` (or a ticketing provider) when ready; the
 * field set already matches what a ticket needs.
 */
export default function ContactForm() {
  const params = useSearchParams()
  const presetSubject = params.get('subject') ?? ''
  const presetNote = params.get('note') ?? ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState<string>(
    siteConfig.contactCategories[0],
  )
  const [orderId, setOrderId] = useState('')
  const [message, setMessage] = useState(presetNote)

  function composeAndSend(e: React.FormEvent) {
    e.preventDefault()
    const subject = presetSubject || `[${category}] Support request`
    const body = [
      message.trim(),
      '',
      '——',
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      `Category: ${category}`,
      orderId && `Order ID: ${orderId}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.location.href = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={composeAndSend} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="cf-name">
          <input
            id="cf-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-base"
            autoComplete="name"
          />
        </Field>
        <Field label="Your email" htmlFor="cf-email">
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-base"
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="input-wrap">
          <label htmlFor="cf-category" className="input-label">
            What&rsquo;s it about?
          </label>
          <div className="input-shell">
            <select
              id="cf-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-base text-[var(--text-primary)] outline-none"
            >
              {siteConfig.contactCategories.map((c) => (
                <option key={c} value={c} className="bg-[var(--bg-elevated)]">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Field label="Order ID (optional)" htmlFor="cf-order">
          <input
            id="cf-order"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="text-base"
            placeholder="Helps us find your order faster"
          />
        </Field>
      </div>

      <div className="input-wrap">
        <label htmlFor="cf-message" className="input-label">
          How can we help?
        </label>
        <div className="input-shell h-auto py-2">
          <textarea
            id="cf-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            required
            placeholder="Tell us what's going on — the more detail, the faster we can help."
            className="resize-none bg-transparent leading-relaxed"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg self-start">
        <Mail className="h-4 w-4" strokeWidth={2} />
        Send message
      </button>
      <p className="text-xs text-[var(--text-muted)]">
        {siteConfig.supportResponseTime}
      </p>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="input-wrap">
      <label htmlFor={htmlFor} className="input-label">
        {label}
      </label>
      <div className="input-shell">{children}</div>
    </div>
  )
}
