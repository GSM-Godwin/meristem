"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";

export type ChangePasswordState =
  | { error: string }
  | { ok: true }
  | null;

export async function changePasswordAction(
  _prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const session = await getSession();
  if (!session) {
    return { error: "You must be signed in to change your password." };
  }

  const currentPassword = (formData.get("currentPassword") as string | null) ?? "";
  const newPassword = (formData.get("newPassword") as string | null) ?? "";
  const confirmPassword = (formData.get("confirmPassword") as string | null) ?? "";

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New password and confirmation do not match." };
  }

  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  const admin = await prisma.admin.findUnique({
    where: { id: session.id },
    select: { passwordHash: true },
  });

  if (!admin) {
    return { error: "Account not found." };
  }

  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  const sameAsCurrent = await bcrypt.compare(newPassword, admin.passwordHash);
  if (sameAsCurrent) {
    return { error: "New password must be different from your current password." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  try {
    await prisma.admin.update({
      where: { id: session.id },
      data: { passwordHash },
    });
  } catch (err) {
    console.error("Failed to update password:", err);
    return { error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
