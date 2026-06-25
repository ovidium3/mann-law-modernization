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

// NOTE: Submissions are validated client-side and acknowledged here. Server-side
// delivery (Cloudflare Worker → email/SMS) is the Phase 1 milestone; until then
// the success state reflects capture, not delivery.
const fieldClass =
  "w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1a3a52] focus:outline-none focus:ring-1 focus:ring-[#1a3a52]";
const labelClass = "block text-sm font-medium text-slate-700";
const formClass = "space-y-4 rounded-sm border border-slate-200 bg-white p-6 shadow-sm";
const headingClass = "font-serif text-lg font-bold text-slate-900";
const buttonClass =
  "w-full rounded-sm bg-[#1a3a52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#13283c]";

function SubmittedNotice() {
  return (
    <p className="rounded-sm bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
      Thank you — your request has been captured. Our team will follow up shortly.
    </p>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) return setError("Please enter your full name.");
    if (!isValidEmail(email)) return setError("Please enter a valid email address.");
    if (!isValidPhone(phone)) return setError("Please enter a valid phone number.");
    if (message.length < 10) return setError("Please add a bit more detail to your message.");

    setError(null);
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={formClass}>
      <h2 className={headingClass}>Contact Form</h2>
      {submitted ? (
        <SubmittedNotice />
      ) : (
        <>
          <div className="space-y-1">
            <label htmlFor="contact-name" className={labelClass}>Full name</label>
            <input id="contact-name" name="name" type="text" required placeholder="Full name" className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-email" className={labelClass}>Email</label>
            <input id="contact-email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-phone" className={labelClass}>Phone</label>
            <input id="contact-phone" name="phone" type="tel" required placeholder="(248) 555-0142" className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-message" className={labelClass}>How can we help?</label>
            <textarea id="contact-message" name="message" required placeholder="Tell us about your situation" className={`h-28 ${fieldClass}`} />
          </div>
          {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
          <button type="submit" className={buttonClass}>
            Send Message
          </button>
        </>
      )}
    </form>
  );
}

function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const practiceArea = String(data.get("practiceArea") ?? "").trim();
    const summary = String(data.get("summary") ?? "").trim();

    if (name.length < 2) return setError("Please enter your name.");
    if (!isValidEmail(email)) return setError("Please enter a valid email address.");
    if (!isValidPhone(phone)) return setError("Please enter a valid phone number.");
    if (!practiceArea) return setError("Please select a practice area.");
    if (summary.length < 10) return setError("Please add a brief case summary.");

    setError(null);
    setSubmitted(true);
  };

  return (
    <form id="consultation" onSubmit={handleSubmit} noValidate className={`scroll-mt-28 ${formClass}`}>
      <h2 className={headingClass}>Consultation Request</h2>
      {submitted ? (
        <SubmittedNotice />
      ) : (
        <>
          <div className="space-y-1">
            <label htmlFor="consult-name" className={labelClass}>Name</label>
            <input id="consult-name" name="name" type="text" required placeholder="Name" className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="consult-email" className={labelClass}>Email</label>
            <input id="consult-email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="consult-phone" className={labelClass}>Phone</label>
            <input id="consult-phone" name="phone" type="tel" required placeholder="(248) 555-0142" className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="consult-area" className={labelClass}>Practice area</label>
            <select id="consult-area" name="practiceArea" required defaultValue="" className={fieldClass}>
              <option value="">Select practice area</option>
              {practiceAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="consult-summary" className={labelClass}>Brief case summary</label>
            <textarea id="consult-summary" name="summary" required placeholder="Brief case summary" className={`h-28 ${fieldClass}`} />
          </div>
          {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
          <button type="submit" className={buttonClass}>
            Request Consultation
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
