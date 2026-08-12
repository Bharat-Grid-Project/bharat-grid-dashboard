"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { setMode } = useWorkspaceStore();

  // Ensure mode is set to client when visiting any /client route directly
  useEffect(() => {
    setMode("client");
  }, [setMode]);

  return <AppShell>{children}</AppShell>;
}
