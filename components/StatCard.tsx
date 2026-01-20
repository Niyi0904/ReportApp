import React from "react";
import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon,
  color,
  trend, // New optional prop
  children,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "brown" | "blue" | "emerald" | "purple" | "amber";
  trend?: string; // Type for trend
  children?: React.ReactNode;
}) {
  const colorMap = {
    brown: "bg-[#634832]/10 text-[#634832] border-[#634832]/20",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div className="group rounded-2xl bg-white border border-border p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 min-h-35">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`h-12 w-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${colorMap[color]}`}
          >
            {icon}
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">
              {title}
            </p>
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
          </div>
        </div>
      </div>

      {/* Render Trend or Children */}
      <div className="flex items-center justify-between mt-4">
        {trend ? (
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp size={12} />
            {trend}
          </div>
        ) : (
          <div /> // Spacer
        )}
        
        {children && (
          <div className="text-xs text-muted-foreground">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}