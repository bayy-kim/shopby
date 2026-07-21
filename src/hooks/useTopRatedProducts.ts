import { useQuery } from "@tanstack/react-query"
import { fetchTopRatedProducts } from "@/lib/services/products"
import type { Product } from "@/types"

export function useTopRatedProducts() {
  return useQuery<Product[]>({
    queryKey: ["products", "top-rated"],
    queryFn: () => fetchTopRatedProducts(6),
    placeholderData: (prev) => prev,
  })
}
