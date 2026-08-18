"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, ShieldCheck, Menu, Settings, CreditCard, LogOut, RefreshCcw } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useRouter } from "next/navigation";

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { mode, setMode } = useWorkspaceStore();
  const router = useRouter();

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleSwitch = () => {
    if (mode === "client") {
      setMode("provider");
      router.push("/provider/overview");
    } else {
      setMode("client");
      router.push("/client/overview");
    }
    setShowProfile(false);
  };

  return (
    <div className="h-16 border-b border-[var(--color-glass-border)] bg-canvas/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 glass-panel z-20 sticky top-0 shrink-0">
      
      <div className="flex items-center gap-4 flex-1 max-w-md">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-muted hover:text-main transition-colors"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        {/* Search */}
        <div className="relative group w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search deployments..." 
            className="w-full bg-card border border-[var(--color-glass-border)] rounded-lg py-2 pl-10 pr-4 text-sm text-main/90 placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 hidden lg:flex">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-muted bg-canvas rounded border border-main/20">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 md:gap-6 ml-4">
        
        {/* Network Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-[var(--color-glass-border)]">
          <ShieldCheck size={16} className="text-success" />
          <span className="text-xs font-medium text-main/80">Network Healthy</span>
          <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(22,163,74,0.6)] ml-1"></span>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative text-muted hover:text-main transition-colors"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-danger shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-72 origin-top-right z-50"
              >
                <GlassCard className="p-0 overflow-hidden border-[var(--color-glass-border)] shadow-2xl">
                  <div className="px-4 py-3 border-b border-main/5 flex justify-between items-center bg-main/[0.02]">
                    <span className="text-sm font-semibold text-main">Notifications</span>
                    <span className="text-xs text-secondary cursor-pointer">Mark all read</span>
                  </div>
                  <div className="flex flex-col max-h-80 overflow-y-auto">
                    <div className="px-4 py-3 border-b border-main/5 hover:bg-main/5 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-xs text-main/80 font-medium">Node-042 joined the grid</span>
                      </div>
                      <p className="text-xs text-muted pl-4">12 mins ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-main/5 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs text-main/80 font-medium">Deployment API-Service-v1.3 active</span>
                      </div>
                      <p className="text-xs text-muted pl-4">2 hours ago</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative pl-4 md:pl-6 border-l border-[var(--color-glass-border)]" ref={profileRef}>
          <div 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-main/90 group-hover:text-main transition-colors">Dev User</div>
              <div className="text-xs text-muted">Account</div>
            </div>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-secondary to-tertiary border border-main/20 flex items-center justify-center text-main font-bold text-sm shadow-[0_0_10px_rgba(45,124,255,0.3)]">
              DU
            </div>
          </div>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-60 origin-top-right z-50"
              >
                <GlassCard className="p-2 border-[var(--color-glass-border)] shadow-2xl flex flex-col gap-1">
                  
                  {/* Role Switcher Action */}
                  <div 
                    onClick={handleRoleSwitch}
                    className="px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer flex items-center gap-2 mb-1 border border-primary/20"
                  >
                    <RefreshCcw size={16} /> 
                    Switch to {mode === "client" ? "Provider" : "Client"} Mode
                  </div>

                  <div className="h-px bg-main/10 my-1 mx-2" />

                  <div className="px-3 py-2 text-sm text-main hover:bg-main/10 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                    <Settings size={16} className="text-muted" /> Account Settings
                  </div>
                  <div className="px-3 py-2 text-sm text-main hover:bg-main/10 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                    <CreditCard size={16} className="text-muted" /> Billing
                  </div>
                  <div className="h-px bg-main/10 my-1 mx-2" />
                  <div className="px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                    <LogOut size={16} /> Sign Out
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
