"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Cpu, DollarSign, ArrowRight, Code, Server, Network, Terminal } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/components/ui/GlassCard";

const CODE_SNIPPET = `// Deploying a container to Bharat-Grid
import { BharatGrid } from '@bharat-grid/sdk';

const grid = new BharatGrid({ apiKey: 'YOUR_API_KEY' });

const deployment = await grid.deploy({
  image: 'nginx:latest',
  resources: { cpu: 2, ram: '4GB' },
  region: 'global-edge',
  scale: { min: 3, max: 10 }
});

console.log('Deployed at:', deployment.url);`;

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"compute" | "network" | "security">("compute");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden border-b border-white/5">
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[var(--color-blue-500)]/20 to-[var(--color-cyan-400)]/20 rounded-full blur-[100px] animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-gray-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-[var(--color-cyan-400)] animate-pulse" />
            Introducing Bharat-Grid Elastic Compute
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
            Build on the World's First <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-cyan-400)]">
              Decentralized Cloud
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Tap into millions of idle GPUs and CPUs globally. Achieve AWS-level reliability and scale at a fraction of the cost, powered by zero-trust architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <Link href="/auth/signup" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[var(--color-blue-500)] hover:bg-[#1E5FCE] text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(45,124,255,0.4)] flex items-center justify-center gap-2 group">
              Start Building for Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/auth/signup?mode=provider" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 text-white font-bold text-lg transition-all flex items-center justify-center">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By Logos (Mock) */}
      <section className="py-12 border-b border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">Trusted by forward-thinking teams</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Using text mocks for logos to keep it self-contained */}
            <div className="text-2xl font-bold font-serif">Acme Corp</div>
            <div className="text-2xl font-black italic">GLOBAL AI</div>
            <div className="text-2xl font-mono font-bold tracking-tighter">tech.io</div>
            <div className="text-2xl font-sans font-extrabold uppercase">Nexus</div>
            <div className="text-2xl font-serif italic">Quantum</div>
          </div>
        </div>
      </section>

      {/* Interactive Infrastructure Explorer (AWS Style) */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Infrastructure designed for the modern web</h2>
            <p className="text-xl text-gray-400">Everything you need to deploy, scale, and secure your applications.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tabs List */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("compute")}
                className={cn(
                  "text-left p-6 rounded-xl border transition-all duration-300",
                  activeTab === "compute" 
                    ? "bg-[var(--color-blue-500)]/10 border-[var(--color-blue-500)]/50 shadow-[0_0_20px_rgba(45,124,255,0.1)]" 
                    : "bg-transparent border-transparent hover:bg-white/5"
                )}
              >
                <Cpu className={cn("mb-3", activeTab === "compute" ? "text-[var(--color-blue-500)]" : "text-gray-500")} size={32} />
                <h3 className={cn("text-xl font-bold mb-2", activeTab === "compute" ? "text-white" : "text-gray-400")}>Elastic Compute</h3>
                <p className="text-sm text-gray-500">Instantly provision containerized workloads across thousands of available edge nodes.</p>
              </button>

              <button 
                onClick={() => setActiveTab("network")}
                className={cn(
                  "text-left p-6 rounded-xl border transition-all duration-300",
                  activeTab === "network" 
                    ? "bg-[var(--color-cyan-400)]/10 border-[var(--color-cyan-400)]/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
                    : "bg-transparent border-transparent hover:bg-white/5"
                )}
              >
                <Network className={cn("mb-3", activeTab === "network" ? "text-[var(--color-cyan-400)]" : "text-gray-500")} size={32} />
                <h3 className={cn("text-xl font-bold mb-2", activeTab === "network" ? "text-white" : "text-gray-400")}>Global Edge Routing</h3>
                <p className="text-sm text-gray-500">Traffic is automatically routed to the nearest healthy node to ensure sub-50ms latency.</p>
              </button>

              <button 
                onClick={() => setActiveTab("security")}
                className={cn(
                  "text-left p-6 rounded-xl border transition-all duration-300",
                  activeTab === "security" 
                    ? "bg-[var(--color-purple-500)]/10 border-[var(--color-purple-500)]/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                    : "bg-transparent border-transparent hover:bg-white/5"
                )}
              >
                <ShieldCheck className={cn("mb-3", activeTab === "security" ? "text-[var(--color-purple-500)]" : "text-gray-500")} size={32} />
                <h3 className={cn("text-xl font-bold mb-2", activeTab === "security" ? "text-white" : "text-gray-400")}>Zero-Trust Sandboxing</h3>
                <p className="text-sm text-gray-500">Hardware-level encryption ensures that node providers cannot access your memory or data.</p>
              </button>
            </div>

            {/* Tab Content Display */}
            <div className="lg:col-span-8 flex items-center">
              <GlassCard className="w-full h-full min-h-[400px] p-0 overflow-hidden relative group">
                {activeTab === "compute" && (
                  <div className="absolute inset-0 p-8 flex flex-col justify-center bg-gradient-to-br from-[var(--color-blue-500)]/5 to-transparent transition-opacity duration-500">
                    <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <Terminal size={20} className="text-[var(--color-blue-500)]" />
                        <span className="font-mono text-sm text-white">deploy.ts</span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                    </div>
                    <pre className="font-mono text-sm leading-relaxed text-gray-300 overflow-x-auto">
                      <code dangerouslySetInnerHTML={{ __html: CODE_SNIPPET.replace(/BharatGrid|deploy/g, '<span class="text-[var(--color-blue-500)]">$&</span>').replace(/'[^']*'/g, '<span class="text-[var(--color-green-500)]">$&</span>') }} />
                    </pre>
                  </div>
                )}

                {activeTab === "network" && (
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-cyan-400)]/5 to-transparent transition-opacity duration-500">
                    <div className="relative w-64 h-64 border border-[var(--color-cyan-400)]/30 rounded-full flex items-center justify-center">
                      <div className="absolute w-full h-full border border-[var(--color-cyan-400)]/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                      <div className="w-32 h-32 border border-[var(--color-cyan-400)]/50 rounded-full flex items-center justify-center bg-[var(--color-cyan-400)]/10">
                        <Network size={40} className="text-[var(--color-cyan-400)]" />
                      </div>
                      {/* Floating dots representing traffic */}
                      <div className="absolute top-0 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white] animate-[spin_4s_linear_infinite]" style={{ transformOrigin: '0 128px' }} />
                      <div className="absolute bottom-0 w-3 h-3 rounded-full bg-[var(--color-cyan-400)] shadow-[0_0_10px_var(--color-cyan-400)] animate-[spin_6s_linear_infinite]" style={{ transformOrigin: '0 -128px' }} />
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-purple-500)]/5 to-transparent transition-opacity duration-500">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <div className="bg-black/50 border border-white/10 p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-[var(--color-purple-500)]/20 rounded-lg"><ShieldCheck className="text-[var(--color-purple-500)]" /></div>
                        <div>
                          <div className="text-white font-bold text-lg">AES-256</div>
                          <div className="text-xs text-gray-500">End-to-End Encryption</div>
                        </div>
                      </div>
                      <div className="bg-black/50 border border-white/10 p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-[var(--color-purple-500)]/20 rounded-lg"><Server className="text-[var(--color-purple-500)]" /></div>
                        <div>
                          <div className="text-white font-bold text-lg">Enclaves</div>
                          <div className="text-xs text-gray-500">Hardware Sandboxing</div>
                        </div>
                      </div>
                      <div className="bg-black/50 border border-white/10 p-4 rounded-xl flex items-center gap-4 col-span-2 justify-center">
                        <span className="text-[var(--color-green-500)] font-mono text-sm flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-green-500)] animate-pulse" />
                          System Integrity Verified
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-t from-[var(--color-blue-500)]/10 to-transparent border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to scale globally?</h2>
          <p className="text-xl text-gray-400 mb-10">Join thousands of developers and hardware providers already on the grid.</p>
          <Link href="/auth/signup" className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-white text-black hover:bg-gray-200 font-extrabold text-xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Create Free Account <ArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
}
