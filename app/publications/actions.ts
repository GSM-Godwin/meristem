"use server";

import { prisma } from "@/lib/prisma";
import { isValidEmail, isValidPhone } from "@/lib/contact-validation";

export type RecordDownloadResult = { ok: true } | { error: string };

export async function recordPublicationDownload(
  publicationId: string,
  email: string,
  phone: string
): Promise<RecordDownloadResult> {
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();

  if (!publicationId) {
    return { error: "Publication not found." };
  }
  if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
    return { error: "Please enter a valid email address." };
  }
  if (!isValidPhone(trimmedPhone)) {
    return { error: "Please enter a valid phone number." };
  }

  try {
    await prisma.publicationDownload.create({
      data: {
        publicationId,
        email: trimmedEmail,
        phone: trimmedPhone,
      },
    });
  } catch (err) {
    console.error("Failed to record publication download:", err);
  }

  return { ok: true };
}
