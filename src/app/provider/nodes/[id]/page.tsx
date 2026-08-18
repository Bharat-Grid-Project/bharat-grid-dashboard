"use client";

import { use } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Server, ArrowLeft, Cpu, HardDrive, Network, ShieldCheck, Box, Activity } from "lucide-react";
import Link from "next/link";
import { KPIGrid, KPICard } from "@/components/ui/KPICard";
import { DataTable, Column } from "@/components/ui/DataTable";

export default function NodeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const mockWorkloads = [
    { id: "w-1", name: "AI-Model-Inference", status: "live", compute: "8 vCPU / 16GB" },
    { id: "w-2", name: "DB-Replica", status: "live", compute: "2 vCPU / 8GB" },
  ];

  const columns: Column<any>[] = [
    { key: "name", header: "Workload Name", render: (item) => (
      <div className="flex items-center gap-3">
        <Box size={16} className="text-muted" />
        <span className="font-medium text-main">{item.name}</span>
      </div>
    ) },
    { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
    { key: "compute", header: "Allocated Resources", render: (item) => <span className="text-main/80 font-mono text-sm">{item.compute}</span> },
  ];

  return (
    <div className="space-y-6">
      
      {/* Back navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <Link href="/provider/nodes" className="inline-flex items-center gap-2 text-sm text-muted hover:text-secondary transition-colors mb-4">
            <ArrowLeft size={16} /> Back to My Nodes
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-muted">
              <Server size={20} className="text-main" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-main tracking-tight flex items-center gap-3">
                {id.toUpperCase()}
                <StatusBadge status="live" label="Online" />
              </h1>
              <p className="text-sm text-primary font-mono mt-1">IP: 192.168.1.104 • Mumbai, IN</p>
            </div>
          </div>
        </div>

        {/* Node Status Controls */}
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-card border border-[var(--color-glass-border)] rounded-lg text-sm font-medium text-main/80 hover:text-main hover:bg-[var(--color-glass-bg)] transition-colors">
            Run Diagnostics
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <KPIGrid>
        <KPICard title="Node Uptime" value="14d 8h" icon={ShieldCheck} isActive />
        <KPICard title="Workloads Hosted" value="2" icon={Box} />
        <KPICard title="Points Generated" value="840 BGT" icon={Zap} trend={{ value: 45, label: "last 24h", isPositive: true }} />
        <KPICard title="Network Latency" value="14ms" icon={Network} />
      </KPIGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Hardware Specs & Telemetry */}
        <div className="space-y-6 lg:col-span-1">
          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Hardware Specs</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-main/5">
                <span className="text-sm text-muted">Processor</span>
                <span className="text-sm font-medium text-main/90">AMD EPYC 7742 (64c)</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-main/5">
                <span className="text-sm text-muted">Memory</span>
                <span className="text-sm font-medium text-main/90">128 GB DDR4 ECC</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-main/5">
                <span className="text-sm text-muted">Storage</span>
                <span className="text-sm font-medium text-main/90">2 TB NVMe SSD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">OS</span>
                <span className="text-sm font-medium text-main/90">Ubuntu 22.04 LTS</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity size={16} /> Live Utilization
            </h3>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-main/80"><Cpu size={14} /> CPU</span>
                  <span className="font-mono text-primary">82%</span>
                </div>
                <div className="h-2 w-full bg-card rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: '82%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-main/80"><HardDrive size={14} /> RAM</span>
                  <span className="font-mono text-tertiary">45%</span>
                </div>
                <div className="h-2 w-full bg-card rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-tertiary rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-main/80"><Server size={14} /> Disk I/O</span>
                  <span className="font-mono text-muted">12 MB/s</span>
                </div>
                <div className="h-2 w-full bg-card rounded-full overflow-hidden">
                  <div className="h-full bg-muted rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Workloads & Graphs */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-5 h-64 flex flex-col">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Performance History</h3>
            <div className="flex-1 border border-dashed border-main/20/50 rounded-lg flex items-center justify-center">
              <span className="text-muted text-sm">Interactive Graph Placeholder</span>
            </div>
          </GlassCard>

          <div>
            <h3 className="text-lg font-semibold text-main mb-4">Assigned Workloads</h3>
            <GlassCard className="p-0 border-0 bg-transparent">
              <DataTable data={mockWorkloads} columns={columns} keyExtractor={(item) => item.id} />
            </GlassCard>
          </div>
        </div>

      </div>
    </div>
  );
}

// Needed to import Zap for the KPI Grid
import { Zap } from "lucide-react";
