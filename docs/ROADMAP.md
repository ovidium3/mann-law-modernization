# Roadmap

Phased delivery plan for the Mann Law Group modernization. For the technical design behind these items, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## How this is prioritized

This project serves two audiences at once:

1. **Engineering / learning value** — modern, resume-worthy skills with explainable trade-offs.
2. **Stakeholder demo value** — visible, business-legible improvements for a non-engineering reviewer.

Every phase is ordered so it **ends with something demonstrable**, and each item is tagged with what it earns:

- **Demo** — visible to the stakeholder in a live walkthrough.
- **Resume** — a concrete interview talking point.

Items marked **(stretch)** are learning-maximizing extras — skip them if scope tightens; they are not required for the pitch.

---

## Phase 0 — Professional foundations
*Low effort, high resume value. Do this first so everything after is automatically deployed and demoable.*

- [ ] Branch protection on `main`; PR-based workflow; conventional commits. **Resume**
- [ ] Cloudflare Pages Git integration → **per-PR preview deployments**. **Demo / Resume**
  - Every change gets its own live URL before merge. This *is* CI/CD: push → build → preview → review → merge → production.
- [ ] `.dev.vars` for local secrets; Pages environment variables for deploys. **Resume**

**Exit demo:** open a PR, show the auto-generated preview URL, merge, show it live in production.

---

## Phase 1 — Real AI assistant + lead capture *(headline feature)*
*The centerpiece of the stakeholder pitch.*

- [ ] Edge API tier: `/api/intake/chat`, `/api/intake/lead` (`runtime = "edge"`). **Resume**
- [ ] `OPENAI_API_KEY` as a Cloudflare secret; gpt-4o-mini wired up. **Resume**
- [ ] System prompt: general immigration guidance, enforced legal disclaimer, field-collection behavior. **Resume**
- [ ] **D1** leads table + **KV** transcript storage. **Resume**
- [ ] **Resend** email notification to the firm on each new lead. **Demo / Resume**
- [ ] Rewrite `FloatingIntakeAssistant`: real `fetch` calls, `sessionId`, loading/error states, `sessionStorage` persistence. **Demo**

**Exit demo:** ask the assistant a real immigration question and get a genuine answer; submit an intake form; a lead email arrives in the firm's inbox seconds later.

---

## Phase 2 — Demo polish
*Turns "it works" into "this feels like a real product."*

- [ ] Streaming responses via the Vercel **AI SDK** (`ai`) — ChatGPT-style typewriter effect. **Demo / Resume**
- [ ] **Lead admin view** reading from D1 (simple password-protected page). **Demo / Resume**
- [ ] Mobile UX pass — the stakeholder will likely demo on a phone. **Demo**

**Exit demo:** show streamed AI responses on mobile, then open the admin page listing every captured lead.

---

## Phase 3 — Reach & credibility
*Builds on scaffolding already in the repo (`/en /es /uk /ro` routing, analytics placeholders, sitemap/robots).*

- [ ] Finish multilingual content + a visible **language switcher**. **Demo / Resume**
  - Immigration clients are often multilingual — a concrete business fit, not just a tech flex.
- [ ] Structured data you can *explain*: JSON-LD `LegalService` + `FAQPage` schema. **Demo / Resume**
  - A Google Rich Results test screenshot is very legible to a non-engineer.
- [ ] Wire `AnalyticsPlaceholders` to real GA4. **Demo**

**Exit demo:** switch languages live; show a Rich Results validation; show analytics capturing a visit.

---

## Stretch / future (post-pitch)

- [ ] **R2** document uploads in the intake flow. **Resume**
- [ ] Durable Object session state (multi-device, server-authoritative). **Resume**
- [ ] CRM / webhook lead routing in addition to email. **Resume**

---

## Stakeholder demo framing

Two reminders for the review with the current site's author:

1. **Additive, not critical.** Present capabilities the site *could gain* (instant AI intake, multilingual reach, lead tracking) — a collaborative modernization prototype, not a critique. He decides whether to adopt.
2. **Lead with business outcomes, close with the tech.** Open with the email-arrives-instantly moment and the live language switch. Mention Cloudflare / D1 / OpenAI only if asked — the engineering depth is for your resume and interviews; for him it's "you won't miss leads, and clients get answers in their language 24/7."
