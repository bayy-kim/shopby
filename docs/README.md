# Shopby — Belanja Cerdas, Struk Berkualitas

Landing page pribadi untuk memajang produk-produk Shopee Affiliate + admin panel brutalist untuk manajemen produk dan analitik.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8) ![Prisma](https://img.shields.io/badge/Prisma-5-2d3748)

## Fitur

### Landing Page
- 🎯 **Hero section** — Headline + floating card produk unggulan
- 🏷️ **Filter kategori** — Chip horizontal scroll (mobile) / sidebar (desktop)
- #️⃣ **Filter nomor produk** — Range #1-100, #101-200, dst
- 🔄 **Sorting** — Terbaru, termurah, termahal
- 🖼️ **Grid produk** — Card dengan gambar, nomor produk, nama, harga, tombol "Beli di Shopee"
- ⭐ **Rekomendasi** — Section khusus produk pilihan (isFeatured)
- 📊 **Klik tracking** — Setiap klik dicatat via API untuk analitik
- ⚡ **Progressif load** — Tombol "Muat Lebih Banyak" tanpa reload
- 🚫 **Stok Habis** — Admin bisa tandai produk sold out, overlay + disabled button

### Admin Panel (Auth Guard)
- 🔐 `/admin-shopby/login` — Login page receipt card brutalist style (POST ke API login)
- 🛡️ **Middleware auth** — Semua route `/admin-shopby/*` diproteksi, redirect ke login jika session invalid
- 🔑 **Single admin** — Credential dari `.env` (`ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH`), tanpa database/users table
- 🍪 **Session JWT** — HttpOnly cookie `shopby_admin_session`, expiry 24 jam
- 📈 `/admin-shopby` — Dashboard with stats, sales chart, recent activity
- 📦 `/admin-shopby/products` — Product management table with CRUD + Sold Out toggle
- ✏️ `/admin-shopby/products/new` — Add product (URL image input)
- ✏️ `/admin-shopby/products/[id]` — Edit product form (with Sold Out toggle)
- 📊 `/admin-shopby/analytics` — Metrics, traffic sources, geographic data
- ⚙️ `/admin-shopby/settings` — Store profile, payout, security toggles
- 🚪 **Logout** — Hapus session cookie, redirect ke login

## Tech Stack

| Stack | Keterangan |
|---|---|---|
| **Framework** | Next.js 16 (App Router) + TypeScript |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Database** | Prisma ORM + PostgreSQL (Neon prod) |
| **Auth** | JWT (jose) + scrypt password hash |
| **State** | TanStack Query (React Query) |
| **Ikon** | lucide-react |

## Struktur Folder

```
shopby/
├── middleware.ts                # Edge auth guard — /admin → redirect /, /admin-shopby/*, API stats/analytics/settings
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json              # shadcn/ui config
├── design/                      # Referensi desain (landing + admin panel)
├── docs/                        # Dokumentasi
├── prisma/
│   ├── schema.prisma            # Product, Category, ClickLog, AppSetting
│   ├── seed.ts                  # 4 kategori (0 produk)
│   ├── dev.db
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx             # Landing page (Hero + ProductGrid)
│   │   ├── globals.css          # Tailwind v4 + custom CSS (@layer components)
│   │   ├── providers.tsx        # TanStack Query Provider
│   │   ├── loading.tsx          # Global loading state
│   │   ├── not-found.tsx        # Custom 404
│   │   ├── robots.ts            # /robots.txt
│   │   ├── sitemap.ts           # /sitemap.xml
│   │   ├── admin-shopby/        # Admin panel (route diubah untuk keamanan)
│   │   │   ├── login/ (layout.tsx, page.tsx)
│   │   │   ├── help/page.tsx
│   │   │   ├── loading.tsx, error.tsx
│   │   │   └── (dashboard)/ (layout, page, products/, analytics/, settings/)
│   │   ├── about/, affiliate/, privacy/, terms/
│   │   ├── contact/ (layout.tsx + page.tsx)
│   │   └── api/
│   │       ├── admin-shopby/ (login, logout)
│   │       ├── products/ + [id]/
│   │       ├── categories/, click/, stats/, analytics/, settings/, contact/
│   ├── components/
│   │   ├── ui/ (ProductCardSkeleton, EmptyState)
│   │   ├── layout/ (Navbar, Footer)
│   │   └── sections/ (Hero, ProductGrid, ProductCard, CategoryFilter)
│   ├── hooks/ (useProducts, useCategories)
│   ├── lib/
│   │   ├── auth.ts, auth-password.ts, prisma.ts, utils.ts
│   │   └── services/ (products, categories, click)
│   └── types/ (Product, Category, ClickLog)
```

## Cara Menjalankan

```bash
# 1. Clone & install
git clone <repo-url>
cd shopby
npm install

# 2. Setup environment
cp .env.example .env

# 3. Migrasi database + seed data
npx prisma migrate dev
npx prisma db seed

# 4. Jalankan dev server
npm run dev
```

Buka `http://localhost:3000` di browser.

## Environment Variables

| Variable | Deskripsi | Contoh |
|---|---|---|
| `DATABASE_URL` | Koneksi database | `file:./dev.db` (SQLite) / `postgresql://...` |
| `ADMIN_EMAIL` | Email admin login | `admin@shopby.com` |
| `ADMIN_PASSWORD_HASH` | Hash password (scrypt) | `salt:derivedKey` (base64) |
| `SESSION_SECRET` | Secret JWT (min 32 chars) | `d304e6bf...` |

## Scripts

| Command | Fungsi |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Build production |
| `npm start` | Jalankan hasil build |
| `npx prisma studio` | GUI database |
| `npx prisma db seed` | Isi ulang data awal |

## API Endpoints

| Endpoint | Method | Auth | Fungsi |
|---|---|---|---|
| `/api/admin-shopby/login` | POST | — | Login admin (return session cookie) |
| `/api/admin-shopby/logout` | POST | — | Hapus session cookie |
| `/api/products` | GET | — | Ambil produk (`?category=&sort=`) |
| `/api/products` | POST | ✅ | Tambah produk baru |
| `/api/products/[id]` | GET | — | Detail produk |
| `/api/products/[id]` | PUT | ✅ | Update produk |
| `/api/products/[id]` | DELETE | ✅ | Hapus produk |
| `/api/categories` | GET | — | Ambil kategori |
| `/api/click` | POST | — | Catat klik + return URL Shopee |
| `/api/stats` | GET | ✅ | Statistik dashboard |
| `/api/analytics` | GET | ✅ | Data analitik |
| `/api/settings` | GET/PUT | ✅ | Pengaturan toko (via Prisma) |
| `/api/contact` | POST | — | Kirim pesan kontak |

## Admin Routes

| Route | Deskripsi |
|---|---|
| `/admin-shopby/login` | Login page (standalone, no sidebar) |
| `/admin-shopby` | Dashboard — statistik real + grafik revenue |
| `/admin-shopby/products` | Product table — filter, search, pagination |
| `/admin-shopby/products/new` | Tambah produk baru (image upload + form) |
| `/admin-shopby/products/[id]` | Edit product |
| `/admin-shopby/analytics` | Analytics panel — metrik, chart, top products |
| `/admin-shopby/settings` | Settings — storefront, payout, security |
| `/admin-shopby/help` | Pusat bantuan |

## Deploy ke Vercel

1. Push ke GitHub.
2. Import project di [vercel.com](https://vercel.com).
3. Set environment variables di Vercel: `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`.
4. Deploy otomatis tiap push ke `main`.

---

Dibuat untuk Bayu — Shopee Affiliate Partner.
