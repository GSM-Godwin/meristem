
const FROM_NAME = "Meristem Family Office";
const REPLY_TO = "familyoffice@meristemng.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface InsightCampaignData {
  title: string;
  shortDescription: string;
  url: string;
}

function buildHtml({ title, shortDescription, url }: InsightCampaignData): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#181D27;line-height:1.6;max-width:600px;margin:0 auto;padding:24px;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#717680;">New Insight</p>
      <h1 style="margin:0 0 16px;font-size:24px;">${escapeHtml(title)}</h1>
      <p style="margin:0 0 24px;font-size:16px;color:#535862;">${escapeHtml(shortDescription)}</p>
      <a href="${url}" style="display:inline-block;background:#E2A93B;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:8px;">
        Read the full Insight
      </a>
      <p style="margin:32px 0 0;font-size:12px;color:#717680;">
        You're receiving this because you subscribed to Meristem Family Office insights.
        <br /><a href="*|UNSUB|*" style="color:#717680;">Unsubscribe</a>
      </p>
    </div>
  `;
}

export async function sendInsightCampaign(data: InsightCampaignData): Promise<boolean> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !serverPrefix) {
    console.warn("Mailchimp env vars not configured — skipping Insight campaign.");
    return false;
  }

  const base = `https://${serverPrefix}.api.mailchimp.com/3.0`;
  const auth = `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`;
  const headers = { Authorization: auth, "Content-Type": "application/json" };

  try {
    const createRes = await fetch(`${base}/campaigns`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        type: "regular",
        recipients: { list_id: audienceId },
        settings: {
          subject_line: data.title,
          preview_text: data.shortDescription,
          title: `New Insight — ${data.title}`,
          from_name: FROM_NAME,
          reply_to: REPLY_TO,
        },
      }),
    });

    if (!createRes.ok) {
      console.error("Mailchimp campaign create failed:", await createRes.json().catch(() => ({})));
      return false;
    }

    const { id: campaignId } = (await createRes.json()) as { id?: string };
    if (!campaignId) {
      console.error("Mailchimp campaign create returned no id.");
      return false;
    }

    const contentRes = await fetch(`${base}/campaigns/${campaignId}/content`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ html: buildHtml(data) }),
    });

    if (!contentRes.ok) {
      console.error("Mailchimp campaign content failed:", await contentRes.json().catch(() => ({})));
      return false;
    }

    const sendRes = await fetch(`${base}/campaigns/${campaignId}/actions/send`, {
      method: "POST",
      headers,
    });

    if (!sendRes.ok) {
      console.error("Mailchimp campaign send failed:", await sendRes.json().catch(() => ({})));
      return false;
    }

    return true;
  } catch (err) {
    console.error("Mailchimp campaign threw:", err);
    return false;
  }
}
