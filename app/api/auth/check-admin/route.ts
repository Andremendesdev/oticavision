import { NextResponse } from "next/server"
import { getAdminEmail, isAdminEmail } from "@/lib/auth/admin"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  if (!getAdminEmail()) {
    return NextResponse.json(
      { ok: false, error: "admin_not_configured" },
      { status: 503 }
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    await supabase.auth.signOut()
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 403 }
    )
  }

  return NextResponse.json({ ok: true })
}
