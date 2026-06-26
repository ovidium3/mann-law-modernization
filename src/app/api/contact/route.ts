import { getCloudflareContext } from "@opennextjs/cloudflare";

import { sendEmail } from "@/lib/email/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9()\-.\s]{7,20}$/;
const DEFAULT_FROM = "Mann Law Website <onboarding@resend.dev>";

type Payload = {
  formType?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  practiceArea?: unknown;
  summary?: unknown;
  company?: unknown; // honeypot — must stay empty
};

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a hidden field real users never see. If it's filled, it's a bot —
  // acknowledge success without sending so we don't tip off the scraper.
  if (str(body.company)) {
    return Response.json({ ok: true });
  }

  const formType = body.formType === "consultation" ? "consultation" : "contact";
  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const practiceArea = str(body.practiceArea);
  // The contact form's free-text lives in `message`; the consultation form's in `summary`.
  const detail = formType === "consultation" ? str(body.summary) : str(body.message);

  if (name.length < 2) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!PHONE_RE.test(phone)) return Response.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (formType === "consultation" && !practiceArea) {
    return Response.json({ error: "Please select a practice area." }, { status: 400 });
  }
  if (detail.length < 10) {
    return Response.json({ error: "Please add a bit more detail." }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  const apiKey = env.RESEND_API_KEY;
  const to = env.LEAD_INBOX;
  const from = env.LEAD_FROM || DEFAULT_FROM;

  if (!apiKey || !to) {
    console.error("[/api/contact] missing RESEND_API_KEY or LEAD_INBOX — cannot deliver lead");
    return Response.json(
      { error: "Submissions are temporarily unavailable. Please call our office to reach us." },
      { status: 503 },
    );
  }

  const label = formType === "consultation" ? "Consultation request" : "Contact form";
  const text = [
    `New ${label.toLowerCase()} from the website.`,
    "",
    `Name:  ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    ...(practiceArea ? [`Practice area: ${practiceArea}`] : []),
    "",
    formType === "consultation" ? "Case summary:" : "Message:",
    detail,
  ].join("\n");

  try {
    await sendEmail({
      apiKey,
      from,
      to,
      replyTo: email, // so the firm can reply straight to the client
      subject: `[${label}] ${name}`,
      text,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[/api/contact] send error:", error);
    return Response.json(
      { error: "We couldn't send your message. Please try again or call our office." },
      { status: 502 },
    );
  }
}
