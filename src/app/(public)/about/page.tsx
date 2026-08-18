"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Globe2, Leaf, Zap, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-secondary/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-main mb-6 tracking-tight">
            The World's Largest <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Distributed Supercomputer
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            We are on a mission to democratize computing power by transforming millions of idle, dead assets into a single, unified grid.
          </p>
        </div>
      </section>

      {/* Global Impact Metrics */}
      <section className="py-16 px-6 border-y border-main/5 bg-card/20 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-secondary mb-2">10M+</div>
            <div className="text-sm text-muted uppercase tracking-widest font-semibold">Available Cores</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-primary mb-2">150+</div>
            <div className="text-sm text-muted uppercase tracking-widest font-semibold">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-tertiary mb-2">99.99%</div>
            <div className="text-sm text-muted uppercase tracking-widest font-semibold">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-success mb-2">0</div>
            <div className="text-sm text-muted uppercase tracking-widest font-semibold">Carbon Waste</div>
          </div>
        </div>
      </section>

      {/* The Vision & Timeline */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-main mb-6">The problem with the modern cloud.</h2>
              <p className="text-lg text-muted leading-relaxed mb-6">
                Traditional cloud providers build massive, energy-hungry data centers that contribute heavily to global emissions. Meanwhile, billions of personal computers, gaming rigs, and enterprise servers sit completely idle for 70% of their lifespans.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                Bharat-Grid bridges this gap. By building an orchestration layer that networks these disparate assets, we've created a fault-tolerant, decentralized cloud that is faster, cheaper, and infinitely more scalable than any single data center could ever be.
              </p>
            </div>
            
            {/* Abstract Visual representation */}
            <div className="relative h-[400px] rounded-2xl border border-main/10 bg-canvas overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/connected.png')] opacity-20" />
              <Globe2 size={120} className="text-primary opacity-20 absolute" />
              
              <div className="relative z-10 grid grid-cols-2 gap-4 p-8 w-full h-full">
                <GlassCard className="translate-y-4 hover:translate-y-2 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.1)] border-primary/20">
                  <h4 className="text-primary font-bold mb-2">Edge Nodes</h4>
                  <p className="text-xs text-muted">Smart routing ensures workloads execute physically closer to end-users.</p>
                </GlassCard>
                <GlassCard className="-translate-y-4 hover:-translate-y-6 transition-transform shadow-[0_0_15px_rgba(45,124,255,0.1)] border-secondary/20">
                  <h4 className="text-secondary font-bold mb-2">High Availability</h4>
                  <p className="text-xs text-muted">Containers are automatically replicated across multiple disparate hardware providers.</p>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-secondary/5 border-t border-main/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">Built on Three Core Pillars</h2>
            <p className="text-xl text-muted">The foundational technology powering the decentralized web.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="p-10 group hover:border-tertiary/50 transition-colors duration-300">
              <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="text-tertiary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-main mb-4">Absolute Security</h3>
              <p className="text-muted leading-relaxed">
                Workloads run inside highly restricted, hardware-level sandboxes (enclaves). Node providers have zero visibility into the memory space of executing containers.
              </p>
            </GlassCard>

            <GlassCard className="p-10 group hover:border-primary/50 transition-colors duration-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-main mb-4">Instant Scalability</h3>
              <p className="text-muted leading-relaxed">
                Whether you need 10 CPUs or 10,000 GPUs, our dynamic orchestration engine provisions resources instantly across the globe to meet your exact demand spikes.
              </p>
            </GlassCard>

            <GlassCard className="p-10 group hover:border-success/50 transition-colors duration-300">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="text-success" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-main mb-4">Eco-Friendly</h3>
              <p className="text-muted leading-relaxed">
                By utilizing existing hardware instead of building new data centers, we drastically reduce the carbon footprint associated with manufacturing and cooling infrastructure.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-main mb-6">Join the movement.</h2>
        <Link href="/auth/signup?mode=provider" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-secondary hover:bg-secondary/80 text-main font-bold text-lg transition-all shadow-[0_0_20px_rgba(45,124,255,0.3)] hover:shadow-[0_0_30px_rgba(45,124,255,0.5)]">
          Become a Node Provider <ArrowRight size={20} />
        </Link>
      </section>

    </div>
  );
}
