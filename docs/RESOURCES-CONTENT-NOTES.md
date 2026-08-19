# Resources content — reviewer notes

The `/resources` section is a new SEO/editorial library, separate from the
support help center (`/articles`). Content was rewritten from a set of
marketing/SEO source docs into structured data in
`src/lib/resources/resources.data.json`. **Every post needs human
verification before launch.**

## What was published (9 posts)

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

Several topics arrived as 2–3 near-duplicate drafts; those were deduped to a
single best-of post (merge decisions are recorded per-file in the source
conversion, summarized here where relevant).

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
