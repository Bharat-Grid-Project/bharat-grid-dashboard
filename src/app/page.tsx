"use client";

import { AppShell } from "@/components/shell/AppShell";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Server, Activity, Box, Zap, Network, HardDrive, Cpu, ShieldCheck } from "lucide-react";
import { KPIGrid, KPICard } from "@/components/ui/KPICard";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GlassCard } from "@/components/ui/GlassCard";

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

const columns: Column<MockDeployment>[] = [
  { key: "name", header: "Application", sortable: true, render: (item) => (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded bg-white/5 text-gray-300">
        <Box size={16} />
      </div>
      <span className="font-medium text-white">{item.name}</span>
    </div>
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

export default function Home() {
  const { mode } = useWorkspaceStore();

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {mode === "client" ? "Welcome back, Saif! 👋" : "Good evening, Saif! 👋"}
            </h1>
            <p className="text-gray-400 mt-1">
              {mode === "client" 
                ? "Deploy, Monitor and Scale your workloads across Bharat-Grid." 
                : "Your node is powering the future."}
            </p>
          </div>
          
          {mode === "client" && (
            <button className="bg-[var(--color-blue-500)] hover:bg-[#1E5FCE] text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(45,124,255,0.4)] flex items-center gap-2">
              <Zap size={18} />
              Deploy Workload
            </button>
          )}
        </div>

        {/* KPI Grid */}
        <KPIGrid className="mt-8">
          <KPICard 
            title={mode === "client" ? "Deployments" : "Active Nodes"} 
            value={mode === "client" ? "8" : "1 / 2"} 
            icon={mode === "client" ? Box : Server} 
            isActive
          />
          <KPICard 
            title={mode === "client" ? "Running" : "Compute Provided"} 
            value={mode === "client" ? "3" : "8.2 hrs"} 
            icon={Activity} 
            trend={{ value: 12.3, label: "vs yesterday", isPositive: true }}
          />
          <KPICard 
            title={mode === "client" ? "Compute Used" : "Earnings Today"} 
            value={mode === "client" ? "12 vCPU" : "₹54.20"} 
            icon={Cpu} 
          />
          <KPICard 
            title={mode === "client" ? "Network Availability" : "Reputation Score"} 
            value={mode === "client" ? "99.8%" : "4.8 / 5"} 
            icon={ShieldCheck} 
            trend={{ value: 0.6, label: "from last week", isPositive: true }}
          />
        </KPIGrid>

        {/* Data Table Preview */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            {mode === "client" ? "Active Deployments" : "Active Workloads"}
          </h2>
          <DataTable 
            data={MOCK_DEPLOYMENTS} 
            columns={columns} 
            keyExtractor={(item) => item.id} 
          />
        </div>
        
        {/* GlassCard Extra Example */}
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <StatusBadge status={i === 1 ? "live" : "healthy"} label=" " className="px-2" />
                  <span className="text-sm text-gray-300">System event logged at 10:42 PM</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>
    </AppShell>
  );
}
