import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-bg/95 backdrop-blur-sm border-b border-border-color">
      <div className="flex items-center gap-4">
        <span className="font-sans text-display-lg-mobile uppercase tracking-tighter text-primary">
          Shopby
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="#"
            className="text-primary font-bold border-b-2 border-primary"
          >
            Deals
          </Link>
          <Link
            href="#"
            className="text-ink/60 hover:text-primary transition-colors"
          >
            Kategori
          </Link>
          <Link
            href="#"
            className="text-ink/60 hover:text-primary transition-colors"
          >
            Affiliate
          </Link>
        </div>
        <button className="bg-primary text-ink px-4 py-2 font-bold rounded-full brutalist-shadow text-sm uppercase tracking-wider">
          Masuk
        </button>
      </div>
    </nav>
  )
}
