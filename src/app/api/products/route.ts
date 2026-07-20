import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get("category")
  const sort = searchParams.get("sort") ?? "newest"
  const skip = Number(searchParams.get("skip")) || undefined
  const take = Number(searchParams.get("take")) || undefined

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

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, _count: { select: { clicks: true } } },
      orderBy,
      skip,
      take,
    }),
    prisma.product.count({ where }),
  ])

  return NextResponse.json({ data: products, total })
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  const { name, price, discountPct, imageUrl, imageAlt, shopeeUrl, categoryId, isFeatured } = body

  if (!name || !price || !imageUrl || !shopeeUrl || !categoryId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const product = await prisma.product.create({
    data: { name, price: Number(price), discountPct: discountPct ? Number(discountPct) : null, imageUrl, imageAlt: imageAlt || name, shopeeUrl, categoryId, isFeatured: isFeatured || false },
    include: { category: true },
  })
  return NextResponse.json({ data: product }, { status: 201 })
}
