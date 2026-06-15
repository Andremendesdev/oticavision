import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { isAdminEmail } from "@/lib/auth/admin"
import {
  isAdminConfigured,
  redirectWithCookies,
} from "@/lib/auth/guard"
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./env"

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === "/login"
  const isAdminRoute = pathname.startsWith("/admin")

  if (!isAdminRoute && !isLoginPage) {
    return NextResponse.next({ request })
  }

  if (!isSupabaseConfigured) {
    if (isAdminRoute) {
      return NextResponse.redirect(
        new URL("/login?error=config", request.url)
      )
    }
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (isAdminRoute) {
    if (!isAdminConfigured()) {
      return redirectWithCookies(request, supabaseResponse, "/login", {
        error: "admin_not_configured",
      })
    }

    if (!user) {
      return redirectWithCookies(request, supabaseResponse, "/login", {
        redirect: pathname,
      })
    }

    if (!isAdminEmail(user.email)) {
      await supabase.auth.signOut()
      return redirectWithCookies(request, supabaseResponse, "/login", {
        error: "unauthorized",
      })
    }
  }

  if (isLoginPage && user && isAdminEmail(user.email)) {
    return redirectWithCookies(request, supabaseResponse, "/admin")
  }

  return supabaseResponse
}
