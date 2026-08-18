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
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden border-b border-main/5">
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-[100px] animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-main/10 bg-main/5 backdrop-blur-md text-sm text-main/80 font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Introducing Bharat-Grid Elastic Compute
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-main mb-8 leading-[1.1] tracking-tight">
            Build on the World's First <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Decentralized Cloud
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Tap into millions of idle GPUs and CPUs globally. Achieve AWS-level reliability and scale at a fraction of the cost, powered by zero-trust architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <Link href="/auth/signup" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-secondary hover:bg-secondary/80 text-main font-bold text-lg transition-all shadow-[0_0_30px_rgba(45,124,255,0.4)] flex items-center justify-center gap-2 group">
              Start Building for Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/auth/signup?mode=provider" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-card/40 backdrop-blur-md border border-main/10 hover:border-main/30 text-main font-bold text-lg transition-all flex items-center justify-center">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By Logos (Mock) */}
      <section className="py-12 border-b border-main/5 bg-card/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-muted uppercase tracking-widest mb-8">Trusted by forward-thinking teams</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">Infrastructure designed for the modern web</h2>
            <p className="text-xl text-muted">Everything you need to deploy, scale, and secure your applications.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tabs List */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("compute")}
                className={cn(
                  "text-left p-6 rounded-xl border transition-all duration-300",
                  activeTab === "compute" 
                    ? "bg-secondary/10 border-secondary/50 shadow-[0_0_20px_rgba(45,124,255,0.1)]" 
                    : "bg-transparent border-transparent hover:bg-main/5"
                )}
              >
                <Cpu className={cn("mb-3", activeTab === "compute" ? "text-secondary" : "text-muted")} size={32} />
                <h3 className={cn("text-xl font-bold mb-2", activeTab === "compute" ? "text-main" : "text-muted")}>Elastic Compute</h3>
                <p className="text-sm text-muted">Instantly provision containerized workloads across thousands of available edge nodes.</p>
              </button>

              <button 
                onClick={() => setActiveTab("network")}
                className={cn(
                  "text-left p-6 rounded-xl border transition-all duration-300",
                  activeTab === "network" 
                    ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
                    : "bg-transparent border-transparent hover:bg-main/5"
                )}
              >
                <Network className={cn("mb-3", activeTab === "network" ? "text-primary" : "text-muted")} size={32} />
                <h3 className={cn("text-xl font-bold mb-2", activeTab === "network" ? "text-main" : "text-muted")}>Global Edge Routing</h3>
                <p className="text-sm text-muted">Traffic is automatically routed to the nearest healthy node to ensure sub-50ms latency.</p>
              </button>

              <button 
                onClick={() => setActiveTab("security")}
                className={cn(
                  "text-left p-6 rounded-xl border transition-all duration-300",
                  activeTab === "security" 
                    ? "bg-tertiary/10 border-tertiary/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                    : "bg-transparent border-transparent hover:bg-main/5"
                )}
              >
                <ShieldCheck className={cn("mb-3", activeTab === "security" ? "text-tertiary" : "text-muted")} size={32} />
                <h3 className={cn("text-xl font-bold mb-2", activeTab === "security" ? "text-main" : "text-muted")}>Zero-Trust Sandboxing</h3>
                <p className="text-sm text-muted">Hardware-level encryption ensures that node providers cannot access your memory or data.</p>
              </button>
            </div>

            {/* Tab Content Display */}
            <div className="lg:col-span-8 flex items-center">
              <GlassCard className="w-full h-full min-h-[400px] p-0 overflow-hidden relative group">
                {activeTab === "compute" && (
                  <div className="absolute inset-0 p-8 flex flex-col justify-center bg-gradient-to-br from-secondary/5 to-transparent transition-opacity duration-500">
                    <div className="mb-6 flex items-center justify-between border-b border-main/10 pb-4">
                      <div className="flex items-center gap-3">
                        <Terminal size={20} className="text-secondary" />
                        <span className="font-mono text-sm text-main">deploy.ts</span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                    </div>
                    <pre className="font-mono text-sm leading-relaxed text-main/80 overflow-x-auto">
                      <code dangerouslySetInnerHTML={{ __html: CODE_SNIPPET.replace(/BharatGrid|deploy/g, '<span class="text-secondary">$&</span>').replace(/'[^']*'/g, '<span class="text-success">$&</span>') }} />
                    </pre>
                  </div>
                )}

                {activeTab === "network" && (
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500">
                    <div className="relative w-64 h-64 border border-primary/30 rounded-full flex items-center justify-center">
                      <div className="absolute w-full h-full border border-primary/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                      <div className="w-32 h-32 border border-primary/50 rounded-full flex items-center justify-center bg-primary/10">
                        <Network size={40} className="text-primary" />
                      </div>
                      {/* Floating dots representing traffic */}
                      <div className="absolute top-0 w-3 h-3 rounded-full bg-main shadow-[0_0_10px_white] animate-[spin_4s_linear_infinite]" style={{ transformOrigin: '0 128px' }} />
                      <div className="absolute bottom-0 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)] animate-[spin_6s_linear_infinite]" style={{ transformOrigin: '0 -128px' }} />
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-tertiary/5 to-transparent transition-opacity duration-500">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <div className="bg-card/50 border border-main/10 p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-tertiary/20 rounded-lg"><ShieldCheck className="text-tertiary" /></div>
                        <div>
                          <div className="text-main font-bold text-lg">AES-256</div>
                          <div className="text-xs text-muted">End-to-End Encryption</div>
                        </div>
                      </div>
                      <div className="bg-card/50 border border-main/10 p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-tertiary/20 rounded-lg"><Server className="text-tertiary" /></div>
                        <div>
                          <div className="text-main font-bold text-lg">Enclaves</div>
                          <div className="text-xs text-muted">Hardware Sandboxing</div>
                        </div>
                      </div>
                      <div className="bg-card/50 border border-main/10 p-4 rounded-xl flex items-center gap-4 col-span-2 justify-center">
                        <span className="text-success font-mono text-sm flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
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
      <section className="py-24 px-6 bg-gradient-to-t from-secondary/10 to-transparent border-t border-main/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-main mb-6">Ready to scale globally?</h2>
          <p className="text-xl text-muted mb-10">Join thousands of developers and hardware providers already on the grid.</p>
          <Link href="/auth/signup" className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-main text-canvas hover:bg-main/80 font-extrabold text-xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Create Free Account <ArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
}
