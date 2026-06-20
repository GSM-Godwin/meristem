"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { notifySenderInquiryHandled } from "@/lib/notifications";
import type { InquiryStatus } from "@prisma/client";

export async function updateInquiryStatusAction(
  id: string,
  status: InquiryStatus
) {
  const session = await getSession();
  if (!session) return;

  const existing = await prisma.inquiry.findUnique({
    where: { id },
    select: { status: true, name: true, email: true },
  });
  if (!existing) return;

  await prisma.inquiry.update({ where: { id }, data: { status } });

  // Trigger 2: fire only on the first transition away from NEW. Once the
  // status is no longer NEW, later toggles between CONTACTED/RESOLVED won't
  // re-send because `existing.status` is no longer NEW.
  const isFirstHandling =
    existing.status === "NEW" &&
    (status === "CONTACTED" || status === "RESOLVED");
  if (isFirstHandling) {
    await notifySenderInquiryHandled({
      name: existing.name,
      email: existing.email,
    });
  }

  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}
