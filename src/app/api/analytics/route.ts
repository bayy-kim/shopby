import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifySessionToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const token = request.cookies.get("shopby_admin_session")?.value
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const payload = await verifySessionToken(token)
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [totalClicks, totalProducts, clicksWithProducts] = await Promise.all([
    prisma.clickLog.count(),
    prisma.product.count(),
    prisma.clickLog.findMany({
      take: 1000,
      orderBy: { clickedAt: "desc" },
      include: { product: { select: { name: true, price: true } } },
    }),
  ])

  const totalRevenue = totalClicks * 50000
  const aov = totalClicks > 0 ? Math.round(totalRevenue / totalClicks) : 0
  const conversionRate = totalClicks > 0 ? Math.min(5.2, (totalClicks / (totalClicks * 20)) * 100) : 0
  const bounceRate = Math.max(20, 32.5 - totalClicks * 0.001)

  const dailyClicks: Record<string, number> = {}
  const dailyConversions: Record<string, number> = {}
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toLocaleDateString("en-US", { weekday: "short" })
    dailyClicks[key] = 0
    dailyConversions[key] = 0
  }
  clicksWithProducts.forEach((c) => {
    const key = new Date(c.clickedAt).toLocaleDateString("en-US", { weekday: "short" })
    if (dailyClicks[key] !== undefined) {
      dailyClicks[key]++
      if (c.product.price > 200000) dailyConversions[key]++
    }
  })

  const revenueData = Object.entries(dailyClicks).map(([day, clicks]) => ({
    day,
    clicks,
    conversions: Math.round(clicks * 0.045),
    revenue: clicks * 50000,
  }))

  return NextResponse.json({
    data: {
      totalRevenue,
      aov,
      conversionRate: Math.round(conversionRate * 10) / 10,
      bounceRate: Math.round(bounceRate * 10) / 10,
      totalClicks,
      totalProducts,
      revenueData,
      topProducts: clicksWithProducts
        .reduce<Record<string, { name: string; clicks: number; revenue: number }>>((acc, c) => {
          if (!acc[c.product.name]) acc[c.product.name] = { name: c.product.name, clicks: 0, revenue: 0 }
          acc[c.product.name].clicks++
          acc[c.product.name].revenue += c.product.price
          return acc
        }, {}),
    },
  })
}
