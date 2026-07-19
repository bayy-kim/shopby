import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get("category")

  const where = categorySlug && categorySlug !== "semua"
    ? { category: { slug: categorySlug } }
    : {}

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(products)
}
