"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Box, Globe, Cpu, Server } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/components/ui/GlassCard";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function SignInPage() {
  const router = useRouter();
  const setMode = useWorkspaceStore((state) => state.setMode);
  const [role, setRole] = useState<"client" | "provider">("client");

  const handleSignIn = () => {
    setMode(role);
    if (role === "client") {
      router.push("/client/overview");
    } else {
      router.push("/provider/overview");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 flex flex-col justify-center min-h-[calc(100vh-160px)]">
      <div className="text-center mb-8">
        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-purple-500)] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(45,124,255,0.4)]">
          <Box size={24} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign in to manage your decentralized compute.</p>
      </div>

      <GlassCard className="p-8">
        <form className="space-y-5">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole("client")}
              className={cn(
                "p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300",
                role === "client" 
                  ? "bg-[var(--color-cyan-400)]/10 border-[var(--color-cyan-400)]/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]" 
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-400"
              )}
            >
              <Cpu size={24} className={role === "client" ? "text-[var(--color-cyan-400)]" : "text-gray-400"} />
              <span className={cn("text-xs font-bold uppercase tracking-wider", role === "client" ? "text-white" : "text-gray-400")}>Client</span>
            </button>
            
            <button
              type="button"
              onClick={() => setRole("provider")}
              className={cn(
                "p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300",
                role === "provider" 
                  ? "bg-[var(--color-blue-500)]/10 border-[var(--color-blue-500)]/50 shadow-[0_0_15px_rgba(45,124,255,0.15)]" 
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-400"
              )}
            >
              <Server size={24} className={role === "provider" ? "text-[var(--color-blue-500)]" : "text-gray-400"} />
              <span className={cn("text-xs font-bold uppercase tracking-wider", role === "provider" ? "text-white" : "text-gray-400")}>Provider</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full bg-[var(--color-bg-900)]/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-cyan-400)] focus:ring-1 focus:ring-[var(--color-cyan-400)] transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-[var(--color-bg-900)]/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-cyan-400)] focus:ring-1 focus:ring-[var(--color-cyan-400)] transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-600 bg-gray-800 accent-[var(--color-blue-500)]" />
              Remember me
            </label>
            <Link href="#" className="text-[var(--color-cyan-400)] hover:text-[var(--color-blue-500)] transition-colors">Forgot password?</Link>
          </div>

          <button 
            type="button"
            onClick={handleSignIn}
            className="w-full bg-[var(--color-blue-500)] hover:bg-[#1E5FCE] text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(45,124,255,0.3)] hover:shadow-[0_0_20px_rgba(45,124,255,0.5)] mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500 uppercase tracking-widest">Or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button 
          type="button"
          onClick={handleSignIn}
          className="mt-6 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-3"
        >
          <Globe size={18} />
          Continue with GitHub
        </button>
      </GlassCard>

      <p className="text-center mt-8 text-gray-400 text-sm">
        Don't have an account? <Link href="/auth/signup" className="text-[var(--color-cyan-400)] hover:text-[var(--color-blue-500)] font-medium transition-colors">Sign up</Link>
      </p>
    </div>
  );
}
