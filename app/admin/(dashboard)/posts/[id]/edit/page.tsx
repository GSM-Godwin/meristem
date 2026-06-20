import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminTopbar from "@/components/admin/AdminTopbar";
import PostForm from "@/components/admin/PostForm";
import type { PostFormValues, SectionDraft } from "@/lib/types/post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: { blocks: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!post) notFound();

  const sections: SectionDraft[] = post.sections.map((s) => {
    if (s.type === "QUOTE") {
      return {
        key: s.id,
        type: "QUOTE",
        heading: "",
        quoteText: s.quoteText ?? "",
        attribution: s.attribution ?? "",
        blocks: [],
      };
    }
    return {
      key: s.id,
      type: "CONTENT",
      heading: s.heading ?? "",
      quoteText: "",
      attribution: "",
      blocks: s.blocks.map((b) =>
        b.type === "IMAGE"
          ? { key: b.id, type: "IMAGE", text: "", imageUrl: b.imageUrl ?? "", videoUrl: "" }
          : b.type === "VIDEO"
          ? { key: b.id, type: "VIDEO", text: "", imageUrl: "", videoUrl: b.videoUrl ?? "" }
          : { key: b.id, type: "PARAGRAPH", text: b.text ?? "", imageUrl: "", videoUrl: "" }
      ),
    };
  });

  const initialValues: PostFormValues = {
    id: post.id,
    title: post.title,
    shortDescription: post.shortDescription,
    featuredImage: post.featuredImage,
    writtenBy: post.writtenBy,
    category: post.category,
    status: post.status,
    publishDate: post.publishDate.toISOString().slice(0, 10),
    featured: post.featured,
    longDescription: post.longDescription,
    fileUrl: post.fileUrl ?? "",
    comingSoon: post.comingSoon,
    sections,
  };

  return (
    <>
      <AdminTopbar title="Edit post" />
      <main className="flex-1 overflow-y-auto p-6">
        <PostForm initialValues={initialValues} lockCategory={false} mode="edit" />
      </main>
    </>
  );
}
