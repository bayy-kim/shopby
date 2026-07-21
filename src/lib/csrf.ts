import { NextResponse } from "next/server"

export function csrfGuard(request: Request): NextResponse | null {
  const header = request.headers.get("x-csrf-token")
  if (header !== "shopby-admin-1") {
    return NextResponse.json({ error: "CSRF validation failed" }, { status: 403 })
  }
  return null
}
