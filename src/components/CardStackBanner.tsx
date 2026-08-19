'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/* How long the "all caught up" panel stays visible before sliding up
   and collapsing the banner. Refresh the page to bring the stack back. */
const EMPTY_STATE_VISIBLE_MS = 1500

interface CardData {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
  /* Path to the square image rendered to the right of the card text.
     Drop assets in /public and reference them here, e.g. '/cards/foo.png'.
     When omitted, a brand-blue placeholder fills the slot. */
  imageSrc?: string
}

const CARDS: CardData[] = [
  {
    eyebrow: 'Blez Online',
    headline: 'Rip a Pack, Score Big',
    body:
      'Hand-curated packs of real cards, opened on your screen. Ship it or sell back at 90%.',
    ctaLabel: 'Browse packs',
    ctaHref: siteConfig.shopUrl,
    imageSrc: '/cards/blez-mobile-phone.png',
  },
  {
    eyebrow: 'Resources',
    headline: 'In-Depth Guides',
    body:
      'Grading, investing, protecting your collection — the full guides in one place.',
    ctaLabel: 'Explore guides',
    ctaHref: '/resources',
  },
  {
    eyebrow: 'Getting Started',
    headline: 'Verify Your Identity',
    body:
      'A quick, one-time ID check unlocks cashouts and higher-value shipments.',
    ctaLabel: 'How to verify',
    ctaHref: '/articles/getting-started/creating-account-id-verification',
  },
]

export default function CardStackBanner() {
  // Index of the front-most card. When this equals CARDS.length, the
  // empty state takes over briefly, then the whole banner collapses.
  const [topIndex, setTopIndex] = useState(0)
  const [collapsed, setCollapsed] = useState(false)

  const allClear = topIndex >= CARDS.length

  // Once the last card is dismissed, hold the "all caught up" panel for a
  // beat, then slide the entire banner up and out. Refresh resets state.
  useEffect(() => {
    if (!allClear) return
    const t = setTimeout(() => setCollapsed(true), EMPTY_STATE_VISIBLE_MS)
    return () => clearTimeout(t)
  }, [allClear])

  const handleDismiss = () => {
    setTopIndex((i) => Math.min(i + 1, CARDS.length))
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maxHeight: collapsed ? 0 : 300,
        opacity: collapsed ? 0 : 1,
        transition:
          'max-height 420ms var(--ease-out), opacity 300ms var(--ease-out)',
      }}
      aria-hidden={collapsed}
    >
      {/* Fixed-height stage. The cards inside are pushed DOWN 48px from
          the stage's top (see `top-12` in <Card>) so the back-card peeks
          have a "safe zone" to occupy WITHIN the stage instead of getting
          clipped by the wrapper's overflow-hidden. `perspective` is still
          set so future depth tweaks compose cleanly with stack offsets. */}
      <div
        className="relative h-[248px] sm:h-[228px]"
        style={{ perspective: '1500px', perspectiveOrigin: '50% 100%' }}
      >
        {/* Empty state — sits at the back; covered by cards until they
            are all dismissed. */}
        <EmptyState visible={allClear} collapsed={collapsed} />

        {/* Cards. Each one renders absolutely positioned; its visual
            position in the stack is derived from `topIndex`. */}
        {CARDS.map((card, idx) => {
          const offset = idx - topIndex
          return (
            <Card
              key={idx}
              data={card}
              offset={offset}
              position={idx + 1}
              total={CARDS.length}
              onDismiss={handleDismiss}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Card ──────────────────────────────────────────────────────────────────

function Card({
  data,
  offset,
  position,
  total,
  onDismiss,
}: {
  data: CardData
  offset: number
  position: number
  total: number
  onDismiss: () => void
}) {
  /* Stack rules — Apple Wallet / fanned-deck style:
     offset < 0  : dismissed — flies up and off the top of the deck
     offset = 0  : front     — sits at top-12 (48px from stage top), full width
     offset = 1+ : back      — translated UPWARD into the peek zone above
                               the front card with a slightly smaller scale
                               so its outline reads as receding. The 48px
                               of stage headroom above the front card lets
                               two peeks of ~20px each show clearly. */
  let transform = ''
  let opacity = 1
  let pointerEvents: 'auto' | 'none' = 'auto'
  let zIndex = 30

  if (offset < 0) {
    /* Dismissed cards just fade in place. The earlier "float up"
       collided with the next card sliding down — looked muddled.
       A pure fade lets the next card slip into the front position
       cleanly. The slight scale-down keeps a hint of motion. */
    transform = 'translateY(0) scale(0.96)'
    opacity = 0
    pointerEvents = 'none'
    zIndex = 40
  } else if (offset === 0) {
    transform = 'translateY(0) scale(1)'
    opacity = 1
    zIndex = 30
  } else if (offset === 1) {
    transform = 'translateY(-22px) scale(0.95)'
    opacity = 1
    pointerEvents = 'none'
    zIndex = 20
  } else if (offset === 2) {
    transform = 'translateY(-42px) scale(0.90)'
    opacity = 1
    pointerEvents = 'none'
    zIndex = 10
  } else {
    transform = 'translateY(-60px) scale(0.85)'
    opacity = 0
    pointerEvents = 'none'
    zIndex = 0
  }

  return (
    <article
      className="card absolute left-0 right-0 top-12 bottom-0 flex items-stretch overflow-hidden"
      style={{
        transform,
        opacity,
        pointerEvents,
        zIndex,
        /* Front + dismissed cards keep the subtle blue tint to read as
           "active." Back-of-stack peeks get a neutral grey so they visually
           recede and the front card pops. */
        borderWidth: '2px',
        borderColor:
          offset >= 1 ? 'var(--border-default)' : 'rgba(0, 153, 255, 0.35)',
        transition:
          'transform 220ms var(--ease-out), opacity 180ms var(--ease-out), border-color 220ms var(--ease-out)',
      }}
      aria-hidden={offset !== 0}
    >
      {/* Content (left) */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <p className="eyebrow eyebrow-sm">{data.eyebrow}</p>
          <h2
            className="display display-h6 mt-2 sm:display-h5"
            style={{ letterSpacing: '0.03em' }}
          >
            {data.headline}
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
            {data.body}
          </p>
        </div>

        <div className="mt-4">
          <Link
            href={data.ctaHref}
            className="btn btn-primary btn-sm h-11 px-4 uppercase tracking-wider sm:px-6 md:px-8"
          >
            {data.ctaLabel}
          </Link>
        </div>
      </div>

      {/* Image slot (right). The outer slot reserves the horizontal space;
          the inner container is taller than the slot (180% height), anchored
          to the slot's TOP. Combined with the card's `overflow-hidden`,
          the phone's bottom half drops past the card edge and gets
          cropped — only the top half is visible, bursting out of the
          bottom of the banner. */}
      <div className="relative z-10 shrink-0 self-stretch w-28 sm:w-44 md:w-60 lg:w-80 xl:w-96">
        {/* Inner container is taller than the slot AND positioned to extend
            both above and below it — so the phone vertically overhangs the
            card edges. The card's `overflow-hidden` clips the top and
            bottom, leaving the middle of the phone visible inside. */}
        <div
          className="absolute left-0 right-0 top-[-100%] h-[300%]"
          style={{
            transform: 'rotate(8deg)',
            transformOrigin: 'center center',
          }}
        >
          {data.imageSrc ? (
            // First card is the above-the-fold LCP element — load it eagerly.
            <Image
              src={data.imageSrc}
              alt=""
              fill
              sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 768px) 240px, (min-width: 640px) 176px, 112px"
              className="object-contain"
              priority={position === 1}
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </div>

      {/* Top-right cluster: card counter + close button. Counter tells the
          user how many cards are left so the stack doesn't feel endless. */}
      <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
        <span
          className="eyebrow eyebrow-sm tabular-nums"
          style={{ color: 'var(--text-muted)' }}
          aria-label={`Card ${position} of ${total}`}
        >
          {position} / {total}
        </span>
        <button
          type="button"
          onClick={onDismiss}
          aria-label={`Dismiss ${data.headline}`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--blez-blue-ghost)] hover:text-[var(--text-primary)] transition-colors"
          tabIndex={offset === 0 ? 0 : -1}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <line x1="2" y1="2" x2="12" y2="12" />
            <line x1="12" y1="2" x2="2" y2="12" />
          </svg>
        </button>
      </div>
    </article>
  )
}

// ─── Image placeholder ────────────────────────────────────────────────────
// Shown when a card's `imageSrc` is missing so the slot has visible content
// while real assets are being prepared.

function ImagePlaceholder() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background:
          'linear-gradient(135deg, rgba(0,153,255,0.35) 0%, rgba(0,92,153,0.6) 100%)',
        border: '1px dashed rgba(255,255,255,0.18)',
      }}
    >
      <span
        className="eyebrow eyebrow-sm"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        Image
      </span>
    </div>
  )
}

// ─── Empty state ───────────────────────────────────────────────────────────

function EmptyState({
  visible,
  collapsed,
}: {
  visible: boolean
  collapsed: boolean
}) {
  /* Three visual states:
     not visible  : sits below stage, off-screen, faded out
     visible      : centered in stage, fully opaque
     collapsed    : keyframe-driven TV-off effect (.tv-off-anim) —
                    snaps to a horizontal line, then shrinks to nothing */
  let transform: string | undefined
  let opacity: number | undefined
  let transition: string | undefined
  if (collapsed) {
    /* Let the CSS animation own these; setting inline values would
       fight the keyframe. */
    transform = undefined
    opacity = undefined
    transition = 'none'
  } else if (visible) {
    transform = 'translateY(0) scale(1)'
    opacity = 1
    transition =
      'transform 380ms var(--ease-out), opacity 320ms var(--ease-out)'
  } else {
    transform = 'translateY(20px) scale(0.95)'
    opacity = 0
    transition =
      'transform 380ms var(--ease-out), opacity 320ms var(--ease-out)'
  }

  return (
    <div
      className={`absolute left-0 right-0 top-12 bottom-0 flex items-center gap-4 overflow-hidden rounded-lg p-5 sm:p-6 ${
        collapsed ? 'tv-off-anim' : ''
      }`}
      style={{
        background:
          'linear-gradient(135deg, var(--blez-blue) 0%, var(--blez-blue-deep) 100%)',
        transform,
        opacity,
        transition,
        pointerEvents: visible && !collapsed ? 'auto' : 'none',
      }}
      aria-hidden={!visible || collapsed}
    >
      <div className="flex flex-1 items-center gap-4">
        <div className="shrink-0">
          <Image
            src="/blez-mark.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12"
          />
        </div>
        <div>
          <p
            className="display display-h6 text-white"
            style={{ letterSpacing: '0.03em' }}
          >
            You&rsquo;re all caught up
          </p>
          <p className="mt-3 text-sm text-white/85">
            Your brain is full. Go rip something.
          </p>
        </div>
      </div>
    </div>
  )
}
