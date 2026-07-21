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
│ NOTIFICATION BANNER (dismissible)               │
│ ⚠️ *harga bisa berubah kapan saja... [X]        │
├─────────────────────────────────────────────────┤
│ NAVBAR (fixed top)                              │
│ Shopby    [Deals] [Kategori] [Affiliate] [Masuk]│
├─────────────────────────────────────────────────┤
│ HERO SECTION                                    │
│ "Belanja Cerdas, Struk Berkualitas"             │
│ [Lihat Semua Deal]    [Card Produk Unggulan]    │
├─────────────────────────────────────────────────┤
│  ← BACKGROUND PUTIH FULL WIDTH →                │
│ ┌─────────────────────────────────────────────┐ │
│ │ sidebar   REKOMENDASI HARI INI (featured)   │ │
│ │ (desktop  ┌─────────┐ ┌─────────┐ ┌───────┐│ │
│ │  only)    │ Keyboard│ │ Tumbler │ │ Watch ││ │
│ │           │ Rp450rb  │ │ Rp120rb │ │Rp899rb││ │
│ │           └─────────┘ └─────────┘ └───────┘│ │
│ │           SEMUA PRODUK                      │ │
│ │           [Nomor] [Terbaru] [Termurah] ...  │ │
│ │           12 produk (default #1, #2, #3…)   │ │
│ │           [Semua] [Elektronik] [Fashion] →  │ │
│ │             (chips mobile di bawah heading) │ │
│ │           ┌────┐ ┌────┐ ┌────┐ ┌────┐      │ │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│ │ Keyboard│ │ Tumbler │ │ Watch   │            │
│ │ Rp450rb │ │ Rp120rb │ │ Rp899rb │            │
│ └─────────┘ └─────────┘ └─────────┘            │
├─────────────────────────────────────────────────┤
│           │ ┌────┐ ┌────┐ ┌────┐ ┌────┐       │ │
│           │ │ P5 │ │ P6 │ │ P7 │ │ P8 │       │ │
│           │ └────┘ └────┘ └────┘ └────┘       │ │
│           │ [Muat Lebih Banyak ▼]              │ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│ FEEDBACK SECTION                                │
│ "Saran & Masukan"                               │
│ [Nama] [Email] [Pesan...]            [Kirim]   │
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
- **Tombol "Masuk"** — (sudah dihapus dari navbar untuk keamanan — akses admin hanya via `/admin-shopby/login`)

> ✅ Semua link navbar (Deals, Kategori, Affiliate) kini mengarah ke halaman/ancor yang nyata. "Deals" scroll ke bagian produk, "Kategori" scroll ke filter kategori, "Affiliate" menuju `/affiliate`.

### 2.3 Hero Section

**File:** `src/components/sections/Hero.tsx`

Bagian hero dengan:

- **Headline:** "Belanja Cerdas, Struk Berkualitas"
- **Subtitle:** "Koleksi produk Shopee Affiliate pilihan..."
- **Tombol "Lihat Semua Deal"** — scroll halus ke bagian produk
- **Gallery Grid 4 Produk Unggulan** — grid 2 kolom dengan staggered layout via `GalleryGrid` + `GalleryGridCell` dari `@/components/blocks/cta-section-with-gallery`. Setiap cell menampilkan:
  - Gambar produk (cover, hover scale-110)
  - Gradient overlay (hitam transparan)
  - Nama kategori
  - Nama produk
  - Harga (format "Rp450k")
  - Ikon panah muncul saat hover
- Animasi: motion spring stagger (delay 0.2s per cell) + blur reveal

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
┌─ Kategori ─────────────────────────────┐
│ 🔲 Semua               │ ← aktif = kuning
│ 💻 Elektronik          │
│ 👕 Fashion             │
│ 🏠 Rumah Tangga       │
│ ✨ Kecantikan          │
├────────────────────────────────────────┤
│ Nomor Produk                           │
│ 🔲 Semua                               │
│ #1-100                                 │
│ #101-200                               │
│ ...                                    │
└────────────────────────────────────────┘
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
|---|---|---|---|---|
| Nomor (default) | `number_asc` | `ArrowUpDown` |
| Terbaru | `newest` | `ArrowUpDown` |
| Termurah | `price_asc` | `ArrowUp` |
| Termahal | `price_desc` | `ArrowDown` |
| Rating | `rating_desc` | `Star` |

Default sort adalah **Nomor** (#1, #2, #3…) — produk baru otomatis di ujung kanan. Sortir aktif mendapat gaya tebal + warna.

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
- Rating bintang desimal (contoh: ⭐ 4.9/5) dengan setengah bintang untuk nilai pecahan
- Tombol "Beli di Shopee" dengan ikon `ExternalLink`
- Badge Harga lebih besar

#### `compact`
- Background abu-abu (`bg-muted`)
- Tanpa kategori
- Rating bintang desimal ditampilkan jika > 0
- Tombol "Beli" lebih kecil
- Harga dalam format standar

**Star Rating Glossy Shine Animation:** Bintang pada kartu dengan rating > 4.5 mendapat efek `star-shine-high` — animate brightness (1.6x), saturate, dan drop-shadow dengan cycle 2s. Rating 4–4.5 mendapat efek `star-shine-mid` — brightness 1.3x, cycle 3s. Rating ≤ 4 tidak ada animasi. CSS-only via keyframes `star-glossy-high` / `star-glossy-mid` di `globals.css`. Hormati `prefers-reduced-motion: reduce` — animasi nonaktif otomatis.

**Nama Produk:** Nama > 60 karakter akan di-truncate dengan ellipsis + tombol "Lebih banyak" / "Lebih sedikit" toggle per kartu. Tombol memiliki `aria-expanded` untuk aksesibilitas keyboard.

**Ukuran Kartu:** Konsisten antar varian — gambar menggunakan `aspect-[4/3]`, kartu menggunakan `h-full` dalam grid CSS. Skeleton juga menggunakan rasio yang sama.

**Respon Klik:** Memanggil `logClick(productId)` → `POST /api/click` → buka URL Shopee di tab baru.

### 2.7 Notification Banner

**File:** `src/components/sections/NotificationBanner.tsx`

Banner dismissible di bagian paling atas landing page (sebelum navbar):

- Menampilkan pesan: "*harga bisa berubah kapan saja admin cuma mengambil harga pas produk di tambahkan ke catalog mimin, selamat berbelanja"
- Background kuning lembut (`#fef6e4`) dengan border bawah kuning
- Tombol **X** di kanan untuk menutup — state tersimpan di `localStorage` (key `shopby_banner_dismissed`)
- Jika sudah di-dismiss sebelumnya, banner tidak tampil sama sekali
- `role="alert"` untuk aksesibilitas screen reader
- `focus-visible` ring merah untuk keyboard navigation

### 2.8 Feedback Section

**File:** `src/components/sections/FeedbackSection.tsx`

Form saran dan masukan di atas footer, dengan:

- **Heading:** "Saran & Masukan" + deskripsi
- **3 field:** Nama (text), Email (email), Pesan (textarea)
- **Validasi client-side:** Semua field wajib diisi
- **Submit:** `POST /api/feedback` dengan `Content-Type: application/json`
- **Success state:** Centang hijau + "Terima kasih!" + tombol "Kirim lagi"
- **Error state:** Ikon `AlertCircle` + pesan error merah
- **Loading state:** Spinner + "Mengirim..." pada tombol
- `role="alert"` pada status messages
- Label menggunakan `htmlFor` untuk aksesibilitas

### 2.9 Footer

**File:** `src/components/layout/Footer.tsx`

- Nama brand dan deskripsi "Shopee Affiliate Partner"
- Copyright
- Link: Tentang Kami (`/about`), Kebijakan Privasi (`/privacy`), Syarat & Ketentuan (`/terms`), Hubungi Kami (`/contact`)
- ✅ Semua link footer kini mengarah ke halaman statis yang nyata.

### 2.10 Halaman Publik Lainnya

Proyek kini memiliki halaman statis tambahan yang dapat diakses publik:

| Route | Konten |
|---|---|
| `/affiliate` | Informasi program Affiliasi Shopee |
| `/about` | Tentang Shopby |
| `/privacy` | Kebijakan Privasi |
| `/terms` | Syarat & Ketentuan |
| `/contact` | Formulir kontak (aktif — kirim ke `/api/contact`) |

Semua halaman ini diakses dari link navbar ("Affiliate") dan footer.

---

## 3. Admin Panel

Area admin dilindungi oleh **middleware auth** — akses langsung ke route `/admin-shopby/*` tanpa login akan di-redirect ke halaman login.

**Route admin yang tersedia:**

| Route | Keterangan |
|---|---|
| `/admin-shopby` | Dashboard — statistik real dari API |
| `/admin-shopby/login` | Halaman login |
| `/admin-shopby/analytics` | Analitik dari data nyata |
| `/admin-shopby/products` | Daftar produk (CRUD via API) |
| `/admin-shopby/products/new` | Tambah produk baru (POST `/api/products`) |
| `/admin-shopby/products/[id]` | Edit produk (GET/PUT `/api/products/[id]`) |
| `/admin-shopby/settings` | Pengaturan toko (simpan ke `/api/settings`) |
| `/admin-shopby/feedback` | Kelola saran/masukan (tabel, pagination, hapus) |
| `/admin-shopby/help` | Pusat Bantuan |

> ✅ Semua halaman admin kini menggunakan data dari API nyata — tidak ada data hardcoded atau simulasi.

> ⚠️ **CSRF Protection:** Semua state-changing admin API (`POST`, `PUT`) memerlukan header `x-csrf-token` dengan token unik per session (double-submit cookie pattern). Token di-generate saat login (`shopby_csrf` cookie), frontend membaca dari cookie dan mengirim sebagai header. Server validasi header === cookie.

### 3.1 Alur Autentikasi

```
[User] → akses /admin-shopby/products
         ↓
    [middleware.ts] → cek cookie "shopby_admin_session"
         ↓                           ↓
    tidak ada/expired            valid → lanjut ke halaman
         ↓
    redirect ke /admin-shopby/login
         ↓
    [Login Page] → input email & password
         ↓
    POST /api/admin-shopby/login
         ↓
    valid? → set cookie HttpOnly → redirect ke /admin-shopby
    salah? → tampilkan error, tetap di login
```

#### Detail Autentikasi

- **Single Admin:** Email dan password hash berasal dari `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`)
- **Password Hashing:** Node.js `crypto.scryptSync` dengan salt 16-byte, stored sebagai `salt:derivedKey` (base64). Password juga bisa diubah via `PUT /api/settings/password` (verifikasi current password + simpan hash baru di DB `AppSetting` key `admin_password_hash`).
- **Session JWT:** `jose` library, algoritma HS256, payload `{ role: "admin" }`, expiry 24 jam. Secret wajib ≥ 32 karakter (validasi startup).
- **Cookie:** Nama `shopby_admin_session`, HttpOnly, Secure (production), SameSite=Strict, path=/, maxAge 86400s
- **Middleware:** Edge runtime, matcher `["/admin-shopby/:path*", "/api/stats/:path*", "/api/analytics/:path*", "/api/settings/:path*"]` — melindungi admin pages + API sensitive routes

#### Credential Default (Development)

| Field | Value |
|---|---|
| Email | `admin@shopby.com` |
| Password | `admin123` |

### 3.2 Halaman Login

**Route:** `/admin-shopby/login`  
**File:** `src/app/admin-shopby/login/page.tsx`

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

**File:** `src/app/admin-shopby/(dashboard)/layout.tsx`

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
│ 📝 Feedback          │
│ ❓ Help              │
│ 🚪 Logout            │ ← merah
└──────────────────────┘
```

- Sticky, tinggi penuh
- Link aktif punya background kuning + border kiri merah
- "Logout" → POST `/api/admin-shopby/logout` → redirect ke `/admin-shopby/login`

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

**Route:** `/admin-shopby`  
**File:** `src/app/admin-shopby/(dashboard)/page.tsx`

Halaman utama admin dengan data real-time dari API:

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
| Total Sales (Rp) | Rp 24.590.000 | +12.5% (hijau) |
| Active Links | 142 | Across 5 platforms |
| Total Clicks | 89.2K | +5.2% (hijau) |
| Est. Commission | Rp 3.420.000 | Dari komisi real per produk |

> ✅ Statistik kini berasal dari API nyata (`GET /api/stats`) — bukan data hardcoded. Revenue = sum(commission × clicks) per produk.

#### Grafik Sales Performance
- SVG inline line chart (Mon–Sat, 6 titik data)
- Sumbu Y: revenue ($0–$8,000)
- Garis merah dengan area fill transparan

#### Top Products by Clicks (dengan Komisi & Revenue)

| Product | Komisi | Clicks | Revenue |
|---|---|---|---|
| Mechanical Keyboard Pro | Rp10.000 | 12 | Rp120.000 |
| Smartwatch Series X | Rp15.000 | 8 | Rp120.000 |

Revenue = komisi × jumlah klik. Data dari `GET /api/stats`.

### 3.5 Halaman Analytics

**Route:** `/admin-shopby/analytics`  
**File:** `src/app/admin-shopby/(dashboard)/analytics/page.tsx`

> ✅ Data analytics kini berasal dari API nyata (`GET /api/analytics`) — bukan data contoh.

#### Header
- "Analytics Overview"
- Tanggal "Jan 01, 2026 - Jun 30, 2026"
- Filter: Last 7 Days, Last 30 Days (active), This Month, Year to Date

#### Metrik (4 Kartu)

| Metrik | Nilai | Perubahan |
|---|---|---|
| Komisi Terkumpul | Rp 15.400 (dari komisi real) | +12% (hijau) |
| Avg Order Value | Rp 245.000 | 0% (abu-abu) |
| Conversion Rate | 4.2% | +0.5% (hijau) |
| Bounce Rate | 28.5% | -2.1% (hijau) |

#### Clicks & Revenue (Daily)
- Bar chart per hari (7 hari: Sen–Min)
- Bar merah = clicks, garis = revenue
- Revenue dari komisi real per klik

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

**Route:** `/admin-shopby/products/new`  
**File:** `src/app/admin-shopby/(dashboard)/products/new/page.tsx`

Form untuk menambahkan product link affiliate baru dengan gaya receipt/nota.

> ✅ Form kini mengirim data ke API (`POST /api/products`) dan menyimpannya ke database — bukan sekadar simulasi.

#### Image Input (URL)

Fitur input gambar via URL langsung:

1. **Input URL** — Tempel URL gambar produk dari Shopee (atau sumber lain)
2. **Live Preview** — Gambar tampil otomatis saat URL diisi, pakai `<Image>` dari `next/image`
3. **Fallback** — Jika URL dikosongkan, pakai `picsum.photos` sebagai placeholder

**Spesifikasi:**
- Format: URL gambar (harus diawali `http://` atau `https://`)
- Validasi: cek protokol URL sebelum submit
- Error handling: jika gambar gagal load, tampilkan placeholder icon (tidak crash)
- Tidak ada upload file / base64 — gambar dikirim sebagai URL string ke database

**Tampilan Input:**
```
URL Gambar Produk
[ https://down-id.img.susercontent.com/file/xxxxx _________________ ]

┌── Preview ──────────────────────────────┐
│                                          │
│           [ImageIcon] Preview            │
│                                          │
└──────────────────────────────────────────┘
```

#### Form Fields

| Field | Tipe | Placeholder |
|---|---|---|
| URL Gambar Produk | URL input | `https://down-id.img.susercontent.com/file/xxxxx` |
| Product Name | Text | `e.g. Ergonomic Desk Chair V2` |
| Category | Select | Electronics, Fashion, Home, Beauty |
| Affiliate Link | URL | `https://shopee.co.id/...` |
| Price (IDR) | Text with "Rp" prefix | `1.250.000` |
| Featured | Toggle switch | Yes / No |
| Komisi per Produk (IDR) | Text with "Rp" prefix | — |
| Rating | Number input (step 0.1, min 0, max 5) + star click | 4.5 / 5 |
| Tandai Stok Habis | Toggle switch | Yes / No |

#### Tombol Aksi

| Tombol | Fungsi |
|---|---|---|
| **Create Product Link** (merah) | `POST /api/products` → simpan ke DB → toast "Product link created successfully!" (3 detik) |
| **Cancel** | `router.back()` kembali ke halaman sebelumnya |

### 3.7 Halaman Products

**Route:** `/admin-shopby/products`  
**File:** `src/app/admin-shopby/(dashboard)/products/page.tsx`

#### Fitur

| Fitur | Keterangan |
|---|---|
| **Tambah Produk** | Tombol "Add New Link" → `/admin-shopby/products/new` |
| **Filter Kategori** | Chips: All, Electronics, Fashion, Home, Beauty |
| **Sort** | Tombol dekoratif (belum berfungsi) |
| **Search** | Input dekoratif untuk mobile |
| **Tabel Produk** | 3 baris data contoh |
| **Pagination** | "Showing 1-3 of 24 items" + page numbers |

#### Tabel Produk

| Kolom | Isi |
|---|---|
| # | Nomor produk urut (computed dari createdAt ASC) |
| Product | Inisial huruf pertama + nama + ID produk (ImagePreview dihapus karena broken photos) |
| Category | Badge kategori |
| Price | Format Rp (contoh: Rp450.000) |
| Komisi | Komisi per produk (IDR) |
| Clicks | Jumlah klik (dari ClickLog) |
| Status | Badge Featured/Standard + toggle Sold Out (Active/Sold Out) |
| Actions | Copy Link (ikon `Copy`), Edit (ikon `Edit` → `/admin-shopby/products/[id]`), Delete (ikon `Trash2`) |

> **Sold Out Toggle:** Setiap baris produk memiliki toggle "Sold Out" yang bisa di-klik langsung. Perubahan langsung terkirim ke `PUT /api/products/[id]` dan tabel di-refresh otomatis.

#### Data Contoh (3 Produk)

| Produk | Kategori | Harga | Komisi | Status |
|---|---|---|---|---|
| Mechanical Keyboard Pro | Electronics | Rp450.000 | 8% | Active |
| Smartwatch Series X | Electronics | Rp899.000 | 10% | Active |
| Minimalist Leather Wallet | Fashion | Rp250.000 | 12% | Out of Stock |

### 3.7 Halaman Edit Produk

**Route:** `/admin-shopby/products/[id]`  
**File:** `src/app/admin-shopby/(dashboard)/products/[id]/page.tsx`

> ✅ Form memuat data produk dari API (`GET /api/products/[id]`) dan menyimpan perubahan melalui `PUT /api/products/[id]` ke database — bukan data hardcoded atau simulasi.

#### Form

| Field | Tipe | Default |
|---|---|---|
| Product Image | URL input + live preview | URL dari product (bisa diganti) |
| Product Name | Text input | "Ergonomic Desk Chair V2" |
| Category | Select | Furniture, Electronics, Apparel, Rumah Tangga |
| Affiliate Link | URL input | `https://shopby.com/ref/8923a` |
| Price | Text with "Rp" prefix | "1.250.000" |
| Komisi per Produk (IDR) | Text with "Rp" prefix | — |
| Featured | Toggle switch | Yes / No |
| Tandai Stok Habis | Toggle switch | Yes / No |

#### Tombol Aksi

| Tombol | Fungsi |
|---|---|
| **Save Changes** (merah) | `PUT /api/products/[id]` → simpan ke DB → toast "Success! Product has been saved." (auto-hilang 3 detik) |
| **Discard Edits** | `router.back()` kembali ke halaman sebelumnya |

#### Toast Notification

Popup kuning di bagian atas: "Success! Product has been saved." — hilang otomatis setelah 3 detik.

### 3.8 Halaman Settings

**Route:** `/admin-shopby/settings`  
**File:** `src/app/admin-shopby/(dashboard)/settings/page.tsx`

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
| Change Password | Form | Current password + new password → `PUT /api/settings/password` |
| Auto-Payouts | Toggle | ON (default) |
| Two-Factor Auth | Badge | **Planned** (coming soon, disabled) |

#### Tombol Aksi

| Tombol | Fungsi |
|---|---|
| **Discard** | Reset form |
| **Save Changes** | `PUT /api/settings` → simpan ke database (Prisma `AppSetting`) → toast konfirmasi |

> ✅ Pengaturan kini tersimpan ke database (model `AppSetting` via Prisma) melalui `PUT /api/settings` — kompatibel dengan serverless deployment.
>
> ⚠️ **Input Validation:** `PUT /api/settings` memvalidasi semua field dengan whitelist 11 keys + tipe checking + batas ukuran (logo max 500KB). Invalid request mengembalikan 400 dengan detail error.

---

## 4. API Endpoints

### 4.1 Autentikasi Admin

#### POST /api/admin-shopby/login

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
Set cookie: `shopby_admin_session=<JWT>; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`

**Response (400):**
```json
{ "error": "Email dan password harus diisi" }
```

**Response (401):**
```json
{ "error": "Email atau password salah" }
```

#### POST /api/admin-shopby/logout

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
|---|---|---|---|---|---|
| `category` | string | — | Slug kategori untuk filter |
| `sort` | string | `"newest"` | Urutan: `newest`, `price_asc`, `price_desc`, `rating_desc` |
| `numberFrom` | number | — | Filter nomor produk awal (inklusif) |
| `numberTo` | number | — | Filter nomor produk akhir (inklusif) |

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx...",
      "name": "Mechanical Keyboard Pro",
      "price": 450000,
      "commission": 10000,
      "discountPct": null,
      "imageUrl": "https://picsum.photos/...",
      "imageAlt": "Mechanical Keyboard Pro",
      "shopeeUrl": "https://shopee.co.id/...",
      "categoryId": "clx...",
      "isFeatured": true,
      "isSoldOut": false,
      "number": 1,
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

Mengambil daftar kategori (urut A-Z). Mengembalikan **plain array** (tanpa `data`/`total` wrapper).

**Response (200):**
```json
[
  { "id": "clx...", "name": "Elektronik", "slug": "elektronik" },
  { "id": "clx...", "name": "Fashion", "slug": "fashion" },
  { "id": "clx...", "name": "Kecantikan", "slug": "kecantikan" },
  { "id": "clx...", "name": "Rumah Tangga", "slug": "rumah-tangga" }
]
```

### 4.4 CRUD Produk

#### GET /api/products

Mengambil daftar produk (support filter, sort, pagination).

**Query Parameters:**

| Parameter | Tipe | Default | Keterangan |
|---|---|---|---|
| `category` | string | — | Filter slug kategori |
| `search` | string | — | Pencarian nama produk |
| `featured` | boolean | — | Filter produk unggulan |
| `sort` | string | `"newest"` | Urutan: `newest`, `price_asc`, `price_desc`, `rating_desc` |
| `page` | number | `1` | Halaman |
| `limit` | number | `12` | Item per halaman |

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx...",
      "name": "Mechanical Keyboard Pro",
      "price": 450000,
      "imageUrl": "https://picsum.photos/...",
      "category": { "id": "clx...", "name": "Elektronik", "slug": "elektronik" },
      "_count": { "clicks": 5 }
    }
  ],
  "total": 9
}
```

#### POST /api/products

Menambahkan produk baru ke database.

**Request Body:**
```json
{
  "name": "Ergonomic Desk Chair V2",
  "price": 1250000,
  "categoryId": "clx...",
  "shopeeUrl": "https://shopee.co.id/...",
  "imageUrl": "https://picsum.photos/...",
  "isFeatured": false,
  "isSoldOut": false,
  "commission": 0
}
```

**Response (201):**
```json
{ "success": true, "data": { "id": "clx...", "name": "Ergonomic Desk Chair V2" } }
```

#### GET /api/products/[id]

Mengambil detail produk berdasarkan ID.

**Response (200):**
```json
{
  "data": {
    "id": "clx...",
    "name": "Mechanical Keyboard Pro",
    "price": 450000,
    "imageUrl": "https://picsum.photos/...",
    "shopeeUrl": "https://shopee.co.id/...",
    "categoryId": "clx...",
    "isFeatured": true,
    "createdAt": "2026-07-19T..."
  }
}
```

#### PUT /api/products/[id]

Memperbarui data produk.

**Request Body:**
```json
{
  "name": "Mechanical Keyboard Pro V2",
  "price": 500000,
  "commission": 10000,
  "categoryId": "clx...",
  "shopeeUrl": "https://shopee.co.id/...",
  "imageUrl": "https://picsum.photos/...",
  "isFeatured": true,
  "isSoldOut": false
}
```

**Response (200):**
```json
{ "success": true, "data": { "id": "clx...", "name": "Mechanical Keyboard Pro V2" } }
```

#### DELETE /api/products/[id]

Menghapus produk dari database.

**Response (200):**
```json
{ "success": true }
```

### 4.5 Statistik & Analitik

#### GET /api/stats

Mengembalikan data statistik untuk dashboard admin.

**Response (200):**
```json
{
  "data": {
    "totalSales": 24590000,
    "totalProducts": 5,
    "activeProducts": 3,
    "totalClicks": 47,
    "avgCommission": 8500,
    "recentClicks": [
      { "id": "clc...", "product": { "name": "Mechanical Keyboard Pro" }, "clickedAt": "2026-07-20T10:30:00.000Z" }
    ],
    "topProducts": [
      { "id": "cla...", "name": "Mechanical Keyboard Pro", "commission": 10000, "revenue": 120000, "_count": { "clicks": 12 } },
      { "id": "clb...", "name": "Steel Tumbler 500ml", "commission": 15000, "revenue": 120000, "_count": { "clicks": 8 } }
    ]
  }
}
```

#### GET /api/analytics

Mengembalikan data analitik detail.

**Query Parameters:**

| Parameter | Tipe | Default | Keterangan |
|---|---|---|---|
| `period` | string | `"30d"` | Periode: `7d`, `30d`, `month`, `year` |

**Response (200):**
```json
{
  "data": {
    "totalRevenue": 15400000,
    "totalClicks": 47,
    "conversionRate": 4.2,
    "dailyData": [
      { "date": "2026-07-19", "clicks": 12, "revenue": 4500000 }
    ],
    "trafficSources": [
      { "source": "Direct", "percentage": 45 }
    ],
    "geoData": [
      { "city": "Jakarta", "users": 124 }
    ]
  }
}
```

### 4.6 Settings

#### GET /api/settings

Mengambil data pengaturan toko dari database (Prisma `AppSetting` model).

**Response (200):**
```json
{
  "storeName": "Shopby Affiliate Store",
  "bio": "Kurator produk...",
  "primaryColor": "red",
  "bankName": "BCA",
  "accountNumber": "1234-5678-9012",
  "accountHolder": "JOHN DOE"
}
```

#### PUT /api/settings

Memperbarui pengaturan toko dan menyimpannya ke database.

**Request Body:**
```json
{
  "storeName": "Shopby Store",
  "bio": "Deskripsi baru",
  "primaryColor": "black",
  "bankName": "BNI",
  "accountNumber": "9876-5432-1098",
  "accountHolder": "JANE DOE"
}
```

**Response (200):**
```json
{ "success": true, "settings": { ... } }
```

#### PUT /api/settings/password

Mengubah password admin (memerlukan CSRF header).

**Request Body:**
```json
{
  "currentPassword": "admin123",
  "newPassword": "new-secure-password"
}
```

**Response (200):**
```json
{ "success": true }
```

**Response (400):**
```json
{ "error": "Current password is incorrect" }
```

### 4.7 Feedback

#### POST /api/feedback

Mengirim saran/masukan dari form feedback (public, rate-limited).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Toko yang bagus!"
}
```

**Rate Limit:** 2 request per menit per IP.

**Response (200):**
```json
{
  "success": true,
  "message": "Saran/masukan berhasil dikirim. Terima kasih!"
}
```

**Response (400):**
```json
{ "error": "Semua field harus diisi" }
```

**Response (429):**
```json
{ "error": "Terlalu banyak permintaan. Coba lagi nanti." }
```

#### GET /api/feedback

Mengambil daftar feedback (admin auth required).

**Query Parameters:**

| Parameter | Tipe | Default | Keterangan |
|---|---|---|---|
| `page` | number | `1` | Halaman |
| `limit` | number | `25` | Item per halaman (max 100) |

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Toko yang bagus!",
      "createdAt": "2026-07-21T..."
    }
  ],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
```

#### DELETE /api/feedback?id=

Menghapus feedback (admin auth required).

**Response (200):**
```json
{ "success": true, "message": "Feedback berhasil dihapus" }
```

**Response (400):**
```json
{ "error": "ID feedback diperlukan" }
```

### 4.8 Contact Form

#### POST /api/contact

Mengirim pesan dari form kontak.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Saya tertarik dengan produk..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Pesan berhasil dikirim. Kami akan menghubungi Anda segera."
}
```

**Response (400):**
```json
{ "error": "Semua field harus diisi" }
```

### 4.8 Click Tracking

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
| `commission` | Int | Komisi per produk dalam IDR (default 0) |
| `discountPct` | Int? | Persentase diskon (nullable) |
| `imageUrl` | String | URL gambar produk |
| `imageAlt` | String | Teks alternatif gambar |
| `shopeeUrl` | String | URL affiliate Shopee |
| `categoryId` | String | Foreign Key → Category |
| `isFeatured` | Boolean | Flag produk unggulan |
| `isSoldOut` | Boolean | Flag stok habis |
| `createdAt` | DateTime | Waktu dibuat |

> **Catatan:** Produk memiliki field computed `number` yang tidak disimpan di database. Nomor dihitung dari urutan `createdAt ASC` (produk pertama = #1, berikutnya = #2, dst). Renumbering otomatis saat produk dihapus.

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

#### AppSetting

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | String (CUID) | Primary key |
| `key` | String (unique) | Nama pengaturan (`store_settings`) |
| `value` | String | JSON string berisi semua nilai |

#### Feedback

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | String (CUID) | Primary key |
| `name` | String | Nama pengirim |
| `email` | String | Email pengirim |
| `message` | String | Isi saran/masukan |
| `createdAt` | DateTime | Waktu dikirim |

### 5.2 Seed Data

Seed script (`prisma/seed.ts`) hanya membuat **4 kategori** — **tidak membuat produk apa pun**:

| Kategori | Slug |
|---|---|
| Elektronik | `elektronik` |
| Fashion | `fashion` |
| Rumah Tangga | `rumah-tangga` |
| Kecantikan | `kecantikan` |

Admin **wajib menambahkan produk** via admin panel (`/admin-shopby/products/new`) setelah login. Produk langsung tersimpan ke database dan muncul di landing page.

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

**Cara 3: Via Admin Panel (Recommended)**

Login ke `/admin-shopby`, buka menu **Products > Add New Link**, isi form dan simpan. Produk otomatis tersimpan via `POST /api/products`.

**Cara 4: Via API Langsung**

Gunakan `POST /api/products` dengan header `Cookie: shopby_admin_session=<token>`.

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

Komponen di `src/components/ui/`:

| Komponen | File | Variants |
|---|---|---|
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
│   ├── schema.prisma               # Database schema (Product, Category, ClickLog, AppSetting, Feedback)
│   ├── seed.ts                     # Seed data (4 kategori)
│   ├── dev.db                      # SQLite database (local)
│   └── migrations/                 # Database migrations (incl. feedback migration)
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
    │   ├── page.tsx                # Storefront homepage (includes NotificationBanner + FeedbackSection)
    │   ├── providers.tsx           # TanStack Query provider
    │   ├── globals.css             # Tailwind v4 + tema + utilities
    │   ├── admin-shopby/
    │   │   ├── login/page.tsx      # Halaman login admin
    │   │   ├── help/page.tsx       # Pusat bantuan
    │   │   ├── loading.tsx         # Loading state
    │   │   ├── error.tsx           # Error boundary
    │   │   └── (dashboard)/
    │   │       ├── layout.tsx      # Sidebar + navbar admin (includes Feedback link)
    │   │       ├── page.tsx        # Dashboard utama
    │   │       ├── analytics/page.tsx
    │   │       ├── products/
    │   │       │   ├── page.tsx          # Daftar produk
    │   │       │   ├── new/page.tsx      # Tambah produk
    │   │       │   └── [id]/page.tsx     # Edit produk
    │   │       ├── feedback/page.tsx     # Kelola feedback (admin only)
    │   │       └── settings/page.tsx
    │   └── api/
    │       ├── admin-shopby/
    │       │   ├── login/route.ts  # POST login
    │       │   └── logout/route.ts # POST logout
    │       ├── products/route.ts   # GET + POST products
    │       ├── products/[id]/route.ts # GET + PUT + DELETE
    │       ├── categories/route.ts # GET categories
    │       ├── click/route.ts      # POST click tracking
    │       ├── feedback/route.ts   # POST (public), GET|DELETE (admin auth)
    │       ├── stats/route.ts      # GET dashboard stats
    │       ├── analytics/route.ts  # GET analytics data
    │       ├── settings/route.ts   # GET + PUT settings
    │       └── contact/route.ts    # POST contact form
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx          # Navigasi utama
    │   │   └── Footer.tsx          # Footer
    │   ├── sections/
    │   │   ├── NotificationBanner.tsx # Dismissible price disclaimer (client)
    │   │   ├── Hero.tsx            # Hero section
    │   │   ├── FeedbackSection.tsx # Saran & masukan form (client, POST /api/feedback)
    │   │   ├── CategoryFilter.tsx  # Filter kategori (chips/sidebar)
    │   │   ├── ProductGrid.tsx     # Grid produk + sort + load more
    │   │   └── ProductCard.tsx     # Kartu produk (highlight/compact)
    │       └── ui/
    │         ├── ProductCardSkeleton.tsx
    │         └── EmptyState.tsx
    ├── hooks/
    │   ├── useProducts.ts          # TanStack Query untuk produk
    │   └── useCategories.ts        # TanStack Query untuk kategori
    ├── lib/
│   ├── auth.ts                 # JWT session (jose, edge-safe)
│   ├── auth-password.ts        # Password scrypt (node crypto)
│   ├── csrf.ts                 # CSRF token validation guard
│   ├── validate-settings.ts    # Settings input validation whitelist
│   ├── rate-limit.ts           # In-memory rate limiter with staggered cleanup
│   ├── prisma.ts               # Prisma client singleton
│   ├── utils.ts                # cn(), formatPrice()
    │   └── services/
    │       ├── products.ts         # fetchProducts()
    │       ├── categories.ts       # fetchCategories()
    │       └── click.ts            # logClick()
    └── types/
        └── index.ts                # Product, Category, ClickLog, Feedback
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
    ├── GET /admin-shopby/* (tanpa cookie) ────→│                              │
    │    [middleware] cek cookie ✗       │                              │
    │←─── 302 Redirect /admin-shopby/login ────┤                              │
    │                                    │                              │
    ├── POST /api/admin-shopby/login ──────────→│                              │
    │    {email, password}               ├── validateCredentials()      │
    │                                    │    ├── cek ADMIN_EMAIL       │
    │                                    │    ├── scrypt compare        │
    │                                    │    └── valid?               │
    │←─── Set-Cookie + {success} ───────┤                              │
    │                                    │                              │
    ├── GET /admin-shopby/* (dengan cookie) ───→│                              │
    │    [middleware] cek cookie ✓       │                              │
    │←─── 200 [Admin Page] ─────────────┤                              │
    │                                    │                              │
    ├── Klik Logout ────────────────────→│                              │
    │    POST /api/admin-shopby/logout          ├── Clear Cookie               │
    │←─── {success} + Cookie: maxAge=0 ─┤                              │
    └────────────────────────────────────┘                              │
```

### C. Tip & Trik

1. **Reset data ke awal:** Hapus `prisma/dev.db`, lalu `npx prisma migrate dev && npx prisma db seed`
2. **Lihat database langsung:** `npx prisma studio` — GUI browser di port 5555
3. **Test auth di development:** Buka `/admin-shopby/login`, login dengan `admin@shopby.com` / `admin123`
4. **Cek cookie session:** DevTools → Application → Cookies → cari `shopby_admin_session`
5. **Ganti password:** Generate hash baru dengan script di [6.6](#66-environment-variables), update `ADMIN_PASSWORD_HASH` di `.env`, restart dev server
6. **Tambah produk featured:** Di Prisma Studio, set kolom `isFeatured` ke `true`/`1`
7. **Nonaktifkan middleware auth (development):** Hapus/komentari `export const config` di `middleware.ts`
8. **Cek performa:** Build production dengan `npm run build && npm start`, jangan gunakan `npm run dev` untuk benchmark
