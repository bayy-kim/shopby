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
│   ├── dev.db                      # SQLite database (local dev)
│   └── migrations/
│       └── 20260719173140_init/
│           └── migration.sql
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── layout.tsx              # Root layout, metadata, font
│   │   ├── page.tsx                # Landing page (Hero + ProductGrid)
│   │   ├── globals.css             # Tailwind v4 + @layer components
│   │   ├── providers.tsx           # TanStack Query provider
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx        # Login page (standalone receipt card)
│   │   │   └── (dashboard)/
│   │   │       ├── layout.tsx      # Admin sidebar + topnav layout
│   │   │       ├── page.tsx        # Dashboard (stats, chart, activity)
│   │   │       ├── products/
│   │   │       │   ├── page.tsx    # Product table list
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx# Edit product form
│   │   │       ├── analytics/
│   │   │       │   └── page.tsx    # Analytics (metrics, chart, sources)
│   │   │       └── settings/
│   │   │           └── page.tsx    # Settings (store, payout, security)
│   │   └── api/
│   │       ├── products/route.ts   # GET: list produk (filter + sort)
│   │       ├── categories/route.ts # GET: semua kategori
│   │       └── click/route.ts      # POST: catat klik
│   ├── components/
│   │   ├── ui/                     # shadcn/ui + custom components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── ProductCardSkeleton.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── CategoryFilter.tsx   # sidebar (desktop) + chips (mobile)
│   │       ├── ProductGrid.tsx      # grid + sort + load more
│   │       └── ProductCard.tsx      # reusable, variant: highlight/compact
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   └── useCategories.ts
│   ├── lib/
│   │   ├── prisma.ts               # Singleton Prisma client
│   │   ├── utils.ts                # cn(), formatPrice()
│   │   └── services/
│   │       ├── products.ts         # fetchProducts API
│   │       ├── categories.ts       # fetchCategories API
│   │       └── click.ts            # logClick API
│   └── types/
│       └── index.ts                # Product, Category, ClickLog type
├── .env / .env.example
├── next.config.ts
├── tsconfig.json
├── package.json
├── eslint.config.mjs
├── postcss.config.mjs
└── components.json                 # shadcn/ui config
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
```

## 4. Admin Panel Routes

| Route | Deskripsi |
|---|---|
| `/admin/login` | Login page (receipt card, brutalist style) |
| `/admin` | Dashboard — stats, sales chart, recent activity |
| `/admin/products` | Product management table with CRUD actions |
| `/admin/products/[id]` | Edit single product form |
| `/admin/analytics` | Metrics, click/conversion chart, traffic sources, geography |
| `/admin/settings` | Store profile, payout info, security toggles |

Admin layout includes: fixed sidebar (desktop) + collapsible mobile nav, top search bar, notification bell, profile avatar. All admin pages use the brutalist/receipt design language consistent with the landing page.

## 5. API Contract (Internal)

| Endpoint | Method | Query Params | Fungsi |
|---|---|---|---|
| `/api/products` | GET | `?category=<slug>&sort=price_asc\|price_desc\|newest` | Ambil produk (filter + sorting) |
| `/api/categories` | GET | — | Ambil semua kategori |
| `/api/click` | POST | — | Body: `{ productId }` → simpan log, balikin `{ shopeeUrl }` |

### Response Format

Semua endpoint mengembalikan JSON. Products:
```json
{
  "data": [
    {
      "id": "...",
      "name": "Mechanical Keyboard Pro",
      "price": 450000,
      "imageUrl": "...",
      "imageAlt": "...",
      "shopeeUrl": "...",
      "category": { "id": "...", "name": "Elektronik", "slug": "elektronik" },
      "isFeatured": true,
      "createdAt": "..."
    }
  ],
  "total": 9
}
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
