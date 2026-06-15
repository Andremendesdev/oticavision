function readEnv(name: string) {
  const value = process.env[name]
  return typeof value === "string" ? value.trim() : ""
}

export const supabaseUrl = readEnv("NEXT_PUBLIC_SUPABASE_URL")

export const supabaseAnonKey =
  readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
  readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0

export function getSupabaseEnv() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local e reinicie o servidor (pnpm dev)."
    )
  }

  return { url: supabaseUrl, anonKey: supabaseAnonKey }
}
