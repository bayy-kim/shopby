# PRD - Shopby

## 1. Latar Belakang

Bayu sudah disetujui sebagai Shopee Affiliate dan butuh satu halaman pusat (landing page) untuk memajang produk-produk rekomendasi yang dipromosikan. Selama ini link affiliate biasanya cuma disebar manual di bio sosmed/konten, tanpa tampilan yang rapi dan tanpa data seberapa efektif link tersebut. Shopby dibuat untuk menjawab dua masalah itu sekaligus: tampilan produk yang menarik + pelacakan klik sederhana.

## 2. Tujuan Produk

- Menyediakan satu halaman terpusat untuk semua produk affiliate Shopee milik Bayu.
- Menaikkan CTR (click-through rate) dari pengunjung ke link Shopee.
- Memberi kesan profesional/branded, bukan sekadar link mentah di bio.
- Memudahkan update produk baru tanpa perlu sentuh kode (lewat admin panel di `/admin`).

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

## 7. User Flow

1. User buka Shopby (dari bio link / share konten).
2. Landing di hero, lihat highlight produk.
3. Geser chip kategori / tap kategori di sidebar → filter produk.
4. Ubah sorting (terbaru/termurah/termahal) sesuai kebutuhan.
5. Klik "Muat Lebih Banyak" untuk lihat produk lainnya.
6. Klik card produk → sistem catat klik → redirect ke halaman produk Shopee.

## 8. Out of Scope (v1)

- Checkout langsung di Shopby (transaksi tetap di Shopee).
- Sistem autentikasi user/pembeli.
- Multi-admin / role management.
- Payment gateway.

## 9. Struktur Folder Project

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
│   ├── dev.db                  # SQLite database (local dev)
│   └── migrations/             # Riwayat migrasi database
│       └── 20260719173140_init/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, font, metadata
│   │   ├── page.tsx            # Landing page utama
│   │   ├── globals.css         # Tailwind v4 + custom CSS (@layer components)
│   │   ├── providers.tsx       # TanStack Query provider
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # Login page (standalone receipt card)
│   │   │   └── (dashboard)/
│   │   │       ├── layout.tsx  # Admin sidebar + topnav layout
│   │   │       ├── page.tsx    # Dashboard (stats, chart, activity)
│   │   │       ├── products/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── analytics/page.tsx
│   │   │       └── settings/page.tsx
│   │   └── api/
│   │       ├── products/route.ts # GET: list produk (filter + sort)
│   │       ├── categories/route.ts # GET: semua kategori
│   │       └── click/route.ts    # POST: catat klik
│   ├── components/
│   │   ├── ui/                 # shadcn/ui (button, card, badge) + custom
│   │   │   ├── ProductCardSkeleton.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   ├── layout/             # Navbar, Footer
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/           # Hero, ProductGrid, ProductCard, CategoryFilter
│   │       ├── Hero.tsx
│   │       ├── ProductGrid.tsx
│   │       ├── ProductCard.tsx
│   │       └── CategoryFilter.tsx
│   ├── hooks/                  # TanStack Query hooks
│   │   ├── useProducts.ts
│   │   └── useCategories.ts
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── utils.ts            # cn(), formatPrice()
│   │   └── services/           # API service functions
│   │       ├── products.ts
│   │       ├── categories.ts
│   │       └── click.ts
│   └── types/
│       └── index.ts            # Product, Category, ClickLog
├── .env.example
├── PRD.md
├── SAR.md
└── README.md
```

## 10. Metrics of Success

- CTR: jumlah klik "Beli di Shopee" dibagi jumlah pengunjung.
- Jumlah produk aktif yang tayang.
- Waktu load halaman (target < 2 detik di mobile).
