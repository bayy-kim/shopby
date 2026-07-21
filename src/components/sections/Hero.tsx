"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/types"

interface HeroProps {
  featuredProducts?: Product[]
  onBuyProduct?: (productId: string, shopeeUrl: string) => void
  isFeaturedLoading?: boolean
  storeName?: string
  tagline?: string
}

const defaultFeatured: Product[] = [
  {
    id: "3",
    name: "Smart Home Security Camera",
    price: 280000,
    commission: 0,
    rating: 4,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAStz6MWdhJ1zh4c0FwFqadWl6CZq5yq6-UlVR_qmFH3_loMLyyqbx3zne-khm5hPTJvfh1jA52Rnza1u51vuol1UW2bCTvHPHKqORb1UGD1RNbFG_MVh5A69rXC3IbEtRojtC9QmdCOivROrbCKT-ltHi0VDusfzZFZ263onsWtLZ8Kq0Em-IwzPQHBRdFNez08kHupdRaWZE1ZJY7to6Yaw_Fb-3xKMD806mIvw6va3dJeJvMrTegl9c3V-SVYZdaZlca2ZD5_Wc",
    imageAlt:
      "A modern minimalist mechanical keyboard on a pristine white desk setup, top-down view, sharp lighting, high contrast utilitarian aesthetic, highly detailed.",
    shopeeUrl: "#",
    categoryId: "cat1",
    category: { id: "cat1", name: "Elektronik", slug: "elektronik" },
    isFeatured: true,
    isSoldOut: false,
    number: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Wireless Earbuds ANC",
    price: 350000,
    commission: 0,
    rating: 4,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3uVOfDHT35zefCDRgrqt2khWekMJD-uhSl5FzLgypPRdHepB2_ejWNHK7FJCA0zRbKqNm4IE_3qScrEx0KQ96sUDbjCmvhA5kryVfBw3OJltTCotP_W8vgbo-3JYrifB7rSWiOioLD-98KffR6uva4DWoA_nNdmcUaplsTn1ph53oD9lCo3xbgFvX21dBmBTmgewH6TWmU4G-ADl2QFPnXkGSbsOvC2zXHFkRLCyBaUhxbF7Sb5V8ff8tYaOZbg9n-7gDWxfF4I",
    imageAlt:
      "A sleek minimalist stainless steel coffee tumbler on a concrete surface, dramatic lighting casting a hard shadow, brutalist industrial aesthetic, highly detailed.",
    shopeeUrl: "#",
    categoryId: "cat3",
    category: { id: "cat3", name: "Rumah Tangga", slug: "rumah-tangga" },
    isFeatured: true,
    isSoldOut: false,
    number: 0,
    createdAt: new Date().toISOString(),
  },
]

export default function Hero({
  featuredProducts,
  onBuyProduct,
  isFeaturedLoading,
  storeName,
  tagline,
}: HeroProps) {
  const displayProducts = featuredProducts?.length ? featuredProducts : defaultFeatured
  const [card1, card2] = displayProducts.slice(0, 2)

  const handleCardClick = (productId: string, shopeeUrl: string) => {
    if (!onBuyProduct || shopeeUrl === "#") return
    onBuyProduct(productId, shopeeUrl)
  }

  return (
    <header className="pt-32 pb-20 px-4 md:px-8 max-w-[1200px] mx-auto w-full relative overflow-hidden">
      <div className="hero-scan-line" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 z-10">
          <h1 className="font-sans text-display-lg-mobile md:text-display-lg text-ink leading-none uppercase text-pretty">
            {storeName || "Belanja Cerdas"},
            <br />
            Struk Berkualitas
          </h1>
          <p className="text-ink/60 max-w-md">
            {tagline || "Rekomendasi produk pilihan dari berbagai kategori. Terkurasi, terpercaya, harga transparan."}
          </p>
          <a href="#products" className="inline-block bg-primary text-ink px-8 py-4 font-bold rounded-full brutalist-shadow text-lg uppercase tracking-wider mt-4 focus-visible:ring-2 focus-visible:ring-primary">
            Lihat Semua Deal
          </a>
        </div>

        <div className="relative h-[400px] hidden md:block">
          {isFeaturedLoading ? (
            <>
              <div className="absolute top-10 right-10 w-64 receipt-card p-4 -rotate-[3deg] z-10" style={{ background: "white", clipPath: "polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px)" }}>
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-bg border border-border-color z-20" />
                <div className="mt-8 brutalist-dashed pb-4">
                  <div className="w-full h-40 skeleton-shimmer mb-4 border border-border-color" />
                  <div className="h-3 skeleton-shimmer w-16 mb-2" />
                  <div className="h-4 skeleton-shimmer w-36" />
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <div className="h-5 skeleton-shimmer w-20" />
                  <div className="size-5 skeleton-shimmer" />
                </div>
              </div>
              <div className="absolute bottom-10 left-10 w-64 receipt-card p-4 rotate-[2deg] z-0" style={{ background: "white", clipPath: "polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px)" }}>
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-bg border border-border-color z-20" />
                <div className="mt-8 brutalist-dashed pb-4">
                  <div className="w-full h-40 skeleton-shimmer mb-4 border border-border-color" />
                  <div className="h-3 skeleton-shimmer w-16 mb-2" />
                  <div className="h-4 skeleton-shimmer w-36" />
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <div className="h-5 skeleton-shimmer w-20" />
                  <div className="size-5 skeleton-shimmer" />
                </div>
              </div>
            </>
          ) : (
            <>
              {card1 && (
                <button
                  onClick={() => handleCardClick(card1.id, card1.shopeeUrl)}
                  className="absolute top-10 right-10 w-64 receipt-card p-4 -rotate-[3deg] z-10 cursor-pointer text-left"
                  style={{
                    background: "white",
                    clipPath: "polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px)",
                  }}
                  aria-label={`Lihat ${card1.name}`}
                >
                  <span className="absolute top-3 left-3 w-3 h-3 rounded-full bg-bg border border-border-color z-20" aria-hidden="true" />
                  <div className="mt-8 brutalist-dashed pb-4">
                    <div className="relative w-full h-40 border border-border-color mb-4 overflow-hidden">
                      <Image
                        src={card1.imageUrl}
                        alt={card1.imageAlt}
                        fill
                        loading="eager"
                        className="object-cover"
                        sizes="256px"
                      />
                    </div>
                    <span className="font-mono text-xs text-ink/60 uppercase">
                      {card1.category.name}
                    </span>
                    <span className="font-bold text-ink mt-1 block">{card1.name}</span>
                  </div>
                  <div className="pt-4 flex justify-between items-end">
                    <span
                      className="font-mono text-price-xl text-ink"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      Rp{(card1.price / 1000).toFixed(0)}k
                    </span>
                    <ArrowRight className="text-primary size-5" aria-hidden="true" />
                  </div>
                  <span className="scan-line" aria-hidden="true" />
                </button>
              )}

              {card2 && (
                <button
                  onClick={() => handleCardClick(card2.id, card2.shopeeUrl)}
                  className="absolute bottom-10 left-10 w-64 receipt-card p-4 rotate-[2deg] z-0 cursor-pointer text-left"
                  style={{
                    background: "white",
                    clipPath: "polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px)",
                  }}
                  aria-label={`Lihat ${card2.name}`}
                >
                  <span className="absolute top-3 left-3 w-3 h-3 rounded-full bg-bg border border-border-color z-20" aria-hidden="true" />
                  <div className="mt-8 brutalist-dashed pb-4">
                    <div className="relative w-full h-40 border border-border-color mb-4 overflow-hidden">
                      <Image
                        src={card2.imageUrl}
                        alt={card2.imageAlt}
                        fill
                        loading="eager"
                        className="object-cover"
                        sizes="256px"
                      />
                    </div>
                    <span className="font-mono text-xs text-ink/60 uppercase">
                      {card2.category.name}
                    </span>
                    <span className="font-bold text-ink mt-1 block">{card2.name}</span>
                  </div>
                  <div className="pt-4 flex justify-between items-end">
                    <span
                      className="font-mono text-price-xl text-ink"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      Rp{(card2.price / 1000).toFixed(0)}k
                    </span>
                    <ArrowRight className="text-primary size-5" aria-hidden="true" />
                  </div>
                  <span className="scan-line" aria-hidden="true" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
