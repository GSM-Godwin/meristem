import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AdminTopbar from "@/components/admin/AdminTopbar";
import InquiryStatusSelect from "@/components/admin/InquiryStatusSelect";

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) notFound();

  return (
    <>
      <AdminTopbar title="Inquiry" />

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Back link */}
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1.5 text-sm text-neutral hover:text-dark1 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            All inquiries
          </Link>

          {/* Main card */}
          <div className="bg-white rounded-xl border border-light2 divide-y divide-light2">
            <div className="px-4 md:px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-dark1">
                  {inquiry.name}
                </h2>
                <a
                  href={`mailto:${inquiry.email}`}
                  className="text-sm text-primary hover:text-yellow transition-colors mt-0.5 inline-block"
                >
                  {inquiry.email}
                </a>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-2">
                <InquiryStatusSelect id={inquiry.id} current={inquiry.status} />
                <span className="text-xs text-neutral">
                  {new Date(inquiry.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {" at "}
                  {new Date(inquiry.createdAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {/* Message body */}
            <div className="px-4 md:px-6 py-5">
              <p className="text-xs font-medium text-neutral uppercase tracking-wide mb-3">
                Message
              </p>
              <p className="text-sm text-dark1 whitespace-pre-wrap leading-relaxed">
                {inquiry.message}
              </p>
            </div>

            {/* Reply shortcut */}
            <div className="px-4 md:px-6 py-4 bg-light1 rounded-b-xl">
              <a
                href={`mailto:${inquiry.email}?subject=Re: Your inquiry`}
                className="inline-flex items-center gap-2 text-sm font-medium text-dark1 border border-light2 bg-white rounded-lg px-4 py-2 hover:border-primary transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Reply via email
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
