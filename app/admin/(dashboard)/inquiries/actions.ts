"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { InquiryStatus } from "@prisma/client";

export async function updateInquiryStatusAction(
  id: string,
  status: InquiryStatus
) {
  const session = await getSession();
  if (!session) return;

  await prisma.inquiry.update({ where: { id }, data: { status } });

  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}
