"use client";

import { Bell, Search, ShieldCheck } from "lucide-react";

export function TopBar() {
  return (
    <div className="h-16 border-b border-[var(--color-glass-border)] bg-[var(--color-bg-900)]/80 backdrop-blur-xl flex items-center justify-between px-6 glass-panel z-10 sticky top-0">
      
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-cyan-400)] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search deployments, nodes, workloads..." 
            className="w-full bg-[var(--color-bg-800)] border border-[var(--color-glass-border)] rounded-lg py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[var(--color-cyan-400)]/50 focus:ring-1 focus:ring-[var(--color-cyan-400)]/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-gray-500 bg-[var(--color-bg-900)] rounded border border-gray-700">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        
        {/* Network Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-800)] border border-[var(--color-glass-border)]">
          <ShieldCheck size={16} className="text-[var(--color-green-500)]" />
          <span className="text-xs font-medium text-gray-300">Network Healthy</span>
          <span className="w-2 h-2 rounded-full bg-[var(--color-green-500)] animate-pulse shadow-[0_0_8px_rgba(22,163,74,0.6)] ml-1"></span>
        </div>

        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--color-red-500)] shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
        </button>

        {/* Profile Dropdown Placeholder */}
        <div className="flex items-center gap-3 pl-6 border-l border-[var(--color-glass-border)] cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">Dev User</div>
            <div className="text-xs text-gray-500">Account</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 border border-gray-600 flex items-center justify-center text-white font-bold text-sm">
            DU
          </div>
        </div>
      </div>
    </div>
  );
}
