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

### Admin Panel
- 🔐 `/admin/login` — Login page receipt card brutalist style
- 📈 `/admin` — Dashboard with stats, sales chart, recent activity
- 📦 `/admin/products` — Product management table with CRUD
- ✏️ `/admin/products/[id]` — Edit product form
- 📊 `/admin/analytics` — Metrics, traffic sources, geographic data
- ⚙️ `/admin/settings` — Store profile, payout, security toggles

## Tech Stack

| Stack | Keterangan |
|---|---|
| **Framework** | Next.js 16 (App Router) + TypeScript |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Database** | Prisma ORM + SQLite (dev) → Postgres (prod) |
| **State** | TanStack Query (React Query) |
| **Animasi** | Framer Motion |
| **Ikon** | lucide-react |

## Struktur Folder

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
│   ├── schema.prisma
│   ├── seed.ts
│   ├── dev.db
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── globals.css         # Tailwind v4 + custom CSS
│   │   ├── providers.tsx       # TanStack Query
│   │   ├── admin/              # Admin panel (6 routes)
│   │   │   ├── login/
│   │   │   └── (dashboard)/
│   │   └── api/                # REST API (products, categories, click)
│   ├── components/             # UI, layout, sections
│   ├── hooks/                  # TanStack Query hooks
│   ├── lib/                    # Prisma client, utils, API services
│   └── types/                  # TypeScript definitions
└── *.md                        # Dokumentasi
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

## Scripts

| Command | Fungsi |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Build production |
| `npm start` | Jalankan hasil build |
| `npx prisma studio` | GUI database |
| `npx prisma db seed` | Isi ulang data awal |

## API Endpoints

| Endpoint | Method | Fungsi |
||---|---|---|
| `/api/products?category=&sort=` | GET | Ambil produk |
| `/api/categories` | GET | Ambil kategori |
| `/api/click` | POST | Catat klik + return URL Shopee |

## Admin Routes

| Route | Deskripsi |
|---|---|
| `/admin/login` | Login page (standalone, no sidebar) |
| `/admin` | Dashboard |
| `/admin/products` | Product table |
| `/admin/products/[id]` | Edit product |
| `/admin/analytics` | Analytics panel |
| `/admin/settings` | Settings page |

## Deploy ke Vercel

1. Push ke GitHub.
2. Import project di [vercel.com](https://vercel.com).
3. Set `DATABASE_URL` ke Postgres (Neon).
4. Deploy otomatis tiap push ke `main`.

---

Dibuat dengan ❤️ untuk Bayu — Shopee Affiliate Partner.
