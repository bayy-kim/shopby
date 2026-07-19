import type { Product } from "@/types"

interface ProductsResponse {
  data: Product[]
  total: number
}

export async function fetchProducts(
  categorySlug?: string,
  sort?: string,
  skip?: number,
  take?: number
): Promise<ProductsResponse> {
  const params = new URLSearchParams()
  if (categorySlug) params.set("category", categorySlug)
  if (sort) params.set("sort", sort)
  if (skip) params.set("skip", String(skip))
  if (take) params.set("take", String(take))

  const res = await fetch(`/api/products?${params.toString()}`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const { data } = await fetchProducts()
  return data.filter((p) => p.isFeatured)
}
