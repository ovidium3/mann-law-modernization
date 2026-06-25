import type { ChatMessage, ChatProvider, WorkersAi } from "./types";

// A current, capable instruct model on Cloudflare Workers AI (fast fp8 variant).
// Check `npx wrangler ai models` if this is ever deprecated.
const DEFAULT_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

export function createCloudflareProvider(ai: WorkersAi, model?: string): ChatProvider {
  return {
    name: "cloudflare",
    async generateReply(messages: ChatMessage[]) {
      const result = await ai.run(model ?? DEFAULT_MODEL, {
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        max_tokens: 512,
      });
      return (result.response ?? "").trim();
    },
  };
}
