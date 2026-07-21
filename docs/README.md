# Shopby — Belanja Cerdas, Struk Berkualitas

Landing page pribadi untuk memajang produk-produk Shopee Affiliate + admin panel brutalist untuk manajemen produk, kategori, dan analitik.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8) ![Prisma](https://img.shields.io/badge/Prisma-5-2d3748)

## Fitur

### Landing Page
- 🎯 **Hero section** — Headline + floating card produk (top-rated + termurah)
- 🔍 **Search** — Multi-field search (nama produk, kategori, deskripsi gambar) dengan debounce
- 🏷️ **Filter kategori** — Chip horizontal scroll (mobile) / sidebar (desktop)
- #️⃣ **Filter nomor produk** — Range #1-100, #101-200, dst
- 🔄 **Sorting** — Terbaru, termurah, termahal, rating
- 🖼️ **Grid produk** — Card dengan gambar, nomor produk, nama (truncate + toggle "Lebih banyak"/"sedikit"), rating bintang desimal (4.5/5, 4.9/5), harga, tombol "Beli di Shopee"
- ⭐ **Rekomendasi Hari Ini** — Top-rated products, diurut rating tertinggi + harga termurah, menampilkan rating desimal
- 📊 **Klik tracking** — Setiap klik dicatat via API untuk analitik
- ⚡ **Progressif load** — Tombol "Muat Lebih Banyak" tanpa reload
- 🚫 **Stok Habis** — Admin bisa tandai produk sold out, overlay + disabled button
- 🏪 **Store settings** — Nama toko, tagline, logo dari admin settings

### Admin Panel (Auth Guard)
- 🔐 `/admin-shopby/login` — Login page receipt card brutalist style
- 🛡️ **Middleware auth** — Semua route admin diproteksi, redirect ke login jika invalid
- 🛡️ **CSRF protection** — Per-session random token (double-submit cookie pattern)
- 🛡️ **Input validation** — Settings API validasi whitelist keys
- 🔑 **Single admin** — Credential dari `.env` + JWT session cookie HttpOnly
- 📈 `/admin-shopby` — Dashboard dengan statistik real, grafik revenue, top products
- 📦 `/admin-shopby/products` — Manajemen produk (CRUD, filter, search, pagination, toggle Sold Out)
- 🖼️ **Image preview** — Hover thumbnail untuk lihat gambar besar
- 🏷️ `/admin-shopby/categories` — Manajemen kategori (tambah, edit, hapus, validasi relasi)
- 🖱️ `/admin-shopby/click-logs` — Riwayat klik dengan filter tanggal, pagination
- 📊 `/admin-shopby/analytics` — Metrik, traffic sources, geographic data
- ⚙️ `/admin-shopby/settings` — Storefront, payout, security, **live preview** (desktop/mobile toggle)
- 🚪 **Logout** — Hapus session cookie, redirect ke login

## Tech Stack

| Stack | Keterangan |
|---|---|
| **Framework** | Next.js 16 (App Router) + TypeScript |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Database** | Prisma ORM + PostgreSQL (Neon) |
| **Auth** | JWT (jose) + scrypt password hash |
| **State** | TanStack Query (React Query) |
| **Ikon** | lucide-react |
| **Animation** | Framer Motion |

## Struktur Folder

```
shopby/
├── docs/                        # Dokumentasi
│   ├── README.md                # → ini
│   ├── PRD.md                   # Product Requirements
│   ├── SAR.md                   # Security Assessment
│   ├── GUIDE.md                 # Panduan penggunaan
│   ├── project-reference.md     # Referensi proyek
│   └── design/                  # Referensi desain (landing + admin)
├── data/                        # Data imports (CSV, seed)
├── prisma/
│   ├── schema.prisma            # Product, Category, ClickLog, AppSetting
│   └── migrations/
├── public/                      # Static assets
├── scripts/                     # Dev scripts
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css          # Tailwind v4 + custom CSS
│   │   ├── providers.tsx        # TanStack Query Provider
│   │   ├── loading.tsx          # Global loading state
│   │   ├── not-found.tsx        # Custom 404
│   │   ├── robots.ts            # /robots.txt
│   │   ├── sitemap.ts           # /sitemap.xml
│   │   ├── admin-shopby/        # Admin panel
│   │   │   ├── login/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── products/
│   │   │   │   ├── categories/
│   │   │   │   ├── click-logs/
│   │   │   │   ├── analytics/
│   │   │   │   └── settings/
│   │   │   ├── help/
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   ├── about/, affiliate/, privacy/, terms/, contact/
│   │   └── api/
│   │       ├── admin-shopby/ (login, logout)
│   │       ├── products/ + [id]/
│   │       ├── categories/
│   │       ├── click-logs/
│   │       ├── click/
│   │       ├── stats/, analytics/, settings/, contact/
│   ├── components/
│   │   ├── ui/ (ProductCardSkeleton, EmptyState)
│   │   ├── layout/ (Navbar, Footer)
│   │   └── sections/ (Hero, ProductGrid, ProductCard, CategoryFilter)
│   ├── hooks/
│   ├── lib/
│   │   ├── auth.ts, auth-password.ts, csrf.ts, validate-settings.ts, rate-limit.ts, prisma.ts, utils.ts
│   │   └── services/
│   └── types/
├── middleware.ts                 # Edge auth guard
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

## Cara Menjalankan

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Environment Variables

| Variable | Deskripsi | Contoh |
|---|---|---|
| `DATABASE_URL` | Koneksi database | `postgresql://...` |
| `ADMIN_EMAIL` | Email admin login | `admin@shopby.com` |
| `ADMIN_PASSWORD_HASH` | Hash password (scrypt) | `salt:derivedKey` |
| `SESSION_SECRET` | Secret JWT (min 32 chars) | `d304e6bf...` |

## API Endpoints

| Endpoint | Method | Auth | Fungsi |
|---|---|---|---|
| `/api/admin-shopby/login` | POST | — | Login admin |
| `/api/admin-shopby/logout` | POST | — | Logout |
| `/api/products` | GET | — | Ambil produk (`?category=&sort=&q=&numberFrom=&numberTo=`) — sort: `newest`, `price_asc`, `price_desc`, `rating_desc` |
| `/api/products` | POST | ✅ | Tambah produk |
| `/api/products/[id]` | GET/PUT/DELETE | ✅ | Detail/update/hapus produk |
| `/api/categories` | GET/POST/PUT/DELETE | ✅ | CRUD kategori |
| `/api/click-logs` | GET | ✅ | Riwayat klik (`?page=&dateFrom=&dateTo=`) |
| `/api/click` | POST | — | Catat klik |
| `/api/stats` | GET | ✅ | Statistik dashboard |
| `/api/analytics` | GET | ✅ | Data analitik |
| `/api/settings` | GET/PUT | ✅ | Pengaturan toko (+ CSRF) |
| `/api/settings/password` | PUT | ✅ | Ganti password |
| `/api/contact` | POST | — | Kirim pesan kontak |

## Deploy ke Vercel

1. Push ke GitHub.
2. Import project di [vercel.com](https://vercel.com).
3. Set environment variables: `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`.
4. Deploy otomatis tiap push ke `main`.

---

Dibuat untuk Bayu — Shopee Affiliate Partner.
