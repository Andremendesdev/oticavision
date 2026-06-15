"use client"

import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"
import { formatPercent } from "@/lib/admin/format"

type Variant = "default" | "gold" | "profit" | "loss" | "neutral"

type StatCardProps = {
  label: string
  value: string
  sublabel?: string
  change?: number
  variant?: Variant
  icon?: LucideIcon
  className?: string
}

const variantStyles: Record<Variant, { card: string; value: string; bar: string }> = {
  default: {
    card: "border-[#2a2a2a] bg-[#151515] hover:border-[#3a3a3a]",
    value: "text-white",
    bar: "bg-[#3a3a3a]",
  },
  gold: {
    card: "border-[#38bdf8]/30 bg-gradient-to-br from-[#151515] to-[#1c1900] hover:border-[#38bdf8]/50",
    value: "text-[#38bdf8]",
    bar: "bg-[#38bdf8]",
  },
  profit: {
    card: "border-emerald-500/20 bg-gradient-to-br from-[#151515] to-[#0d1a10] hover:border-emerald-500/40",
    value: "text-emerald-400",
    bar: "bg-emerald-500",
  },
  loss: {
    card: "border-red-500/20 bg-gradient-to-br from-[#151515] to-[#1a0d0d] hover:border-red-500/40",
    value: "text-red-400",
    bar: "bg-red-500",
  },
  neutral: {
    card: "border-[#2a2a2a] bg-[#151515] hover:border-[#3a3a3a]",
    value: "text-[#aaa]",
    bar: "bg-[#3a3a3a]",
  },
}

export default function StatCard({
  label,
  value,
  sublabel,
  change,
  variant = "default",
  icon: Icon,
  className,
}: StatCardProps) {
  const s = variantStyles[variant]
  const isPositive = change !== undefined && change >= 0
  const showChange = change !== undefined && !Number.isNaN(change)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 transition-all duration-200",
        s.card,
        className
      )}
    >
      {/* top accent bar */}
      <div className={cn("absolute inset-x-0 top-0 h-0.5", s.bar)} />

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#666]">
          {label}
        </p>
        {Icon && (
          <div className="rounded-lg bg-white/5 p-1.5">
            <Icon className={cn("size-4", s.value)} />
          </div>
        )}
      </div>

      <p className={cn("mt-3 text-3xl font-bold tracking-tight", s.value)}>
        {value}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {showChange && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              isPositive
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400"
            )}
          >
            {isPositive ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {formatPercent(change)}
          </span>
        )}
        {sublabel && (
          <span className="text-xs text-[#555]">{sublabel}</span>
        )}
      </div>
    </div>
  )
}

export function MiniStat({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string
  value: string
  hint?: string
  icon?: LucideIcon
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#222] bg-[#0f0f0f] px-4 py-3">
      {Icon && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
          <Icon className="size-4 text-[#666]" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-[#555]">{label}</p>
        <p className="mt-0.5 truncate text-base font-bold text-white">{value}</p>
        {hint && <p className="text-[11px] text-[#555]">{hint}</p>}
      </div>
    </div>
  )
}
