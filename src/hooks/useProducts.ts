import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/services/products"

interface UseProductsOptions {
  categorySlug?: string
  sort?: string
  skip?: number
  take?: number
}

export function useProducts(options?: UseProductsOptions) {
  const { categorySlug, sort, skip, take } = options ?? {}

  return useQuery({
    queryKey: ["products", categorySlug ?? "all", sort ?? "newest", skip ?? 0, take ?? 12],
    queryFn: () => fetchProducts(categorySlug, sort, skip, take),
  })
}
