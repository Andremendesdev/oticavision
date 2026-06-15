"use client"

import type { CategoryTotal } from "@/lib/admin/stats"
import { formatCurrency } from "@/lib/admin/format"

type CategoryBreakdownProps = {
  categories: CategoryTotal[]
  monthTotal: number
}

export default function CategoryBreakdown({
  categories,
  monthTotal,
}: CategoryBreakdownProps) {
  const sorted = [...categories].sort((a, b) => b.total - a.total)

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#151515]">
      <div className="border-b border-[#222] px-6 py-4">
        <h2 className="text-base font-bold text-white">Por categoria</h2>
        <p className="text-xs text-[#555]">
          Mix do mês · {formatCurrency(monthTotal)}
        </p>
      </div>

      <div className="p-6">
        {sorted.length === 0 ? (
          <p className="py-6 text-center text-sm text-[#444]">
            Sem dados para o mês atual
          </p>
        ) : (
          <div className="space-y-4">
            {sorted.map((cat, idx) => (
              <div key={cat.category}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="shrink-0">{cat.emoji}</span>
                    <span className="truncate text-sm text-[#ccc]">{cat.label}</span>
                    <span className="shrink-0 rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] text-[#555]">
                      {cat.count} {cat.count === 1 ? "cliente" : "clientes"}
                    </span>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-white">
                    {formatCurrency(cat.total)}
                  </span>
                </div>

                {/* custom progress bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1e1e1e]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${cat.percent}%`,
                      background:
                        idx === 0
                          ? "#38bdf8"
                          : idx === 1
                          ? "#38bdf899"
                          : "#38bdf855",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
