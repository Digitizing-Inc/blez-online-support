# Production-Readiness Review — Blez Online Support

_Article-only help center (the AI "BlezBot" chat feature was removed). This
doc is the handoff punch-list for the dev wiring real content + backend._

**Verdict:** no P0 blockers. The app is production-shaped — CMS-seamed data
layer, correct SEO plumbing, server-first components, responsive layouts. The
items below are hardening/polish. Everything under "Fixed in this pass" is
already done and verified with a green `next build`; everything under "Open"
is left for the inheriting dev.

---

## Fixed in this pass

- **Display type dropped one weight** — all Druk Wide renders at Bold 700
  (was Heavy 800), via the single `.display` rule in `globals.css`.
- **BlezBot fully removed** — `/chat` route, chat components/lib, the home
  tile, banner card, and all references/CSS. `tsc` + `build` clean; `/chat`
  now 404s.
- **Baseline CSP** added (`next.config.ts`) — origin-restricted; documented
  as needing nonce/hash hardening + host allowances when the backend lands.
- **Placeholder content de-indexed** — article/topic pages emit
  `noindex, follow` and the sitemap lists only `/` until
  `NEXT_PUBLIC_ALLOW_INDEX=true`. Prevents ~60 thin pages being indexed.
- **Footer social tap targets** raised from ~20px to 44px (`Footer.tsx`).
- **Reduced-motion support** — global `prefers-reduced-motion` guard
  neutralizes transitions/animations app-wide.
- **Dead `.live-dot` CSS** (chatbot-era) removed.

## Open — for the inheriting dev

### Content & CMS
- **P2 — Synthetic article sections.** `getArticleSections()` fabricates
  headings (Overview/Walkthrough/Tips) and splits `body` on `\n\n`; the real
  `article.body` is never rendered directly (`[slug]/page.tsx`,
  `sections.ts`). This is the one non-mechanical part of a CMS/MDX swap:
  render `article.body` as rich text/MDX, derive the TOC from the rendered
  `<h2>`s (rehype-slug + a headings extractor), then delete
  `defaultSectionsByTopic`. The `Article.sections?` field already anticipates
  this.
- **P2 — `datePublished` == `dateModified`.** Both come from the single
  `lastUpdated` field (`jsonld.tsx`). Add a `publishedAt` to `Article` and map
  them separately once the CMS provides both.
- Remember to set `NEXT_PUBLIC_ALLOW_INDEX=true` when real copy ships.

### Accessibility
- **P1 — Language switcher.** Uses a deprecated Google Translate proxy URL
  (`LanguageSwitcher.tsx`); the whole non-English feature needs a live test.
  It also sets `document.documentElement.lang` to the picked locale while the
  served content stays English — mislabels the page for screen readers. Fix
  or drop the placeholder locales until a real i18n path is chosen.
- **P2 — TOC.** Active section is visual-only; add `aria-current="location"`
  to the active link, and move focus to the target section on click.
- **P2 — Language dropdown** `role="listbox"` contains a non-`option`
  disclaimer `<li>`; move it out of the listbox or mark it presentational.
- **P2 — Search results** aren't a full ARIA combobox (no arrow-key nav);
  links are tab-focusable, so low priority.
- **P2 — "Was this helpful?"** buttons are 36px; bump to 44px if desired.

### Banner polish
- **P2** — On ~320px viewports a long card headline can clip against the
  fixed card height + `overflow-hidden`; consider `line-clamp` on the
  headline. The card headline is an `<h2>` sitting before the page `<h1>` in
  DOM order — consider a styled `<p>`/`<div>` to keep the heading outline
  clean. Close button is 28px (above the 24px AA min, below 44px).

### Cleanup (optional)
- **P2 — Dead design-system CSS.** `globals.css` carries a spec-mirrored kit
  that isn't referenced (`.badge*`, `.chip*`, `.tabs`, most `.btn-*`
  variants, `.input-wrap`/`.input-label`/`.input-help`, `.body-*`,
  `.display-h1`). Intentional per the file comments — either trim to what
  ships or move to a clearly-labeled `components.css` reference kit.
- **P2 — `robots.host`** is only honored by Yandex and effectively dead;
  canonical host is already enforced via `metadataBase`. Harmless.

### Handoff stubs (by design, not defects)
- `WasThisHelpful` submit is a documented no-op — wire to `POST /api/feedback`.
  Log zero-result search queries first (from `SearchBar`'s no-match panel).
- `config.ts` `supportEmail` / `mainSiteUrl` / placeholder `languages` are
  intended ship defaults for the backend dev to swap.

---

## Confirmed clean
Header, TopicTile, Breadcrumb, `cn`/tsconfig/package.json; metadata /
canonicals / JSON-LD / sitemap correctness; heading order + landmarks +
skip-link on article pages; MiniSearch kept out of the shared barrel;
server/client component split; and zero dangling chatbot references anywhere
in `src`.
