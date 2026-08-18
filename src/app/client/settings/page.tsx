"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full max-w-md"
      >
        <GlassCard className="flex flex-col items-center justify-center text-center py-12 px-6">
          <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-main/80 mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Settings size={32} />
          </div>
          <h2 className="text-2xl font-bold text-main mb-2 tracking-tight">Global Settings</h2>
          <p className="text-muted mb-6 max-w-sm">
            Manage your account preferences, API keys, and notification channels.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-muted/30 bg-muted/10 text-main/80 text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-muted/50 animate-pulse" />
            Under Development
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
