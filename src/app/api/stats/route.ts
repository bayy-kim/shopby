import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifySessionToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const token = request.cookies.get("shopby_admin_session")?.value
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const payload = await verifySessionToken(token)
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [totalProducts, totalClicks, activeProducts, recentClicks, topProducts] = await Promise.all([
    prisma.product.count(),
    prisma.clickLog.count(),
    prisma.product.count({ where: { isFeatured: true } }),
    prisma.clickLog.findMany({ take: 5, orderBy: { clickedAt: "desc" }, include: { product: { select: { name: true } } } }),
    prisma.product.findMany({ take: 5, orderBy: { clicks: { _count: "desc" } }, include: { _count: { select: { clicks: true } }, category: true } }),
  ])

  const totalSales = totalClicks * 50000
  const avgCommission = totalSales * 0.08

  return NextResponse.json({
    data: {
      totalSales,
      totalProducts,
      activeProducts,
      totalClicks,
      avgCommission,
      recentClicks: recentClicks.map((c) => ({ productName: c.product.name, clickedAt: c.clickedAt })),
      topProducts: topProducts.map((p) => ({ id: p.id, name: p.name, clicks: p._count.clicks, category: p.category.name })),
    },
  })
}
