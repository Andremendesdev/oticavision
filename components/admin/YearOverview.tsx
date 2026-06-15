"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatCurrency } from "@/lib/admin/format"

const chartConfig = {
  total: {
    label: "Mês",
    color: "#38bdf8",
  },
} satisfies ChartConfig

type YearOverviewProps = {
  data: { month: string; total: number }[]
  yearTotal: number
}

export default function YearOverview({ data, yearTotal }: YearOverviewProps) {
  const currentMonth = new Date().getMonth()
  const hasData = data.some((d) => d.total > 0)

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#151515]">
      <div className="border-b border-[#222] px-6 py-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">Visão anual</h2>
            <p className="text-xs text-[#555]">Faturamento mês a mês</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#555]">Total {new Date().getFullYear()}</p>
            <p className="text-xl font-bold text-[#38bdf8]">
              {formatCurrency(yearTotal)}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        {!hasData ? (
          <div className="flex h-[180px] items-center justify-center text-sm text-[#444]">
            Sem dados para o ano atual
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#1e1e1e" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#555", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#444", fontSize: 10 }}
                tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
              />
              <ChartTooltip
                cursor={{ fill: "rgba(56,189,248,0.05)" }}
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                }
              />
              <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={28}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === currentMonth ? "#38bdf8" : "#38bdf8"}
                    opacity={index === currentMonth ? 1 : 0.35}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  )
}
