import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import type { PostCategory, Prisma } from "@prisma/client";

/** Serializable shape the shared `PostCard` component consumes. */
export interface PostCardData {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  coverSrc: string;
  comingSoon: boolean;
}

const CARD_SELECT = {
  id: true,
  slug: true,
  title: true,
  writtenBy: true,
  publishDate: true,
  shortDescription: true,
  featuredImage: true,
  comingSoon: true,
} satisfies Prisma.PostSelect;

type CardRow = Prisma.PostGetPayload<{ select: typeof CARD_SELECT }>;

export function formatPostDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function toCardData(p: CardRow): PostCardData {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    author: p.writtenBy,
    date: formatPostDate(p.publishDate),
    excerpt: p.shortDescription,
    coverSrc: p.featuredImage,
    comingSoon: p.comingSoon,
  };
}

/**
 * Fetches PUBLISHED posts for a category (newest first) as card-ready DTOs.
 * Pass `take` to cap the count (e.g. the Insights hub previews).
 * Pass `featured: true` to restrict to featured posts only (e.g. the home page rail).
 */
export async function getPublishedPostCards(
  category: PostCategory,
  take?: number,
  featured?: boolean
): Promise<PostCardData[]> {
  // Exclude listings from prerendering so newly published/edited posts
  // appear immediately. Section 11 can layer in cacheTag-based caching later.
  await connection();

  const posts = await prisma.post.findMany({
    where: {
      category,
      status: "PUBLISHED",
      ...(featured ? { featured: true } : {}),
    },
    orderBy: { publishDate: "desc" },
    ...(take ? { take } : {}),
    select: CARD_SELECT,
  });

  return posts.map(toCardData);
}

/**
 * Sibling PUBLISHED posts in the same category, excluding `excludeSlug`,
 * for the detail page's "More posts" rail.
 */
export async function getRelatedPostCards(
  category: PostCategory,
  excludeSlug: string,
  limit = 3
): Promise<PostCardData[]> {
  await connection();

  const posts = await prisma.post.findMany({
    where: { category, status: "PUBLISHED", slug: { not: excludeSlug } },
    orderBy: { publishDate: "desc" },
    take: limit,
    select: CARD_SELECT,
  });

  return posts.map(toCardData);
}
