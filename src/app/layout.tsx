import type { Metadata } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import Providers from "./providers"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
})

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
})

export const metadata: Metadata = {
  title: "Shopby - Belanja Cerdas, Struk Berkualitas",
  description:
    "Koleksi produk Shopee Affiliate pilihan dalam satu nota digital. Kurasi terbaik, navigasi cepat, harga transparan.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
