"use client";

import { Server, Activity, Box, Zap, Cpu, ShieldCheck } from "lucide-react";
import { KPIGrid, KPICard } from "@/components/ui/KPICard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/navigation";

// 1. DYNAMIC IMPORTS: Lazy load the heavy DataTable component to unblock initial render
const DataTable = dynamic(
  () => import("@/components/ui/DataTable").then((mod) => mod.DataTable),
  { ssr: false, loading: () => <div className="h-64 w-full animate-pulse bg-main/5 rounded-xl border border-main/10" /> }
);

interface LiveDeployment {
  id: string;
  name: string;
  status: "live" | "warning" | "offline" | "pending";
  node: string;
  uptime: string;
}

// 2. DATA FETCHING (SWR): Define the SWR fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ClientOverview() {
  const router = useRouter();
  
  // SWR Hook with 10-second polling for node telemetry
  const { data, error, isLoading } = useSWR(
    'http://localhost:8000/api/deployments',
    fetcher,
    { refreshInterval: 10000, fallbackData: [] } // Polls every 10s, fallback prevents undef crashes
  );

  // Map API data
  const mappedDeployments: LiveDeployment[] = Array.isArray(data) ? data.map((d: any) => ({
    id: d.id.toString(),
    name: d.app_name,
    status: d.status === 'success' ? 'live' : 'offline',
    node: (d.target_node_id || '').substring(0, 8),
    uptime: "Just now"
  })) : [];

  const stats = {
    total: mappedDeployments.length,
    running: mappedDeployments.filter((d) => d.status === 'live').length,
    vCpuUsed: mappedDeployments.filter((d) => d.status === 'live').length * 2 // 2 vCPU per pod
  };

  const columns: any[] = [
    { key: "name", header: "Application", sortable: true, render: (item: LiveDeployment) => (
      <Link href={`/client/deployments/${item.id}`} className="flex items-center gap-3 group">
        <div className="p-2 rounded bg-main/5 text-main/80 group-hover:text-secondary transition-colors">
          <Box size={16} />
        </div>
        <span className="font-medium text-main group-hover:text-secondary transition-colors">{item.name}</span>
      </Link>
    )},
    { key: "status", header: "Status", sortable: true, render: (item: LiveDeployment) => (
      <StatusBadge status={item.status} />
    )},
    { key: "node", header: "Assigned Node", sortable: true, render: (item: LiveDeployment) => (
      <span className="font-mono text-muted group-hover:text-main transition-colors">{item.node || "Pending"}</span>
    )},
    { key: "uptime", header: "Runtime", sortable: true }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-main mb-2 flex items-center gap-2">
            Welcome back, Grid Pioneer! <span className="text-2xl animate-wave">👋</span>
          </h1>
          <p className="text-muted">Deploy, Monitor and Scale your workloads across Bharat-Grid.</p>
        </div>
        <button 
          onClick={() => router.push('/client/deploy')}
          className="bg-gradient-to-r from-secondary to-tertiary hover:opacity-90 text-main font-semibold py-2.5 px-6 rounded-lg shadow-[0_0_20px_rgba(45,124,255,0.3)] transition-all flex items-center gap-2"
        >
          <Zap size={18} />
          Deploy Workload
        </button>
      </div>

      <KPIGrid>
        <KPICard title="DEPLOYMENTS" value={isLoading ? "..." : stats.total.toString()} icon={Box} trend={{ value: 2, label: "this week", isPositive: true }} />
        <KPICard title="RUNNING" value={isLoading ? "..." : stats.running.toString()} icon={Activity} trend={{ value: 100, label: "health", isPositive: true }} />
        <KPICard title="COMPUTE USED" value={isLoading ? "..." : `${stats.vCpuUsed} vCPU`} icon={Cpu} trend={{ value: 5, label: "increase", isPositive: true }} />
        <KPICard title="NETWORK AVAILABILITY" value="99.8%" icon={ShieldCheck} trend={{ value: 0.1, label: "uptime", isPositive: true }} />
      </KPIGrid>

      <GlassCard className="p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="mb-6 flex justify-between items-center relative z-10">
          <h2 className="text-xl font-bold text-main">Active Deployments</h2>
        </div>
        
        {/* 3. SKELETON LOADING: SWR handles background loading state gracefully */}
        {isLoading && !mappedDeployments.length ? (
          <div className="flex flex-col space-y-4 py-8">
            <div className="h-10 w-full animate-pulse bg-main/5 rounded border border-main/10" />
            <div className="h-10 w-full animate-pulse bg-main/5 rounded border border-main/10" />
            <div className="h-10 w-full animate-pulse bg-main/5 rounded border border-main/10" />
          </div>
        ) : (
          <DataTable 
            data={mappedDeployments} 
            columns={columns} 
            keyExtractor={(item: any) => item.id}
          />
        )}
      </GlassCard>
    </div>
  );
}
