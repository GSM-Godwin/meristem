import { cache } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import type { PostCategory } from "@prisma/client";
import type { ContentBlock } from "@/lib/types/insight";
import type { RichTextNode } from "@/lib/rich-text-types";
import { formatPostDate } from "@/lib/post-cards";

export interface PostDetail {
  id: string;
  slug: string;
  title: string;
  intro: string;
  author: string;
  date: string;
  coverSrc: string;
  fileUrl: string | null;
  comingSoon: boolean;
  content: ContentBlock[];
}

export const getPostDetailBySlug = cache(
  async (category: PostCategory, slug: string): Promise<PostDetail | null> => {
    await connection();

    const post = await prisma.post.findFirst({
      where: { slug, category, status: "PUBLISHED" },
      include: {
        sections: {
          orderBy: { order: "asc" },
          include: { blocks: { orderBy: { order: "asc" } } },
        },
      },
    });

    if (!post) return null;

    const content: ContentBlock[] = [];

    if (post.longDescription.trim()) {
      content.push({ type: "long-description", text: post.longDescription });
    }

    for (const section of post.sections) {
      if (section.type === "QUOTE") {
        content.push({
          type: "blockquote",
          quote: section.quoteText ?? "",
          attribution: section.attribution ?? "",
        });
        continue;
      }

      if (section.heading?.trim()) {
        content.push({ type: "heading", text: section.heading });
      }

      for (const block of section.blocks) {
        switch (block.type) {
          case "PARAGRAPH":
            content.push({
              type: "paragraph",
              contentJson: block.contentJson as RichTextNode | null,
            });
            break;
          case "IMAGE":
            content.push({ type: "image", src: block.imageUrl ?? undefined });
            break;
          case "VIDEO":
            content.push({ type: "video", src: block.videoUrl ?? undefined });
            break;
        }
      }
    }

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      intro: post.shortDescription,
      author: post.writtenBy,
      date: formatPostDate(post.publishDate),
      coverSrc: post.featuredImage,
      fileUrl: post.fileUrl,
      comingSoon: post.comingSoon,
      content,
    };
  }
);
