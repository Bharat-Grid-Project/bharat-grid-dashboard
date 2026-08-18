"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProviderSupportPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full max-w-md"
      >
        <GlassCard className="flex flex-col items-center justify-center text-center py-12 px-6">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-800)] flex items-center justify-center text-[var(--color-cyan-400)] mb-6 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Help & Support</h2>
          <p className="text-gray-400 mb-6 max-w-sm">
            Access provider documentation, open support tickets, and chat with our AI grid-assistant.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-cyan-400)]/30 bg-[var(--color-cyan-400)]/10 text-[var(--color-cyan-400)] text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--color-cyan-400)] animate-pulse" />
            Under Development
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
