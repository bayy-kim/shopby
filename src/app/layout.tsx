import type { Metadata } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import Providers from "./providers"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Shopby — Belanja Cerdas, Struk Berkualitas",
    template: "%s — Shopby",
  },
  description:
    "Koleksi produk Shopee Affiliate pilihan dalam satu nota digital. Kurasi terbaik, navigasi cepat, harga transparan.",
  openGraph: {
    title: "Shopby — Belanja Cerdas, Struk Berkualitas",
    description:
      "Koleksi produk Shopee Affiliate pilihan dalam satu nota digital. Kurasi terbaik, navigasi cepat, harga transparan.",
    type: "website",
    locale: "id_ID",
    siteName: "Shopby",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopby — Belanja Cerdas, Struk Berkualitas",
    description:
      "Koleksi produk Shopee Affiliate pilihan dalam satu nota digital.",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Shopby", url: "https://shopby.io" }],
  applicationName: "Shopby",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#FAFAF7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Shopby",
              url: "https://shopby.io",
              description:
                "Koleksi produk Shopee Affiliate pilihan dalam satu nota digital.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://shopby.io/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" translate="no">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
