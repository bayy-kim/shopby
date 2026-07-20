import type { Product } from "@/types"

interface ProductsResponse {
  data: Product[]
  total: number
}

export async function fetchProducts(
  categorySlug?: string,
  sort?: string,
  skip?: number,
  take?: number,
  numberFrom?: number,
  numberTo?: number
): Promise<ProductsResponse> {
  const params = new URLSearchParams()
  if (categorySlug) params.set("category", categorySlug)
  if (sort) params.set("sort", sort)
  if (skip) params.set("skip", String(skip))
  if (take) params.set("take", String(take))
  if (numberFrom) params.set("numberFrom", String(numberFrom))
  if (numberTo) params.set("numberTo", String(numberTo))

  const res = await fetch(`/api/products?${params.toString()}`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const res = await fetch("/api/products?featured=true")
  if (!res.ok) throw new Error("Failed to fetch featured products")
  const json = await res.json()
  return json.data
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`)
  if (!res.ok) throw new Error("Failed to fetch product")
  const json = await res.json()
  return json.data
}

export async function createProduct(data: {
  name: string
  price: number
  discountPct?: number | null
  imageUrl: string
  imageAlt?: string
  shopeeUrl: string
  categoryId: string
  isFeatured?: boolean
  isSoldOut?: boolean
}): Promise<Product> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create product")
  const json = await res.json()
  return json.data
}

export async function updateProduct(
  id: string,
  data: {
    name: string
    price: number
    discountPct?: number | null
    imageUrl: string
    imageAlt?: string
    shopeeUrl: string
    categoryId: string
    isFeatured?: boolean
    isSoldOut?: boolean
  }
): Promise<Product> {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update product")
  const json = await res.json()
  return json.data
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete product")
}

export async function fetchStats(period?: string): Promise<{
  totalSales: number
  totalProducts: number
  activeProducts: number
  soldOut: number
  totalClicks: number
  avgCommission: number
  recentClicks: { productName: string; clickedAt: string }[]
  topProducts: { id: string; name: string; clicks: number; category: string }[]
}> {
  const params = period && period !== "all" ? `?period=${period}` : ""
  const res = await fetch(`/api/stats${params}`)
  if (!res.ok) throw new Error("Failed to fetch stats")
  const json = await res.json()
  return json.data
}

export async function fetchAnalytics(period?: string): Promise<{
  totalRevenue: number
  aov: number
  conversionRate: number
  bounceRate: number
  totalClicks: number
  totalProducts: number
  revenueData: { day: string; clicks: number; conversions: number; revenue: number }[]
  topProducts: Record<string, { name: string; clicks: number; revenue: number }>
}> {
  const mapped = period === "All Time" ? "all"
    : period === "This Week" ? "week"
    : period === "This Month" ? "month"
    : period === "This Year" ? "year"
    : period
  const params = mapped && mapped !== "all" ? `?period=${mapped}` : ""
  const res = await fetch(`/api/analytics${params}`)
  if (!res.ok) throw new Error("Failed to fetch analytics")
  const json = await res.json()
  return json.data
}
