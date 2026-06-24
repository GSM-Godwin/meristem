"use server";

import { prisma } from "@/lib/prisma";
import { isValidEmail, isValidName } from "@/lib/contact-validation";

export type RecordDownloadResult = { ok: true } | { error: string };

export async function recordPublicationDownload(
  publicationId: string,
  name: string,
  email: string
): Promise<RecordDownloadResult> {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!publicationId) {
    return { error: "Publication not found." };
  }
  if (!isValidName(trimmedName)) {
    return { error: "Please enter your full name." };
  }
  if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await prisma.publicationDownload.create({
      data: {
        publicationId,
        name: trimmedName,
        email: trimmedEmail,
      },
    });
  } catch (err) {
    console.error("Failed to record publication download:", err);
  }

  return { ok: true };
}
