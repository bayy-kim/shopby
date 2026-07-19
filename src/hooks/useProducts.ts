import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/services/products"

interface UseProductsOptions {
  categorySlug?: string
  sort?: string
}

export function useProducts(options?: UseProductsOptions) {
  const { categorySlug, sort } = options ?? {}

  return useQuery({
    queryKey: ["products", categorySlug ?? "all", sort ?? "newest"],
    queryFn: () => fetchProducts(categorySlug, sort),
    placeholderData: (prev) => prev,
  })
}
