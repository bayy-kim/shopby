import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function csrfGuard(request: NextRequest): NextResponse | null {
  const header = request.headers.get("x-csrf-token")
  const cookie = request.cookies.get("shopby_csrf")?.value

  if (!header || !cookie || header !== cookie) {
    return NextResponse.json({ error: "CSRF validation failed" }, { status: 403 })
  }
  return null
}

export function generateCsrfToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
}
