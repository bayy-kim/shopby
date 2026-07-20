import Link from "next/link"

export default function Navbar() {
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
            className="text-primary font-bold border-b-2 border-primary focus-visible:ring-2 focus-visible:ring-primary"
          >
            Deals
          </Link>
          <Link
            href="/#categories"
            className="text-ink/60 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          >
            Kategori
          </Link>
          <Link
            href="/affiliate"
            className="text-ink/60 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          >
            Affiliate
          </Link>
        </div>
        <Link href="/admin-shopby/login" className="bg-primary text-ink px-4 py-2 font-bold rounded-full brutalist-shadow text-sm uppercase tracking-wider inline-block focus-visible:ring-2 focus-visible:ring-primary">
          Masuk
        </Link>
      </div>
    </nav>
  )
}
