"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton"
import EmptyState from "@/components/ui/EmptyState"
import type { Product, Category } from "@/types"

interface ProductGridProps {
  featuredProducts?: Product[]
  allProducts?: Product[]
  total?: number
  isLoading?: boolean
  error?: string
  activeCategory?: Category
  onResetCategory?: () => void
  onBuyProduct?: (productId: string, shopeeUrl: string) => void
  sort?: string
  onSortChange?: (sort: string) => void
  hasMore?: boolean
  onLoadMore?: () => void
  isLoadMoreLoading?: boolean
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

const SKELETON_COUNT = 8

const sortOptions = [
  { value: "newest", label: "Terbaru" },
  { value: "price_asc", label: "Termurah" },
  { value: "price_desc", label: "Termahal" },
]

export default function ProductGrid({
  featuredProducts = [],
  allProducts = [],
  total = 0,
  isLoading,
  error,
  activeCategory,
  onResetCategory,
  onBuyProduct,
  sort = "newest",
  onSortChange,
  hasMore,
  onLoadMore,
  isLoadMoreLoading,
}: ProductGridProps) {
  const prefersReducedMotion = useReducedMotion()
  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center py-16" role="alert">
        <p className="text-destructive">
          Gagal memuat produk. Coba refresh halaman.
        </p>
      </div>
    )
  }

  return (
      <div className="flex-grow" aria-live="polite">
        <div className="mb-12">
        <div className="flex items-center gap-4 mb-6 border-b border-dashed border-border-color pb-4">
          <h2 className="text-headline-md text-ink uppercase tracking-tight font-sans text-pretty">
            Rekomendasi Hari Ini
          </h2>
          <span className="bg-tag-yellow px-2 py-1 font-mono text-xs font-bold border border-ink">
            HOT DEALS
          </span>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={`s-feat-${i}`} variant="highlight" />
              ))
            : featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard
                    product={product}
                    variant="highlight"
                    onBuy={onBuyProduct}
                  />
                </motion.div>
              ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-between mb-6 border-b border-dashed border-border-color pb-4">
        <h2 className="text-headline-md text-ink uppercase tracking-tight font-sans text-pretty">
          Semua Produk
        </h2>
        <div className="flex items-center gap-3">
          {onSortChange && (
            <div className="hidden sm:flex items-center gap-1 bg-white border border-border-color rounded-full p-0.5">
              {sortOptions.map((opt) => {
                const isActive = sort === opt.value
                const Icon =
                  opt.value === "price_asc"
                    ? ArrowUp
                    : opt.value === "price_desc"
                      ? ArrowDown
                      : ArrowUpDown
                return (
                  <button
                    key={opt.value}
                    onClick={() => onSortChange(opt.value)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono uppercase transition-all focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? "bg-ink text-white"
                        : "text-ink/50 hover:text-ink"
                    }`}
                  >
                    <Icon className="size-3" aria-hidden="true" />
                    {opt.label}
                  </button>
                )
              })}
            </div>
          )}
          <span className="font-mono text-sm text-ink/60">
            {isLoading ? "…" : `${total}`} items
          </span>
        </div>
      </div>

      {/* Mobile sort */}
      {onSortChange && (
        <div className="flex sm:hidden gap-1 mb-4 overflow-x-auto">
          {sortOptions.map((opt) => {
            const isActive = sort === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-mono uppercase border transition-all focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink/50 border-border-color"
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.1 }}
      >
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ProductCardSkeleton key={`s-all-${i}`} />
            ))
          : allProducts.length === 0 && featuredProducts.length === 0
            ? (
            <EmptyState
              categoryName={activeCategory?.name}
              onReset={onResetCategory}
            />
              )
            : allProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard
                    product={product}
                    variant="compact"
                    onBuy={onBuyProduct}
                  />
                </motion.div>
              ))}
      </motion.div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={isLoadMoreLoading}
            className="bg-transparent border-2 border-ink text-ink px-6 py-2 font-bold text-sm uppercase tracking-wider hover:bg-ink hover:text-white transition-colors disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isLoadMoreLoading ? "Memuat…" : "Muat Lebih Banyak"}
          </button>
        </div>
      )}
    </div>
  )
}
