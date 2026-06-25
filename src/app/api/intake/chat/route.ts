import { getCloudflareContext } from "@opennextjs/cloudflare";

import { getChatProvider } from "@/lib/chat/provider";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import type { ChatMessage } from "@/lib/chat/types";

const MAX_HISTORY = 10;
const MAX_CHARS = 2000;

type IncomingMessage = { role?: string; content?: unknown };

export async function POST(request: Request) {
  let body: { messages?: IncomingMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Sanitize: keep only valid user/assistant turns, cap length and history.
  const history: ChatMessage[] = (Array.isArray(body.messages) ? body.messages : [])
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return Response.json({ error: "A user message is required." }, { status: 400 });
  }

  try {
    const { env } = getCloudflareContext();
    const provider = getChatProvider(env);
    const reply = await provider.generateReply([
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
    ]);

    return Response.json({
      reply:
        reply ||
        "Sorry, I couldn't generate a response. Please try rephrasing, or contact our office directly.",
    });
  } catch (error) {
    console.error("[/api/intake/chat] provider error:", error);
    return Response.json(
      { error: "The assistant is temporarily unavailable. Please try again shortly." },
      { status: 502 },
    );
  }
}
