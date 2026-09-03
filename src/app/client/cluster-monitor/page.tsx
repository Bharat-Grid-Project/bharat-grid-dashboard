/* eslint-disable react/no-unescaped-entities, react-hooks/set-state-in-effect, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Activity, Cpu, HardDrive, Network, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { LiveAreaChart } from "@/components/ui/LiveAreaChart";
import { LiveTerminal } from "@/components/ui/LiveTerminal";

// Helper to generate mock data point
const generateDataPoint = (time: number) => ({
  time,
  cpu: Math.floor(30 + Math.random() * 40),
  ram: Math.floor(50 + Math.random() * 20),
  network: Math.floor(10 + Math.random() * 80),
});

export default function ClusterMonitor() {
  const [data, setData] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // Initialize and update chart data
  useEffect(() => {
    let currentTime = 0;
    const initialData = Array.from({ length: 20 }).map(() => {
      currentTime += 1;
      return generateDataPoint(currentTime);
    });
    setData(initialData);

    const interval = setInterval(() => {
      currentTime += 1;
      setData((prev) => {
        const newData = [...prev.slice(1), generateDataPoint(currentTime)];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Mock terminal logs
  useEffect(() => {
    const logMessages = [
      "[INFO] Routing traffic via peer NODE-087",
      "[WARN] High latency detected on subnet A, failing over...",
      "[INFO] Failover successful. Latency normalized.",
      "[DEBUG] Allocating 2 additional vCPUs to AI-Model-Inference",
      "[INFO] Image sync completed on NODE-ALPHA-02",
      "[INFO] Keepalive ping: ACK received from 14 nodes.",
      "[WARN] NODE-019 missed heartbeat (1/3).",
    ];

    const interval = setInterval(() => {
      const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
      setLogs((prev) => [...prev.slice(-40), `[${new Date().toISOString().split('T')[1].split('.')[0]}] ${msg}`]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-main tracking-tight flex items-center gap-3">
            <Activity className="text-primary" /> Advanced Cluster Monitor
          </h1>
          <p className="text-muted mt-1">Real-time telemetry and orchestration mapping across Bharat-Grid.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cluster Map Visualization */}
        <GlassCard className="lg:col-span-2 p-6 flex flex-col min-h-[400px]">
          <h3 className="text-lg font-semibold text-main mb-4 flex items-center gap-2">
            <Share2 className="text-secondary" size={18} /> Global Node Topology
          </h3>
          <div className="flex-1 relative bg-canvas/50 rounded-xl overflow-hidden border border-main/5 flex items-center justify-center">
            {/* Abstract Map Background Grid */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))' }}>
              <line x1="20%" y1="30%" x2="80%" y2="40%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[pulse_3s_ease-in-out_infinite]" />
              <line x1="80%" y1="40%" x2="60%" y2="80%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="60%" y1="80%" x2="30%" y2="60%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[pulse_4s_ease-in-out_infinite]" />
              <line x1="30%" y1="60%" x2="20%" y2="30%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="30%" y1="60%" x2="80%" y2="40%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[pulse_2s_ease-in-out_infinite]" />
            </svg>

            {/* Glowing Nodes (Framer Motion Heartbeat) */}
            <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_var(--color-primary)]" 
              />
              <span className="text-[10px] text-primary font-mono mt-2 bg-card/50 px-1.5 rounded">NODE-A</span>
            </div>
            
            <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-5 h-5 bg-secondary rounded-full shadow-[0_0_20px_var(--color-secondary)]" 
              />
              <span className="text-[10px] text-secondary font-mono mt-2 bg-card/50 px-1.5 rounded">NODE-B (Master)</span>
            </div>

            <div className="absolute top-[80%] left-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="w-3 h-3 bg-success rounded-full shadow-[0_0_10px_var(--color-success)]" 
              />
              <span className="text-[10px] text-success font-mono mt-2 bg-card/50 px-1.5 rounded">NODE-C</span>
            </div>

            <div className="absolute top-[60%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div 
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="w-4 h-4 bg-tertiary rounded-full shadow-[0_0_15px_var(--color-tertiary)]" 
              />
              <span className="text-[10px] text-tertiary font-mono mt-2 bg-card/50 px-1.5 rounded">NODE-D</span>
            </div>
            
            <style jsx>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: 1000;
                }
              }
            `}</style>
          </div>
        </GlassCard>

        {/* Live Terminal Component */}
        <LiveTerminal logs={logs} className="h-[400px]" />
      </div>

      {/* Live Telemetry Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LiveAreaChart 
          title="CPU Utilization" 
          data={data} 
          dataKey="cpu" 
          strokeColor="var(--color-primary)" // Cyan 400
          icon={Cpu} 
        />
        <LiveAreaChart 
          title="Memory Allocation" 
          data={data} 
          dataKey="ram" 
          strokeColor="var(--color-tertiary)" // Purple 500
          icon={HardDrive} 
        />
        <LiveAreaChart 
          title="Network Bandwidth" 
          data={data} 
          dataKey="network" 
          strokeColor="var(--color-secondary)" // Blue 500
          icon={Network} 
        />
      </div>

    </div>
  );
}
