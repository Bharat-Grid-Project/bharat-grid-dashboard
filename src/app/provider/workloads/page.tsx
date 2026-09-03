"use client";

import { Box, Filter, Cpu, Server } from "lucide-react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GlassCard } from "@/components/ui/GlassCard";

interface MockHostedWorkload {
  id: string;
  name: string;
  status: "live" | "warning" | "offline" | "pending";
  node: string;
  tenant: string;
  compute: string;
  uptime: string;
  earnings: string;
}

const MOCK_HOSTED: MockHostedWorkload[] = [
  { id: "hw-1", name: "AI-Model-Inference", status: "live", node: "NODE-ALPHA-01", tenant: "0x8F9...2A1B", compute: "8 vCPU / 16GB", uptime: "2d 4h", earnings: "142 BGT" },
  { id: "hw-2", name: "DB-Replica", status: "live", node: "NODE-ALPHA-01", tenant: "0x1C4...9D4F", compute: "2 vCPU / 8GB", uptime: "14d 8h", earnings: "580 BGT" },
  { id: "hw-3", name: "Global-CDN-Relay", status: "live", node: "NODE-ALPHA-02", tenant: "0x7E2...3B9C", compute: "4 vCPU / 8GB", uptime: "5d 12h", earnings: "245 BGT" },
  { id: "hw-4", name: "Data-Pipeline-Worker", status: "warning", node: "NODE-ALPHA-04-GPU", tenant: "0x3A1...8C2D", compute: "12 vCPU / 32GB", uptime: "8h 45m", earnings: "89 BGT" },
];

export default function ProviderWorkloads() {
  const columns: Column<MockHostedWorkload>[] = [
    { key: "name", header: "Workload Name", sortable: true, render: (item) => (
      <div className="flex items-center gap-3 group">
        <div className="p-2 rounded bg-main/5 text-main/80">
          <Box size={16} />
        </div>
        <span className="font-medium text-main">{item.name}</span>
      </div>
    ) },
    { key: "tenant", header: "Tenant (Client)", render: (item) => (
      <span className="text-main/80 font-mono text-sm">{item.tenant}</span>
    ) },
    { key: "status", header: "Status", sortable: true, render: (item) => (
      <StatusBadge status={item.status} />
    ) },
    { key: "node", header: "Hosted On", sortable: true, render: (item) => (
      <div className="flex items-center gap-2 text-sm text-main/80">
        <Server size={14} className="text-secondary" />
        {item.node}
      </div>
    ) },
    { key: "compute", header: "Resources Used", sortable: true, render: (item) => (
      <div className="flex items-center gap-2 text-sm text-muted">
        <Cpu size={14} className="text-primary" />
        {item.compute}
      </div>
    ) },
    { key: "uptime", header: "Uptime", sortable: true, render: (item) => (
      <span className="text-muted text-sm">{item.uptime}</span>
    ) },
    { key: "earnings", header: "Generated", sortable: true, render: (item) => (
      <span className="font-medium text-warning text-sm">{item.earnings}</span>
    ) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-main tracking-tight">Hosted Workloads</h1>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-[var(--color-glass-border)] rounded-lg text-sm font-medium text-main/80 hover:text-main transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <GlassCard className="p-0 border-0 bg-transparent">
        <DataTable data={MOCK_HOSTED} columns={columns} keyExtractor={(item) => item.id} />
      </GlassCard>
    </div>
  );
}
