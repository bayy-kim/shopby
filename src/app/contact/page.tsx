import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Ada pertanyaan atau saran? Hubungi tim Shopby melalui form kontak atau kirim email ke hello@shopby.com.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow w-full max-w-[600px] mx-auto px-4 md:px-8 pt-28 pb-16">
        <div className="bg-white border border-[#e5e1d8] p-8 md:p-12" style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}>
          <div className="text-center mb-10">
            <h1 className="font-sans text-[32px] md:text-[40px] leading-[38px] md:leading-[48px] tracking-[-0.01em] md:tracking-[-0.02em] font-extrabold text-primary uppercase text-pretty">
              Hubungi Kami
            </h1>
            <p className="font-mono text-label-mono text-[#5c403a] mt-2">Ada pertanyaan? Kami siap membantu.</p>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          </div>

          <form className="space-y-6" action="#">
            <div>
              <label className="block font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase mb-1" htmlFor="name">Nama</label>
              <input id="name" type="text" required className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[16px] text-[#1a1c1b] focus:border-ink focus:ring-0 focus-visible:ring-2 focus-visible:ring-ink" />
            </div>
            <div>
              <label className="block font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase mb-1" htmlFor="email">Email</label>
              <input id="email" type="email" required className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[16px] text-[#1a1c1b] focus:border-ink focus:ring-0 focus-visible:ring-2 focus-visible:ring-ink" />
            </div>
            <div>
              <label className="block font-mono text-[12px] leading-[16px] font-medium text-[#76737b] uppercase mb-1" htmlFor="message">Pesan</label>
              <textarea id="message" rows={4} required className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[16px] text-[#1a1c1b] focus:border-ink focus:ring-0 focus-visible:ring-2 focus-visible:ring-ink resize-none" />
            </div>
            <button type="submit" className="w-full bg-primary text-ink py-4 font-bold rounded-full brutalist-shadow text-sm uppercase tracking-wider mt-4 focus-visible:ring-2 focus-visible:ring-primary">
              Kirim Pesan
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-dashed border-[#e5e1d8] text-center space-y-1">
            <p className="font-sans text-[14px] text-[#5c403a]">Atau kirim email ke</p>
            <a href="mailto:hello@shopby.com" className="font-mono text-[14px] text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-primary">hello@shopby.com</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
