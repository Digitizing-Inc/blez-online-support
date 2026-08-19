# Resources content — reviewer notes

The `/resources` section is a new SEO/editorial library, separate from the
support help center (`/articles`). Content was rewritten from a set of
marketing/SEO source docs into structured data in
`src/lib/resources/resources.data.json`. **Every post needs human
verification before launch.**

## What was published (10 posts)

| Slug | Category | Source |
|---|---|---|
| `how-blez-online-works` | guide | single doc |
| `digital-repack-faq` | faq | single doc (29 Q&A → FAQPage schema) |
| `blez-vs-arena-club` | comparison | single doc |
| `blez-vs-courtyard-io` | comparison | single doc |
| `card-grading-demystified` | guide | deduped from 2 drafts |
| `protecting-your-card-collection` | guide | deduped from 2 drafts |
| `sports-card-investing-101` | guide | deduped from 2 drafts |
| `new-collectors-roadmap` | guide | deduped from 3 drafts |
| `about-blez-online` | about | single doc |
| `card-markets-by-category` | guide | **net-new, web-researched** |

### `card-markets-by-category` — extra review notes

This one was written fresh (not from a source doc), researched from public
market coverage. Verify before launch:

- **Market facts** — e.g. the WNBA "100,000+ graded Clark cards" and box-price
  claims, One Piece launching in 2022, and the **Fanatics/Topps vs Panini
  license shift** (NBA in 2025, NFL multi-year). These were accurate at time
  of writing but move fast; confirm they're still current.
- **Category experts** — the piece speaks generally about using a category
  specialist per market, and names only the established Card Architects
  (Jared / Scott / Jake, per the About post). If Blez has specific buyers for
  Pokémon, One Piece, WNBA, wrestling, or hockey, name them for credibility.

Several topics arrived as 2–3 near-duplicate drafts; those were deduped to a
single best-of post (merge decisions are recorded per-file in the source
conversion, summarized here where relevant).

## Bibliographies / sources (added for trust + E-E-A-T)

Every resource post now ends with a **Sources** bibliography, and the
sources also feed the `BlogPosting` `citation` structured data. Sources were
web-researched and **every URL was checked to resolve** (curl); links that
404'd or were unreachable were dropped, leaving **50 verified sources** (4–6
per article). Notes:

- Sources favor primary/authoritative pages: the grading companies (PSA,
  Beckett, SGC, CGC), PCI Security Standards Council, ESPN/Forbes/SI, the
  competitors' own support docs (Arena Club Zendesk, Courtyard docs) +
  Trustpilot, and The Hendon Mob for founder poker earnings.
- A few real pages (Hendon Mob, Trustpilot, Sports Collectors Daily) return
  403 to automated checkers because they block bots — they work fine in a
  browser and were kept intentionally.
- **Founder-name flag:** research corroborated Jared Bleznick and his
  **$10M+ poker earnings (Hendon Mob)**, but could **not** verify a brother
  named **"Scott"** — one third-party source named the co-founder **"Chad
  Bleznick."** Confirm the correct name in `about-blez-online` before launch.

## What was excluded (never published)

Five docs were **internal SEO/implementation briefings**, not public
articles — they contain "FOR DEV TEAM" notes, target-keyword clusters, and
target URLs. Excluded entirely:

- "SEO & Implementation Briefing" (×4)
- "Blez Online — SEO & Content Recommendations" (Ahrefs analysis, prepared Feb 23 2026)

Boilerplate stripped from the published posts: "| Blez Online" title
suffixes, on-page jump-link menus, CTA/footer link blocks, and embedded
JSON-LD/HTML-comment scaffolding.

## Flags — please verify before launch

1. **Publish dates are PLACEHOLDERS.** `publishedAt` values are staggered
   across Jun–Aug 2026 so the tiles look like a real library. Set them to the
   real authored/publish dates (they drive the tile date, `<time>`, sitemap
   `lastModified`, and BlogPosting `datePublished`).
2. **Unverified marketing stats.** The source drafts disagreed on platform
   stats — one says **"over 1 million transactions,"** another says
   **"750,000+ transactions / 4.9 stars / 35,000+ reviews."** The conflicting
   numbers were NOT blended; the base draft's figure was kept. Confirm the
   correct, current numbers.
3. **Founder / brand claims.** `about-blez-online` names founders **Jared and
   Scott Bleznick** and a poker/breaker backstory, taken verbatim from the
   source. Verify accuracy.
4. **Competitive comparisons.** `blez-vs-arena-club` and
   `blez-vs-courtyard-io` make factual claims about competitors (fees,
   buyback terms, track record). A few sharply worded editorial phrasings
   were softened, but **these should get marketing/legal review** before
   publishing comparative claims about named competitors.
5. **Tile images are branded placeholders.** Each post shows a deterministic
   on-brand gradient + category icon (`ResourceThumb`). Swap in real hero art
   later by giving posts an image field and rendering `next/image`. Social
   `og:image` is a generated title card (`resources/[slug]/opengraph-image`).
6. **Indexing.** Resource pages follow the same `NEXT_PUBLIC_ALLOW_INDEX`
   gate as the rest of the site (currently `noindex` + excluded from the
   sitemap until you flip the flag at launch). Because these are the SEO play,
   make sure the flag is flipped on when the site goes live.

## How it's wired (for the dev)

- Data: `src/lib/resources/resources.data.json` (+ `types.ts`, `resources.ts`
  helpers, `index.ts` barrel).
- Routes: `src/app/resources/page.tsx` (listing), `[slug]/page.tsx` (post),
  `[slug]/opengraph-image.tsx` (generated social image).
- Components: `ResourceCard`, `ResourceThumb`, `Prose` (renders the plain-text
  bodies incl. `- ` bullet lists).
- SEO: per-post metadata + canonical, `BlogPosting` (+ `FAQPage` on the FAQ
  post) JSON-LD, `Blog` schema on the listing, sitemap entries, `<time>`.
- Nav: "Resources" + "Help Center" links added to `Header`.
