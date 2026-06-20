"use client";

import { useActionState } from "react";
import {
  changePasswordAction,
  type ChangePasswordState,
} from "@/app/admin/(dashboard)/profile/actions";

const inputClassName =
  "w-full rounded-lg border border-light2 bg-light1 px-4 py-3 text-base md:text-sm text-dark1 placeholder:text-light3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition min-h-11";

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<
    ChangePasswordState,
    FormData
  >(changePasswordAction, null);

  return (
    <form action={formAction} className="space-y-5">
      {state && "error" in state && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {state.error}
        </div>
      )}

      {state && "ok" in state && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
          Your password has been updated.
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium text-dark1"
        >
          Current password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className={inputClassName}
          placeholder="Enter your current password"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-dark1"
        >
          New password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={inputClassName}
          placeholder="At least 8 characters"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-dark1"
        >
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={inputClassName}
          placeholder="Re-enter your new password"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full sm:w-auto bg-yellow text-white font-medium text-sm rounded-lg px-6 py-3 min-h-11 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
