import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminTopbar from "@/components/admin/AdminTopbar";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default async function AdminProfilePage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <>
      <AdminTopbar title="Profile" />

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-xl border border-light2 px-4 md:px-6 py-6 md:py-8">
            <h2 className="text-xl font-semibold text-dark1 mb-1">
              Account settings
            </h2>
            <p className="text-sm text-neutral mb-6">
              Signed in as{" "}
              <span className="font-medium text-dark1 break-all">
                {session.email}
              </span>
            </p>

            <div className="border-t border-light2 pt-6">
              <h3 className="text-base font-semibold text-dark1 mb-1">
                Change password
              </h3>
              <p className="text-sm text-neutral mb-5">
                Enter your current password, then choose a new one.
              </p>
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
