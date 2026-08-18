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
          <Link href="/client/deployments" className="inline-flex items-center gap-2 text-sm text-muted hover:text-secondary transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Deployments
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-[0_0_15px_rgba(45,124,255,0.3)]">
              <Box size={20} className="text-main" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-main tracking-tight flex items-center gap-3">
                AI-Worker-v2.1
                <StatusBadge status="live" label="Running" />
              </h1>
              <p className="text-sm text-muted font-mono mt-1">ID: {id}</p>
            </div>
          </div>
        </div>

        {/* Lifecycle Controls */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-[var(--color-glass-border)] rounded-lg text-sm font-medium text-main/80 hover:text-main hover:bg-[var(--color-glass-bg)] transition-colors">
            <RotateCw size={16} />
            Restart
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/30 rounded-lg text-sm font-medium text-danger hover:bg-danger/20 transition-colors">
            <Square size={16} />
            Stop
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Infrastructure & Telemetry */}
        <div className="space-y-6">
          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
              <Server size={16} /> Infrastructure
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-main/5">
                <span className="text-sm text-muted">Assigned Node</span>
                <span className="text-sm font-mono text-primary">NODE-SAIF-01</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-main/5">
                <span className="text-sm text-muted">Location</span>
                <span className="text-sm font-medium text-main/90">Mumbai, India</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-main/5">
                <span className="text-sm text-muted">Runtime</span>
                <span className="text-sm font-medium text-main/90">2h 14m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Image</span>
                <span className="text-sm font-mono text-main/80">myai/worker:v2.1</span>
              </div>
            </div>
          </GlassCard>

          {/* Telemetry */}
          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity size={16} /> Live Telemetry
            </h3>
            
            <div className="space-y-5">
              {/* CPU */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-main/80"><Cpu size={14} /> 2 vCPU</span>
                  <span className="font-mono text-primary">42%</span>
                </div>
                <div className="h-2 w-full bg-card rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              {/* RAM */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-main/80"><HardDrive size={14} /> 4 GB RAM</span>
                  <span className="font-mono text-tertiary">61%</span>
                </div>
                <div className="h-2 w-full bg-card rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-tertiary rounded-full" style={{ width: '61%' }} />
                </div>
              </div>
              
              {/* GPU */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-main/80"><Cpu size={14} /> 1 GPU (RTX 3060)</span>
                  <span className="font-mono text-success">38%</span>
                </div>
                <div className="h-2 w-full bg-card rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: '38%' }} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Live Logs */}
        <div className="lg:col-span-2 flex flex-col min-h-[500px]">
          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden">
            <div className="px-4 py-3 border-b border-main/10 bg-card/40 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-main/80 flex items-center gap-2">
                <Terminal size={16} /> container stdout/stderr
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted font-mono">Live Stream</span>
              </div>
            </div>
            
            <div className="flex-1 bg-card/80 p-4 font-mono text-sm overflow-y-auto font-medium">
              {logs.length === 0 ? (
                <div className="text-muted">Waiting for logs...</div>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, index) => {
                    const isError = log.includes("[ERROR]");
                    const isInfo = log.includes("[INFO]");
                    const isDebug = log.includes("[DEBUG]");
                    
                    return (
                      <div key={index} className={cn(
                        "break-all",
                        isError ? "text-red-400" : isInfo ? "text-blue-400" : isDebug ? "text-muted" : "text-success"
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
