import { Resend } from "resend";

/**
 * Transactional email via Resend.
 *
 * Mirrors the graceful-degradation pattern used by the Mailchimp subscribe
 * route: if the relevant env vars are missing the helpers log a warning and
 * no-op rather than throwing, so the user-facing action that triggered the
 * email (inquiry create, status change, publish) never fails because email
 * happens to be unconfigured in a given environment.
 */

let client: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

/** Absolute origin for links embedded in emails. Falls back to localhost in dev. */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

interface SendEmailArgs {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Sends an email through Resend. Returns `true` if a send was attempted
 * successfully, `false` if skipped (unconfigured) or failed. Never throws —
 * email is best-effort and must not break the originating request.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailArgs): Promise<boolean> {
  const resend = getClient();
  const from = process.env.RESEND_FROM_EMAIL;

  if (!resend || !from) {
    console.warn("Resend env vars not configured — skipping email:", subject);
    return false;
  }

  const recipients = Array.isArray(to) ? to : [to];
  if (recipients.length === 0) return false;

  try {
    const { error } = await resend.emails.send({
      from,
      to: recipients,
      subject,
      html,
      ...(text ? { text } : {}),
    });
    if (error) {
      console.error("Resend send error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send threw:", err);
    return false;
  }
}
