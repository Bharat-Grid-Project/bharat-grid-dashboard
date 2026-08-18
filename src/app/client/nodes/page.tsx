"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Server } from "lucide-react";
import { motion } from "framer-motion";

export default function NodesPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full max-w-md"
      >
        <GlassCard className="flex flex-col items-center justify-center text-center py-12 px-6">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-800)] flex items-center justify-center text-[var(--color-green-500)] mb-6 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
            <Server size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Active Nodes</h2>
          <p className="text-gray-400 mb-6 max-w-sm">
            View connection health, geolocation, and direct SSH tunneling options for your allocated nodes.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-green-500)]/30 bg-[var(--color-green-500)]/10 text-[var(--color-green-500)] text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--color-green-500)] animate-pulse" />
            Under Development
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
