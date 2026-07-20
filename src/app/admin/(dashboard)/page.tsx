"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  Link2,
  MousePointerClick,
  Wallet,
} from "lucide-react"
import { fetchStats } from "@/lib/services/products"

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState<{
    totalSales: number
    totalProducts: number
    activeProducts: number
    totalClicks: number
    avgCommission: number
    recentClicks: { productName: string; clickedAt: string }[]
    topProducts: { id: string; name: string; clicks: number; category: string }[]
  } | null>(null)

  useEffect(() => {
    fetchStats()
      .then(setStatsData)
      .catch(() => setStatsData(null))
  }, [])

  const statCards = [
    {
      label: "Total Sales",
      value: statsData ? `Rp${(statsData.totalSales || 0).toLocaleString("id-ID")}` : "$24,590",
      trend: statsData ? `${statsData.totalClicks} total clicks` : "+12.5% vs last month",
      icon: TrendingUp,
      color: "text-[#b51c00]",
    },
    {
      label: "Active Products",
      value: statsData ? String(statsData.totalProducts || 0) : "142",
      trend: `${statsData ? statsData.activeProducts : 0} featured`,
      icon: Link2,
      color: "text-[#5d5b62]",
    },
    {
      label: "Total Clicks",
      value: statsData ? statsData.totalClicks.toLocaleString("id-ID") : "89.2K",
      trend: "All time",
      icon: MousePointerClick,
      color: "text-[#b51c00]",
    },
    {
      label: "Est. Commission",
      value: statsData ? `Rp${(statsData.avgCommission || 0).toLocaleString("id-ID")}` : "$3,420",
      trend: "Pending payout",
      icon: Wallet,
      color: "text-[#1a1c1b]",
    },
  ]

  const recentActivity = statsData?.topProducts?.slice(0, 5).map((p) => ({
    product: p.name,
    clicks: p.clicks.toLocaleString("id-ID"),
    status: p.clicks > 50 ? "Active" : p.clicks > 10 ? "Ended" : "Draft",
  })) ?? [
    { product: "Mechanical Keyboard v2", clicks: "1,204", status: "Active" },
    { product: "Wireless Earbuds Pro", clicks: "856", status: "Active" },
    { product: "Ergonomic Mouse", clicks: "432", status: "Ended" },
    { product: "Desk Mat XL (Black)", clicks: "215", status: "Active" },
    { product: "USB-C Hub 8-in-1", clicks: "98", status: "Draft" },
  ]

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-dashed border-[#e5beb6] pb-4">
        <div>
          <h2 className="font-sans text-[32px] md:text-[40px] leading-[38px] md:leading-[48px] tracking-[-0.01em] md:tracking-[-0.02em] font-extrabold text-[#1a1c1b]">
            Dashboard
          </h2>
          <p className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mt-1 uppercase">
            Report Date: {new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>
        <button className="flex items-center gap-2 font-mono text-[13px] leading-[16px] tracking-[0.05em] border border-[#e5e1e9] px-3 py-2 hover:bg-[#f4f4f1] transition-colors active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#b51c00] focus-visible:outline-none">
          <TrendingUp className="size-[18px]" aria-hidden="true" />
          All Time
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white border border-[#e5e1e9] p-5 pl-8 flex flex-col gap-2 hover:bg-[#f4f4f1] transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <span className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] uppercase">
                {stat.label}
              </span>
              <span className="font-mono text-[32px] leading-[32px] tracking-[-0.04em] font-bold text-[#1a1c1b] mt-2">
                {stat.value}
              </span>
              <div className={`flex items-center gap-1 font-sans text-[12px] leading-[16px] font-medium ${stat.color} mt-1`}>
                <Icon className="size-[14px]" aria-hidden="true" />
                <span>{stat.trend}</span>
              </div>
            </div>
          )
        })}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-sans text-[20px] leading-[28px] font-bold text-[#1a1c1b]">
              Sales Performance
            </h3>
            <div className="flex gap-2 items-center">
              <span className="size-3 bg-[#b51c00] inline-block" />
              <span className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] uppercase">Revenue</span>
            </div>
          </div>
          <div className="border border-[#e5e1e9] bg-[#f9f9f6] p-4 flex-1 min-h-[300px] relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300">
              {[50, 125, 200, 275].map((y) => (
                <line key={y} className="stroke-[#e5beb6] stroke-dashed" x1="0" x2="800" y1={y} y2={y} />
              ))}
              <text fill="#5c403a" fontFamily="JetBrains Mono" fontSize="12" x="10" y="45">$3k</text>
              <text fill="#5c403a" fontFamily="JetBrains Mono" fontSize="12" x="10" y="120">$2k</text>
              <text fill="#5c403a" fontFamily="JetBrains Mono" fontSize="12" x="10" y="195">$1k</text>
              <text fill="#5c403a" fontFamily="JetBrains Mono" fontSize="12" x="10" y="270">0</text>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                <text key={day} fill="#5c403a" fontFamily="JetBrains Mono" fontSize="12" x={80 + i * 120} y="295">{day}</text>
              ))}
              <path className="stroke-[#FF4D2D] fill-none stroke-[3]" d="M 80 250 L 200 180 L 320 210 L 440 90 L 560 120 L 680 40" />
              {[[80, 250], [200, 180], [320, 210], [440, 90], [560, 120], [680, 40]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} fill="#FF4D2D" r="4" />
              ))}
            </svg>
          </div>
        </section>

        <section className="lg:col-span-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-sans text-[20px] leading-[28px] font-bold text-[#1a1c1b]">
              Top Products
            </h3>
          </div>
          <div className="border border-[#e5e1e9] bg-[#f9f9f6] flex-1 overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr] p-3 border-b border-[#e5e1e9] bg-[#f4f4f1] font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] uppercase text-xs">
              <div>Product</div>
              <div className="text-right">Clicks</div>
              <div className="text-right">Status</div>
            </div>
            <ul className="flex flex-col">
              {recentActivity.map((item, i) => (
                <li
                  key={i}
                  className={`grid grid-cols-[2fr_1fr_1fr] p-3 border-b border-dashed border-[#e5e1e9] items-center hover:bg-[#f4f4f1] transition-colors ${i % 2 === 1 ? "bg-[#f4f4f1]/50" : ""}`}
                >
                  <div className="truncate pr-2 font-sans text-[14px] font-bold text-[#1a1c1b]">{item.product}</div>
                  <div className="text-right font-mono text-[14px] text-[#1a1c1b]">{item.clicks}</div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-0.5 font-mono text-[10px] uppercase ${
                        item.status === "Active"
                          ? "bg-[#fdc73a] text-[#6f5400]"
                          : item.status === "Ended"
                            ? "bg-[#e5e1e9] text-[#48464d]"
                            : "border border-[#e5e1e9] text-[#5c403a]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
