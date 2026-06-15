import type { PostgrestError } from "@supabase/supabase-js"

export function translateDbError(error: PostgrestError | Error): string {
  const message = "message" in error ? error.message : String(error)
  const code = "code" in error ? error.code : ""

  if (code === "42P01" || message.includes("does not exist")) {
    if (message.includes("expenses")) {
      return "Tabela de despesas não encontrada. Rode supabase/migrations/003_expenses.sql."
    }
    if (message.includes("client_count")) {
      return "Coluna client_count não encontrada. Rode supabase/migrations/004_client_count.sql."
    }
    return "Tabelas não encontradas. Rode supabase/migrations/001_admin.sql no SQL Editor."
  }

  if (message.includes("client_count") && code === "42703") {
    return "Coluna client_count não encontrada. Rode supabase/migrations/004_client_count.sql."
  }

  if (code === "42501" || message.toLowerCase().includes("row-level security")) {
    return "Sem permissão. Faça login e rode supabase/migrations/002_auth_rls.sql."
  }

  if (message.includes("JWT")) {
    return "Sessão expirada. Faça login novamente."
  }

  return message || "Erro ao acessar o banco."
}
