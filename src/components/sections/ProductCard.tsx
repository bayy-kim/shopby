"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import type { Product } from "@/types"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  variant?: "highlight" | "compact"
  onBuy?: (productId: string) => void
}

export default function ProductCard({
  product,
  variant = "compact",
  onBuy,
}: ProductCardProps) {
  const isHighlight = variant === "highlight"

  const handleBuy = () => {
    onBuy?.(product.id)
  }

  return (
    <div
      className="receipt-card p-3 flex flex-col justify-between"
      style={{
        clipPath: "polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px)",
      }}
    >
      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-bg border border-border-color z-20" />
      <div>
        <div
          className={`relative w-full border border-border-color mb-3 overflow-hidden ${isHighlight ? "h-48" : "h-32"}`}
        >
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            className="object-cover"
            sizes={isHighlight ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 50vw, 25vw"}
          />
        </div>
        {isHighlight && (
          <span className="font-mono text-xs text-ink/60 uppercase">
            {product.category.name}
          </span>
        )}
        <h3
          className={`font-bold text-ink leading-tight mt-1 ${isHighlight ? "" : "text-sm"}`}
        >
          {product.name}
        </h3>
      </div>
      <div className="mt-3 pt-3 border-t border-dashed border-border-color">
        <p
          className={`font-mono text-ink mb-2 ${isHighlight ? "text-2xl" : "text-lg"}`}
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {formatPrice(product.price)}
        </p>
        <button
          onClick={handleBuy}
          className={`w-full py-1 font-bold text-xs uppercase brutalist-border transition-colors flex justify-center items-center gap-1.5 ${
            isHighlight
              ? "bg-primary text-white hover:bg-ink"
              : "bg-[#e8e8e5] text-ink hover:bg-primary hover:text-white"
          }`}
        >
          {isHighlight ? "Beli di Shopee" : "Beli"}
          <ExternalLink className="size-3" />
        </button>
      </div>
      <div className="scan-line" />
    </div>
  )
}
