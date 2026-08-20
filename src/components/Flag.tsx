import type { ReactNode } from 'react'
import type { LanguageCode } from '@/lib/config'

/**
 * Inline SVG flags. Emoji flags don't render on Windows (browsers there fall
 * back to a two-letter country code), so we draw simple, recognizable flags
 * that look identical on every platform. Deliberately simplified — stars and
 * crests are omitted since they're invisible at header size.
 */
const FLAGS: Record<LanguageCode, ReactNode> = {
  en: (
    <>
      <rect width="20" height="14" fill="#B22234" />
      {[2, 4, 6, 8, 10, 12].map((y) => (
        <rect key={y} y={y} width="20" height="1" fill="#fff" />
      ))}
      <rect width="8" height="7" fill="#3C3B6E" />
    </>
  ),
  es: (
    <>
      <rect width="20" height="14" fill="#F1BF00" />
      <rect width="20" height="3.5" fill="#AA151B" />
      <rect y="10.5" width="20" height="3.5" fill="#AA151B" />
    </>
  ),
  fr: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="6.67" height="14" fill="#0055A4" />
      <rect x="13.33" width="6.67" height="14" fill="#EF4135" />
    </>
  ),
  de: (
    <>
      <rect width="20" height="14" fill="#DD0000" />
      <rect width="20" height="4.67" fill="#000" />
      <rect y="9.33" width="20" height="4.67" fill="#FFCE00" />
    </>
  ),
  pt: (
    <>
      <rect width="20" height="14" fill="#009C3B" />
      <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#FFDF00" />
      <circle cx="10" cy="7" r="3" fill="#002776" />
    </>
  ),
  ja: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <circle cx="10" cy="7" r="4.2" fill="#BC002D" />
    </>
  ),
}

export default function Flag({
  code,
  className = '',
}: {
  code: LanguageCode
  className?: string
}) {
  return (
    <span
      className={`inline-block h-3.5 w-5 flex-shrink-0 overflow-hidden rounded-[2px] ring-1 ring-inset ring-[var(--border-strong)] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 20 14"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        {FLAGS[code] ?? FLAGS.en}
      </svg>
    </span>
  )
}
