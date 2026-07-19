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
| Hero section | Headline singkat + CTA, highlight produk unggulan |
| Filter kategori | Filter produk berdasarkan kategori (chip scroll di mobile, sidebar di desktop) |
| Grid produk | Card berisi gambar, nama, harga, badge diskon (opsional), tombol "Beli di Shopee" |
| Produk terlaris/rekomendasi | Section khusus highlight produk pilihan |
| Klik tracking | Setiap klik "Beli di Shopee" dicatat (produk, waktu) untuk analitik sederhana |
| Footer | Social links + disclaimer affiliate |

## 5. Fitur Fase Berikutnya (Nice to Have)

- Search produk
- Admin panel sederhana untuk CRUD produk (tanpa perlu edit kode)
- Sorting (harga terendah/tertinggi, terbaru)
- Statistik klik per produk (dashboard mini)

## 6. User Flow

1. User buka Shopby (dari bio link / share konten).
2. Landing di hero, lihat highlight produk.
3. Scroll / filter kategori sesuai minat.
4. Klik card produk → sistem catat klik → redirect ke halaman produk Shopee.

## 7. Out of Scope (v1)

- Checkout langsung di Shopby (transaksi tetap di Shopee).
- Sistem autentikasi user/pembeli.
- Multi-admin / role management.
- Payment gateway.

## 8. Struktur Folder Project

```
shopby/
├── app/                        # Routing & pages (Next.js App Router)
│   ├── layout.tsx
│   ├── page.tsx                # Landing page utama
│   ├── globals.css
│   ├── produk/[slug]/page.tsx  # Detail produk (opsional, fase 2)
│   └── api/
│       └── click/route.ts      # Endpoint log klik ke Shopee
├── components/
│   ├── ui/                     # Komponen dasar shadcn/ui
│   └── sections/                # Hero, ProductGrid, CategoryFilter, Footer, dll
├── lib/
│   ├── prisma.ts               # Prisma client instance
│   └── utils.ts
├── prisma/
│   ├── schema.prisma           # Data model (Product, Category, ClickLog)
│   └── seed.ts                 # Data awal untuk testing
├── types/
│   └── index.ts                # Tipe TypeScript bersama
├── public/
│   └── images/                 # Aset gambar statis
├── .env.example
├── PRD.md
├── SAR.md
└── README.md
```

## 9. Metrics of Success

- CTR: jumlah klik "Beli di Shopee" dibagi jumlah pengunjung.
- Jumlah produk aktif yang tayang.
- Waktu load halaman (target < 2 detik di mobile).
