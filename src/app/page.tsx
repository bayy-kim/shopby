"use client"

import { useState, useCallback, useMemo } from "react"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import CategoryFilter from "@/components/sections/CategoryFilter"
import ProductGrid from "@/components/sections/ProductGrid"
import Footer from "@/components/layout/Footer"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"
import { logClick } from "@/lib/services/click"
import { buildNumberRanges } from "@/lib/utils"
import type { Product } from "@/types"

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
    numberFrom: numberRange?.from,
    numberTo: numberRange?.to,
  })

  const { data: categories } = useCategories()

  const total = data?.total ?? 0
  const allProducts = useMemo(() => data?.data ?? [], [data])
  const visibleProducts = allProducts.slice(0, visibleCount)
  const featuredProducts = visibleProducts.filter(
    (p: Product) => p.isFeatured
  )
  const regularProducts = visibleProducts.filter(
    (p: Product) => !p.isFeatured
  )
  const hasMore = visibleCount < allProducts.length

  const numberRanges = useMemo(() => buildNumberRanges(total), [total])

  const handleBuyProduct = useCallback(
    async (productId: string) => {
      try {
        const { shopeeUrl } = await logClick(productId)
        window.open(shopeeUrl, "_blank")
      } catch {
        const product = allProducts.find(
          (p: Product) => p.id === productId
        )
        if (product) window.open(product.shopeeUrl, "_blank")
      }
    },
    [allProducts]
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
      <Hero featuredProducts={featuredProducts} />
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
            allProducts={regularProducts}
            total={total}
            onBuyProduct={handleBuyProduct}
            isLoading={isLoading}
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
