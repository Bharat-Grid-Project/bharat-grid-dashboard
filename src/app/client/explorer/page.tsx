"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Link2, Hexagon, Fingerprint, Database, CheckCircle2 } from "lucide-react";

export default function BlockchainExplorer() {
  const transactions = [
    { type: "Escrow Release", hash: "0xescrowf4a8b792...", amount: "10 BGT", to: "0x5B38Da6a...eddC4", time: "Just now" },
    { type: "Proof Verified", hash: "0xproof82d921a4...", node: "Node-Alpha-42", status: "Verified", time: "2 mins ago" },
    { type: "Node Registered", hash: "0xabc1237f89d3...", node: "Node-Beta-11", status: "Active", time: "15 mins ago" },
    { type: "Escrow Deposit", hash: "0xdep9872be4...", amount: "10 BGT", from: "Client-0x8A1...", time: "22 mins ago" },
    { type: "Workload Deployed", hash: "0xdeploy872a...", image: "nginx:latest", node: "Node-Alpha-42", time: "25 mins ago" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-main tracking-tight flex items-center gap-3">
            <Hexagon className="text-secondary" size={32} />
            Live Blockchain Explorer
          </h1>
          <p className="text-muted mt-2">
            Real-time verification of Zero-Knowledge Proofs and BGT automated payouts on the Sepolia Testnet.
          </p>
        </div>
        <div className="bg-success/10 border border-success/30 px-4 py-2 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(22,163,74,0.6)]"></div>
            <span className="text-sm font-bold text-success">Sepolia Network Connected</span>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="p-6 border-b border-main/5 bg-main/[0.02]">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-main">
            <Database className="text-primary" size={20} />
            Ledger Activity (Latest Blocks)
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-main/10 text-sm text-muted">
                <th className="p-4 font-medium uppercase tracking-wider">Transaction Type</th>
                <th className="p-4 font-medium uppercase tracking-wider">Tx Hash</th>
                <th className="p-4 font-medium uppercase tracking-wider">Details</th>
                <th className="p-4 font-medium uppercase tracking-wider">Status</th>
                <th className="p-4 font-medium uppercase tracking-wider text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-main/5">
              {transactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-main/[0.02] transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-main/90 flex items-center gap-2">
                      {tx.type.includes("Escrow") || tx.type.includes("Proof") ? <Fingerprint size={16} className="text-secondary" /> : <Link2 size={16} className="text-muted" />}
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 text-xs">
                      {tx.hash}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted">
                    {tx.amount && <span className="text-success font-bold mr-2">{tx.amount}</span>}
                    {tx.to && <span>To: <span className="font-mono">{tx.to}</span></span>}
                    {tx.from && <span>From: <span className="font-mono">{tx.from}</span></span>}
                    {tx.node && <span>Node: <span className="font-mono">{tx.node}</span></span>}
                    {tx.image && <span>Image: <span className="font-mono">{tx.image}</span></span>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-success text-xs font-bold bg-success/10 w-max px-2 py-1 rounded border border-success/30">
                      <CheckCircle2 size={14} /> Confirmed
                    </div>
                  </td>
                  <td className="p-4 text-right text-xs text-muted">
                    {tx.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
