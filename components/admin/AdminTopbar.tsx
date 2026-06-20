import { getSession } from "@/lib/auth";
import AdminMobileMenuButton from "./AdminMobileMenuButton";

interface AdminTopbarProps {
  title: string;
}

export default async function AdminTopbar({ title }: AdminTopbarProps) {
  const session = await getSession();
  const initials = session?.email
    ? session.email.slice(0, 2).toUpperCase()
    : "A";

  return (
    <header className="h-16 bg-white border-b border-light2 flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <AdminMobileMenuButton />
        <h1 className="text-xl font-semibold text-dark1 truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm text-neutral hidden sm:block truncate max-w-50">
          {session?.email}
        </span>
        <div className="w-8 h-8 rounded-full bg-yellow flex items-center justify-center text-white text-xs font-semibold shrink-0">
          {initials}
        </div>
      </div>
    </header>
  );
}
