import type { ChatMessage, ChatProvider } from "./types";

type OpenAiResponse = {
  choices?: { message?: { content?: string } }[];
};

export function createOpenAiProvider(apiKey: string, model: string): ChatProvider {
  return {
    name: "openai",
    async generateReply(messages: ChatMessage[]) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 512,
          temperature: 0.4,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI request failed: ${response.status}`);
      }

      const data = (await response.json()) as OpenAiResponse;
      return (data.choices?.[0]?.message?.content ?? "").trim();
    },
  };
}
