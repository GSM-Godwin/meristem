import { prisma } from "@/lib/prisma";
import { sendEmail, siteUrl } from "@/lib/email";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

interface InquiryEmailData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
}

export async function notifyAdminsOfNewInquiry(inquiry: InquiryEmailData): Promise<void> {
  const admins = await prisma.admin.findMany({ select: { email: true } });
  const recipients = admins.map((a) => a.email).filter(Boolean);
  if (recipients.length === 0) return;

  const link = `${siteUrl()}/admin/inquiries/${inquiry.id}`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#181D27;line-height:1.6;">
      <h2 style="margin:0 0 16px;">New inquiry received</h2>
      <p style="margin:0 0 4px;"><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
      <p style="margin:0 0 4px;"><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
      ${inquiry.phone ? `<p style="margin:0 0 4px;"><strong>Phone:</strong> ${escapeHtml(inquiry.phone)}</p>` : ""}
      <p style="margin:16px 0 4px;"><strong>Message:</strong></p>
      <p style="margin:0 0 24px;white-space:pre-wrap;">${nl2br(inquiry.message)}</p>
      <a href="${link}" style="display:inline-block;background:#E2A93B;color:#ffffff;text-decoration:none;font-weight:600;padding:10px 20px;border-radius:8px;">
        View in dashboard
      </a>
      <p style="margin:24px 0 0;font-size:12px;color:#717680;">${link}</p>
    </div>
  `;

  const text = [
    "New inquiry received",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    ...(inquiry.phone ? [`Phone: ${inquiry.phone}`] : []),
    "",
    "Message:",
    inquiry.message,
    "",
    `View in dashboard: ${link}`,
  ].join("\n");

  await sendEmail({
    to: recipients,
    subject: `New inquiry from ${inquiry.name}`,
    html,
    text,
  });
}


export async function notifySenderInquiryHandled(inquiry: {
  name: string;
  email: string;
}): Promise<void> {
  if (!inquiry.email) return;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#181D27;line-height:1.6;">
      <h2 style="margin:0 0 16px;">We've received your message</h2>
      <p style="margin:0 0 16px;">Hi ${escapeHtml(inquiry.name)},</p>
      <p style="margin:0 0 16px;">
        Thank you for reaching out to Meristem Family Office. Your inquiry has been
        received and a member of our team is now looking into it. We'll be in touch
        with you shortly.
      </p>
      <p style="margin:24px 0 0;">Warm regards,<br />Meristem Family Office</p>
    </div>
  `;

  const text = [
    "We've received your message",
    "",
    `Hi ${inquiry.name},`,
    "",
    "Thank you for reaching out to Meristem Family Office. Your inquiry has been received and a member of our team is now looking into it. We'll be in touch with you shortly.",
    "",
    "Warm regards,",
    "Meristem Family Office",
  ].join("\n");

  await sendEmail({
    to: inquiry.email,
    subject: "We've received your inquiry — Meristem Family Office",
    html,
    text,
  });
}
