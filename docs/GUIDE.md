# Shopby — Panduan Penggunaan Lengkap

**Landing Page Affiliate Shopee + Admin Panel Brutalist**

---

## Daftar Isi

1. [Memulai](#1-memulai)
2. [Storefront (Halaman Depan)](#2-storefront-halaman-depan)
3. [Admin Panel](#3-admin-panel)
4. [API Endpoints](#4-api-endpoints)
5. [Database & Seed Data](#5-database--seed-data)
6. [Kustomisasi](#6-kustomisasi)
7. [Deployment](#7-deployment)
8. [Pemecahan Masalah](#8-pemecahan-masalah)

---

## 1. Memulai

### 1.1 Prasyarat

- **Node.js** v18+
- **npm** atau **pnpm**
- **Git** (untuk cloning)

### 1.2 Instalasi

```bash
# Clone repositori
git clone https://github.com/bayy-kim/shopby.git
cd shopby

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

Edit file `.env` sesuai kebutuhan:

```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL=admin@shopby.com
ADMIN_PASSWORD_HASH=<scrypt-hash>
SESSION_SECRET=<random-32-char-min>
```

### 1.3 Setup Database & Seed

```bash
# Jalankan migrasi database
npx prisma migrate dev

# Seed dengan data contoh (4 kategori, 9 produk)
npx prisma db seed
```

### 1.4 Menjalankan Development Server

```bash
npm run dev
```

Buka **http://localhost:3000** di browser.

### 1.5 Scripts Penting

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Build production |
| `npm start` | Jalankan production build |
| `npm run lint` | Cek kode dengan ESLint |
| `npx prisma studio` | GUI database browser |
| `npx prisma db seed` | Isi ulang data awal |
| `npx prisma migrate dev` | Jalankan migration baru |

---

## 2. Storefront (Halaman Depan)

Halaman utama di **`/`** — landing page untuk menampilkan produk affiliate Shopee.

### 2.1 Struktur Halaman

```
┌─────────────────────────────────────────────────┐
│ NAVBAR (fixed top)                              │
│ Shopby    [Deals] [Kategori] [Affiliate] [Masuk]│
├─────────────────────────────────────────────────┤
│ HERO SECTION                                    │
│ "Belanja Cerdas, Struk Berkualitas"             │
│ [Lihat Semua Deal]    [Card Produk Unggulan]    │
├─────────────────────────────────────────────────┤
│ KATEGORI (chip horizontal di mobile,            │
│ sidebar di desktop)                             │
│ [Semua] [Elektronik] [Fashion] [Rumah] [Cantik]│
├─────────────────────────────────────────────────┤
│ REKOMENDASI HARI INI (featured products)        │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│ │ Keyboard│ │ Tumbler │ │ Watch   │            │
│ │ Rp450rb │ │ Rp120rb │ │ Rp899rb │            │
│ └─────────┘ └─────────┘ └─────────┘            │
├─────────────────────────────────────────────────┤
│ SEMUA PRODUK                                    │
│ [Terbaru▼] [Termurah] [Termahal]   12 produk    │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                    │
│ │ P1 │ │ P2 │ │ P3 │ │ P4 │                    │
│ └────┘ └────┘ └────┘ └────┘                    │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                    │
│ │ P5 │ │ P6 │ │ P7 │ │ P8 │                    │
│ └────┘ └────┘ └────┘ └────┘                    │
│ [Muat Lebih Banyak ▼]                          │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
│ Shopby — Shopee Affiliate Partner               │
│ [Tentang] [Privasi] [Syarat] [Kontak]          │
└─────────────────────────────────────────────────┘
```

### 2.2 Navbar

**File:** `src/components/layout/Navbar.tsx`

Navigasi sticky di atas halaman dengan:

- **Logo "Shopby"** — teks merah, font sans-serif bold
- **Link Desktop:** Deals (active/border-bottom), Kategori, Affiliate
- **Tombol "Masuk"** — merah dengan efek bayangan brutalist, mengarah ke `/admin/login`

> 💡 Link Deals, Kategori, Affiliate saat ini belum memiliki halaman tujuan (href="#" placeholder). Hanya "Masuk" yang berfungsi penuh.

### 2.3 Hero Section

**File:** `src/components/sections/Hero.tsx`

Bagian hero dengan:

- **Headline:** "Belanja Cerdas, Struk Berkualitas"
- **Subtitle:** "Koleksi produk Shopee Affiliate pilihan..."
- **Tombol "Lihat Semua Deal"** — scroll halus ke bagian produk
- **2 Kartu Produk Unggulan** — bergaya struk/nota dengan efek scan-line, diputar (rotate), menampilkan:
  - Gambar produk
  - Nama kategori
  - Nama produk
  - Harga (format "Rp450k")
  - Ikon panah sebagai CTA

Produk yang tampil berasal dari props `featuredProducts` (produk dengan `isFeatured = true`). Jika kosong, fallback ke data hardcoded (Mechanical Keyboard Pro & Steel Tumbler).

### 2.4 Filter Kategori

**File:** `src/components/sections/CategoryFilter.tsx`

Dua varian tergantung ukuran layar:

#### Mobile: Chips (Horizontal Scroll)

```
[🔲 Semua] [💻 Elektronik] [👕 Fashion] [🏠 Rumah Tangga] [✨ Kecantikan]
 ← scroll →
```

- Chip aktif berwarna kuning (`bg-[#fdc73a]`)
- Masing-masing kategori punya ikon Lucide unik

#### Desktop: Sidebar

```
┌─ Kategori ─────────────┐
│ 🔲 Semua               │ ← aktif = kuning
│ 💻 Elektronik          │
│ 👕 Fashion             │
│ 🏠 Rumah Tangga       │
│ ✨ Kecantikan          │
└────────────────────────┘
```

- Sticky di sisi kiri layar
- Header "Kategori" dengan garis dekoratif

**Pemetaan Ikon per Kategori:**

| Slug | Ikon |
|---|---|
| `semua` | `LayoutGrid` |
| `elektronik` | `Laptop` |
| `fashion` | `Shirt` |
| `rumah-tangga` | `Home` |
| `kecantikan` | `Sparkles` |

### 2.5 Grid Produk & Sorting

**File:** `src/components/sections/ProductGrid.tsx`

#### Sorting

| Tombol | Nilai | Ikon |
|---|---|---|
| Terbaru | `newest` | `ArrowUpDown` |
| Termurah | `price_asc` | `ArrowUp` |
| Termahal | `price_desc` | `ArrowDown` |

Sortir aktif mendapat gaya tebal + warna.

#### Rekomendasi Hari Ini (Featured)

Grid 3 kolom dengan varian `highlight`:
- Background merah, teks putih
- Badge "HOT DEALS"
- Tombol "Beli di Shopee"

#### Semua Produk

Grid 4 kolom dengan varian `compact`:
- Gaya kartu struk dengan clip-path
- Gambar, nama produk, harga (via `formatPrice`)
- Tombol "Beli"

#### Load More

- Tombol "Muat Lebih Banyak" di bagian bawah
- Memuat 8 produk per klik
- Hilang jika semua produk sudah tampil

#### Animasi

- Framer Motion stagger fade-up (delay 0.08s per kartu)
- Durasi 0.5s, easeOut, translateY dari 30px

#### State Handling

| State | Tampilan |
|---|---|
| **Loading awal** | 8 skeleton + 3 skeleton featured dengan efek pulse |
| **Error** | Pesan "Gagal memuat produk. Coba refresh halaman." |
| **Empty (kategori tanpa produk)** | Ikon `PackageOpen` + "Tidak Ada Produk" + tombol reset |
| **Has more** | Tombol "Muat Lebih Banyak" |
| **No more** | (tidak ada tombol) |

### 2.6 Kartu Produk

**File:** `src/components/sections/ProductCard.tsx`

Dua varian:

#### `highlight`
- Background merah (`bg-primary`)
- Menampilkan kategori
- Tombol "Beli di Shopee" dengan ikon `ExternalLink`
- Badge Harga lebih besar

#### `compact`
- Background abu-abu (`bg-muted`)
- Tanpa kategori
- Tombol "Beli" lebih kecil
- Harga dalam format standar

**Respon Klik:** Memanggil `logClick(productId)` → `POST /api/click` → buka URL Shopee di tab baru.

### 2.7 Footer

**File:** `src/components/layout/Footer.tsx`

- Nama brand dan deskripsi "Shopee Affiliate Partner"
- Copyright
- Link: Tentang Kami, Kebijakan Privasi, Syarat & Ketentuan, Hubungi Kami

---

## 3. Admin Panel

Area admin dilindungi oleh **middleware auth** — akses langsung ke route `/admin/*` tanpa login akan di-redirect ke halaman login.

### 3.1 Alur Autentikasi

```
[User] → akses /admin/products
         ↓
    [middleware.ts] → cek cookie "shopby_admin_session"
         ↓                           ↓
    tidak ada/expired            valid → lanjut ke halaman
         ↓
    redirect ke /admin/login
         ↓
    [Login Page] → input email & password
         ↓
    POST /api/admin/login
         ↓
    valid? → set cookie HttpOnly → redirect ke /admin
    salah? → tampilkan error, tetap di login
```

#### Detail Autentikasi

- **Single Admin:** Email dan password hash berasal dari `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`)
- **Password Hashing:** Node.js `crypto.scryptSync` dengan salt 16-byte, stored sebagai `salt:derivedKey` (base64)
- **Session JWT:** `jose` library, algoritma HS256, payload `{ role: "admin" }`, expiry 24 jam
- **Cookie:** Nama `shopby_admin_session`, HttpOnly, Secure (production), SameSite=Lax, path=/admin, maxAge 86400s
- **Middleware:** Edge runtime, matcher `["/admin/:path*"]`, mengecualikan `/admin/login` dari proteksi

#### Credential Default (Development)

| Field | Value |
|---|---|
| Email | `admin@shopby.com` |
| Password | `admin123` |

### 3.2 Halaman Login

**Route:** `/admin/login`  
**File:** `src/app/admin/login/page.tsx`

Form login bergaya struk/nota dengan:
- Logo struk (`Receipt` icon)
- Headline "SHOPBY ADMIN" + subtitle "SYS_AUTH_REQ // SECURE_PORTAL"
- Input **Email** (dengan ikon `Mail`)
- Input **Password** (dengan ikon `Lock`)
- Tombol **"AUTHORIZE_LOGIN"** — merah dengan efek press
- **Loading state:** Tombol berubah jadi spinner `Loader2` + teks "AUTHORIZING..."
- **Error state:** Pesan error merah di atas tombol (misal "Email atau password salah")
- Link "Forgot Passcode?" (dekoratif)
- Link "Return to Storefront" → kembali ke `/`
- Dekorasi lubang struk di bagian bawah

### 3.3 Dashboard Layout

**File:** `src/app/admin/(dashboard)/layout.tsx`

Layout bersama untuk semua halaman admin dengan:

#### Desktop Sidebar

```
┌──────────────────────┐
│ 🔲 Shopby Admin      │
│    Affiliate Portal   │
├──────────────────────┤
│ 📊 Dashboard         │ ← aktif = kuning
│ 📈 Analytics         │
│ 📦 Products          │
│ ⚙️ Settings          │
│                      │
│ ─────────────────── │
│ 🌐 View Storefront  │
│ ❓ Help              │
│ 🚪 Logout            │ ← merah
└──────────────────────┘
```

- Sticky, tinggi penuh
- Link aktif punya background kuning + border kiri merah
- "Logout" → POST `/api/admin/logout` → redirect ke `/admin/login`

#### Top Navbar

```
[☰] Shopby         🔍 Search...     🔔 ❓ [Profile A]
```

- Mobile: hamburger menu toggle
- Desktop: search input (dekoratif, tidak berfungsi)
- Notifikasi: ikon bell dengan dot merah
- Profile: avatar lingkaran dengan inisial "A"

#### Mobile Sidebar

- Overlay full-screen saat hamburger diklik
- Sama seperti sidebar desktop
- Tutup otomatis saat link diklik

### 3.4 Halaman Dashboard

**Route:** `/admin`  
**File:** `src/app/admin/(dashboard)/page.tsx`

Halaman utama admin dengan data statis (hardcoded):

#### Header
- Judul "Dashboard"
- Info "Laporan per 30 Juni 2026"
- Tombol "Last 30 Days" (dekoratif)

#### Statistik (4 Kartu)

| Metrik | Nilai | Tren |
|---|---|---|
| Total Sales | $24,590 | +12.5% (hijau) |
| Active Links | 142 | Across 5 platforms |
| Total Clicks | 89.2K | +5.2% (hijau) |
| Est. Commission | $3,420 | Pending payout |

#### Grafik Sales Performance
- SVG inline line chart (Mon–Sat, 6 titik data)
- Sumbu Y: revenue ($0–$8,000)
- Garis merah dengan area fill transparan

#### Recent Activity
Tabel 3 baris dengan data contoh:

| Product | Clicks | Status |
|---|---|---|
| Mechanical Keyboard Pro | 1,284 | Active (hijau) |
| Smartwatch Series X | 892 | Active (hijau) |
| Minimalist Leather Wallet | 456 | Ended (abu-abu) |

### 3.5 Halaman Analytics

**Route:** `/admin/analytics`  
**File:** `src/app/admin/(dashboard)/analytics/page.tsx`

#### Header
- "Analytics Overview"
- Tanggal "Jan 01, 2026 - Jun 30, 2026"
- Filter: Last 7 Days, Last 30 Days (active), This Month, Year to Date

#### Metrik (4 Kartu)

| Metrik | Nilai | Perubahan |
|---|---|---|
| Total Revenue | Rp 15.400 | +12% (hijau) |
| Avg Order Value | Rp 245.000 | 0% (abu-abu) |
| Conversion Rate | 4.2% | +0.5% (hijau) |
| Bounce Rate | 28.5% | -2.1% (hijau) |

#### Clicks vs Conversions
- Bar chart per hari (7 hari: Sen–Min)
- Bar merah = clicks, bar kuning = conversions
- Data contoh (range clicks 10rb–18rb, conversions 400–1.1rb)

#### Top Traffic Sources

| Source | Persentase | Progress Bar |
|---|---|---|
| Instagram | 45% | ██████████░░ |
| TikTok | 30% | ██████░░░░░░ |
| Direct | 15% | ███░░░░░░░░░ |
| Twitter | 10% | ██░░░░░░░░░░ |

#### Geographic Data

| Kota | Users |
|---|---|
| Jakarta | 12,450 |
| Surabaya | 8,230 |
| Bandung | 5,670 |
| Medan | 3,890 |

### 3.6 Halaman Add New Product Link

**Route:** `/admin/products/new`  
**File:** `src/app/admin/(dashboard)/products/new/page.tsx`

Form untuk menambahkan product link affiliate baru dengan gaya receipt/nota.

#### Image Upload

Fitur upload gambar dengan dua metode:

1. **Drag & Drop** — Seret file gambar ke area upload
2. **Click to Browse** — Klik area upload untuk membuka file dialog

**Spesifikasi:**
- Format: semua format gambar (PNG, JPG, WEBP, dll)
- Ukuran maks: 5MB
- Validasi: hanya file gambar yang diterima (cek `file.type`)
- Preview: tampilkan gambar dengan gradient overlay + nama file
- Remove: tombol "Remove" untuk menghapus dan mengganti gambar

**Tampilan Upload:**
```
┌─ Upload Product Image ─────────────────┐
│                                        │
│           [Upload Icon]                │
│     Upload Product Image               │
│  Drag & drop or click to browse        │
│           (max 5MB)                    │
│                                        │
└────────────────────────────────────────┘
```

**Tampilan Preview:**
```
┌─ Gambar ───────────────────────────────┐
│ [████████████████████████████████]      │
│ [███████ Gambar Produk █████████]      │
│ [████████████████████████████████]      │
│ [██ gradient overlay █████████████]     │
├────────────────────────────────────────┤
│ 🖼️ product-image.jpg      [Remove] 🔴 │
└────────────────────────────────────────┘
```

#### Form Fields

| Field | Tipe | Placeholder |
|---|---|---|
| Product Image | Upload (drag & drop / click) | — |
| Product Name | Text | `e.g. Ergonomic Desk Chair V2` |
| Category | Select | Electronics, Fashion, Home, Beauty |
| Affiliate Link | URL | `https://shopee.co.id/...` |
| Price (IDR) | Text with "Rp" prefix | `1.250.000` |
| Status | Toggle switch | Active / Inactive |

#### Tombol Aksi

| Tombol | Fungsi |
|---|---|
| **Create Product Link** (merah) | Simpan → toast "Product link created successfully!" (3 detik) |
| **Cancel** | `router.back()` kembali ke halaman sebelumnya |

### 3.7 Halaman Products

**Route:** `/admin/products`  
**File:** `src/app/admin/(dashboard)/products/page.tsx`

#### Fitur

| Fitur | Keterangan |
|---|---|
| **Tambah Produk** | Tombol "Add New Link" → `/admin/products/new` |
| **Filter Kategori** | Chips: All, Electronics, Fashion, Home, Beauty |
| **Sort** | Tombol dekoratif (belum berfungsi) |
| **Search** | Input dekoratif untuk mobile |
| **Tabel Produk** | 3 baris data contoh |
| **Pagination** | "Showing 1-3 of 24 items" + page numbers |

#### Tabel Produk

| Kolom | Isi |
|---|---|
| Product | Gambar thumbnail + nama + ID produk |
| Category | Badge kategori |
| Price | Format Rp (contoh: Rp450.000) |
| Commission | Persentase (contoh: 8%) |
| Status | Badge Active (hijau) / Out of Stock (merah) |
| Actions | Copy Link (ikon `Copy`), Edit (ikon `Edit` → `/admin/products/[id]`), Delete (ikon `Trash2`) |

#### Data Contoh (3 Produk)

| Produk | Kategori | Harga | Komisi | Status |
|---|---|---|---|---|
| Mechanical Keyboard Pro | Electronics | Rp450.000 | 8% | Active |
| Smartwatch Series X | Electronics | Rp899.000 | 10% | Active |
| Minimalist Leather Wallet | Fashion | Rp250.000 | 12% | Out of Stock |

### 3.7 Halaman Edit Produk

**Route:** `/admin/products/[id]`  
**File:** `src/app/admin/(dashboard)/products/[id]/page.tsx`

#### Form

| Field | Tipe | Default |
|---|---|---|
| Item No. | Read-only text | `#PRD-90210-XYZ` |
| Product Name | Text input | "Ergonomic Desk Chair V2" |
| Category | Select | Furniture, Electronics, Apparel, Rumah Tangga |
| Affiliate Link | URL input | `https://shopby.com/ref/8923a` |
| Price | Text with "Rp" prefix | "1.250.000" |
| Status | Toggle switch | Active (hijau) / Inactive (merah) |

#### Tombol Aksi

| Tombol | Fungsi |
|---|---|
| **Save Changes** (merah) | Simpan → tampilkan toast "Success! Product has been saved." (auto-hilang 3 detik) |
| **Discard Edits** | `router.back()` kembali ke halaman sebelumnya |

#### Toast Notification

Popup kuning di bagian atas: "Success! Product has been saved." — hilang otomatis setelah 3 detik.

### 3.8 Halaman Settings

**Route:** `/admin/settings`  
**File:** `src/app/admin/(dashboard)/settings/page.tsx`

#### Tabs

| Tab | Status |
|---|---|
| General | Dekoratif (tidak aktif) |
| Storefront | Aktif (default) |
| Payouts | Dekoratif |
| Account | Dekoratif |

#### Storefront Settings

| Field | Tipe | Default |
|---|---|---|
| Store Name | Text | "Shopby Affiliate Store" |
| Store URL | Text (read-only) | `shopby.io/[username]` |
| Bio | Textarea (3 baris) | "Kurator produk..." |
| Logo | Upload area (drag & drop) | Placeholder dengan ikon `Upload` |
| Primary Color | 3 pilihan warna | Red (active), Black, Yellow |

#### Payout Information

| Field | Tipe | Default |
|---|---|---|
| Bank Name | Text | "BCA" |
| Account Number | Text | "1234-5678-9012" |
| Account Holder Name | Text | "JOHN DOE" |
| Min. Payout Threshold | Display | "Rp 100.000" |

#### Security

| Fitur | Tipe | Default |
|---|---|---|
| Change Password | Link | Dekoratif |
| Auto-Payouts | Toggle | ON (default) |
| Two-Factor Auth | Toggle | OFF (default) |

#### Tombol Aksi

| Tombol | Fungsi |
|---|---|
| **Discard** | Reset form (dekoratif) |
| **Save Changes** | Simpan (dekoratif) |

---

## 4. API Endpoints

### 4.1 Autentikasi Admin

#### POST /api/admin/login

Login admin, mengembalikan session cookie.

**Request Body:**
```json
{
  "email": "admin@shopby.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{ "success": true }
```
Set cookie: `shopby_admin_session=<JWT>; HttpOnly; Secure; SameSite=Lax; Path=/admin; Max-Age=86400`

**Response (400):**
```json
{ "error": "Email dan password harus diisi" }
```

**Response (401):**
```json
{ "error": "Email atau password salah" }
```

#### POST /api/admin/logout

Menghapus session cookie.

**Response (200):**
```json
{ "success": true }
```
Set cookie: `shopby_admin_session=; Max-Age=0`

### 4.2 Produk

#### GET /api/products

Mengambil daftar produk.

**Query Parameters:**

| Parameter | Tipe | Default | Deskripsi |
|---|---|---|---|
| `category` | string | — | Slug kategori untuk filter |
| `sort` | string | `"newest"` | Urutan: `newest`, `price_asc`, `price_desc` |

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx...",
      "name": "Mechanical Keyboard Pro",
      "price": 450000,
      "discountPct": null,
      "imageUrl": "https://picsum.photos/...",
      "imageAlt": "Mechanical Keyboard Pro",
      "shopeeUrl": "https://shopee.co.id/...",
      "categoryId": "clx...",
      "isFeatured": true,
      "createdAt": "2026-07-19T...",
      "category": { "id": "clx...", "name": "Elektronik", "slug": "elektronik" },
      "_count": { "clicks": 5 }
    }
  ],
  "total": 9
}
```

### 4.3 Kategori

#### GET /api/categories

Mengambil daftar kategori (urut A-Z).

**Response (200):**
```json
{
  "data": [
    { "id": "clx...", "name": "Elektronik", "slug": "elektronik" },
    { "id": "clx...", "name": "Fashion", "slug": "fashion" },
    { "id": "clx...", "name": "Kecantikan", "slug": "kecantikan" },
    { "id": "clx...", "name": "Rumah Tangga", "slug": "rumah-tangga" }
  ],
  "total": 4
}
```

### 4.4 Click Tracking

#### POST /api/click

Mencatat klik produk dan mengembalikan URL Shopee.

**Request Body:**
```json
{
  "productId": "clx..."
}
```

**Response (200):**
```json
{
  "shopeeUrl": "https://shopee.co.id/..."
}
```

**Response (400):**
```json
{ "error": "Product ID is required" }
```

**Response (404):**
```json
{ "error": "Product not found" }
```

---

## 5. Database & Seed Data

### 5.1 Skema Database (SQLite)

#### Product

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | String (CUID) | Primary key |
| `name` | String | Nama produk |
| `price` | Int | Harga dalam Rupiah (tanpa desimal) |
| `discountPct` | Int? | Persentase diskon (nullable) |
| `imageUrl` | String | URL gambar produk |
| `imageAlt` | String | Teks alternatif gambar |
| `shopeeUrl` | String | URL affiliate Shopee |
| `categoryId` | String | Foreign Key → Category |
| `isFeatured` | Boolean | Flag produk unggulan |
| `createdAt` | DateTime | Waktu dibuat |

#### Category

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | String (CUID) | Primary key |
| `name` | String | Nama kategori |
| `slug` | String (unique) | Slug URL-friendly |

#### ClickLog

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | String (CUID) | Primary key |
| `productId` | String | Foreign Key → Product |
| `clickedAt` | DateTime | Waktu klik |

### 5.2 Seed Data (9 Produk)

#### Elektronik

| Produk | Harga | Featured |
|---|---|---|
| Mechanical Keyboard Pro | Rp450.000 | ✅ |
| Smartwatch Series X | Rp899.000 | ✅ |
| Matte Desk Lamp | Rp185.000 | ❌ |
| TWS Earbuds Pro | Rp420.000 | ❌ |

#### Fashion

| Produk | Harga | Featured |
|---|---|---|
| Minimalist Leather Wallet | Rp250.000 | ❌ |
| Canvas Heavy Tote | Rp95.000 | ❌ |

#### Rumah Tangga

| Produk | Harga | Featured |
|---|---|---|
| Steel Tumbler 500ml | Rp120.000 | ✅ |
| Ceramic Pour Over Set | Rp320.000 | ❌ |

#### Kecantikan

| Produk | Harga | Featured |
|---|---|---|
| Hydrating Serum | Rp150.000 | ❌ |

### 5.3 Menambahkan Data Sendiri

**Cara 1: Via Prisma Studio (GUI)**

```bash
npx prisma studio
```
Buka http://localhost:5555, tambah/edit data visual.

**Cara 2: Via Seed Script**

Edit `prisma/seed.ts`, tambahkan entry ke array `products`, lalu:
```bash
npx prisma db seed
```

**Cara 3: Via API (jika sudah ada)**

Gunakan endpoint `POST /api/products` (perlu implementasi CRUD admin terlebih dahulu).

---

## 6. Kustomisasi

### 6.1 Tema & Warna

Semua tema dikelola di `src/app/globals.css`:

```css
:root {
  --primary: #FF4D2D;       /* Merah utama */
  --secondary: #FFC93C;     /* Kuning aksen */
  --bg: #FAFAF7;            /* Background krem */
  --ink: #17161C;           /* Teks utama */
  --border-color: #E5E1D8;  /* Border */
}
```

Mode gelap (dark mode) via `prefers-color-scheme: dark`:

```css
.dark {
  --primary: #FF4D2D;
  --bg: #17161C;
  --ink: #FAFAF7;
}
```

### 6.2 Font

- **Plus Jakarta Sans** — font utama (body, headings) — Google Fonts
- **JetBrains Mono** — font mono (label, kode) — Google Fonts

Diatur di `src/app/layout.tsx` via `next/font/google`.

### 6.3 Komponen UI

Komponen shadcn/ui yang tersedia di `src/components/ui/`:

| Komponen | File | Variants |
|---|---|---|
| Button | `button.tsx` | default, outline, secondary, ghost, destructive, link |
| Card | `card.tsx` | default, sm |
| Badge | `badge.tsx` | default, secondary, destructive, outline, ghost, link |
| Skeleton | `ProductCardSkeleton.tsx` | highlight, compact |
| EmptyState | `EmptyState.tsx` | — |

### 6.4 Utility Classes (CSS Kustom)

| Class | Efek |
|---|---|
| `.brutalist-border` | Border 1px solid `#E5E1D8` |
| `.brutalist-dashed` | Border bottom dashed |
| `.brutalist-shadow` | Shadow 4px 4px 0 hitam + efek press |
| `.receipt-card` | Card putih dengan border + hover lift |
| `.receipt-hole` | Lingkaran 12px dekoratif |
| `.scan-line` | Animasi scan garis horizontal |
| `.clip-tag` | Clip-path diagonal |
| `.hero-scan-line` | Animasi scan untuk hero section |

### 6.5 Konfigurasi Next.js

Di `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "lh3.googleusercontent.com" }
  ]
}
```

Untuk menambahkan domain gambar lain, tambahkan entry ke `remotePatterns`.

### 6.6 Environment Variables

| Variabel | Wajib | Deskripsi |
|---|---|---|
| `DATABASE_URL` | ✅ | Koneksi database (SQLite: `file:./dev.db`, Postgres: `postgresql://...`) |
| `ADMIN_EMAIL` | ✅ | Email admin untuk login |
| `ADMIN_PASSWORD_HASH` | ✅ | Hash password (scrypt: `salt:key` base64) |
| `SESSION_SECRET` | ✅ | Secret JWT minimal 32 karakter |

#### Generate Password Hash

```bash
node -e "
const {scryptSync,randomBytes}=require('crypto');
const s=randomBytes(16).toString('base64');
const k=scryptSync('your-password',s,64).toString('base64');
console.log(s+':'+k);
"
```

#### Generate Session Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 7. Deployment

### 7.1 Deploy ke Vercel

```bash
# 1. Push ke GitHub
git add .
git commit -m "ready to deploy"
git push

# 2. Import di Vercel
# Buka https://vercel.com → Add New Project → Import repositori GitHub

# 3. Set Environment Variables di Vercel:
#    - DATABASE_URL: Postgres URL (contoh: Neon.tech)
#    - ADMIN_EMAIL: admin@shopby.com
#    - ADMIN_PASSWORD_HASH: <scrypt-hash>
#    - SESSION_SECRET: <random-32-char>

# 4. Deploy
# Vercel auto-deploy setiap push ke main
```

### 7.2 Database Production

Ganti `DATABASE_URL` di environment Vercel dengan Postgres:

```
DATABASE_URL="postgresql://user:password@host:5432/shopby?sslmode=require"
```

**Opsions Provider Postgres Gratis:**
- [Neon](https://neon.tech) — serverless Postgres
- [Supabase](https://supabase.com) — Postgres + auth
- [Railway](https://railway.app) — Postgres managed

Setelah ganti database, jalankan migrasi:
```bash
npx prisma migrate deploy
npx prisma db seed
```

### 7.3 Checklist Pre-Deploy

- [ ] Semua environment variables ter-set
- [ ] Database URL mengarah ke Postgres (bukan SQLite)
- [ ] Migrasi sudah dijalankan di database production
- [ ] `SESSION_SECRET` unik dan kuat
- [ ] `ADMIN_PASSWORD_HASH` menggunakan password yang kuat
- [ ] Images domain sudah ditambahkan di `next.config.ts`

---

## 8. Pemecahan Masalah

### 8.1 Masalah Development

| Masalah | Solusi |
|---|---|
| **Port 3000 sudah dipakai** | `npm run dev -- -p 3001` |
| **Database error** | Hapus `prisma/dev.db` lalu `npx prisma migrate dev && npx prisma db seed` |
| **Prisma client error** | `npx prisma generate` |
| **Module not found** | `npm install` |
| **Cookie tidak terset** | Pastikan `SESSION_SECRET` terisi di `.env` |

### 8.2 Masalah Auth

| Masalah | Solusi |
|---|---|
| **Gagal login** | Cek `ADMIN_EMAIL` dan `ADMIN_PASSWORD_HASH` di `.env` |
| **Terus redirect ke login** | Hapus cookie `shopby_admin_session` di browser, atau klik Logout |
| **"Email atau password salah"** | Verifikasi hash password cocok dengan yang di `.env` |
| **Session expired** | Login ulang (session berlaku 24 jam) |

### 8.3 Masalah Database

| Masalah | Solusi |
|---|---|
| **Prisma migrate error** | Hapus folder `prisma/migrations` dan file `prisma/dev.db`, lalu `npx prisma migrate dev --name init` |
| **Seed error** | Pastikan tidak ada data duplikat (seed upsert berdasarkan slug/ID) |
| **Data tidak muncul** | Buka `npx prisma studio` untuk verifikasi data |

### 8.4 Masalah Build

| Masalah | Solusi |
|---|---|
| **Build error** | `npm run build` untuk lihat error detail |
| **Edge runtime error** | Pastikan `middleware.ts` hanya import dari `@/lib/auth` (jose), bukan `auth-password.ts` (crypto) |
| **TypeScript error** | `npx tsc --noEmit` untuk cek error tipe |
| **Image not loading** | Pastikan domain ada di `next.config.ts` → `images.remotePatterns` |

---

## Lampiran

### A. Struktur File Lengkap

```
shopby/
├── middleware.ts                    # Edge auth guard
├── next.config.ts                  # Next.js config
├── package.json                    # Dependencies & scripts
├── components.json                 # Shadcn/ui config
├── .env.example                    # Template environment
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── seed.ts                     # Seed data (4 kategori, 9 produk)
│   ├── dev.db                      # SQLite database (local)
│   └── migrations/                 # Database migrations
├── public/                         # Static assets
├── design/                         # Referensi desain UI
├── docs/                           # Dokumentasi
│   ├── README.md                   # README utama
│   ├── SAR.md                      # Software Architecture Review
│   ├── PRD.md                      # Product Requirements Document
│   ├── project-reference.md        # Referensi teknis
│   └── GUIDE.md                    # [INI] Panduan penggunaan
└── src/
    ├── app/
    │   ├── layout.tsx              # Root layout + fonts
    │   ├── page.tsx                # Storefront homepage
    │   ├── providers.tsx           # TanStack Query provider
    │   ├── globals.css             # Tailwind v4 + tema + utilities
    │   ├── admin/
    │   │   ├── login/page.tsx      # Halaman login admin
    │   │   └── (dashboard)/
    │   │       ├── layout.tsx      # Sidebar + navbar admin
    │   │       ├── page.tsx        # Dashboard utama
    │   │       ├── analytics/page.tsx
    │   │       ├── products/
    │   │       │   ├── page.tsx          # Daftar produk
    │   │       │   └── [id]/page.tsx     # Edit produk
    │   │       └── settings/page.tsx
    │   └── api/
    │       ├── admin/
    │       │   ├── login/route.ts  # POST login
    │       │   └── logout/route.ts # POST logout
    │       ├── products/route.ts   # GET products
    │       └── categories/route.ts # GET categories
    │       └── click/route.ts      # POST click tracking
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx          # Navigasi utama
    │   │   └── Footer.tsx          # Footer
    │   ├── sections/
    │   │   ├── Hero.tsx            # Hero section
    │   │   ├── CategoryFilter.tsx  # Filter kategori (chips/sidebar)
    │   │   ├── ProductGrid.tsx     # Grid produk + sort + load more
    │   │   └── ProductCard.tsx     # Kartu produk (highlight/compact)
    │   └── ui/
    │       ├── ProductCardSkeleton.tsx
    │       ├── EmptyState.tsx
    │       ├── card.tsx
    │       ├── button.tsx
    │       └── badge.tsx
    ├── hooks/
    │   ├── useProducts.ts          # TanStack Query untuk produk
    │   └── useCategories.ts        # TanStack Query untuk kategori
    ├── lib/
    │   ├── auth.ts                 # JWT session (jose, edge-safe)
    │   ├── auth-password.ts        # Password scrypt (node crypto)
    │   ├── prisma.ts               # Prisma client singleton
    │   ├── utils.ts                # cn(), formatPrice()
    │   └── services/
    │       ├── products.ts         # fetchProducts()
    │       ├── categories.ts       # fetchCategories()
    │       └── click.ts            # logClick()
    └── types/
        └── index.ts                # Product, Category, ClickLog
```

### B. Alur Data Lengkap

```
[Browser]                            [Server]                        [Database]
    │                                    │                              │
    ├── GET / ──────────────────────────→│                              │
    │                                    ├── GET /api/categories ──────→│
    │                                    │←─── [{id,name,slug}] ───────┤
    │                                    ├── GET /api/products ────────→│
    │                                    │←─── [{id,name,price,...}] ───┤
    │←─── [HTML + Data] ────────────────┤                              │
    │                                    │                              │
    ├── Klik "Beli" ────────────────────→│                              │
    │    POST /api/click {productId}     ├── INSERT ClickLog ──────────→│
    │                                    │←─── {shopeeUrl} ─────────────┤
    │←─── {shopeeUrl} ──────────────────┤                              │
    ├── window.open(shopeeUrl) ─────────→│                              │
    │                                    │                              │
    ├── GET /admin/* (tanpa cookie) ────→│                              │
    │    [middleware] cek cookie ✗       │                              │
    │←─── 302 Redirect /admin/login ────┤                              │
    │                                    │                              │
    ├── POST /api/admin/login ──────────→│                              │
    │    {email, password}               ├── validateCredentials()      │
    │                                    │    ├── cek ADMIN_EMAIL       │
    │                                    │    ├── scrypt compare        │
    │                                    │    └── valid?               │
    │←─── Set-Cookie + {success} ───────┤                              │
    │                                    │                              │
    ├── GET /admin/* (dengan cookie) ───→│                              │
    │    [middleware] cek cookie ✓       │                              │
    │←─── 200 [Admin Page] ─────────────┤                              │
    │                                    │                              │
    ├── Klik Logout ────────────────────→│                              │
    │    POST /api/admin/logout          ├── Clear Cookie               │
    │←─── {success} + Cookie: maxAge=0 ─┤                              │
    └────────────────────────────────────┘                              │
```

### C. Tip & Trik

1. **Reset data ke awal:** Hapus `prisma/dev.db`, lalu `npx prisma migrate dev && npx prisma db seed`
2. **Lihat database langsung:** `npx prisma studio` — GUI browser di port 5555
3. **Test auth di development:** Buka `/admin/login`, login dengan `admin@shopby.com` / `admin123`
4. **Cek cookie session:** DevTools → Application → Cookies → cari `shopby_admin_session`
5. **Ganti password:** Generate hash baru dengan script di [6.6](#66-environment-variables), update `ADMIN_PASSWORD_HASH` di `.env`, restart dev server
6. **Tambah produk featured:** Di Prisma Studio, set kolom `isFeatured` ke `true`/`1`
7. **Nonaktifkan middleware auth (development):** Hapus/komentari `export const config` di `middleware.ts`
8. **Cek performa:** Build production dengan `npm run build && npm start`, jangan gunakan `npm run dev` untuk benchmark
