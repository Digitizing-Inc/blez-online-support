# Blez Online Support — Requirements

**Status:** draft v0.1
**Last updated:** 2026-05-01

> ⚠️ **Scope update (2026-08):** The AI chatbot ("BlezBot") has been **descoped**. The shipped product is an **article-only help center** — search + browse-by-topic + per-article pages. All chatbot sections below (§3.3, FR-5/6, the `/chat` route and `/api/chat`, chatbot open questions) are retained for historical context only and do **not** reflect the current build. Treat the searchable article library as the whole product.

A standalone support site for Blez Online, modeled after `support.claude.com`. Two primary modes: an AI chatbot that answers Blez questions, and a searchable library of support articles organized by topic.

The companion product (theblez) lives at `d:/CLaude/Projects/theblez/` and runs on Next.js 16 / React 19 / Tailwind 4 / Supabase. This support site is intended to live alongside it as a separate deployment.

---

## 1. Goals

- Give Blez users a single place to get answers — fast.
- Provide an AI chatbot as the primary self-serve channel.
- Provide a browsable, searchable library of support articles for users who prefer to read.
- Stay visually consistent with Blez Online and with the simplicity of `support.claude.com`.
- Support multiple languages so non-English users can self-serve.

## 2. Out of scope (for v1)

- Ticketing / case management
- Live agent chat
- User accounts specific to support (the site is public)
- Authoring UI for articles inside the app — articles are managed in source/CMS

---

## 3. Information architecture

### 3.1 Global header (every page)
- **Logo (top left)** — clicks back to home. Same Blez logo as main site.
- **Language switcher (top right)** — globe icon + dropdown of supported languages. Non-English picks navigate to Google Translate's web proxy with the current page URL pre-filled.

> Note: the original spec called for a "How to get support" mailto in the header. That CTA was moved to the footer's "Need support?" callout (per current implementation). The header is intentionally minimal.

### 3.2 Home — two-tab layout
Two top-level tabs are the primary navigation between modes:
- **Left tab — "AI Chatbot"** (default on load): conversational interface to ask Blez Online questions in natural language.
- **Right tab — "Support Articles"**: search + browse-by-topic library.

The active tab is reflected in the URL so it's shareable / refreshable (e.g. `/?tab=articles` or distinct routes `/chat` vs `/articles` — see Open Questions).

### 3.3 AI Chatbot view
- Standard chat layout: message list above, input at bottom.
- Initial state shows a friendly intro and a few suggested prompts.
- Messages stream in. Markdown renders inside assistant replies.
- Each assistant reply may cite the article(s) it pulled from (if RAG is used — see Open Questions).
- "New chat" / clear conversation control.
- Optional: copy-to-clipboard on assistant messages.

### 3.4 Support Articles view
Mirrors the `support.claude.com` layout:
- **Hero**: heading "Search for answers or browse by topic" + a prominent search input.
- **Topic tiles**: a grid of category cards. Each tile = one major section (the topic list will be supplied by the user).
- Clicking a tile drills into a category page listing the articles in that section.
- Clicking an article opens the full article page.

### 3.5 Search
- Searches the title and body of every article across all categories.
- Returns results as a list with title + short excerpt + topic breadcrumb.
- Live results as the user types (debounced).
- Works in the active language only by default.

### 3.6 Article page
- Breadcrumb: `Articles › <Topic> › <Article title>`.
- Title, last-updated date, body (rendered markdown).
- "Was this helpful?" feedback (optional v1 — see Open Questions).
- Related articles in the same topic at the bottom.

### 3.7 Localization
- Site chrome (header, tab labels, hero copy, etc.) translated into every supported language.
- Article translations stored per-language; if a translation is missing for the active language, fall back to English with a small notice.

---

## 4. Functional requirements

| ID | Requirement |
|----|-------------|
| FR-1 | Header logo links to `/`. |
| FR-2 | "Email Support" CTA in the footer callout opens the user's mail client to the configured support email. |
| FR-3 | Language switcher updates the UI language and persists the choice across visits. |
| FR-4 | Tab switch between Chatbot and Articles is one click and does not full-page-reload. |
| FR-5 | Chatbot streams responses from a configured LLM backend. |
| FR-6 | Chatbot answers are scoped to Blez Online — off-topic questions get a polite redirect. |
| FR-7 | Article search returns results across all articles in the current language, ranked by relevance. |
| FR-8 | Topic tiles match the topic list supplied by the product owner (forthcoming). |
| FR-9 | Article URLs are stable and shareable (`/articles/<topic-slug>/<article-slug>`). |
| FR-10 | Articles render markdown including headings, lists, code, images, and links. |

## 5. Non-functional requirements

- **Responsive**: mobile, tablet, desktop. Chatbot input and article search both work well on a phone.
- **Accessibility**: keyboard nav for tabs, focus-visible states, semantic landmarks, alt text on images, language attribute set on `<html>` to match active language.
- **Performance**: articles statically rendered or aggressively cached; first content paint under ~1.5s on a typical broadband connection.
- **SEO**: each article has its own metadata (title, description, OG tags) and is indexable. Chatbot replies are not indexed.
- **Brand**: matches the Blez Online style guide (forthcoming).

---

## 6. Tech stack (proposed — confirm)

To match theblez and keep one mental model:
- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- Lucide icons
- Vercel for hosting

For features specific to this app:
- **Chatbot**: Anthropic Claude API via `@anthropic-ai/sdk`. Streaming responses. Optional RAG over the article corpus (see Open Q).
- **Article search**: client-side index built at build time (e.g. FlexSearch or MiniSearch) — keeps the architecture simple while articles remain modest in size.
- **Articles**: MDX files committed to the repo, organized as `content/<lang>/<topic>/<slug>.mdx`. Reconsider if the article count grows past a few hundred.
- **i18n**: `next-intl` for UI strings; per-language directories for articles.

> ⚠️ **Local dev note**: the user's `D:` drive is exFAT, which does not support NTFS junction points. Next 16's Turbopack dev mode fails with "Incorrect function (os error 1)" on exFAT. Plan to either (a) clone this repo to `C:` for local dev, or (b) develop directly via Vercel preview deploys.

---

## 7. Pages / routes (proposed)

```
/                       → home, defaults to chatbot tab
/chat                   → chatbot mode (or /?tab=chat)
/articles               → topic tile grid + search
/articles/<topic>       → topic landing page (article list)
/articles/<topic>/<slug>→ article page
/api/chat               → server route for chat (proxies to Claude API)
/api/feedback           → optional: article feedback
```

---

## 8. Content model

### 8.1 Topic
- `slug` (e.g. `getting-started`)
- `title`
- `description` (short blurb on tile)
- `iconName` (Lucide)
- `order`

### 8.2 Article
- `slug`
- `topicSlug`
- `title`
- `summary`
- `lastUpdated`
- `body` (markdown / MDX)
- `language`

The full topic list with headings will be supplied by the product owner.

---

## 9. Style

The visual style guide will be supplied as a separate document (forthcoming) and will land at `docs/STYLE_GUIDE.md`. Until then, default to a clean, minimal style consistent with `support.claude.com` and Blez Online's main site.

---

## 10. Open questions

These are the decisions still needed before implementation can start.

1. **Support email address** — what address should "How to get support" point to?
2. **Logo** — provide the asset path or a link. Same as main Blez site?
3. **Languages to support at launch** — which list? (e.g. EN, ES, FR, …)
4. **Translation strategy** — pre-translated articles per language, or auto-translate via API at request time? (Pre-translated is much higher quality but requires the content to exist.)
5. **Default tab on `/`** — chatbot or articles?
6. **Tab routing** — separate routes (`/chat`, `/articles`) or query param (`/?tab=...`)? Separate routes are friendlier to bookmarking and SEO.
7. **Chatbot backend** — Claude API direct, with no retrieval? Or RAG over the article corpus so answers cite Blez-specific docs? RAG is recommended for accuracy.
8. **Chatbot model** — Sonnet 4.6 (good balance) or Haiku 4.5 (cheaper/faster)?
9. **Conversation persistence** — does a chat history persist on refresh, or is each visit fresh?
10. **Auth** — fully public, or only available to logged-in Blez users?
11. **Article authoring** — MDX in repo (PR-based) or a headless CMS (e.g. Sanity/Contentful)?
12. **Hosting / deployment** — same Vercel team as theblez? Will it live at a subdomain (e.g. `support.blezonline.com`)?
13. **Analytics** — what should we instrument? Search queries with no results are especially valuable to log.
14. **Feedback widget on articles** — include "Was this helpful?" in v1?
15. **Repo** — new GitHub repo under the same org as theblez?

---

## 11. Pending inputs from product owner

- [ ] Style guide (`docs/STYLE_GUIDE.md`)
- [ ] Topic list with headings and category tiles
- [ ] Initial article content (or a list of placeholder articles)
- [ ] Support email address
- [ ] Logo asset
- [ ] Answers to open questions in §10
