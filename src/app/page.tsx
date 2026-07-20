"use client"

import { useState, useCallback, useMemo } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import { useProducts } from "@/hooks/useProducts"
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts"
import { useCategories } from "@/hooks/useCategories"
import { logClick } from "@/lib/services/click"
import { buildNumberRanges } from "@/lib/utils"

const CategoryFilter = dynamic(() => import("@/components/sections/CategoryFilter"), {
  loading: () => <div className="h-10 animate-pulse bg-[#f4f4f1]" />,
})
const ProductGrid = dynamic(() => import("@/components/sections/ProductGrid"), {
  loading: () => <div className="h-96 animate-pulse bg-[#f4f4f1]" />,
})
const Footer = dynamic(() => import("@/components/layout/Footer"))

const PAGE_SIZE = 8

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("semua")
  const [sort, setSort] = useState<string>("newest")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [numberRange, setNumberRange] = useState<{ from: number; to: number } | null>(null)

  const { data, isLoading, error } = useProducts({
    categorySlug:
      selectedCategory === "semua" ? undefined : selectedCategory,
    sort,
    skip: 0,
    take: visibleCount,
    numberFrom: numberRange?.from,
    numberTo: numberRange?.to,
  })

  const { data: categories } = useCategories()
  const { data: featuredProducts, isLoading: isFeaturedLoading } = useFeaturedProducts()

  const total = data?.total ?? 0
  const [globalTotal, setGlobalTotal] = useState(0)
  if (!numberRange && total > 0 && globalTotal !== total) {
    setGlobalTotal(total)
  }
  const displayTotal = numberRange ? globalTotal || total : total
  const allProducts = useMemo(() => data?.data ?? [], [data])
  const hasMore = visibleCount < total

  const numberRanges = useMemo(() => buildNumberRanges(displayTotal), [displayTotal])

  const handleBuyProduct = useCallback(
    async (productId: string, shopeeUrl: string) => {
      window.open(shopeeUrl, "_blank")
      try {
        await logClick(productId)
      } catch {
        // Click log non-critical
      }
    },
    []
  )

  const resetFilters = useCallback(() => {
    setSelectedCategory("semua")
    setSort("newest")
    setNumberRange(null)
    setVisibleCount(PAGE_SIZE)
  }, [])

  const handleCategoryChange = useCallback((slug: string) => {
    setSelectedCategory(slug)
    setVisibleCount(PAGE_SIZE)
  }, [])

  const handleSortChange = useCallback((newSort: string) => {
    setSort(newSort)
    setVisibleCount(PAGE_SIZE)
  }, [])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }, [])

  const handleRangeSelect = useCallback((range: { from: number; to: number } | null) => {
    setNumberRange(range)
    setVisibleCount(PAGE_SIZE)
  }, [])

  return (
    <>
      <Navbar />
      <Hero featuredProducts={featuredProducts} onBuyProduct={handleBuyProduct} />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <div id="categories">
          <CategoryFilter
            categories={categories}
            activeSlug={selectedCategory}
            onSelect={handleCategoryChange}
            variant="chips"
            numberRanges={numberRanges}
            activeRange={numberRange}
            onRangeSelect={handleRangeSelect}
          />
        </div>
        <div id="products">
        <div className="flex flex-col md:flex-row gap-8 mt-3 md:mt-0">
          <CategoryFilter
            categories={categories}
            activeSlug={selectedCategory}
            onSelect={handleCategoryChange}
            variant="sidebar"
            numberRanges={numberRanges}
            activeRange={numberRange}
            onRangeSelect={handleRangeSelect}
          />
          <ProductGrid
            featuredProducts={featuredProducts}
            allProducts={allProducts}
            total={total}
            onBuyProduct={handleBuyProduct}
            isLoading={isLoading}
            isFeaturedLoading={isFeaturedLoading}
            error={error?.message}
            activeCategory={categories?.find(
              (c) => c.slug === selectedCategory
            )}
            onResetCategory={resetFilters}
            sort={sort}
            onSortChange={handleSortChange}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
