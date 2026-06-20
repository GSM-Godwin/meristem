import { prisma } from "@/lib/prisma";
import { PostCategory } from "@prisma/client";
import Link from "next/link";
import AdminTopbar from "./AdminTopbar";
import DeletePostButton from "./DeletePostButton";

interface Props {
  category: PostCategory;
  title: string;
}

const CATEGORY_LABEL: Record<PostCategory, string> = {
  INSIGHT: "Insight",
  PERSPECTIVE: "Perspective",
  PUBLICATION: "Publication",
};

export default async function PostListPage({ category, title }: Props) {
  const posts = await prisma.post.findMany({
    where: { category },
    orderBy: { publishDate: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      publishDate: true,
      slug: true,
      featured: true,
    },
  });

  const addHref = `/admin/posts/new?category=${category}`;

  return (
    <>
      <AdminTopbar title={title} />

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral">
            {posts.length} {posts.length === 1 ? CATEGORY_LABEL[category] : title.toLowerCase()}
          </p>
          <Link
            href={addHref}
            className="inline-flex items-center gap-2 bg-yellow text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add new
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-xl border border-light2 px-6 py-16 text-center">
            <p className="text-neutral text-sm mb-4">No {title.toLowerCase()} yet.</p>
            <Link
              href={addHref}
              className="inline-flex items-center gap-2 bg-yellow text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Add your first {CATEGORY_LABEL[category].toLowerCase()}
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile stacked cards — hidden on md+ */}
            <div className="md:hidden space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl border border-light2 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-dark1 text-sm leading-snug line-clamp-2">
                        {post.title}
                      </p>
                      <p className="text-xs text-light3 mt-0.5 truncate">/{post.slug}</p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        post.status === "PUBLISHED"
                          ? "bg-green-50 text-green-700"
                          : "bg-light2 text-neutral"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          post.status === "PUBLISHED" ? "bg-green-500" : "bg-light3"
                        }`}
                      />
                      {post.status === "PUBLISHED" ? "Published" : "Draft"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-neutral">
                    <span>
                      {new Date(post.publishDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {post.featured && (
                      <span className="text-yellow font-medium">Featured</span>
                    )}
                  </div>

                  <div className="flex items-center gap-5 pt-2 border-t border-light2">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-sm font-medium text-primary hover:text-yellow transition-colors py-1"
                    >
                      Edit
                    </Link>
                    <DeletePostButton id={post.id} />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table — hidden on mobile */}
            <div className="hidden md:block bg-white rounded-xl border border-light2 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-light2 bg-light1">
                    <th className="text-left px-5 py-3 font-medium text-neutral text-xs uppercase tracking-wide">
                      Title
                    </th>
                    <th className="text-left px-5 py-3 font-medium text-neutral text-xs uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-left px-5 py-3 font-medium text-neutral text-xs uppercase tracking-wide hidden lg:table-cell">
                      Date
                    </th>
                    <th className="text-left px-5 py-3 font-medium text-neutral text-xs uppercase tracking-wide hidden lg:table-cell">
                      Featured
                    </th>
                    <th className="px-5 py-3" aria-label="Actions" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-light2">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-light1/60 transition-colors group">
                      <td className="px-5 py-4">
                        <span className="font-medium text-dark1 group-hover:text-yellow transition-colors line-clamp-2">
                          {post.title}
                        </span>
                        <span className="block text-xs text-light3 mt-0.5 truncate max-w-xs">
                          /{post.slug}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                            post.status === "PUBLISHED"
                              ? "bg-green-50 text-green-700"
                              : "bg-light2 text-neutral"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              post.status === "PUBLISHED" ? "bg-green-500" : "bg-light3"
                            }`}
                          />
                          {post.status === "PUBLISHED" ? "Published" : "Draft"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-neutral hidden lg:table-cell">
                        {new Date(post.publishDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-5 py-4 hidden lg:table-cell">
                        {post.featured ? (
                          <span className="text-xs font-medium text-yellow">Featured</span>
                        ) : (
                          <span className="text-xs text-light3">—</span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="text-sm text-primary hover:text-yellow transition-colors"
                          >
                            Edit
                          </Link>
                          <DeletePostButton id={post.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </>
  );
}
