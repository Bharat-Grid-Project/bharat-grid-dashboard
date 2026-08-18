"use client";

import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "./GlassCard";
import { motion } from "framer-motion";
import React from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  isActive?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
};

export function KPICard({ title, value, icon: Icon, trend, isActive }: KPICardProps) {
  return (
    <GlassCard 
      hoverEffect 
      variants={itemVariants}
      className={cn(
        "flex flex-col gap-3 group relative overflow-hidden",
        isActive && "border-secondary/50 shadow-[0_0_15px_rgba(45,124,255,0.15)]"
      )}
    >
      {/* Background glow if active */}
      {isActive && (
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />
      )}
      
      <div className="flex items-center justify-between relative z-10">
        <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
          <Icon size={20} />
        </div>
        <span className="text-xs font-medium text-muted uppercase tracking-wider">{title}</span>
      </div>
      
      <div className="relative z-10 mt-1">
        <div className="text-2xl font-bold text-main tracking-tight">{value}</div>
        
        {trend && (
          <div className={cn(
            "text-sm mt-1 flex items-center gap-1 font-medium",
            trend.isPositive ? "text-success" : "text-warning"
          )}>
            <span>{trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%</span>
            <span className="text-muted text-xs font-normal ml-1">{trend.label}</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function KPIGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", className)}
    >
      {children}
    </motion.div>
  );
}
