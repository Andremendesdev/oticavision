import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAdminEmail, isAdminEmail } from "@/lib/auth/admin"
import { createClient } from "@/lib/supabase/server"
import { siteName } from "@/lib/site/env"

export const metadata: Metadata = {
  title: `Admin | ${siteName}`,
  description: "Painel administrativo da barbearia",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!getAdminEmail()) {
    redirect("/login?error=admin_not_configured")
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">{children}</div>
  )
}
