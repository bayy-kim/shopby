"use client"

import { Receipt, Mail, Lock, ArrowRight, Store } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] bg-[radial-gradient(#e5e1e9_1px,transparent_1px)] bg-[length:8px_8px] flex items-center justify-center p-4">
      <main className="w-full max-w-[480px] mx-auto">
        <div className="bg-white border border-[#906f69] relative flex flex-col">
          <div className="p-6 border-b border-dashed border-[#e5beb6] text-center">
            <div className="flex justify-center mb-2">
              <Receipt className="size-12 text-[#b51c00]" />
            </div>
            <h1 className="font-sans text-[32px] md:text-[40px] leading-[38px] md:leading-[48px] tracking-[-0.01em] md:tracking-[-0.02em] font-extrabold text-[#b51c00]">
              SHOPBY ADMIN
            </h1>
            <p className="font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mt-2">
              SYS_AUTH_REQ // SECURE_PORTAL
            </p>
          </div>

          <div className="p-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <label className="block font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#1a1c1b] mb-1" htmlFor="email">
                  Email Address
                </label>
                <div className="flex items-center mt-1">
                  <Mail className="size-5 text-[#5c403a] mr-3 absolute" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@shopby.com"
                    required
                    className="w-full pl-10 py-2 font-sans text-[16px] leading-[24px] text-[#1a1c1b] placeholder:text-[#5c403a]/50 bg-transparent border-0 border-b-2 border-dashed border-[#e5beb6] focus:border-[#b51c00] focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#1a1c1b] mb-1" htmlFor="password">
                  Passcode
                </label>
                <div className="flex items-center mt-1">
                  <Lock className="size-5 text-[#5c403a] mr-3 absolute" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 py-2 font-sans text-[16px] leading-[24px] text-[#1a1c1b] placeholder:text-[#5c403a]/50 bg-transparent border-0 border-b-2 border-dashed border-[#e5beb6] focus:border-[#b51c00] focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-dashed border-[#e5beb6] mt-8">
                <button
                  type="submit"
                  className="w-full bg-[#b51c00] text-white font-mono text-[13px] leading-[16px] tracking-[0.05em] py-4 rounded-full transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>AUTHORIZE_LOGIN</span>
                  <ArrowRight className="size-[18px]" />
                </button>
              </div>
            </form>
          </div>

          <div className="p-4 bg-[#f4f4f1] border-t border-[#906f69] flex flex-col items-center gap-3">
            <a className="font-sans text-[12px] leading-[16px] font-medium text-[#1a1c1b] hover:text-[#b51c00] transition-colors border-b border-transparent hover:border-[#b51c00]" href="#">
              Forgot Passcode?
            </a>
            <div className="w-full border-t border-dashed border-[#e5beb6] my-1" />
            <a className="font-sans text-[12px] leading-[16px] font-medium text-[#5c403a] hover:text-[#1a1c1b] transition-colors flex items-center gap-1" href="/">
              <Store className="size-4" />
              Return to Storefront
            </a>
          </div>

          <div className="absolute -bottom-3 left-0 w-full h-3 overflow-hidden flex justify-around opacity-50">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#FAFAF7] mt-1" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
