"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function LogsPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full max-w-md"
      >
        <GlassCard className="flex flex-col items-center justify-center text-center py-12 px-6">
          <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-warning mb-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Terminal size={32} />
          </div>
          <h2 className="text-2xl font-bold text-main mb-2 tracking-tight">System Logs</h2>
          <p className="text-muted mb-6 max-w-sm">
            Search, filter, and export live streaming stdout/stderr logs from all your deployments.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-warning/30 bg-warning/10 text-warning text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
            Under Development
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
