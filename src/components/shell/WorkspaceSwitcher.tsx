"use client";

import { useWorkspaceStore } from "@/store/workspaceStore";
import { Server, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function WorkspaceSwitcher() {
  const { mode, setMode } = useWorkspaceStore();
  const router = useRouter();

  const handleToggle = () => {
    if (mode === "client") {
      setMode("provider");
      router.push("/provider/overview");
    } else {
      setMode("client");
      router.push("/client/overview");
    }
  };

  return (
    <div className="p-4 border-b border-[var(--color-glass-border)]">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-3 rounded-lg bg-card hover:bg-card/80 transition-colors border border-[var(--color-glass-border)] group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-canvas text-secondary group-hover:text-primary transition-colors">
            {mode === "client" ? <User size={18} /> : <Server size={18} />}
          </div>
          <div className="text-left">
            <div className="text-xs text-muted font-medium uppercase tracking-wider">
              Active Workspace
            </div>
            <div className="text-sm font-semibold text-[var(--color-text-900)] flex items-center gap-2">
              {mode === "client" ? "Client" : "Provider"}
              <span className="text-[10px] bg-secondary/20 text-secondary px-1.5 py-0.5 rounded">
                Mode
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
