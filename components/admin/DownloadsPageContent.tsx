"use client";

import { useRouter } from "next/navigation";
import Pagination from "@/components/shared/Pagination";

export interface DownloadRow {
  id: string;
  email: string;
  phone: string;
  publicationTitle: string;
  downloadedAt: string;
}

export interface PublicationOption {
  id: string;
  title: string;
}

interface DownloadsPageContentProps {
  downloads: DownloadRow[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  publications: PublicationOption[];
  selectedPublicationId: string;
}

export default function DownloadsPageContent({
  downloads,
  totalCount,
  currentPage,
  totalPages,
  publications,
  selectedPublicationId,
}: DownloadsPageContentProps) {
  const router = useRouter();
  const filtered = selectedPublicationId !== "all";
  const exportPublicationHref = filtered
    ? `/api/admin/downloads/export?publication=${encodeURIComponent(selectedPublicationId)}`
    : "#";

  function buildUrl(page: number, publication: string) {
    const params = new URLSearchParams();
    if (publication !== "all") params.set("publication", publication);
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    return query ? `/admin/downloads?${query}` : "/admin/downloads";
  }

  function handlePublicationChange(publication: string) {
    router.push(buildUrl(1, publication));
  }

  function handlePageChange(page: number) {
    router.push(buildUrl(page, selectedPublicationId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral">
            <span className="shrink-0">Publication</span>
            <select
              value={selectedPublicationId}
              onChange={(e) => handlePublicationChange(e.target.value)}
              className="min-w-48 rounded-lg border border-light2 bg-white px-3 py-2 text-sm text-dark1 focus:border-primary outline-none"
            >
              <option value="all">All</option>
              {publications.map((publication) => (
                <option key={publication.id} value={publication.id}>
                  {publication.title}
                </option>
              ))}
            </select>
          </label>

          <p className="text-sm text-neutral">
            {totalCount} {totalCount === 1 ? "download" : "downloads"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/api/admin/downloads/export"
            className="inline-flex items-center justify-center rounded-lg border border-light2 bg-white px-4 py-2 text-sm font-medium text-dark1 hover:border-primary hover:text-primary transition-colors"
          >
            Export All
          </a>
          <a
            href={exportPublicationHref}
            aria-disabled={!filtered}
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filtered
                ? "bg-yellow text-white hover:opacity-90"
                : "bg-light2 text-neutral pointer-events-none opacity-60"
            }`}
          >
            Export This Publication
          </a>
        </div>
      </div>

      {downloads.length === 0 ? (
        <div className="bg-white rounded-xl border border-light2 px-6 py-16 text-center">
          <p className="text-sm text-neutral">No downloads recorded yet.</p>
        </div>
      ) : (
        <>
          <div className="md:hidden space-y-3 mb-6">
            {downloads.map((row) => (
              <div
                key={row.id}
                className="bg-white rounded-xl border border-light2 p-4 space-y-2"
              >
                <p className="font-medium text-dark1 text-sm break-all">{row.email}</p>
                <p className="text-xs text-neutral">{row.phone}</p>
                <p className="text-sm text-dark1">{row.publicationTitle}</p>
                <p className="text-xs text-neutral">{row.downloadedAt}</p>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white rounded-xl border border-light2 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-light2 bg-light1">
                  <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide">
                    Phone
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide">
                    Publication
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide">
                    Downloaded At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light2">
                {downloads.map((row) => (
                  <tr key={row.id} className="hover:bg-light1/60 transition-colors">
                    <td className="px-5 py-4 text-dark1 break-all">{row.email}</td>
                    <td className="px-5 py-4 text-neutral whitespace-nowrap">{row.phone}</td>
                    <td className="px-5 py-4 text-dark1">{row.publicationTitle}</td>
                    <td className="px-5 py-4 text-neutral whitespace-nowrap">{row.downloadedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}
