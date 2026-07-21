# Shopby Admin - Login (Mobile + Desktop)

Two variants. First is mobile-first receipt card login, second is centered desktop receipt-style.

## Variant 1: Mobile Login (Receipt Card)

```html
<!-- Shopby Admin - Login Mobile -->
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Shopby Admin - Login</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&amp;family=JetBrains+Mono:wght@500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }
        .brutalist-border {
            border: 1px solid #906f69;
        }
        .brutalist-input {
            border: none;
            border-bottom: 2px dashed #e5beb6;
            background-color: transparent;
            border-radius: 0;
        }
        .brutalist-input:focus {
            outline: none;
            border-bottom-color: #b51c00;
            box-shadow: none;
        }
        .shimmer-btn:hover {
            position: relative;
            overflow: hidden;
        }
        .shimmer-btn:hover::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
            transform: skewX(-20deg);
            animation: shimmer 1s infinite;
        }
        @keyframes shimmer {
            100% { left: 200%; }
        }
        .active-shift:active {
            transform: translate(2px, 2px);
        }
        .bg-texture {
            background-image: radial-gradient(#e5e1e9 1px, transparent 1px);
            background-size: 8px 8px;
        }
    </style>
</head>
<body class="bg-background bg-texture min-h-screen flex items-center justify-center p-margin-mobile text-on-surface font-body-md antialiased">
<main class="w-full max-w-max-width mx-auto">
<div class="bg-surface-container-lowest brutalist-border relative flex flex-col">
<div class="p-6 border-b border-dashed border-outline-variant text-center">
<div class="flex justify-center mb-2">
<span class="material-symbols-outlined text-[48px] text-primary" style="font-variation-settings: 'FILL' 1;">receipt_long</span>
</div>
<h1 class="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tighter">SHOPBY ADMIN</h1>
<p class="font-label-mono text-label-mono text-on-surface-variant mt-2">SYS_AUTH_REQ // SECURE_PORTAL</p>
</div>
<div class="p-6 pb-8">
<form action="#" class="space-y-8" method="POST">
<div class="relative">
<label class="block font-label-mono text-label-mono text-on-surface mb-1" for="email">Email Address</label>
<div class="flex items-center mt-1">
<span class="material-symbols-outlined text-on-surface-variant mr-3 absolute">mail</span>
<input class="brutalist-input w-full pl-10 py-2 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0" id="email" name="email" placeholder="admin@shopby.com" required="" type="email"/>
</div>
</div>
<div class="relative">
<label class="block font-label-mono text-label-mono text-on-surface mb-1" for="password">Passcode</label>
<div class="flex items-center mt-1">
<span class="material-symbols-outlined text-on-surface-variant mr-3 absolute">lock</span>
<input class="brutalist-input w-full pl-10 py-2 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0" id="password" name="password" placeholder="••••••••" required="" type="password"/>
</div>
</div>
<div class="pt-6 border-t border-dashed border-outline-variant mt-8">
<button class="w-full bg-primary text-on-primary font-label-mono text-label-mono py-4 rounded-full active-shift shimmer-btn transition-transform flex items-center justify-center gap-2" type="submit">
<span>AUTHORIZE_LOGIN</span>
<span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
</button>
</div>
</form>
</div>
<div class="p-4 bg-surface-container-low border-t border-outline flex flex-col items-center gap-3">
<a class="font-caption text-caption text-on-surface hover:text-primary transition-colors border-b border-transparent hover:border-primary" href="#">Forgot Passcode?</a>
<div class="w-full border-t border-dashed border-outline-variant my-1"></div>
<a class="font-caption text-caption text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1" href="#">
<span class="material-symbols-outlined" style="font-size: 16px;">storefront</span> Return to Storefront
</a>
</div>
<div class="absolute -bottom-3 left-0 w-full h-3 overflow-hidden flex justify-around opacity-50">
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
<div class="w-2 h-2 rounded-full bg-background mt-1"></div>
</div>
</div>
</main>
</body></html>
```

## Variant 2: Desktop Login (Centered Receipt)

```html
<!-- Shopby Admin - Login (Desktop centered, receipt style with clip-notch) -->
<!DOCTYPE html>
<html class="h-full" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Shopby Admin - Login</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&amp;family=Plus+Jakarta+Sans:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<style>
        .clip-notch { clip-path: polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px); }
        .punch-hole::before {
            content: '';
            position: absolute;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            width: 12px; height: 12px;
            background-color: #FAFAF7;
            border-radius: 50%;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
        }
        .shimmer-btn:hover { position: relative; overflow: hidden; }
        .shimmer-btn:hover::after {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 50%; height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
            transform: skewX(-20deg);
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer { 100% { left: 200%; } }
        .input-underline { border: none; border-bottom: 2px solid #E5E1D8; border-radius: 0; background: transparent; }
        .input-underline:focus { outline: none; border-bottom-color: #1a1c1b; box-shadow: none; }
    </style>
</head>
<body class="h-full bg-receipt-bg text-on-surface font-body-md flex flex-col justify-center items-center p-4">
<main class="w-full max-w-[480px]">
<div class="relative bg-white border border-divider-color clip-notch punch-hole pt-12 pb-8 px-8 flex flex-col">
<div class="text-center mb-8 pb-8 border-b border-dashed border-divider-color">
<h1 class="font-display-lg-mobile md:font-display-lg text-ink tracking-tighter">Shopby Admin</h1>
<p class="font-label-mono text-label-mono text-tertiary mt-2">SYSTEM ACCESS // SECURE LOGIN</p>
</div>
<form action="#" class="flex flex-col gap-6" method="POST">
<div>
<label class="block font-label-mono text-label-mono text-ink mb-1" for="email">Email Address</label>
<input class="w-full input-underline py-2 font-body-md text-body-md text-ink" id="email" name="email" placeholder="admin@shopby.com" required="" type="email"/>
</div>
<div>
<div class="flex justify-between items-center mb-1">
<label class="block font-label-mono text-label-mono text-ink" for="password">Password</label>
<a class="font-caption text-caption text-primary hover:underline" href="#">Forgot?</a>
</div>
<input class="w-full input-underline py-2 font-body-md text-body-md text-ink" id="password" name="password" required="" type="password"/>
</div>
<div class="flex items-center mt-2">
<input class="h-4 w-4 text-vivid-orange border-divider-color rounded focus:ring-vivid-orange" id="remember-me" name="remember-me" type="checkbox"/>
<label class="ml-2 block font-caption text-caption text-tertiary" for="remember-me">Remember this device</label>
</div>
<div class="mt-8 pt-8 border-t border-dashed border-divider-color">
<button class="w-full bg-vivid-orange text-ink font-headline-md text-headline-md py-4 rounded-full shimmer-btn transition-transform active:translate-x-[2px] active:translate-y-[2px]" type="submit">LOGIN</button>
</div>
</form>
</div>
<div class="mt-8 text-center">
<a class="inline-flex items-center gap-2 font-label-mono text-label-mono text-tertiary hover:text-ink transition-colors" href="#">
<span class="material-symbols-outlined text-[16px]">arrow_back</span> Back to storefront
</a>
</div>
</main>
</body></html>
```

## Key Components
- Receipt card container with notch/punch-hole decorations
- Dashed dividers, tear-off footer
- Brutalist inputs (underline style, no border-radius)
- Shimmer effect on primary button hover
- "Return to Storefront" link
- Decorative hole punches simulating torn receipt
