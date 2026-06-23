import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminTopbar from "@/components/admin/AdminTopbar";
import DownloadsPageContent from "@/components/admin/DownloadsPageContent";

const PER_PAGE = 20;

function formatDownloadDate(date: Date): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; publication?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { page: pageParam, publication: publicationParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const selectedPublicationId = publicationParam ?? "all";

  const where =
    selectedPublicationId !== "all"
      ? { publicationId: selectedPublicationId }
      : {};

  const [totalCount, downloads, publications] = await Promise.all([
    prisma.publicationDownload.count({ where }),
    prisma.publicationDownload.findMany({
      where,
      include: { publication: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.post.findMany({
      where: { category: "PUBLICATION" },
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));
  const page = Math.min(currentPage, totalPages);

  return (
    <>
      <AdminTopbar title="Downloads" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <DownloadsPageContent
          downloads={downloads.map((row) => ({
            id: row.id,
            email: row.email,
            phone: row.phone,
            publicationTitle: row.publication.title,
            downloadedAt: formatDownloadDate(row.createdAt),
          }))}
          totalCount={totalCount}
          currentPage={page}
          totalPages={totalPages}
          publications={publications}
          selectedPublicationId={selectedPublicationId}
        />
      </main>
    </>
  );
}
