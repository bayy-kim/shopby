"use client"

import { motion } from "framer-motion"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton"
import EmptyState from "@/components/ui/EmptyState"
import type { Product, Category } from "@/types"

interface ProductGridProps {
  featuredProducts?: Product[]
  allProducts?: Product[]
  totalCount?: number
  onLoadMore?: () => void
  onBuyProduct?: (productId: string) => void
  isLoading?: boolean
  error?: string
  activeCategory?: Category
  onResetCategory?: () => void
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

export default function ProductGrid({
  featuredProducts = [],
  allProducts = [],
  totalCount = 0,
  onLoadMore,
  onBuyProduct,
  isLoading,
  error,
  activeCategory,
  onResetCategory,
}: ProductGridProps) {
  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center py-16">
        <p className="text-destructive">Gagal memuat produk. Coba refresh halaman.</p>
      </div>
    )
  }

  return (
    <div className="flex-grow">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6 border-b border-dashed border-border-color pb-4">
          <h2 className="text-headline-md text-ink uppercase tracking-tight font-sans">
            Rekomendasi Hari Ini
          </h2>
          <span className="bg-tag-yellow px-2 py-1 font-mono text-xs font-bold border border-ink">
            HOT DEALS
          </span>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
        <h2 className="text-headline-md text-ink uppercase tracking-tight font-sans">
          Semua Produk
        </h2>
        <span className="font-mono text-sm text-ink/60">
          Menampilkan {isLoading ? "..." : `${allProducts.length + featuredProducts.length}`} items
        </span>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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

      {onLoadMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onLoadMore}
            className="bg-transparent border-2 border-ink text-ink px-6 py-2 font-bold text-sm uppercase tracking-wider hover:bg-ink hover:text-white transition-colors"
          >
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  )
}
