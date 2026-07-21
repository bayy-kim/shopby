"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const BANNER_DISMISSED_KEY = "shopby_banner_dismissed"

export default function NotificationBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  if (!visible) return null

  const handleDismiss = () => {
    setVisible(false)
    localStorage.setItem(BANNER_DISMISSED_KEY, "1")
  }

  return (
    <div
      role="alert"
      className="relative w-full bg-[#fef6e4] border-b-2 border-[#fdc73a] px-4 py-3 md:py-2"
    >
      <div className="max-w-[1200px] mx-auto flex items-start md:items-center justify-between gap-4">
        <p className="font-sans text-[13px] md:text-[14px] leading-[20px] text-[#6f5400]">
          <span className="font-bold">INFO:</span>{" "}
          *harga bisa berubah kapan saja admin cuma mengambil harga pas produk di tambahkan ke catalog mimin, selamat berbelanja 😊!!!
        </p>
        <button
          onClick={handleDismiss}
          className="shrink-0 p-1 rounded text-[#6f5400]/60 hover:text-[#6f5400] hover:bg-[#fdc73a]/30 transition-colors focus-visible:ring-2 focus-visible:ring-[#b51c00] focus-visible:outline-none"
          aria-label="Tutup pemberitahuan"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
