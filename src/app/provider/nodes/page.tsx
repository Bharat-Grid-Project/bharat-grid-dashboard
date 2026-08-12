"use client";

import { Server, Filter } from "lucide-react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

interface MockNode {
  id: string;
  name: string;
  status: "live" | "warning" | "offline" | "pending";
  location: string;
  specs: string;
  utilization: string;
}

const MOCK_NODES: MockNode[] = [
  { id: "node-1", name: "NODE-SAIF-01", status: "live", location: "Mumbai, IN", specs: "64 Cores / 128 GB RAM", utilization: "82%" },
  { id: "node-2", name: "NODE-SAIF-02", status: "live", location: "Bangalore, IN", specs: "32 Cores / 64 GB RAM", utilization: "45%" },
  { id: "node-3", name: "NODE-SAIF-03", status: "offline", location: "Delhi, IN", specs: "16 Cores / 32 GB RAM", utilization: "0%" },
  { id: "node-4", name: "NODE-SAIF-04-GPU", status: "warning", location: "Mumbai, IN", specs: "2x RTX 3090 / 64 GB RAM", utilization: "98%" },
];

export default function ProviderNodes() {
  const columns: Column<MockNode>[] = [
    { key: "name", header: "Node Identity", sortable: true, render: (item) => (
      <Link href={`/provider/nodes/${item.id}`} className="flex items-center gap-3 group">
        <div className="p-2 rounded bg-white/5 text-gray-300 group-hover:text-[var(--color-blue-500)] transition-colors">
          <Server size={16} />
        </div>
        <span className="font-medium text-white group-hover:text-[var(--color-blue-500)] transition-colors">{item.name}</span>
      </Link>
    ) },
    { key: "status", header: "Status", sortable: true, render: (item) => (
      <StatusBadge status={item.status} />
    ) },
    { key: "specs", header: "Hardware Specs", render: (item) => (
      <span className="text-gray-300 text-sm">{item.specs}</span>
    ) },
    { key: "location", header: "Location", sortable: true, render: (item) => (
      <span className="text-gray-400 text-sm">{item.location}</span>
    ) },
    { key: "utilization", header: "Utilization", sortable: true, render: (item) => (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm text-[var(--color-cyan-400)]">{item.utilization}</span>
      </div>
    ) },
    { key: "actions", header: "", render: (item) => (
      <Link href={`/provider/nodes/${item.id}`} className="text-[var(--color-blue-500)] hover:text-[var(--color-cyan-400)] text-sm font-medium transition-colors">
        View Dashboard →
      </Link>
    ) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">My Contributed Nodes</h1>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-800)] border border-[var(--color-glass-border)] rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <GlassCard className="p-0 border-0 bg-transparent">
        <DataTable data={MOCK_NODES} columns={columns} keyExtractor={(item) => item.id} />
      </GlassCard>
    </div>
  );
}
