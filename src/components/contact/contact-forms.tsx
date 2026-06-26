"use client";

import { useState, type FormEvent } from "react";

const practiceAreas = [
  "Asylum",
  "Deportation Defense",
  "Family Immigration",
  "Green Cards",
  "Naturalization & Citizenship",
  "Waivers",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string) {
  return /^\+?[0-9()\-.\s]{7,20}$/.test(phone.trim());
}

// Submissions POST to /api/contact, which validates server-side and emails the
// firm via Resend. Delivery only happens when RESEND_API_KEY + LEAD_INBOX are
// configured; otherwise the route returns a clear "unavailable" error.
async function postLead(payload: Record<string, string>): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!response.ok) {
      return { ok: false, error: data.error ?? "Something went wrong. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}

const fieldClass =
  "w-full rounded-sm border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 hover:border-slate-400 focus:border-[#1a3a52] focus:outline-none focus:ring-2 focus:ring-[#1a3a52]/25";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-slate-600";
const formClass = "space-y-5 rounded-sm border border-slate-200 bg-white p-6 shadow-sm sm:p-7";
const headingClass = "font-serif text-lg font-bold text-slate-900";
const buttonClass =
  "w-full rounded-sm bg-[#1a3a52] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#13283c] focus:outline-none focus:ring-2 focus:ring-[#1a3a52]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Hidden field bots tend to auto-fill; a non-empty value flags spam server-side.
function Honeypot() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hidden"
    />
  );
}

function SubmittedNotice() {
  return (
    <p className="rounded-sm bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
      Thank you — your message has been sent. Our team will follow up shortly.
    </p>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? "");

    if (name.length < 2) return setError("Please enter your full name.");
    if (!isValidEmail(email)) return setError("Please enter a valid email address.");
    if (!isValidPhone(phone)) return setError("Please enter a valid phone number.");
    if (message.length < 10) return setError("Please add a bit more detail to your message.");

    setError(null);
    setSending(true);
    const result = await postLead({ formType: "contact", name, email, phone, message, company });
    setSending(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={formClass}>
      <h2 className={headingClass}>Contact Form</h2>
      {submitted ? (
        <SubmittedNotice />
      ) : (
        <>
          <Honeypot />
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className={labelClass}>Full name</label>
            <input id="contact-name" name="name" type="text" required placeholder="Full name" className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-email" className={labelClass}>Email</label>
            <input id="contact-email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-phone" className={labelClass}>Phone</label>
            <input id="contact-phone" name="phone" type="tel" required placeholder="(248) 555-0142" className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-message" className={labelClass}>How can we help?</label>
            <textarea id="contact-message" name="message" required placeholder="Tell us about your situation" className={`h-28 ${fieldClass}`} />
          </div>
          {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
          <button type="submit" disabled={sending} className={buttonClass}>
            {sending ? "Sending…" : "Send Message"}
          </button>
        </>
      )}
    </form>
  );
}

function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const practiceArea = String(data.get("practiceArea") ?? "").trim();
    const summary = String(data.get("summary") ?? "").trim();
    const company = String(data.get("company") ?? "");

    if (name.length < 2) return setError("Please enter your name.");
    if (!isValidEmail(email)) return setError("Please enter a valid email address.");
    if (!isValidPhone(phone)) return setError("Please enter a valid phone number.");
    if (!practiceArea) return setError("Please select a practice area.");
    if (summary.length < 10) return setError("Please add a brief case summary.");

    setError(null);
    setSending(true);
    const result = await postLead({
      formType: "consultation",
      name,
      email,
      phone,
      practiceArea,
      summary,
      company,
    });
    setSending(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <form id="consultation" onSubmit={handleSubmit} noValidate className={`scroll-mt-28 ${formClass}`}>
      <h2 className={headingClass}>Consultation Request</h2>
      {submitted ? (
        <SubmittedNotice />
      ) : (
        <>
          <Honeypot />
          <div className="space-y-1.5">
            <label htmlFor="consult-name" className={labelClass}>Name</label>
            <input id="consult-name" name="name" type="text" required placeholder="Name" className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="consult-email" className={labelClass}>Email</label>
            <input id="consult-email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="consult-phone" className={labelClass}>Phone</label>
            <input id="consult-phone" name="phone" type="tel" required placeholder="(248) 555-0142" className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="consult-area" className={labelClass}>Practice area</label>
            <div className="relative">
              <select
                id="consult-area"
                name="practiceArea"
                required
                defaultValue=""
                className={`${fieldClass} cursor-pointer appearance-none pr-10`}
              >
                <option value="">Select practice area</option>
                {practiceAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="consult-summary" className={labelClass}>Brief case summary</label>
            <textarea id="consult-summary" name="summary" required placeholder="Brief case summary" className={`h-28 ${fieldClass}`} />
          </div>
          {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
          <button type="submit" disabled={sending} className={buttonClass}>
            {sending ? "Sending…" : "Request Consultation"}
          </button>
        </>
      )}
    </form>
  );
}

export function ContactForms() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <ContactForm />
      <ConsultationForm />
    </section>
  );
}
