import AdminSidebar from "@/components/admin/AdminSidebar";

// Admin pages are always server-rendered on demand — never prerendered.
// This prevents build-time Prisma calls hitting a sleeping database.
export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-light1">
      <AdminSidebar />
      {/* Offset main area by sidebar width */}
      <div className="flex-1 flex flex-col overflow-hidden ml-60">
        {children}
      </div>
    </div>
  );
}
