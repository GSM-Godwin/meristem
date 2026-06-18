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

export default async function InquiriesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminTopbar title="Inquiries" />

      <main className="flex-1 overflow-y-auto p-6">
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
          <div className="bg-white rounded-xl border border-light2 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-light2 bg-light1">
                  <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-neutral uppercase tracking-wide hidden md:table-cell">
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
                    <td className="px-5 py-4 text-neutral hidden sm:table-cell">
                      {inq.email}
                    </td>
                    <td className="px-5 py-4 text-neutral hidden md:table-cell">
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
        )}
      </main>
    </>
  );
}
