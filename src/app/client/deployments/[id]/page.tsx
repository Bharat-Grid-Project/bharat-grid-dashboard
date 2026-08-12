"use client";

import { use, useEffect, useState, useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Box, Play, RotateCw, Square, Terminal, Cpu, HardDrive, Network, Server, ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/ui/GlassCard";

// Using the Next.js App Router dynamic route props pattern for client components
export default function DeploymentDetail({ params }: { params: Promise<{ id: string }> }) {
  // `use` hook to unwrap params
  const { id } = use(params);
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Mock real-time logs
  useEffect(() => {
    const mockLogs = [
      "Initializing container environment...",
      "Pulling image myai/worker:v2.1...",
      "Image downloaded successfully (2.4GB).",
      "Starting node agent v1.0.0...",
      "Allocating 2 vCPU and 4GB RAM...",
      "Mounting volume claims...",
      "Application process started with PID 142.",
      "Listening on port 8080...",
      "Connected to Bharat-Grid orchestration layer.",
      "[INFO] Worker ready and accepting jobs.",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < mockLogs.length) {
        setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${mockLogs[i]}`]);
        i++;
      } else {
        // Ping
        if (Math.random() > 0.7) {
          setLogs((prev) => [...prev, `[${new Date().toISOString()}] [DEBUG] Health check ping received.`]);
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="space-y-6">
      
      {/* Back navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <Link href="/client/deployments" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--color-blue-500)] transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Deployments
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-cyan-400)] flex items-center justify-center shadow-[0_0_15px_rgba(45,124,255,0.3)]">
              <Box size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                AI-Worker-v2.1
                <StatusBadge status="live" label="Running" />
              </h1>
              <p className="text-sm text-gray-400 font-mono mt-1">ID: {id}</p>
            </div>
          </div>
        </div>

        {/* Lifecycle Controls */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-800)] border border-[var(--color-glass-border)] rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[var(--color-glass-bg)] transition-colors">
            <RotateCw size={16} />
            Restart
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-red-500)]/10 border border-[var(--color-red-500)]/30 rounded-lg text-sm font-medium text-[var(--color-red-500)] hover:bg-[var(--color-red-500)]/20 transition-colors">
            <Square size={16} />
            Stop
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Infrastructure & Telemetry */}
        <div className="space-y-6">
          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Server size={16} /> Infrastructure
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm text-gray-400">Assigned Node</span>
                <span className="text-sm font-mono text-[var(--color-cyan-400)]">NODE-SAIF-01</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm text-gray-400">Location</span>
                <span className="text-sm font-medium text-gray-200">Mumbai, India</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm text-gray-400">Runtime</span>
                <span className="text-sm font-medium text-gray-200">2h 14m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Image</span>
                <span className="text-sm font-mono text-gray-300">myai/worker:v2.1</span>
              </div>
            </div>
          </GlassCard>

          {/* Telemetry */}
          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity size={16} /> Live Telemetry
            </h3>
            
            <div className="space-y-5">
              {/* CPU */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-gray-300"><Cpu size={14} /> 2 vCPU</span>
                  <span className="font-mono text-[var(--color-cyan-400)]">42%</span>
                </div>
                <div className="h-2 w-full bg-[var(--color-bg-800)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-cyan-400)] rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              {/* RAM */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-gray-300"><HardDrive size={14} /> 4 GB RAM</span>
                  <span className="font-mono text-[var(--color-purple-500)]">61%</span>
                </div>
                <div className="h-2 w-full bg-[var(--color-bg-800)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-purple-500)] rounded-full" style={{ width: '61%' }} />
                </div>
              </div>
              
              {/* GPU */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-gray-300"><Cpu size={14} /> 1 GPU (RTX 3060)</span>
                  <span className="font-mono text-[var(--color-green-500)]">38%</span>
                </div>
                <div className="h-2 w-full bg-[var(--color-bg-800)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-green-500)] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: '38%' }} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Live Logs */}
        <div className="lg:col-span-2 flex flex-col min-h-[500px]">
          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Terminal size={16} /> container stdout/stderr
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-green-500)] animate-pulse" />
                <span className="text-xs text-gray-400 font-mono">Live Stream</span>
              </div>
            </div>
            
            <div className="flex-1 bg-black/80 p-4 font-mono text-sm overflow-y-auto font-medium">
              {logs.length === 0 ? (
                <div className="text-gray-600">Waiting for logs...</div>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, index) => {
                    const isError = log.includes("[ERROR]");
                    const isInfo = log.includes("[INFO]");
                    const isDebug = log.includes("[DEBUG]");
                    
                    return (
                      <div key={index} className={cn(
                        "break-all",
                        isError ? "text-red-400" : isInfo ? "text-blue-400" : isDebug ? "text-gray-500" : "text-[var(--color-green-500)]"
                      )}>
                        {log}
                      </div>
                    );
                  })}
                  <div ref={logsEndRef} />
                </div>
              )}
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
