import type { Category } from "@/types"

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories")
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}
