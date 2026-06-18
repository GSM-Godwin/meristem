"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";
import type { PostFormValues } from "@/lib/types/post-form";
import type { PostCategory, Prisma } from "@prisma/client";

function adminSlugFor(category: PostCategory): string {
  return category === "INSIGHT"
    ? "insights"
    : category === "PERSPECTIVE"
    ? "perspectives"
    : "publications";
}

export async function deletePostAction(formData: FormData) {
  const session = await getSession();
  if (!session) return;

  const id = formData.get("id") as string;
  if (!id) return;

  const post = await prisma.post.findUnique({
    where: { id },
    select: { category: true },
  });

  if (!post) return;

  await prisma.post.delete({ where: { id } });

  revalidatePath(`/admin/${adminSlugFor(post.category)}`);
}

type SaveResult = { error: string };

/**
 * Build the nested `sections.create` payload from form state.
 * Section order = array index; block order = array index within the section.
 */
function buildSectionsCreate(
  sections: PostFormValues["sections"]
): Prisma.SectionCreateWithoutPostInput[] {
  return sections.map((section, sectionIndex) => {
    if (section.type === "QUOTE") {
      return {
        type: "QUOTE",
        order: sectionIndex,
        heading: null,
        quoteText: section.quoteText.trim(),
        attribution: section.attribution.trim() || null,
      };
    }

    return {
      type: "CONTENT",
      order: sectionIndex,
      heading: section.heading.trim(),
      quoteText: null,
      attribution: null,
      blocks: {
        create: section.blocks.map((block, blockIndex) =>
          block.type === "IMAGE"
            ? {
                type: "IMAGE" as const,
                order: blockIndex,
                text: null,
                imageUrl: block.imageUrl,
              }
            : {
                type: "PARAGRAPH" as const,
                order: blockIndex,
                text: block.text.trim(),
                imageUrl: null,
              }
        ),
      },
    };
  });
}

function validate(values: PostFormValues): string | null {
  if (!values.title.trim()) return "Title is required.";
  if (!values.shortDescription.trim()) return "Short description is required.";
  if (!values.featuredImage) return "A featured image is required.";
  if (!values.writtenBy.trim()) return "Written by is required.";
  if (!values.longDescription.trim()) return "Long description is required.";

  for (const [i, section] of values.sections.entries()) {
    if (section.type === "CONTENT") {
      if (!section.heading.trim()) {
        return `Section ${i + 1}: heading is required.`;
      }
      for (const [j, block] of section.blocks.entries()) {
        if (block.type === "PARAGRAPH" && !block.text.trim()) {
          return `Section ${i + 1}, block ${j + 1}: paragraph text is empty.`;
        }
        if (block.type === "IMAGE" && !block.imageUrl) {
          return `Section ${i + 1}, block ${j + 1}: image not uploaded.`;
        }
      }
    } else {
      if (!section.quoteText.trim()) {
        return `Section ${i + 1}: quote text is required.`;
      }
    }
  }

  return null;
}

export async function savePostAction(
  values: PostFormValues
): Promise<SaveResult> {
  const session = await getSession();
  if (!session) return { error: "Your session has expired. Please log in again." };

  const validationError = validate(values);
  if (validationError) return { error: validationError };

  const publishDate = new Date(values.publishDate);

  const baseData = {
    title: values.title.trim(),
    shortDescription: values.shortDescription.trim(),
    longDescription: values.longDescription.trim(),
    featuredImage: values.featuredImage,
    writtenBy: values.writtenBy.trim(),
    category: values.category,
    status: values.status,
    featured: values.featured,
    publishDate,
  };

  const sectionsCreate = buildSectionsCreate(values.sections);

  let category: PostCategory = values.category;

  try {
    if (values.id) {
      // ── Edit mode ───────────────────────────────────────────────────────
      const existing = await prisma.post.findUnique({
        where: { id: values.id },
        select: { id: true, category: true },
      });
      if (!existing) return { error: "Post not found." };

      // Safest approach: wipe child rows and rewrite from form state.
      // Deleting Sections cascades to SectionBlocks (onDelete: Cascade).
      await prisma.$transaction([
        prisma.section.deleteMany({ where: { postId: values.id } }),
        prisma.post.update({
          where: { id: values.id },
          // Slug is intentionally NOT updated — it must remain stable once created.
          data: {
            ...baseData,
            sections: { create: sectionsCreate },
          },
        }),
      ]);

      category = existing.category;
    } else {
      // ── Create mode ─────────────────────────────────────────────────────
      const slug = await generateUniqueSlug(values.title);

      await prisma.post.create({
        data: {
          ...baseData,
          slug,
          sections: { create: sectionsCreate },
        },
      });
    }
  } catch (err) {
    console.error("Failed to save post:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }

  // Revalidate the admin list page so the change shows immediately.
  revalidatePath(`/admin/${adminSlugFor(category)}`);

  // On success, navigate back to the relevant admin list.
  redirect(`/admin/${adminSlugFor(category)}`);
}
