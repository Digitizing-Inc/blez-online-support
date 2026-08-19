# CardStackBanner — Feature Handoff

A Robinhood / Apple-Wallet style stacked card banner. Each card has an
eyebrow label, headline, body, CTA, and a square image slot. The user
dismisses cards one at a time with an X; behind cards "fan up" above the
front card so you can see the deck. After the last card is dismissed an
"all caught up" panel appears for ~1.5s then collapses with a CRT-TV
"turn off" effect. A page refresh restores the deck.

This document contains everything needed to drop the feature into a new
project: full component source, the required CSS, the tokens it depends
on, asset list, and how to embed it.

---

## 1. What you get

- 4 stacked cards (configurable count via the `CARDS` array)
- 3D-ish perspective with two back-card "peeks" visible above the front card
- Animated dismiss (220ms) — fade in place, next card slides into front
- Counter in the top right ("1 / 4")
- Image slot on the right of the card; the phone overhangs the top + bottom of the card edges (visible center slice only)
- Phone is tilted 8° clockwise
- Empty state: blue panel with brand mark + cheeky copy
- Empty state collapses with a CRT-TV power-off keyframe (vertical snap-to-line, then horizontal shrink)
- Outer banner wrapper collapses its `max-height` so the layout below shifts up cleanly
- All component state is local — refresh restores

---

## 2. Tech requirements

- Next.js 15+ (for `next/image`, `next/link`, App Router)
- React 19 (any 18+ should also work)
- Tailwind CSS 4 (uses `@theme inline` and arbitrary values like `top-[-100%]`, `h-[180%]`)
- TypeScript

If the destination project uses a different stack:
- `next/image` → swap for a normal `<img>` with `width/height/style` set
- `next/link` → swap for `<a>`
- Tailwind 4 arbitrary values can be replaced with inline `style={{}}` if needed

---

## 3. File layout in your project

```
src/
  components/
    CardStackBanner.tsx       <-- full component (Section 6)
public/
  blez-mark.png               <-- empty-state brand mark (Section 8)
  cards/
    blez-mobile-phone.png     <-- first card's phone illustration (Section 8)
app/
  globals.css                 <-- add the keyframe block from Section 7
```

---

## 4. Embedding in a page

```tsx
import CardStackBanner from '@/components/CardStackBanner'

export default function HomePage() {
  return (
    <section className="border-b border-[var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <CardStackBanner />
      </div>
      {/* ...rest of page... */}
    </section>
  )
}
```

The banner stretches to fill its parent's width, so put it inside whatever
container the page already uses (here, `max-w-7xl` with horizontal padding).

---

## 5. Required design tokens

The component references these CSS variables (set in your global stylesheet
inside `:root {}`). Replace with your own equivalents if the names differ.

```css
:root {
  /* Brand */
  --blez-blue: #0099ff;
  --blez-blue-deep: #005c99;
  --blez-blue-ghost: rgba(0, 153, 255, 0.08);

  /* Surface / borders */
  --bg-elevated: #1c1c1d;
  --border-subtle: #262626;
  --border-default: #404040;

  /* Text */
  --text-primary: #fafafa;
  --text-secondary: #d4d4d4;
  --text-muted: #a3a3a3;

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* Radius */
  --radius-lg: 8px;
}
```

The component also uses three utility classes that are defined elsewhere
in the source codebase. Easiest path: copy these into the same stylesheet.

```css
/* Card surface */
.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

/* Eyebrow label — small uppercase tracked text */
.eyebrow {
  font-weight: 500;
  font-size: 12.8px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.eyebrow-sm { font-size: 11px; }

/* Display headlines — broadcast-feel uppercase */
.display {
  font-family: 'Druk Wide', 'Bebas Neue', system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1;
  text-transform: uppercase;
}
.display-h5 { font-size: 26px; }
.display-h6 { font-size: 20px; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 0;
  cursor: pointer;
  white-space: nowrap;
  transition: background 180ms var(--ease-out);
}
.btn-sm { height: 36px; padding: 0 16px; font-size: 14px; }
.btn-primary {
  background: var(--blez-blue);
  color: #fff;
}
.btn-primary:hover { background: #007acc; }
```

If you'd rather inline everything, swap each `className="card"` /
`className="eyebrow"` / `className="display"` / `className="btn …"`
reference for inline Tailwind utilities. The component code clearly shows
where they're applied.

---

## 6. Required additions to your global CSS

Add this block to `globals.css` (or your equivalent). Both pieces are
required — the keyframe and the class that triggers it.

```css
/* Old-CRT "TV power off" collapse — first the panel snaps vertically
   into a thin horizontal line, then the line shrinks to nothing.
   Used by the CardStackBanner empty state on collapse. The center-top
   origin keeps the line riding the top edge so the wrapper's parallel
   max-height collapse doesn't clip it mid-animation. */
.tv-off-anim {
  animation: tv-off 420ms cubic-bezier(0.55, 0, 0.45, 1) forwards;
  transform-origin: center top;
}
@keyframes tv-off {
  0%   { transform: scaleY(1)    scaleX(1); opacity: 1; }
  55%  { transform: scaleY(0.02) scaleX(1); opacity: 1; }
  100% { transform: scaleY(0.02) scaleX(0); opacity: 0; }
}
```

---

## 7. Assets

Two PNGs need to live in `/public/`. Filenames must match the references
in the component (or update the paths in the component to match what you
have).

| Path | Purpose | Notes |
|------|---------|-------|
| `/public/blez-mark.png` | Small square brand mark shown next to "You're all caught up" | ~48×48 minimum; PNG with transparency. |
| `/public/cards/blez-mobile-phone.png` | The phone illustration on the first card | Tall portrait PNG with transparency (~2:1 aspect). The visible card crops to the middle slice — top and bottom of the phone are clipped intentionally. |

For other cards: drop more images into `/public/cards/` and add an
`imageSrc` field to the card entry in the `CARDS` array.

---

## 8. CardStackBanner.tsx — full source

Save as `src/components/CardStackBanner.tsx`:

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

/* How long the "all caught up" panel stays visible before sliding up
   and collapsing the banner. Refresh the page to bring the stack back. */
const EMPTY_STATE_VISIBLE_MS = 1500

interface CardData {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
  /* Path to the image rendered to the right of the card text.
     Drop assets in /public and reference them here, e.g. '/cards/foo.png'.
     When omitted, a brand-blue placeholder fills the slot. */
  imageSrc?: string
}

const CARDS: CardData[] = [
  {
    eyebrow: 'Blez Mobile',
    headline: 'Rip Packs on the Go',
    body:
      'Faster reveals, push alerts on offers, your cards in your pocket.',
    ctaLabel: 'Open in App',
    ctaHref: '#',
    imageSrc: '/cards/blez-mobile-phone.png',
  },
  {
    eyebrow: "What's New",
    headline: 'Saved Searches Are Live',
    body:
      'Save a query and we will ping you when a fresh article lands on it.',
    ctaLabel: 'Set One Up',
    ctaHref: '#',
  },
  {
    eyebrow: 'Account',
    headline: 'Verify Your Email',
    body:
      'Unlock dispute tracking and faster responses from the support crew.',
    ctaLabel: 'Verify Now',
    ctaHref: '#',
  },
]

export default function CardStackBanner() {
  // Index of the front-most card. When this equals CARDS.length, the
  // empty state takes over briefly, then the whole banner collapses.
  const [topIndex, setTopIndex] = useState(0)
  const [collapsed, setCollapsed] = useState(false)

  const allClear = topIndex >= CARDS.length

  // Once the last card is dismissed, hold the "all caught up" panel for a
  // beat, then collapse the entire banner. Refresh resets state.
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
          clipped by the wrapper's overflow-hidden. */}
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
  /* Stack rules — Apple-Wallet / fanned-deck style:
     offset < 0  : dismissed — fades in place with a slight scale down
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
        /* Front + dismissed cards keep the subtle blue tint. Back-of-stack
           peeks get a neutral grey so they visually recede. */
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

      {/* Image slot (right). The inner container is 300% tall and centered
          vertically over the slot via top-[-100%], so the phone overhangs
          BOTH the top and bottom of the card. The card's overflow-hidden
          clips the top and bottom, leaving the middle of the phone in view. */}
      <div className="relative z-10 shrink-0 self-stretch w-28 sm:w-44 md:w-60 lg:w-80 xl:w-96">
        <div
          className="absolute left-0 right-0 top-[-100%] h-[300%]"
          style={{
            transform: 'rotate(8deg)',
            transformOrigin: 'center center',
          }}
        >
          {data.imageSrc ? (
            <Image
              src={data.imageSrc}
              alt=""
              fill
              sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 768px) 240px, (min-width: 640px) 176px, 112px"
              className="object-contain"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </div>

      {/* Top-right cluster: card counter + close button. */}
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
```

---

## 9. Customization — the knobs that matter

All of these live near the top of the file or in the transform constants.

| What | Where | Effect |
|------|-------|--------|
| Card content + count | `CARDS` array (top of file) | Add/remove/edit cards. Order = display order. |
| Empty-state hold time | `EMPTY_STATE_VISIBLE_MS` (line 9) | How long the "all caught up" panel shows before collapsing. |
| Back-card peek depth | `translateY(-22px)` and `translateY(-42px)` in the offset 1/2 branches | More negative = bigger peeks. |
| Back-card width | `scale(0.95)` / `scale(0.90)` in the offset 1/2 branches | Smaller scale = visibly narrower outline. |
| Card stack headroom | `top-12` on the `<article>` (48px) + `h-[248px] sm:h-[228px]` on the stage | If peeks change, headroom may need to grow too. |
| Card transition speed | The transition string on `<article>` (line ~196) | 220ms transform / 180ms opacity = crisp. |
| Image overhang | `top-[-100%] h-[300%]` on the inner image container | Bigger H + more negative top = more zoom + more overhang. |
| Image tilt | `transform: 'rotate(8deg)'` on the image container | Negative = tilt the other way. |
| Image slot widths | `w-28 sm:w-44 md:w-60 lg:w-80 xl:w-96` | Reserved horizontal space at each breakpoint. |
| Border color | `borderColor: …` on the `<article>` style | Front + dismissed = blue 35%; back peeks = `--border-default` grey. |
| TV-off animation | `globals.css` `.tv-off-anim` / `@keyframes tv-off` | Duration, easing, scaleY threshold (default 55%). |

---

## 10. Behavior notes (for QA)

- **Tab order:** only the front card's close button and CTA are reachable by keyboard. Back cards have `tabIndex={-1}`.
- **Aria:** back cards are `aria-hidden`; the count is announced via `aria-label="Card N of M"`.
- **Focus management:** when the front card is dismissed the next card takes focus order on next tab — no focus jumping or restoration logic is needed in the current implementation.
- **Refresh restores:** state is `useState`, no localStorage. F5 brings the deck back from card 1.
- **No external state:** the component is fully self-contained — no Redux, no Context, no SSR data fetching. You can drop it anywhere.

---

## 11. Quick test checklist

- [ ] Cards appear stacked with two peeks above the front card
- [ ] Clicking X on the front card cleanly fades it; next card slides into front position
- [ ] Counter ticks 1/4 → 2/4 → 3/4 → 4/4 as you dismiss
- [ ] Phone image is tilted and overhangs the card top + bottom
- [ ] On mobile widths the phone slot shrinks but the layout doesn't break
- [ ] After dismissing the 4th card, blue panel appears with "You're all caught up"
- [ ] After ~1.5s the blue panel performs the CRT-TV power-off animation
- [ ] The layout below the banner shifts up smoothly after the collapse
- [ ] Refreshing the page restores the full deck from card 1
- [ ] Keyboard: Tab reaches the front card's CTA + X; Enter activates them
- [ ] Screen reader announces "Card N of M" for the counter
