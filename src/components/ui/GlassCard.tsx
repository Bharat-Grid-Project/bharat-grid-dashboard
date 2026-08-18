"use client";

import { ReactNode, HTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, HTMLMotionProps } from "framer-motion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-xl p-6",
        hoverEffect && "hover:border-[var(--color-cyan-400)]/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-colors duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
