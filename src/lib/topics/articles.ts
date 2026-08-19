import type { Article } from './types'

/**
 * Article content. Rewritten from the internal support guide (source of
 * truth) into public help-center voice; internal/admin material (fraud
 * signals, manual-review procedure, payout risk criteria, admin panel,
 * fulfillment-partner names, agent macros) is intentionally excluded.
 * Bodies are plain text; paragraphs split on `\n\n`. Each article ships
 * explicit `sections`, so the topic-default fallback in `sections.ts` is
 * no longer used by these rows. HUMAN REVIEW PENDING before launch.
 */
export const articles: Article[] = [
  // ── Getting Started ──────────────────────────────────────────
  {
    slug: 'what-is-blez-online',
    topicSlug: 'getting-started',
    title: 'What is Blez Online? How virtual packs work',
    summary:
      'Blez Online is a digital pack-ripping marketplace for real trading cards and collectibles — pick a pack, rip it on screen, then ship what you pull or sell it back instantly.',
    body: 'Blez Online is a digital pack-ripping marketplace. You buy a pack, open it on screen, and the real item inside is yours to ship or sell back to Blez.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'overview',
        heading: 'The basics',
        body: 'Blez Online lets you buy and open packs online. Every pack contains one or more real, physical items — trading cards, sealed collectibles, or memorabilia — that are curated by our team rather than made by a manufacturer.\n\nYou open the pack with an interactive on-screen animation. Once the item is revealed, you decide what to do with it: keep it stashed to ship to your door later, or sell it back to Blez instantly for 90% of its value (80% for memorabilia).',
      },
      {
        id: 'currency',
        heading: 'Points and Balance',
        body: 'Blez uses two currencies. Blez Points are used to buy packs and can be topped up with a real-money purchase. Blez Balance is the cash you earn when you sell an item back; you can spend it on more packs or cash it out to your bank.\n\nNew accounts start with 10 Blez Points.',
      },
      {
        id: 'categories',
        heading: 'What you can pull',
        body: 'Packs span Basketball (NBA and WNBA), Baseball (MLB), Football (NFL), Hockey, Multi-Sport, Pokémon, One Piece, and Disney — plus sealed collectibles (like Labubu) and memorabilia. Every item is graded by rarity — Grail (rarest, highest value), Chase (moderately rare), or Common (most frequent).\n\nEach pack shows a clear floor and ceiling price so you know the value range before you buy.',
      },
    ],
  },
  {
    slug: 'cards-collectibles-memorabilia',
    topicSlug: 'getting-started',
    title: 'Cards, collectibles & memorabilia — what’s the difference?',
    summary:
      'Everything you pull falls into three buckets — cards, sealed collectibles, and memorabilia — and each has its own sell-back rate and shipping rules.',
    body: 'Blez has three product types: cards, sealed collectibles, and memorabilia. Each has its own sell-back rate and holding rules.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'three-types',
        heading: 'The three product types',
        body: 'Everything on Blez falls into one of three buckets, and you can filter your Collect tab by each:\n\n- Cards — individual trading cards you pull from packs.\n- Collectibles — sealed products such as tins, wax, and unopened packs. Figure lines like Labubu live here too.\n- Memorabilia — physical memorabilia items, fulfilled through our shipping partners.',
      },
      {
        id: 'rules',
        heading: 'How the rules differ',
        body: 'The 72-hour clock and the sell-back rate work a little differently for each:\n\n- Cards: you have 72 hours to sell a card back at 90% of its value. After that the instant sell-back closes, but you can still ship the card whenever you like — there is no shipping deadline.\n- Sealed collectibles: mark them for shipping within 72 hours, or they are automatically sold back at 90% of value.\n- Memorabilia: mark them for shipping within 72 hours, or they are automatically sold back at 80% of value.',
      },
      {
        id: 'shipping',
        heading: 'How each one ships',
        body: 'Cards and sealed collectibles ship through Blez with a tracking number you can follow. Memorabilia is fulfilled through our shipping partners (including Fanatics and Ghostwrite), so those orders move on the partner’s flow — you’ll see an order number and a “Pending Fanatics Shipping” status rather than a standard tracking link, and we email you the details as it moves.',
      },
    ],
  },
  {
    slug: 'pick-rip-reveal-walkthrough',
    topicSlug: 'getting-started',
    title: 'How "Pick. Rip. Reveal." works — full walkthrough',
    summary:
      'A step-by-step walkthrough of buying a pack, opening it on screen, and deciding whether to keep or sell what you pull.',
    body: 'Pick a pack in the Shop, buy it, open it on screen, and choose to collect or sell what you pull.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'steps',
        heading: 'Opening a pack, step by step',
        body: '1. Go to the Shop and choose a pack.\n\n2. Click Quick Buy.\n\n3. Enter how many packs you want, and add a discount code if you have one.\n\n4. Select a payment method and check out, following any prompts from that method.\n\n5. Open the pack and watch the reveal.\n\n6. Choose to Collect the item (keep it) or Sell it back to Blez.',
      },
      {
        id: 'after',
        heading: 'After the reveal',
        body: 'Collecting stashes the item in your collection so you can ship it later. Selling converts it to Blez Balance right away — 90% of value for cards and sealed collectibles, 80% for memorabilia.\n\nA card has no shipping deadline (its instant sell-back option closes 72 hours after the pull). Sealed collectibles and memorabilia must be marked for shipping within 72 hours, or they are automatically sold back.',
      },
    ],
  },
  {
    slug: 'creating-account-id-verification',
    topicSlug: 'getting-started',
    title: 'Creating an account and verifying your identity',
    summary:
      'How to sign up in a couple of minutes, confirm your email, and complete identity verification before cashing out or shipping high-value items.',
    body: 'Sign up with your details, confirm your email, and complete identity verification (KYC) to unlock cashouts and high-value shipments.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'sign-up',
        heading: 'Creating your account',
        body: 'Click Sign Up in the upper-right corner and fill in your first and last name, a username, an alias, your email, and a password. Review and accept the Privacy Policy and Terms of Service, then click Create Account.\n\nCheck your inbox for a confirmation email and click Confirm My Email. Once confirmed, your account is ready and starts with 10 Blez Points.',
      },
      {
        id: 'verification',
        heading: 'Identity verification (KYC)',
        body: 'To cash out, or to ship higher-value items, you complete a one-time identity verification handled by our partner Plaid. You verify a phone number by text code and upload a valid, unexpired government ID that clearly shows your name and date of birth. Some international users are also asked to record a short selfie video.\n\nIf verification does not pass on the first try, contact support and we can help you get it sorted.',
      },
    ],
  },
  {
    slug: 'why-id-age-verification',
    topicSlug: 'getting-started',
    title: 'Why we ask for ID/age verification',
    summary:
      'Identity verification keeps the marketplace secure — it confirms real customers, reduces fraud and chargebacks, and only has to be done once.',
    body: 'We verify identity to confirm real customers, reduce fraud and chargebacks, and protect the marketplace. It is a one-time step.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'why',
        heading: 'Why we verify',
        body: 'We verify each account through Plaid as part of a company-wide security policy. It helps confirm that purchases are being made by real customers, reduces fraud and chargebacks, and protects both individual accounts and the integrity of the Blez Online marketplace.\n\nWe apply this consistently across all users to keep the environment secure and fair for everyone.',
      },
      {
        id: 'when',
        heading: 'When it applies',
        body: 'Verification is required before shipping or cashout abilities are enabled, and it only needs to be completed once. You can browse, buy, and open packs before verifying — you will be prompted when you first try to cash out or ship a higher-value item.',
      },
    ],
  },
  {
    slug: 'blez-points',
    topicSlug: 'getting-started',
    title: 'Blez Points: what they are, how to earn them, how to spend them',
    summary:
      'Blez Points are the credit used to buy packs — earned from top-ups, purchase cash-back, referrals, daily drops, and tier rewards.',
    body: 'Blez Points buy packs. You earn them from top-ups, purchase cash-back, sign-up and referral bonuses, daily drops, and tier rewards.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'what',
        heading: 'What Blez Points are',
        body: 'Blez Points are the in-app credit used to buy packs. You can top them up with a real-money purchase, and you earn some back on purchases. A pack must be paid for in full with a single method — partial payments across Points and other methods are not supported.',
      },
      {
        id: 'earning',
        heading: 'Ways to earn',
        body: 'New accounts start with 10 Blez Points. Beyond that, Points come from purchase cash-back, referral bonuses, daily drops, and tier rewards for higher-tier members.\n\nBlez Points are separate from Blez Balance: Points buy packs, while Balance (earned from selling items) can be spent on packs or cashed out to your bank.',
      },
    ],
  },
  {
    slug: 'using-promo-codes',
    topicSlug: 'getting-started',
    title: 'Using promo codes',
    summary:
      'How to apply a discount code at checkout, plus the usual rules — one use per code, and a cap on the maximum discount.',
    body: 'Enter a promo code in the Discount field at checkout and click Apply. Codes are typically single-use and may cap the maximum discount.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'how',
        heading: 'Applying a code',
        body: 'In the Shop, select a pack and click Quick Buy. Enter your quantity, then type your promo code into the Discount field and click Apply. The discount is reflected in your total before you pay.',
      },
      {
        id: 'rules',
        heading: 'Good to know',
        body: 'Each promo code can generally be used once. Codes often apply a percentage discount up to a maximum amount — for example, a 20% code capped at $100. If a code is expired, already used, or does not meet the code’s conditions, it will not apply.',
      },
    ],
  },
  {
    slug: 'card-architects',
    topicSlug: 'getting-started',
    title: 'How Card Architects curate repacks',
    summary:
      'Every pack is hand-curated by our Card Architects — the team that sources and selects each real item that goes into a repack.',
    body: 'Card Architects are the team that hand-picks the real items in every Blez repack, rather than relying on manufacturer packs.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'who',
        heading: 'Who curates your packs',
        body: 'Unlike hobby or retail packs made by manufacturers, Blez repacks are hand-curated by our team of Card Architects. Every item in a pack is personally sourced and selected before it is added.',
      },
      {
        id: 'how',
        heading: 'How packs are built',
        body: 'Each pack is assembled from real items with an assigned value, then published with a clear floor and ceiling price and a full odds breakdown you can read in the pack description. The rarer the item, the lower its drop rate.',
      },
    ],
  },

  // ── Buying & Payments ────────────────────────────────────────
  {
    slug: 'accepted-payment-methods',
    topicSlug: 'buying-payments',
    title: 'Accepted payment methods',
    summary:
      'You can pay with Blez Points, Blez Balance, Stripe (bank, Apple Pay, or Venmo), or PayPal — with no partial payments across methods.',
    body: 'Pay with Blez Points, Blez Balance, Stripe (bank, Apple Pay, Venmo), or PayPal. Payments cannot be split across methods.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'methods',
        heading: 'What you can pay with',
        body: 'Blez supports four payment methods: Blez Points, Blez Balance, Stripe, and PayPal. Through Stripe Checkout you can pay from a bank account, Apple Pay, or Venmo.',
      },
      {
        id: 'rules',
        heading: 'How payment works',
        body: 'A pack must be paid in full with one method — payments cannot be split. If your Blez Points or Blez Balance are not enough to cover a pack on their own, that method will not appear as an option for that purchase.',
      },
    ],
  },
  {
    slug: 'why-payment-declined',
    topicSlug: 'buying-payments',
    title: 'Why my payment was declined',
    summary:
      'The common reasons a payment does not go through, and what to try next.',
    body: 'Payments can be declined for insufficient Points/Balance or issues on the card/bank side. Try again or use a different method.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'reasons',
        heading: 'Common reasons',
        body: 'If you are paying with Blez Points or Blez Balance and the amount does not fully cover the pack, that method will not be available. If you are paying through Stripe or PayPal, a decline usually comes from the bank or card side — for example, insufficient funds, a hold, or a security block.',
      },
      {
        id: 'fix',
        heading: 'What to try',
        body: 'Retry the payment, or switch to another method. If a charge appears to have gone through but you did not receive your item, contact support with your username and the transaction details so we can check and, if needed, credit or refund you.',
      },
    ],
  },
  {
    slug: 'sales-tax',
    topicSlug: 'buying-payments',
    title: "Sales tax and how it's calculated",
    summary:
      'How and when tax may apply to a purchase. (Specifics pending — not covered in the internal guide; confirm with finance before launch.)',
    body: 'Any applicable tax is based on your location and shown before you pay. Detailed tax rules are pending confirmation.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'overview',
        heading: 'How tax appears',
        body: 'Any applicable sales tax is determined by your location and shown in your total before you confirm payment.\n\nNote for reviewers: the internal guide does not document specific tax rules, rates, or jurisdictions. This article needs confirmation from finance/legal before launch.',
      },
    ],
  },
  {
    slug: 'currency-international-payments',
    topicSlug: 'buying-payments',
    title: 'Currency and international payments',
    summary:
      'How purchases and payouts handle currency — you pay in USD, and cash-outs convert to your local currency on the way to your bank.',
    body: 'Purchases are billed in USD via Stripe or PayPal. Cash-outs convert to your local currency when they reach your bank.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'paying',
        heading: 'Paying from abroad',
        body: 'Purchases are processed in USD through Stripe or PayPal. Your bank or card provider handles any conversion from your local currency at checkout.',
      },
      {
        id: 'payouts',
        heading: 'Getting paid out',
        body: 'When you cash out, funds arrive to your connected account in USD and are converted to your home currency on the way to your bank — for example, a payout to a Taiwanese bank account is converted to TWD.',
      },
    ],
  },
  {
    slug: 'order-confirmation-receipts',
    topicSlug: 'buying-payments',
    title: 'Order confirmation and receipts',
    summary:
      'Where to find confirmation of a purchase and a full record of your transactions, which you can export.',
    body: 'Your purchases and transactions appear in Wallet and History, and you can export your transaction history as CSV or PDF.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'where',
        heading: 'Finding your records',
        body: 'Your Wallet shows your Balance, Blez Points, and full transaction history. Under History you can see pack openings, Points and Balance transactions, sales, and shipments.\n\nYou can export your transaction history as a CSV or PDF for any time range you choose.',
      },
      {
        id: 'emails',
        heading: 'Email summaries',
        body: 'Purchase summary and order update emails are enabled by default. You can manage these under Notifications in your profile settings.',
      },
    ],
  },
  {
    slug: 'cancel-after-purchase',
    topicSlug: 'buying-payments',
    title: 'Can I cancel an order after purchase?',
    summary:
      'Once a pack is opened the rip is final — but if a purchase failed while your payment still went through, we make that right.',
    body: 'Opening a pack is final. If a purchase failed but you were still charged, the amount is credited or refunded back.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'final',
        heading: 'Opened packs are final',
        body: 'Once you open a pack, the rip is final and the purchase cannot be cancelled. This is part of the all-sales-final policy for Blez Packs.',
      },
      {
        id: 'failed',
        heading: 'If a purchase failed',
        body: 'If a purchase did not complete but your payment still went through — for example the page was refreshed or closed mid-purchase — the funds are returned to your Blez Balance or Points, or back to your bank if you paid via Stripe or PayPal. Balance updates are sometimes delayed by a minute or so; if you still do not see it, contact support.',
      },
    ],
  },
  {
    slug: 'refund-policy',
    topicSlug: 'buying-payments',
    title: 'Refund policy (and the "all sales final" rule explained)',
    summary:
      'All Blez Pack sales are final. Rare exceptions — like an item that arrives damaged or not as described — are reviewed case by case.',
    body: 'Blez Pack sales are final. Exceptions: a failed purchase you were charged for, account closure, or a damaged/incorrect item (claim within 7 days).',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'rule',
        heading: 'All sales final',
        body: 'As a general rule, all sales of Blez Packs are final and non-refundable. Because you are buying the chance to pull a real item — and you receive one — an opened pack cannot be refunded.',
      },
      {
        id: 'exceptions',
        heading: 'When we do refund',
        body: 'In rare cases we’ll make things right — for example, if a payment went through on a purchase that did not complete, or an item arrives damaged or not as described. These are reviewed on a case-by-case basis, so reach out to support with the details as soon as you can after delivery (clear photos help us sort it out quickly).',
      },
    ],
  },
  {
    slug: 'chargebacks-disputes',
    topicSlug: 'buying-payments',
    title: 'Chargebacks and disputes — what happens to your account',
    summary:
      'Why it is best to contact us before filing a dispute — chargebacks can trigger a security review and temporarily hold payouts.',
    body: 'Filing a chargeback can trigger a security review and temporarily hold payouts. Contact support first so we can resolve it directly.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'impact',
        heading: 'How disputes affect your account',
        body: 'Payment disputes and chargebacks can place your account under a security review, which may temporarily pause payouts while we look into the activity. This protects both you and the marketplace against unauthorized transactions.',
      },
      {
        id: 'first',
        heading: 'Talk to us first',
        body: 'If something looks wrong with a charge, contact support before filing a dispute with your bank. In most cases we can review the transaction and resolve it directly — often faster than the dispute process.',
      },
    ],
  },

  // ── Ripping Packs & Reveals ──────────────────────────────────
  {
    slug: 'how-card-odds-work',
    topicSlug: 'ripping-reveals',
    title: 'How pack odds work in our repacks',
    summary:
      'Every pack publishes its full odds — a snapshot of a finite run of real cards. Lower-value items are pulled far more often than high-value ones, and the draw order is random.',
    body: 'Each pack publishes its odds as a snapshot of a finite run. Lower-value items are more likely to be pulled; the draw order is random, and the run depletes as packs are opened.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'odds',
        heading: 'Where the odds come from',
        body: 'Every pack lists a full odds breakdown — scroll down in the pack’s description to see it. Odds are based on item value: lower-value items have a higher chance of being pulled, and higher-value items are rarer. That breakdown is a snapshot of the run at the time the pack goes live.\n\nAs an example, in one basketball pack the cheapest items carried roughly a 71.85% chance while the most valuable sat around 3.45%.',
      },
      {
        id: 'random',
        heading: 'How the draw works',
        body: 'Each pack draws from a finite run of real cards in a randomized order that no one — including our team — knows in advance, so you cannot influence which card a single rip gives you.\n\nBecause the run is finite, every pull removes a card from it: as a run is opened, the remaining mix changes and the live odds drift from the published snapshot.',
      },
    ],
  },
  {
    slug: 'fairness-policy',
    topicSlug: 'ripping-reveals',
    title: 'Are repacks truly random? Our fairness policy',
    summary:
      'Yes. Each pack draws from a finite run of real cards in a randomized order no one — not even our team — knows in advance. The published odds are a snapshot of the run when it goes live.',
    body: 'Packs draw from a finite run of real cards in a randomized, unknown order. Published odds are a snapshot at publication; as cards are pulled, the run depletes and the remaining odds shift.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'fair',
        heading: 'How the draw works',
        body: 'Every pack is filled from a finite run of real cards, and each pack lists a full odds breakdown plus a clear floor and ceiling price. Those published odds are a snapshot of the run’s makeup at the moment it goes live.\n\nThe order the cards come out is randomized, and no one — including our own team — knows which card any given rip will produce. Nothing is pre-arranged, and no account is given different odds than the run itself.',
      },
      {
        id: 'depletes',
        heading: 'Odds shift as a run is opened',
        body: 'Because each run is finite, every pull removes a card from it. As a run gets opened, what is left changes — so the live odds naturally drift from the published snapshot over the life of the run.\n\nThe odds are published up front, so you always know the makeup of the run you are buying into.',
      },
    ],
  },
  {
    slug: 'reveal-glitch',
    topicSlug: 'ripping-reveals',
    title: 'What happens if a reveal glitches mid-rip',
    summary:
      'If the opening animation does not play, your item is still safe — the pull is recorded and lands in your collection.',
    body: 'If the reveal animation does not play, you still receive your item — the pull is recorded. Check the Collect tab or refresh.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'safe',
        heading: 'Your item is safe',
        body: 'Occasionally a pack opens successfully but the reveal animation does not display. When this happens you still receive the item — only the animation failed to show. The pull is recorded to your account either way.',
      },
      {
        id: 'find',
        heading: 'Where to find it',
        body: 'Check the Collect tab for the item, and refresh the page if it does not appear right away. If you still do not see it after a short wait, contact support with your username so we can confirm the pull.',
      },
    ],
  },
  {
    slug: 'pack-tiers',
    topicSlug: 'ripping-reveals',
    title: "Pack types and what's inside",
    summary:
      'Packs come in different categories and price points, each with its own value range and odds shown up front. Card packs look like a sachet; sealed-collectible packs look like a box.',
    body: 'Packs vary by category and price, each with published odds and a floor/ceiling price. Card packs appear as a sachet; collectible packs as a box.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'types',
        heading: 'Different packs, different ranges',
        body: 'Packs are offered across many categories and price points. Rather than fixed named tiers, each pack publishes its own floor and ceiling price and a full odds breakdown, so you can see the value range and pull chances before buying.\n\nNote for reviewers: the internal guide does not define specific named pack tiers. Confirm any tier names before publishing.',
      },
      {
        id: 'look',
        heading: 'How to tell them apart',
        body: 'Packs that contain trading cards look like a sachet, while packs that contain sealed collectibles look like a box. Remember that sealed collectibles and memorabilia carry a 72-hour window to be shipped (or they auto-sell), while a card has no shipping deadline.',
      },
    ],
  },
  {
    slug: 'why-no-preview-before-rip',
    topicSlug: 'ripping-reveals',
    title: "Why you can't see the item before you rip",
    summary:
      'You see the odds and value range up front, but not the specific item — the card you get comes out of the run in a randomized order no one knows in advance.',
    body: 'You see each pack’s odds and value range up front, but not the specific item — the order cards come out of the run is randomized and unknown until you open.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'why',
        heading: 'Why it stays sealed',
        body: 'A pack’s specific card is not shown before you open it because the order cards come out of the run is randomized and unknown to everyone — including our team — until the moment you rip. What you can always see up front is the pack’s odds breakdown (a snapshot of the run) and its floor and ceiling price — the full value range you are buying into.',
      },
    ],
  },

  // ── Ship It vs. Cash Out ─────────────────────────────────────
  {
    slug: 'ship-vs-instant-offer',
    topicSlug: 'selling-withdrawals',
    title: 'Choosing between shipping your item and selling it back',
    summary:
      'After a reveal you can keep the item to ship, or sell it back instantly — 90% for cards and sealed collectibles, 80% for memorabilia. Cards can ship anytime; collectibles and memorabilia must be shipped within 72 hours.',
    body: 'Keep an item to ship it, or sell it back instantly — 90% for cards and sealed collectibles, 80% for memorabilia. Cards can ship anytime; sealed collectibles and memorabilia auto-sell if not shipped within 72 hours.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'options',
        heading: 'Your two options',
        body: 'When an item is revealed you can Collect it — stash it in your collection to ship later — or Sell it back to Blez instantly for Blez Balance. Cards and sealed collectibles sell back at 90% of value; memorabilia sells back at 80%.',
      },
      {
        id: 'timing',
        heading: 'How long you can wait',
        body: 'A card has no shipping deadline — keep it stashed and ship whenever you like. (Its instant sell-back option does close 72 hours after the pull.) Sealed collectibles and memorabilia must be marked for shipping within 72 hours of purchase, or they are automatically sold back — sealed at 90%, memorabilia at 80%.',
      },
    ],
  },
  {
    slug: 'instant-offer-values',
    topicSlug: 'selling-withdrawals',
    title: 'How instant offer values are calculated',
    summary:
      'The instant sell-back is a percentage of an item’s assigned value — 90% for cards and sealed collectibles, 80% for memorabilia — with value based on rarity, condition, demand, supply, and recent sales.',
    body: 'Selling back pays 90% of the item’s assigned value for cards and sealed collectibles, and 80% for memorabilia. That value reflects rarity, condition, demand, supply, age, and recent sales.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'offer',
        heading: 'The sell-back offer',
        body: 'When you sell an item back to Blez, you receive a share of its assigned value as Blez Balance instantly — 90% for cards and sealed collectibles, and 80% for memorabilia.',
      },
      {
        id: 'value',
        heading: 'What sets an item’s value',
        body: 'An item’s value is based on several factors: its rarity, its condition (including any PSA, Beckett, or SGC grade), current demand, how many copies exist, its age or historical significance, and what similar items have recently sold for.',
      },
    ],
  },
  {
    slug: 'time-limit-ship-vs-cash',
    topicSlug: 'selling-withdrawals',
    title: 'Time limit for deciding to ship vs. sell back',
    summary:
      'A card has a 72-hour window to sell back — after that you can still ship it anytime. Sealed collectibles and memorabilia must be shipped within 72 hours or they auto-sell (sealed 90%, memorabilia 80%).',
    body: 'Cards: 72 hours to sell back, then ship anytime. Sealed collectibles and memorabilia: ship within 72 hours or they auto-sell (sealed 90%, memorabilia 80%).',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'cards',
        heading: 'Cards: 72 hours to sell, ship anytime',
        body: 'You have 72 hours after the pull to sell a card back at 90% of its value. After that window the instant sell-back is no longer available — but you can still ship the card whenever you like. There is no deadline to ship a card.',
      },
      {
        id: 'collectibles',
        heading: 'Sealed collectibles & memorabilia: 72 hours to ship',
        body: 'Sealed collectibles and memorabilia have a 72-hour holding period to be marked for shipping. If you do not, they are automatically sold back — sealed collectibles at 90% of their value, and memorabilia at 80%.',
      },
    ],
  },
  {
    slug: 'change-mind-after-choosing',
    topicSlug: 'selling-withdrawals',
    title: 'Can I change my mind after choosing?',
    summary:
      'Sold an item by accident? Contact support quickly and we’ll do our best to help.',
    body: 'Sold something by mistake? Contact support quickly and we’ll do our best to help.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'reverse',
        heading: 'If you sold by accident',
        body: 'If you sold an item back by mistake, reach out to support as soon as possible. We can’t promise every sale can be undone, but the sooner you contact us, the more we can do.',
      },
    ],
  },
  {
    slug: 'cashing-out-points-vs-real-money',
    topicSlug: 'selling-withdrawals',
    title: 'How funds are credited: Blez Balance vs. Blez Points',
    summary:
      'Selling an item credits Blez Balance (real cash you can withdraw), which is separate from Blez Points (used only to buy packs).',
    body: 'Selling credits Blez Balance — cash you can spend on packs or withdraw. Blez Points are separate and used only to buy packs.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'balance',
        heading: 'Blez Balance is your cash',
        body: 'When you sell an item, the funds are added to your Blez Balance — the cash figure shown next to your Blez Points. You can spend Balance on more packs or withdraw it to your bank.',
      },
      {
        id: 'points',
        heading: 'Points are separate',
        body: 'Blez Points are used to buy packs and are earned from top-ups, cash-back, referrals, and rewards. Points are not cash and cannot be withdrawn — only your Blez Balance can be cashed out.',
      },
    ],
  },
  {
    slug: 'withdrawing-balance',
    topicSlug: 'selling-withdrawals',
    title: 'Withdrawing your balance — methods and processing time',
    summary:
      'Withdraw from Wallet; once approved, funds move to your connected Stripe account, and you transfer them to your bank in about 5–7 business days.',
    body: 'Request a withdrawal in Wallet. After approval, funds move to your Stripe account; you then transfer to your bank (about 5–7 business days). KYC required.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'how',
        heading: 'How to cash out',
        body: 'Open Profile & Settings and select Wallet, then use the Cash Out button under your cash balance. You must have completed identity verification (KYC) before you can withdraw.',
      },
      {
        id: 'timing',
        heading: 'When the money arrives',
        body: 'Once your withdrawal is approved, the funds move to your connected Stripe account. From there you initiate the transfer to your linked bank account. Bank transfers typically take 5–7 business days depending on your bank. If you do not initiate that final transfer, the funds simply wait in your Stripe account until you do.',
      },
    ],
  },

  // ── Shipping ─────────────────────────────────────────────────
  {
    slug: 'domestic-shipping',
    topicSlug: 'shipping',
    title: 'Domestic shipping rates and timelines',
    summary:
      'US orders ship on weekdays via USPS and are free when the shipment is worth $299 or more.',
    body: 'US orders ship on weekdays via USPS Ground Advantage or Priority Mail, and are free when the shipment is worth $299 or more.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'rates',
        heading: 'Rates and carriers',
        body: 'Domestic shipments go out via USPS Ground Advantage or USPS Priority Mail, and available methods are sorted by price at checkout. Shipping is free when the total value of the shipment is $299 or more.',
      },
      {
        id: 'timing',
        heading: 'Timing',
        body: 'Domestic orders are processed on weekdays. For US addresses it typically takes about 2–3 days for an item to ship, after which you receive an email with your tracking number.',
      },
    ],
  },
  {
    slug: 'international-shipping',
    topicSlug: 'shipping',
    title: 'International shipping',
    summary:
      'International orders ship every Tuesday via UPS and are free when the shipment is worth $999 or more.',
    body: 'International orders ship every Tuesday via UPS and are free when the shipment is worth $999 or more.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'rates',
        heading: 'Rates and carriers',
        body: 'International shipments go out via UPS Worldwide Expedited or UPS Shipping Priority, sorted by price at checkout. Shipping is free when the total value of the shipment is $999 or more.',
      },
      {
        id: 'timing',
        heading: 'Schedule and coverage',
        body: 'International orders are processed every Tuesday. If your order is open, a tracking number is provided by then; if not, expect it the following week. Some destinations may not have an available shipping method online — if that happens, contact support and we can help arrange it.\n\nNote for reviewers: the internal guide does not include a specific list of supported countries. Confirm the destination list before publishing.',
      },
    ],
  },
  {
    slug: 'combined-vault-shipping',
    topicSlug: 'shipping',
    title: 'Combined shipping (holding items to ship together)',
    summary:
      'Stash multiple items and ship them together in a single shipment to save on postage.',
    body: 'Stash items in your collection and add them to one open shipment to send them together.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'how',
        heading: 'Shipping items together',
        body: 'When you choose to ship an item, it is added to your open shipment. You can stash multiple trading cards and add several to the same shipment, then ship them together in a single package.\n\nKeep in mind that sealed collectibles and memorabilia still need to be marked for shipping within 72 hours, even if you plan to send them alongside cards later.',
      },
    ],
  },
  {
    slug: 'vault-hold-duration',
    topicSlug: 'shipping',
    title: 'How long we hold your items before shipping',
    summary:
      'Cards have no shipping deadline (though their instant sell-back closes after 72 hours). Sealed collectibles and memorabilia must be shipped within 72 hours or they auto-sell — 90% sealed, 80% memorabilia.',
    body: 'Cards can ship anytime; their instant sell-back closes after 72 hours. Sealed collectibles and memorabilia must be marked for shipping within 72 hours or they auto-sell (sealed 90%, memorabilia 80%).',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'holds',
        heading: 'Holding periods',
        body: 'Cards have no holding limit for shipping — keep them stashed and ship whenever you are ready. (Their instant 90% sell-back option does close 72 hours after the pull.) Sealed collectibles and memorabilia must be marked for shipping within 72 hours of purchase, or they are automatically sold back — sealed collectibles at 90% of value, and memorabilia at 80%.',
      },
    ],
  },
  {
    slug: 'shipping-insurance',
    topicSlug: 'shipping',
    title: 'Shipping insurance and signature requirements',
    summary:
      'Higher-value orders ship with insurance and signature confirmation, with UPS insurance up to $10,000 per package.',
    body: 'High-value orders include insurance and signature confirmation. UPS insurance covers up to $10,000 per package.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'coverage',
        heading: 'Insurance and signature',
        body: 'Blez adds insurance and signature confirmation to high-value orders when they ship. For UPS shipments, the maximum insurance per package is $10,000.',
      },
    ],
  },
  {
    slug: 'tracking-shipment',
    topicSlug: 'shipping',
    title: 'Tracking your shipment',
    summary:
      'You get a tracking number by email once your order ships, and it also appears under the item in your Collect tab.',
    body: 'A tracking number is emailed when your order ships and also appears under the item in the Collect tab. Mark no-reply@blezonline.com as safe.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'where',
        heading: 'Finding your tracking',
        body: 'When your order ships, you receive an email from no-reply@blezonline.com with your tracking number. The same tracking number also appears beneath the item in the Collect tab at the top of the page.',
      },
      {
        id: 'memorabilia',
        heading: 'Memorabilia orders',
        body: 'Memorabilia is fulfilled through our shipping partners (including Fanatics), which use their own flow. For those orders you’ll see an order number and a “Pending Fanatics Shipping” status rather than a standard carrier tracking link, and we’ll email you the details as it moves.',
      },
      {
        id: 'emails',
        heading: 'Make sure you get the email',
        body: 'To be sure shipping emails reach you, mark no-reply@blezonline.com as a safe sender or add it to your contacts, and check your spam or junk folder if you do not see an update. If an older Blez email is already in your inbox, marking it as trusted helps future updates land correctly.',
      },
    ],
  },
  {
    slug: 'lost-stolen-damaged',
    topicSlug: 'shipping',
    title: 'Lost, stolen, or damaged packages — claim process',
    summary:
      'If an item arrives damaged or not as described, submit a claim with photos of the packaging and the item within 7 days of delivery.',
    body: 'For a damaged or incorrect item, submit a claim with photos of the packaging and item within 7 days of the carrier-reported delivery.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'file',
        heading: 'Filing a claim',
        body: 'If an item arrives damaged or does not match its description, submit a claim that includes photos of both the packaging and the item. Claims must be filed within 7 days of the carrier’s reported delivery time.',
      },
      {
        id: 'resolve',
        heading: 'How it’s resolved',
        body: 'Once you file, support reviews the claim and works with you to make it right — options can include a buyback or a credit, depending on the situation.',
      },
    ],
  },
  {
    slug: 'customs-duties',
    topicSlug: 'shipping',
    title: 'Customs, duties, and international taxes',
    summary:
      'International shipments can be delayed at customs, and any duties or import taxes are set by your country.',
    body: 'International shipments may be held at customs, and duties or import taxes are set and collected by your country.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'customs',
        heading: 'Customs delays',
        body: 'International shipments occasionally sit in customs while paperwork clears. If your package shows as pending clearance for an extended period, contact support and we can help follow up with the carrier.',
      },
      {
        id: 'duties',
        heading: 'Duties and import taxes',
        body: 'Any customs duties or import taxes are determined by your destination country and are generally the recipient’s responsibility.\n\nNote for reviewers: the internal guide does not spell out who pays duties. Confirm this policy before publishing.',
      },
    ],
  },
  {
    slug: 'address-changes',
    topicSlug: 'shipping',
    title: 'Shipping addresses and making changes',
    summary:
      'How to set a shipping address, the characters it accepts, and why an incorrect address can send a package back to us.',
    body: 'Set a default address with English characters and basic punctuation only. An unrecognized address can cause a package to return to Blez.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'set',
        heading: 'Setting your address',
        body: 'A shipping address is required to ship an item. Under Shipping in your profile you can save your full name, phone number, street address, city, state, zip code, and country, and set a default. You can store multiple addresses.',
      },
      {
        id: 'format',
        heading: 'Accepted characters',
        body: 'Shipping names and addresses accept English letters, numbers, and basic punctuation such as periods, commas, hyphens, and parentheses. Other special characters can prevent a shipment from processing, so please adjust your address if you run into an error.\n\nIf an address cannot be recognized during shipping, the package may be returned to Blez — correcting the address lets us reship it.',
      },
    ],
  },
  {
    slug: 'returned-to-sender',
    topicSlug: 'shipping',
    title: 'What happens if a package is returned to sender',
    summary:
      'If a package comes back to us — usually due to an address problem — we can reship it once the details are corrected.',
    body: 'If a package returns to Blez, we can reship it after the address is corrected.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'returned',
        heading: 'When a package comes back',
        body: 'Packages are most often returned when the delivery address could not be recognized or completed. If that happens, contact support so we can confirm the corrected address and arrange to reship your items.',
      },
    ],
  },

  // ── Card Quality & Condition ─────────────────────────────────
  {
    slug: 'protecting-non-graded-cards',
    topicSlug: 'card-quality',
    title: 'How non-graded cards are protected and stored',
    summary:
      'Non-graded cards are kept in protective cases so they stay in the condition you pulled them in until they ship.',
    body: 'Non-graded cards are stored in protective cases until they ship, keeping them in the condition you pulled them in.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'storage',
        heading: 'Safe storage',
        body: 'Cards can be either graded or non-graded. Non-graded cards are stored in protective cases so they remain safe and in the condition you pulled them in while stashed and during shipping.',
      },
    ],
  },
  {
    slug: 'condition-grades-mint-nm',
    topicSlug: 'card-quality',
    title: 'What card grades mean',
    summary:
      'How card condition is described, and how professional grading scales (like PSA’s 1–10) map to value.',
    body: 'Card condition can be professionally graded — for example PSA’s 1 (Poor) to 10 (Gem Mint) scale — which affects value and confidence.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'grades',
        heading: 'Grading scales',
        body: 'Professionally graded cards carry a numeric grade from a grading company. PSA, for example, grades on a scale from 1 (Poor) to 10 (Gem Mint) based on centering, corners, edges, and surface. A higher grade generally increases a card’s value and makes it easier to sell, because the grade gives buyers confidence in its condition and authenticity.\n\nNote for reviewers: the internal guide does not define specific listing labels like “Mint” or “NM.” Confirm the exact condition labels used in listings before publishing.',
      },
    ],
  },
  {
    slug: 'condition-disputes',
    topicSlug: 'card-quality',
    title: 'Condition disputes — how to file',
    summary:
      'If an item’s condition does not match its listing, file a claim with photos within 7 days of delivery.',
    body: 'If condition does not match the listing, file a claim with photos within 7 days of delivery.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'file',
        heading: 'Raising a condition issue',
        body: 'If an item’s condition does not match how it was described, submit a claim with clear photos of the item and its packaging within 7 days of the carrier’s reported delivery time. Support will review it and work with you on a resolution.',
      },
    ],
  },
  {
    slug: 'damaged-on-arrival',
    topicSlug: 'card-quality',
    title: 'Damaged-on-arrival claims (timeline, photos required)',
    summary:
      'If an item arrives damaged, submit photos of the packaging and the item within 7 days and we will make it right.',
    body: 'For a damaged-on-arrival item, submit photos of the packaging and item within 7 days of delivery.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'claim',
        heading: 'Filing a damage claim',
        body: 'If an item arrives damaged, submit a claim with photographs of both the packaging and the item within 7 days of the carrier’s reported delivery time.',
      },
      {
        id: 'resolution',
        heading: 'What happens next',
        body: 'Support reviews your photos and works with you to make it right. Depending on the item, that can mean buying it back or issuing a credit for the inconvenience.',
      },
    ],
  },
  {
    slug: 'graded-cards',
    topicSlug: 'card-quality',
    title: 'Graded cards: PSA, BGS, SGC',
    summary:
      'We accept and sell cards graded by the major services — PSA, Beckett (BGS), and SGC — and a strong grade adds value and liquidity.',
    body: 'Blez accepts and sells cards graded by PSA, Beckett (BGS), and SGC. A higher grade adds value and makes a card easier to sell.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'services',
        heading: 'Grading services we honor',
        body: 'Cards can come professionally graded by the major grading companies — PSA (Professional Sports Authenticator), BGS (Beckett Grading Services), and SGC.',
      },
      {
        id: 'value',
        heading: 'Why grading matters',
        body: 'Grading companies assess condition and authenticity, and assign a numeric grade — PSA, for instance, uses a 1–10 scale weighing centering, corners, edges, and surface. A high grade often increases a card’s value and makes it easier to sell because buyers can trust its condition.',
      },
    ],
  },

  // ── Account & Security ───────────────────────────────────────
  {
    slug: 'updating-profile',
    topicSlug: 'account-security',
    title: 'Updating your profile, email, and password',
    summary:
      'Where to edit your name, username, alias, email, birthday, and password.',
    body: 'Edit your name, username, alias, email, birthday, and password under Profile & Settings → Account.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'edit',
        heading: 'Editing your details',
        body: 'Open Profile & Settings and go to the Account section. There you can update your first and last name, username, alias, email, birthday, and password.',
      },
    ],
  },
  {
    slug: 'two-factor-auth',
    topicSlug: 'account-security',
    title: 'Two-factor authentication',
    summary:
      'Add an extra layer of security with authenticator-app 2FA from your privacy and security settings.',
    body: 'Enable authenticator-app two-factor authentication under Privacy & Security → Account security.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'setup',
        heading: 'Turning on 2FA',
        body: 'Under Profile & Settings, open Privacy & Security and go to Account security. There you can enable two-factor authentication using an authenticator app such as Google Authenticator. We strongly recommend turning it on to help protect your account.',
      },
    ],
  },
  {
    slug: 'cant-log-in',
    topicSlug: 'account-security',
    title: "I can't log into my account",
    summary:
      'Reset your password first — then contact support if you still cannot get in.',
    body: 'Use the Forgot Password link to reset your password. If you still cannot log in, contact support.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'reset',
        heading: 'Resetting your password',
        body: 'On the login screen, click Forgot Password. A password reset email will be sent from no-reply@blezonline.com so you can set a new password. If you do not see it, check your spam or junk folder and mark no-reply@blezonline.com as a safe sender.',
      },
      {
        id: 'still',
        heading: 'Still locked out?',
        body: 'If a reset does not get you back in, contact support with your username or the email on your account and we will help you recover access.',
      },
    ],
  },
  {
    slug: 'suspicious-activity',
    topicSlug: 'account-security',
    title: 'Suspicious activity / account compromise',
    summary:
      'What to do if you think your account was accessed by someone else, and how your payment details stay protected.',
    body: 'If you suspect your account was compromised, contact support right away. Blez never stores card numbers — payments run through Stripe and PayPal.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'act',
        heading: 'If you suspect a problem',
        body: 'If you think someone else has accessed your account, contact support right away and change your password. For your protection we may temporarily freeze an account while we look into unusual activity, so your items, balance, and history stay safe.',
      },
      {
        id: 'cards',
        heading: 'How your payment details are protected',
        body: 'Blez Online does not store credit card numbers. All payments are handled by Stripe and PayPal, which are both PCI-DSS Level 1 certified, so card numbers never touch our servers.',
      },
    ],
  },
  {
    slug: 'closing-account',
    topicSlug: 'account-security',
    title: 'Closing your account and what happens to your balance',
    summary:
      'You can deactivate your account yourself, choose how long it stays off, and reactivate later by contacting support.',
    body: 'Deactivate your account from Privacy & Security → Danger Zone. It blocks login; you can reactivate by contacting support.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'deactivate',
        heading: 'Deactivating your account',
        body: 'You can deactivate your account under Profile & Settings → Privacy & Security → Danger Zone. Deactivation prevents you from logging in, and you can choose how long you would like it to stay deactivated.\n\nBefore closing, consider cashing out any Blez Balance and shipping or selling stashed items.',
      },
      {
        id: 'reactivate',
        heading: 'Coming back',
        body: 'A deactivated account can be reactivated by contacting support, after which you can log in again with your existing credentials.',
      },
    ],
  },
  {
    slug: 'account-suspended-banned',
    topicSlug: 'account-security',
    title: 'Why an account might be suspended',
    summary:
      'Accounts can be temporarily held during a security review — for example around payment disputes — with items and balance kept safe while we look into it.',
    body: 'Accounts may be temporarily held during a security review, e.g. around payment disputes. Items and balance stay safe; contact support to resolve.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'why',
        heading: 'Why a hold can happen',
        body: 'From time to time we place a temporary hold on an account while we complete additional security checks — often on accounts with a lot of recent activity, or when a payment dispute needs review. During a hold, your items, balance, and account history remain safe and nothing is removed.',
      },
      {
        id: 'resolve',
        heading: 'Getting it lifted',
        body: 'If your account is under review, reply to the message from support or reach out with any details they request. We lift the hold as soon as the review is complete.',
      },
    ],
  },

  // ── Money & Limits (NOT covered by the internal guide — flagged for human sourcing) ──
  {
    slug: 'tax-forms-1099',
    topicSlug: 'money-limits',
    title: 'Tax documents on cash-outs',
    summary:
      'How tax reporting on cash-outs works. (Not covered in the internal guide — needs finance/legal sourcing before launch.)',
    body: 'Any required tax documents depend on your jurisdiction and annual totals. Specifics are pending finance/legal confirmation.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'overview',
        heading: 'Tax reporting',
        body: 'Depending on where you live and how much you cash out in a year, you may receive tax documents, and we recommend consulting a tax professional about your own situation.\n\nNote for reviewers: the internal guide does not cover tax forms, thresholds, or 1099 issuance. This article is a placeholder pending finance/legal input and should not be published as-is.',
      },
    ],
  },
  {
    slug: 'where-blez-is-available',
    topicSlug: 'money-limits',
    title: 'Where Blez is available',
    summary:
      'Where you can use Blez and any regional restrictions. (Not covered in the internal guide — needs confirmation before launch.)',
    body: 'Availability and any regional restrictions are pending confirmation; the internal guide does not list supported regions.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'overview',
        heading: 'Regional availability',
        body: 'Blez ships domestically and internationally, though some destinations may not have an online shipping method and require help from support.\n\nNote for reviewers: the internal guide does not list the specific countries or states where Blez is available, or any feature restrictions by region. Confirm the supported-region list before publishing.',
      },
    ],
  },
  {
    slug: 'deposit-withdrawal-limits',
    topicSlug: 'money-limits',
    title: 'Deposit and withdrawal limits',
    summary:
      'Any caps on adding funds or withdrawing. (Not detailed in the internal guide — needs confirmation before launch.)',
    body: 'Withdrawals require completed KYC. Any specific deposit or withdrawal caps are pending confirmation.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'overview',
        heading: 'Limits and verification',
        body: 'Withdrawing your balance requires completed identity verification (KYC), and higher-value shipments also require it.\n\nNote for reviewers: the internal guide does not document specific daily, weekly, or monthly deposit or withdrawal limits. Confirm any caps before publishing.',
      },
    ],
  },
  {
    slug: 'rip-limits',
    topicSlug: 'money-limits',
    title: 'Rip limits',
    summary:
      'Any limits on how many packs you can open in a window. (Not covered in the internal guide — needs confirmation before launch.)',
    body: 'Any limits on pack openings are pending confirmation; the internal guide does not mention rip limits.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'overview',
        heading: 'Pack-opening limits',
        body: 'Note for reviewers: the internal guide does not mention any daily or weekly limits on opening packs. If such limits exist, confirm the details before publishing this article.',
      },
    ],
  },
  {
    slug: 'aml-kyc-compliance',
    topicSlug: 'money-limits',
    title: 'Identity verification and security monitoring',
    summary:
      'How one-time identity verification and ongoing security monitoring keep the marketplace safe.',
    body: 'A one-time KYC verification unlocks cashouts and high-value shipments; ongoing monitoring occasionally pauses transactions for review.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'kyc',
        heading: 'One-time verification',
        body: 'Identity verification through Plaid is a one-time step that unlocks the ability to cash out and to ship higher-value items. It confirms real customers and reduces fraud and chargebacks across the marketplace.',
      },
      {
        id: 'monitoring',
        heading: 'Ongoing monitoring',
        body: 'To keep everyone safe, we monitor for unusual account activity and may occasionally place a temporary hold on a transaction or account while we review it. Your items and balance stay safe during any review.',
      },
    ],
  },
  {
    slug: 'dispute-timelines',
    topicSlug: 'money-limits',
    title: 'Claim and payout timelines — quick reference',
    summary:
      'The key time windows to know: a 7-day damage-claim window and 5–7 business days for bank transfers.',
    body: 'Key windows: file damage/condition claims within 7 days of delivery; bank transfers take about 5–7 business days.',
    lastUpdated: '2026-08-19',
    sections: [
      {
        id: 'windows',
        heading: 'The windows that matter',
        body: 'Damage or condition claims must be filed within 7 days of the carrier’s reported delivery time, with photos of the packaging and item.\n\nSealed collectibles and memorabilia auto-sell back after 72 hours if not marked for shipping.\n\nOnce a withdrawal is approved and you initiate the bank transfer from Stripe, funds typically arrive in about 5–7 business days.',
      },
    ],
  },
]

export function getArticle(
  topicSlug: string,
  slug: string,
): Article | undefined {
  return articles.find((a) => a.topicSlug === topicSlug && a.slug === slug)
}

export function getArticlesForTopic(slug: string): Article[] {
  return articles.filter((a) => a.topicSlug === slug)
}
