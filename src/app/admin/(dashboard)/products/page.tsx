"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Copy,
  Pencil,
  Trash2,
  SortAsc,
  ChevronLeft,
  ChevronRight,
  Laptop,
  Shirt,
  Home,
  Sparkles,
} from "lucide-react"

const products = [
  {
    id: "MK-8821",
    name: "Mechanical Keyboard Pro",
    category: "Electronics",
    price: "Rp 450.000",
    commission: "8%",
    status: "Active",
    imageAlt: "Mechanical keyboard",
  },
  {
    id: "SW-9902",
    name: "Smartwatch Series X",
    category: "Electronics",
    price: "Rp 899.000",
    commission: "10%",
    status: "Active",
    imageAlt: "Smartwatch",
  },
  {
    id: "FA-2210",
    name: "Minimalist Leather Wallet",
    category: "Fashion",
    price: "Rp 250.000",
    commission: "12%",
    status: "Out of Stock",
    imageAlt: "Leather wallet",
  },
]

const categories = ["All", "Electronics", "Fashion", "Home", "Beauty"]
const categoryIcons: Record<string, React.ReactNode> = {
  Electronics: <Laptop className="size-3" />,
  Fashion: <Shirt className="size-3" />,
  Home: <Home className="size-3" />,
  Beauty: <Sparkles className="size-3" />,
}

export default function AdminProducts() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans text-[32px] md:text-[40px] leading-[38px] md:leading-[48px] tracking-[-0.01em] md:tracking-[-0.02em] font-extrabold text-[#1a1c1b]">
            Product Links
          </h2>
          <p className="font-sans text-[16px] leading-[24px] text-[#5c403a] mt-1">
            Manage your active affiliate links and track commission rates.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[#b51c00] text-white font-mono text-[13px] leading-[16px] tracking-[0.05em] py-3 px-6 rounded-full flex items-center justify-center gap-2 shrink-0 hover:shadow-lg transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          <Plus className="size-[18px]" />
          Add New Link
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-[#e5e1d8] p-4">
        <div className="w-full sm:hidden relative flex items-center">
          <Search className="size-5 absolute left-3 text-[#5c403a]" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent border-0 border-b border-[#e5beb6] focus:border-[#b51c00] focus:ring-0 pl-10 pr-4 py-2 font-sans text-[16px] text-[#1a1c1b] placeholder:text-[#5c403a]/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => {
            const isActive = cat === activeCategory
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full font-mono text-[11px] whitespace-nowrap transition-all active:translate-y-0.5 active:translate-x-0.5 ${
                  isActive
                    ? "bg-[#1a1c1b] text-[#FAFAF7]"
                    : "border border-[#e5e1d8] text-[#1a1c1b] hover:bg-[#f4f4f1]"
                }`}
              >
                {categoryIcons[cat]}
                {cat}
              </button>
            )
          })}
        </div>

        <div className="w-full sm:w-auto flex justify-end">
          <button className="flex items-center gap-2 text-[#5c403a] hover:text-[#1a1c1b] font-mono text-[13px] leading-[16px] tracking-[0.05em] p-2 rounded hover:bg-[#f4f4f1] transition-colors">
            <SortAsc className="size-[18px]" />
            Sort: Newest
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#e5e1d8] overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#f4f4f1]/50">
              {["Product", "Category", "Price", "Comm.", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className={`py-4 px-6 font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] font-bold uppercase ${
                    h === "Price" || h === "Comm." || h === "Actions" ? "text-right" : h === "Status" ? "text-center" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-[#e5e1d8]">
            {products.map((product) => (
              <tr key={product.id} className="group hover:bg-[#FAFAF7] transition-colors border-b border-dashed border-[#e5e1d8]">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="size-12 bg-[#e2e3e0] shrink-0 flex items-center justify-center font-mono text-xs text-[#5c403a]"
                      style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                    >
                      {product.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-sans text-[16px] leading-[24px] font-bold text-[#1a1c1b]">{product.name}</p>
                      <p className="font-mono text-[11px] text-[#5c403a] mt-1">ID: {product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 align-middle">
                  <span className="font-sans text-[16px] leading-[24px] text-[#1a1c1b]">{product.category}</span>
                </td>
                <td className="py-4 px-6 align-middle text-right">
                  <span className="font-mono text-[16px] font-bold text-[#1a1c1b] bg-[#FFC93C] px-2 py-0.5">
                    {product.price}
                  </span>
                </td>
                <td className="py-4 px-6 align-middle text-right">
                  <span className="font-mono text-[16px] font-bold text-[#b51c00]">{product.commission}</span>
                </td>
                <td className="py-4 px-6 align-middle text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border font-mono text-[11px] uppercase ${
                    product.status === "Active"
                      ? "border-[#e5e1d8] bg-white text-[#1a1c1b]"
                      : "border-[#e5e1d8] bg-[#e2e3e0] text-[#5c403a]"
                  }`}>
                    <span className={`size-1.5 rounded-full ${product.status === "Active" ? "bg-green-500" : "bg-[#906f69]"}`} />
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-6 align-middle text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-[#5c403a] hover:text-[#1a1c1b] hover:bg-[#f4f4f1] rounded transition-colors active:scale-90" title="Copy Link">
                      <Copy className="size-5" />
                    </button>
                    <Link href={`/admin/products/${product.id}`} className="p-1.5 text-[#5c403a] hover:text-[#1a1c1b] hover:bg-[#f4f4f1] rounded transition-colors active:scale-90" title="Edit">
                      <Pencil className="size-5" />
                    </Link>
                    <button className="p-1.5 text-[#5c403a] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/20 rounded transition-colors active:scale-90" title="Delete">
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between py-4 font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] border-t border-dashed border-[#e5e1d8] mt-4">
        <p>Showing 1-3 of 24 items</p>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:text-[#1a1c1b] disabled:opacity-50 transition-colors" disabled>
            <ChevronLeft className="size-4" />
          </button>
          <span className="bg-[#1a1c1b] text-[#FAFAF7] size-6 flex items-center justify-center">1</span>
          <button className="size-6 flex items-center justify-center hover:bg-[#f4f4f1] transition-colors">2</button>
          <button className="size-6 flex items-center justify-center hover:bg-[#f4f4f1] transition-colors">3</button>
          <span className="px-1">...</span>
          <button className="p-1 hover:text-[#1a1c1b] transition-colors">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
