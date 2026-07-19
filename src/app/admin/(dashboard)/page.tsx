"use client"

import {
  TrendingUp,
  Link2,
  MousePointerClick,
  Wallet,
} from "lucide-react"

const stats = [
  {
    label: "Total Sales",
    value: "$24,590",
    trend: "+12.5% vs last month",
    icon: TrendingUp,
    color: "text-[#b51c00]",
  },
  {
    label: "Active Links",
    value: "142",
    trend: "Across 5 platforms",
    icon: Link2,
    color: "text-[#5d5b62]",
  },
  {
    label: "Total Clicks",
    value: "89.2K",
    trend: "+5.2% vs last month",
    icon: MousePointerClick,
    color: "text-[#b51c00]",
  },
  {
    label: "Est. Commission",
    value: "$3,420",
    trend: "Pending payout",
    icon: Wallet,
    color: "text-[#1a1c1b]",
  },
]

const recentActivity = [
  { product: "Mechanical Keyboard v2", clicks: "1,204", status: "Active" },
  { product: "Wireless Earbuds Pro", clicks: "856", status: "Active" },
  { product: "Ergonomic Mouse", clicks: "432", status: "Ended" },
  { product: "Desk Mat XL (Black)", clicks: "215", status: "Active" },
  { product: "USB-C Hub 8-in-1", clicks: "98", status: "Draft" },
]

export default function AdminDashboard() {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-dashed border-[#e5beb6] pb-4">
        <div>
          <h2 className="font-sans text-[32px] md:text-[40px] leading-[38px] md:leading-[48px] tracking-[-0.01em] md:tracking-[-0.02em] font-extrabold text-[#1a1c1b]">
            Dashboard
          </h2>
          <p className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mt-1 uppercase">
            Report Date: 12 Oct 2023
          </p>
        </div>
        <button className="flex items-center gap-2 font-mono text-[13px] leading-[16px] tracking-[0.05em] border border-[#e5e1e9] px-3 py-2 hover:bg-[#f4f4f1] transition-colors active:translate-x-0.5 active:translate-y-0.5">
          <TrendingUp className="size-[18px]" />
          Last 30 Days
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
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
                <Icon className="size-[14px]" />
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
              Recent Activity
            </h3>
            <a className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#b51c00] hover:underline uppercase" href="#">View All</a>
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
