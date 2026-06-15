"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const supabase = useMemo(() => createClient(), [])
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let mounted = true

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser()
      if (!mounted) return

      setState({
        user: data.user,
        loading: false,
        error: error?.message ?? null,
      })
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setState((prev) => ({
        ...prev,
        user: session?.user ?? null,
        loading: false,
      }))
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = useCallback(
    async (email: string, password: string) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        setState((prev) => ({ ...prev, loading: false, error: error.message }))
        return { ok: false as const, error: error.message }
      }

      setState((prev) => ({ ...prev, loading: false, error: null }))
      return { ok: true as const }
    },
    [supabase]
  )

  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    const { error } = await supabase.auth.signOut()

    setState({
      user: null,
      loading: false,
      error: error?.message ?? null,
    })

    return { ok: !error, error: error?.message }
  }, [supabase])

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signIn,
    signOut,
  }
}
