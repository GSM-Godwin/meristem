import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminTopbar from "@/components/admin/AdminTopbar";
import PostForm from "@/components/admin/PostForm";
import type { PostFormValues } from "@/lib/types/post-form";
import { PostCategory } from "@prisma/client";

const VALID_CATEGORIES: PostCategory[] = ["INSIGHT", "PERSPECTIVE", "PUBLICATION"];

const CATEGORY_LABEL: Record<PostCategory, string> = {
  INSIGHT: "Insight",
  PERSPECTIVE: "Perspective",
  PUBLICATION: "Publication",
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { category: rawCategory } = await searchParams;
  const requested = (rawCategory ?? "").toUpperCase() as PostCategory;
  const hasValidCategory = VALID_CATEGORIES.includes(requested);
  const category: PostCategory = hasValidCategory ? requested : "INSIGHT";

  const initialValues: PostFormValues = {
    title: "",
    shortDescription: "",
    featuredImage: "",
    writtenBy: "",
    category,
    status: "DRAFT",
    publishDate: todayIso(),
    featured: false,
    longDescription: "",
    fileUrl: "",
    comingSoon: false,
    sections: [],
  };

  return (
    <>
      <AdminTopbar
        title={`New ${hasValidCategory ? CATEGORY_LABEL[category] : "Post"}`}
      />
      <main className="flex-1 overflow-y-auto p-6">
        <PostForm
          initialValues={initialValues}
          lockCategory={hasValidCategory}
          mode="create"
        />
      </main>
    </>
  );
}
