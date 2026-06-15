"use client"

import { useState } from "react"
import { CheckCircle, Loader2, Plus, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  EARNING_CATEGORIES,
  QUICK_AMOUNTS,
  type EarningCategory,
} from "@/lib/admin/types"
import { formatCurrency } from "@/lib/admin/format"
import { cn } from "@/lib/utils"

type AddEarningPanelProps = {
  onAdd: (
    amount: number,
    category: EarningCategory,
    clientCount: number,
    note?: string
  ) => void | Promise<void>
}

export default function AddEarningPanel({ onAdd }: AddEarningPanelProps) {
  const [amount, setAmount] = useState("")
  const [clientCount, setClientCount] = useState("1")
  const [category, setCategory] = useState<EarningCategory>("corte")
  const [note, setNote] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [amountError, setAmountError] = useState("")
  const [clientsError, setClientsError] = useState("")

  function showSuccess() {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  function parseClients(value: string) {
    const parsed = Number(value.replace(",", "."))
    if (!Number.isInteger(parsed) || parsed < 1) return null
    return parsed
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsedAmount = Number(amount.replace(",", "."))
    const parsedClients = parseClients(clientCount)

    let hasError = false
    if (!parsedAmount || parsedAmount <= 0) {
      setAmountError("Informe um valor maior que zero.")
      hasError = true
    } else {
      setAmountError("")
    }

    if (!parsedClients) {
      setClientsError("Informe pelo menos 1 cliente.")
      hasError = true
    } else {
      setClientsError("")
    }

    if (hasError || !parsedClients) return

    setSubmitting(true)
    try {
      await onAdd(parsedAmount, category, parsedClients, note.trim() || undefined)
      setAmount("")
      setClientCount("1")
      setNote("")
      showSuccess()
    } finally {
      setSubmitting(false)
    }
  }

  async function quickAdd(value: number) {
    if (submitting) return
    setSubmitting(true)
    try {
      await onAdd(value, category, 1)
      showSuccess()
    } finally {
      setSubmitting(false)
    }
  }

  const parsedAmount = Number(amount.replace(",", "."))
  const parsedClients = parseClients(clientCount)
  const previewTicket =
    parsedAmount > 0 && parsedClients
      ? parsedAmount / parsedClients
      : null

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#151515]">
      <div className="border-b border-[#222] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#38bdf8]/15">
            <Plus className="size-4 text-[#38bdf8]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Registrar ganho</h2>
            <p className="text-xs text-[#666]">Valor total e quantidade de clientes</p>
          </div>
          {success && (
            <div className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
              <CheckCircle className="size-3" />
              Salvo!
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-[#666]">
                Valor total (R$)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#555]">
                  R$
                </span>
                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="400,00"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    if (amountError) setAmountError("")
                  }}
                  className={cn(
                    "h-12 border-[#2a2a2a] bg-[#0f0f0f] pl-9 text-lg font-bold text-white placeholder:text-[#333] focus:border-[#38bdf8]/50",
                    amountError && "border-red-500/50 focus:border-red-500"
                  )}
                />
              </div>
              {amountError && (
                <p className="mt-1 text-xs text-red-400">{amountError}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-[#666]">
                Clientes
              </label>
              <div className="relative">
                <Users className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#555]" />
                <Input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="15"
                  value={clientCount}
                  onChange={(e) => {
                    setClientCount(e.target.value)
                    if (clientsError) setClientsError("")
                  }}
                  className={cn(
                    "h-12 border-[#2a2a2a] bg-[#0f0f0f] pl-9 text-lg font-bold text-white placeholder:text-[#333] focus:border-[#38bdf8]/50",
                    clientsError && "border-red-500/50 focus:border-red-500"
                  )}
                />
              </div>
              {clientsError && (
                <p className="mt-1 text-xs text-red-400">{clientsError}</p>
              )}
            </div>
          </div>

          {previewTicket !== null && (
            <p className="rounded-lg border border-[#222] bg-[#0f0f0f] px-3 py-2 text-xs text-[#666]">
              Ticket médio deste registro:{" "}
              <span className="font-semibold text-[#38bdf8]">
                {formatCurrency(previewTicket)}
              </span>
              {" "}por cliente
            </p>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-[#666]">
              Categoria
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {EARNING_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "rounded-xl border py-2.5 text-center text-xs font-medium transition-all",
                    category === cat.value
                      ? "border-[#38bdf8]/60 bg-[#38bdf8]/10 text-[#38bdf8]"
                      : "border-[#222] bg-[#0f0f0f] text-[#666] hover:border-[#333] hover:text-[#999]"
                  )}
                >
                  <span className="block text-base leading-none">{cat.emoji}</span>
                  <span className="mt-1 block">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-[#666]">
              Obs. <span className="normal-case tracking-normal text-[#444]">(opcional)</span>
            </label>
            <Input
              placeholder="Turno da tarde, promoção..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border-[#2a2a2a] bg-[#0f0f0f] text-white placeholder:text-[#333] focus:border-[#38bdf8]/50"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="h-11 w-full bg-[#38bdf8] font-bold text-black hover:bg-[#7dd3fc] disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )}
            {submitting ? "Salvando..." : "Adicionar ganho"}
          </Button>
        </form>

        <div className="mt-5 border-t border-[#1e1e1e] pt-4">
          <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#555]">
            <Zap className="size-3 text-[#38bdf8]" />
            Atalhos rápidos <span className="normal-case tracking-normal text-[#444]">(1 cliente)</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_AMOUNTS.map((v) => (
              <button
                key={v}
                type="button"
                disabled={submitting}
                onClick={() => quickAdd(v)}
                className="rounded-lg border border-[#222] bg-[#0a0a0a] px-3 py-1.5 text-xs font-semibold text-[#888] transition-all hover:border-[#38bdf8]/40 hover:text-[#38bdf8] disabled:opacity-40"
              >
                {formatCurrency(v)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
