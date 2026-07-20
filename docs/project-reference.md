# ShopBy — Next.js E-Commerce Storefront

A modern, high-performance e-commerce storefront built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Prisma ORM**.

---

## Architecture Overview

```
middleware.ts             # Edge middleware — auth guard for /admin/*
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── layout.tsx        # Root layout (providers, fonts, globals)
│   ├── page.tsx          # Homepage
│   ├── products/         # Product listing & detail pages
│   │   ├── page.tsx      #   /products  - catalog listing
│   │   ├── [handle]/     #   /products/[handle]  - product detail
│   │   │   └── page.tsx
│   │   └── loading.tsx   #   Suspense fallback for product pages
│   ├── categories/       # Category listing & detail pages
│   │   ├── page.tsx      #   /categories
│   │   └── [handle]/     #   /categories/[handle]
│   │       └── page.tsx
│   └── api/              # API route handlers
│       ├── admin/
│       │   ├── login/
│       │   │   └── route.ts   #   POST /api/admin/login
│       │   └── logout/
│       │       └── route.ts   #   POST /api/admin/logout
│       ├── products/
│       │   ├── route.ts  #   GET /api/products
│       │   └── [id]/
│       │       └── route.ts  #   GET /api/products/[id]
│       ├── categories/
│       │   └── route.ts  #   GET /api/categories
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
│       ├── products.ts
│       ├── categories.ts
│       └── click.ts
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
| Framework        | Next.js 15.3.2 (App Router)        |
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
| `id`         | `String`     | Auto-generated UUID (CUID)   |
| `handle`     | `String`     | URL-friendly slug (unique)   |
| `title`      | `String`     | Product name                 |
| `description`| `String`     | Rich text / long description |
| `price`      | `Float`      | Price in base currency unit  |
| `compareAtPrice` | `Float?`| Original/comparison price    |
| `imageUrl`   | `String`     | Primary product image URL    |
| `images`     | `String` (JSON) | JSON array of additional image URLs |
| `categoryId` | `String`     | FK → Category                |
| `inStock`    | `Boolean`    | Stock availability flag      |
| `featured`   | `Boolean`    | Flag for homepage featured   |
| `tags`       | `String` (JSON) | JSON array of tags        |
| `createdAt`  | `DateTime`   | Auto-set                     |
| `updatedAt`  | `DateTime`   | Auto-updated                 |

**Relations:** `Product belongsTo Category` (required)

### Category
| Field        | Type         | Notes                        |
| ------------ | ------------ | ---------------------------- |
| `id`         | `String`     | Auto-generated UUID (CUID)   |
| `handle`     | `String`     | URL-friendly slug (unique)   |
| `title`      | `String`     | Category name                |
| `description`| `String?`    | Optional description         |
| `imageUrl`   | `String?`    | Optional category image      |
| `parentId`   | `String?`    | Self-referencing FK (nullable) |
| `order`      | `Int`        | Sort order                   |
| `createdAt`  | `DateTime`   | Auto-set                     |
| `updatedAt`  | `DateTime`   | Auto-updated                 |

**Relations:** `Category hasMany Product`, `Category belongsTo Category?` (self)

---

## API Routes

| Method | Route                 | Description                         |
| ------ | --------------------- | ----------------------------------- |
| POST   | `/api/admin/login`    | Authenticate admin, set session cookie |
| POST   | `/api/admin/logout`   | Clear session cookie                |
| GET    | `/api/products`       | List products (supports `?search=&category=&featured=true`) |
| GET    | `/api/products/[id]`  | Get single product by ID or handle  |
| GET    | `/api/categories`     | List categories (supports `?featured=true`) |
| POST   | `/api/click`          | Track product click (analytics)     |

---

## Key Design Decisions

### 1. Service Layer Pattern
Data access is abstracted behind service functions in `src/lib/services/`. Routes and pages always call services, never Prisma directly. This keeps business logic centralized and testable.

### 2. Server Components + Streaming
All pages are **React Server Components** by default. Product listing pages use `Suspense` boundaries with loading fallbacks for streaming. Data fetching uses Next.js extended `fetch` with `next: { revalidate }` for ISR.

### 3. Slug-Based Routing
Products and categories use URL-safe `handle` fields (derived from title) instead of raw IDs for public URLs. The API route for product detail accepts either ID or handle.

### 4. Click Tracking
A lightweight `click` event table logs product view interactions with IP and user agent for basic analytics. This is deliberately simple — a foundation for future analytics features.

### 5. Type Safety
All database types are exported from Prisma via a central `types/index.ts` that re-exports `Prisma.ProductGetPayload` and `Prisma.CategoryGetPayload` with specific include shapes, ensuring end-to-end type safety from DB to UI.

### 6. Null/Empty State Handling
Pages gracefully handle empty states: `empty-state.tsx` component provides descriptive fallback UI when no products or categories exist, and the `not-found` pattern renders a dedicated 404 page for invalid handles.

### 7. Simple CSS Approach
Instead of `tailwindcss-animate` (which is Tailwind v3 only), the codebase uses inline CSS transitions for animations in button and card components. This avoids dependency conflicts with Tailwind v4.

### 8. Single-Admin Auth (Stateless, Edge-Compatible)
Per PRD, Shopby hanya butuh **1 admin** (Bayu). Auth tidak menggunakan database/users table — credential berasal dari environment variable (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`). Password diverifikasi via Node `crypto.scryptSync` (built-in, zero dependency). Session dikelola via **JWT** (jose library, edge-compatible untuk middleware) yang disimpan di cookie HttpOnly. Middleware Next.js melindungi semua route `/admin/:path*` — akses tanpa session valid di-redirect ke `/admin/login`.

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

### `useProducts(params?: ProductSearchParams)`
- Calls `GET /api/products` with search, category, featured query params
- Returns `{ products, isLoading, error }` with `useEffect` + `useState`
- Filters out items missing required fields (`handle`, `title`, `imageUrl`)

### `useCategories(params?: { featured?: boolean })`
- Calls `GET /api/categories` with optional featured filter
- Returns `{ categories, isLoading, error }`

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
| `/products`              | Server Component      | `getProducts()`          |
| `/products/[handle]`     | Server Component      | `getProduct()`           |
| `/products/loading`      | Suspense fallback     | —                        |
| `/categories`            | Server Component      | `getCategories()`        |
| `/categories/[handle]`   | Server Component      | `getCategoryProducts()`  |
| `/admin/login`           | Client Component      | Login form → POST `/api/admin/login` |
| `/admin`                 | Client Component      | Dashboard (protected by middleware)  |
| `/admin/products`        | Client Component      | Product table (protected)            |
| `/admin/products/new`    | Client Component      | Add new product with image upload    |
| `/admin/products/[id]`   | Client Component      | Edit product (protected)             |
| `/admin/analytics`       | Client Component      | Analytics panel (protected)          |
| `/admin/settings`        | Client Component      | Settings page (protected)            |

---

## Notable Implementation Details

- **Price formatting:** `formatPrice()` utility returns `$X.XX` string (handles decimals, no trailing zeros for whole numbers)
- **URL-safe handles:** Generated from title via `.toLowerCase().replace(/\s+/g, '-')` in seed script
- **Image strategy:** Uses `https://picsum.photos` for seed placeholder images; real deployments should swap for a CDN or media service
- **Product detail route:** Accepts both `id` (CUID) and `handle` (slug) for flexibility
- **Click analytics:** Logs to `click` table with product ID, timestamp, IP, and user agent
- **Empty states:** All listing pages handle zero-results gracefully with descriptive messages
- **Auth — edge-compatible JWT:** Middleware menggunakan `jose` library (bukan `jsonwebtoken`) karena Next.js middleware berjalan di Edge Runtime yang tidak support Node crypto untuk JWTs
- **Auth — password hashing tanpa bcryptjs:** Gunakan Node.js `crypto.scryptSync` + `timingSafeEqual` — 100% built-in, tanpa dependency tambahan
- **Auth — single admin credential:** Email dan password hash berasal dari `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`), bukan dari database — sesuai PRD yang hanya butuh 1 admin
- **Auth — session via HttpOnly cookie:** JWT disimpan di cookie `shopby_admin_session` dengan flag `HttpOnly`, `Secure` (prod), `SameSite=Lax`, `path=/admin` — expiry 24 jam
- **Auth — logout:** Panggil `POST /api/admin/logout` → cookie langsung dihapus (maxAge=0), middleware otomatis redirect ke login
