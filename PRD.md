# PRD - Shopby

## 1. Latar Belakang

Bayu sudah disetujui sebagai Shopee Affiliate dan butuh satu halaman pusat (landing page) untuk memajang produk-produk rekomendasi yang dipromosikan. Selama ini link affiliate biasanya cuma disebar manual di bio sosmed/konten, tanpa tampilan yang rapi dan tanpa data seberapa efektif link tersebut. Shopby dibuat untuk menjawab dua masalah itu sekaligus: tampilan produk yang menarik + pelacakan klik sederhana.

## 2. Tujuan Produk

- Menyediakan satu halaman terpusat untuk semua produk affiliate Shopee milik Bayu.
- Menaikkan CTR (click-through rate) dari pengunjung ke link Shopee.
- Memberi kesan profesional/branded, bukan sekadar link mentah di bio.
- Memudahkan update produk baru tanpa perlu sentuh kode (lewat database/admin sederhana di fase berikutnya).

## 3. Target User

- Followers dari konten Bayu (YouTube "Bonbon and Chiko", sosial media pribadi, dsb).
- Pengunjung yang datang dari bio link / caption yang mencari rekomendasi produk.
- Bayu sendiri sebagai admin/pengelola konten produk.

## 4. Fitur Utama (MVP)

| Fitur | Deskripsi |
|---|---|
| Hero section | Headline singkat + CTA, floating card highlight produk unggulan |
| Filter kategori (mobile chips) | Chip horizontal scroll di mobile, sidebar di desktop |
| Sorting | Urut berdasarkan terbaru, termurah, termahal |
| Grid produk | Card berisi gambar, nama, harga, badge diskon (opsional), tombol "Beli di Shopee" |
| Produk terlaris/rekomendasi | Section khusus highlight produk pilihan (isFeatured) |
| Klik tracking | Setiap klik "Beli di Shopee" dicatat (produk, waktu) untuk analitik sederhana |
| Progressif load | Tombol "Muat Lebih Banyak" untuk reveal produk bertahap |
| Footer | Social links + disclaimer affiliate |

## 5. Fitur Implementasi (Admin Panel)

| Fitur | Deskripsi |
|---|---|
| `/admin/login` | Login page dengan receipt card, brutalist styling, form auth |
| `/admin` | Dashboard — statistik penjualan, grafik performa, aktivitas terbaru |
| `/admin/products` | Tabel manajemen produk lengkap dengan filter, search, pagination |
| `/admin/products/[id]` | Edit produk — form nama, kategori, link afiliasi, harga, status |
| `/admin/analytics` | Panel metrik — revenue, AOV, conversion rate, traffic sources, geografis |
| `/admin/settings` | Konfigurasi store profile, payout info, keamanan (2FA, password) |
| Sidebar navigasi | Desktop fixed sidebar, mobile collapsible overlay |
| Brutalist/receipt theme | Konsisten dengan landing page — ink, vivid-orange, tag-yellow, dashed dividers |

## 6. Fitur Fase Berikutnya (Nice to Have)

- Search produk di landing page
- Statistik klik per produk (dashboard mini real-time)
- Halaman detail produk (`/produk/[slug]`)
- Autentikasi admin sesungguhnya (JWT/session)

## 6. User Flow

1. User buka Shopby (dari bio link / share konten).
2. Landing di hero, lihat highlight produk.
3. Geser chip kategori / tap kategori di sidebar → filter produk.
4. Ubah sorting (terbaru/termurah/termahal) sesuai kebutuhan.
5. Klik "Muat Lebih Banyak" untuk lihat produk lainnya.
6. Klik card produk → sistem catat klik → redirect ke halaman produk Shopee.

## 7. Out of Scope (v1)

- Checkout langsung di Shopby (transaksi tetap di Shopee).
- Sistem autentikasi user/pembeli.
- Multi-admin / role management.
- Payment gateway.

## 8. Struktur Folder Project

```
shopby/
├── design/                     # Referensi desain (landing + admin panel)
│   ├── shopby-landing.md
│   ├── admin-login.md
│   ├── admin-dashboard.md
│   ├── admin-dashboard-empty.md
│   ├── admin-analytics.md
│   ├── admin-products.md
│   ├── admin-products-mobile.md
│   ├── admin-settings.md
│   ├── admin-settings-mobile.md
│   └── admin-edit-product.md
├── prisma/
│   ├── schema.prisma           # Data model (Product, Category, ClickLog)
│   ├── seed.ts                 # Data awal untuk testing
│   └── migrations/             # Riwayat migrasi database
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, font, metadata
│   │   ├── page.tsx            # Landing page utama
│   │   ├── globals.css         # Tailwind v4 + custom CSS
│   │   ├── providers.tsx       # QueryClientProvider
│   │   ├── admin/
│   │   │   ├── login/          # Admin login page
│   │   │   └── (dashboard)/    # Admin panel (sidebar + pages)
│   │   └── api/
│   │       ├── products/route.ts
│   │       ├── categories/route.ts
│   │       └── click/route.ts
│   ├── components/
│   │   ├── ui/                 # shadcn/ui + skeleton + empty state
│   │   ├── layout/             # Navbar, Footer
│   │   └── sections/           # Hero, ProductGrid, ProductCard, CategoryFilter
│   ├── hooks/                  # useProducts, useCategories (TanStack Query)
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── utils.ts            # cn(), formatPrice()
│   │   └── services/           # fetchProducts, fetchCategories, logClick
│   └── types/index.ts          # Product, Category, ClickLog
├── .env.example
├── PRD.md
├── SAR.md
└── README.md
```

## 9. Metrics of Success

- CTR: jumlah klik "Beli di Shopee" dibagi jumlah pengunjung.
- Jumlah produk aktif yang tayang.
- Waktu load halaman (target < 2 detik di mobile).
