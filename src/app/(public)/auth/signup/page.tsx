/* eslint-disable react/no-unescaped-entities, react-hooks/set-state-in-effect, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Suspense } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Box, Globe, Cpu, Server } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/components/ui/GlassCard";
import { useWorkspaceStore } from "@/store/workspaceStore";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setMode = useWorkspaceStore((state) => state.setMode);
  const [role, setRole] = useState<"client" | "provider">("client");

  // Read ?mode=provider from URL if present
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "provider") {
      setRole("provider");
    }
  }, [searchParams]);

  const handleSignUp = () => {
    setMode(role);
    if (role === "client") {
      router.push("/client/overview");
    } else {
      router.push("/provider/overview");
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(45,124,255,0.4)]">
          <Box size={24} className="text-main" />
        </div>
        <h1 className="text-3xl font-bold text-main mb-2">Create an Account</h1>
        <p className="text-muted">Join the world's largest decentralized compute grid.</p>
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
                  ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]" 
                  : "bg-main/5 border-main/10 hover:bg-main/10 text-muted"
              )}
            >
              <Cpu size={24} className={role === "client" ? "text-primary" : "text-muted"} />
              <span className={cn("text-xs font-bold uppercase tracking-wider", role === "client" ? "text-main" : "text-muted")}>Client</span>
            </button>
            
            <button
              type="button"
              onClick={() => setRole("provider")}
              className={cn(
                "p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300",
                role === "provider" 
                  ? "bg-secondary/10 border-secondary/50 shadow-[0_0_15px_rgba(45,124,255,0.15)]" 
                  : "bg-main/5 border-main/10 hover:bg-main/10 text-muted"
              )}
            >
              <Server size={24} className={role === "provider" ? "text-secondary" : "text-muted"} />
              <span className={cn("text-xs font-bold uppercase tracking-wider", role === "provider" ? "text-main" : "text-muted")}>Provider</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-main/80 mb-2">First Name</label>
              <input 
                type="text" 
                placeholder="Jane"
                className="w-full bg-canvas/50 border border-main/10 rounded-lg p-3 text-main focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-main/80 mb-2">Last Name</label>
              <input 
                type="text" 
                placeholder="Doe"
                className="w-full bg-canvas/50 border border-main/10 rounded-lg p-3 text-main focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-main/80 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full bg-canvas/50 border border-main/10 rounded-lg p-3 text-main focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-main/80 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-canvas/50 border border-main/10 rounded-lg p-3 text-main focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            />
          </div>

          <button 
            type="button"
            onClick={handleSignUp}
            className="w-full bg-primary text-[#061127] hover:bg-main px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] mt-4"
          >
            Start Building
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-main/10" />
          <span className="text-xs text-muted uppercase tracking-widest">Or</span>
          <div className="flex-1 h-px bg-main/10" />
        </div>

        <button 
          type="button"
          onClick={handleSignUp}
          className="mt-6 w-full bg-main/5 hover:bg-main/10 border border-main/10 text-main px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-3"
        >
          <Globe size={18} />
          Sign up with GitHub
        </button>
      </GlassCard>

      <p className="text-center mt-8 text-muted text-sm">
        Already have an account? <Link href="/auth/signin" className="text-primary hover:text-secondary font-medium transition-colors">Sign in</Link>
      </p>
    </>
  );
}

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-20 flex flex-col justify-center min-h-[calc(100vh-160px)]">
      <Suspense fallback={<div className="text-main text-center py-20">Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
