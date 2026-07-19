import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/services/products"
import type { Product } from "@/types"

export function useProducts(categorySlug?: string) {
  return useQuery<Product[]>({
    queryKey: ["products", categorySlug ?? "all"],
    queryFn: () => fetchProducts(categorySlug),
  })
}
