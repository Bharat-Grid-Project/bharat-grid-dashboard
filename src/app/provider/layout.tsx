"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  const { setMode } = useWorkspaceStore();

  // Ensure mode is set to provider when visiting any /provider route directly
  useEffect(() => {
    setMode("provider");
  }, [setMode]);

  return <AppShell>{children}</AppShell>;
}
