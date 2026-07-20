"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [active, setActive] = useState("deals")

  const linkClass = (id: string) =>
    id === active
      ? "text-primary font-bold border-b-2 border-primary focus-visible:ring-2 focus-visible:ring-primary"
      : "text-ink/60 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-2 h-16 bg-bg/95 backdrop-blur-sm border-b border-border-color">
      <div className="flex items-center gap-4">
        <span className="font-sans text-headline-md md:text-display-lg-mobile uppercase tracking-tighter text-primary" translate="no">
          Shopby
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#products"
            onClick={() => setActive("deals")}
            className={linkClass("deals")}
          >
            Deals
          </Link>
          <Link
            href="/#categories"
            onClick={() => setActive("kategori")}
            className={linkClass("kategori")}
          >
            Kategori
          </Link>
        </div>
      </div>
    </nav>
  )
}