"use client";

import { createContext, useContext } from "react";

export interface SidebarContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

export function useAdminSidebar() {
  return useContext(SidebarContext);
}
