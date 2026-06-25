export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/**
 * Provider-agnostic chat contract. Swapping Cloudflare Workers AI ↔ OpenAI ↔
 * any future provider only requires a new implementation of this interface.
 */
export interface ChatProvider {
  readonly name: string;
  generateReply(messages: ChatMessage[]): Promise<string>;
}

// Minimal shape of the Cloudflare Workers AI binding we use (text generation).
export interface WorkersAiRunResult {
  response?: string;
}

export interface WorkersAi {
  run(
    model: string,
    inputs: { messages: { role: string; content: string }[]; max_tokens?: number },
  ): Promise<WorkersAiRunResult>;
}
