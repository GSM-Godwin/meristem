import { NextRequest, NextResponse } from "next/server";

// Mailchimp env vars — set these in .env:
//   MAILCHIMP_API_KEY       e.g.  abc123...def-us6
//   MAILCHIMP_AUDIENCE_ID   e.g.  a1b2c3d4e5
//   MAILCHIMP_SERVER_PREFIX e.g.  us6

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !serverPrefix) {
    // Config missing — fail gracefully in dev so the form still works locally
    console.warn("Mailchimp env vars not configured.");
    return NextResponse.json({ ok: true });
  }

  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email, status: "subscribed" }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    // 400 with title "Member Exists" is not really an error — treat it as success
    if (body?.title === "Member Exists") {
      return NextResponse.json({ ok: true });
    }
    console.error("Mailchimp error:", body);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
