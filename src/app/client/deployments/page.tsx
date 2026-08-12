"use client";

import { Box, Filter } from "lucide-react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

interface MockDeployment {
  id: string;
  name: string;
  status: "live" | "warning" | "offline" | "pending";
  node: string;
  uptime: string;
  resources: string;
}

const MOCK_DEPLOYMENTS: MockDeployment[] = [
  { id: "dep-1", name: "AI-Worker-v2.1", status: "live", node: "NODE-SAIF-01", uptime: "2h 14m", resources: "2 vCPU / 4 GB" },
  { id: "dep-2", name: "API-Service-v1.3", status: "live", node: "NODE-042", uptime: "8h 21m", resources: "2 vCPU / 4 GB" },
  { id: "dep-3", name: "Data-Processor-v1.0", status: "offline", node: "NODE-019", uptime: "-", resources: "4 vCPU / 16 GB" },
  { id: "dep-4", name: "Web-App-v3.0", status: "warning", node: "NODE-087", uptime: "1d 4h", resources: "1 vCPU / 2 GB" },
  { id: "dep-5", name: "Cache-Redis-v7", status: "live", node: "NODE-011", uptime: "5d 12h", resources: "2 vCPU / 8 GB" },
];

export default function ClientDeployments() {
  const columns: Column<MockDeployment>[] = [
    { key: "name", header: "Application", sortable: true, render: (item) => (
      <Link href={`/client/deployments/${item.id}`} className="flex items-center gap-3 group">
        <div className="p-2 rounded bg-white/5 text-gray-300 group-hover:text-[var(--color-blue-500)] transition-colors">
          <Box size={16} />
        </div>
        <span className="font-medium text-white group-hover:text-[var(--color-blue-500)] transition-colors">{item.name}</span>
      </Link>
    ) },
    { key: "status", header: "Status", sortable: true, render: (item) => (
      <StatusBadge status={item.status} />
    ) },
    { key: "node", header: "Assigned Node", render: (item) => (
      <span className="text-gray-300 font-mono text-sm">{item.node}</span>
    ) },
    { key: "resources", header: "Resources", sortable: true, render: (item) => (
      <span className="text-gray-400 text-sm">{item.resources}</span>
    ) },
    { key: "uptime", header: "Runtime", sortable: true, render: (item) => (
      <span className="text-gray-400 text-sm">{item.uptime}</span>
    ) },
    { key: "actions", header: "", render: (item) => (
      <Link href={`/client/deployments/${item.id}`} className="text-[var(--color-blue-500)] hover:text-[var(--color-cyan-400)] text-sm font-medium transition-colors">
        View Details →
      </Link>
    ) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">All Deployments</h1>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-800)] border border-[var(--color-glass-border)] rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <GlassCard className="p-0 border-0 bg-transparent">
        <DataTable data={MOCK_DEPLOYMENTS} columns={columns} keyExtractor={(item) => item.id} />
      </GlassCard>
    </div>
  );
}
