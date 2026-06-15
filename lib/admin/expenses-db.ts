import { createClient } from "@/lib/supabase/client"
import { translateDbError } from "./errors"
import type { ExpenseCategory, ExpenseEntry } from "./types"

type ExpenseRow = {
  id: string
  amount: number
  category: string
  note: string | null
  created_at: string
}

function mapRow(row: ExpenseRow): ExpenseEntry {
  return {
    id: row.id,
    amount: Number(row.amount),
    category: row.category as ExpenseCategory,
    note: row.note ?? undefined,
    createdAt: row.created_at,
  }
}

function throwDb(error: unknown): never {
  throw new Error(translateDbError(error as Parameters<typeof translateDbError>[0]))
}

export async function fetchExpenses(): Promise<ExpenseEntry[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("expenses")
    .select("id, amount, category, note, created_at")
    .order("created_at", { ascending: false })

  if (error) throwDb(error)
  return (data as ExpenseRow[]).map(mapRow)
}

export async function insertExpense(
  amount: number,
  category: ExpenseCategory,
  note?: string
): Promise<ExpenseEntry> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("expenses")
    .insert({ amount, category, note: note ?? null })
    .select("id, amount, category, note, created_at")
    .single()

  if (error) throwDb(error)
  return mapRow(data as ExpenseRow)
}

export async function deleteExpense(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from("expenses").delete().eq("id", id)
  if (error) throwDb(error)
}
