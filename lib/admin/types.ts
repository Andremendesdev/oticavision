export type EarningCategory =
  | "corte"
  | "barba"
  | "combo"
  | "produto"
  | "gorjeta"
  | "outro"

export type EarningEntry = {
  id: string
  amount: number
  category: EarningCategory
  /** Número de clientes/atendimentos neste registro (padrão: 1) */
  clientCount: number
  note?: string
  createdAt: string
}

export type AdminSettings = {
  monthlyGoal: number
}

export const EARNING_CATEGORIES: {
  value: EarningCategory
  label: string
  emoji: string
}[] = [
  { value: "corte", label: "Corte", emoji: "✂️" },
  { value: "barba", label: "Barba", emoji: "🧔" },
  { value: "combo", label: "Combo", emoji: "💈" },
  { value: "produto", label: "Produto", emoji: "🧴" },
  { value: "gorjeta", label: "Gorjeta", emoji: "💰" },
  { value: "outro", label: "Outro", emoji: "📌" },
]

export const QUICK_AMOUNTS = [30, 40, 50, 60, 80, 100, 120, 150]

export type ExpenseCategory =
  | "aluguel"
  | "produtos"
  | "energia"
  | "salario"
  | "manutencao"
  | "marketing"
  | "outro"

export type ExpenseEntry = {
  id: string
  amount: number
  category: ExpenseCategory
  note?: string
  createdAt: string
}

export const EXPENSE_CATEGORIES: {
  value: ExpenseCategory
  label: string
  emoji: string
}[] = [
  { value: "aluguel", label: "Aluguel", emoji: "🏠" },
  { value: "produtos", label: "Produtos", emoji: "🧴" },
  { value: "energia", label: "Energia", emoji: "⚡" },
  { value: "salario", label: "Salário", emoji: "👤" },
  { value: "manutencao", label: "Manutenção", emoji: "🔧" },
  { value: "marketing", label: "Marketing", emoji: "📣" },
  { value: "outro", label: "Outro", emoji: "📌" },
]

export const QUICK_EXPENSE_AMOUNTS = [50, 100, 200, 500, 800, 1000]
