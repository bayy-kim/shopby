# SAR (System Architecture & Requirements) - Shopby

## 1. Tech Stack

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | SSR/SSG buat SEO, familiar dengan stack project lain |
| Styling | Tailwind CSS v4 + shadcn/ui | Cepat, konsisten, komponen siap pakai |
| Animasi | Framer Motion | Hover card, scroll reveal, transisi halus |
| Database | Prisma ORM + SQLite (dev) → Postgres/Neon (prod) | Migrasi gampang, tipe aman |
| State Management | TanStack Query (React Query) | Caching, loading/error state otomatis |
| Ikon | lucide-react | Ringan, tree-shakeable, inline SVG |
| Gambar | next/image | Optimasi otomatis, lazy load |
| Hosting | Vercel | Deploy langsung dari GitHub, cocok buat Next.js |

## 2. Struktur Folder & Penjelasan

```
shopby/
├── design/                         # Referensi desain (landing + admin panel)
├── docs/                           # Dokumentasi (PRD, SAR, GUIDE, README, project-reference)
├── middleware.ts                   # Edge auth guard: /admin → redirect /, /admin-shopby/*, /api/stats/*, /api/analytics/*, /api/settings/*
├── prisma/
│   ├── schema.prisma               # Product, Category, ClickLog, AppSetting
│   ├── seed.ts                     # 4 kategori (0 produk)
│   ├── dev.db
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, metadata, font
│   │   ├── page.tsx                # Landing page (Hero + ProductGrid)
│   │   ├── globals.css             # Tailwind v4 + @layer components
│   │   ├── providers.tsx           # TanStack Query provider
│   │   ├── loading.tsx             # Global loading state
│   │   ├── not-found.tsx           # Custom 404
│   │   ├── robots.ts               # /robots.txt
│   │   ├── sitemap.ts              # /sitemap.xml
│   │   ├── admin-shopby/
│   │   │   ├── login/
│   │   │   │   ├── layout.tsx      # Login metadata
│   │   │   │   └── page.tsx        # Login form
│   │   │   ├── help/page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   └── (dashboard)/
│   │   │       ├── layout.tsx      # Sidebar + topnav
│   │   │       ├── page.tsx        # Dashboard (stats real, revenue chart)
│   │   │       ├── products/
│   │   │       │   ├── page.tsx    # CRUD product table
│   │   │       │   ├── new/page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── analytics/page.tsx
│   │   │       └── settings/page.tsx
│   │   ├── about/page.tsx
│   │   ├── affiliate/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── contact/
│   │   │   ├── layout.tsx          # Metadata wrapper
│   │   │   └── page.tsx            # Client component form
│   │   └── api/
│   │       ├── admin-shopby/
│   │       │   ├── login/route.ts
│   │       │   └── logout/route.ts
│   │       ├── products/route.ts   # GET (public) + POST (auth)
│   │       ├── products/[id]/route.ts # GET + PUT + DELETE (auth)
│   │       ├── categories/route.ts
│   │       ├── click/route.ts
│   │       ├── stats/route.ts
│   │       ├── analytics/route.ts
│   │       ├── settings/route.ts   # via Prisma AppSetting
│   │       └── contact/route.ts
│   ├── components/
│   │   ├── ui/ (button, card, badge, ProductCardSkeleton, EmptyState)
│   │   ├── layout/ (Navbar, Footer)
│   │   └── sections/ (Hero, ProductGrid, ProductCard, CategoryFilter)
│   ├── hooks/ (useProducts, useCategories)
│   ├── lib/
│   │   ├── auth.ts                 # JWT session + checkAuth (shared)
│   │   ├── auth-password.ts        # scrypt hash/verify
│   │   ├── prisma.ts
│   │   ├── utils.ts                # cn(), formatPrice()
│   │   └── services/ (products, categories, click)
│   └── types/
```

## 3. Data Model (Prisma)

```prisma
model Product {
  id          String    @id @default(cuid())
  name        String
  price       Int
  discountPct Int?
  imageUrl    String
  imageAlt    String
  shopeeUrl   String
  categoryId  String
  category    Category  @relation(fields: [categoryId], references: [id])
  isFeatured  Boolean   @default(false)
  isSoldOut   Boolean   @default(false)
  createdAt   DateTime  @default(now())
  clicks      ClickLog[]
}

model Category {
  id       String    @id @default(cuid())
  name     String
  slug     String    @unique
  products Product[]
}

model ClickLog {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  clickedAt DateTime @default(now())
}

model AppSetting {
  id    String @id @default(cuid())
  key   String @unique
  value String
}
```

## 4. Admin Panel Routes

| Route | Deskripsi |
|---|---|
| `/admin-shopby/login` | Login page (receipt card, brutalist style) |
| `/admin-shopby` | Dashboard — stats, sales chart, recent activity |
| `/admin-shopby/products` | Product management table with CRUD actions |
| `/admin-shopby/products/new` | Tambah produk baru (URL image input + sold out toggle) |
| `/admin-shopby/products/[id]` | Edit single product form |
| `/admin-shopby/analytics` | Metrics, click/conversion chart, traffic sources, geography |
| `/admin-shopby/settings` | Store profile, payout info, security toggles |
| `/admin-shopby/help` | Admin help center — guides & resources |

Admin layout includes: fixed sidebar (desktop) + collapsible mobile nav, top search bar, notification bell, profile avatar. All admin pages use the brutalist/receipt design language consistent with the landing page.

## 5. API Contract (Internal)

| Endpoint | Method | Auth | Query/Body | Fungsi |
|---|---|---|---|---|
| `/api/admin-shopby/login` | POST | — | Body: `{ email, password }` | Login admin → Set-Cookie HttpOnly JWT |
| `/api/admin-shopby/logout` | POST | — | — | Hapus session cookie |
| `/api/products` | GET | — | `?category=&sort=&numberFrom=&numberTo=` | Ambil produk (filter + sorting + number range) → `{ data: [...], total }` |
| `/api/products` | POST | ✅ | Body: `{ name, price, ... }` | Tambah produk baru |
| `/api/products/[id]` | GET | — | — | Detail produk |
| `/api/products/[id]` | PUT | ✅ | Body: `{ name, price, ... }` | Update produk |
| `/api/products/[id]` | DELETE | ✅ | — | Hapus produk |
| `/api/categories` | GET | — | — | Ambil semua kategori → `[{ id, name, slug }]` (plain array) |
| `/api/click` | POST | — | Body: `{ productId }` | Simpan log klik → `{ shopeeUrl }` |
| `/api/stats` | GET | ✅ | — | `{ data: { totalSales, totalProducts, activeProducts, totalClicks, avgCommission, recentClicks, topProducts } }` |
| `/api/analytics` | GET | ✅ | — | Data analitik — revenue, clicks, traffic sources, geography |
| `/api/settings` | GET | ✅ | — | Baca AppSetting via Prisma |
| `/api/settings` | PUT | ✅ | Body: `{ storeName, bio, ... }` | Simpan AppSetting via Prisma |
| `/api/contact` | POST | — | Body: `{ name, email, message }` | Kirim pesan kontak |

### Response Format

Semua endpoint mengembalikan JSON.

**Products** `GET /api/products`:
```json
{
  "data": [
    {
      "id": "cla1...",
      "name": "Mechanical Keyboard Pro",
      "price": 450000,
      "imageUrl": "...",
      "imageAlt": "...",
      "shopeeUrl": "...",
      "categoryId": "clb1...",
      "category": { "id": "clb1...", "name": "Elektronik", "slug": "elektronik" },
      "isFeatured": true,
      "createdAt": "2026-07-19T17:31:40.000Z",
      "_count": { "clicks": 12 }
    }
  ],
  "total": 5
}
```

**Categories** `GET /api/categories` — returns **plain array** (no `data`/`total` wrapper):
```json
[
  { "id": "clb1...", "name": "Elektronik", "slug": "elektronik" },
  { "id": "clb2...", "name": "Fashion", "slug": "fashion" }
]
```

**Stats** `GET /api/stats`:
```json
{
  "data": {
    "totalSales": 0,
    "totalProducts": 5,
    "activeProducts": 3,
    "totalClicks": 47,
    "avgCommission": 8500,
    "recentClicks": [
      { "id": "clc1...", "product": { "name": "Product A" }, "clickedAt": "2026-07-20T..." }
    ],
    "topProducts": [
      { "id": "cla1...", "name": "Product A", "_count": { "clicks": 12 } }
    ]
  }
}
```

**Click** `POST /api/click`:
```json
{ "shopeeUrl": "https://shopee.co.id/..." }
```

## 6. Rencana Deploy

1. Dev lokal pakai SQLite (`prisma/dev.db`), cepat tanpa setup server.
2. Sebelum deploy, ganti `DATABASE_URL` ke Postgres (rekomendasi: Neon, free tier cukup untuk skala awal).
3. Jalankan `npx prisma migrate deploy` di environment production.
4. Deploy ke Vercel: connect repo GitHub → set environment variables → deploy otomatis tiap push ke `main`.

## 7. Non-Functional Requirements

- **Performance**: gambar produk lewat `next/image` dengan lazy loading, target Lighthouse score > 90.
- **SEO**: metadata dinamis per halaman, sitemap.xml, open graph image untuk share ke sosmed.
- **Responsive**: mobile-first, chip kategori horizontal scroll, grid 1-2 kolom di HP, 4 kolom di desktop.
- **Aksesibilitas**: kontras warna cukup, alt text di semua gambar produk.
