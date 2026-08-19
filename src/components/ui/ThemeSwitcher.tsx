/* eslint-disable react/no-unescaped-entities, react-hooks/set-state-in-effect, @typescript-eslint/no-explicit-any */
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Zap, Sun, Check } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full border border-glass-border bg-card/50" />;
  }

  const currentTheme = theme === 'system' ? 'graphite' : theme;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 md:w-9 md:h-9 rounded-full border border-[var(--color-glass-border)] flex items-center justify-center text-muted hover:text-main transition-colors bg-card/50 overflow-hidden group shadow-[0_0_10px_var(--color-glass-border)]"
        aria-label="Toggle Theme"
      >
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <AnimatePresence mode="wait">
          {currentTheme === 'graphite' && (
            <motion.div key="graphite" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
              <Zap size={18} />
            </motion.div>
          )}
          {currentTheme === 'light' && (
            <motion.div key="light" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
              <Sun size={18} />
            </motion.div>
          )}
          {currentTheme === 'dark' && (
            <motion.div key="dark" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
              <Moon size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-4 w-48 origin-top-right z-50"
          >
            <div className="p-2 border border-[var(--color-glass-border)] shadow-2xl flex flex-col gap-1 rounded-xl bg-card backdrop-blur-md">
              <div className="px-3 py-2 text-xs font-semibold text-muted uppercase tracking-wider mb-1">Theme</div>
              
              <button 
                onClick={() => { setTheme('graphite'); setIsOpen(false); }}
                className={`px-3 py-2 text-sm text-main hover:bg-main/10 rounded-md transition-colors cursor-pointer flex items-center justify-between group ${currentTheme === 'graphite' ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}
              >
                <div className="flex items-center gap-2"><Zap size={16} className={currentTheme === 'graphite' ? 'text-primary' : 'text-muted'} /> Graphite (Default)</div>
                {currentTheme === 'graphite' && <Check size={14} className="text-primary" />}
              </button>

              <button 
                onClick={() => { setTheme('dark'); setIsOpen(false); }}
                className={`px-3 py-2 text-sm text-main hover:bg-main/10 rounded-md transition-colors cursor-pointer flex items-center justify-between group ${currentTheme === 'dark' ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}
              >
                <div className="flex items-center gap-2"><Moon size={16} className={currentTheme === 'dark' ? 'text-primary' : 'text-muted'} /> Cyber-Blue</div>
                {currentTheme === 'dark' && <Check size={14} className="text-primary" />}
              </button>

              <button 
                onClick={() => { setTheme('light'); setIsOpen(false); }}
                className={`px-3 py-2 text-sm text-main hover:bg-main/10 rounded-md transition-colors cursor-pointer flex items-center justify-between group ${currentTheme === 'light' ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}
              >
                <div className="flex items-center gap-2"><Sun size={16} className={currentTheme === 'light' ? 'text-primary' : 'text-muted'} /> Light Mode</div>
                {currentTheme === 'light' && <Check size={14} className="text-primary" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
