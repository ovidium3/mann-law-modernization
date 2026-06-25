import type { ChatMessage, ChatProvider, WorkersAi } from "./types";

// A capable, low-cost instruct model available on Cloudflare Workers AI.
const DEFAULT_MODEL = "@cf/meta/llama-3.1-8b-instruct";

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
