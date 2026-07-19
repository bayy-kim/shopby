# Shopby

Landing page pribadi untuk memajang produk-produk Shopee Affiliate, lengkap dengan filter kategori dan pencatatan klik sederhana. Dibangun dengan Next.js 15 + TypeScript.

## Struktur Folder

```
shopby/
├── app/                # Routing & pages (App Router)
├── components/
│   ├── ui/              # Komponen dasar shadcn/ui
│   └── sections/         # Hero, ProductGrid, CategoryFilter, Footer
├── lib/                 # Prisma client & helper functions
├── prisma/              # schema.prisma & seed data
├── types/               # Tipe TypeScript bersama
├── public/images/       # Aset gambar statis
├── PRD.md               # Dokumen kebutuhan produk
└── SAR.md               # Dokumen arsitektur sistem
```

## Getting Started

```bash
# 1. Clone repo
git clone <repo-url> shopby
cd shopby

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# isi DATABASE_URL sesuai environment (lihat tabel di bawah)

# 4. Migrasi database + seed data awal
npx prisma migrate dev
npx prisma db seed

# 5. Jalankan dev server
npm run dev
```

Buka `http://localhost:3000` di browser.

## Environment Variables

| Variable | Deskripsi | Contoh |
|---|---|---|
| `DATABASE_URL` | Koneksi database (SQLite lokal / Postgres production) | `file:./dev.db` |

## Scripts

| Command | Fungsi |
|---|---|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan hasil build |
| `npx prisma studio` | Buka GUI untuk lihat/edit data |

## Deploy ke Vercel

1. Push project ke GitHub.
2. Buka [vercel.com](https://vercel.com) → New Project → import repo.
3. Set environment variable `DATABASE_URL` (pakai Postgres, misal dari Neon) di Vercel dashboard.
4. Deploy. Setiap push ke branch `main` otomatis deploy ulang.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion
- Prisma ORM (SQLite dev / Postgres production)

## Dokumen Terkait

- [PRD.md](./PRD.md) — kebutuhan produk & fitur
- [SAR.md](./SAR.md) — arsitektur sistem & data model
