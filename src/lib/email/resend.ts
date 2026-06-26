// Minimal Resend client over the REST API (https://resend.com/docs/api-reference).
// We call fetch directly instead of the `resend` npm SDK so this runs on the
// Cloudflare Workers runtime with no extra dependency.

type SendEmailArgs = {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail({ apiKey, from, to, subject, text, replyTo }: SendEmailArgs): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`);
  }
}
