import { ReactNode, HTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-xl p-6",
        hoverEffect && "hover:border-[var(--color-blue-500)]/50 transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
