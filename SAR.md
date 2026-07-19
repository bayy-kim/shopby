# SAR (System Architecture & Requirements) - Shopby

## 1. Tech Stack

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | Next.js 15 (App Router) + TypeScript | SSR/SSG buat SEO, familiar dengan stack project lain |
| Styling | Tailwind CSS v4 + shadcn/ui | Cepat, konsisten, komponen siap pakai |
| Animasi | Framer Motion | Hover card, scroll reveal, transisi halus |
| Database | Prisma ORM + SQLite (dev) → Postgres/Neon (prod) | Migrasi gampang, tipe aman |
| Gambar | next/image | Optimasi otomatis, lazy load |
| Hosting | Vercel | Deploy langsung dari GitHub, cocok buat Next.js |

## 2. Struktur Folder & Penjelasan

```
shopby/
├── app/
│   ├── layout.tsx              # Root layout, metadata, font
│   ├── page.tsx                # Landing page (Hero + ProductGrid)
│   ├── globals.css             # Tailwind base + custom variable
│   ├── produk/[slug]/page.tsx  # Detail produk (fase 2, opsional)
│   └── api/
│       └── click/route.ts      # POST: catat klik lalu redirect ke Shopee
├── components/
│   ├── ui/                     # button.tsx, card.tsx, badge.tsx (shadcn)
│   └── sections/
│       ├── Hero.tsx
│       ├── CategoryFilter.tsx
│       ├── ProductGrid.tsx
│       ├── ProductCard.tsx
│       └── Footer.tsx
├── lib/
│   ├── prisma.ts               # Singleton Prisma client
│   └── utils.ts                # Helper (format harga, cn(), dll)
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── types/
│   └── index.ts                # Product, Category type
└── public/images/
```

Alasan pemisahan `components/ui` vs `components/sections`: `ui` isinya komponen generik dari shadcn (bisa dipakai ulang di mana saja), `sections` isinya komponen besar yang spesifik untuk 1 bagian halaman Shopby.

## 3. Data Model (Prisma)

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  price       Int
  discountPct Int?
  imageUrl    String
  shopeeUrl   String
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  isFeatured  Boolean  @default(false)
  createdAt   DateTime @default(now())
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

## 4. API Contract (Internal)

| Endpoint | Method | Fungsi |
|---|---|---|
| `/api/products` | GET | Ambil semua produk, support query `?category=` |
| `/api/categories` | GET | Ambil semua kategori |
| `/api/click` | POST | Body: `{ productId }` → simpan log, balikin `shopeeUrl` untuk redirect |

## 5. Rencana Deploy

1. Dev lokal pakai SQLite (`prisma/dev.db`), cepat tanpa setup server.
2. Sebelum deploy, ganti `DATABASE_URL` ke Postgres (rekomendasi: Neon, free tier cukup untuk skala awal).
3. Jalankan `npx prisma migrate deploy` di environment production.
4. Deploy ke Vercel: connect repo GitHub → set environment variables → deploy otomatis tiap push ke `main`.

## 6. Non-Functional Requirements

- **Performance**: gambar produk lewat `next/image` dengan lazy loading, target Lighthouse score > 90.
- **SEO**: metadata dinamis per halaman, sitemap.xml, open graph image untuk share ke sosmed.
- **Responsive**: mobile-first, grid 1-2 kolom di HP, 4 kolom di desktop.
- **Aksesibilitas**: kontras warna cukup, alt text di semua gambar produk.
