"use client"

import { useState, useCallback } from "react"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import CategoryFilter from "@/components/sections/CategoryFilter"
import ProductGrid from "@/components/sections/ProductGrid"
import Footer from "@/components/layout/Footer"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"
import { logClick } from "@/lib/services/click"
import type { Product } from "@/types"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("semua")

  const { data: allProducts, isLoading, error } = useProducts(
    selectedCategory === "semua" ? undefined : selectedCategory
  )
  const { data: categories } = useCategories()

  const featuredProducts =
    allProducts?.filter((p: Product) => p.isFeatured) ?? []
  const regularProducts =
    allProducts?.filter((p: Product) => !p.isFeatured) ?? []

  const handleBuyProduct = useCallback(async (productId: string) => {
    try {
      const { shopeeUrl } = await logClick(productId)
      window.open(shopeeUrl, "_blank")
    } catch {
      const product = allProducts?.find((p: Product) => p.id === productId)
      if (product) window.open(product.shopeeUrl, "_blank")
    }
  }, [allProducts])

  const handleCategoryChange = useCallback((slug: string) => {
    setSelectedCategory(slug)
  }, [])

  return (
    <>
      <Navbar />
      <Hero featuredProducts={featuredProducts} />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row gap-8">
        <CategoryFilter
          categories={categories}
          activeSlug={selectedCategory}
          onSelect={handleCategoryChange}
        />
        <ProductGrid
          featuredProducts={featuredProducts}
          allProducts={regularProducts}
          totalCount={allProducts?.length ?? 0}
          onBuyProduct={handleBuyProduct}
          isLoading={isLoading}
          error={error?.message}
          activeCategory={categories?.find(
            (c) => c.slug === selectedCategory
          )}
          onResetCategory={() => setSelectedCategory("semua")}
        />
      </main>
      <Footer />
    </>
  )
}
