"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  Package,
  Settings,
  Store,
  HelpCircle,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Menu,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen flex bg-[#f9f9f6] text-[#1a1c1b] font-sans antialiased">
      {/* Sidebar (Desktop) */}
      <nav className="hidden md:flex flex-col h-screen w-64 border-r border-dashed border-[#e5beb6] bg-[#f9f9f6] py-4 shrink-0 sticky top-0">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="size-10 bg-[#1a1c1b] rounded-full flex items-center justify-center">
            <Store className="size-5 text-[#f9f9f6]" />
          </div>
          <div>
            <h1 className="font-sans text-[20px] leading-[28px] font-black text-[#1a1c1b] tracking-tight">
              Shopby Admin
            </h1>
            <p className="font-sans text-[12px] leading-[16px] font-medium text-[#5c403a]">
              Affiliate Portal
            </p>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded font-mono text-[13px] leading-[16px] tracking-[0.05em] transition-all active:translate-x-0.5 active:translate-y-0.5 ${
                  isActive
                    ? "bg-[#fdc73a] text-[#6f5400] font-bold border-l-4 border-[#b51c00]"
                    : "text-[#5c403a] hover:bg-[#f4f4f1]"
                }`}
              >
                <Icon className={`size-5 ${isActive ? "text-[#6f5400]" : ""}`} />
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="px-4 mt-auto space-y-4 pt-4 border-t border-dashed border-[#e5beb6]">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full font-mono text-[13px] leading-[16px] tracking-[0.05em] border border-[#906f69] text-[#1a1c1b] hover:bg-[#f4f4f1] transition-colors"
          >
            <ExternalLink className="size-[18px]" />
            View Storefront
          </Link>
          <div className="space-y-1">
            <a className="flex items-center gap-3 px-4 py-2 rounded text-[#5c403a] hover:bg-[#f4f4f1] font-mono text-[13px] leading-[16px] tracking-[0.05em] transition-colors" href="#">
              <HelpCircle className="size-[18px]" />
              Help
            </a>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded text-[#ba1a1a] hover:bg-[#ffdad6]/20 font-mono text-[13px] leading-[16px] tracking-[0.05em] transition-colors">
              <LogOut className="size-[18px]" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="flex justify-between items-center px-4 md:px-8 h-16 w-full sticky top-0 bg-[#f9f9f6] border-b border-dashed border-[#e5beb6] z-20 shrink-0">
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-full hover:bg-[#f4f4f1] transition-colors"
            >
              <Menu className="size-5" />
            </button>
            <span className="font-sans text-[20px] leading-[28px] font-black text-[#b51c00] tracking-tight">
              Shopby
            </span>
          </div>

          <div className="hidden md:flex flex-1 items-center max-w-md">
            <div className="relative w-full">
              <Search className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5c403a]" />
              <input
                type="text"
                placeholder="Search orders, products..."
                className="w-full bg-transparent border-0 border-b border-[#e5beb6] focus:border-[#b51c00] focus:ring-0 pl-10 pr-4 py-2 font-sans text-[16px] leading-[24px] text-[#1a1c1b] placeholder:text-[#5c403a]/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="p-2 rounded-full text-[#5c403a] hover:bg-[#ffdf9a] transition-colors active:translate-x-0.5 active:translate-y-0.5 relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-[#b51c00] rounded-full" />
            </button>
            <button className="p-2 rounded-full text-[#5c403a] hover:bg-[#ffdf9a] transition-colors active:translate-x-0.5 active:translate-y-0.5 hidden sm:block">
              <HelpCircle className="size-5" />
            </button>
            <div className="h-6 w-px border-r border-dashed border-[#e5beb6] mx-2 hidden sm:block" />
            <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-[#ffdf9a] transition-colors active:translate-x-0.5 active:translate-y-0.5">
              <span className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#b51c00] hidden sm:block font-bold">
                Profile
              </span>
              <div className="size-8 rounded-full bg-[#e2e3e0] border border-[#e5beb6] flex items-center justify-center text-[13px] font-bold text-[#5c403a]">
                A
              </div>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30">
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setMobileMenuOpen(false)}
            />
            <nav className="absolute left-0 top-16 bottom-0 w-64 bg-[#f9f9f6] border-r border-dashed border-[#e5beb6] p-4 flex flex-col">
              <div className="flex-1 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded font-mono text-[13px] leading-[16px] tracking-[0.05em] transition-all ${
                        isActive
                          ? "bg-[#fdc73a] text-[#6f5400] font-bold border-l-4 border-[#b51c00]"
                          : "text-[#5c403a] hover:bg-[#f4f4f1]"
                      }`}
                    >
                      <Icon className="size-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
              <div className="pt-4 border-t border-dashed border-[#e5beb6] space-y-1">
                <a className="flex items-center gap-3 px-4 py-2 rounded text-[#5c403a] hover:bg-[#f4f4f1] font-mono text-[13px] transition-colors" href="#">
                  <HelpCircle className="size-[18px]" />
                  Help
                </a>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded text-[#ba1a1a] hover:bg-[#ffdad6]/20 font-mono text-[13px] transition-colors">
                  <LogOut className="size-[18px]" />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#FAFAF7]">
          {children}
        </main>
      </div>
    </div>
  )
}
