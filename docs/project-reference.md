# ShopBy — Next.js E-Commerce Storefront

A modern, high-performance e-commerce storefront built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Prisma ORM**.

---

## Architecture Overview

```
middleware.ts             # Edge middleware — auth guard for /admin-shopby/:path*, /api/stats/:path*, /api/analytics/:path*, /api/settings/:path*
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── layout.tsx        # Root layout (providers, fonts, globals, SEO)
│   ├── page.tsx          # Homepage
│   ├── sitemap.ts        # Auto-generated /sitemap.xml
│   ├── affiliate/        # Static pages
│   │   └── page.tsx      #   /affiliate  - Affiliate program info
│   ├── about/
│   │   └── page.tsx      #   /about      - About Shopby
│   ├── privacy/
│   │   └── page.tsx      #   /privacy    - Privacy policy
│   ├── terms/
│   │   └── page.tsx      #   /terms      - Terms & conditions
│   ├── contact/
│   │   └── page.tsx      #   /contact    - Contact form
│   ├── products/         # (tidak ada public product pages separately)
│   ├── categories/       # (tidak ada public category pages separately)
│   ├── admin/            # Admin pages (protected)
│   │   ├── error.tsx     #   Error boundary
│   │   ├── loading.tsx   #   Loading fallback
│   │   └── help/
│   │       └── page.tsx  #   /admin-shopby/help  - Admin Help Center
│   └── api/              # API route handlers
│       ├── admin/
│       │   ├── login/
│       │   │   └── route.ts   #   POST /api/admin-shopby/login
│       │   └── logout/
│       │       └── route.ts   #   POST /api/admin-shopby/logout
│       ├── products/
│       │   ├── route.ts  #   GET /api/products, POST /api/products (auth)
│       │   └── [id]/
│       │       └── route.ts  #   GET|PUT|DELETE /api/products/[id] (auth)
│       ├── categories/
│       │   └── route.ts  #   GET /api/categories
│       ├── stats/
│       │   └── route.ts  #   GET /api/stats (auth, from DB)
│       ├── analytics/
│       │   └── route.ts  #   GET /api/analytics (auth, from DB)
│   ├── settings/
│   │   └── route.ts  #   GET|PUT /api/settings (auth, via Prisma AppSetting)
│   ├── contact/
│   │   └── route.ts  #   POST /api/contact
│       └── click/
│           └── route.ts  #   POST /api/click  (analytics tracking)
├── components/           # Shared React components
│   ├── ui/               # Primitive UI components (shadcn-style)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   └── input.tsx
│   ├── layout/           # Layout components
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── product/          # Product-specific components
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   └── product-detail.tsx
│   ├── category/         # Category-specific components
│   │   ├── category-card.tsx
│   │   └── category-grid.tsx
│   └── shared/           # Shared utility components
│       ├── container.tsx
│       └── empty-state.tsx
├── hooks/                # Custom React hooks
│   ├── useProducts.ts    #   Product data fetching hook
│   └── useCategories.ts  #   Category data fetching hook
├── lib/                  # Core libraries & services
│   ├── auth.ts           #   JWT session token (jose) — edge-compatible
│   ├── auth-password.ts  #   Password hash/verify (Node crypto)
│   ├── prisma.ts         #   Prisma client singleton
│   ├── utils.ts          #   Shared utilities (cn, formatter)
│   └── services/         #   Data access layer / business logic
│       ├── products.ts   #   fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct
│       ├── categories.ts
│       ├── click.ts
│       ├── stats.ts      #   fetchStats, fetchAnalytics
│       └── settings.ts   #   getSettings, updateSettings
├── types/                # TypeScript type definitions
│   └── index.ts
└── styles/               # Global styles
    └── globals.css       #   Tailwind directives, CSS custom props
prisma/
├── schema.prisma         # Database schema
└── seed.ts               # Seed script (sample data)
public/                   # Static assets
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
| Database         | SQLite (local dev, `prisma/dev.db`) |
| Package Manager  | pnpm                               |

---

## Data Model (Prisma)

### Product
| Field        | Type         | Notes                        |
| ------------ | ------------ | ---------------------------- |
| `id`         | `String`     | Auto-generated CUID          |
| `name`       | `String`     | Product name                 |
| `price`      | `Int`        | Price in IDR (integer)       |
| `discountPct`| `Int?`       | Discount percentage (nullable)|
| `imageUrl`   | `String`     | Primary product image URL    |
| `imageAlt`   | `String`     | Alt text for product image   |
| `shopeeUrl`  | `String`     | Shopee affiliate link        |
| `categoryId` | `String`     | FK → Category                |
| `isFeatured` | `Boolean`    | Flag for homepage featured   |
| `createdAt`  | `DateTime`   | Auto-set                     |

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
| POST   | `/api/admin-shopby/login`    | —     | Authenticate admin, set session cookie  |
| POST   | `/api/admin-shopby/logout`   | —     | Clear session cookie                    |
| GET    | `/api/products`       | —     | List products (`?search=&category=&featured=true`) |
| POST   | `/api/products`       | Yes   | Create product                          |
| GET    | `/api/products/[id]`  | —     | Get single product by ID                 |
| PUT    | `/api/products/[id]`  | Yes   | Update product                          |
| DELETE | `/api/products/[id]`  | Yes   | Delete product                          |
| GET    | `/api/categories`     | —     | List categories (`?featured=true`)      |
| GET    | `/api/stats`          | Yes   | Dashboard stats (from DB)               |
| GET    | `/api/analytics`      | Yes   | Analytics data (from DB)                |
| GET    | `/api/settings`       | Yes   | Read settings (from JSON file)          |
| PUT    | `/api/settings`       | Yes   | Update settings (to JSON file)          |
| POST   | `/api/click`          | —     | Track product click (analytics)         |
| POST   | `/api/contact`        | —     | Submit contact form                     |

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

### 7. Simple CSS Approach
Instead of `tailwindcss-animate` (which is Tailwind v3 only), the codebase uses inline CSS transitions for animations in button and card components. This avoids dependency conflicts with Tailwind v4.

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

---

## Component Library (src/components/)

### UI Primitives (`src/components/ui/`)
- **button.tsx** — Variants: `default`, `secondary`, `outline`, `ghost`, `danger`; sizes: `sm`, `md`, `lg`; supports `asChild` via `Slot`
- **card.tsx** — `Card`, `CardHeader`, `CardContent`, `CardFooter` composition pattern
- **badge.tsx** — Variants: `default`, `secondary`, `outline`, `success`, `warning`, `danger`
- **skeleton.tsx** — Animated loading placeholder with shimmer
- **input.tsx** — Styled text input with focus ring

### Layout (`src/components/layout/`)
- **navbar.tsx** — Top navigation bar with logo (Next/Link), nav links (Products, Categories), mobile-responsive
- **footer.tsx** — Simple footer with copyright, links, and branding

### Feature Components
- **product-card.tsx** — Card with image, title, price, compare-at price, category badge, "View Details" link
- **product-grid.tsx** — Responsive CSS Grid layout for product cards (1–4 columns)
- **product-detail.tsx** — Full product page layout: image gallery, pricing, description, specs
- **category-card.tsx** — Card with image overlay, title, description, product count badge
- **category-grid.tsx** — Grid layout for category cards

---

## Custom Hooks

### `useProducts(params?: { category?: string; sort?: string; search?: string })`
- Calls `GET /api/products` with optional category, sort, search query params
- Returns `{ data, total, isLoading, error }` via TanStack Query `useQuery`

### `useCategories()`
- Calls `GET /api/categories`
- Returns `{ data, isLoading, error }` via TanStack Query `useQuery`

---

## Styling System

### Tailwind CSS v4
- Uses `@import "tailwindcss"` syntax (v4 style) in `globals.css`
- **No `tailwind.config.js`** — Tailwind v4 uses CSS-based configuration
- Custom CSS custom properties in `:root` for brand colors (cyan/teal palette)
- `dark` class support via `@variant dark`

### shadcn/ui Convention
Components follow shadcn/ui patterns:
- `cn()` utility from `clsx` + `tailwind-merge`
- `Slot` from `@radix-ui/react-slot` for polymorphic `asChild`
- `cva` (class-variance-authority) for component variants

---

## Styling Design System

### Color Palette
| Token              | Value         | Usage                    |
| ------------------ | ------------- | ------------------------ |
| `--color-primary`  | `#0891b2` (cyan-600) | Primary buttons, links, accents |
| `--color-secondary`| `#0d9488` (teal-600) | Secondary elements      |
| `--color-accent`   | `#06b6d4` (cyan-500) | Hover states, highlights |
| Background         | `#f8fafc` (slate-50)  | Page background          |
| Foreground         | `#0f172a` (slate-900) | Primary text             |

### Typography
- **Font Stack:** `Inter` (Google Fonts, variable weight) via next/font
- **Scale:** Uses Tailwind's default `text-sm`, `text-base`, `text-lg`, `text-2xl`, `text-3xl`, `text-4xl`

### Spacing & Layout
- **Max content width:** `1280px` with auto margins
- **Component spacing:** Tailwind's `space-y-*`, `gap-*` utilities
- **Page sections:** Top-level padding via `py-12` or `py-24`

### Component Variant Pattern
```ts
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline: "border border-input",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
      },
    },
  }
)
```

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
- **5 categories** (Electronics, Clothing, Home & Garden, Sports & Outdoors, Books & Media)
- **25 products** (5 per category) with realistic names, descriptions, prices, images, and tags

Run `pnpm prisma:seed` to populate the database.

---

## Page Routing Summary

| Route                    | Component / Type      | Data Source / Notes      |
| ------------------------ | --------------------- | ------------------------ |
| `/`                      | Server Component      | Featured products        |
| `/affiliate`             | Server Component      | Static content           |
| `/about`                 | Server Component      | Static content           |
| `/privacy`               | Server Component      | Static content           |
| `/terms`                 | Server Component      | Static content           |
| `/contact`               | Client Component      | Real form → POST `/api/contact` |
| `/products`              | —                     | Tidak ada — produk hanya di landing page & admin |
| `/categories`            | —                     | Tidak ada — kategori hanya terkait produk |
| `/admin-shopby/login`           | Client Component      | Login form → POST `/api/admin-shopby/login` |
| `/admin-shopby`                 | Client Component      | Dashboard — real stats from `/api/stats` |
| `/admin-shopby/products`        | Client Component      | Product table — fetch/delete via `/api/products` |
| `/admin-shopby/products/new`    | Client Component      | Add product — POST to `/api/products` |
| `/admin-shopby/products/[id]`   | Client Component      | Edit product — load via GET, save via PUT to `/api/products/[id]` |
| `/admin-shopby/analytics`       | Client Component      | Real data from `/api/analytics` |
| `/admin-shopby/settings`        | Client Component      | Read/write via `/api/settings` |
| `/admin-shopby/help`            | Client Component      | Admin Help Center       |
| `/sitemap.xml`           | Generated route       | Auto-generated from `sitemap.ts` |

---

## Notable Implementation Details

- **Price formatting:** `formatPrice()` utility returns `RpX.XXX` (IDR) string — handles large numbers with dot separators, konsisten di semua produk, analytics, dan dashboard. Didefinisikan di `@/lib/utils.ts`.
- **URL-safe slugs:** Categories use `slug` field generated from name via `.toLowerCase().replace(/\s+/g, '-')` in seed script
- **Image strategy:** Uses `https://picsum.photos` for seed placeholder images; real deployments should swap for a CDN or media service
- **Dashboard chart:** Revenue chart di admin dashboard merender data real dari `/api/analytics` — bukan mock data. Aggregasi revenue dari total nilai produk * klik per hari
- **Click analytics:** Logs to `ClickLog` table with product ID and timestamp
- **Empty states:** All listing pages handle zero-results gracefully with descriptive messages
- **Auth — edge-compatible JWT:** Middleware menggunakan `jose` library (bukan `jsonwebtoken`) karena Next.js middleware berjalan di Edge Runtime yang tidak support Node crypto untuk JWTs
- **Auth — password hashing tanpa bcryptjs:** Gunakan Node.js `crypto.scryptSync` + `timingSafeEqual` — 100% built-in, tanpa dependency tambahan
- **Auth — single admin credential:** Email dan password hash berasal dari `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`), bukan dari database — sesuai PRD yang hanya butuh 1 admin
- **Auth — session via HttpOnly cookie:** JWT disimpan di cookie `shopby_admin_session` dengan flag `HttpOnly`, `Secure` (prod), `SameSite=Lax`, `path=/admin-shopby` — expiry 24 jam
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
- **Performance — font-display: swap:** Konfigurasi `next/font` dengan `display: 'swap'` — teks tetap terlihat selama font加载, fallback font ditampilkan sementara
- **Performance — Next.js Image fill+sizes:** Gambar menggunakan `fill` prop dengan `sizes` attribute — responsive image loading, browser pilih ukuran optimal
- **Performance — lazy loading:** Komponen di bawah fold menggunakan `loading="lazy"` untuk native image lazy loading — non-critical images tidak blocking initial render
- **Error boundaries:** `src/app/admin-shopby/error.tsx` menangkap error di admin pages dengan fallback UI dan tombol retry; `src/app/admin-shopby/loading.tsx` menyediakan loading spinner global untuk admin section
