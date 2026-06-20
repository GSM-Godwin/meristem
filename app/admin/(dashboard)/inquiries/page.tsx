import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminTopbar from "@/components/admin/AdminTopbar";
import InquiryStatusSelect from "@/components/admin/InquiryStatusSelect";
import type { InquiryStatus } from "@prisma/client";

const STATUS_BADGE: Record<InquiryStatus, string> = {
  NEW: "bg-yellow/10 text-yellow",
  CONTACTED: "bg-blue-50 text-blue-700",
  RESOLVED: "bg-light2 text-neutral",
};

const STATUS_LABEL: Record<InquiryStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  RESOLVED: "Resolved",
};

export default async function InquiriesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminTopbar title="Inquiries" />

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral">
            {inquiries.length} {inquiries.length === 1 ? "inquiry" : "inquiries"}
          </p>
        </div>

        {inquiries.length === 0 ? (
          <div className="bg-white rounded-xl border border-light2 px-6 py-16 text-center">
            <p className="text-sm text-neutral">No inquiries yet.</p>
          </div>
        ) : (
          <>
            {/* Mobile stacked cards — hidden on md+ */}
            <div className="md:hidden space-y-3">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white rounded-xl border border-light2 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-dark1 text-sm">{inq.name}</p>
                      <p className="text-xs text-neutral mt-0.5 truncate">{inq.email}</p>
                      {inq.phone && (
                        <p className="text-xs text-neutral mt-0.5 truncate">{inq.phone}</p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_BADGE[inq.status]}`}
                    >
                      {STATUS_LABEL[inq.status]}
                    </span>
                  </div>

                  <p className="text-xs text-neutral">
                    {new Date(inq.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-light2">
                    <InquiryStatusSelect id={inq.id} current={inq.status} />
                    <Link
                      href={`/admin/inquiries/${inq.id}`}
                      className="text-sm font-medium text-primary hover:text-yellow transition-colors py-1 shrink-0"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table — hidden on mobile */}
            <div className="hidden md:block bg-white rounded-xl border border-light2 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-light2 bg-light1">
                    <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide">
                      Name
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide">
                      Email
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide hidden lg:table-cell">
                      Phone
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide hidden lg:table-cell">
                      Date
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-light2">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-light1/60 transition-colors group">
                      <td className="px-5 py-4">
                        <span className="font-medium text-dark1">{inq.name}</span>
                      </td>
                      <td className="px-5 py-4 text-neutral">
                        {inq.email}
                      </td>
                      <td className="px-5 py-4 text-neutral hidden lg:table-cell">
                        {inq.phone ?? ""}
                      </td>
                      <td className="px-5 py-4 text-neutral hidden lg:table-cell">
                        {new Date(inq.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4">
                        <InquiryStatusSelect id={inq.id} current={inq.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/inquiries/${inq.id}`}
                          className="text-sm text-primary hover:text-yellow transition-colors"
                        >
                          View →
                        </Link>
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
