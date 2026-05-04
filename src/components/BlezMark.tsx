import Image from 'next/image'
import { cn } from '@/lib/cn'

interface BlezMarkProps {
  /** Outer wrapper size in px. Image inside is rendered at ~60% of this. */
  size?: 'sm' | 'md' | 'lg'
  /** When true, the outline shimmer speeds up — used while the bot is
   *  actively generating a reply, vs the slower resting "ready" pulse. */
  thinking?: boolean
  className?: string
}

const dims = {
  sm: { wrap: 'h-10 w-10', img: 24 }, // 40px wrapper, 24px icon
  md: { wrap: 'h-12 w-12', img: 28 }, // 48px wrapper, 28px icon
  lg: { wrap: 'h-14 w-14', img: 32 }, // 56px wrapper, 32px icon
} as const

/**
 * The BlezBot's blue F mark, framed in a small square with a shimmering
 * blue outline that chases around the perimeter. Use anywhere the
 * BlezBot needs to feel alive.
 */
export default function BlezMark({
  size = 'md',
  thinking = false,
  className,
}: BlezMarkProps) {
  const d = dims[size]
  return (
    <span
      className={cn('blez-mark', thinking && 'is-thinking', d.wrap, className)}
    >
      <Image
        src="/blez-mark.png"
        alt=""
        width={d.img}
        height={d.img}
        priority
      />
    </span>
  )
}
