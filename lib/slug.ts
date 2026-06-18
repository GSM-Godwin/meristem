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

/**
 * Generate a unique slug for a Post. If the base slug is already taken,
 * append a short random suffix until a free one is found.
 */
export async function generateUniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || "post";

  const existing = await prisma.post.findUnique({ where: { slug: base } });
  if (!existing) return base;

  // Collision — append short random suffixes until unique.
  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = Math.random().toString(36).slice(2, 7);
    const candidate = `${base}-${suffix}`;
    const taken = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!taken) return candidate;
  }

  // Extremely unlikely fallback.
  return `${base}-${Date.now().toString(36)}`;
}
