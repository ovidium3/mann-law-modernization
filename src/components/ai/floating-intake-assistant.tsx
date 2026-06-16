"use client";

import { useMemo, useState } from "react";

import type { AssistantMessage, LeadFormData } from "@/types/assistant";

const serviceHints = [
  "Family-based immigration",
  "Employment-based immigration",
  "Green cards",
  "Citizenship and naturalization",
  "Visa services",
  "Deportation defense",
];

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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string) {
  return /^\+?[0-9()\-.\s]{7,20}$/.test(phone.trim());
}

function generateAssistantReply(input: string) {
  const normalized = input.toLowerCase();
  const matchedService = serviceHints.find((hint) =>
    normalized.includes(hint.split(" ")[0].toLowerCase()),
  );

  if (matchedService) {
    return `Thanks for sharing. Based on your message, ${matchedService} may be relevant. I can help capture your information for a consultation follow-up.`;
  }

  return "Thanks — I can provide general information and connect you with the best practice area. Please share a short case summary and your preferred contact details.";
}

export function FloatingIntakeAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>(initialMessages);
  const [input, setInput] = useState("");
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

  const sendMessage = () => {
    if (!input.trim()) {
      return;
    }

    const userMessage: AssistantMessage = { role: "user", text: input.trim() };
    const assistantMessage: AssistantMessage = {
      role: "assistant",
      text: generateAssistantReply(input),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
  };

  const submitLead = () => {
    if (!canSubmitLead) {
      return;
    }

    // Placeholder for future API integration (OpenAI + CRM or intake backend).
    setSubmitted(true);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 w-[min(360px,calc(100%-2rem))]">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-full bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-800"
        >
          Ask an Immigration Question
        </button>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
            <h2 className="text-sm font-semibold">AI Intake Assistant</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded border border-slate-600 px-2 py-1 text-xs"
              aria-label="Close intake assistant"
            >
              Close
            </button>
          </div>
          <div className="max-h-56 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message, index) => (
              <p
                key={`${message.role}-${index}`}
                className={`rounded-lg px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "bg-blue-50 text-slate-800"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {message.text}
              </p>
            ))}
          </div>
          <div className="space-y-2 border-t border-slate-200 px-4 py-3">
            <label htmlFor="assistant-input" className="text-xs font-medium text-slate-600">
              Ask a general question
            </label>
            <textarea
              id="assistant-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="h-20 w-full rounded-md border border-slate-300 p-2 text-sm"
              placeholder="Example: I need help with a work visa."
            />
            <button
              type="button"
              onClick={sendMessage}
              className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Send
            </button>
          </div>
          <div className="space-y-2 border-t border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-600">
              The information provided is for informational purposes only and does not constitute legal advice.
            </p>
            {submitted ? (
              <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                Thank you. Your request has been captured for follow-up.
              </p>
            ) : (
              <>
                <label htmlFor="assistant-lead-name" className="text-xs font-medium text-slate-600">
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
                  className="w-full rounded-md border border-slate-300 p-2 text-sm"
                />
                <label htmlFor="assistant-lead-email" className="text-xs font-medium text-slate-600">
                  Email
                </label>
                <input
                  id="assistant-lead-email"
                  type="email"
                  placeholder="Email"
                  value={lead.email}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, email: event.target.value }))
                  }
                  className="w-full rounded-md border border-slate-300 p-2 text-sm"
                />
                <label htmlFor="assistant-lead-phone" className="text-xs font-medium text-slate-600">
                  Phone
                </label>
                <input
                  id="assistant-lead-phone"
                  type="tel"
                  placeholder="Phone"
                  value={lead.phone}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, phone: event.target.value }))
                  }
                  className="w-full rounded-md border border-slate-300 p-2 text-sm"
                />
                <label htmlFor="assistant-lead-summary" className="text-xs font-medium text-slate-600">
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
                  className="h-20 w-full rounded-md border border-slate-300 p-2 text-sm"
                />
                <button
                  type="button"
                  onClick={submitLead}
                  disabled={!canSubmitLead}
                  className="w-full rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
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
