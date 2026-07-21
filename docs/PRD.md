# PRD - Shopby

## 1. Latar Belakang

Bayu sudah disetujui sebagai Shopee Affiliate dan butuh satu halaman pusat (landing page) untuk memajang produk-produk rekomendasi yang dipromosikan. Selama ini link affiliate biasanya cuma disebar manual di bio sosmed/konten, tanpa tampilan yang rapi dan tanpa data seberapa efektif link tersebut. Shopby dibuat untuk menjawab dua masalah itu sekaligus: tampilan produk yang menarik + pelacakan klik sederhana.

## 2. Tujuan Produk

- Menyediakan satu halaman terpusat untuk semua produk affiliate Shopee milik Bayu.
- Menaikkan CTR (click-through rate) dari pengunjung ke link Shopee.
- Memberi kesan profesional/branded, bukan sekadar link mentah di bio.
- Memudahkan update produk baru tanpa perlu sentuh kode (lewat admin panel di `/admin-shopby`).

## 3. Target User

- Followers dari konten Bayu (YouTube "Bonbon and Chiko", sosial media pribadi, dsb).
- Pengunjung yang datang dari bio link / caption yang mencari rekomendasi produk.
- Bayu sendiri sebagai admin/pengelola konten produk.

## 4. Fitur Utama (MVP)

| Fitur | Deskripsi |
|---|---|
| Hero section | Headline singkat + CTA, floating card highlight produk unggulan |
| Fitur Stok Habis | Admin bisa tandai produk sebagai "Stok Habis", overlay + disabled button di landing page |
| Filter kategori (mobile chips) | Chip horizontal scroll di mobile, sidebar di desktop |
| Filter nomor produk | Filter range #1-100, #101-200, dst berdasarkan urutan produk upload |
| Sorting | Urut berdasarkan terbaru, termurah, termahal |
| Grid produk | Card berisi gambar, nomor produk (#1, #2...), nama, harga, badge diskon (opsional), tombol "Beli di Shopee", overlay "Stok Habis" jika sold out |
| Produk terlaris/rekomendasi | Section khusus highlight produk pilihan (isFeatured) |
| Klik tracking | Setiap klik "Beli di Shopee" dicatat (produk, waktu) untuk analitik sederhana |
| Progressif load | Tombol "Muat Lebih Banyak" untuk reveal produk bertahap |
| Footer | Social links + disclaimer affiliate |
| Halaman statis | About, Affiliate, Privacy Policy, Terms of Service, Contact (form + API) |
| Loading & error states | Global loading.tsx, custom 404 not-found.tsx |
| SEO | Auto-generated sitemap.xml + robots.txt |

## 5. Fitur Implementasi (Admin Panel)

| Fitur | Deskripsi |
|---|---|
| `/admin-shopby/login` | Login page dengan receipt card, brutalist styling, form auth |
| `/admin-shopby` | Dashboard — statistik real dari API, grafik performa, aktivitas terbaru |
| `/admin-shopby/products` | Tabel manajemen produk lengkap dengan filter, search, pagination, toggle Sold Out per baris, CRUD via API |
| `/admin-shopby/products/new` | Form tambah produk baru — URL image input, kategori, link afiliasi, harga, komisi, toggle Stok Habis |
| `/admin-shopby/products/[id]` | Edit produk — form nama, kategori, link afiliasi, harga, komisi, featured status, sold out status |
| `/admin-shopby/analytics` | Panel metrik — revenue, AOV, conversion rate, traffic sources, geografis |
| `/admin-shopby/settings` | Konfigurasi store profile, payout info, keamanan (password) |
| `/admin-shopby/help` | Pusat bantuan panduan & resources |
| Sidebar navigasi | Desktop fixed sidebar, mobile collapsible overlay |
| Brutalist/receipt theme | Konsisten dengan landing page — ink, vivid-orange, tag-yellow, dashed dividers |
| JWT session auth | HttpOnly cookie shopby_admin_session via jose, middleware guard edge runtime |
| Error boundary | error.tsx khusus admin dengan fallback UI + tombol retry |
| Loading state | loading.tsx global untuk semua admin pages |

## 6. Fitur Fase Berikutnya (Nice to Have)

- Search produk di landing page
- Statistik klik per produk (dashboard mini real-time)
- Halaman detail produk (`/produk/[slug]`)

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
├── docs/                       # Dokumentasi (PRD, SAR, GUIDE, README, project-reference)
├── prisma/
│   ├── schema.prisma           # Data model (Product, Category, ClickLog, AppSetting)
│   ├── seed.ts                 # Seed 4 kategori (0 produk — admin tambah via panel)
│   ├── dev.db                  # SQLite database (local dev)
│   └── migrations/
│       └── 20260719173140_init/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, font, metadata
│   │   ├── page.tsx            # Landing page (Hero + ProductGrid + CategoryFilter)
│   │   ├── globals.css         # Tailwind v4 + custom CSS (@layer components)
│   │   ├── providers.tsx       # TanStack Query provider
│   │   ├── loading.tsx         # Global loading state
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── robots.ts           # /robots.txt — disallow /admin-shopby/, /api/
│   │   ├── sitemap.ts          # /sitemap.xml — auto-generated
│   │   ├── admin-shopby/       # Admin panel (route diubah dari /admin untuk keamanan)
│   │   │   ├── login/
│   │   │   │   ├── layout.tsx  # Login page metadata
│   │   │   │   └── page.tsx    # Login form — POST /api/admin-shopby/login
│   │   │   ├── help/page.tsx   # Pusat bantuan
│   │   │   ├── loading.tsx     # Admin loading state
│   │   │   ├── error.tsx       # Admin error boundary
│   │   │   └── (dashboard)/
│   │   │       ├── layout.tsx  # Sidebar + topnav admin
│   │   │       ├── page.tsx    # Dashboard (stats real, revenue chart)
│   │   │       ├── products/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── new/page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── analytics/page.tsx
│   │   │       └── settings/page.tsx
│   │   ├── about/page.tsx
│   │   ├── affiliate/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── contact/
│   │   │   ├── layout.tsx      # Contact page metadata
│   │   │   └── page.tsx        # Contact form — POST /api/contact
│   │   └── api/
│   │       ├── admin-shopby/
│   │       │   ├── login/route.ts   # POST: auth → set cookie HttpOnly JWT
│   │       │   └── logout/route.ts  # POST: clear cookie
│   │       ├── products/route.ts    # GET (public) + POST (auth)
│   │       ├── products/[id]/route.ts # GET + PUT + DELETE (auth)
│   │       ├── categories/route.ts  # GET: semua kategori
│   │       ├── click/route.ts       # POST: catat klik → redirect Shopee
│   │       ├── stats/route.ts       # GET: dashboard stats (auth)
│   │       ├── analytics/route.ts   # GET: analytics data (auth)
│   │       ├── settings/route.ts    # GET + PUT: AppSetting via Prisma (auth)
│   │       └── contact/route.ts     # POST: kirim pesan kontak
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ProductCardSkeleton.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── ProductGrid.tsx
│   │       ├── ProductCard.tsx
│   │       └── CategoryFilter.tsx
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   └── useCategories.ts
│   ├── lib/
│   │   ├── auth.ts             # JWT session: createSessionToken, verifySessionToken, checkAuth
│   │   ├── auth-password.ts    # scrypt hash/verify untuk admin password
│   │   ├── csrf.ts             # CSRF token validation guard
│   │   ├── validate-settings.ts # Settings input validation whitelist
│   │   ├── rate-limit.ts       # In-memory rate limiter with staggered cleanup
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── utils.ts            # cn(), formatPrice()
│   │   └── services/
│   │       ├── products.ts     # fetchProducts, createProduct, updateProduct, deleteProduct, fetchProductById
│   │       ├── categories.ts   # fetchCategories
│   │       └── click.ts        # createClick
│   └── types/
│       └── index.ts            # Product, Category, ClickLog
├── middleware.ts                # Edge auth guard: /admin → redirect /, /admin-shopby/* + API stats/analytics/settings
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json              # shadcn/ui config
├── .env.example
├── tsconfig.json
└── package.json
```

## 10. Metrics of Success

- CTR: jumlah klik "Beli di Shopee" dibagi jumlah pengunjung.
- Jumlah produk aktif yang tayang.
- Waktu load halaman (target < 2 detik di mobile).
