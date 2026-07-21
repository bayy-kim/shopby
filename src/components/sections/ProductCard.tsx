"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Star } from "lucide-react"
import type { Product } from "@/types"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  variant?: "highlight" | "compact"
  onBuy?: (productId: string, shopeeUrl: string) => void
}

const MAX_NAME_LENGTH = 60

function StarRating({ rating }: { rating: number }) {
  if (rating <= 0) return null
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.25
  const halfFill = rating - fullStars
  const shineClass = rating > 4.5 ? "star-shine-high" : rating > 4 ? "star-shine-mid" : ""

  return (
    <div className="flex items-center gap-0.5 mt-1" aria-label={`Rating ${rating.toFixed(1)} dari 5`}>
      {[1, 2, 3, 4, 5].map((s) => {
        if (s <= fullStars) {
          return (
            <Star
              key={s}
              className={`size-3 text-[#f59e0b] fill-[#f59e0b] ${shineClass}`}
              aria-hidden="true"
            />
          )
        }
        if (hasHalfStar && s === fullStars + 1) {
          return (
            <span key={s} className="relative size-3" aria-hidden="true">
              <Star className="absolute inset-0 size-3 text-[#e2e3e0]" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${halfFill * 100}%` }}
              >
                <Star className={`size-3 text-[#f59e0b] fill-[#f59e0b] ${shineClass}`} />
              </span>
            </span>
          )
        }
        return (
          <Star
            key={s}
            className="size-3 text-[#e2e3e0]"
            aria-hidden="true"
          />
        )
      })}
      <span className="font-mono text-[10px] text-ink/50 ml-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

export default function ProductCard({
  product,
  variant = "compact",
  onBuy,
}: ProductCardProps) {
  const isHighlight = variant === "highlight"
  const isSoldOut = product.isSoldOut
  const [nameExpanded, setNameExpanded] = useState(false)
  const nameNeedsTruncation = product.name.length > MAX_NAME_LENGTH

  const handleBuy = () => {
    if (isSoldOut) return
    onBuy?.(product.id, product.shopeeUrl)
  }

  return (
    <div
      className="receipt-card p-3 flex flex-col justify-between hover-lift h-full"
      style={{
        clipPath: "polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px)",
      }}
    >
      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-bg border border-border-color z-20" />
      {isHighlight && !isSoldOut && (
        <span className="absolute top-2 right-2 bg-primary text-white font-mono text-[9px] font-bold uppercase px-2 py-0.5 z-30 tag-pulse">
          Hot Deal
        </span>
      )}
      <div>
        <div className="relative w-full border border-border-color mb-3 overflow-hidden aspect-[4/3]">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            loading="lazy"
            fetchPriority="low"
            unoptimized
            className={`object-cover ${isSoldOut ? "opacity-50" : ""}`}
            sizes={isHighlight ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 50vw, 25vw"}
          />
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="font-mono text-sm text-white font-bold uppercase tracking-wider bg-ink/60 px-3 py-1 border border-white/30">
                Stok Habis
              </span>
            </div>
          )}
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {isHighlight && (
              <span className="font-mono text-xs text-ink/60 uppercase">
                {product.category.name}
              </span>
            )}
            <StarRating rating={product.rating} />
            <h3 className={`font-bold text-ink leading-tight ${isHighlight ? "" : "text-sm"} ${product.rating > 0 ? "mt-0" : "mt-1"}`}>
              {nameNeedsTruncation && !nameExpanded
                ? `${product.name.slice(0, MAX_NAME_LENGTH)}...`
                : product.name}
            </h3>
            {nameNeedsTruncation && (
              <button
                onClick={() => setNameExpanded((p) => !p)}
                className="font-mono text-[10px] text-primary/70 hover:text-primary mt-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                aria-expanded={nameExpanded}
              >
                {nameExpanded ? "Lebih sedikit" : "Lebih banyak"}
              </button>
            )}
          </div>
          {product.number > 0 && (
            <span className="font-mono text-[10px] text-ink/40 uppercase shrink-0 mt-1">
              #{product.number}
            </span>
          )}
        </div>
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
          disabled={isSoldOut}
          aria-disabled={isSoldOut}
          className={`w-full py-1 font-bold text-xs uppercase brutalist-border transition-colors flex justify-center items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary ${
            isSoldOut
              ? "bg-[#e2e3e0] text-[#906f69] cursor-not-allowed"
              : isHighlight
                ? "bg-primary text-white hover:bg-ink"
                : "bg-[#e8e8e5] text-ink hover:bg-primary hover:text-white"
          }`}
        >
          {isSoldOut ? "Stok Habis" : isHighlight ? "Beli di Shopee" : "Beli"}
          {!isSoldOut && <ExternalLink className="size-3" aria-hidden="true" />}
        </button>
      </div>
      <div className="scan-line" />
    </div>
  )
}
