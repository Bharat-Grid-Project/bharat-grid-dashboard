/* eslint-disable react/no-unescaped-entities, react-hooks/set-state-in-effect, @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Settings, ShieldCheck, Power, Cpu, HardDrive, Clock, Save } from "lucide-react";
import { cn } from "@/components/ui/GlassCard";

export default function ProviderSettings() {
  const [isSharing, setIsSharing] = useState(true);
  const [maxCpu, setMaxCpu] = useState(80); // percentage
  const [maxRam, setMaxRam] = useState(75); // percentage
  
  // Simple representation of a time-block matrix (Days x 3 blocks: Morning, Day, Night)
  // For simplicity, we just use a flat array of active states
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const blocks = ["00:00-08:00", "08:00-16:00", "16:00-24:00"];
  
  // Initialize matrix with mostly true (available)
  const [schedule, setSchedule] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    days.forEach(d => {
      blocks.forEach(b => {
        init[`${d}-${b}`] = true;
      });
    });
    // Turn off some weekends for realism
    init["Sat-08:00-16:00"] = false;
    init["Sun-08:00-16:00"] = false;
    return init;
  });

  const toggleSchedule = (day: string, block: string) => {
    setSchedule(prev => ({
      ...prev,
      [`${day}-${block}`]: !prev[`${day}-${block}`]
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-main tracking-tight flex items-center gap-3">
            <Settings className="text-primary" /> Resource Allocation Settings
          </h1>
          <p className="text-muted mt-1">Manage how your hardware is shared with the Bharat-Grid network.</p>
        </div>
        <button className="bg-secondary hover:bg-secondary/80 text-main px-6 py-2.5 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(45,124,255,0.4)] flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      {/* Master Toggle */}
      <GlassCard className="p-6 relative overflow-hidden">
        <div className={cn("absolute inset-0 opacity-10 transition-colors duration-500", isSharing ? "bg-success" : "bg-danger")} />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-main flex items-center gap-2 mb-2">
              <Power className={isSharing ? "text-success" : "text-danger"} />
              {isSharing ? "Grid Sharing is Active" : "Grid Sharing is Paused"}
            </h2>
            <p className="text-main/80 text-sm">
              {isSharing 
                ? "Your nodes are actively accepting workloads from the network and generating BGT."
                : "Your nodes are disconnected from the network and will not receive new workloads."}
            </p>
          </div>
          
          <button 
            onClick={() => setIsSharing(!isSharing)}
            className={cn(
              "w-16 h-8 rounded-full relative transition-colors duration-300 shrink-0",
              isSharing ? "bg-success shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "bg-muted"
            )}
          >
            <div className={cn(
              "absolute top-1 w-6 h-6 bg-main rounded-full transition-all duration-300",
              isSharing ? "left-9" : "left-1"
            )} />
          </button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Resource Throttling */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-main mb-6 flex items-center gap-2">
            <ShieldCheck className="text-primary" size={20} /> Resource Throttling
          </h3>
          <p className="text-sm text-muted mb-8">Set the maximum percentage of your host system's hardware that can be allocated to grid workloads.</p>

          <div className="space-y-8">
            {/* CPU Ceiling */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-main/80 flex items-center gap-2"><Cpu size={16}/> CPU Allocation Limit</label>
                <span className="font-mono text-primary bg-primary/10 px-3 py-1 rounded border border-primary/30">{maxCpu}%</span>
              </div>
              <input 
                type="range" min="10" max="100" step="5" 
                value={maxCpu} onChange={(e) => setMaxCpu(parseInt(e.target.value))}
                disabled={!isSharing}
                className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50"
              />
            </div>

            {/* RAM Ceiling */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-main/80 flex items-center gap-2"><HardDrive size={16}/> RAM Allocation Limit</label>
                <span className="font-mono text-tertiary bg-tertiary/10 px-3 py-1 rounded border border-tertiary/30">{maxRam}%</span>
              </div>
              <input 
                type="range" min="10" max="100" step="5" 
                value={maxRam} onChange={(e) => setMaxRam(parseInt(e.target.value))}
                disabled={!isSharing}
                className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-tertiary disabled:opacity-50"
              />
            </div>
          </div>
        </GlassCard>

        {/* Scheduling Matrix */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-main mb-2 flex items-center gap-2">
            <Clock className="text-secondary" size={20} /> Automated Scheduling
          </h3>
          <p className="text-sm text-muted mb-6">Select time blocks when your node is available to accept workloads.</p>

          <div className={cn("overflow-x-auto", !isSharing && "opacity-50 pointer-events-none")}>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-left font-medium text-muted w-16">Day</th>
                  {blocks.map(b => (
                    <th key={b} className="p-2 text-center font-medium text-muted">{b}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day} className="border-t border-main/5">
                    <td className="p-2 font-medium text-main/80">{day}</td>
                    {blocks.map(block => {
                      const active = schedule[`${day}-${block}`];
                      return (
                        <td key={`${day}-${block}`} className="p-1">
                          <button
                            onClick={() => toggleSchedule(day, block)}
                            className={cn(
                              "w-full h-10 rounded-md transition-all duration-200 border",
                              active 
                                ? "bg-secondary/20 border-secondary/50 text-secondary shadow-[inset_0_0_10px_rgba(45,124,255,0.2)]" 
                                : "bg-card border-main/5 hover:border-main/20 text-muted"
                            )}
                          >
                            {active && <span className="text-xs font-bold">✓</span>}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
