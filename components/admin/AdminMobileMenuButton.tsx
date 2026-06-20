"use client";

import { useAdminSidebar } from "./AdminSidebarContext";

export default function AdminMobileMenuButton() {
  const { toggle } = useAdminSidebar();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Open navigation menu"
      className="lg:hidden p-2 -ml-1 rounded-lg text-neutral hover:bg-light1 hover:text-dark1 transition-colors"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}
