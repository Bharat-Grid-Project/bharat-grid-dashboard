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
        "bg-card border border-main/10 backdrop-blur-md rounded-xl p-6",
        hoverEffect && "hover:border-primary/40 hover:shadow-[0_0_15px_var(--color-primary)] transition-colors duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
