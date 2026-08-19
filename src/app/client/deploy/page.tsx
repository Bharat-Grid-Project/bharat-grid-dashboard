"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Box, Cpu, HardDrive, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/components/ui/GlassCard";

export default function DeployWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);

  // Form state
  const [appName, setAppName] = useState("");
  const [image, setImage] = useState("");
  const [cpu, setCpu] = useState(2);
  const [ram, setRam] = useState(4);
  const [gpu, setGpu] = useState(0);

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    try {
      const res = await fetch('http://localhost:8000/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app_name: appName,
          docker_image: image
        })
      });
      
      if (!res.ok) throw new Error('Deployment failed');
      
      const data = await res.json();
      router.push(`/client/deployments/${data.app_name}`);
    } catch (err) {
      console.error(err);
      alert('Failed to deploy. Is the orchestrator running and are there active nodes?');
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      
      <div className="mb-8">
        <Link href="/client/overview" className="text-sm text-muted hover:text-secondary transition-colors mb-4 inline-block">
          ← Cancel Deployment
        </Link>
        <h1 className="text-3xl font-bold text-main tracking-tight">Deploy New Workload</h1>
        <p className="text-muted mt-2">Configure your container and allocate resources across the decentralized grid.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-card rounded-full -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-secondary rounded-full -z-10 transition-all duration-500"
          style={{ width: step === 1 ? '0%' : '50%' }}
        />
        
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center gap-2">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors", step >= 1 ? "bg-secondary text-main shadow-[0_0_15px_rgba(45,124,255,0.4)]" : "bg-card text-muted")}>
              1
            </div>
            <span className={cn("text-xs font-medium uppercase tracking-wider", step >= 1 ? "text-secondary" : "text-muted")}>Metadata</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors", step >= 2 ? "bg-secondary text-main shadow-[0_0_15px_rgba(45,124,255,0.4)]" : "bg-card text-muted")}>
              2
            </div>
            <span className={cn("text-xs font-medium uppercase tracking-wider", step >= 2 ? "text-secondary" : "text-muted")}>Compute</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors", step >= 3 ? "bg-secondary text-main shadow-[0_0_15px_rgba(45,124,255,0.4)]" : "bg-card text-muted")}>
              3
            </div>
            <span className={cn("text-xs font-medium uppercase tracking-wider", step >= 3 ? "text-secondary" : "text-muted")}>Review</span>
          </div>
        </div>
      </div>

      <GlassCard className="p-8">
        
        {/* STEP 1: Metadata */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-semibold text-main mb-6 flex items-center gap-2">
                <Box className="text-secondary" /> Application Metadata
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-main/80 mb-1.5">Project Name</label>
                  <input 
                    type="text" 
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="e.g. my-ml-worker"
                    className="w-full bg-canvas/50 border border-main/10 rounded-lg p-3 text-main focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-main/80 mb-1.5">Docker Image Path</label>
                  <input 
                    type="text" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="e.g. registry.hub.docker.com/library/nginx:latest"
                    className="w-full bg-canvas/50 border border-main/10 rounded-lg p-3 text-main focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-main/10 flex justify-end">
              <button 
                disabled={!appName || !image}
                onClick={() => setStep(2)}
                className="bg-secondary hover:bg-secondary/80 text-main px-6 py-2.5 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Compute Sizing */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-semibold text-main mb-6 flex items-center gap-2">
                <Cpu className="text-primary" /> Compute Sizing
              </h2>
              
              <div className="space-y-8">
                {/* CPU Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-main/80 flex items-center gap-2"><Cpu size={16}/> CPU Cores</label>
                    <span className="font-mono text-primary bg-primary/10 px-3 py-1 rounded border border-primary/30">{cpu} vCPU</span>
                  </div>
                  <input 
                    type="range" min="1" max="16" step="1" 
                    value={cpu} onChange={(e) => setCpu(parseInt(e.target.value))}
                    className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between text-xs text-muted mt-2">
                    <span>1 Core</span>
                    <span>16 Cores</span>
                  </div>
                </div>

                {/* RAM Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-main/80 flex items-center gap-2"><HardDrive size={16}/> Memory (RAM)</label>
                    <span className="font-mono text-tertiary bg-tertiary/10 px-3 py-1 rounded border border-tertiary/30">{ram} GB</span>
                  </div>
                  <input 
                    type="range" min="1" max="64" step="1" 
                    value={ram} onChange={(e) => setRam(parseInt(e.target.value))}
                    className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between text-xs text-muted mt-2">
                    <span>1 GB</span>
                    <span>64 GB</span>
                  </div>
                </div>

                {/* GPU Architecture Toggle */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-main/80">GPU Requirements</label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setGpu(0)}
                      className={cn("p-4 rounded-xl border text-left transition-all", gpu === 0 ? "border-secondary bg-secondary/10 shadow-[inset_0_0_20px_rgba(45,124,255,0.15)]" : "border-main/10 bg-card hover:border-main/30")}
                    >
                      <div className="font-semibold text-main mb-1">CPU Only</div>
                      <div className="text-xs text-muted">Standard web and API workloads</div>
                    </button>
                    <button 
                      onClick={() => setGpu(1)}
                      className={cn("p-4 rounded-xl border text-left transition-all", gpu === 1 ? "border-secondary bg-secondary/10 shadow-[inset_0_0_20px_rgba(45,124,255,0.15)]" : "border-main/10 bg-card hover:border-main/30")}
                    >
                      <div className="font-semibold text-main mb-1">Discrete GPU</div>
                      <div className="text-xs text-muted">Machine learning and rendering</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-main/10 flex justify-between">
              <button 
                onClick={() => setStep(1)}
                className="text-muted hover:text-main px-4 py-2 font-medium transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="bg-secondary hover:bg-secondary/80 text-main px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                Review <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-semibold text-main mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-success" /> Review & Deploy
              </h2>
              
              <div className="bg-canvas/50 rounded-xl border border-main/5 p-6 mb-6">
                <h3 className="text-lg font-bold text-main mb-4">{appName}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-main/5">
                    <span className="text-muted text-sm">Image Path</span>
                    <span className="text-main/90 font-mono text-sm">{image}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-main/5">
                    <span className="text-muted text-sm">CPU Cores</span>
                    <span className="text-primary font-mono text-sm">{cpu} vCPU</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-main/5">
                    <span className="text-muted text-sm">Memory</span>
                    <span className="text-tertiary font-mono text-sm">{ram} GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted text-sm">GPU Architecture</span>
                    <span className="text-success font-mono text-sm">{gpu > 0 ? "Discrete GPU Enabled" : "CPU Only"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 flex gap-3 text-sm">
                <Zap className="text-warning shrink-0" size={20} />
                <div className="text-warning">
                  Clicking deploy will trigger the Bharat-Grid orchestrator to securely shard and distribute your workload to the most optimal decentralized node based on your requirements.
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-main/10 flex justify-between">
              <button 
                onClick={() => setStep(2)}
                disabled={isDeploying}
                className="text-muted hover:text-main px-4 py-2 font-medium transition-colors disabled:opacity-50"
              >
                Back
              </button>
              <button 
                onClick={handleDeploy}
                disabled={isDeploying}
                className="bg-success hover:bg-success/80 text-main px-8 py-3 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)] flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDeploying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-main/20 border-t-white rounded-full animate-spin" />
                    Finding Optimal Node...
                  </>
                ) : (
                  <>Deploy to Bharat-Grid</>
                )}
              </button>
            </div>
          </div>
        )}

      </GlassCard>
    </div>
  );
}
