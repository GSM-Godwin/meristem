import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [insightCount, perspectiveCount, publicationCount, openInquiryCount, recentPosts, recentInquiries] =
    await Promise.all([
      prisma.post.count({ where: { category: "INSIGHT" } }),
      prisma.post.count({ where: { category: "PERSPECTIVE" } }),
      prisma.post.count({ where: { category: "PUBLICATION" } }),
      prisma.inquiry.count({ where: { status: { not: "RESOLVED" } } }),
      prisma.post.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: { id: true, title: true, category: true, status: true, updatedAt: true },
      }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, status: true, createdAt: true },
      }),
    ]);

  const stats = [
    { label: "Insights", count: insightCount, href: "/admin/insights", color: "bg-yellow" },
    { label: "Perspectives", count: perspectiveCount, href: "/admin/perspectives", color: "bg-primary" },
    { label: "Publications", count: publicationCount, href: "/admin/publications", color: "bg-dark1" },
    { label: "Open Inquiries", count: openInquiryCount, href: "/admin/inquiries", color: "bg-neutral" },
  ];

  const categorySlug: Record<string, string> = {
    INSIGHT: "insights",
    PERSPECTIVE: "perspectives",
    PUBLICATION: "publications",
  };

  return (
    <>
      <AdminTopbar title="Dashboard" />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="bg-white rounded-xl border border-light2 p-5 hover:shadow-sm transition-shadow group"
            >
              <p className="text-sm text-neutral mb-1 group-hover:text-dark1 transition-colors">
                {s.label}
              </p>
              <p className="text-3xl font-semibold text-dark1">{s.count}</p>
              <div className={`mt-3 h-1 w-8 rounded-full ${s.color}`} />
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-light2">
            <div className="px-5 py-4 border-b border-light2 flex items-center justify-between">
              <h2 className="font-medium text-dark1 text-sm">Recent posts</h2>
              <Link href="/admin/insights" className="text-xs text-primary hover:text-yellow transition-colors">
                View all →
              </Link>
            </div>
            <ul className="divide-y divide-light2">
              {recentPosts.length === 0 && (
                <li className="px-5 py-4 text-sm text-neutral">No posts yet.</li>
              )}
              {recentPosts.map((post) => (
                <li key={post.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-dark1 truncate">{post.title}</p>
                    <p className="text-xs text-neutral mt-0.5">
                      {post.category.charAt(0) + post.category.slice(1).toLowerCase()} ·{" "}
                      {new Date(post.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                      post.status === "PUBLISHED"
                        ? "bg-green-50 text-green-700"
                        : "bg-light2 text-neutral"
                    }`}
                  >
                    {post.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-light2">
            <div className="px-5 py-4 border-b border-light2 flex items-center justify-between">
              <h2 className="font-medium text-dark1 text-sm">Recent inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs text-primary hover:text-yellow transition-colors">
                View all →
              </Link>
            </div>
            <ul className="divide-y divide-light2">
              {recentInquiries.length === 0 && (
                <li className="px-5 py-4 text-sm text-neutral">No inquiries yet.</li>
              )}
              {recentInquiries.map((inq) => (
                <li key={inq.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-dark1 truncate">{inq.name}</p>
                    <p className="text-xs text-neutral mt-0.5 truncate">{inq.email}</p>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                      inq.status === "NEW"
                        ? "bg-yellow/10 text-yellow"
                        : inq.status === "CONTACTED"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-light2 text-neutral"
                    }`}
                  >
                    {inq.status.charAt(0) + inq.status.slice(1).toLowerCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
