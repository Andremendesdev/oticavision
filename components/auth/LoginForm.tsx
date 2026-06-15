"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, Lock, Scissors } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { translateAuthError } from "@/lib/supabase/errors"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteName } from "@/lib/site/env"

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized: "Acesso negado. Use o e-mail configurado em ADMIN_EMAIL.",
  config: "Supabase não configurado. Verifique as variáveis de ambiente.",
  admin_not_configured:
    "ADMIN_EMAIL não configurado no .env.local. Reinicie o pnpm dev.",
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, loading } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const queryError = searchParams.get("error")
  const redirectTo = searchParams.get("redirect") || "/admin"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting || loading) return

    setSubmitting(true)
    setError(null)

    const result = await signIn(email, password)

    if (!result.ok) {
      setError(translateAuthError(result.error ?? ""))
      setSubmitting(false)
      return
    }

    const check = await fetch("/api/auth/check-admin")
    const checkData = (await check.json()) as { ok: boolean; error?: string }

    if (!checkData.ok) {
      setError(
        ERROR_MESSAGES[checkData.error ?? "unauthorized"] ??
          "Acesso negado para este usuário."
      )
      setSubmitting(false)
      return
    }

    router.push(redirectTo.startsWith("/admin") ? redirectTo : "/admin")
    router.refresh()
  }

  const displayError =
    error ??
    (queryError ? ERROR_MESSAGES[queryError] ?? "Erro ao autenticar." : null)

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#38bdf8]/15">
          <Scissors className="size-7 text-[#38bdf8]" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-white">{siteName}</h1>
        <p className="mt-2 text-sm text-[#888]">Acesso administrativo</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#2a2a2a] bg-[#151515] p-6 shadow-xl"
      >
        {displayError && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {displayError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs uppercase tracking-widest text-[#666]"
            >
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="h-11 border-[#333] bg-[#0a0a0a] text-white placeholder:text-[#444]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs uppercase tracking-widest text-[#666]"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 border-[#333] bg-[#0a0a0a] text-white placeholder:text-[#444]"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={submitting || loading}
          className="mt-6 h-11 w-full bg-[#38bdf8] font-semibold text-black hover:bg-[#7dd3fc] disabled:opacity-60"
        >
          {submitting || loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              <Lock className="size-4" />
              Entrar
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-[#555]">
        Apenas o administrador cadastrado no Supabase pode acessar.
      </p>
    </div>
  )
}
