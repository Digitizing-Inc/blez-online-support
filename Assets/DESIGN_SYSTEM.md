# Blez — Design System Specification

> **Rip a Pack, Score Big.**

Canonical specification for the Blez design system. Derived from the Blez Card Breakers Figma file (v1.1). This document is the human-readable companion to [`tokens.css`](./tokens.css) and [`components.css`](./components.css) — those files are the runtime source of truth.

**One-line vision:** Black canvas. Electric blue for action. White for the player. Single-tier rarity colors for cards. Anything else needs a reason.

The brand sits between a **modern sneaker drop** and a **broadcast scoreboard** — clean, dark, confident, with a charged blue and deliberate display type doing the heavy lifting.

---

## Table of Contents

1. [Brand foundation](#1-brand-foundation)
2. [Color](#2-color)
3. [Typography](#3-typography)
4. [Spacing](#4-spacing)
5. [Radii](#5-radii)
6. [Elevation & shadow](#6-elevation--shadow)
7. [Motion](#7-motion)
8. [Components](#8-components)
9. [Iconography](#9-iconography)
10. [Imagery](#10-imagery)
11. [Voice & tone](#11-voice--tone)
12. [Patterns](#12-patterns)
13. [What we never do](#13-what-we-never-do)
14. [File map](#14-file-map)

---

## 1. Brand foundation

| | |
| --- | --- |
| **Product name** | Blez (one word, capital B) |
| **Tagline** | "Rip a Pack, Score Big." (the only approved tagline) |
| **Category** | Digital pack-ripping marketplace — real cards, real rips, real cash-back |
| **Tone** | Sportscaster who knows the cards game. Confident, declarative, never hyped. |
| **Theme** | Dark-first. Light mode is forked in Figma but **not blessed**. |

### Player verbs (free brand equity)
*Rip · Pull · Chase · Hit · Collect · Sell back · Ship*

### Card tiers (always capitalized)
**Common · Rare · Epic · Legendary · Chase · Grail.** "GRAIL" and "CHASE" are *stamped* on cards, not written.

### Pack types
**Value Pack · Breakers Box · Ultimate Multipack · Prize Edition.**

---

## 2. Color

### 2.1 Brand

| Token | Hex | Usage |
| --- | --- | --- |
| `--blez-blue` | `#0099FF` | Primary brand. CTAs, focus, active filter, live indicators. **Only on dark.** Never blue text on white. |
| `--blez-blue-hover` | `#007ACC` | Pressed / hover state on primary. |
| `--blez-blue-deep` | `#005C99` | Deep accent, shadow tint. |
| `--blez-blue-glow` | `rgba(0, 153, 255, 0.30)` | Used in `--glow-blue` for hot packs / hover lifts. |
| `--blez-blue-soft` | `rgba(0, 153, 255, 0.20)` | Soft fills, gradient stops. |
| `--blez-blue-ghost` | `rgba(0, 153, 255, 0.08)` | Ghost-button / subtle background tint. |
| `--blez-blue-ring` | `#54BBFF` | Focus-ring outer. |

### 2.2 Neutrals (dark-first)

| Token | Hex |
| --- | --- |
| `--neutral-0` | `#FFFFFF` |
| `--neutral-50` | `#FAFAFA` |
| `--neutral-100` | `#F5F5F5` |
| `--neutral-200` | `#E9EAEB` |
| `--neutral-300` | `#D4D4D4` |
| `--neutral-400` | `#A3A3A3` |
| `--neutral-500` | `#737373` |
| `--neutral-600` | `#525252` |
| `--neutral-700` | `#404040` |
| `--neutral-800` | `#262626` |
| `--neutral-850` | `#202020` |
| `--neutral-900` | `#171717` |
| `--neutral-950` | `#101010` |
| `--neutral-zinc` | `#09090B` |
| `--neutral-black` | `#000000` |

### 2.3 Surfaces

| Token | Value | Usage |
| --- | --- | --- |
| `--bg-canvas` | `#101010` (`--neutral-950`) | Page background. The only canvas. Pure black is wrong — we want stadium-tunnel, not OLED-sterile. |
| `--bg-elevated` | `#1C1C1D` | Cards on canvas (+1). |
| `--bg-surface-2` | `#262626` | Nested cards / inputs (+2). We don't stack three deep. |
| `--bg-overlay` | `rgba(9, 9, 11, 0.72)` | Modal / drawer scrim. |

### 2.4 Borders (hairline, never doubled)

| Token | Value |
| --- | --- |
| `--border-subtle` | `--neutral-800` |
| `--border-default` | `--neutral-700` |
| `--border-strong` | `--neutral-500` |
| `--border-ghost` | `rgba(255, 255, 255, 0.12)` |

### 2.5 Text

| Token | Value | Usage |
| --- | --- | --- |
| `--text-primary` | `--neutral-50` | Body default |
| `--text-secondary` | `--neutral-300` | Secondary body |
| `--text-muted` | `--neutral-400` | Meta, supporting |
| `--text-faint` | `--neutral-500` | Timestamps, hints |
| `--text-disabled` | `--neutral-600` | Disabled |
| `--text-inverse` | `--neutral-950` | On light/yellow |
| `--text-link` | `--blez-blue` | Links |

### 2.6 Semantic

| Token | Hex | Notes |
| --- | --- | --- |
| `--success` | `#16A34A` | |
| `--success-soft` | `#2C786C` | "NEW" badge teal |
| `--warning` | `#FFDE03` | Yellow rare-tier flag. **Always with black text.** |
| `--danger` | `#DC2626` | Standard destructive |
| `--danger-strong` | `#D80027` | Big destructive / Chase tier |
| `--info` | `--blez-blue` | |

### 2.7 Tier rarity (card-rip context only — never repurposed)

| Tier | Token | Color |
| --- | --- | --- |
| Common | `--tier-common` | `#A3A3A3` neutral |
| Rare | `--tier-rare` | `#0099FF` blue |
| Epic | `--tier-epic` | `#9747FF` purple |
| Legendary | `--tier-legendary` | `#FFDE03` yellow |
| Chase | `--tier-chase` | `#D80027` red |
| Grail | `--tier-grail` | `#FFDE03` yellow w/ shimmer |

### 2.8 Color rules

- **Yellow `#FFDE03` is reserved.** Only for warnings, GRAIL/Chase tags, and the value badge on hot packs. Always black text on yellow.
- **Red is rationed.** Destructive actions and errors only. One per screen, max.
- **Tier colors don't leak.** A purple chip on a non-card surface is a bug.
- Most "hover" states are `--blez-blue` with a 20% black overlay → lands at `--blez-blue-hover`.

---

## 3. Typography

Two families do everything. Three if you count the supporting label face.

| Role | Family | Weights | Token |
| --- | --- | --- | --- |
| **Display** | Druk Wide | 500 / 700 / 800 / 900 (+ italics) | `--font-display` |
| **Body** | Inter | 300 / 400 / 500 / 600 / 700 / 800 | `--font-body` |
| **Mono** | Geist Mono | 400 / 500 | `--font-mono` |
| **Supporting** | Geist | 300 / 400 / 500 / 600 | `--font-supporting` |

> Druk Wide is licensed. The `fonts/` folder ships the licensed `.woff2` files for self-hosting. Bebas Neue stretched 125% is an acceptable fallback for prototypes only — replace with Druk in production.

### 3.1 Display scale (Druk Wide, Heavy 800, italic, uppercase)

| Token | Size | Use |
| --- | --- | --- |
| `--display-h1` | `60px` | Hero — "RIP A PACK," |
| `--display-h2` | `48px` | Section headers |
| `--display-h3` | `38px` | Page heads |
| `--display-h4` | `32px` | Subhead |
| `--display-h5` | `26px` | Card title |
| `--display-h6` | `20px` | Smallest display use |

CSS: `font-family: var(--font-display); font-weight: 800; font-style: italic; letter-spacing: -0.01em; line-height: 1.0; text-transform: uppercase;`

### 3.2 Body scale (Inter)

| Token | Size | Class |
| --- | --- | --- |
| `--text-xs` | `12px` | `.body-xs` |
| `--text-sm` | `14px` | `.body-sm` |
| `--text-base` | `16px` | `.body` |
| `--text-md` | `18px` | `.body-md` |
| `--text-lg` | `20px` | `.body-lg` |
| `--text-xl` | `22px` | — |

### 3.3 Eyebrow

Inter Medium, uppercase, tracked. Section starters, badges, tab nav.

| Token | Size |
| --- | --- |
| `--eyebrow-sm` | `11px` |
| `--eyebrow-base` | `12.8px` |

CSS: `letter-spacing: 0.05em; text-transform: uppercase;`

### 3.4 Line height & tracking

| Token | Value |
| --- | --- |
| `--leading-tight` | `1.0` (display) |
| `--leading-snug` | `1.25` |
| `--leading-normal` | `1.5` (default) |
| `--leading-relaxed` | `1.6` (long-form body) |
| `--tracking-tight` | `-0.01em` (display) |
| `--tracking-wide` | `0.04em` |
| `--tracking-wider` | `0.05em` (eyebrow) |
| `--tracking-widest` | `0.16em` |

### 3.5 Type rules

- Display type is **always** uppercase italic in marketing surfaces. App chrome can drop to Inter Bold when Druk would be too loud.
- Display is only used at **20px and up**.
- **Numbers in tables, prices, timers:** `font-variant-numeric: tabular-nums;` always. No exceptions.
- Dollar amounts always formatted clean: `$11,000` — never `$11000.00`. Show cents only on payouts.

---

## 4. Spacing

4px base. Everything is a multiple. Stick to the scale or you'll fight the system.

| Token | px |
| --- | --- |
| `--space-0` | `0` |
| `--space-1` | `4` |
| `--space-2` | `8` |
| `--space-3` | `12` |
| `--space-4` | `16` |
| `--space-5` | `20` |
| `--space-6` | `24` |
| `--space-7` | `32` |
| `--space-8` | `40` |
| `--space-9` | `48` |
| `--space-10` | `64` |
| `--space-11` | `80` |
| `--space-12` | `96` |

**Density is medium-high.** Cards on cards, hairline borders, no roomy mobile-app whitespace. Closer to a sportsbook than a wellness app.

---

## 5. Radii

Small, broadcast-y. Pills only on badges and avatars.

| Token | px | Use |
| --- | --- | --- |
| `--radius-xs` | `2` | Spec labels |
| `--radius-sm` | `4` | Chips |
| `--radius-md` | `6` | Buttons, inputs |
| `--radius-lg` | `8` | Cards |
| `--radius-xl` | `12` | Modals, drawers |
| `--radius-2xl` | `16` | Large feature cards |
| `--radius-pill` | `9999` | Badges, avatars |

---

## 6. Elevation & shadow

Mostly flat. We lift with shadow, not value. When we want emphasis (CTA hover, live indicator, hot pack), we use a **blue glow** — never a neutral drop shadow.

| Token | Value | Use |
| --- | --- | --- |
| `--shadow-xs` | `0 1px 2px rgba(10,13,18,0.05)` | Hairline lift |
| `--shadow-sm` | `0 1px 3px rgba(10,13,18,0.10), 0 1px 2px -1px rgba(10,13,18,0.10)` | Cards |
| `--shadow-md` | `0 4px 6px -1px rgba(10,13,18,0.10), 0 2px 4px -2px rgba(10,13,18,0.10)` | Elevated cards |
| `--shadow-lg` | `0 10px 15px -3px rgba(10,13,18,0.18), 0 4px 6px -4px rgba(10,13,18,0.18)` | Sheets |
| `--shadow-xl` | `0 20px 25px -5px rgba(10,13,18,0.25), 0 8px 10px -6px rgba(10,13,18,0.20)` | Modals |
| `--glow-blue` | `0 0 0 1px rgba(0,153,255,0.35), 0 8px 28px -4px rgba(0,153,255,0.45)` | Hot pack, primary hover, live |
| `--glow-blue-soft` | `0 6px 24px -6px rgba(0,153,255,0.35)` | Subtle blue lift |
| `--focus-ring` | `0 0 0 2px var(--neutral-0), 0 0 0 4px rgba(0,153,255,0.55)` | Focus state, all interactives |

---

## 7. Motion

Fast and frictionless. Never showy.

| Token | Value |
| --- | --- |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--dur-fast` | `120ms` |
| `--dur-base` | `180ms` |
| `--dur-slow` | `280ms` |
| `--dur-marquee` | `40s` |

### Motion rules

- 120–180ms on all interactions. Hover, press, tab change.
- **Numbers tick up; they never just appear.** Prices, counts, timers.
- The "LIVE TOP PULLS" ticker scrolls infinitely at ~28–40s/loop. It's the only persistent motion in the UI.
- Buttons depress 1px on `:active`.
- Cards lift 2px on `:hover` with a softened blue glow.

---

## 8. Components

Full interactive playground: [`components.html`](./components.html). Class names below are the canonical contract — same in CSS, JSX, and HTML.

### 8.1 Button

```html
<button class="btn btn-md btn-primary">Add to bag</button>
```

| Hierarchy | Class | Use |
| --- | --- | --- |
| Primary | `.btn-primary` | Main CTA. One per screen region. |
| Secondary | `.btn-secondary` | Default actions. Outlined. |
| Tertiary | `.btn-tertiary` | Low-emphasis. No fill, no border. |
| Link | `.btn-link` | Inline action that reads as a link. |
| Destructive | `.btn-destructive` | Delete / cancel-with-consequence. Max one per screen. |
| Icon-only | `.btn-icon` | Square. Add `.btn-sm` for 36px. |

| Size | Class | Height |
| --- | --- | --- |
| XL | `.btn-xl` | 56px |
| LG | `.btn-lg` | 48px |
| MD | `.btn-md` | 40px (default) |
| SM | `.btn-sm` | 36px |

### 8.2 Badge

```html
<span class="badge badge-warning">Only 3 left</span>
```

| Variant | Class | Use |
| --- | --- | --- |
| Brand | `.badge-brand` | "Hot," "Live," brand-tagged content |
| Secondary | `.badge-secondary` | Neutral meta |
| Tertiary | `.badge-tertiary` | Lowest-emphasis tag |
| Success | `.badge-success` / `.badge-success-soft` | "New," confirmations |
| Warning | `.badge-warning` | "Only N left," low-stock — yellow w/ black text |
| Danger | `.badge-danger` | Errors, blocked |
| Grail | `.badge-grail` | GRAIL tier — only on cards |
| Legendary | `.badge-legendary` | Legendary tier |

### 8.3 Input

```html
<label class="input-wrap">
  <span class="input-label">Email</span>
  <span class="input-shell">
    <input type="email" placeholder="you@blez.com" />
  </span>
  <span class="input-help">We'll never share it.</span>
</label>
```

States: `:hover`, `:focus-visible` (focus ring), `:disabled`, `.is-error` on `.input-help` for validation.

### 8.4 Filter chip

```html
<button class="chip chip-pill is-active">NBA</button>
```

Pill variant for filters; square (`.chip` only) for tag chips inside cards.

### 8.5 Tabs

```html
<div class="tabs">
  <button class="tab is-active">Shop</button>
  <button class="tab">Rips</button>
  <button class="tab">Marketplace</button>
</div>
```

Underlined active state in `--blez-blue`. No pill tabs, no segmented controls.

### 8.6 Toggle

```html
<label class="toggle">
  <input type="checkbox" />
  <span class="toggle-track"></span>
</label>
```

Track in `--neutral-700`. Active fills `--blez-blue`.

### 8.7 Checkbox / Radio

```html
<label class="check-row">
  <input type="checkbox" />
  <span class="check-box"></span>
  <span>Notify me on drop day</span>
</label>
```

Use `.check-radio` (round) for radios.

### 8.8 Card

```html
<div class="card card-hover">…</div>
```

Default `bg-elevated`, hairline border, `--radius-lg`. `.card-hover` adds the 2px lift + blue glow on hover. `.card-padded` for a 24px inner pad shortcut.

### 8.9 Progress

```html
<div class="progress"><div class="progress-bar" style="width: 64%"></div></div>
```

8px track. Used for pack-rip odds and order fulfillment.

### 8.10 Live indicator

```html
<span class="live-dot"></span> LIVE
```

Pulsing 8×8 blue dot. Only for genuinely live data (rip happening now, ticker, drop countdown active).

### 8.11 Marquee

```html
<div class="marquee">
  <div class="marquee-track">…</div>
</div>
```

For the LIVE TOP PULLS ticker. 28–40s loop. Edge mask fades content in/out.

### 8.12 Other primitives

Documented in the Figma + `components.html` and live as classes already: Tooltip, Date Picker, Dropdown, Sheet/Drawer, Modal, Table, Breadcrumbs, Avatar.

---

## 9. Iconography

- **Library:** Lucide
- **Size:** 24×24
- **Stroke:** 1.5–2px
- **Color:** `currentColor` always — icons take the text color of their slot
- **Never:** branded fills, multicolor glyphs, illustrated icons

---

## 10. Imagery

Card packs are the only "art" in the system.

- Centered on dark
- Photo-real with subtle ambient occlusion underneath
- **Hero / feature position:** angled
- **Grids / PDPs:** flat, square-on
- Canonical example: `assets/blez-pack-baseball.png`

---

## 11. Voice & tone

Sportscaster who knows the cards game. Confident, declarative, never hyped.

### Principles

- **Numbers forward.** Every screen has a price, count, timer, or value visible.
- **Short, declarative sentences.** "Rip the pack. Keep the hit. Sell the rest." — not "Discover the thrill of opening packs."
- **Use the verbs.** Rip, pull, chase, hit, collect, sell back, ship.
- **No casino tropes.** No "spin," "jackpot," "lucky," "fortune." Collecting, not gambling.
- **No cute mascots, no emoji-as-content.** Emoji are tolerated only as tiny avatars in the live ticker.

### Examples

| ❌ Don't write | ✅ Write |
| --- | --- |
| "Try your luck and rip a pack!" | "Rip a Pack, Score Big." |
| "Unlock incredible rewards!" | "Hit it. Keep it. Or sell it back for 90%." |
| "Join thousands of collectors!" | "1,243 packs ripped today." |
| "You won an amazing prize!" | "GRAIL. $11,000 value. Lebron James 2023 Prize Edition." |

---

## 12. Patterns

Compositions that show up across the product. Treat as starting templates, not rigid layouts.

### 12.1 Featured pack card

Image area on top, badge top-left over image, info block below. **Price first** in big Druk display. **Pack name** below in smaller Inter (muted). CTA full-width at bottom.

```
┌─────────────────────┐
│ [Only 3 left]       │
│                     │
│      [pack img]     │
│                     │
├─────────────────────┤
│ $25                 │  ← display-h6, Druk
│ NBA Value Pack      │  ← body-sm, muted
│                     │
│ [Add to bag      ]  │  ← btn-primary, full-width
└─────────────────────┘
```

### 12.2 Top Pulls card

Tier badge top-left, value top-right (mono blue). Card name, pack source, then a thin user row at the bottom.

### 12.3 Hero block

Eyebrow ("Drop · Apr 28") → display-h2 headline ("RIP A PACK, SCORE BIG.") → 1–2 line body → primary + secondary CTA pair.

### 12.4 LIVE ticker

Full-width marquee strip. Blue overhead gradient, pulse dot, infinite scroll. The only persistent motion in the UI.

---

## 13. What we never do

- **No light mode** (yet — there's a fork in the Figma but it's not blessed).
- **No gradients** except: (a) the blue→neutral hero wash, (b) the blue overhead on the LIVE TOP PULLS ticker.
- No glassmorphism, no neumorphism.
- No illustrated mascots. The product is the brand.
- No stock photography of people holding cards. If we need imagery, it's the rendered card pack on a dark backdrop.
- No emoji as content.
- No three-deep card stacks.
- No tier colors leaking outside card-rip context.

---

## 14. File map

| File | Purpose |
| --- | --- |
| `README.md` | High-level brand + voice, intro for new contributors |
| `DESIGN_SYSTEM.md` | **This file.** Full token + component spec. |
| `tokens.css` | Source of truth: every color, type, space, radius, motion variable |
| `components.css` | Component class implementations (`.btn`, `.badge`, `.card`, …) |
| `design_system.html` | One-page rendered preview of every token + component |
| `components.html` | Live, interactive component playground |
| `home_marketing.html` | UI kit — marketing/home surface composed from these parts |
| `assets/` | Brand imagery (card packs, etc.) |
| `fonts/` | Self-hosted Druk Wide woff2/woff files |

---

## Reading the source Figma

The source file (`Blez Card Breakers_v1.1`) has 69 pages. The ones that matter for the system:

- `/Typography` — display + body scale
- `/Button`, `/Badge`, `/Input`, `/Filter-Chip`, `/Toggle`, `/Tab`, `/Checkbox`, `/Tooltip`, `/Date-Picker`, `/Progress-Bar`, `/Table`, `/Sheets`, `/Dropdown` — components
- `/Lucide-Iconography`, `/Assets` — sources
- `/Navigation---v1.1`, `/Footer`, `/Modals-Drawers` — molecules
- `/Home-Page-v1.1`, `/Shop-Page-v1.2-w-Hover-Cards`, `/Product-Details-Pages-PDPs`, `/Card-Rip-Opening-Flow-Sequence` — UI kits

Anything in `/ARCHIVE`, `/Draft`, `/IN-DEVELOPMENT`, or older `v1.0` pages is **not** the source of truth. Use only the latest versioned page.
