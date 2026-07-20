# Shopby — Belanja Cerdas, Struk Berkualitas

Landing page pribadi untuk memajang produk-produk Shopee Affiliate + admin panel brutalist untuk manajemen produk dan analitik.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8) ![Prisma](https://img.shields.io/badge/Prisma-5-2d3748)

## Fitur

### Landing Page
- 🎯 **Hero section** — Headline + floating card produk unggulan
- 🏷️ **Filter kategori** — Chip horizontal scroll (mobile) / sidebar (desktop)
- 🔄 **Sorting** — Terbaru, termurah, termahal
- 🖼️ **Grid produk** — Card dengan gambar, nama, harga, tombol "Beli di Shopee"
- ⭐ **Rekomendasi** — Section khusus produk pilihan (isFeatured)
- 📊 **Klik tracking** — Setiap klik dicatat via API untuk analitik
- ⚡ **Progressif load** — Tombol "Muat Lebih Banyak" tanpa reload
- 🎨 **Animasi** — Scroll reveal + scan-line effect (Framer Motion)

### Admin Panel (Auth Guard)
- 🔐 `/admin/login` — Login page receipt card brutalist style (POST ke API login)
- 🛡️ **Middleware auth** — Semua route `/admin/*` diproteksi, redirect ke login jika session invalid
- 🔑 **Single admin** — Credential dari `.env` (`ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH`), tanpa database/users table
- 🍪 **Session JWT** — HttpOnly cookie `shopby_admin_session`, expiry 24 jam
- 📈 `/admin` — Dashboard with stats, sales chart, recent activity
- 📦 `/admin/products` — Product management table with CRUD
- ✏️ `/admin/products/[id]` — Edit product form
- 📊 `/admin/analytics` — Metrics, traffic sources, geographic data
- ⚙️ `/admin/settings` — Store profile, payout, security toggles
- 🚪 **Logout** — Hapus session cookie, redirect ke login

## Tech Stack

| Stack | Keterangan |
|---|---|
| **Framework** | Next.js 16 (App Router) + TypeScript |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Database** | Prisma ORM + SQLite (dev) → Postgres (prod) |
| **Auth** | JWT (jose) + scrypt password hash |
| **State** | TanStack Query (React Query) |
| **Animasi** | Framer Motion |
| **Ikon** | lucide-react |

## Struktur Folder

```
shopby/
├── middleware.ts                # Edge auth guard untuk /admin/* + API admin
├── design/                      # Referensi desain (landing + admin panel)
├── docs/                        # Dokumentasi
├── prisma/
│   ├── schema.prisma            # Product, Category, ClickLog, AppSetting
│   ├── seed.ts
│   ├── dev.db
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css          # Tailwind v4 + custom CSS
│   │   ├── providers.tsx        # TanStack Query
│   │   ├── sitemap.ts           # Auto-generated sitemap
│   │   ├── admin/               # Admin panel
│   │   │   ├── login/
│   │   │   ├── (dashboard)/
│   │   │   ├── error.tsx        # Error boundary
│   │   │   ├── loading.tsx      # Loading fallback
│   │   │   └── help/
│   │   ├── about/               # /about
│   │   ├── affiliate/           # /affiliate
│   │   ├── privacy/             # /privacy
│   │   ├── terms/               # /terms
│   │   ├── contact/             # /contact (client form + layout)
│   │   └── api/                 # REST API
│   │       ├── admin/ (login, logout)
│   │       ├── products/ (GET, POST) + [id]/ (GET, PUT, DELETE)
│   │       ├── categories/
│   │       ├── click/
│   │       ├── stats/
│   │       ├── analytics/
│   │       ├── settings/        # via Prisma (AppSetting model)
│   │       └── contact/
│   ├── components/              # UI, layout, sections
│   ├── hooks/                   # TanStack Query hooks
│   ├── lib/
│   │   ├── auth.ts              # JWT session + checkAuth (edge-compatible)
│   │   ├── auth-password.ts     # Password hash/verify (crypto built-in)
│   │   ├── prisma.ts
│   │   ├── utils.ts             # cn(), formatPrice()
│   │   └── services/            # products, categories, click
│   └── types/
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
| `/api/admin/login` | POST | — | Login admin (return session cookie) |
| `/api/admin/logout` | POST | — | Hapus session cookie |
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
| `/admin/login` | Login page (standalone, no sidebar) |
| `/admin` | Dashboard — statistik real + grafik revenue |
| `/admin/products` | Product table — filter, search, pagination |
| `/admin/products/new` | Tambah produk baru (image upload + form) |
| `/admin/products/[id]` | Edit product |
| `/admin/analytics` | Analytics panel — metrik, chart, top products |
| `/admin/settings` | Settings — storefront, payout, security |
| `/admin/help` | Pusat bantuan |

## Deploy ke Vercel

1. Push ke GitHub.
2. Import project di [vercel.com](https://vercel.com).
3. Set environment variables di Vercel: `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`.
4. Deploy otomatis tiap push ke `main`.

---

Dibuat dengan ❤️ untuk Bayu — Shopee Affiliate Partner.
