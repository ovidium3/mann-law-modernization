# Mann Law Modernization — SEO & Content Build Plan

Reference site audited: **mannlawgrp.com**. Goal: reproduce their information
architecture, then exceed it with cleaner UX, AI assistance, and stronger SEO.

## Diagnosis

The "content is trapped in JS" concern does **not** apply — every route is a
server component prerendered to static HTML (`●  (SSG)` in `next build`). Each
locale URL ships full content + its own `<title>`/meta.

The real issues:

1. **Two pages doing the job of sixteen.** `/practice-areas` is one page with 6
   anchor sections; the reference site has **11 separate practice pages**.
   `/attorney` stacks 7 bios; the reference site has individual profile pages.
   Anchor sections can't rank independently — separate URLs can.
2. **Duplicate content across locales.** `/es`, `/uk`, `/ro` serve byte-identical
   English. We advertise `hreflang` for languages we don't actually serve.
3. **Missing pages:** about / beliefs / careers / clients hub / blog.

## Reference vs. current inventory

| Area | Reference site | Current | Gap |
|---|---|---|---|
| Practice areas | 11 separate pages | 1 page, 6 anchor sections | split + add 5 |
| Attorneys | directory + 5 profile pages | 1 page, 7 stacked bios | split into profiles |
| About | /about, /our-beliefs, /careers | — | missing |
| Clients | /clients resource hub | — | missing |
| Blog | /blog | — | missing (SEO engine) |
| FAQ | — | /faq | we're ahead |

## Guiding principles

- Every route is its own SSG entity: `generateStaticParams` + `generateMetadata`
  + `notFound()` guard + sitemap entry.
- JSON-LD structured data on every meaningful page (E-E-A-T).
- Mirror the reference IA, then exceed it.

## Phases

### Phase 1 — Split practice areas into individual pages ⭐ (start here)
- `src/content/practice-areas.ts`: typed array, 11 areas, rich per-area fields.
- `src/app/[locale]/practice-areas/[area]/page.tsx`: nested SSG route,
  per-area metadata, `LegalService` JSON-LD, breadcrumbs.
- Convert `/practice-areas` into a hub/index linking to sub-pages.
- Repoint homepage "What We Do" cards from `#slug` anchors to sub-pages.
- Drive `sitemap.ts` from the content module.

### Phase 2 — Individual attorney profiles
- `src/content/attorneys.ts`; `/attorney` becomes a directory; nested
  `[person]` route with `Person`/`Attorney` JSON-LD.

### Phase 3 — Real i18n translation layer 🔑
- Typed per-locale dictionaries (`Dictionary` derived from `en` so missing keys
  fail typecheck); `getDictionary(locale)` with per-locale dynamic import.
- Localize content modules too. AI-drafted + native-reviewed translations.
- ⚠️ Legal copy mistranslation is a liability — human review before publish.

### Phase 4 — Missing pages
- /about, /about/beliefs, /careers, /clients (resource hub).
- /blog (MDX index + `[slug]`, `Article` JSON-LD) — long-term organic engine,
  showcase for AI-assisted drafting. Largest effort; can be its own phase.

## Sequencing

Recommended: **1 → 3 → 2 → 4.** Phase 1 is the visible win that answers the
stakeholder ask. Slot i18n (Phase 3) next so Phases 2/4 are built
bilingual-ready instead of accumulating translation debt.

## Per-route checklist (apply to every new page)

- [ ] `generateStaticParams()` for any dynamic segment
- [ ] `generateMetadata()` via `makeMetadata({ ..., path })`
- [ ] `notFound()` on invalid locale / unknown slug
- [ ] Entry added to `src/app/sitemap.ts`
- [ ] JSON-LD structured data
- [ ] Internal links updated (nav / footer / related pages)
