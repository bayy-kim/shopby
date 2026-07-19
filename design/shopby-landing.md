<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Shopby - Belanja Cerdas, Struk Berkualitas</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&amp;family=JetBrains+Mono:wght@500;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-tint": "#ba1d00",
                      "on-tertiary-fixed-variant": "#48464d",
                      "error": "#ba1a1a",
                      "background": "#f9f9f6",
                      "on-secondary-fixed": "#251a00",
                      "secondary-fixed": "#ffdf9a",
                      "on-error": "#ffffff",
                      "on-primary-container": "#fffbff",
                      "on-surface-variant": "#5c403a",
                      "tertiary-fixed-dim": "#c9c5cd",
                      "surface-container-low": "#f4f4f1",
                      "on-secondary-fixed-variant": "#5a4300",
                      "primary": "#b51c00",
                      "tertiary": "#5d5b62",
                      "secondary": "#775a00",
                      "outline": "#906f69",
                      "inverse-primary": "#ffb4a5",
                      "tertiary-fixed": "#e5e1e9",
                      "inverse-surface": "#2f312f",
                      "inverse-on-surface": "#f1f1ee",
                      "surface-dim": "#dadad7",
                      "surface-container-highest": "#e2e3e0",
                      "primary-container": "#db3416",
                      "surface-container-lowest": "#ffffff",
                      "on-surface": "#1a1c1b",
                      "secondary-container": "#fdc73a",
                      "surface-container-high": "#e8e8e5",
                      "on-primary-fixed-variant": "#8e1400",
                      "secondary-fixed-dim": "#f4bf32",
                      "on-tertiary-fixed": "#1c1b21",
                      "surface-variant": "#e2e3e0",
                      "on-tertiary": "#ffffff",
                      "surface-container": "#eeeeeb",
                      "primary-fixed": "#ffdad3",
                      "on-secondary-container": "#6f5400",
                      "on-secondary": "#ffffff",
                      "on-primary": "#ffffff",
                      "tertiary-container": "#76737b",
                      "surface-bright": "#f9f9f6",
                      "on-error-container": "#93000a",
                      "on-background": "#1a1c1b",
                      "surface": "#f9f9f6",
                      "primary-fixed-dim": "#ffb4a5",
                      "outline-variant": "#e5beb6",
                      "on-tertiary-container": "#fffbff",
                      "error-container": "#ffdad6",
                      "on-primary-fixed": "#3e0400",
                      "tag-yellow": "#FFC93C",
                      "vivid-orange": "#FF4D2D",
                      "ink": "#17161C",
                      "border-color": "#E5E1D8"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {
                      "unit": "4px",
                      "max-width": "1200px",
                      "gutter": "16px",
                      "margin-desktop": "32px",
                      "margin-mobile": "16px"
              },
              "fontFamily": {
                      "headline-md": [
                              "Plus Jakarta Sans"
                      ],
                      "price-xl": [
                              "JetBrains Mono"
                      ],
                      "display-lg-mobile": [
                              "Plus Jakarta Sans"
                      ],
                      "display-lg": [
                              "Plus Jakarta Sans"
                      ],
                      "label-mono": [
                              "JetBrains Mono"
                      ],
                      "caption": [
                              "Plus Jakarta Sans"
                      ],
                      "body-md": [
                              "Plus Jakarta Sans"
                      ]
              },
              "fontSize": {
                      "headline-md": [
                              "20px",
                              {
                                      "lineHeight": "28px",
                                      "fontWeight": "700"
                              }
                      ],
                      "price-xl": [
                              "32px",
                              {
                                      "lineHeight": "32px",
                                      "letterSpacing": "-0.04em",
                                      "fontWeight": "700"
                              }
                      ],
                      "display-lg-mobile": [
                              "32px",
                              {
                                      "lineHeight": "38px",
                                      "letterSpacing": "-0.01em",
                                      "fontWeight": "800"
                              }
                      ],
                      "display-lg": [
                              "40px",
                              {
                                      "lineHeight": "48px",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "800"
                              }
                      ],
                      "label-mono": [
                              "13px",
                              {
                                      "lineHeight": "16px",
                                      "letterSpacing": "0.05em",
                                      "fontWeight": "500"
                              }
                      ],
                      "caption": [
                              "12px",
                              {
                                      "lineHeight": "16px",
                                      "fontWeight": "500"
                              }
                      ],
                      "body-md": [
                              "16px",
                              {
                                      "lineHeight": "24px",
                                      "fontWeight": "400"
                              }
                      ]
              }
            },
          },
        }
    </script>
<style>
        body {
            background-color: #FAFAF7;
            color: #17161C;
        }
        
        .brutalist-border {
            border: 1px solid #E5E1D8;
        }

        .brutalist-dashed {
            border-bottom: 1px dashed #E5E1D8;
        }

        .brutalist-shadow {
            box-shadow: 4px 4px 0px 0px #17161C;
            transition: all 0.2s ease;
        }

        .brutalist-shadow:active {
            box-shadow: 2px 2px 0px 0px #17161C;
            transform: translate(2px, 2px);
        }
        
        .receipt-card {
            background: #ffffff;
            border: 1px solid #E5E1D8;
            position: relative;
            transition: all 0.2s ease;
        }
        
        .receipt-card:hover {
            transform: translate(2px, 2px);
            background-color: #FAFAF7;
        }

        .receipt-hole {
            width: 12px;
            height: 12px;
            background-color: #FAFAF7;
            border-radius: 50%;
            border: 1px solid #E5E1D8;
            position: absolute;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
        }

        .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(23, 22, 28, 0.1);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
        }

        .receipt-card:hover .scan-line {
            opacity: 1;
            animation: scan 2s linear infinite;
        }

        @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
        }

        .hero-scan-line {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 2px;
            background: rgba(23, 22, 28, 0.2);
            animation: heroScan 3s ease-out forwards;
        }

        @keyframes heroScan {
            0% { left: -100%; }
            100% { left: 200%; }
        }

        .clip-tag {
            clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%);
        }
    </style>
</head>
<body class="font-body-md text-body-md overflow-x-hidden min-h-screen flex flex-col">
<!-- TopNavBar Component -->
<nav class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-background/95 backdrop-blur-sm border-b border-outline-variant dark:border-on-surface-variant">
<div class="flex items-center gap-4">
<span class="font-display-lg text-display-lg-mobile uppercase tracking-tighter text-primary dark:text-primary-fixed">Shopby</span>
</div>
<div class="flex items-center gap-6">
<div class="hidden md:flex items-center gap-6">
<a class="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary" href="#">Deals</a>
<a class="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Kategori</a>
<a class="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Affiliate</a>
</div>
<button class="bg-[#FF4D2D] text-[#17161C] px-4 py-2 font-bold rounded-full brutalist-shadow text-sm uppercase tracking-wider">
                Masuk
            </button>
</div>
</nav>
<!-- Hero Section -->
<header class="pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto w-full relative overflow-hidden">
<div class="hero-scan-line"></div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
<div class="space-y-6 z-10">
<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-ink leading-none uppercase">
                    Belanja Cerdas,<br>Struk Berkualitas
                </h1>
<p class="text-on-surface-variant max-w-md">
                    Koleksi produk Shopee Affiliate pilihan dalam satu nota digital. Kurasi terbaik, navigasi cepat, harga transparan.
                </p>
<button class="bg-[#FF4D2D] text-[#17161C] px-8 py-4 font-bold rounded-full brutalist-shadow text-lg uppercase tracking-wider mt-4 inline-block">
                    Lihat Semua Deal
                </button>
</div>
<div class="relative h-[400px] hidden md:block">
<!-- Floating Card 1 -->
<div class="absolute top-10 right-10 w-64 receipt-card p-4 transform rotate-[-3deg] z-10" style="background: white; clip-path: polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px);"><div class="absolute top-3 left-3 w-3 h-3 rounded-full bg-background border border-outline-variant z-20"></div>
<div class="receipt-hole"></div>
<div class="mt-8 brutalist-dashed pb-4">
<div class="bg-cover bg-center w-full h-40 border border-[#E5E1D8] mb-4" data-alt="A modern minimalist mechanical keyboard on a pristine white desk setup, top-down view, sharp lighting, high contrast utilitarian aesthetic, highly detailed." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAStz6MWdhJ1zh4c0FwFqadWl6CZq5yq6-UlVR_qmFH3_loMLyyqbx3zne-khm5hPTJvfh1jA52Rnza1u51vuol1UW2bCTvHPHKqORb1UGD1RNbFG_MVh5A69rXC3IbEtRojtC9QmdCOivROrbCKT-ltHi0VDusfzZFZ263onsWtLZ8Kq0Em-IwzPQHBRdFNez08kHupdRaWZE1ZJY7to6Yaw_Fb-3xKMD806mIvw6va3dJeJvMrTegl9c3V-SVYZdaZlca2ZD5_Wc')"></div>
<span class="font-label-mono text-xs text-on-surface-variant uppercase">Elektronik</span>
<h3 class="font-bold text-ink mt-1">Mechanical Keyboard Pro</h3>
</div>
<div class="pt-4 flex justify-between items-end">
<span class="font-price-xl text-xl text-ink font-label-mono" style="font-variant-numeric: tabular-nums;">Rp450k</span>
<span class="material-symbols-outlined text-[#FF4D2D]">arrow_forward</span>
</div>
<div class="scan-line"></div>
</div>
<!-- Floating Card 2 -->
<div class="absolute bottom-10 left-10 w-64 receipt-card p-4 transform rotate-[2deg] z-0" style="background: white; clip-path: polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px);"><div class="absolute top-3 left-3 w-3 h-3 rounded-full bg-background border border-outline-variant z-20"></div>
<div class="receipt-hole"></div>
<div class="mt-8 brutalist-dashed pb-4">
<div class="bg-cover bg-center w-full h-40 border border-[#E5E1D8] mb-4" data-alt="A sleek minimalist stainless steel coffee tumbler on a concrete surface, dramatic lighting casting a hard shadow, brutalist industrial aesthetic, highly detailed." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAq3uVOfDHT35zefCDRgrqt2khWekMJD-uhSl5FzLgypPRdHepB2_ejWNHK7FJCA0zRbKqNm4IE_3qScrEx0KQ96sUDbjCmvhA5kryVfBw3OJltTCotP_W8vgbo-3JYrifB7rSWiOioLD-98KffR6uva4DWoA_nNdmcUaplsTn1ph53oD9lCo3xbgFvX21dBmBTmgewH6TWmU4G-ADl2QFPnXkGSbsOvC2zXHFkRLCyBaUhxbF7Sb5V8ff8tYaOZbg9n-7gDWxfF4I')"></div>
<span class="font-label-mono text-xs text-on-surface-variant uppercase">Rumah Tangga</span>
<h3 class="font-bold text-ink mt-1">Steel Tumbler 500ml</h3>
</div>
<div class="pt-4 flex justify-between items-end">
<span class="font-price-xl text-xl text-ink font-label-mono" style="font-variant-numeric: tabular-nums;">Rp120k</span>
<span class="material-symbols-outlined text-[#FF4D2D]">arrow_forward</span>
</div>
<div class="scan-line"></div>
</div>
</div>
</div>
</header>
<!-- Main Content Area -->
<main class="flex-grow w-full max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col md:flex-row gap-8">
<!-- Sidebar Navigation -->
<aside class="w-full md:w-64 flex-shrink-0">
<div class="sticky top-24 bg-surface-container-lowest border-r border-dashed border-outline-variant p-4">
<div class="mb-6">
<h2 class="font-headline-md text-headline-md text-primary">Kategori</h2>
<p class="font-caption text-caption text-on-surface-variant">Filter produk</p>
</div>
<ul class="space-y-2">
<li class="">
<a class="flex items-center gap-3 p-2 bg-[#FFC93C] text-ink font-bold border border-ink transform translate-x-1 translate-y-1 transition-all" href="#">
<span class="material-symbols-outlined text-sm">apps</span>
<span class="font-label-mono text-label-mono uppercase">Semua</span>
</a>
</li>
<li class="">
<a class="flex items-center gap-3 p-2 text-on-surface-variant hover:bg-surface-container-high transition-all border border-transparent hover:border-outline-variant" href="#">
<span class="material-symbols-outlined text-sm">devices</span>
<span class="font-label-mono text-label-mono uppercase">Elektronik</span>
</a>
</li>
<li class="">
<a class="flex items-center gap-3 p-2 text-on-surface-variant hover:bg-surface-container-high transition-all border border-transparent hover:border-outline-variant" href="#">
<span class="material-symbols-outlined text-sm">apparel</span>
<span class="font-label-mono text-label-mono uppercase">Fashion</span>
</a>
</li>
<li class="">
<a class="flex items-center gap-3 p-2 text-on-surface-variant hover:bg-surface-container-high transition-all border border-transparent hover:border-outline-variant" href="#">
<span class="material-symbols-outlined text-sm">home</span>
<span class="font-label-mono text-label-mono uppercase">Rumah Tangga</span>
</a>
</li>
<li class="">
<a class="flex items-center gap-3 p-2 text-on-surface-variant hover:bg-surface-container-high transition-all border border-transparent hover:border-outline-variant" href="#">
<span class="material-symbols-outlined text-sm">auto_awesome</span>
<span class="font-label-mono text-label-mono uppercase">Kecantikan</span>
</a>
</li>
</ul>
</div>
</aside>
<!-- Product Grid -->
<div class="flex-grow">
<div class="mb-12">
<div class="flex items-center gap-4 mb-6 border-b border-dashed border-outline-variant pb-4">
<h2 class="font-headline-md text-headline-md text-ink uppercase tracking-tight">Rekomendasi Hari Ini</h2>
<span class="bg-[#FFC93C] px-2 py-1 font-label-mono text-xs font-bold border border-ink">HOT DEALS</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Highlight Card 1 -->
<div class="receipt-card p-4 clip-tag flex flex-col justify-between" style="clip-path: polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px);"><div class="absolute top-3 left-3 w-3 h-3 rounded-full bg-background border border-outline-variant z-20"></div>
<div>
<div class="bg-cover bg-center w-full h-48 border border-[#E5E1D8] mb-4" data-alt="A minimalist white smartwatch on a stark white pedestal, studio lighting, crisp shadows, modern utilitarian design, highly detailed." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBn6tiaGUPteAmiqvMS8GBrLbLllyzvq9vz7tdY5qpHZQkMXQXfVaBGt9mZu63T5QyqZhWMj3PDMFOhbIvMmJZ6aeA7W-_NU3MzxVaeuAA6aByS4TlSRrSFkLRG092a2k3xaHzucB4xqsjRtBARo_d6Q3kHGngd3ONDaIYerVf0u2L1K_cg5Bi4dUp4w18VV_n-3mZ38M1HkW7wFKdceOpBVNpyckoCNkxuMKczv67_QO7AzMxZsgQihouxA_rxw8ikkFkDG-c0EIg')"></div>
<span class="font-label-mono text-xs text-on-surface-variant uppercase">Elektronik</span>
<h3 class="font-bold text-ink mt-1">Smartwatch Series X</h3>
</div>
<div class="mt-4 pt-4 border-t border-dashed border-[#E5E1D8]">
<p class="font-price-xl text-2xl text-ink mb-4 font-label-mono" style="font-variant-numeric: tabular-nums;">Rp899k</p>
<button class="w-full bg-[#FF4D2D] text-white py-2 font-bold text-sm uppercase tracking-wider brutalist-border hover:bg-ink transition-colors flex justify-center items-center gap-2">
                                Beli di Shopee <span class="material-symbols-outlined text-sm">open_in_new</span>
</button>
</div>
<div class="scan-line"></div>
</div>
<!-- Highlight Card 2 -->
<div class="receipt-card p-4 clip-tag flex flex-col justify-between" style="clip-path: polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px);"><div class="absolute top-3 left-3 w-3 h-3 rounded-full bg-background border border-outline-variant z-20"></div>
<div>
<div class="bg-cover bg-center w-full h-48 border border-[#E5E1D8] mb-4" data-alt="A premium minimalist leather wallet lying on a matte grey surface, top-down perspective, high contrast, clean lines, professional photography." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjMlrxENOsc_SpAqLhzrszDKoRb9ZiUOa47e64uOGuv7vbbpw4wJcLzzWhwE-4RIDxWiRx6pxWM-h6MUzeeqsexh-oBoff6iNOAapFlGQdsBNUABGBxoiEGpa-OVLCXApAK0ozKogsRoPk96VYyBhxDZ08Fl0rJFMT-VxlGEcebp-5gOiO2nHv5AT1YKPPa-8DTyKBTjXhasIrXhrIT3Z9hy_yYE4KBtFsWzGpoc7VRiVruu8aDmsQ5woo-dyUtqRh_tDW3XoJLdA')"></div>
<span class="font-label-mono text-xs text-on-surface-variant uppercase">Fashion</span>
<h3 class="font-bold text-ink mt-1">Minimalist Leather Wallet</h3>
</div>
<div class="mt-4 pt-4 border-t border-dashed border-[#E5E1D8]">
<p class="font-price-xl text-2xl text-ink mb-4 font-label-mono" style="font-variant-numeric: tabular-nums;">Rp250k</p>
<button class="w-full bg-[#FF4D2D] text-white py-2 font-bold text-sm uppercase tracking-wider brutalist-border hover:bg-ink transition-colors flex justify-center items-center gap-2">
                                Beli di Shopee <span class="material-symbols-outlined text-sm">open_in_new</span>
</button>
</div>
<div class="scan-line"></div>
</div>
<!-- Highlight Card 3 -->
<div class="receipt-card p-4 clip-tag flex flex-col justify-between" style="clip-path: polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px);"><div class="absolute top-3 left-3 w-3 h-3 rounded-full bg-background border border-outline-variant z-20"></div>
<div>
<div class="bg-cover bg-center w-full h-48 border border-[#E5E1D8] mb-4" data-alt="A sleek black ceramic pour-over coffee dripper on a light concrete counter, minimal setup, harsh single light source creating strong shadows, utilitarian aesthetic." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCj2UFr8HGa5YTtNcn4Y_ldycaAq4zmwW4C2aTZp3xIywkBH9MbtbRV7sJLxCxVYEzvxYs1b3ZalFmuByzeJ-h8dftpe5Lm0xeaGPzgdfz0Z924zMzwogZapiXnUuqXn1sSACgmWQIHCCaIlXhK7Sul2QlPzekC4l2Vdqs2jS4LvjVQDB5pJLTQKGMclHDlUoo3P1oboPXqKjDpHw9g22nhRZioUn7XkbftEyOwwxUa3Ef4dZfugl_cnGVzKDCe0zF84GaYa9mQ5LQ')"></div>
<span class="font-label-mono text-xs text-on-surface-variant uppercase">Rumah Tangga</span>
<h3 class="font-bold text-ink mt-1">Ceramic Pour Over Set</h3>
</div>
<div class="mt-4 pt-4 border-t border-dashed border-[#E5E1D8]">
<p class="font-price-xl text-2xl text-ink mb-4 font-label-mono" style="font-variant-numeric: tabular-nums;">Rp320k</p>
<button class="w-full bg-[#FF4D2D] text-white py-2 font-bold text-sm uppercase tracking-wider brutalist-border hover:bg-ink transition-colors flex justify-center items-center gap-2">
                                Beli di Shopee <span class="material-symbols-outlined text-sm">open_in_new</span>
</button>
</div>
<div class="scan-line"></div>
</div>
</div>
</div>
<div class="flex items-center justify-between mb-6 border-b border-dashed border-outline-variant pb-4">
<h2 class="font-headline-md text-headline-md text-ink uppercase tracking-tight">Semua Produk</h2>
<span class="font-label-mono text-sm text-on-surface-variant">Menampilkan 24 items</span>
</div>
<!-- Standard Grid -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
<!-- Grid Item 1 -->
<div class="receipt-card p-3 flex flex-col justify-between" style="clip-path: polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px);"><div class="absolute top-3 left-3 w-3 h-3 rounded-full bg-background border border-outline-variant z-20"></div>
<div>
<div class="bg-cover bg-center w-full h-32 border border-[#E5E1D8] mb-3" data-alt="A simple modern desk lamp with a matte white finish on a dark textured desk, moody lighting, minimalist industrial design." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAzdq0HaQddV2sMt99cN5LPMJQQVzIQyIeAiAxlaXPQOS7sYHfB4BHnW6fF6B8PpALgNOiJ0jJST6CCJmSTcSOeV0zbZ-2RUJlB_8_eGZXHNMALIZ5R3DulROjw118abJ7vlxI8Kd0sEpar_Bz8Un81MBL7raapoRSp1Ci_-4KdxnetsuvpoDQxhgCXRruv6C6J25P0_4d3baFjpiu7BEfaA54VyNXEzE-ozQnLogreFOgPNWVHcsJddPrUxT-flsVfqtsBmmYiB8')"></div>
<h3 class="font-bold text-sm text-ink leading-tight">Matte Desk Lamp</h3>
</div>
<div class="mt-3 pt-3 border-t border-dashed border-[#E5E1D8]">
<p class="font-price-xl text-lg text-ink mb-2 font-label-mono" style="font-variant-numeric: tabular-nums;">Rp185k</p>
<button class="w-full bg-surface-container-highest text-ink py-1 font-bold text-xs uppercase brutalist-border hover:bg-[#FF4D2D] hover:text-white transition-colors">
                            Beli
                        </button>
</div>
<div class="scan-line"></div>
</div>
<!-- Grid Item 2 -->
<div class="receipt-card p-3 flex flex-col justify-between" style="clip-path: polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px);"><div class="absolute top-3 left-3 w-3 h-3 rounded-full bg-background border border-outline-variant z-20"></div>
<div>
<div class="bg-cover bg-center w-full h-32 border border-[#E5E1D8] mb-3" data-alt="A pair of minimalist true wireless earbuds in a matte black charging case resting on a clean white surface, high contrast, top down view." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUoqySXp4jZjwnSd9fbzKHzl94GG3WCM_gtLGYO5gqQvUC5ENBoq3B1GmtAPGVjez3Gvs191w4JJBSmtyKhk1OoYyq5_B5J9wq8LSQIKWtm015jDHflPCfULBuNUD6GSMbak3KzHFWSNYbB4veJCPoClQIfN4C8DbWMHsjlgL0IYaPpMNK4bfmlqpoB7HzoJgfHI1wKEObHjmlW1DMAlppBZWhLY1WIF2duPAeJb7uy8ZxOOXQCd4isFlNIulDVJ_ftEifP5GvBAY')"></div>
<h3 class="font-bold text-sm text-ink leading-tight">TWS Earbuds Pro</h3>
</div>
<div class="mt-3 pt-3 border-t border-dashed border-[#E5E1D8]">
<p class="font-price-xl text-lg text-ink mb-2 font-label-mono" style="font-variant-numeric: tabular-nums;">Rp420k</p>
<button class="w-full bg-surface-container-highest text-ink py-1 font-bold text-xs uppercase brutalist-border hover:bg-[#FF4D2D] hover:text-white transition-colors">
                            Beli
                        </button>
</div>
<div class="scan-line"></div>
</div>
<!-- Grid Item 3 -->
<div class="receipt-card p-3 flex flex-col justify-between" style="clip-path: polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px);"><div class="absolute top-3 left-3 w-3 h-3 rounded-full bg-background border border-outline-variant z-20"></div>
<div>
<div class="bg-cover bg-center w-full h-32 border border-[#E5E1D8] mb-3" data-alt="A minimalist skincare bottle with clean typography label, standing on a brushed steel tray, bright clinical lighting, modern aesthetic." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK3xXHXp9qbdnt19OxCTE_HZod8PPRHMkApYVhXJ44us3A_ZemJmEZJIvDsAkBrJRGAA8xnGzjPLCm0ue4rtWDj1K1DDfxVGOlyETAWLy0AnwvjW3zwp4eb_w_VsKhIC01XrdGPjxWf02lrH506OmDuGVWtljZUm8vI-6m4HOXjcOePS2COkW9yzHiNAWT-xVFNS-iqqP2UvHhxe-K39tZEHoBb2z7Ed1Hn1_nvzAfvqtFMxR8wzYSaxYZiD8p9L7NnDgXL3KRFEY')"></div>
<h3 class="font-bold text-sm text-ink leading-tight">Hydrating Serum</h3>
</div>
<div class="mt-3 pt-3 border-t border-dashed border-[#E5E1D8]">
<p class="font-price-xl text-lg text-ink mb-2 font-label-mono" style="font-variant-numeric: tabular-nums;">Rp150k</p>
<button class="w-full bg-surface-container-highest text-ink py-1 font-bold text-xs uppercase brutalist-border hover:bg-[#FF4D2D] hover:text-white transition-colors">
                            Beli
                        </button>
</div>
<div class="scan-line"></div>
</div>
<!-- Grid Item 4 -->
<div class="receipt-card p-3 flex flex-col justify-between" style="clip-path: polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px);"><div class="absolute top-3 left-3 w-3 h-3 rounded-full bg-background border border-outline-variant z-20"></div>
<div>
<div class="bg-cover bg-center w-full h-32 border border-[#E5E1D8] mb-3" data-alt="A structured minimalist canvas tote bag hanging on a simple metal hook against a concrete wall, neutral tones, utilitarian fashion." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWiKx9VUNzsyqpO6JFTsh4rUfw66E0RpWlD2OxEdiPD96UOZW71Wt_qjDFGX1Ma0h6aY2Ly7UsP3tov0Qjra1re3r3MNlQP6y-mcxCFc9or1E9evwe7iNSR6jnRKCOOCNdILi0hOZ85Hbs0utfJJk4w0ShEvLqDzt4b90GH-wbiCa74dTh_6MlK_IK0wdv1Y-O5vodXd4yyhhdzchrqkLyDe9gUYkDOCP6EdXCcLllGI6p3mnelDP-o8GQ48gkAJJfidoOczxhpIo')"></div>
<h3 class="font-bold text-sm text-ink leading-tight">Canvas Heavy Tote</h3>
</div>
<div class="mt-3 pt-3 border-t border-dashed border-[#E5E1D8]">
<p class="font-price-xl text-lg text-ink mb-2 font-label-mono" style="font-variant-numeric: tabular-nums;">Rp95k</p>
<button class="w-full bg-surface-container-highest text-ink py-1 font-bold text-xs uppercase brutalist-border hover:bg-[#FF4D2D] hover:text-white transition-colors">
                            Beli
                        </button>
</div>
<div class="scan-line"></div>
</div>
</div>
<div class="mt-8 flex justify-center">
<button class="bg-transparent border-2 border-ink text-ink px-6 py-2 font-bold text-sm uppercase tracking-wider hover:bg-ink hover:text-white transition-colors">
                    Muat Lebih Banyak
                </button>
</div>
</div>
</main>
<!-- Footer Component -->
<footer class="w-full mt-20 border-t-2 border-dashed border-outline py-8 px-margin-mobile md:px-margin-desktop bg-surface-container-highest dark:bg-surface-container">
<div class="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div class="max-w-md">
<span class="font-label-mono text-label-mono uppercase text-primary mb-2 block">Shopby</span>
<p class="font-caption text-caption text-on-surface dark:text-on-surface">
                    Kami adalah partner Shopee Affiliate. Setiap pembelian melalui link ini membantu kami terus berbagi rekomendasi terbaik.
                </p>
<p class="font-caption text-caption text-on-surface-variant mt-2">
                    © 2024 Shopby Affiliate. Utilitarian Playful Design.
                </p>
</div>
<div class="flex flex-wrap gap-4">
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors" href="#">Tentang Kami</a>
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors" href="#">Kebijakan Privasi</a>
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors" href="#">Syarat &amp; Ketentuan</a>
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors" href="#">Hubungi Kami</a>
</div>
</div>
</footer>


</body></html>