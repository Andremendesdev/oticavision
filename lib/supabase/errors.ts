export function translateAuthError(message: string): string {
  const normalized = message.trim()

  if (
    normalized === "Invalid API key" ||
    normalized.toLowerCase().includes("invalid api key")
  ) {
    return "Chave de API inválida. Copie a Legacy anon key (eyJ...) no Supabase Dashboard → Settings → API Keys e coloque em NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local. Reinicie o pnpm dev."
  }

  if (normalized === "Invalid login credentials") {
    return "E-mail ou senha incorretos."
  }

  if (normalized.toLowerCase().includes("email not confirmed")) {
    return "E-mail não confirmado. No Supabase, marque o usuário como confirmado."
  }

  return normalized || "Não foi possível entrar."
}
