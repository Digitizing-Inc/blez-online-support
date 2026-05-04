import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import BlezMark from './BlezMark'

/**
 * Special CTA tile that lives in the support article grid and links to
 * the BlezBot. Styled with the brand's diagonal blue gradient + slow
 * shimmer so it stands apart from the regular topic tiles.
 */
export default function BlezBotTile() {
  return (
    <Link
      href="/chat"
      className="blezbot-tile group flex h-full w-full flex-col gap-6 px-6 py-6 text-white hover:no-underline"
    >
      <div className="flex items-start justify-between gap-3">
        <BlezMark size="sm" />
        <ArrowUpRight
          className="h-4 w-4 flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold leading-snug">Ask the BlezBot</h2>
        <p className="text-sm leading-relaxed text-white/85">
          Get instant answers about your account, packs, payments, and shipping
          — anytime, in plain English.
        </p>
      </div>
      <span className="eyebrow eyebrow-sm mt-auto text-white/90">
        AI assistant
      </span>
    </Link>
  )
}
