"use client";

import { useWorkspaceStore } from "@/store/workspaceStore";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import {
  Home,
  Box,
  Cpu,
  Server,
  Activity,
  BarChart2,
  Settings,
  HelpCircle,
  Wallet,
  Clock,
  Layers
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CLIENT_NAV = [
  { name: "Overview", href: "/client/overview", icon: Home },
  { name: "Deployments", href: "/client/deployments", icon: Box },
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

export function Sidebar() {
  const { mode } = useWorkspaceStore();
  const pathname = usePathname();

  const navItems = mode === "client" ? CLIENT_NAV : PROVIDER_NAV;

  return (
    <div className="w-64 h-screen border-r border-[var(--color-glass-border)] bg-[var(--color-bg-900)]/80 backdrop-blur-xl flex flex-col glass-panel flex-shrink-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-glass-border)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-purple-500)] flex items-center justify-center">
            <Box size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-wide text-glow-primary">
            BHARAT-GRID
          </span>
        </div>
      </div>

      <WorkspaceSwitcher />

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="text-xs font-semibold text-gray-500 mb-3 px-3 tracking-widest uppercase">
          Navigation
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-[var(--color-blue-500)]/10 text-[var(--color-blue-500)] shadow-[inset_2px_0_0_0_var(--color-blue-500)]"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[var(--color-glass-bg)]"
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-[var(--color-glass-border)] space-y-1">
        {BOTTOM_NAV.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-gray-400 hover:text-gray-200 hover:bg-[var(--color-glass-bg)]"
          >
            <item.icon size={18} />
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
