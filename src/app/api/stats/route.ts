import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkAuth } from "@/lib/auth"

function getDateFilter(period: string | null): Date | undefined {
  if (!period || period === "all") return undefined
  const now = new Date()
  const days = period === "week" ? 7 : period === "month" ? 30 : period === "year" ? 365 : 0
  if (days === 0) return undefined
  return new Date(now.getTime() - days * 86400000)
}

export async function GET(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period")
  const dateFrom = getDateFilter(period)

  const clickWhere = dateFrom ? { clickedAt: { gte: dateFrom } } : {}

  const [totalProducts, totalClicks, activeProducts, soldOut, recentClicks, topProducts] = await Promise.all([
    prisma.product.count(),
    prisma.clickLog.count({ where: clickWhere }),
    prisma.product.count({ where: { isSoldOut: false } }),
    prisma.product.count({ where: { isSoldOut: true } }),
    prisma.clickLog.findMany({
      where: clickWhere,
      take: 5,
      orderBy: { clickedAt: "desc" },
      include: { product: { select: { name: true } } },
    }),
    prisma.product.findMany({
      take: 5,
      orderBy: { clicks: { _count: "desc" } },
      include: { _count: { select: { clicks: true } }, category: true },
    }),
  ])

  const totalSales = totalClicks * 50000
  const avgCommission = Math.round(totalSales * 0.08)

  return NextResponse.json({
    data: {
      totalSales,
      totalProducts,
      activeProducts,
      soldOut,
      totalClicks,
      avgCommission,
      recentClicks: recentClicks.map((c) => ({
        productName: c.product.name,
        clickedAt: c.clickedAt,
      })),
      topProducts: topProducts.map((p) => ({
        id: p.id,
        name: p.name,
        clicks: p._count.clicks,
        category: p.category.name,
      })),
    },
  })
}