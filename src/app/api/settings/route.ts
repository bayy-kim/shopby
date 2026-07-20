import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifySessionToken } from "@/lib/auth"

const SETTINGS_KEY = "store_settings"

const defaultSettings = {
  storeName: "Shopby Affiliate Store",
  storeUrl: "shopby.io",
  bio: "Kurator produk affiliate Shopee pilihan — rekomendasi terbaik, harga transparan.",
  bankName: "BCA",
  accountNumber: "1234-5678-9012",
  accountHolder: "JOHN DOE",
  minPayout: 100000,
  primaryColor: "red",
  autoPayout: true,
  twoFA: false,
}

async function getAuth(request: Request) {
  const cookieHeader = request.headers.get("cookie") || ""
  const match = cookieHeader.match(/shopby_admin_session=([^;]+)/)
  if (!match) return null
  return verifySessionToken(match[1])
}

async function readSettings(): Promise<Record<string, unknown>> {
  try {
    const row = await prisma.appSetting.findUnique({ where: { key: SETTINGS_KEY } })
    if (!row) return { ...defaultSettings }
    return { ...defaultSettings, ...JSON.parse(row.value) }
  } catch {
    return { ...defaultSettings }
  }
}

export async function GET(request: Request) {
  const session = await getAuth(request)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const settings = await readSettings()
  return NextResponse.json(settings)
}

export async function PUT(request: Request) {
  const session = await getAuth(request)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await request.json()
    const current = await readSettings()
    const merged = { ...current, ...body }
    await prisma.appSetting.upsert({
      where: { key: SETTINGS_KEY },
      update: { value: JSON.stringify(merged) },
      create: { key: SETTINGS_KEY, value: JSON.stringify(merged) },
    })
    return NextResponse.json({ success: true, settings: merged })
  } catch {
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    )
  }
}
