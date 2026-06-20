import { prisma } from "@/lib/prisma";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

const RESERVED_SLUGS = new Set(["all", "new", "edit"]);

export async function generateUniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || "post";

  if (!RESERVED_SLUGS.has(base)) {
    const existing = await prisma.post.findUnique({ where: { slug: base } });
    if (!existing) return base;
  }

  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = Math.random().toString(36).slice(2, 7);
    const candidate = `${base}-${suffix}`;
    const taken = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!taken) return candidate;
  }

  return `${base}-${Date.now().toString(36)}`;
}
