# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Modernization of the Mann Law Group immigration-law website. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4. Marketing/intake site targeting Cloudflare Pages deployment. There are no tests and no backend yet — AI intake and analytics are intentionally client-side scaffolding awaiting future API integration.

## Commands

- `npm run dev` — start the dev server (Next.js)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)

No test runner is configured.

## Architecture

### Locale-prefixed routing
Every user-facing page lives under `src/app/[locale]/`. Supported locales are the single source of truth in `src/lib/i18n.ts` (`locales = ["en", "es", "uk", "ro"]`, `defaultLocale = "en"`). Key conventions:

- `src/app/page.tsx` redirects `/` → `/${defaultLocale}`.
- `src/app/[locale]/layout.tsx` calls `generateStaticParams()` over `locales` (so all locales are statically generated) and `notFound()`s on any unknown locale via `isLocale()`.
- Every page component re-validates the locale param with `isLocale()` + `notFound()`. The `params` prop is a `Promise` (Next 16) and must be awaited.
- When adding a locale, update `locales` and the `localeLabels` / `ogLocaleMap` records — TypeScript will flag the `Record<Locale, ...>` maps that need new entries.

### Two-layer layout
`src/app/layout.tsx` (root) sets `<html>`/`<body>`, global metadata defaults, and mounts `AnalyticsPlaceholders`. `src/app/[locale]/layout.tsx` wraps page content with `SiteHeader` / `SiteFooter` / `FloatingIntakeAssistant`, all passed the active `Locale`.

### Shared config in `src/lib/`
- `site.ts` — single source for business details (name, domain, phone, address, hours) and `getNavigation(locale)`, which builds locale-prefixed nav links. Use these instead of hardcoding.
- `seo.ts` — `makeMetadata({ title, description, locale, path })` produces per-page `Metadata` with Open Graph, Twitter, and `hreflang` alternates. Pages export `generateMetadata` that calls this. `localeAlternates()` always sets canonical to the `/en` variant.
- `i18n.ts` — locale list, types, and the `isLocale` guard.

### SEO routes
`src/app/sitemap.ts` and `src/app/robots.ts` are Next.js metadata route handlers. The sitemap fans out a hardcoded `paths` array across all `locales` — keep `paths` in sync when adding top-level pages.

### Client interactivity (scaffolding)
- `FloatingIntakeAssistant` (`src/components/ai/`) is a `"use client"` component. `generateAssistantReply()` is a keyword matcher, not a real LLM; `submitLead()` only sets local state. The comment marks where real OpenAI/CRM integration goes. Lead/message shapes live in `src/types/assistant.ts`.
- `FaqSearch` (`src/components/faq/`) is client-side filtering.
- `AnalyticsPlaceholders` injects GA4 / Search Console / conversion snippets only when the corresponding `NEXT_PUBLIC_*` env vars are set (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GSC_VERIFICATION_TOKEN`, `NEXT_PUBLIC_CONVERSION_LABEL`).

## Conventions

- Path alias `@/*` → `src/*` (tsconfig). Use it for all internal imports.
- TypeScript `strict` is on; locale values are typed via the `Locale` union, not raw strings.
- Styling is Tailwind utility classes inline (Tailwind v4 via `@tailwindcss/postcss`); there is no component CSS-module convention.
