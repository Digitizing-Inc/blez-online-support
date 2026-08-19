# Blez Online Support

A dark-first support site for Blez Online: a search-and-browse-by-topic help-center at `/`, with per-article pages and full-text search.

This is a **frontend-only handoff**. UI is complete; backend integration (real article content + feedback capture) is the next step. See **[For the inheriting dev](#for-the-inheriting-dev)** below.

---

## Stack

- Next.js 16.2.4 (App Router) + React 19
- TypeScript (strict, target ES2022)
- Tailwind CSS 4 (CSS-first config in `globals.css`)
- Lucide icons
- MiniSearch for fuzzy / prefix article search
- Self-hosted Druk Wide (display) + Inter via `next/font/google` (body)

Mirrors the stack used in the main `theblez` project so a dev can move between repos without a context switch.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # production build
```

> ⚠️ **Local dev on Windows + exFAT:** Next 16's Turbopack dev can fail to create the junction points it needs on an exFAT-formatted drive (`Incorrect function. (os error 1)`). If `npm run dev` errors on a `D:`-style exFAT volume, move the repo to an NTFS drive (e.g. `C:`). `npm run build` and Vercel deploys are unaffected.

## Project layout

```
.
├── Assets/                         # design source — not imported at runtime
│   ├── DESIGN_SYSTEM.md            # canonical spec
│   └── fonts/                      # licensed Druk Wide woff/woff2
├── docs/
│   ├── TOPICS.md                   # source of truth for topic + article list
│   └── CardStackBanner-handoff.md  # spec for the home hero card-stack banner
├── public/
│   ├── blez-logo.webp              # header / footer brand mark
│   ├── blez-mark.png               # small square brand mark (banner empty state)
│   ├── cards/                      # card-stack banner imagery
│   └── fonts/                      # Druk Wide subset shipped at runtime
├── src/
│   ├── app/
│   │   ├── layout.tsx              # root layout — fonts, JSON-LD, OG metadata
│   │   ├── globals.css             # design tokens + component classes
│   │   ├── page.tsx                # / — card banner + search + topic tile grid
│   │   ├── articles/[topic]/
│   │   │   ├── page.tsx            # /articles/:topic — article list
│   │   │   └── [slug]/page.tsx     # /articles/:topic/:slug — article
│   │   ├── not-found.tsx           # 404 with search recovery
│   │   ├── sitemap.ts              # generated from topics + articles
│   │   ├── robots.ts               # disallows /api/, declares sitemap
│   │   ├── opengraph-image.tsx     # default 1200×630 OG image (build-time)
│   │   ├── icon.png                # favicon (Next 16 file convention)
│   │   └── apple-icon.png          # iOS touch icon
│   ├── components/
│   │   ├── Header.tsx              # logo + language switcher
│   │   ├── Footer.tsx              # Need-support callout + 3-col + legal
│   │   ├── LanguageSwitcher.tsx    # opens Google Translate proxy
│   │   ├── SearchBar.tsx           # MiniSearch + no-match fallback panel
│   │   ├── CardStackBanner.tsx     # home hero — dismissable stacked cards
│   │   ├── TopicTile.tsx           # tile shown on home grid
│   │   ├── TableOfContents.tsx     # desktop sticky on-this-page list
│   │   ├── Breadcrumb.tsx          # crumb (Inter 400 inactive / 600 active, ChevronRight)
│   │   └── WasThisHelpful.tsx      # thumb up/down feedback widget
│   └── lib/
│       ├── cn.ts                   # tailwind-merge helper
│       ├── config.ts               # support email, site URL, social, languages
│       ├── seo/
│       │   └── jsonld.tsx          # Article / Breadcrumb / WebSite / Org schemas
│       └── topics/
│           ├── index.ts            # public barrel (everything except search)
│           ├── types.ts            # Article, ArticleSection, Topic
│           ├── topics.ts           # topics array, TopicSlug union
│           ├── articles.ts         # articles array + lookups
│           ├── sections.ts         # default TOC sections per topic
│           └── search.ts           # MiniSearch — separate import path
├── package.json
├── next.config.ts                  # security headers + /articles 308 redirect
├── tsconfig.json
└── REQUIREMENTS.md                 # product spec
```

## Design tokens

Tokens live as CSS variables in `src/app/globals.css`, bridged to Tailwind utilities via Tailwind 4's `@theme` block. Names match `Assets/DESIGN_SYSTEM.md` verbatim — when the canonical `tokens.css` ships, drop it in and remove the duplicated `:root` block.

Key tokens:
- `--blez-blue: #0099FF` — only action color, dark backgrounds only
- `--bg-canvas: #101010` — page background (not pure black, by design)
- `--font-display` — Druk Wide, rendered at 700 (uppercase, non-italic per the support-app convention)
- `--font-body` — `var(--font-inter)` from next/font, fallback to literal Inter

Cascade layers (`@layer base { ... }`, `@layer components { ... }`) ensure utilities override component classes which override base styles. Custom CSS that ignores layers will outrank both — keep additions inside the right layer.

## Search

`MiniSearch` index built lazily on first call from `searchArticles` (`src/lib/topics/search.ts`). Title weight 3, summary 2; prefix matching + 0.2 fuzzy distance + AND-combine. The index lives in module scope so subsequent searches are fast.

**Important**: `searchArticles` is imported from `@/lib/topics/search`, NOT the `@/lib/topics` barrel. This keeps MiniSearch (~25 KB) out of any bundle that only needs topic types or data.

## SEO

Wired up at the framework level — none of this needs revisiting unless you change route shape or article schema:

- **Per-route metadata** (`title`, `description`, `openGraph`, `twitter`, `alternates.canonical`) on `/`, `/articles/:topic`, `/articles/:topic/:slug`
- **JSON-LD** schemas via `src/lib/seo/jsonld.tsx`: `WebSite` + `Organization` sitewide, `BreadcrumbList` on topic + article pages, `Article` on every article
- **OG image** generated at build time from `src/app/opengraph-image.tsx` (1200×630, brand gradient + tagline)
- **`metadataBase`** resolves from `siteConfig.siteUrl` → `NEXT_PUBLIC_SITE_URL` env (default `https://support.blezonline.com`)
- **`/sitemap.xml`** includes home, every topic + every article. `lastModified` per article from real `lastUpdated`; topic and home dates roll up to the most recent article
- **`/robots.txt`** allows `/` except `/api/`, declares the sitemap, sets `host`
- **Indexing is gated** by `NEXT_PUBLIC_ALLOW_INDEX` (default off): while off, article + topic pages emit `noindex, follow` and the sitemap lists only the home route, so the ~60 placeholder pages aren't indexed as thin content. Flip it to `true` once real copy ships. See `.env.example`.
- **`/articles` → `/`** is a 308 permanent redirect (in `next.config.ts`)
- **App icons** at `src/app/icon.png` + `src/app/apple-icon.png`
- `<time dateTime>` wraps article last-updated dates for machine-readable freshness

---

## For the inheriting dev

Two concrete things to wire up:

### 1. Article content
`src/lib/topics/articles.ts` is in-repo data with placeholder bodies. Article `body` is plain text with paragraphs separated by `\n\n` (consumers split on the double-newline). Two natural paths:
- **MDX in repo**: move article bodies to `content/<topic>/<slug>.mdx`, build a content layer that reads them at build time, keep the existing `Article` shape
- **Headless CMS**: replace `articles`/`getArticle`/`searchArticles` with fetches; cache via `unstable_cache` or ISR

The 4 default-section templates per topic in `src/lib/topics/sections.ts` exist only because article bodies are placeholders. Once real articles ship with their own `sections`, delete `defaultSectionsByTopic` and `getArticleSections`'s fallback path.

### 2. Was-this-helpful + analytics
`WasThisHelpful` in `src/components/WasThisHelpful.tsx` collects feedback but the submit handler is a no-op. Wire to `POST /api/feedback` with `{ articleSlug, verdict, comment }`. The most valuable signal to log first: **search queries that return zero results** — instrument from `SearchBar.tsx`'s no-match panel.

### Other notes

- `Assets/` and `docs/` are reference material — committed for the dev's sake but never imported at runtime.
- `Assets/fonts/` has every Druk Wide weight. `public/fonts/` ships only Heavy / Heavy Italic / Bold / Medium. Display type currently renders at Bold 700; the others are kept in case the design evolves.
- Security headers are set in `next.config.ts`, including a **baseline CSP**. It's origin-restricted (`self`-only scripts/styles/fonts/images/connections) but uses `'unsafe-inline'` for script/style because this static build has no nonce pipeline — harden it to nonce/hash-based, and widen `connect-src`/`img-src` for the real backend, analytics, and CDN hosts, once those are known. `LanguageSwitcher` does a top-level navigation to `translate.google.com`, which needs no CSP allowance.
- `npm audit` reports 2 moderate transitive `postcss` vulns inside Next's bundled toolchain. Not exploitable without user-supplied CSS; documented and deferred.
- `siteConfig.siteUrl` falls back to `https://support.blezonline.com`. Set `NEXT_PUBLIC_SITE_URL` in the deploy environment to override (used by `metadataBase`, sitemap, robots).
- Language switcher routes through Google Translate's web proxy. Browser-built-in translate UI cannot be triggered programmatically; the proxy is the closest approximation. Real i18n (next-intl, locale-prefixed routes) is out of scope for this handoff.
- `globals.css` strips the default `<a>` underline globally. Inline links inside prose should opt back in with `underline underline-offset-4` (the Footer legal strip is the canonical example).
