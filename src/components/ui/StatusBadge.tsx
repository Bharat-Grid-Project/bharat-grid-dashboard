"use client";

import { cn } from "./GlassCard";
import { motion } from "framer-motion";

export type StatusType = "healthy" | "warning" | "offline" | "live" | "pending";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusConfig: Record<StatusType, { color: string; dotClass: string; bgClass: string; textClass: string; pulseClass: string }> = {
  healthy: {
    color: "var(--color-success)",
    dotClass: "bg-success",
    bgClass: "bg-card border-[var(--color-glass-border)]",
    textClass: "text-main/80",
    pulseClass: "shadow-[0_0_8px_rgba(22,163,74,0.6)]",
  },
  live: {
    color: "var(--color-primary)",
    dotClass: "bg-primary",
    bgClass: "bg-primary/10 border-primary/30",
    textClass: "text-primary",
    pulseClass: "shadow-[0_0_12px_rgba(34,211,238,0.8)]",
  },
  warning: {
    color: "var(--color-warning)",
    dotClass: "bg-warning",
    bgClass: "bg-warning/10 border-warning/30",
    textClass: "text-warning",
    pulseClass: "shadow-[0_0_8px_rgba(245,158,11,0.6)]",
  },
  offline: {
    color: "var(--color-danger)",
    dotClass: "bg-danger",
    bgClass: "bg-danger/10 border-danger/30",
    textClass: "text-danger",
    pulseClass: "",
  },
  pending: {
    color: "#9CA3AF", // gray-400
    dotClass: "bg-muted/50",
    bgClass: "bg-card border-[var(--color-glass-border)]",
    textClass: "text-muted",
    pulseClass: "opacity-50",
  }
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const isLive = status === "live" || status === "healthy";
  
  return (
    <motion.div 
      animate={isLive ? { opacity: [0.7, 1, 0.7] } : {}}
      transition={isLive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
      className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full border", config.bgClass, className)}
    >
      <span className={cn("w-2 h-2 rounded-full", config.dotClass, config.pulseClass)} />
      <span className={cn("text-xs font-medium capitalize", config.textClass)}>
        {label || status}
      </span>
    </motion.div>
  );
}
