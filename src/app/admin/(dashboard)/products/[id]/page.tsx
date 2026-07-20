"use client"

import { Save, ArrowDown } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { fetchProductById, updateProduct } from "@/lib/services/products"
import { useCategories } from "@/hooks/useCategories"
import type { Product } from "@/types"

export default function EditProduct() {
  const router = useRouter()
  const params = useParams()
  const [showToast, setShowToast] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)
  const [isFeatured, setIsFeatured] = useState(false)
  const { data: categories } = useCategories()

  const nameRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = params?.id as string
    if (!id) return
    fetchProductById(id)
      .then((p) => {
        setProduct(p)
        setIsFeatured(p.isFeatured)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params?.id])

  const handleSave = async () => {
    if (!product) return
    const name = nameRef.current?.value || product.name
    const categoryId = categoryRef.current?.value || product.categoryId
    const shopeeUrl = linkRef.current?.value || product.shopeeUrl
    const priceText = priceRef.current?.value || String(product.price)

    const price = parseInt(priceText.replace(/\./g, ""), 10)
    if (isNaN(price)) {
      alert("Invalid price")
      return
    }

    setSaving(true)
    try {
      await updateProduct(product.id, {
        name,
        price,
        imageUrl: product.imageUrl,
        imageAlt: name,
        shopeeUrl,
        categoryId,
        isFeatured,
      })
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch {
      alert("Failed to update product")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="w-full max-w-[480px] mx-auto bg-[#f9f9f6] border border-[#e5e1d8] relative p-8 text-center" aria-busy="true">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-[#e2e3e0] rounded w-3/4 mx-auto" />
          <div className="h-4 bg-[#e2e3e0] rounded w-1/2 mx-auto" />
        </div>
        <p className="font-mono text-[13px] text-[#5c403a] mt-4">Loading product…</p>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="w-full max-w-[480px] mx-auto bg-[#f9f9f6] border border-[#e5e1d8] relative p-8 text-center">
        <div role="status">
          <p className="font-mono text-[13px] text-[#5c403a]">Product not found</p>
          <p className="font-mono text-[11px] text-[#906f69] mt-2">The product you are looking for does not exist or has been removed.</p>
        </div>
      </main>
    )
  }

  return (
    <>
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#FFC93C] text-[#1a1c1b] border-2 border-[#1a1c1b] px-4 py-3 shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] max-w-[440px] w-full mx-auto" role="alert" aria-live="polite">
          <Save className="size-6 mr-3 font-bold" aria-hidden="true" />
          <span className="font-mono text-[13px] tracking-[0.05em] uppercase">Product successfully updated!</span>
        </div>
      )}

      <main className="w-full max-w-[480px] mx-auto bg-[#f9f9f6] border border-[#e5e1d8] relative">
        <div className="p-8 pb-12">
          <header className="text-center mb-10">
            <h1 className="font-sans text-[32px] leading-[38px] tracking-[-0.01em] font-extrabold text-[#1a1c1b] uppercase">
              Shopby
            </h1>
            <p className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#76737b] mt-1 uppercase">
              Admin / Edit Product
            </p>
            <div className="w-full border-b-2 border-dashed border-[#e5e1d8] mt-6" />
          </header>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave() }}>
            <div>
              <label className="block font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase mb-1">Item No.</label>
              <p className="font-mono text-[16px] leading-[24px] font-bold">#{product.id}</p>
            </div>

            <div>
              <label className="block font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase mb-1" htmlFor="productName">Product Name</label>
              <input ref={nameRef} id="productName" type="text" defaultValue={product.name}
                className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[20px] leading-[28px] font-bold text-[#1a1c1b] focus:border-[#1a1c1b] focus:ring-0 focus:outline-none" />
            </div>

            <div>
              <label className="block font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase mb-1" htmlFor="category">Category</label>
              <div className="relative">
                <select ref={categoryRef} id="category" defaultValue={product.categoryId}
                  className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[16px] leading-[24px] text-[#1a1c1b] appearance-none pr-8 focus:border-[#1a1c1b] focus:ring-0 focus:outline-none">
                  {categories?.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <ArrowDown className="size-5 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#1a1c1b]" aria-hidden="true" />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase mb-1" htmlFor="affiliateLink">Affiliate Link</label>
              <input ref={linkRef} id="affiliateLink" type="url" defaultValue={product.shopeeUrl}
                className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[16px] leading-[24px] text-[#1a1c1b] focus:border-[#1a1c1b] focus:ring-0 focus:outline-none" />
            </div>

            <div>
              <label className="block font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase mb-1" htmlFor="price">Price (IDR)</label>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[32px] leading-[32px] tracking-[-0.04em] font-bold text-[#b51c00]">Rp</span>
                <input ref={priceRef} id="price" type="text" defaultValue={product.price.toLocaleString("id-ID")}
                  className="flex-1 border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-mono text-[32px] leading-[32px] tracking-[-0.04em] font-bold text-[#1a1c1b] focus:border-[#1a1c1b] focus:ring-0 focus:outline-none" />
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-dashed border-[#e5e1d8] my-8">
              <span className="font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase">Featured</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isFeatured} onChange={() => setIsFeatured(!isFeatured)} className="sr-only peer" />
                <div className="w-14 h-7 bg-[#e2e3e0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#FF4D2D]" />
                <span className="ml-3 font-mono text-[13px] leading-[16px] tracking-[0.05em] uppercase text-[#1a1c1b]">{isFeatured ? "Yes" : "No"}</span>
              </label>
            </div>

            <div className="pt-6 space-y-4">
              <button type="submit" disabled={saving}
                className="w-full bg-[#FF4D2D] text-[#1a1c1b] font-sans text-[20px] leading-[28px] font-bold py-4 px-6 rounded-full border border-[#1a1c1b] transition-all active:translate-y-0.5 active:translate-x-0.5 flex items-center justify-center disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#b51c00] focus-visible:outline-none">
                <Save className="size-5 mr-2" aria-hidden="true" />
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button type="button" onClick={() => router.back()}
                className="w-full bg-transparent text-[#5d5b62] font-mono text-[13px] leading-[16px] tracking-[0.05em] uppercase py-3 hover:text-[#1a1c1b] transition-colors underline decoration-dashed underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#b51c00] focus-visible:outline-none">
                Discard Edits
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase tracking-widest">*** END OF RECORD ***</p>
          </div>
        </div>
      </main>
    </>
  )
}
