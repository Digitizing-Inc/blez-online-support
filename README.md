# Blez Online Support

A dark-first support site for Blez Online. Two modes: a search-and-browse-by-topic article library at `/`, and an AI chatbot ("the BlezBot") at `/chat`.

This is a **frontend-only handoff**. UI is complete; backend integration is the next step. See **[For the inheriting dev](#for-the-inheriting-dev)** below.

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

> ⚠️ **Local dev on Windows + exFAT:** Next 16's Turbopack dev cannot create the junction points it needs on an exFAT-formatted drive (`Incorrect function. (os error 1)`). If you're cloning onto a `D:`-style exFAT volume, move it to an NTFS drive (e.g. `C:`) before running `npm run dev`. `npm run build` and Vercel deploys are unaffected.

## Project layout

```
.
├── Assets/                         # design source — not imported at runtime
│   ├── DESIGN_SYSTEM.md            # canonical spec
│   └── fonts/                      # licensed Druk Wide woff/woff2
├── docs/
│   └── TOPICS.md                   # source of truth for topic + article list
├── public/
│   ├── blez-logo.webp              # header / footer brand mark
│   ├── blez-mark.png               # BlezBot icon (used by BlezMark)
│   └── fonts/                      # Druk Wide subset shipped at runtime
├── src/
│   ├── app/
│   │   ├── layout.tsx              # root layout — fonts, JSON-LD, OG metadata
│   │   ├── globals.css             # design tokens + component classes
│   │   ├── page.tsx                # / — search + topic tile grid
│   │   ├── chat/page.tsx           # /chat — BlezBot chat (Suspense)
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
│   │   ├── TopicTile.tsx           # tile shown on home grid
│   │   ├── BlezBotTile.tsx         # gradient "Ask the BlezBot" tile
│   │   ├── BlezMark.tsx            # the blue F glyph w/ shimmer outline
│   │   ├── Chat.tsx                # re-export of `chat/Chat.tsx` (legacy import path)
│   │   ├── TableOfContents.tsx     # desktop sticky on-this-page list
│   │   ├── Breadcrumb.tsx          # crumb (Inter 400 inactive / 600 active, ChevronRight)
│   │   ├── WasThisHelpful.tsx      # thumb up/down feedback widget
│   │   └── chat/                   # Chat module — see `For the inheriting dev` §1
│   │       ├── Chat.tsx            # orchestrator
│   │       ├── Sidebar.tsx         # conversation history + search + share
│   │       ├── EmptyState.tsx      # greeting + categorized prompts
│   │       ├── MessageRow.tsx      # avatar + markdown + actions (memoized)
│   │       ├── MessageActions.tsx  # copy / 👍 / 👎 / regenerate
│   │       ├── CitationChips.tsx
│   │       ├── Markdown.tsx        # react-markdown wrapper, link-sanitizing
│   │       ├── InputBar.tsx        # auto-grow + slash commands + kbd hint
│   │       └── Toast.tsx
│   └── lib/
│       ├── cn.ts                   # tailwind-merge helper
│       ├── config.ts               # support email, site URL, social, languages
│       ├── seo/
│       │   └── jsonld.tsx          # Article / Breadcrumb / WebSite / Org schemas
│       ├── topics/
│       │   ├── index.ts            # public barrel (everything except search)
│       │   ├── types.ts            # Article, ArticleSection, Topic
│       │   ├── topics.ts           # topics array, TopicSlug union, urgent
│       │   ├── articles.ts         # articles array + lookups
│       │   ├── sections.ts         # default TOC sections per topic
│       │   └── search.ts           # MiniSearch — separate import path
│       └── chat/
│           ├── types.ts            # Conversation, Message, Citation
│           ├── storage.ts          # localStorage hook (versioned envelope, debounced)
│           ├── streaming.ts        # fakeStream() — swap for real LLM here
│           ├── citations.ts        # placeholder citation picker
│           └── commands.ts         # /reset /email /feedback
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
- `--font-display` — Druk Wide 800 (uppercase, non-italic per the support-app convention)
- `--font-body` — `var(--font-inter)` from next/font, fallback to literal Inter

Cascade layers (`@layer base { ... }`, `@layer components { ... }`) ensure utilities override component classes which override base styles. Custom CSS that ignores layers will outrank both — keep additions inside the right layer.

## Search

`MiniSearch` index built lazily on first call from `searchArticles` (`src/lib/topics/search.ts`). Title weight 3, summary 2; prefix matching + 0.2 fuzzy distance + AND-combine. The index lives in module scope so subsequent searches are fast.

**Important**: `searchArticles` is imported from `@/lib/topics/search`, NOT the `@/lib/topics` barrel. This keeps MiniSearch (~25 KB) out of any bundle that only needs topic types or data.

## SEO

Wired up at the framework level — none of this needs revisiting unless you change route shape or article schema:

- **Per-route metadata** (`title`, `description`, `openGraph`, `twitter`, `alternates.canonical`) on `/`, `/chat`, `/articles/:topic`, `/articles/:topic/:slug`
- **JSON-LD** schemas via `src/lib/seo/jsonld.tsx`: `WebSite` + `Organization` sitewide, `BreadcrumbList` on topic + article pages, `Article` on every article
- **OG image** generated at build time from `src/app/opengraph-image.tsx` (1200×630, brand gradient + tagline)
- **`metadataBase`** resolves from `siteConfig.siteUrl` → `NEXT_PUBLIC_SITE_URL` env (default `https://support.blezonline.com`)
- **`/sitemap.xml`** includes home, `/chat`, every topic + every article. `lastModified` per article from real `lastUpdated`; topic and home dates roll up to the most recent article
- **`/robots.txt`** allows `/` except `/api/`, declares the sitemap, sets `host`
- **`/articles` → `/`** is a 308 permanent redirect (in `next.config.ts`)
- **App icons** at `src/app/icon.png` + `src/app/apple-icon.png`
- `<time dateTime>` wraps article last-updated dates for machine-readable freshness

## Chat persistence

Conversations live in `localStorage` under key `blez-support-chat` in a versioned envelope (`{ version: 1, store: ... }`). Saves are **debounced 250ms AND skipped while any message is streaming** to avoid write storms during token ticks. The dev wiring the backend should swap `loadStore` / `saveStore` in `src/lib/chat/storage.ts` for a server-synced layer.

---

## For the inheriting dev

Three concrete things to wire up:

### 1. Chatbot backend
The chat shell is in `src/components/chat/` and lib utilities in `src/lib/chat/`. The fake stream is in `src/lib/chat/streaming.ts`:

```ts
fakeStream(text, { onToken, onDone, charsPerSecond })
```

Swap this for a real `/api/chat` route that streams tokens with the same `onToken(partial)` contract — the rest of the UI doesn't need to change.

- New route: `src/app/api/chat/route.ts`
- Use `@anthropic-ai/sdk` and stream tokens via Server-Sent Events
- Recommended: RAG over the article corpus; the real `citations` returned by retrieval replace the client-side `pickCitations()` in `src/lib/chat/citations.ts` (delete it)
- Model: Sonnet 4.6 for quality, or Haiku 4.5 for cost
- The `?q=...` deep-link param is already wired — Chat auto-sends on mount
- The `?share=...` URL imports a base64-encoded conversation into local storage; payloads are validated and untrusted markdown links are sanitized in `Markdown.tsx`

### 2. Article content
`src/lib/topics/articles.ts` is in-repo data with placeholder bodies. Article `body` is plain text with paragraphs separated by `\n\n` (consumers split on the double-newline). Two natural paths:
- **MDX in repo**: move article bodies to `content/<topic>/<slug>.mdx`, build a content layer that reads them at build time, keep the existing `Article` shape
- **Headless CMS**: replace `articles`/`getArticle`/`searchArticles` with fetches; cache via `unstable_cache` or ISR

The 4 default-section templates per topic in `src/lib/topics/sections.ts` exist only because article bodies are placeholders. Once real articles ship with their own `sections`, delete `defaultSectionsByTopic` and `getArticleSections`'s fallback path.

### 3. Was-this-helpful + analytics
`WasThisHelpful` in `src/components/WasThisHelpful.tsx` collects feedback but the submit handler is a no-op. Wire to `POST /api/feedback` with `{ articleSlug, verdict, comment }`. The most valuable signal to log first: **search queries that return zero results** — instrument from `SearchBar.tsx`'s no-match panel.

### Other notes

- `Assets/` and `docs/` are reference material — committed for the dev's sake but never imported at runtime.
- `Assets/fonts/` has every Druk Wide weight. `public/fonts/` ships only Heavy / Heavy Italic / Bold / Medium. Spec uses Heavy 800; the others are kept in case the design evolves.
- Security headers are set in `next.config.ts`. CSP is intentionally absent — add it once you know what backend hosts and analytics endpoints to allow. Note: `LanguageSwitcher` does a top-level navigation to `translate.google.com`, which doesn't need a CSP allowance.
- `npm audit` reports 2 moderate transitive `postcss` vulns inside Next's bundled toolchain. Not exploitable without user-supplied CSS; documented and deferred.
- `siteConfig.siteUrl` falls back to `https://support.blezonline.com`. Set `NEXT_PUBLIC_SITE_URL` in the deploy environment to override (used by `metadataBase`, sitemap, robots).
- Language switcher routes through Google Translate's web proxy. Browser-built-in translate UI cannot be triggered programmatically; the proxy is the closest approximation. Real i18n (next-intl, locale-prefixed routes) is out of scope for this handoff.
- `globals.css` strips the default `<a>` underline globally. Inline links inside prose should opt back in with `underline underline-offset-4` (the Footer legal strip is the canonical example).
