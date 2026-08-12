"use client";

import { Server, Activity, Box, Zap, Cpu, ShieldCheck } from "lucide-react";
import { KPIGrid, KPICard } from "@/components/ui/KPICard";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MockDeployment {
  id: string;
  name: string;
  status: "live" | "warning" | "offline" | "pending";
  node: string;
  uptime: string;
}

const MOCK_DEPLOYMENTS: MockDeployment[] = [
  { id: "dep-1", name: "AI-Worker-v2.1", status: "live", node: "NODE-SAIF-01", uptime: "2h 14m" },
  { id: "dep-2", name: "API-Service-v1.3", status: "live", node: "NODE-042", uptime: "8h 21m" },
  { id: "dep-3", name: "Data-Processor-v1.0", status: "offline", node: "NODE-019", uptime: "-" },
  { id: "dep-4", name: "Web-App-v3.0", status: "warning", node: "NODE-087", uptime: "1d 4h" },
];

export default function ClientOverview() {
  const router = useRouter();

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
    { key: "uptime", header: "Runtime", sortable: true, render: (item) => (
      <span className="text-gray-400">{item.uptime}</span>
    ) },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome back, Saif! 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Deploy, Monitor and Scale your workloads across Bharat-Grid.
          </p>
        </div>
        
        <button 
          onClick={() => router.push("/client/deploy")}
          className="bg-[var(--color-blue-500)] hover:bg-[#1E5FCE] text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(45,124,255,0.4)] flex items-center gap-2"
        >
          <Zap size={18} />
          Deploy Workload
        </button>
      </div>

      {/* KPI Grid */}
      <KPIGrid className="mt-8">
        <KPICard title="Deployments" value="8" icon={Box} isActive />
        <KPICard title="Running" value="3" icon={Activity} trend={{ value: 12.3, label: "vs yesterday", isPositive: true }} />
        <KPICard title="Compute Used" value="12 vCPU" icon={Cpu} />
        <KPICard title="Network Availability" value="99.8%" icon={ShieldCheck} trend={{ value: 0.6, label: "from last week", isPositive: true }} />
      </KPIGrid>

      {/* Data Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Active Deployments</h2>
        <DataTable data={MOCK_DEPLOYMENTS} columns={columns} keyExtractor={(item) => item.id} />
      </div>
      
      {/* Visual Map Placeholder & Activity */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Network Status Overview</h3>
          <div className="flex items-center justify-center h-40 border border-dashed border-gray-700/50 rounded-lg">
            <span className="text-gray-500 text-sm">Visual Map Placeholder</span>
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <StatusBadge status="live" label=" " className="px-2" />
              <span className="text-sm text-gray-300">MyAIApplication deployed successfully</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status="warning" label=" " className="px-2" />
              <span className="text-sm text-gray-300">Deployment migrated to NODE-087</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status="healthy" label=" " className="px-2" />
              <span className="text-sm text-gray-300">API-Service restarted</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
