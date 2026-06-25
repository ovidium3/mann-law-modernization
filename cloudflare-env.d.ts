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
  }
}

export {};
