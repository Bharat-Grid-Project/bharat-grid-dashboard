"use client";

import { ReactNode } from "react";
import { GlassCard } from "./GlassCard";
import { cn } from "./GlassCard";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  className?: string;
}

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
};

export function DataTable<T>({ data, columns, keyExtractor, className }: DataTableProps<T>) {
  return (
    <GlassCard className={cn("p-0 overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-main/10 bg-main/[0.02]">
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider"
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable && (
                      <button className="text-muted hover:text-main/80 transition-colors">
                        <ArrowUpDown size={14} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody 
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-white/10"
          >
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-muted">
                  No data available.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <motion.tr 
                  variants={rowVariants}
                  key={keyExtractor(item)} 
                  className="hover:bg-main/[0.02] transition-colors duration-150 group"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-main/10 flex items-center justify-between bg-main/[0.01]">
        <div className="text-sm text-muted">
          Showing <span className="font-medium text-main/90">1</span> to <span className="font-medium text-main/90">{data.length}</span> of <span className="font-medium text-main/90">{data.length}</span> results
        </div>
        
        <div className="flex gap-2">
          <button className="p-1 rounded-md border border-main/10 text-muted hover:text-main hover:bg-main/5 transition-colors disabled:opacity-50 disabled:pointer-events-none">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1 rounded-md border border-main/10 text-muted hover:text-main hover:bg-main/5 transition-colors disabled:opacity-50 disabled:pointer-events-none">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
