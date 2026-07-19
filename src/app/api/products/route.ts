import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get("category")
  const sort = searchParams.get("sort") ?? "newest"

  const where =
    categorySlug && categorySlug !== "semua"
      ? { category: { slug: categorySlug } }
      : {}

  const orderBy =
    sort === "price_asc"
      ? { price: "asc" as const }
      : sort === "price_desc"
        ? { price: "desc" as const }
        : { createdAt: "desc" as const }

  const products = await prisma.product.findMany({
    where,
    include: { category: true, _count: { select: { clicks: true } } },
    orderBy,
  })

  return NextResponse.json({ data: products, total: products.length })
}
