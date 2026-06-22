import type { PostCategory } from "@prisma/client";
import { siteUrl } from "@/lib/email";

const FROM_NAME = "Meristem Family Office";
const REPLY_TO = "familyoffice@meristemng.com";

const CATEGORY_META: Record<
  PostCategory,
  { label: string; cta: string; path: string }
> = {
  INSIGHT: {
    label: "New Insight",
    cta: "Read the full Insight",
    path: "insights",
  },
  PERSPECTIVE: {
    label: "New Perspective",
    cta: "Watch now",
    path: "perspectives",
  },
  PUBLICATION: {
    label: "New Publication",
    cta: "Read the Publication",
    path: "publications",
  },
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value);
}

function absoluteAssetUrl(pathOrUrl: string, base: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export interface PostCampaignData {
  category: PostCategory;
  title: string;
  shortDescription: string;
  featuredImage: string;
  url: string;
}

function buildHtml(data: PostCampaignData): string {
  const meta = CATEGORY_META[data.category];
  const base = siteUrl();
  const imageUrl = absoluteAssetUrl(data.featuredImage, base);
  const title = escapeHtml(data.title);
  const shortDescription = escapeHtml(data.shortDescription);
  const label = escapeHtml(meta.label);
  const cta = escapeHtml(meta.cta);
  const url = escapeAttr(data.url);
  const imageAlt = escapeAttr(data.title);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F5F5F6;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E9EAEB;">
          <tr>
            <td style="padding:0;line-height:0;">
              <a href="${url}" style="display:block;text-decoration:none;">
                <img
                  src="${imageUrl}"
                  alt="${imageAlt}"
                  width="600"
                  style="display:block;width:100%;max-width:600px;height:auto;border:0;"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 32px;font-family:Arial,Helvetica,sans-serif;color:#181D27;">
              <p style="margin:0 0 12px;font-size:12px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#E2A93B;font-weight:700;">
                ${label}
              </p>
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.25;font-weight:700;color:#181D27;">
                ${title}
              </h1>
              <p style="margin:0 0 28px;font-size:16px;line-height:1.65;color:#535862;">
                ${shortDescription}
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:8px;background-color:#E2A93B;">
                    <a
                      href="${url}"
                      style="display:inline-block;padding:14px 28px;font-size:15px;line-height:1;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;"
                    >
                      ${cta}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;font-family:Arial,Helvetica,sans-serif;border-top:1px solid #E9EAEB;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#717680;">
                You're receiving this because you subscribed to Meristem Family Office updates.
                <br />
                <a href="*|UNSUB|*" style="color:#717680;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendPostCampaign(data: PostCampaignData): Promise<boolean> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !serverPrefix) {
    console.warn("Mailchimp env vars not configured — skipping post campaign.");
    return false;
  }

  const meta = CATEGORY_META[data.category];
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
          title: `${meta.label} — ${data.title}`,
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

export function postPublicUrl(category: PostCategory, slug: string): string {
  const { path } = CATEGORY_META[category];
  return `${siteUrl()}/${path}/${slug}`;
}
