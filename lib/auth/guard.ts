import { NextResponse, type NextRequest } from "next/server"
import { getAdminEmail, isAdminEmail } from "@/lib/auth/admin"

export function copySupabaseCookies(
  from: NextResponse,
  to: NextResponse
) {
  from.cookies.getAll().forEach(({ name, value, ...options }) => {
    to.cookies.set(name, value, options)
  })
}

export function redirectWithCookies(
  request: NextRequest,
  supabaseResponse: NextResponse,
  pathname: string,
  searchParams?: Record<string, string>
) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  const redirect = NextResponse.redirect(url)
  copySupabaseCookies(supabaseResponse, redirect)
  return redirect
}

export function isAdminConfigured() {
  return getAdminEmail().length > 0
}
