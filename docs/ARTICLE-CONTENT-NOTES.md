# Article content — reviewer notes

The article bodies in `src/lib/topics/articles.ts` were rewritten from the
**internal support guide** (treated as the source of truth) into public
help-center voice. **Every article still needs human verification before
launch.** This doc records the decisions and flags a reviewer should check.

## Terminology decision (please confirm)

The source guide appears to have had **"card(s)" globally replaced with
"Memorabilia(s)"** — it contains artifacts like "credit Memorabilia,"
"Memorabilia numbers never touch our servers," and "trading Memorabilia
games (TCG)," which are clearly "credit card," "card numbers," and "trading
card games." I treated the guide as authoritative on **facts and policies**,
but used natural public wording:

- **Cards** = trading cards (the primary product) — can be stashed indefinitely.
- **Sealed collectibles** = unopened packs/boxes (blasters, jumbo boxes).
- **Memorabilia** = signed photos, figures, and similar physical items.
- The **72-hour auto-sell-back** rule applies to **sealed collectibles and
  memorabilia**, not to trading cards.

If Blez has genuinely rebranded cards to "Memorabilia," the terminology
across the topics and articles should be swapped back — flagging this so a
human decides. Related: the curator team is called **"Card Architects"** here
(the build's term); the guide says **"Memorabilia Architects."** Pick one.

## What was intentionally excluded (internal-only)

None of the following made it into public articles:

- **Fraud-detection signals** (multiple accounts on one device/IP/payment
  method, earning-vs-spending patterns, failed-transaction counts, loopholes).
- **Manual KYC review procedure** (resetting attempts, social-media/LinkedIn
  searches, deepfake/tamper checks, 48-hour manual approval, IP correlation).
  The public articles say only that support can "reset attempts" and may
  "request proof of address."
- **Payout risk criteria** (Regular vs. Needs-Manual-Verification, checking
  related customers / PayPal holds / IP).
- **Admin panel mechanics** (shipping/users/payouts tabs, pack & item
  creation, ladder, textures, marketing tools).
- **Fulfillment/ops vendors** — the third-party fulfillment partner,
  ShipStation, and customer proxy-forwarder services are not named publicly.
- **Agent email macros** and internal-hold language ("Weird Transactions,"
  "Suspicious Activity," "asked beyond what we could give").
- Internal challenge/bug logs (wrong-person shipments, theft via
  unship/reship, deactivated grading certs, "no timeline" security reviews).

Customer-facing figures that **were** kept (they appear in customer-facing
templates): the **$2,500** KYC threshold, **$299 / $999** free-shipping
thresholds, **$10,000** UPS insurance cap, **5–7 business day** transfers,
**72-hour** hold, **90%** sell-back, and the **10** starting Blez Points.

## Articles NOT sourced from the guide (need human input)

The guide's article outline covers 7 topic groups. The build's 8th topic,
**Money & Limits**, is largely absent from the guide. These carry an explicit
"Note for reviewers" line in-body and should not ship as-is:

- `money-limits/tax-forms-1099` — no tax/1099 guidance in the guide (finance/legal).
- `money-limits/where-blez-is-available` — no supported-region list in the guide.
- `money-limits/deposit-withdrawal-limits` — no specific caps in the guide.
- `money-limits/rip-limits` — rip limits not mentioned in the guide at all.
- `buying-payments/sales-tax` — no tax rules in the guide.
- `ripping-reveals/pack-tiers` — the guide defines pack *categories* but no
  named tiers; the build's invented tier names were removed.
- `shipping/international-shipping` — no specific country list in the guide.
- `shipping/customs-duties` — the guide notes customs delays but not who pays duties.
- `card-quality/condition-grades-mint-nm` — the guide describes PSA's 1–10
  scale but not "Mint"/"NM" listing labels.

## Claim corrected

The previous placeholder for `ripping-reveals/fairness-policy` claimed
"provably fair via a published method" with auditing. The guide supports only
**published per-pack odds + a random draw + a shown floor/ceiling price** — no
provable-fairness/crypto/audit mechanism. The article now matches the guide;
re-add stronger claims only if they are actually true.
