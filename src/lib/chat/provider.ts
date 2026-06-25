import { createCloudflareProvider } from "./cloudflare";
import { createOpenAiProvider } from "./openai";
import type { ChatProvider } from "./types";

const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";

/**
 * Selects the chat provider from runtime env. Defaults to Cloudflare Workers AI
 * (no API key, runs in the same Worker). Set CHAT_PROVIDER=openai to switch.
 */
export function getChatProvider(env: CloudflareEnv): ChatProvider {
  const choice = (env.CHAT_PROVIDER ?? "cloudflare").toLowerCase();

  if (choice === "openai") {
    if (!env.OPENAI_API_KEY) {
      throw new Error("CHAT_PROVIDER=openai but OPENAI_API_KEY is not set.");
    }
    return createOpenAiProvider(env.OPENAI_API_KEY, env.CHAT_MODEL ?? DEFAULT_OPENAI_MODEL);
  }

  if (!env.AI) {
    throw new Error("Workers AI binding (AI) is not configured in wrangler.jsonc.");
  }
  return createCloudflareProvider(env.AI, env.CHAT_MODEL);
}
