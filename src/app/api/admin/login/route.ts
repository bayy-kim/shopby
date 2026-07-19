import { NextResponse } from "next/server"
import { createSessionToken } from "@/lib/auth"
import { validateCredentials } from "@/lib/auth-password"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password harus diisi" },
        { status: 400 }
      )
    }

    const valid = validateCredentials(email, password)

    if (!valid) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      )
    }

    const token = await createSessionToken()

    const response = NextResponse.json({ success: true })

    response.cookies.set("shopby_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/admin",
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
