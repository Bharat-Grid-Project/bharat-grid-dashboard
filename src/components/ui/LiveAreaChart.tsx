/* eslint-disable react/no-unescaped-entities, react-hooks/set-state-in-effect, @typescript-eslint/no-explicit-any */
"use client";

import { GlassCard } from "./GlassCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LucideIcon } from "lucide-react";

interface LiveAreaChartProps {
  title: string;
  data: any[];
  dataKey: string;
  strokeColor: string;
  icon?: LucideIcon;
}

export function LiveAreaChart({ title, data, dataKey, strokeColor, icon: Icon }: LiveAreaChartProps) {
  // Generate a unique ID for the gradient based on the dataKey to prevent conflicts
  const gradientId = `gradient-${dataKey}`;

  return (
    <GlassCard className="p-5 flex flex-col h-full w-full min-h-[250px]">
      <h3 className="text-sm font-semibold text-main/80 flex items-center gap-2 mb-4">
        {Icon && <Icon style={{ color: strokeColor }} size={16} />} 
        {title}
      </h3>
      <div className="flex-1 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.5}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-glass-border)" vertical={false} horizontal={false} />
            <XAxis dataKey="time" hide axisLine={false} tickLine={false} />
            <YAxis hide domain={[0, 100]} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-glass-border)', borderRadius: '8px' }}
              itemStyle={{ color: strokeColor }}
              labelStyle={{ display: 'none' }}
              isAnimationActive={false}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={strokeColor} 
              strokeWidth={2} 
              fillOpacity={1} 
              fill={`url(#${gradientId})`} 
              isAnimationActive={false} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
