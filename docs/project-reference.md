# ShopBy — Next.js E-Commerce Storefront

A modern, high-performance e-commerce storefront built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Prisma ORM**.

---

## Architecture Overview

```
middleware.ts             # Edge middleware — /admin → redirect /, /admin-shopby/:path*, /api/stats/*, /api/analytics/*, /api/settings/*
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── layout.tsx        # Root layout (providers, fonts, globals, SEO)
│   ├── page.tsx          # Homepage (Hero + ProductGrid + CategoryFilter)
│   ├── globals.css       # Tailwind v4 + custom CSS
│   ├── providers.tsx     # TanStack Query provider
│   ├── loading.tsx       # Global loading state
│   ├── not-found.tsx     # Custom 404
│   ├── robots.ts         # /robots.txt — disallow /admin-shopby/, /api/
│   ├── sitemap.ts        # /sitemap.xml
│   ├── admin-shopby/     # Admin panel (renamed from /admin for security)
│   │   ├── login/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx  # /admin-shopby/login
│   │   ├── help/
│   │   │   └── page.tsx  # /admin-shopby/help
│   │   ├── loading.tsx   # Admin loading state
│   │   ├── error.tsx     # Admin error boundary
│   │   └── (dashboard)/
│   │       ├── layout.tsx# Sidebar + topnav admin
│   │       ├── page.tsx  # /admin-shopby — Dashboard (stats real, chart)
│   │       ├── products/
│   │       │   ├── page.tsx
│   │       │   ├── new/page.tsx
│   │       │   └── [id]/page.tsx
│   │       ├── analytics/page.tsx
│   │       └── settings/page.tsx
│   ├── about/page.tsx
│   ├── affiliate/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── contact/
│   │   ├── layout.tsx
│   │   └── page.tsx      # /contact — Contact form
│   └── api/
│       ├── admin-shopby/
│       │   ├── login/route.ts    # POST /api/admin-shopby/login
│       │   └── logout/route.ts   # POST /api/admin-shopby/logout
│       ├── products/
│       │   ├── route.ts          # GET /api/products (public, with numberFrom/To), POST /api/products (auth)
│       │   └── [id]/route.ts     # GET|PUT|DELETE /api/products/[id] (auth)
│       ├── categories/route.ts   # GET /api/categories
│       ├── click/route.ts        # POST /api/click
│       ├── stats/route.ts        # GET /api/stats (auth)
│       ├── analytics/route.ts    # GET /api/analytics (auth)
│       ├── settings/route.ts     # GET|PUT /api/settings (auth, via Prisma AppSetting)
│       └── contact/route.ts      # POST /api/contact
├── components/           # Shared React components
│   ├── ui/               # UI primitives + custom
│   │   ├── ProductCardSkeleton.tsx
│   │   └── EmptyState.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── ProductGrid.tsx
│       ├── ProductCard.tsx
│       └── CategoryFilter.tsx
├── hooks/                # TanStack Query hooks
│   ├── useProducts.ts
│   └── useCategories.ts
├── lib/
│   ├── auth.ts           # JWT session (jose) — edge-compatible
│   ├── auth-password.ts  # scrypt hash/verify — fallback DB hash
│   ├── csrf.ts           # CSRF token validation guard
│   ├── validate-settings.ts # Settings input validation whitelist (11 keys)
│   ├── rate-limit.ts     # In-memory rate limiter with staggered cleanup
│   ├── prisma.ts         # Prisma client singleton
│   ├── utils.ts          # cn(), formatPrice(), NUMBER_RANGE_CHUNK_SIZE, buildNumberRanges()
│   ├── products-numbering.ts # getProductNumberMap(), resolveNumberRangeToIds()
│   └── services/
│       ├── products.ts   # fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct
│       ├── categories.ts
│       └── click.ts
└── types/
    └── index.ts          # Product, Category, ClickLog types
prisma/
├── schema.prisma         # Product, Category, ClickLog, AppSetting
├── seed.ts               # 4 categories (0 products)
└── migrations/
```

---

## Core Technology Stack

| Layer            | Technology                         |
| ---------------- | ---------------------------------- |
| Framework        | Next.js 16 (App Router)             |
| UI Library       | React 19.1.0                       |
| Language         | TypeScript 5.x                     |
| Styling          | Tailwind CSS v4 + shadcn/ui        |
| Database ORM     | Prisma 6.6.0                       |
| Database         | PostgreSQL (Neon in prod)           |
| Package Manager  | pnpm                               |

---

## Data Model (Prisma)

### Product
| Field        | Type         | Notes                        |
| ------------ | ------------ | ---------------------------- |
| `id`         | `String`     | Auto-generated CUID          |
| `name`       | `String`     | Product name                 |
| `price`      | `Int`        | Price in IDR (integer)       |
| `commission` | `Int`        | Komisi per produk in IDR     |
| `rating`     | `Float`      | Rating desimal 0-5 (4.5, 4.9) — half-star render di UI |
| `discountPct`| `Int?`       | Discount percentage (nullable)|
| `imageUrl`   | `String`     | Primary product image URL    |
| `imageAlt`   | `String`     | Alt text for product image   |
| `shopeeUrl`  | `String`     | Shopee affiliate link        |
| `categoryId` | `String`     | FK → Category                |
| `isFeatured` | `Boolean`    | Flag for homepage featured   |
| `isSoldOut`  | `Boolean`    | Flag for out-of-stock status |
| `createdAt`  | `DateTime`   | Auto-set                     |

**Computed field (not stored):** `number` — position in `createdAt ASC` order, calculated via `getProductNumberMap()`

**Relations:** `Product belongsTo Category` (required), `Product hasMany ClickLog`

### Category
| Field        | Type         | Notes                        |
| ------------ | ------------ | ---------------------------- |
| `id`         | `String`     | Auto-generated CUID          |
| `name`       | `String`     | Category name                |
| `slug`       | `String`     | URL-friendly slug (unique)   |

**Relations:** `Category hasMany Product`

### ClickLog
| Field        | Type         | Notes                        |
| ------------ | ------------ | ---------------------------- |
| `id`         | `String`     | Auto-generated CUID          |
| `productId`  | `String`     | FK → Product                 |
| `clickedAt`  | `DateTime`   | Auto-set                     |

**Relations:** `ClickLog belongsTo Product`

### AppSetting
| Field        | Type         | Notes                        |
| ------------ | ------------ | ---------------------------- |
| `id`         | `String`     | Auto-generated CUID          |
| `key`        | `String`     | Setting key (unique)         |
| `value`      | `String`     | JSON-encoded value           |

---

## API Routes

| Method | Route                 | Auth  | Description                             |
| ------ | --------------------- | ----- | --------------------------------------- |
| POST   | `/api/admin-shopby/login`    | —     | Authenticate admin, set HttpOnly JWT cookie (`SameSite=Strict`) |
| POST   | `/api/admin-shopby/logout`   | —     | Clear session cookie                    |
| GET    | `/api/products`       | —     | List products (`?category=&sort=&numberFrom=&numberTo=`) — sort: `newest`, `price_asc`, `price_desc`, `rating_desc` |
| POST   | `/api/products`       | Yes   | Create product                          |
| GET    | `/api/products/[id]`  | —     | Get single product (includes computed `number`) |
| PUT    | `/api/products/[id]`  | Yes   | Update product (accepts `isSoldOut`)    |
| DELETE | `/api/products/[id]`  | Yes   | Delete product                          |
| GET    | `/api/categories`     | —     | List categories (no query params)       |
| GET    | `/api/stats`          | Yes   | Dashboard stats — totalSales, totalProducts, totalClicks, recentClicks, topProducts |
| GET    | `/api/analytics`      | Yes   | Analytics data — revenue, clicks, traffic sources, geography |
| GET    | `/api/settings`       | Yes   | Read AppSetting via Prisma              |
| PUT    | `/api/settings`       | Yes   | Update AppSetting via Prisma (+ Zod validation, CSRF guard) |
| PUT    | `/api/settings/password` | Yes | Change admin password (scrypt, stored in DB AppSetting) |
| POST   | `/api/click`          | —     | Track product click → returns `{ shopeeUrl }` |
| POST   | `/api/contact`        | —     | Submit contact form                     |

### API Response — Product with `number`
```json
{
  "data": [
    {
      "id": "clx...",
      "name": "Mechanical Keyboard Pro",
      "price": 450000,
      "number": 1,
      "isSoldOut": false,
      "isFeatured": true,
      "category": { "id": "clx...", "name": "Elektronik", "slug": "elektronik" },
      "_count": { "clicks": 5 }
    }
  ],
  "total": 9
}
```

---

## Key Design Decisions

### 1. Service Layer Pattern
Data access is abstracted behind service functions in `src/lib/services/`. Routes and pages always call services, never Prisma directly. This keeps business logic centralized and testable.

### 2. Server Components + Streaming
All pages are **React Server Components** by default. Product listing pages use `Suspense` boundaries with loading fallbacks for streaming. Data fetching uses Next.js extended `fetch` with `next: { revalidate }` for ISR.

### 3. Slug-Based Routing
Categories use URL-safe `slug` fields for public URLs (`/categories/[slug]`). Products use internal `id` for API operations. The product detail page (`/products/[handle]`) uses a server-generated `handle` from seed data.

### 4. Click Tracking
A lightweight `ClickLog` table logs product clicks with product ID and timestamp. The `/api/click` endpoint records the click and returns the Shopee affiliate URL for redirect. Dashboard stats and analytics chart aggregate from this table for real-time metrics.

### 5. Type Safety
TypeScript types for Product, Category, ClickLog are defined in `src/types/index.ts` based on the Prisma schema. This ensures end-to-end type safety from DB queries to UI components.

### 6. Null/Empty State Handling
Pages gracefully handle empty states: `EmptyState` component provides descriptive fallback UI when no products exist, and admin pages show toast notifications for errors.

### 7. Animation — Framer Motion + CSS Transitions
Framer Motion digunakan untuk staggered fade-up animations di product grid (`ProductGrid.tsx`). Untuk komponen UI (button, card hover), digunakan inline CSS transitions karena `tailwindcss-animate` tidak kompatibel dengan Tailwind v4.

### 8. Single-Admin Auth (Stateless, Edge-Compatible)
Per PRD, Shopby hanya butuh **1 admin** (Bayu). Auth tidak menggunakan database/users table — credential berasal dari environment variable (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`). Password diverifikasi via Node `crypto.scryptSync` (built-in, zero dependency). Session dikelola via **JWT** (jose library, edge-compatible untuk middleware) yang disimpan di cookie HttpOnly. Middleware Next.js melindungi semua route `/admin-shopby/:path*` serta `/api/stats/:path*`, `/api/analytics/:path*`, `/api/settings/:path*`, `/api/products/:path*` (POST/PUT/DELETE) — akses tanpa session valid di-redirect ke `/admin-shopby/login` atau mengembalikan 401 untuk API. Semua route API yang butuh proteksi memanggil `checkAuth()` dari `@/lib/auth.ts` — fungsi terpusat yang melempar `401` jika session invalid.

### 9. Settings Database Storage (Prisma AppSetting)
Konfigurasi toko disimpan di database via model `AppSetting` — key-value store dengan `key` unique dan `value` string (JSON). API `/api/settings` membaca/menulis via Prisma, kompatibel dengan serverless deployment tanpa filesystem akses.

### 10. SEO — Multi-Layer Strategy
SEO diterapkan di tiga lapis: (a) **Server-rendered metadata** via Next.js `generateMetadata()` — OpenGraph, Twitter Cards, page-specific title/description; (b) **JSON-LD structured data** (schema.org `Product`) pada product detail — membantu search engine memahami konten; (c) **Auto-generated sitemap** via `sitemap.ts` — mencakup semua produk, kategori, dan halaman statis.

### 11. Accessibility as Default
Aksesibilitas bukan add-on, melainkan built-in: (a) semantic HTML + ARIA `role` attributes pada landmark element; (b) `aria-label` pada semua interactive element; (c) `focus-visible` ring hanya muncul saat keyboard navigation; (d) `prefers-reduced-motion` media query menonaktifkan animasi untuk vestibular disorders.

### 12. Performance Patterns
Beberapa teknik performance diterapkan secara konsisten: (a) **preconnect** untuk third-party origins (Google Fonts); (b) **font-display: swap** — teks tetap readable selama font loading; (c) **Next.js Image** dengan `fill` + `sizes` — responsive images tanpa layout shift; (d) **native lazy loading** via `loading="lazy"` pada gambar di bawah fold.

### 13. Error Boundaries
Admin section memiliki error boundary di `src/app/admin-shopby/error.tsx` yang menangkap runtime errors dengan fallback UI dan tombol retry. `src/app/admin-shopby/loading.tsx` menyediakan loading state global untuk semua admin pages, memberikan UX yang mulus saat data fetching.

### 14. Product Numbering (Computed, Not Stored)
Nomor produk dihitung dari posisi dalam urutan `createdAt ASC` — produk pertama = #1, berikutnya = #2, dst. Tidak disimpan sebagai kolom database. Renumbering otomatis saat produk dihapus. Helper di `src/lib/products-numbering.ts`.

### 15. Sold Out Status
Produk bisa ditandai `isSoldOut` via admin panel. Di landing page: overlay "Stok Habis" di atas gambar, tombol "Beli" jadi disabled dengan teks "Stok Habis".

### 16. Number Range Filter
Landing page memiliki filter nomor produk dengan chunk 100 produk per range (#1-100, #101-200, dst). Filter via query params `numberFrom` & `numberTo` pada `GET /api/products`.

### 17. Image URL Input (No File Upload)
Input gambar produk menggunakan URL (bukan drag-and-drop base64). Gambar dari Shopee langsung bisa ditempel sebagai URL, preview live dengan `<Image>` dari `next/image`.

---

## Component Library (src/components/)

### UI Primitives (`src/components/ui/`)
- **ProductCardSkeleton.tsx** — Animated loading placeholder for product cards (pulse animation)
- **EmptyState.tsx** — Descriptive fallback UI for empty product/grid states

### Layout (`src/components/layout/`)
- **Navbar.tsx** — Fixed top nav with logo, nav links (Deals, Kategori, Affiliate)
- **Footer.tsx** — Footer with copyright 2026, brand links (About, Affiliate, Privacy, Terms, Contact)

### Feature Components (`src/components/sections/`)
- **Hero.tsx** — Landing page hero: headline + subtitle + CTA "Lihat Semua Deal" + floating product card
- **ProductCard.tsx** — Card with image, name (truncate + "Lebih banyak"/"Lebih sedikit" toggle), price, badge `#number`, rating desimal (half-star via clip), sold-out overlay/disabled button, "Beli di Shopee" button → POST `/api/click`
- **ProductGrid.tsx** — Responsive grid (1–2 mobile, 3 tablet, 4 desktop), progressive load with "Muat Lebih Banyak" button
- **CategoryFilter.tsx** — Horizontal scroll chips on mobile, sidebar on desktop; includes category filter + number range filter sections

---

## Custom Hooks

### `useProducts(params?: { category?: string; sort?: string; numberFrom?: number; numberTo?: number })`
- Calls `GET /api/products` with optional category, sort, number range query params
- Query key includes numberFrom/To for cache differentiation
- Returns `{ data, total, isLoading, error }` via TanStack Query `useQuery`

### `useCategories()`
- Calls `GET /api/categories`
- Returns `{ data, isLoading, error }` via TanStack Query `useQuery`

---

## Styling System

### Tailwind CSS v4
- Uses `@import "tailwindcss"` syntax (v4 style) in `globals.css`
- **No `tailwind.config.js`** — Tailwind v4 uses CSS-based configuration
- Custom CSS custom properties in `:root` for brand colors
- `dark` class support via `@variant dark`

### shadcn/ui Convention
Components follow shadcn/ui patterns:
- `cn()` utility from `clsx` + `tailwind-merge`
- `Slot` from `@radix-ui/react-slot` for polymorphic `asChild`
- `cva` (class-variance-authority) for component variants

---

## Styling Design System

### Color Palette (Brutalist)
| Token              | Value         | Usage                    |
| ------------------ | ------------- | ------------------------ |
| `--color-primary`  | `#1a1c1b` (ink) | Primary text, borders   |
| `--color-bg`       | `#f9f9f6`     | Page background          |
| `--color-ink`      | `#1a1c1b`     | Primary text color       |
| `--border-color`   | `#e5e1d8`     | Borders, dividers        |
| Admin red accent   | `#b51c00`     | Buttons, highlights      |
| Admin yellow       | `#FFC93C`     | Price badges, active nav |
| Admin orange       | `#FF4D2D`     | Toggle active, CTAs      |

### Typography
- **Font Stack:** `Montserrat` (headings), `JetBrains Mono` (admin/monospace) via next/font
- **Admin uses:** `font-sans` for labels, `font-mono` for data values, receipt-style layout

### Spacing & Layout
- **Max content width:** `1280px` with auto margins
- **Border style:** `border-dashed` dividers throughout (brutalist receipt aesthetic)
- **Shadows:** `brutalist-shadow` custom class — solid ink box shadow
- **Clip paths:** Polygon clip paths on cards and containers for jagged-edge brutalist effect

---

## Build & Run Commands

| Command                    | Description                         |
| -------------------------- | ----------------------------------- |
| `pnpm install`             | Install dependencies                |
| `pnpm dev`                 | Start dev server (localhost:3000)   |
| `pnpm build`               | Production build                    |
| `pnpm start`               | Start production server              |
| `pnpm prisma:generate`     | Regenerate Prisma client             |
| `pnpm prisma:push`         | Push schema to DB                    |
| `pnpm prisma:seed`         | Seed database with sample data       |
| `pnpm lint`                | Run ESLint                           |

### Seed Data
The seed script (`prisma/seed.ts`) creates:
- **4 categories** (Elektronik, Fashion, Rumah Tangga, Kecantikan)
- **0 products** — seed only creates categories; admin adds products via the admin panel

Run `pnpm prisma:seed` to populate the database.

---

## Page Routing Summary

| Route                    | Component / Type      | Data Source / Notes      |
| ------------------------ | --------------------- | ------------------------ |
| `/`                      | Server Component      | Landing — Hero + ProductGrid + CategoryFilter |
| `/about`                 | Server Component      | Static content           |
| `/affiliate`             | Server Component      | Static content           |
| `/privacy`               | Server Component      | Static content           |
| `/terms`                 | Server Component      | Static content           |
| `/contact`               | Client Component      | Form → POST `/api/contact` |
| `/admin-shopby/login`    | Client Component      | Login form → POST `/api/admin-shopby/login` |
| `/admin-shopby`          | Client Component      | Dashboard — real stats from `/api/stats` |
| `/admin-shopby/products` | Client Component      | Product table — CRUD via `/api/products` |
| `/admin-shopby/products/new` | Client Component  | Add product — POST `/api/products` (URL image input) |
| `/admin-shopby/products/[id]` | Client Component | Edit product — GET/PUT `/api/products/[id]` |
| `/admin-shopby/analytics` | Client Component     | Real data from `/api/analytics` |
| `/admin-shopby/settings` | Client Component      | Read/write via `/api/settings` |
| `/admin-shopby/help`     | Server Component      | Static content — Help Center |
| `/robots.txt`            | Generated route       | Disallow `/admin-shopby/`, `/api/` |
| `/sitemap.xml`           | Generated route       | Auto-generated from `sitemap.ts` |
| `/_not-found`            | Server Component      | Custom 404 — static page |

---

## Notable Implementation Details

- **Price formatting:** `formatPrice()` utility returns `RpX.XXX` (IDR) string — handles large numbers with dot separators, konsisten di semua produk, analytics, dan dashboard. Didefinisikan di `@/lib/utils.ts`.
- **URL-safe slugs:** Categories use `slug` field generated from name via `.toLowerCase().replace(/\s+/g, '-')` in seed script
- **Image strategy:** Input URL gambar langsung (base64 upload dihapus). Preview live via `<Image>` dari `next/image`. Fallback `picsum.photos` jika URL dikosongkan
- **Dashboard chart:** Revenue chart di admin dashboard merender data real dari `/api/analytics` — bukan mock data. Aggregasi revenue dari total nilai produk * klik per hari
- **Click analytics:** Logs to `ClickLog` table with product ID and timestamp
- **Empty states:** All listing pages handle zero-results gracefully with descriptive messages
- **Auth — edge-compatible JWT:** Middleware menggunakan `jose` library (bukan `jsonwebtoken`) karena Next.js middleware berjalan di Edge Runtime yang tidak support Node crypto untuk JWTs
- **Auth — password hashing tanpa bcryptjs:** Gunakan Node.js `crypto.scryptSync` + `timingSafeEqual` — 100% built-in, tanpa dependency tambahan
- **Auth — single admin credential:** Email dan password hash berasal dari `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`), bukan dari database — sesuai PRD yang hanya butuh 1 admin
- **Auth — session via HttpOnly cookie:** JWT disimpan di cookie `shopby_admin_session` dengan flag `HttpOnly`, `Secure` (prod), `SameSite=Lax`, `path=/` — expiry 24 jam
- **Auth — logout:** Panggil `POST /api/admin-shopby/logout` → cookie langsung dihapus (maxAge=0), middleware otomatis redirect ke login
- **Middleware — extended protection:** Selain `/admin-shopby/:path*`, middleware melindungi `/api/stats/:path*`, `/api/analytics/:path*`, `/api/settings/:path*` — akses tanpa session valid redirect ke `/admin-shopby/login`
- **Middleware — matcher patterns:** Gunakan sintaks `/:path*` (bukan `:path*`) — Next.js 16 membutuhkan leading slash pada path patterns agar cocok dengan root-relative URLs
- **Auth — checkAuth() extracted:** Semua route API yang butuh proteksi memanggil `checkAuth()` dari `@/lib/auth.ts` (sebelumnya di-duplicate di setiap route). Fungsi ini memvalidasi cookie session JWT via middleware-compatible `jose` dan melempar `401` jika invalid
- **Settings API (Prisma AppSetting):** `GET|PUT /api/settings` membaca/menulis model `AppSetting` di database — kompatibel dengan serverless deployment, tidak bergantung pada filesystem
- **SEO — OpenGraph & Twitter Cards:** Root layout menyisipkan tag `og:title`, `og:description`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description` via `generateMetadata()` — setiap halaman bisa override metadata masing-masing
- **SEO — JSON-LD structured data:** Product detail page merender `<script type="application/ld+json">` dengan schema.org `Product` — membantu search engine memahami konten
- **SEO — Sitemap:** `src/app/sitemap.ts` menghasilkan `/sitemap.xml` otomatis mencakup semua produk, kategori, dan halaman statis — menggunakan `generateSitemaps()` untuk scaling
- **SEO — page-specific metadata:** Setiap halaman mendefinisikan `metadata` export dengan `title` dan `description` spesifik — `generateMetadata()` pada dynamic routes mengambil data dari database
- **A11y — ARIA labels:** Tombol, link, form, dan interactive elements memiliki `aria-label` yang deskriptif — screen reader dapat menavigasi dengan jelas
- **A11y — focus-visible rings:** Menggunakan Tailwind `focus-visible:ring-2 focus-visible:ring-primary` — hanya tampil saat navigasi keyboard, tidak saat mouse click
- **A11y — reduced-motion:** CSS `@media (prefers-reduced-motion: reduce)` menonaktifkan animasi dan transisi — hormati preferensi aksesibilitas pengguna
- **A11y — role attributes:** Element struktural menggunakan role seperti `banner`, `navigation`, `main`, `contentinfo`, `region` — landmark untuk assistive technology
- **Performance — preconnect:** `<link rel="preconnect">` untuk Google Fonts dan origin eksternal — mengurangi latency koneksi
- **Performance — font-display: swap:** Konfigurasi `next/font` dengan `display: 'swap'` — teks tetap terlihat selama font loading, fallback font ditampilkan sementara
- **Performance — Next.js Image fill+sizes:** Gambar menggunakan `fill` prop dengan `sizes` attribute — responsive image loading, browser pilih ukuran optimal
- **Performance — lazy loading:** Komponen di bawah fold menggunakan `loading="lazy"` untuk native image lazy loading — non-critical images tidak blocking initial render
- **Error boundaries:** `src/app/admin-shopby/error.tsx` menangkap error di admin pages dengan fallback UI dan tombol retry; `src/app/admin-shopby/loading.tsx` menyediakan loading spinner global untuk admin section
- **Product numbering (computed):** Helper `getProductNumberMap()` query semua produk `{ id, createdAt }` order ASC, return `Map<productId, number>`. Dipanggil paralel dengan query utama di API. Nomor tidak disimpan di database — renumbering otomatis saat delete
- **Sold Out:** Field `isSoldOut` di Prisma, toggle di admin panel (toggle langsung di tabel list, checkbox di form new/edit). Di landing page: overlay "Stok Habis" + disabled button, `aria-disabled="true"`
- **Number range filter:** Chunk 100 produk per range (`NUMBER_RANGE_CHUNK_SIZE = 100`). Filter di CategoryFilter (sidebar & mobile chips), query params `numberFrom`/`numberTo` ke API
- **Decimal rating (July 2026):** `rating` diubah dari `Int` ke `Float` di Prisma. Star render menggunakan clip-path approach: full stars untuk integer part, partially-filled star untuk fractional part (threshold 0.25 untuk half-star). Ditampilkan sebagai `4.5/5`, `4.9/5` dll.
- **Rating on all cards (July 2026):** Rating bintang desimal ditampilkan di semua varian ProductCard (highlight dan compact) — sebelumnya hanya di highlight.
- **Star Rating Glossy Shine Animation (July 2026):** Filled Star SVGs pada kartu rating tinggi mendapat efek glossy/shine. Rating > 4.5: class `star-shine-high` — brightness 1.6x, saturate(1.4), drop-shadow emas, 2s cycle. Rating 4–4.5: class `star-shine-mid` — brightness 1.3x, 3s cycle. CSS-only via `@keyframes star-glossy-high` / `star-glossy-mid` di `globals.css`. Respects `prefers-reduced-motion: reduce` via `@media` query.
- **Name truncation (July 2026):** Produk dengan nama > 60 karakter di-truncate dengan ellipsis + tombol "Lebih banyak" / "Lebih sedikit" toggle per kartu. `aria-expanded` untuk aksesibilitas.
- **Consistent card sizing (July 2026):** Gambar produk menggunakan `aspect-[4/3]` — rasio seragam antar varian. Kartu menggunakan `h-full` dalam grid flex-column.
- **Sort by rating (July 2026):** Opsi sortir "Rating" ditambahkan ke ProductGrid, mengirim `sort=rating_desc` ke API.

---

### 18. Commission per Product (July 2026)
Revenue dihitung dari komisi per produk: setiap klik = `product.commission` IDR. Dashboard dan analytics menampilkan komisi per produk, total revenue berbasis komisi real (bukan estimasi `clicks * 50000`).

### 19. CSRF Protection (July 2026 — Per-Session Random Token)
Semua state-changing admin API (`PUT`, `POST`) membutuhkan header `x-csrf-token`. Token random 32-byte (hex) di-generate saat login via `generateCsrfToken()` di `src/lib/csrf.ts`, disimpan di cookie `shopby_csrf` (non-HttpOnly, JS-readable). Client membaca cookie dan mengirim sebagai header. Server validasi header === cookie via `csrfGuard(request: NextRequest)`. Token berbeda per session, tidak bisa ditebak. Session cookie menggunakan `SameSite=Strict`.

### 20. Settings Input Validation (July 2026)
`PUT /api/settings` memvalidasi semua field dengan whitelist 11 keys, tipe checking, dan batas panjang/ukuran via `validate-settings.ts`.

### 21. Password Change via API (July 2026)
`PUT /api/settings/password` — verifikasi current password (scrypt), simpan hash baru di DB AppSetting `admin_password_hash`. Auth-password fallback: env var → DB.

### 22. Rate Limiter Improved (July 2026)
Staggered cleanup tiap 60 detik (sebelumnya: nuke 10K entries). Mencegah memory leak tanpa kehilangan semua state.

### 23. Auth Secret Length Enforced (July 2026)
`SESSION_SECRET` minimal 32 karakter — throws error saat startup jika kurang.

---

## Audit & Fixes (July 2026)

### Emoji Audit
- **0 emoji found** in all source files. Only standard typographic symbols (em dash `—`, division sign `÷`, bullet `•`, ellipsis `…`, left arrow `←`).

### Non-Functional Elements Fixed

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `login/page.tsx:119` | "Forgot Passcode?" button with empty `onClick={() => {}}` | Added `alert()` directing to contact admin |
| 2 | `layout.tsx:209` | "Mark All as Read" button with no handler (notifications always empty) | Removed button |
| 3 | `settings/page.tsx:212` | "Change Password" button with no `onClick` | Added toggle to show password change form with validation |
| 4 | `settings/page.tsx:149` | "Update Logo" div with no upload functionality | Added hidden file input + live preview via FileReader |
| 5 | `settings/page.tsx:96-108` | 4 tabs but only "Storefront" rendered content | Added conditional rendering: General/Storefront, Payouts, Account tabs show correct sections |
| 6 | `products/page.tsx:161` | "Sort: Newest" button with no handler | Added toggle between "Newest" and "Price" sort, wired to data fetching |
| 7 | `dashboard/page.tsx:94` | "All Time" button with no handler | Added toggle between "All Time" and "This Week" |
| 8 | `analytics/page.tsx:118` | "All Time" select with single option and no onChange | Added 4 time period options + onChange handler |
| 9 | `contact/route.ts:21` | `console.log` in production API route | Changed to `console.info` with sanitized data |
| 10 | `components/ui/card.tsx` | Orphaned component (never imported) | Deleted |
| 11 | `components/ui/button.tsx` | Orphaned component (never imported) | Deleted |
| 12 | `components/ui/badge.tsx` | Orphaned component (never imported) | Deleted |

### Security Audit & Fixes (July 2026)

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `settings/page.tsx` | Change password was client-only (no API) | Wired to `PUT /api/settings/password` — verifies current + stores new hash |
| 2 | `settings/page.tsx` | Logo upload never persisted (base64 in state only) | Logo included in settings PUT body, stored in DB JSON |
| 3 | `settings/route.ts`, `login/route.ts`, `logout/route.ts` | No CSRF protection | Added per-session random token (double-submit cookie) + `SameSite=Strict` |
| 4 | `settings/route.ts` | PUT accepted arbitrary keys | Added Zod-style validation whitelist (11 keys) + type/size checks |
| 5 | `rate-limit.ts` | In-memory Map with 10K-entry nuke | Staggered cleanup every 60s |
| 6 | `auth.ts` | No secret length check | Added min 32 chars requirement for `SESSION_SECRET` |
| 7 | `settings/page.tsx` | 2FA toggle was placebo | Changed to "Planned" badge + disabled state |
| 8 | `layout.tsx` | Notification dot always shown (empty state) | Conditional rendering based on `notifications.length` |
| 9 | `layout.tsx` | Hardcoded email in profile dropdown | Removed hardcoded email |
| 10 | `layout.tsx` | Help drawer had no focus trap | Added `FocusTrap` component |
| 11 | `login/page.tsx` | Missing `autoComplete` attributes | Added `autoComplete="email"` and `autoComplete="current-password"` |
| 12 | `dashboard/page.tsx` | Fetch errors silently ignored | Added visible error banner |

### Security Hardening v2 (July 2026)

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| 1 | CSRF token hardcoded (`shopby-admin-1`) visible in client JS | CRITICAL | Per-session random 32-byte hex token, double-submit cookie pattern |
| 2 | `/api/click` public endpoint without rate limit | HIGH | Rate limit 30/min/IP + referer/origin validation |
| 3 | `/api/products` POST without rate limit | HIGH | Rate limit 20/min/IP |
| 4 | No HSTS/security headers | MEDIUM | Added HSTS (1yr), X-Content-Type-Options, Referrer-Policy, X-Frame-Options |
| 5 | CSP `frame-src 'none'` blocked settings preview iframe | MEDIUM | Changed to `frame-src 'self'` |
| 6 | No root error boundary | HIGH | Created `src/app/error.tsx` with brutalist UI + retry button |
| 7 | Hero.tsx hydration mismatch (new Date() in module) | HIGH | Replaced with static date string |
| 8 | Render-phase setState in page.tsx | MEDIUM | Moved to useEffect |
| 9 | fetchCategories returned `{ data: [...] }` instead of `[...]` | CRITICAL | Changed to extract `.data` before return |

### Commission Feature (July 2026)

| # | File | Change |
|---|------|--------|
| 1 | `prisma/schema.prisma` | Added `commission Int @default(0)` to Product |
| 2 | `types/index.ts` | Added `commission: number` to Product interface |
| 3 | `services/products.ts` | Added `commission` param to `createProduct`/`updateProduct` |
| 4 | `api/products/route.ts` | POST handles `commission` |
| 5 | `api/products/[id]/route.ts` | PUT handles `commission` |
| 6 | `api/stats/route.ts` | Revenue = sum(commission × clicks) instead of estimate |
| 7 | `api/analytics/route.ts` | Revenue from real commission data |
| 8 | `products/new/page.tsx` | Added "Komisi per Produk" input |
| 9 | `products/[id]/page.tsx` | Added "Komisi per Produk" input |
| 10 | `products/page.tsx` | Added "Komisi" column to table |
| 11 | `dashboard/page.tsx` | Top Products shows Komisi + Revenue columns |
| 12 | `analytics/page.tsx` | Top Products shows Komisi + Revenue columns |

### Search Bar Functional
- Layout top navbar search navigates to `/admin-shopby/products?q=<query>` on Enter
- Press `/` anywhere to focus search bar
- Products page reads `q` URL param and syncs to search state during render (no useEffect)

### React 19 Lint Compliance
- All `setState` calls moved out of `useEffect` bodies (setState during render pattern)
- Removed `globalTotalRef` write/read during render → replaced with `useState` + conditional setState during render
- Zero lint errors, zero warnings
