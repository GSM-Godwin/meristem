"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";
import { sendInsightCampaign } from "@/lib/mailchimp";
import { siteUrl } from "@/lib/email";
import type { PostFormValues } from "@/lib/types/post-form";
import type { PostCategory, Prisma } from "@prisma/client";

function adminSlugFor(category: PostCategory): string {
  return category === "INSIGHT"
    ? "insights"
    : category === "PERSPECTIVE"
    ? "perspectives"
    : "publications";
}

function revalidatePublicPost(category: PostCategory, slug: string) {
  revalidatePath("/insights");
  if (category === "INSIGHT") {
    revalidatePath("/insights/all");
    revalidatePath(`/insights/${slug}`);
  } else if (category === "PERSPECTIVE") {
    revalidatePath("/");
    revalidatePath("/perspectives");
    revalidatePath(`/perspectives/${slug}`);
  } else {
    revalidatePath("/publications");
    revalidatePath(`/publications/${slug}`);
  }
}

export async function deletePostAction(formData: FormData) {
  const session = await getSession();
  if (!session) return;

  const id = formData.get("id") as string;
  if (!id) return;

  const post = await prisma.post.findUnique({
    where: { id },
    select: { category: true, slug: true },
  });

  if (!post) return;

  await prisma.post.delete({ where: { id } });

  revalidatePath(`/admin/${adminSlugFor(post.category)}`);
  revalidatePublicPost(post.category, post.slug);
}

type SaveResult = { error: string };

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
                videoUrl: null,
              }
            : block.type === "VIDEO"
            ? {
                type: "VIDEO" as const,
                order: blockIndex,
                text: null,
                imageUrl: null,
                videoUrl: block.videoUrl,
              }
            : {
                type: "PARAGRAPH" as const,
                order: blockIndex,
                text: block.text.trim(),
                imageUrl: null,
                videoUrl: null,
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
        if (block.type === "VIDEO" && !block.videoUrl) {
          return `Section ${i + 1}, block ${j + 1}: video not uploaded.`;
        }
      }
    } else {
      if (!section.quoteText.trim()) {
        return `Section ${i + 1}: quote text is required.`;
      }
    }
  }

  if (values.status === "PUBLISHED") {
    if (values.category === "PUBLICATION" && !values.fileUrl.trim()) {
      return "A PDF is required to publish a Publication. Upload one, or save as a draft.";
    }
    if (values.category === "PERSPECTIVE") {
      const hasVideo = values.sections.some(
        (s) => s.type === "CONTENT" && s.blocks.some((b) => b.type === "VIDEO")
      );
      if (!hasVideo) {
        return "A Perspective must include at least one video block to be published. Add a video, or save as a draft.";
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

  const isPublication = values.category === "PUBLICATION";

  const baseData = {
    title: values.title.trim(),
    shortDescription: values.shortDescription.trim(),
    longDescription: values.longDescription.trim(),
    featuredImage: values.featuredImage,
    writtenBy: values.writtenBy.trim(),
    category: values.category,
    status: values.status,
    featured: values.featured,
    fileUrl: isPublication ? values.fileUrl.trim() || null : null,
    comingSoon: isPublication ? values.comingSoon : false,
    publishDate,
  };

  const sectionsCreate = buildSectionsCreate(values.sections);

  let category: PostCategory = values.category;

  let newlyPublishedInsightSlug: string | null = null;
  let revalidateSlug = "";
  let priorCategory: PostCategory | undefined;

  try {
    if (values.id) {
      const existing = await prisma.post.findUnique({
        where: { id: values.id },
        select: { id: true, category: true, status: true, slug: true },
      });
      if (!existing) return { error: "Post not found." };

      await prisma.$transaction([
        prisma.section.deleteMany({ where: { postId: values.id } }),
        prisma.post.update({
          where: { id: values.id },
          data: {
            ...baseData,
            sections: { create: sectionsCreate },
          },
        }),
      ]);

      category = existing.category;
      revalidateSlug = existing.slug;
      priorCategory = existing.category;

      if (
        values.category === "INSIGHT" &&
        values.status === "PUBLISHED" &&
        existing.status !== "PUBLISHED"
      ) {
        newlyPublishedInsightSlug = existing.slug;
      }
    } else {
      const slug = await generateUniqueSlug(values.title);
      revalidateSlug = slug;

      await prisma.post.create({
        data: {
          ...baseData,
          slug,
          sections: { create: sectionsCreate },
        },
      });

      if (values.category === "INSIGHT" && values.status === "PUBLISHED") {
        newlyPublishedInsightSlug = slug;
      }
    }
  } catch (err) {
    console.error("Failed to save post:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }

  if (newlyPublishedInsightSlug) {
    await sendInsightCampaign({
      title: baseData.title,
      shortDescription: baseData.shortDescription,
      url: `${siteUrl()}/insights/${newlyPublishedInsightSlug}`,
    });
  }

  revalidatePath(`/admin/${adminSlugFor(category)}`);
  revalidatePublicPost(values.category, revalidateSlug);
  if (priorCategory && priorCategory !== values.category) {
    revalidatePath(`/admin/${adminSlugFor(priorCategory)}`);
    revalidatePublicPost(priorCategory, revalidateSlug);
  }

  redirect(`/admin/${adminSlugFor(category)}`);
}
