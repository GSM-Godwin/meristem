"use server";

import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
