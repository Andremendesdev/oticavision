"use client"

import {
  Flame,
  Lightbulb,
  Target,
  TrendingUp,
  Trophy,
  Zap,
  CalendarDays,
  Scissors,
  Star,
  Users,
} from "lucide-react"
import type { DashboardStats } from "@/lib/admin/stats"
import { formatCurrency, formatShortDate } from "@/lib/admin/format"
import { MiniStat } from "./StatCard"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { parseISO } from "date-fns"

type InsightsPanelProps = {
  stats: DashboardStats
  monthlyGoal: number
  onGoalChange: (goal: number) => void
}

const moodConfig = {
  fire: {
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-500/8 border-orange-500/15",
    bar: "bg-orange-500",
    label: "Dia em chamas 🔥",
  },
  good: {
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-500/8 border-emerald-500/15",
    bar: "bg-emerald-500",
    label: "No caminho certo",
  },
  neutral: {
    icon: Zap,
    color: "text-[#38bdf8]",
    bg: "bg-[#38bdf8]/8 border-[#38bdf8]/15",
    bar: "bg-[#38bdf8]",
    label: "Ritmo estável",
  },
  slow: {
    icon: Lightbulb,
    color: "text-blue-400",
    bg: "bg-blue-500/8 border-blue-500/15",
    bar: "bg-blue-500",
    label: "Começando o dia",
  },
}

export default function InsightsPanel({
  stats,
  monthlyGoal,
  onGoalChange,
}: InsightsPanelProps) {
  const mood = moodConfig[stats.mood]
  const MoodIcon = mood.icon
  const goalPercent = Math.min(stats.goalProgress, 100)
  const overGoal = stats.goalProgress > 100

  return (
    <div className="space-y-4">
      {/* mood insight */}
      <div className={cn("rounded-2xl border p-5", mood.bg)}>
        <div className="flex items-start gap-3">
          <div className={cn("rounded-xl p-2.5", mood.bg)}>
            <MoodIcon className={cn("size-5", mood.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn("text-xs font-bold uppercase tracking-[0.18em]", mood.color)}>
              {mood.label}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#bbb]">
              {stats.insight}
            </p>
          </div>
        </div>
      </div>

      {/* goal */}
      <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#151515]">
        <div className="border-b border-[#1e1e1e] px-5 py-4">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-[#38bdf8]" />
            <h2 className="text-sm font-bold text-white">Meta mensal</h2>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-[#38bdf8]">
                {formatCurrency(stats.thisMonth)}
              </p>
              <p className="text-xs text-[#555]">
                de {formatCurrency(monthlyGoal)}
              </p>
            </div>
            <span className={cn(
              "rounded-full px-3 py-1 text-sm font-bold",
              overGoal
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-white/5 text-white"
            )}>
              {Math.min(stats.goalProgress, 999).toFixed(0)}%
            </span>
          </div>

          <div className="relative mb-1">
            <Progress
              value={goalPercent}
              className="h-2 bg-[#1e1e1e]"
            />
            {overGoal && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 rounded-full bg-emerald-400 ring-2 ring-[#151515]" />
            )}
          </div>
          <p className="text-[11px] text-[#444]">
            Projeção: {formatCurrency(stats.monthlyProjection)} · {stats.daysLeftInMonth}d restantes
          </p>

          <div className="mt-4 border-t border-[#1e1e1e] pt-4">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#555]">
              Ajustar meta (R$)
            </label>
            <Input
              type="number"
              min="0"
              step="100"
              defaultValue={monthlyGoal}
              onBlur={(e) => {
                const val = Number(e.target.value)
                if (val > 0) onGoalChange(val)
              }}
              className="h-9 border-[#222] bg-[#0a0a0a] text-sm text-white focus:border-[#38bdf8]/40"
            />
          </div>
        </div>
      </div>

      {/* mini stats grid */}
      <div className="grid grid-cols-2 gap-2">
        <MiniStat
          icon={Flame}
          label="Sequência"
          value={`${stats.streak} ${stats.streak === 1 ? "dia" : "dias"}`}
          hint="Dias faturando seguido"
        />
        <MiniStat
          icon={Scissors}
          label="Ticket médio"
          value={formatCurrency(stats.ticketMedio)}
          hint="Por cliente hoje"
        />
        <MiniStat
          icon={Star}
          label="Melhor dia"
          value={stats.bestWeekday}
          hint="Maior faturamento"
        />
        <MiniStat
          icon={Users}
          label="Atendimentos"
          value={String(stats.entriesToday)}
          hint="Clientes atendidos hoje"
        />
        <MiniStat
          icon={CalendarDays}
          label="Clientes no mês"
          value={String(stats.clientsThisMonth)}
          hint="Total de atendimentos"
        />
      </div>

      {/* personal record */}
      {stats.personalRecord > 0 && (
        <div className="flex items-center gap-4 rounded-2xl border border-[#38bdf8]/15 bg-gradient-to-r from-[#38bdf8]/5 to-transparent p-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#38bdf8]/10">
            <Trophy className="size-6 text-[#38bdf8]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666]">
              Recorde pessoal
            </p>
            <p className="text-xl font-bold text-white">
              {formatCurrency(stats.personalRecord)}
            </p>
            {stats.personalRecordDate && (
              <p className="text-xs text-[#555]">
                {formatShortDate(parseISO(stats.personalRecordDate))}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
