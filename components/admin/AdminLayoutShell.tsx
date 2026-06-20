"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { SidebarContext } from "./AdminSidebarContext";

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggle: () => setIsOpen((v) => !v),
        close: () => setIsOpen(false),
      }}
    >
      <div className="flex h-screen overflow-hidden bg-light1">
        <AdminSidebar />

        {isOpen && (
          <div
            role="presentation"
            aria-hidden="true"
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden min-w-0 lg:ml-60">
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
