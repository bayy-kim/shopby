import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const runtime = "edge"

export async function GET() {
  try {
    await prisma.category.count()
    return NextResponse.json({ status: "ok" })
  } catch {
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}