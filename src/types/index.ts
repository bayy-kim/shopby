export interface Product {
  id: string
  name: string
  price: number
  discountPct: number | null
  imageUrl: string
  imageAlt: string
  shopeeUrl: string
  categoryId: string
  category: { id: string; name: string; slug: string }
  isFeatured: boolean
  createdAt: string
  clicks?: { id: string }[]
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface ClickLog {
  id: string
  productId: string
  clickedAt: string
}
