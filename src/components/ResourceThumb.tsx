import { BookOpen, HelpCircle, Scale, Building2 } from 'lucide-react'
import type { ResourceCategory } from '@/lib/resources'
import { CATEGORY_LABELS } from '@/lib/resources'

/**
 * Branded placeholder image for a resource. Deterministic per slug so each
 * post keeps a stable look, and varied enough that a grid of tiles doesn't
 * look repetitive — all on-brand blues. Swap for real hero art later by
 * replacing this component's output with a <next/image> when a post has one.
 */

const ICONS: Record<ResourceCategory, typeof BookOpen> = {
  guide: BookOpen,
  comparison: Scale,
  faq: HelpCircle,
  about: Building2,
}

// A few on-brand gradient treatments; pick one deterministically per slug.
const GRADIENTS = [
  'linear-gradient(135deg, #005c99 0%, #0099ff 55%, #005c99 100%)',
  'linear-gradient(135deg, #0a2a43 0%, #0077cc 60%, #0099ff 100%)',
  'linear-gradient(135deg, #003a66 0%, #0099ff 50%, #54bbff 100%)',
  'linear-gradient(135deg, #0099ff 0%, #005c99 60%, #0a1f33 100%)',
  'linear-gradient(160deg, #0a1f33 0%, #005c99 50%, #0099ff 100%)',
]

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export default function ResourceThumb({
  slug,
  category,
  className = '',
}: {
  slug: string
  category: ResourceCategory
  className?: string
}) {
  const Icon = ICONS[category]
  const gradient = GRADIENTS[hash(slug) % GRADIENTS.length]

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ background: gradient }}
      aria-hidden="true"
    >
      {/* subtle sheen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 15% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 55%)',
        }}
      />
      <Icon
        className="relative h-14 w-14 text-white/90 sm:h-16 sm:w-16"
        strokeWidth={1.5}
      />
      <span
        className="eyebrow eyebrow-sm absolute bottom-3 left-4 text-white/85"
        style={{ letterSpacing: '0.14em' }}
      >
        {CATEGORY_LABELS[category]}
      </span>
    </div>
  )
}
