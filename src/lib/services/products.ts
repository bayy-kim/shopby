import type { Product } from "@/types"

export async function fetchProducts(
  categorySlug?: string
): Promise<Product[]> {
  const params = categorySlug ? `?category=${categorySlug}` : ""
  const res = await fetch(`/api/products${params}`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const res = await fetch("/api/products")
  if (!res.ok) throw new Error("Failed to fetch featured products")
  const products: Product[] = await res.json()
  return products.filter((p) => p.isFeatured)
}
