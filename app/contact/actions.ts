"use server";

import { prisma } from "@/lib/prisma";
import { notifyAdminsOfNewInquiry } from "@/lib/notifications";

export type ContactState = { ok: true } | { error: string } | null;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function createInquiryAction(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const firstName = (formData.get("firstName") as string | null)?.trim() ?? "";
  const lastName = (formData.get("lastName") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!firstName || !lastName) {
    return { error: "Please enter your first and last name." };
  }
  if (!email || !isValidEmail(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!message) {
    return { error: "Please enter a message." };
  }

  const name = `${firstName} ${lastName}`.trim();
  // The Inquiry model has no phone column; fold it into the message so it is
  // not lost and is visible to admins in the dashboard.
  const fullMessage = phone ? `${message}\n\nPhone: ${phone}` : message;

  let inquiry;
  try {
    inquiry = await prisma.inquiry.create({
      data: { name, email, message: fullMessage },
      select: { id: true, name: true, email: true, message: true },
    });
  } catch (err) {
    console.error("Failed to create inquiry:", err);
    return { error: "Something went wrong. Please try again." };
  }

  // Best-effort admin notification — never blocks or fails the submission.
  await notifyAdminsOfNewInquiry(inquiry);

  return { ok: true };
}
