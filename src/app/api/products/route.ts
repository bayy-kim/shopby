import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkAuth } from "@/lib/auth"
import { getProductNumberMap, resolveNumberRangeToIds } from "@/lib/products-numbering"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get("category")
  const sort = searchParams.get("sort") ?? "newest"
  const skip = Number(searchParams.get("skip")) || undefined
  const take = Number(searchParams.get("take")) || undefined
  const numberFrom = searchParams.get("numberFrom") ? Number(searchParams.get("numberFrom")) : undefined
  const numberTo = searchParams.get("numberTo") ? Number(searchParams.get("numberTo")) : undefined

  let where: Record<string, unknown> =
    categorySlug && categorySlug !== "semua"
      ? { category: { slug: categorySlug } }
      : {}

  const [numberMap] = await Promise.all([getProductNumberMap()])

  if (numberFrom !== undefined && numberTo !== undefined) {
    const idsInRange = await resolveNumberRangeToIds(numberFrom, numberTo)
    where = { ...where, id: { in: idsInRange } }
  }

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

  const data = products.map((p) => ({
    ...p,
    number: numberMap.get(p.id) ?? 0,
  }))

  return NextResponse.json({ data, total })
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  const { name, price, discountPct, imageUrl, imageAlt, shopeeUrl, categoryId, isFeatured, isSoldOut } = body

  if (!name || !price || !imageUrl || !shopeeUrl || !categoryId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const product = await prisma.product.create({
    data: { name, price: Number(price), discountPct: discountPct ? Number(discountPct) : null, imageUrl, imageAlt: imageAlt || name, shopeeUrl, categoryId, isFeatured: isFeatured || false, isSoldOut: isSoldOut || false },
    include: { category: true },
  })
  return NextResponse.json({ data: product }, { status: 201 })
}
