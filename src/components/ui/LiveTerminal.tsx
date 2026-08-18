"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";
import { cn } from "./GlassCard";

interface LiveTerminalProps {
  logs: string[];
  className?: string;
}

export function LiveTerminal({ logs, className }: LiveTerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Helper to colorize log tags
  const renderLogContent = (log: string) => {
    if (log.includes("[INFO]")) {
      return (
        <>
          <span className="text-[var(--color-cyan-400)]">[INFO]</span>
          <span className="text-gray-300">{log.split("[INFO]")[1]}</span>
        </>
      );
    }
    if (log.includes("[WARN]")) {
      return (
        <>
          <span className="text-[var(--color-amber-500)]">[WARN]</span>
          <span className="text-[var(--color-amber-500)]">{log.split("[WARN]")[1]}</span>
        </>
      );
    }
    if (log.includes("[ERROR]")) {
      return (
        <>
          <span className="text-[var(--color-red-500)]">[ERROR]</span>
          <span className="text-[var(--color-red-500)]">{log.split("[ERROR]")[1]}</span>
        </>
      );
    }
    if (log.includes("[DEBUG]")) {
      return (
        <>
          <span className="text-[var(--color-purple-500)]">[DEBUG]</span>
          <span className="text-gray-400">{log.split("[DEBUG]")[1]}</span>
        </>
      );
    }
    
    return <span className="text-gray-400">{log}</span>;
  };

  return (
    <div className={cn("bg-black/80 border border-white/10 rounded-xl shadow-2xl font-mono text-xs md:text-sm overflow-hidden flex flex-col", className)}>
      {/* Terminal Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-black/40 flex items-center justify-between shrink-0">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Terminal size={16} /> Orchestration Logs
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-green-500)] animate-pulse" />
          <span className="text-xs text-[var(--color-green-500)]">Live</span>
        </div>
      </div>
      
      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-medium h-64 scroll-smooth"
      >
        <div className="space-y-1.5">
          <div className="text-[var(--color-blue-500)]">Bharat-Grid Orchestrator v2.4.1 initialized...</div>
          <div className="text-gray-500">Connecting to overlay network...</div>
          <div className="text-[var(--color-green-500)]">Secure tunnel established.</div>
          
          {logs.map((log, index) => (
            <div key={index} className="break-words">
              {renderLogContent(log)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
