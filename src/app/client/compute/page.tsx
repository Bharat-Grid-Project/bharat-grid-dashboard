"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function ComputePage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full max-w-md"
      >
        <GlassCard className="flex flex-col items-center justify-center text-center py-12 px-6">
          <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-primary mb-6 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <Cpu size={32} />
          </div>
          <h2 className="text-2xl font-bold text-main mb-2 tracking-tight">Compute Resources</h2>
          <p className="text-muted mb-6 max-w-sm">
            Detailed provisioning, benchmarking, and GPU/CPU allocation settings.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Under Development
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
