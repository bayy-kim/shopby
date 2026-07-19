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

## 5. Fitur Fase Berikutnya (Nice to Have)

- Search produk
- Admin panel sederhana untuk CRUD produk (tanpa perlu edit kode)
- Statistik klik per produk (dashboard mini)
- Halaman detail produk (`/produk/[slug]`)

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
├── design/
│   └── shopby-landing.md       # Referensi desain (export Stitch)
├── .env.example
├── PRD.md
├── SAR.md
└── README.md
```

## 9. Metrics of Success

- CTR: jumlah klik "Beli di Shopee" dibagi jumlah pengunjung.
- Jumlah produk aktif yang tayang.
- Waktu load halaman (target < 2 detik di mobile).
