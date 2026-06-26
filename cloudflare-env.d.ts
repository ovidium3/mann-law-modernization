import type { WorkersAi } from "./src/lib/chat/types";

declare global {
  /**
   * Bindings + vars available on the Cloudflare Workers runtime via
   * getCloudflareContext().env. Keep in sync with wrangler.jsonc (bindings) and
   * .dev.vars / the Workers dashboard (secrets). Or regenerate with `npm run cf-typegen`.
   */
  interface CloudflareEnv {
    AI?: WorkersAi;
    CHAT_PROVIDER?: string; // "cloudflare" (default) | "openai"
    CHAT_MODEL?: string; // optional model override
    OPENAI_API_KEY?: string; // required when CHAT_PROVIDER=openai
    GOOGLE_PLACES_API_KEY?: string; // live Google reviews (/api/reviews)
    RESEND_API_KEY?: string; // lead-notification email (/api/contact)
    LEAD_INBOX?: string; // destination address for form submissions
    LEAD_FROM?: string; // optional "from" header; defaults to onboarding@resend.dev
  }
}

export {};
