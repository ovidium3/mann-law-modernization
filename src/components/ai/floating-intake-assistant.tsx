"use client";

import { useMemo, useState } from "react";

import type { AssistantMessage, LeadFormData } from "@/types/assistant";

const initialMessages: AssistantMessage[] = [
  {
    role: "assistant",
    text: "Hello — I can answer general immigration questions and help route your consultation request.",
  },
];

const emptyLead: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  caseSummary: "",
};

const fieldClass =
  "w-full rounded-sm border border-slate-300 p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1a3a52] focus:outline-none focus:ring-1 focus:ring-[#1a3a52]";
const labelClass = "text-xs font-medium text-slate-600";
const navyButton =
  "w-full rounded-sm bg-[#1a3a52] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#13283c] disabled:cursor-not-allowed disabled:bg-slate-300";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string) {
  return /^\+?[0-9()\-.\s]{7,20}$/.test(phone.trim());
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
      <path d="M12 3C6.48 3 2 6.92 2 11.5c0 2.1.95 4.02 2.52 5.47L4 21l4.32-1.5c1.13.32 2.34.5 3.68.5 5.52 0 10-3.92 10-8.5S17.52 3 12 3z" />
    </svg>
  );
}

export function FloatingIntakeAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<LeadFormData>(emptyLead);
  const [submitted, setSubmitted] = useState(false);

  const canSubmitLead = useMemo(() => {
    return (
      lead.name.trim().length > 1 &&
      isValidEmail(lead.email) &&
      isValidPhone(lead.phone) &&
      lead.caseSummary.trim().length > 10
    );
  }, [lead]);

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

  const submitLead = () => {
    if (!canSubmitLead) {
      return;
    }

    // Placeholder for future API integration (Worker → email/CRM).
    setSubmitted(true);
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
          <div className="flex items-center justify-between bg-[#1a3a52] px-4 py-3 text-white">
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

          <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-3">
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
          </div>

          <div className="space-y-2 border-t border-slate-200 px-4 py-3">
            <label htmlFor="assistant-input" className={labelClass}>
              Ask a general question
            </label>
            <textarea
              id="assistant-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className={`h-16 ${fieldClass}`}
              placeholder="Example: I need help with a work visa."
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={navyButton}
            >
              {loading ? "Sending…" : "Send"}
            </button>
          </div>

          <div className="space-y-2 border-t border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500">
              For informational purposes only — this does not constitute legal advice.
            </p>
            {submitted ? (
              <p className="rounded-sm bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                Thank you. Your request has been captured for follow-up.
              </p>
            ) : (
              <>
                <label htmlFor="assistant-lead-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="assistant-lead-name"
                  type="text"
                  placeholder="Name"
                  value={lead.name}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, name: event.target.value }))
                  }
                  className={fieldClass}
                />
                <label htmlFor="assistant-lead-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="assistant-lead-email"
                  type="email"
                  placeholder="you@example.com"
                  value={lead.email}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, email: event.target.value }))
                  }
                  className={fieldClass}
                />
                <label htmlFor="assistant-lead-phone" className={labelClass}>
                  Phone
                </label>
                <input
                  id="assistant-lead-phone"
                  type="tel"
                  placeholder="(248) 932-0990"
                  value={lead.phone}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, phone: event.target.value }))
                  }
                  className={fieldClass}
                />
                <label htmlFor="assistant-lead-summary" className={labelClass}>
                  Brief case summary
                </label>
                <textarea
                  id="assistant-lead-summary"
                  placeholder="Brief case summary"
                  value={lead.caseSummary}
                  onChange={(event) =>
                    setLead((current) => ({
                      ...current,
                      caseSummary: event.target.value,
                    }))
                  }
                  className={`h-16 ${fieldClass}`}
                />
                <button
                  type="button"
                  onClick={submitLead}
                  disabled={!canSubmitLead}
                  className={navyButton}
                >
                  Submit Consultation Request
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
