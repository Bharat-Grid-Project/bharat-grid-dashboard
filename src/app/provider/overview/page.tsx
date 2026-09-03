/* eslint-disable react/no-unescaped-entities, react-hooks/set-state-in-effect, @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Activity, Server, Zap, Cpu, Network, ShieldCheck, HardDrive } from "lucide-react";
import { KPIGrid, KPICard } from "@/components/ui/KPICard";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ProviderOverview() {
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/nodes/active');
        const data = await res.json();
        setNodes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNodes();
    const interval = setInterval(fetchNodes, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalCpu = nodes.reduce((acc, node) => acc + node.available_cpu, 0);
  const totalRam = nodes.reduce((acc, node) => acc + node.available_ram_gb, 0);
  const avgLoad = nodes.length > 0 ? (nodes.reduce((acc, node) => acc + node.current_cpu_load, 0) / nodes.length).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Node Identity Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/80 backdrop-blur-md border border-[var(--color-glass-border)] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-[0_0_20px_rgba(45,124,255,0.4)]">
            <Server size={24} className="text-main" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-main tracking-tight flex items-center gap-3">
              My Compute Cluster
              <StatusBadge status="live" label="Actively Sharing" />
            </h1>
            <p className="text-sm text-primary font-mono mt-1">
              BGT-WALLET: 0x4A2...8F19
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-muted text-sm">Network Contribution Level</p>
          <p className="text-xl font-bold text-main flex items-center justify-end gap-2">
            <Zap className="text-warning" size={20} />
            Tier 1 Provider
          </p>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <KPIGrid>
        <KPICard title="Global Uptime" value="99.9%" icon={Activity} trend={{ value: 0.1, label: "vs last month", isPositive: true }} isActive />
        <KPICard title="Avg Node Load" value={`${avgLoad}%`} icon={Zap} trend={{ value: 2.1, label: "this week", isPositive: false }} />
        <KPICard title="Active Nodes" value={nodes.length.toString()} icon={Server} />
        <KPICard title="Resources Shared" value={`${totalCpu} vCPU`} icon={Network} />
      </KPIGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Node Health Visualizer */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-main mb-6 flex items-center gap-2">
            <ShieldCheck className="text-success" size={20} /> Aggregate Health
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2 text-main/80"><Cpu size={16} className="text-primary"/> CPU Allocation (24 Cores)</span>
                <span className="font-mono text-primary">82%</span>
              </div>
              <div className="h-3 w-full bg-card rounded-full overflow-hidden border border-main/5">
                <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full relative">
                  <div className="absolute inset-0 bg-main/20 animate-pulse" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2 text-main/80"><HardDrive size={16} className="text-tertiary"/> RAM Allocation (64 GB)</span>
                <span className="font-mono text-tertiary">64%</span>
              </div>
              <div className="h-3 w-full bg-card rounded-full overflow-hidden border border-main/5">
                <div className="h-full bg-gradient-to-r from-secondary to-tertiary rounded-full" style={{ width: '64%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2 text-main/80"><Server size={16} className="text-muted"/> Storage Used (2 TB)</span>
                <span className="font-mono text-main/80">41%</span>
              </div>
              <div className="h-3 w-full bg-card rounded-full overflow-hidden border border-main/5">
                <div className="h-full bg-muted rounded-full" style={{ width: '41%' }} />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Summary of Hosted Workloads */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-main">Currently Hosting</h2>
            <span className="text-sm text-secondary font-medium cursor-pointer hover:text-primary transition-colors">View All Workloads →</span>
          </div>

          <div className="space-y-4">
            {nodes.length === 0 ? (
              <div className="text-center text-muted py-8 text-sm">No active nodes connected to your provider pool.</div>
            ) : (
              nodes.map((node: any) => (
                <div key={node.node_id} className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-main/5 hover:border-main/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center border border-secondary/30">
                      <Server size={18} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-main font-medium text-sm">Active Grid Node</h4>
                      <p className="text-xs text-muted mt-1">ID: {node.node_id.substring(0, 12)}... at {node.ip_address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={node.current_cpu_load > 80 ? "warning" : "live"} label={node.current_cpu_load > 80 ? "High Load" : "Active"} />
                    <p className="text-xs font-mono text-muted mt-1">{node.available_cpu} vCPU • {node.available_ram_gb}GB RAM</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
