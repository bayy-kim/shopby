"use client"

import { LayoutGrid, Laptop, Shirt, Home, Sparkles } from "lucide-react"
import type { Category } from "@/types"

interface CategoryFilterProps {
  categories?: Category[]
  activeSlug?: string
  onSelect?: (slug: string) => void
}

const defaultCategories: Category[] = [
  { id: "all", name: "Semua", slug: "semua" },
  { id: "cat1", name: "Elektronik", slug: "elektronik" },
  { id: "cat2", name: "Fashion", slug: "fashion" },
  { id: "cat3", name: "Rumah Tangga", slug: "rumah-tangga" },
  { id: "cat4", name: "Kecantikan", slug: "kecantikan" },
]

const iconMap: Record<string, React.ReactNode> = {
  semua: <LayoutGrid className="size-3.5" />,
  elektronik: <Laptop className="size-3.5" />,
  fashion: <Shirt className="size-3.5" />,
  "rumah-tangga": <Home className="size-3.5" />,
  kecantikan: <Sparkles className="size-3.5" />,
}

export default function CategoryFilter({
  categories = defaultCategories,
  activeSlug = "semua",
  onSelect,
}: CategoryFilterProps) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-24 bg-white border-r border-dashed border-border-color p-4">
        <div className="mb-6">
          <h2 className="text-headline-md text-primary font-sans">Kategori</h2>
          <p className="text-caption text-ink/60 font-sans">Filter produk</p>
        </div>
        <ul className="space-y-2">
          {categories.map((cat) => {
            const isActive = cat.slug === activeSlug
            return (
              <li key={cat.id}>
                <button
                  onClick={() => onSelect?.(cat.slug)}
                  className={`flex items-center gap-3 p-2 w-full text-left transition-all font-mono text-label-mono uppercase ${
                    isActive
                      ? "bg-tag-yellow text-ink font-bold border border-ink -translate-x-0.5 -translate-y-0.5"
                      : "text-ink/60 hover:bg-[#e8e8e5] border border-transparent hover:border-border-color"
                  }`}
                >
                  <span className="text-ink/60">{iconMap[cat.slug]}</span>
                  <span>{cat.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
