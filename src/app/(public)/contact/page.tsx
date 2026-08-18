"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, MessageSquare, Send, Globe, MessageCircle, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/ui/GlassCard";

export default function ContactPage() {
  const [toast, setToast] = useState(false);

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 min-h-[calc(100vh-160px)] relative">
      
      {/* Local Toast Notification */}
      <div className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-main/10 shadow-2xl transition-all duration-300",
        toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}>
        <Info size={18} className="text-primary" />
        <span className="text-main font-medium text-sm">Social links coming soon!</span>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-main mb-4">Get in Touch</h1>
        <p className="text-xl text-muted">
          Have questions about deploying on Bharat-Grid or becoming a Node Provider? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Contact Form */}
        <div>
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-main mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-main/80 mb-2">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full bg-main/5 border border-main/10 rounded-lg p-3 text-main placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-main/80 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full bg-main/5 border border-main/10 rounded-lg p-3 text-main placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-main/80 mb-2">Message</label>
                <textarea 
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full bg-main/5 border border-main/10 rounded-lg p-3 text-main placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all resize-none shadow-inner"
                />
              </div>

              <button 
                type="button"
                className="w-full bg-secondary hover:bg-secondary/80 text-main px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(45,124,255,0.3)] hover:shadow-[0_0_25px_rgba(45,124,255,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                onClick={handleComingSoon}
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Right Column: Community & Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-main mb-6">Join the Community</h2>
            <p className="text-muted leading-relaxed mb-8">
              Bharat-Grid is built for developers, by developers. Connect with us on social media or join our open-source development discussions on Discord and GitHub.
            </p>
            
            <div className="space-y-4">
              <a href="#" onClick={handleComingSoon} className="flex items-center gap-4 p-4 rounded-xl border border-main/5 bg-main/5 hover:bg-main/10 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#5865F2]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="text-[#5865F2]" size={24} />
                </div>
                <div>
                  <h3 className="text-main font-bold">Join our Discord</h3>
                  <p className="text-sm text-muted">Chat with the core team and other node providers.</p>
                </div>
              </a>

              <a href="#" onClick={handleComingSoon} className="flex items-center gap-4 p-4 rounded-xl border border-main/5 bg-main/5 hover:bg-main/10 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-muted/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="text-main" size={24} />
                </div>
                <div>
                  <h3 className="text-main font-bold">GitHub Repository</h3>
                  <p className="text-sm text-muted">Contribute to the open-source SDK and node client.</p>
                </div>
              </a>

              <a href="#" onClick={handleComingSoon} className="flex items-center gap-4 p-4 rounded-xl border border-main/5 bg-main/5 hover:bg-main/10 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#1DA1F2]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="text-[#1DA1F2]" size={24} />
                </div>
                <div>
                  <h3 className="text-main font-bold">Follow us on X</h3>
                  <p className="text-sm text-muted">Get the latest network updates and announcements.</p>
                </div>
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-main/10">
            <h3 className="text-lg font-bold text-main mb-4">Direct Support</h3>
            <a href="#" onClick={handleComingSoon} className="inline-flex items-center gap-3 text-primary hover:text-main transition-colors text-lg font-medium">
              <Mail size={20} />
              support@bharat-grid.network
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
