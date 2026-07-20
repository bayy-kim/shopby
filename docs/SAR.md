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
├── docs/                           # Dokumentasi
├── middleware.ts                   # Edge auth guard untuk /admin-shopby/* + /api/admin-shopby/*
├── prisma/
│   ├── schema.prisma               # Product, Category, ClickLog, AppSetting
│   ├── seed.ts
│   ├── dev.db
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, metadata, font
│   │   ├── page.tsx                # Landing page (Hero + ProductGrid)
│   │   ├── globals.css             # Tailwind v4 + @layer components
│   │   ├── providers.tsx           # TanStack Query provider
│   │   ├── sitemap.ts              # Auto-generated sitemap
│   │   ├── admin/
│   │   │   ├── login/page.tsx
│   │   │   ├── help/page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   └── (dashboard)/
│   │   │       ├── layout.tsx      # Sidebar + topnav
│   │   │       ├── page.tsx        # Dashboard (stats real, revenue chart)
│   │   │       ├── products/
│   │   │       │   ├── page.tsx    # CRUD product table
│   │   │       │   ├── new/page.tsx# Add product
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── analytics/page.tsx
│   │   │       └── settings/page.tsx
│   │   ├── about/page.tsx
│   │   ├── affiliate/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx            # Client component form
│   │   │   └── layout.tsx          # Metadata wrapper
│   │   └── api/
│   │       ├── admin/login/route.ts
│   │       ├── admin/logout/route.ts
│   │       ├── products/route.ts   # GET (public) + POST (auth)
│   │       ├── products/[id]/route.ts # GET + PUT + DELETE
│   │       ├── categories/route.ts
│   │       ├── click/route.ts
│   │       ├── stats/route.ts
│   │       ├── analytics/route.ts
│   │       ├── settings/route.ts   # via Prisma AppSetting
│   │       └── contact/route.ts
│   ├── components/
│   │   ├── ui/                     # shadcn/ui + custom
│   │   ├── layout/ (Navbar, Footer)
│   │   └── sections/ (Hero, ProductGrid, ProductCard, CategoryFilter)
│   ├── hooks/ (useProducts, useCategories, useSettings, useContact)
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
| `/admin-shopby/products/[id]` | Edit single product form |
| `/admin-shopby/analytics` | Metrics, click/conversion chart, traffic sources, geography |
| `/admin-shopby/settings` | Store profile, payout info, security toggles |

Admin layout includes: fixed sidebar (desktop) + collapsible mobile nav, top search bar, notification bell, profile avatar. All admin pages use the brutalist/receipt design language consistent with the landing page.

## 5. API Contract (Internal)

| Endpoint | Method | Auth | Query/Body | Fungsi |
|---|---|---|---|---|
| `/api/admin-shopby/login` | POST | — | Body: `{ email, password }` | Login admin → Set-Cookie |
| `/api/admin-shopby/logout` | POST | — | — | Hapus session cookie |
| `/api/products` | GET | — | `?category=&sort=&search=` | Ambil produk (filter + sorting) |
| `/api/products` | POST | ✅ | Body: `{ name, price, ... }` | Tambah produk baru |
| `/api/products/[id]` | GET | — | — | Detail produk |
| `/api/products/[id]` | PUT | ✅ | Body: `{ name, price, ... }` | Update produk |
| `/api/products/[id]` | DELETE | ✅ | — | Hapus produk |
| `/api/categories` | GET | — | — | Ambil semua kategori |
| `/api/click` | POST | — | Body: `{ productId }` → simpan log, return `{ shopeeUrl }` |
| `/api/stats` | GET | ✅ | — | Statistik dashboard |
| `/api/analytics` | GET | ✅ | — | Data analitik (revenue, clicks) |
| `/api/settings` | GET | ✅ | — | Baca pengaturan (via Prisma) |
| `/api/settings` | PUT | ✅ | Body: `{ storeName, bio, ... }` | Simpan pengaturan |
| `/api/contact` | POST | — | Body: `{ name, email, message }` | Kirim pesan kontak |

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
