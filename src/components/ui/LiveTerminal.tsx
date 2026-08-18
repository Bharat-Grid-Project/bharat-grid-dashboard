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
          <span className="text-primary">[INFO]</span>
          <span className="text-main/80">{log.split("[INFO]")[1]}</span>
        </>
      );
    }
    if (log.includes("[WARN]")) {
      return (
        <>
          <span className="text-warning">[WARN]</span>
          <span className="text-warning">{log.split("[WARN]")[1]}</span>
        </>
      );
    }
    if (log.includes("[ERROR]")) {
      return (
        <>
          <span className="text-danger">[ERROR]</span>
          <span className="text-danger">{log.split("[ERROR]")[1]}</span>
        </>
      );
    }
    if (log.includes("[DEBUG]")) {
      return (
        <>
          <span className="text-tertiary">[DEBUG]</span>
          <span className="text-muted">{log.split("[DEBUG]")[1]}</span>
        </>
      );
    }
    
    return <span className="text-muted">{log}</span>;
  };

  return (
    <div className={cn("bg-card/80 border border-main/10 rounded-xl shadow-2xl font-mono text-xs md:text-sm overflow-hidden flex flex-col", className)}>
      {/* Terminal Header */}
      <div className="px-4 py-3 border-b border-main/10 bg-card/40 flex items-center justify-between shrink-0">
        <h3 className="text-sm font-semibold text-main/80 flex items-center gap-2">
          <Terminal size={16} /> Orchestration Logs
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-success">Live</span>
        </div>
      </div>
      
      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-medium h-64 scroll-smooth"
      >
        <div className="space-y-1.5">
          <div className="text-secondary">Bharat-Grid Orchestrator v2.4.1 initialized...</div>
          <div className="text-muted">Connecting to overlay network...</div>
          <div className="text-success">Secure tunnel established.</div>
          
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
