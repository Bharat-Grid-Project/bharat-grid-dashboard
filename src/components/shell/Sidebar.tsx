"use client";

import { useWorkspaceStore } from "@/store/workspaceStore";
import {
  Home,
  Box,
  Cpu,
  Server,
  Activity,
  BarChart2,
  Settings,
  HelpCircle,
  X,
  Lock
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CLIENT_NAV = [
  { name: "Overview", href: "/client/overview", icon: Home },
  { name: "Deployments", href: "/client/deployments", icon: Box },
  { name: "Cluster Monitor", href: "/client/cluster-monitor", icon: Activity },
  { name: "Blockchain Explorer", href: "/client/explorer", icon: Activity },
  { name: "Compute", href: "/client/compute", icon: Cpu },
  { name: "Nodes", href: "/client/nodes", icon: Server },
  { name: "Logs", href: "/client/logs", icon: Activity },
  { name: "Usage", href: "/client/usage", icon: BarChart2 },
];

const PROVIDER_NAV = [
  { name: "Overview", href: "/provider/overview", icon: Activity },
  { name: "My Nodes", href: "/provider/nodes", icon: Server },
  { name: "Workloads", href: "/provider/workloads", icon: Box },
  { name: "Resource Settings", href: "/provider/settings", icon: Settings },
];

const BOTTOM_NAV = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/support", icon: HelpCircle },
];

export function Sidebar({ onMobileClose }: { onMobileClose?: () => void }) {
  const { mode } = useWorkspaceStore();
  const pathname = usePathname();

  const navItems = mode === "client" ? CLIENT_NAV : PROVIDER_NAV;

  return (
    <div className="w-64 h-full border-r border-[var(--color-glass-border)] bg-canvas/95 backdrop-blur-xl flex flex-col glass-panel flex-shrink-0 shadow-2xl md:shadow-none relative">
      
      {/* Mobile Close Button */}
      {onMobileClose && (
        <button 
          onClick={onMobileClose}
          className="absolute top-4 right-4 md:hidden text-muted hover:text-main"
        >
          <X size={20} />
        </button>
      )}

      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-glass-border)] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center">
            <Box size={20} className="text-main" />
          </div>
          <span className="font-bold text-lg tracking-wide text-glow-primary">
            BHARAT-GRID
          </span>
        </div>
      </div>

      {/* Role Indicator Badge */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gradient-to-r from-main/[0.02] to-main/[0.05] border border-primary/20 shadow-[0_0_15px_var(--color-primary)]">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-0.5">Active Persona</span>
            <span className="text-sm font-bold text-primary">
              {mode === "client" ? "Client Workspace" : "Provider Workspace"}
            </span>
          </div>
          <Lock size={14} className="text-primary/50" />
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto pb-4 px-3 space-y-1">
        <div className="text-xs font-semibold text-muted mb-3 px-3 tracking-widest uppercase mt-2">
          Navigation
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-secondary/10 text-secondary shadow-[inset_2px_0_0_0_var(--color-secondary)]"
                  : "text-muted hover:text-main/90 hover:bg-[var(--color-glass-bg)]"
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-[var(--color-glass-border)] space-y-1 shrink-0">
        <Link
          href={`/${mode}/settings`}
          onClick={onMobileClose}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
            pathname === `/${mode}/settings` || pathname?.startsWith(`/${mode}/settings/`)
              ? "bg-secondary/10 text-secondary shadow-[inset_2px_0_0_0_var(--color-secondary)]"
              : "text-muted hover:text-main/90 hover:bg-[var(--color-glass-bg)]"
          }`}
        >
          <Settings size={18} />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <Link
          href={`/${mode}/support`}
          onClick={onMobileClose}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
            pathname === `/${mode}/support` || pathname?.startsWith(`/${mode}/support/`)
              ? "bg-secondary/10 text-secondary shadow-[inset_2px_0_0_0_var(--color-secondary)]"
              : "text-muted hover:text-main/90 hover:bg-[var(--color-glass-bg)]"
          }`}
        >
          <HelpCircle size={18} />
          <span className="font-medium text-sm">Help & Support</span>
        </Link>
      </div>
    </div>
  );
}
