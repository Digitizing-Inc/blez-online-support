'use client'

import { useState, useEffect, useRef } from 'react'
import { Check, ChevronDown, ExternalLink } from 'lucide-react'
import { siteConfig, type LanguageCode } from '@/lib/config'
import { cn } from '@/lib/cn'
import Flag from './Flag'

const STORAGE_KEY = 'blez-support-lang'

/**
 * Sends the user to Google Translate's web proxy with the current page
 * URL pre-filled. Browsers (including Chrome) don't expose an API to
 * trigger their built-in translate UI from a site, so this is the
 * closest we can get without shipping a heavy in-page widget.
 */
function googleTranslateUrl(code: LanguageCode, pageUrl: string) {
  return `https://translate.google.com/translate?sl=en&tl=${code}&u=${encodeURIComponent(
    pageUrl,
  )}`
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<LanguageCode>('en')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null
      if (stored && siteConfig.languages.some((l) => l.code === stored)) {
        setLang(stored)
      }
    } catch {
      // localStorage unavailable (e.g. private mode) — default to English.
    }
  }, [])

  useEffect(() => {
    if (!open) return
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('mousedown', onClickOutside)
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('mousedown', onClickOutside)
      window.removeEventListener('keydown', onEsc)
    }
  }, [open])

  function select(code: LanguageCode) {
    setLang(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // Persisting the choice is best-effort — don't block selection.
    }
    document.documentElement.lang = code
    setOpen(false)
    // English is the source — no translation needed.
    if (code === 'en') return
    const url = googleTranslateUrl(code, window.location.href)
    window.location.href = url
  }

  const active = siteConfig.languages.find((l) => l.code === lang)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${active?.label ?? 'English'}`}
        className={cn(
          'flex h-10 items-center gap-1.5 rounded-md border px-2.5 transition-colors',
          'border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]',
        )}
      >
        <Flag code={lang} />
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform',
            open && 'rotate-180',
          )}
          strokeWidth={2.5}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-56 overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]"
        >
          {siteConfig.languages.map((l) => {
            const isActive = l.code === lang
            const isEnglish = l.code === 'en'
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => select(l.code)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition-colors',
                    isActive
                      ? 'text-[var(--text-primary)] bg-[var(--blez-blue-ghost)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--blez-blue-ghost)]',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Flag code={l.code} />
                    <span>{l.label}</span>
                  </span>
                  <span className="flex items-center gap-2 text-[var(--text-muted)]">
                    {!isEnglish && (
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                    )}
                    {isActive && (
                      <Check
                        className="h-4 w-4 text-[var(--blez-blue)]"
                        strokeWidth={2.5}
                      />
                    )}
                  </span>
                </button>
              </li>
            )
          })}
          <li className="border-t border-[var(--border-subtle)] px-4 py-2 text-[11px] leading-snug text-[var(--text-faint)]">
            Translations are powered by Google Translate.
          </li>
        </ul>
      )}
    </div>
  )
}
