# PRD - Shopby

## 1. Latar Belakang

Bayu sudah disetujui sebagai Shopee Affiliate dan butuh satu halaman pusat (landing page) untuk memajang produk-produk rekomendasi yang dipromosikan. Selama ini link affiliate biasanya cuma disebar manual di bio sosmed/konten, tanpa tampilan yang rapi dan tanpa data seberapa efektif link tersebut. Shopby dibuat untuk menjawab dua masalah itu sekaligus: tampilan produk yang menarik + pelacakan klik sederhana.

## 2. Tujuan Produk

- Menyediakan satu halaman terpusat untuk semua produk affiliate Shopee milik Bayu.
- Menaikkan CTR (click-through rate) dari pengunjung ke link Shopee.
- Memberi kesan profesional/branded, bukan sekadar link mentah di bio.
- Memudahkan update produk baru tanpa perlu sentuh kode (lewat admin panel).

## 3. Target User

- Followers dari konten Bayu (YouTube "Bonbon and Chiko", sosial media, dsb).
- Pengunjung dari bio link / caption yang mencari rekomendasi produk.
- Bayu sendiri sebagai admin/pengelola konten produk.

## 4. Fitur Landing Page

| Fitur | Deskripsi |
|---|---|
| Hero section | Headline + floating card produk (top-rated + termurah) |
| Search multi-field | Cari produk berdasarkan nama, kategori, deskripsi gambar |
| Filter kategori | Chip horizontal scroll (mobile), sidebar (desktop) |
| Filter nomor produk | Range #1-100, #101-200, dst |
| Sorting | Terbaru, termurah, termahal |
| Rekomendasi Hari Ini | Top 6 produk rating tertinggi + harga termurah |
| Grid produk | Card: gambar, nomor, nama, rating bintang, harga, tombol beli |
| Klik tracking | Setiap klik dicatat ke database |
| Load more | Tombol progressive load tanpa reload |
| Stok habis | Overlay + disabled button jika produk habis |
| Branding dinamis | Nama toko, tagline, logo dari admin settings |

## 5. Fitur Admin Panel

| Fitur | Deskripsi |
|---|---|
| Login JWT | HttpOnly cookie, middleware guard edge runtime |
| Dashboard | Statistik real, grafik revenue, top products |
| Product CRUD | Tambah/edit/hapus produk, toggle featured + sold out |
| Image preview hover | Hover thumbnail admin → popup gambar besar |
| Category management | Tambah/edit/hapus kategori, validasi relasi produk |
| Click logs viewer | Riwayat klik per produk, filter tanggal, pagination |
| Analytics | Metrik revenue, AOV, conversion rate, traffic sources |
| Settings | Storefront (nama, logo, warna), payout, security |
| Live preview | Preview landing page dalam iframe (desktop/mobile toggle) |
| Brutalist theme | Receipt card style, ink/vivid-orange/tag-yellow palette |

## 6. Fitur Fase Berikutnya

- Detail produk page (`/produk/[slug]`)
- Bulk import produk dari CSV
- Export click logs ke CSV

## 7. User Flow

1. User buka Shopby (dari bio link / share konten).
2. Hero menampilkan 2 produk top-rated + termurah.
3. Search / filter kategori / sorting untuk temukan produk.
4. Klik card → catat klik → redirect ke Shopee.

## 8. Struktur Folder

```
shopby/
├── docs/                        # Dokumentasi
│   ├── README.md
│   ├── PRD.md
│   ├── SAR.md
│   ├── GUIDE.md
│   ├── project-reference.md
│   └── design/                  # Referensi desain
├── data/                        # Data imports
├── prisma/                      # Schema + migrations
├── public/                      # Static assets
├── scripts/                     # Dev scripts
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css          # Tailwind v4 + custom CSS
│   │   ├── admin-shopby/        # Admin panel
│   │   │   ├── login/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── products/
│   │   │   │   ├── categories/
│   │   │   │   ├── click-logs/
│   │   │   │   ├── analytics/
│   │   │   │   └── settings/
│   │   │   └── help/
│   │   ├── about/, affiliate/, privacy/, terms/, contact/
│   │   └── api/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── sections/
│   ├── hooks/
│   ├── lib/
│   │   └── services/
│   └── types/
├── middleware.ts
└── config files
```

## 9. Metrics of Success

- CTR: jumlah klik / jumlah pengunjung
- Jumlah produk aktif yang tayang
- Waktu load halaman < 2 detik di mobile
