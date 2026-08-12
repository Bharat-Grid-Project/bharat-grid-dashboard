import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "./GlassCard";

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

export function KPICard({ title, value, icon: Icon, trend, isActive }: KPICardProps) {
  return (
    <GlassCard 
      hoverEffect 
      className={cn(
        "flex flex-col gap-3 group relative overflow-hidden",
        isActive && "border-[var(--color-blue-500)]/50 shadow-[0_0_15px_rgba(45,124,255,0.15)]"
      )}
    >
      {/* Background glow if active */}
      {isActive && (
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-blue-500)]/20 rounded-full blur-2xl pointer-events-none" />
      )}
      
      <div className="flex items-center justify-between relative z-10">
        <div className="w-10 h-10 rounded-full bg-[var(--color-bg-800)] flex items-center justify-center text-[var(--color-cyan-400)] group-hover:scale-110 transition-transform duration-300">
          <Icon size={20} />
        </div>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</span>
      </div>
      
      <div className="relative z-10 mt-1">
        <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
        
        {trend && (
          <div className={cn(
            "text-sm mt-1 flex items-center gap-1 font-medium",
            trend.isPositive ? "text-[var(--color-green-500)]" : "text-[var(--color-amber-500)]"
          )}>
            <span>{trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%</span>
            <span className="text-gray-500 text-xs font-normal ml-1">{trend.label}</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

export function KPIGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", className)}>
      {children}
    </div>
  );
}
