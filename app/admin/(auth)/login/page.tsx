"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-primarybg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image src={logo} alt="Meristem Family Office" height={48} priority />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light2 px-8 py-10">
          <h1
            className="text-2xl font-semibold text-dark1 mb-1"
          >
            Admin sign in
          </h1>
          <p className="text-sm text-neutral mb-8">
            Enter your credentials to access the dashboard.
          </p>

          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {state.error}
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-dark1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-light2 bg-light1 px-4 py-3 text-sm text-dark1 placeholder:text-light3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-dark1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-light2 bg-light1 px-4 py-3 text-sm text-dark1 placeholder:text-light3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-yellow text-white font-medium text-sm rounded-lg px-4 py-3 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-light3 mt-6">
          Meristem Family Office — Admin Dashboard
        </p>
      </div>
    </div>
  );
}
