"use client"

import { Store, Shield, Save, ArrowRight } from "lucide-react"
import { useState } from "react"

const tabs = ["General", "Storefront", "Payouts", "Account"]

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("Storefront")
  const [autoPayout, setAutoPayout] = useState(true)
  const [twoFA, setTwoFA] = useState(false)

  return (
    <div className="max-w-[800px] mx-auto pb-24">
      <div className="mb-8 border-b border-dashed border-[#e5beb6] pb-4">
        <h2 className="font-sans text-[40px] leading-[48px] tracking-[-0.02em] font-extrabold text-[#1a1c1b] uppercase mb-2">
          Settings
        </h2>
        <p className="font-sans text-[16px] leading-[24px] text-[#5c403a]">
          Manage your storefront, payouts, and security preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 font-mono text-[13px] leading-[16px] tracking-[0.05em] transition-all ${
                  tab === activeTab
                    ? "bg-[#fdc73a] text-[#6f5400] font-bold border-l-4 border-[#b51c00]"
                    : "text-[#5c403a] hover:bg-[#f4f4f1]"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 space-y-8">
          <section className="bg-white border border-[#e5e1d8] p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 size-6 bg-[#FAFAF7] rounded-full border border-[#e5e1d8]" />
            <h3 className="font-sans text-[20px] leading-[28px] font-bold text-[#1a1c1b] mb-6 flex items-center gap-2 border-b border-dashed border-[#e5beb6] pb-4">
              <Store className="size-5 text-[#b51c00]" />
              Storefront Settings
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mb-1">Store Name</label>
                <input type="text" defaultValue="Shopby Affiliate Store"
                  className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[16px] leading-[24px] text-[#1a1c1b] focus:border-[#1a1c1b] focus:ring-0 focus:outline-none" />
              </div>
              <div>
                <label className="block font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mb-1">Store URL</label>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[13px] text-[#5c403a]">shopby.io/</span>
                  <input type="text" defaultValue="username"
                    className="flex-1 border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-mono text-[13px] tracking-[0.05em] text-[#1a1c1b] focus:border-[#1a1c1b] focus:ring-0 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mb-1">Bio</label>
                <textarea rows={2} defaultValue="Curating the best minimalist gear."
                  className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[16px] leading-[24px] text-[#1a1c1b] resize-none focus:border-[#1a1c1b] focus:ring-0 focus:outline-none" />
              </div>

              <div className="border-t border-dashed border-[#e5e1d8] my-6" />

              <div>
                <label className="block font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mb-3">Branding</label>
                <div className="flex items-center gap-6 bg-white p-4 border border-dashed border-[#e5e1d8]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="size-16 rounded-full border border-[#e5e1d8] bg-[#f4f4f1] flex items-center justify-center">
                      <Store className="size-6 text-[#5c403a]" />
                    </div>
                    <span className="font-sans text-[12px] leading-[16px] font-medium text-[#5c403a]">Update Logo</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-[12px] text-[#5c403a]">Primary Color</span>
                    <div className="flex gap-2">
                      <button className="size-8 rounded-full border-2 border-[#b51c00] bg-[#FF4D2D]" />
                      <button className="size-8 rounded-full border border-[#e5e1d8] bg-[#1a1c1b] hover:scale-110 transition-transform" />
                      <button className="size-8 rounded-full border border-[#e5e1d8] bg-[#FFC93C] hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#e5e1d8] p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 size-6 bg-[#FAFAF7] rounded-full border border-[#e5e1d8]" />
            <h3 className="font-sans text-[20px] leading-[28px] font-bold text-[#1a1c1b] mb-6 flex items-center gap-2 border-b border-dashed border-[#e5beb6] pb-4">
              <Store className="size-5 text-[#b51c00]" />
              Payout Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mb-1">Bank Name</label>
                <input type="text" defaultValue="BCA"
                  className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[16px] uppercase text-[#1a1c1b] focus:border-[#1a1c1b] focus:ring-0 focus:outline-none" />
              </div>
              <div>
                <label className="block font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mb-1">Account Number</label>
                <input type="text" defaultValue="1234-5678-9012"
                  className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-mono text-[32px] leading-[32px] tracking-[-0.04em] font-bold text-[#1a1c1b] focus:border-[#1a1c1b] focus:ring-0 focus:outline-none" />
              </div>
              <div>
                <label className="block font-mono text-[13px] leading-[16px] tracking-[0.05em] text-[#5c403a] mb-1">Account Holder Name</label>
                <input type="text" defaultValue="JOHN DOE"
                  className="w-full border-0 border-b-2 border-[#e5e1d8] bg-transparent pb-2 font-sans text-[16px] uppercase text-[#1a1c1b] focus:border-[#1a1c1b] focus:ring-0 focus:outline-none" />
              </div>
              <div className="bg-[#f4f4f1] border border-dashed border-[#e5e1d8] p-4 flex justify-between items-center">
                <span className="font-mono text-[13px] tracking-[0.05em] text-[#5c403a]">Minimum Payout Threshold</span>
                <span className="font-mono text-[13px] font-bold text-[#1a1c1b]">Rp 100.000</span>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#e5e1d8] p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 size-6 bg-[#FAFAF7] rounded-full border border-[#e5e1d8]" />
            <h3 className="font-sans text-[20px] leading-[28px] font-bold text-[#1a1c1b] mb-6 flex items-center gap-2 text-[#ba1a1a] border-b border-dashed border-[#e5beb6] pb-4">
              <Shield className="size-5" />
              Security
            </h3>
            <div className="space-y-4">
              <button className="w-full flex justify-between items-center py-3 border-b border-dashed border-[#e5e1d8] hover:bg-[#f4f4f1] transition-colors group">
                <span className="font-sans text-[16px] text-[#1a1c1b]">Change Password</span>
                <ArrowRight className="size-5 text-[#5c403a] group-hover:text-[#b51c00]" />
              </button>
              <div className="flex justify-between items-center py-3">
                <div>
                  <div className="font-sans text-[16px] text-[#1a1c1b]">Auto-Payouts</div>
                  <div className="font-sans text-[12px] text-[#5c403a] mt-1">Transfer funds daily</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={autoPayout} onChange={() => setAutoPayout(!autoPayout)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#e2e3e0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF4D2D]" />
                </label>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <div className="font-sans text-[16px] text-[#1a1c1b]">Two-Factor Authentication</div>
                  <div className="font-sans text-[12px] text-[#5c403a] mt-1">Enhance account security</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={twoFA} onChange={() => setTwoFA(!twoFA)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#e2e3e0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF4D2D]" />
                </label>
              </div>
            </div>
          </section>

          <div className="flex justify-end items-center gap-4 pt-4 border-t border-dashed border-[#e5e1d8]">
            <button className="px-6 py-2 rounded-full font-mono text-[13px] tracking-[0.05em] border border-[#e5e1d8] text-[#1a1c1b] hover:bg-[#f4f4f1] transition-colors active:translate-y-0.5 active:translate-x-0.5">
              Discard
            </button>
            <button className="px-6 py-2 rounded-full font-mono text-[13px] tracking-[0.05em] bg-[#FF4D2D] text-[#1a1c1b] border border-[#1a1c1b] font-bold active:translate-y-0.5 active:translate-x-0.5 transition-transform hover:scale-105 flex items-center gap-2">
              <Save className="size-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
