import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/services/products"

interface UseProductsOptions {
  categorySlug?: string
  sort?: string
  skip?: number
  take?: number
  numberFrom?: number
  numberTo?: number
}

export function useProducts(options?: UseProductsOptions) {
  const { categorySlug, sort, skip, take, numberFrom, numberTo } = options ?? {}

  return useQuery({
    queryKey: ["products", categorySlug ?? "all", sort ?? "newest", numberFrom ?? 0, numberTo ?? 0],
    queryFn: () => fetchProducts(categorySlug, sort, skip, take, numberFrom, numberTo),
    staleTime: 30000,
    placeholderData: (prev) => prev,
  })
}
