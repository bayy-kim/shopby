import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t-2 border-dashed border-border-color py-8 px-4 md:px-8 bg-[#e8e8e5]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-md">
          <span className="font-mono text-label-mono uppercase text-primary mb-2 block">
            Shopby
          </span>
          <p className="text-caption text-ink font-sans">
            Kami adalah partner Shopee Affiliate. Setiap pembelian melalui link
            ini membantu kami terus berbagi rekomendasi terbaik.
          </p>
          <p className="text-caption text-ink/60 mt-2">
            &copy; 2024 Shopby Affiliate. Utilitarian Playful Design.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="#"
            className="text-caption text-ink/60 hover:text-primary transition-colors font-sans"
          >
            Tentang Kami
          </Link>
          <Link
            href="#"
            className="text-caption text-ink/60 hover:text-primary transition-colors font-sans"
          >
            Kebijakan Privasi
          </Link>
          <Link
            href="#"
            className="text-caption text-ink/60 hover:text-primary transition-colors font-sans"
          >
            Syarat &amp; Ketentuan
          </Link>
          <Link
            href="#"
            className="text-caption text-ink/60 hover:text-primary transition-colors font-sans"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </footer>
  )
}
