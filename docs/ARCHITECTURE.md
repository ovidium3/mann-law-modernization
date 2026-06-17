# Architecture

Technical design for the Mann Law Group modernization — a Next.js + Cloudflare + OpenAI legal-services site with an AI-powered consultation intake workflow.

This document explains **what** the system is and **why** each decision was made. For sequencing and priorities, see [ROADMAP.md](./ROADMAP.md).

---

## 1. Goals & constraints

- **Edge-first.** The app deploys to **Cloudflare Pages**; all server code runs on the **Edge runtime** (Cloudflare Workers), not Node.js.
- **No secrets in the browser.** The OpenAI API key and all credentials live server-side only.
- **Real AI intake.** A genuine OpenAI-powered assistant answers general immigration questions and guides users toward a consultation, capturing their details.
- **Durable leads.** Captured leads are stored and actively delivered to the firm, not parked silently.
- **Right tool for each job.** Cloudflare's storage services (D1, KV, R2) are each used where they genuinely fit, so the architecture reflects deliberate trade-offs.

## 2. Current state (baseline)

The starting point is a static marketing site with a **simulated** assistant. The audit of `src/components/ai/floating-intake-assistant.tsx`:

| Concern | Current implementation | Status |
|---|---|---|
| Assistant replies | `generateAssistantReply()` — keyword substring match | **Placeholder** |
| Chat round-trip | Synchronous local call, canned reply | **Placeholder** |
| Lead submission | `submitLead()` sets `submitted = true`, data discarded | **Placeholder** |
| Conversation persistence | `useState` only — lost on close/reload | **Placeholder** |
| UI / open-close / scroll | Functional | Keep |
| Client validation | `isValidEmail`, `isValidPhone`, `canSubmitLead` gate | Keep |
| Legal disclaimer text | Present in UI | Keep |
| Type shapes | `AssistantMessage`, `LeadFormData` in `src/types/assistant.ts` | Keep / extend |

**Summary:** the UI shell is production-quality; the entire intelligence and persistence layer is stubbed. The work is to add a server tier and replace the two local functions (`generateAssistantReply`/`sendMessage` and `submitLead`) with real network calls.

## 3. System overview

```
Browser  ──  FloatingIntakeAssistant ("use client")
   │
   │  POST /api/intake/chat   { sessionId, messages[] }
   │  POST /api/intake/lead   { sessionId, lead, transcript }
   ▼
Edge Route Handlers  (Next.js App Router, runtime = "edge")
   │   ▲ OPENAI_API_KEY, RESEND_API_KEY  (Cloudflare secrets — server only)
   │
   ├─► OpenAI gpt-4o-mini        (chat + structured lead extraction)
   ├─► Cloudflare D1             (leads table — relational, queryable)
   ├─► Cloudflare KV            (conversation transcript / session, TTL)
   ├─► Cloudflare R2             (optional: client document uploads)
   └─► Resend HTTP API          (email the firm on each new lead)
```

The browser owns the conversation and replays it to the stateless `/chat` endpoint each turn. This keeps the edge functions stateless and horizontally scalable with no session affinity.

## 4. Key decisions

### 4.1 Why an edge API tier at all
A `"use client"` component cannot hold the OpenAI key — anything shipped to the browser is public. So a server tier is mandatory, not optional. On Cloudflare Pages that tier is **App Router route handlers with `export const runtime = "edge"`**, which compile to Workers. This also gives us a place to validate input server-side (never trust the client) and enforce rate limits.

### 4.2 Stateless chat, client-owned history
Each `/chat` request carries the full message array. Trade-off:

- **Pro:** edge functions stay stateless → trivially scalable, no sticky sessions, simplest possible deploy.
- **Con:** payload grows with conversation length → mitigated by capping message count/length server-side.
- **Rejected alternative:** a Durable Object per session (server-authoritative state). Correct for multi-device collaborative sessions, but overkill for a single-user intake widget. Documented as a future upgrade path, not built now.

### 4.3 Storage — one service per job
Leads and transcripts have different shapes and lifecycles, so they use different stores:

| Service | Stores | Why it's the right fit |
|---|---|---|
| **D1** (SQLite) | Leads: name, email, phone, case summary, locale, `sessionId`, timestamp | Structured records you query/sort/display. Relational store is correct, and enables a **lead admin view**. |
| **KV** | Conversation transcript / session state, keyed by `sessionId` with TTL | Blob fetched by a single key, with natural expiry. KV's TTL + eventual consistency fit exactly; D1 here would be over-modeling. |
| **R2** *(stretch)* | Uploaded client documents | S3-compatible object storage for files — the right home for blobs, wrong job for D1/KV. |

The point is not "use three services" — it's that **each choice is independently justifiable**, which is the architecture story worth telling.

### 4.4 Lead delivery — store **and** notify
Persisting a lead nobody sees has no business value. On submit, `/api/intake/lead`:
1. Re-validates the lead server-side.
2. Writes it to D1.
3. Persists the transcript to KV (for context).
4. Sends an email to the firm via **Resend** (edge-compatible HTTP API, clean DX, free tier).

Resend was chosen over SMTP because Workers cannot open raw SMTP sockets; an HTTP email API is the edge-native pattern. This also exercises the third-party-API + secret-management workflow.

### 4.5 Two complementary lead-capture paths
- **Form (source of truth):** the existing validated fields — reliable, works even if the model misbehaves.
- **Conversational extraction (assist):** `/chat` uses OpenAI **structured outputs / tool calling** to pull `name/email/phone/caseSummary` out of natural conversation and pre-fill the form.

The form remains authoritative; extraction is a convenience layer, never the sole capture mechanism.

### 4.6 Responses: single-response first, streaming later
Start with a single JSON response (simple, robust on edge). Add token **streaming** via the Vercel **AI SDK** (`ai`) as a polish step — it makes edge streaming trivial and delivers the "feels like real AI" typewriter effect. Sequencing keeps the working prototype unblocked by the harder version.

### 4.7 Disclaimer enforced in two layers
1. **UI:** static disclaimer text (already present).
2. **Model:** the system prompt forbids definitive legal advice, scopes answers to *general* immigration information, and defers to a consultation.

## 5. Proposed module layout

```
src/
  app/api/intake/
    chat/route.ts        # edge: history -> gpt-4o-mini -> reply (+ extracted lead)
    lead/route.ts        # edge: validate -> D1 write -> KV transcript -> Resend email
  lib/
    openai.ts            # model constant (gpt-4o-mini), client/config, token caps
    intake-prompt.ts     # system prompt (scope, disclaimer, field-collection rules)
    intake-storage.ts    # D1/KV access via getRequestContext()
  components/ai/
    floating-intake-assistant.tsx   # rewritten: fetch endpoints, sessionId, loading/error
  types/
    assistant.ts         # extended: request/response types, sessionId
```

## 6. Cloudflare Pages compatibility

- Every route handler sets `export const runtime = "edge"`.
- The `openai` SDK is fetch-based and edge-compatible (or call the REST endpoint with `fetch` directly to drop the dependency).
- Build/deploy via `@cloudflare/next-on-pages` + `wrangler`.
- `next.config.ts` uses `setupDevPlatform()` so local dev can reach bindings; routes read bindings through `getRequestContext()`.
- D1 / KV / R2 bindings declared in `wrangler.toml` and the Pages dashboard.

## 7. Secrets & configuration

| Name | Where | Notes |
|---|---|---|
| `OPENAI_API_KEY` | Cloudflare secret | Server only. **Never** `NEXT_PUBLIC_*`. |
| `RESEND_API_KEY` | Cloudflare secret | Server only. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` etc. | Public env | Already consumed by `AnalyticsPlaceholders`; safe to expose. |

Local dev uses `.dev.vars` (git-ignored); CI/CD uses Cloudflare Pages environment variables / GitHub Actions secrets.

## 8. Safety, cost & abuse controls

- Cap `max_tokens` and the number/length of inbound messages.
- Per-IP rate limiting (Cloudflare).
- Server-side validation parity with the client (`isValidEmail`/`isValidPhone` logic re-run on the edge).
- TTL on KV transcripts to bound storage and limit PII retention.

## 9. Deferred / future

- Durable Object session state (multi-device, server-authoritative).
- R2 document uploads.
- CRM/webhook lead routing in addition to email.
- Lead admin dashboard backed by D1 (see ROADMAP Phase 2).
