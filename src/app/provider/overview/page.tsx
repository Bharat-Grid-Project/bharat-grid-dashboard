"use client";

import { Activity, Server, Zap, Cpu, Network, ShieldCheck, HardDrive } from "lucide-react";
import { KPIGrid, KPICard } from "@/components/ui/KPICard";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ProviderOverview() {
  return (
    <div className="space-y-6">
      {/* Node Identity Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--color-bg-800)]/80 backdrop-blur-md border border-[var(--color-glass-border)] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-cyan-400)] flex items-center justify-center shadow-[0_0_20px_rgba(45,124,255,0.4)]">
            <Server size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              Saif's Compute Cluster
              <StatusBadge status="live" label="Actively Sharing" />
            </h1>
            <p className="text-sm text-[var(--color-cyan-400)] font-mono mt-1">
              BGT-WALLET: 0x4A2...8F19
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Network Contribution Level</p>
          <p className="text-xl font-bold text-white flex items-center justify-end gap-2">
            <Zap className="text-[var(--color-amber-500)]" size={20} />
            Tier 1 Provider
          </p>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <KPIGrid>
        <KPICard title="Global Uptime" value="99.9%" icon={Activity} trend={{ value: 0.1, label: "vs last month", isPositive: true }} isActive />
        <KPICard title="Total Earnings" value="4,250 BGT" icon={Zap} trend={{ value: 340, label: "this week", isPositive: true }} />
        <KPICard title="Active Nodes" value="3" icon={Server} />
        <KPICard title="Resources Shared" value="24 vCPU" icon={Network} />
      </KPIGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Node Health Visualizer */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="text-[var(--color-green-500)]" size={20} /> Aggregate Health
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2 text-gray-300"><Cpu size={16} className="text-[var(--color-cyan-400)]"/> CPU Allocation (24 Cores)</span>
                <span className="font-mono text-[var(--color-cyan-400)]">82%</span>
              </div>
              <div className="h-3 w-full bg-[var(--color-bg-800)] rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-cyan-400)] rounded-full relative">
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2 text-gray-300"><HardDrive size={16} className="text-[var(--color-purple-500)]"/> RAM Allocation (64 GB)</span>
                <span className="font-mono text-[var(--color-purple-500)]">64%</span>
              </div>
              <div className="h-3 w-full bg-[var(--color-bg-800)] rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-purple-500)] rounded-full" style={{ width: '64%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2 text-gray-300"><Server size={16} className="text-gray-400"/> Storage Used (2 TB)</span>
                <span className="font-mono text-gray-300">41%</span>
              </div>
              <div className="h-3 w-full bg-[var(--color-bg-800)] rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gray-500 rounded-full" style={{ width: '41%' }} />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Summary of Hosted Workloads */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Currently Hosting</h2>
            <span className="text-sm text-[var(--color-blue-500)] font-medium cursor-pointer hover:text-[var(--color-cyan-400)] transition-colors">View All Workloads →</span>
          </div>

          <div className="space-y-4">
            {/* Workload Item 1 */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-800)]/50 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-blue-500)]/20 flex items-center justify-center border border-[var(--color-blue-500)]/30">
                  <Activity size={18} className="text-[var(--color-blue-500)]" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">AI-Model-Inference-Job</h4>
                  <p className="text-xs text-gray-400 mt-1">Hosted on NODE-01</p>
                </div>
              </div>
              <div className="text-right">
                <StatusBadge status="live" label="Active" />
                <p className="text-xs font-mono text-gray-500 mt-1">8 vCPU • 16GB RAM</p>
              </div>
            </div>

            {/* Workload Item 2 */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-800)]/50 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-purple-500)]/20 flex items-center justify-center border border-[var(--color-purple-500)]/30">
                  <Network size={18} className="text-[var(--color-purple-500)]" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Global-CDN-Relay</h4>
                  <p className="text-xs text-gray-400 mt-1">Hosted on NODE-02</p>
                </div>
              </div>
              <div className="text-right">
                <StatusBadge status="live" label="Active" />
                <p className="text-xs font-mono text-gray-500 mt-1">4 vCPU • 8GB RAM</p>
              </div>
            </div>

            {/* Workload Item 3 */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-800)]/50 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center border border-gray-500/30">
                  <Server size={18} className="text-gray-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Data-Pipeline-Worker</h4>
                  <p className="text-xs text-gray-400 mt-1">Hosted on NODE-03</p>
                </div>
              </div>
              <div className="text-right">
                <StatusBadge status="warning" label="High Load" />
                <p className="text-xs font-mono text-gray-500 mt-1">12 vCPU • 32GB RAM</p>
              </div>
            </div>

          </div>
        </GlassCard>
      </div>
    </div>
  );
}
