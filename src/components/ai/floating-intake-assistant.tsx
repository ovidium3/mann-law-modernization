"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n";
import type { AssistantMessage } from "@/types/assistant";

type FloatingIntakeAssistantProps = {
  locale: Locale;
};

const initialMessages: AssistantMessage[] = [
  {
    role: "assistant",
    text: "Hello — I can answer general immigration questions. When you're ready to speak with an attorney, you can request a consultation below.",
  },
];

const fieldClass =
  "w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-[#1a3a52] focus:outline-none focus:ring-2 focus:ring-[#1a3a52]/25";
const navyButton =
  "shrink-0 rounded-sm bg-[#1a3a52] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#13283c] disabled:cursor-not-allowed disabled:bg-slate-300";

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
      <path d="M12 3C6.48 3 2 6.92 2 11.5c0 2.1.95 4.02 2.52 5.47L4 21l4.32-1.5c1.13.32 2.34.5 3.68.5 5.52 0 10-3.92 10-8.5S17.52 3 12 3z" />
    </svg>
  );
}

export function FloatingIntakeAssistant({ locale }: FloatingIntakeAssistantProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view as the conversation grows or while typing.
  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, loading, open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) {
      return;
    }

    const history: AssistantMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/intake/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      const text =
        response.ok && data.reply
          ? data.reply
          : data.error ?? "Something went wrong. Please try again.";

      setMessages((current) => [...current, { role: "assistant", text }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I couldn't reach the assistant. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-sm bg-[#1a3a52] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#13283c]"
        >
          <ChatIcon />
          Ask an Immigration Question
        </button>
      ) : (
        <div className="flex max-h-[min(80vh,560px)] w-[min(370px,calc(100vw-2rem))] flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xl">
          <div className="flex shrink-0 items-center justify-between bg-[#1a3a52] px-4 py-3 text-white">
            <h2 className="font-serif text-sm font-bold">AI Intake Assistant</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-sm px-2 py-1 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close intake assistant"
            >
              Close
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[85%] rounded-sm px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "self-start bg-slate-100 text-slate-800"
                    : "self-end bg-[#1a3a52] text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
            {loading ? (
              <div
                className="max-w-[85%] self-start rounded-sm bg-slate-100 px-3 py-2 text-sm text-slate-500"
                aria-live="polite"
              >
                Thinking…
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="shrink-0 space-y-3 border-t border-slate-200 px-4 py-3">
            <div className="flex items-end gap-2">
              <label htmlFor="assistant-input" className="sr-only">
                Ask a general immigration question
              </label>
              <textarea
                id="assistant-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                rows={1}
                className={`max-h-28 min-h-[2.5rem] resize-none ${fieldClass}`}
                placeholder="Ask a question…"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={navyButton}
              >
                {loading ? "…" : "Send"}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>Informational only — not legal advice.</span>
              <Link
                href={`/${locale}/contact#consultation`}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1 font-semibold text-[#1a3a52] hover:underline"
              >
                Request a consultation
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
