"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Wallet,
  Receipt,
  ShoppingCart,
  LogOut,
  Calendar,
  MapPin,
} from "lucide-react"
import { fetchAnalytics } from "@/lib/services/products"

export default function AdminAnalytics() {
  const [data, setData] = useState<{
    totalRevenue: number
    aov: number
    conversionRate: number
    bounceRate: number
    totalClicks: number
    totalProducts: number
    revenueData: { day: string; clicks: number; conversions: number; revenue: number }[]
    topProducts: Record<string, { name: string; clicks: number; revenue: number }>
  } | null>(null)

  useEffect(() => {
    fetchAnalytics().then(setData).catch(() => {})
  }, [])

  const metrics = [
    {
      label: "Total Revenue",
      value: data ? `Rp${(data.totalRevenue || 0).toLocaleString("id-ID")}` : "Rp 15.400",
      trend: "Based on click data",
      icon: Wallet,
      trendIcon: TrendingUp,
      trendColor: "text-[#b51c00]",
    },
    {
      label: "Avg Order Value",
      value: data ? `Rp${(data.aov || 0).toLocaleString("id-ID")}` : "Rp 245.000",
      trend: "Per estimated conversion",
      icon: Receipt,
      trendIcon: Minus,
      trendColor: "text-[#5c403a]",
    },
    {
      label: "Conversion Rate",
      value: data ? `${data.conversionRate || 0}%` : "4.2%",
      trend: "Estimated rate",
      icon: ShoppingCart,
      trendIcon: TrendingUp,
      trendColor: "text-[#b51c00]",
    },
    {
      label: "Bounce Rate",
      value: data ? `${data.bounceRate || 0}%` : "28.5%",
      trend: "Estimated rate",
      icon: LogOut,
      trendIcon: TrendingDown,
      trendColor: "text-[#ba1a1a]",
    },
  ]

  const barData = data?.revenueData ?? [
    { day: "Mon", clicks: 40, conversions: 18, revenue: 0 },
    { day: "Tue", clicks: 50, conversions: 22, revenue: 0 },
    { day: "Wed", clicks: 30, conversions: 14, revenue: 0 },
    { day: "Thu", clicks: 70, conversions: 31, revenue: 0 },
    { day: "Fri", clicks: 85, conversions: 38, revenue: 0 },
    { day: "Sat", clicks: 60, conversions: 27, revenue: 0 },
    { day: "Sun", clicks: 90, conversions: 40, revenue: 0 },
  ]

  const maxClicks = Math.max(...barData.map((d) => d.clicks), 1)

  const topProducts = data?.topProducts
    ? Object.values(data.topProducts)
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5)
    : []

  const totalProductClicks = topProducts.reduce((sum, p) => sum + p.clicks, 0)

  const topSources = [
    { rank: 1, name: "Instagram", pct: 45 },
    { rank: 2, name: "TikTok", pct: 30 },
    { rank: 3, name: "Direct", pct: 15 },
    { rank: 4, name: "Twitter", pct: 10 },
  ]

  const cities = [
    { name: "Jakarta", users: "12,450" },
    { name: "Surabaya", users: "8,210" },
    { name: "Bandung", users: "5,930" },
    { name: "Medan", users: "3,120" },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-dashed border-[#e5beb6] pb-6">
        <div>
          <h2 className="font-sans text-[40px] leading-[48px] tracking-[-0.02em] font-extrabold text-[#1a1c1b] uppercase mb-1">
            Analytics
          </h2>
          <p className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a]">
            Performance &amp; Metrics Overview
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#f4f4f1] border border-[#e5beb6] p-1 pl-3">
          <Calendar className="size-[18px] text-[#5c403a]" aria-hidden="true" />
          <select className="bg-transparent border-none font-mono text-[13px] text-[#1a1c1b] focus:ring-0 py-1.5 pl-1 pr-8 cursor-pointer">
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon
          const TrendIcon = m.trendIcon
          return (
            <div key={m.label} className="bg-white border border-[#e5e1e9] p-5 pt-8 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] uppercase">{m.label}</span>
                <Icon className="size-5 text-[#b51c00]" aria-hidden="true" />
              </div>
              <div className="font-mono text-[32px] leading-[32px] tracking-[-0.04em] font-bold text-[#1a1c1b] mb-2 mt-auto">{m.value}</div>
              <div className={`flex items-center gap-1 font-sans text-[12px] leading-[16px] font-medium ${m.trendColor}`}>
                <TrendIcon className="size-[14px]" aria-hidden="true" />
                <span>{m.trend}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white border border-[#e5e1e9] p-6">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-dashed border-[#e5beb6]">
          <h3 className="font-sans text-[20px] leading-[28px] font-bold uppercase">Clicks vs Conversions</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-[#b51c00] border border-[#1a1c1b]" />
              <span className="font-mono text-[13px] text-[#5c403a]">Clicks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-[#FFC93C] border border-[#1a1c1b]" />
              <span className="font-mono text-[13px] text-[#5c403a]">Conversions</span>
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full bg-[#FAFAF7] border border-[#e5beb6] flex items-end p-4 gap-2">
          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-full h-px bg-[#e5beb6] border-t border-dashed opacity-50" />
            ))}
          </div>
          {barData.map((d, i) => (
            <div key={d.day} className="flex-1 flex items-end gap-1 h-full">
              <div className="w-1/2 bg-[#b51c00] transition-all hover:opacity-80" style={{ height: `${(d.clicks / maxClicks) * 100}%` }} title={`${d.clicks} clicks`} />
              <div className="w-1/2 bg-[#FFC93C] transition-all hover:opacity-80" style={{ height: `${(d.conversions / maxClicks) * 100}%` }} title={`${d.conversions} conversions`} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 px-2 font-mono text-[13px] text-[#5c403a] opacity-70">
          {barData.map((d) => (
            <span key={d.day}>{d.day}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-[#e5e1e9] overflow-hidden">
          <div className="p-4 border-b border-[#e5e1e9] bg-[#f4f4f1]">
            <h3 className="font-sans text-[20px] leading-[28px] font-bold uppercase">Top Products</h3>
          </div>
          {topProducts.length > 0 ? (
            <ul className="flex flex-col">
              {topProducts.map((p, i) => (
                <li key={p.name} className="flex items-center justify-between p-4 border-b border-dashed border-[#e5e1e9] hover:bg-[#FAFAF7] transition-colors hover:border-l-4 hover:border-[#b51c00]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[13px] font-bold text-[#1a1c1b] w-4">{i + 1}.</span>
                    <span className="font-sans text-[16px] leading-[24px] text-[#1a1c1b]">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-2 bg-[#e2e3e0] rounded-full overflow-hidden hidden sm:block">
                      <div className="h-full bg-[#b51c00]" style={{ width: `${totalProductClicks > 0 ? (p.clicks / totalProductClicks) * 100 : 0}%` }} />
                    </div>
                    <span className="font-mono text-[13px] font-bold text-[#1a1c1b] w-16 text-right">{p.clicks} clicks</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8" role="status">
              <p className="font-mono text-[13px] text-[#5c403a]">No click data yet</p>
              <p className="font-mono text-[11px] text-[#906f69] mt-2">Promote your products to start collecting analytics</p>
            </div>
          )}
        </div>

        <div className="bg-white border border-[#e5e1e9] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#e5e1e9] bg-[#f4f4f1] flex justify-between items-center">
            <h3 className="font-sans text-[20px] leading-[28px] font-bold uppercase">Geographic</h3>
            <MapPin className="size-5 text-[#5c403a]" aria-hidden="true" />
          </div>
          <div className="p-4 border-b border-dashed border-[#e5e1e9] bg-[#FAFAF7] flex justify-between font-mono text-[13px] text-[#5c403a] uppercase text-[11px]">
            <span>City</span>
            <span>Users</span>
          </div>
          <ul className="flex flex-col">
            {cities.map((city) => (
              <li key={city.name} className="flex justify-between items-center p-4 border-b border-dashed border-[#e5e1e9] hover:bg-[#FAFAF7] hover:border-l-4 hover:border-[#b51c00] transition-all">
                <span className="font-sans text-[16px] leading-[24px] text-[#1a1c1b]">{city.name}</span>
                <span className="font-mono text-[13px] bg-[#fdc73a] text-[#6f5400] px-2 py-0.5">{city.users}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
