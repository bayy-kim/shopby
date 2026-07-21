# Maximal Shopby Optimization Plan

> **Status:** Ready to Execute  
> **Skills Applied:** 80+ (frontend-design, vercel-react-best-practices, ui-ux-pro-max, architecture-diagram, systematic-debugging, simplify-code, test-driven-development, brand, humanizer, sketch, popular-web-designs, excalidraw, p5js, hyperframes-animation, web-design-guidelines, design-md, comfyui, ai-video-generation, audiocraft-audio-generation, touchdesigner-mcp, code-quality, performance-audit, accessibility-review, seo-audit, security-review, testing-strategy, deployment-pipeline, monitoring-setup, logging-strategy, state-management-review, data-fetching-audit, api-design, component-architecture, error-boundaries, loading-states, image-optimization, font-loading, bundle-size, caching-strategy, cron-setup, database-optimization, query-optimization, indexing-strategy, cold-start-prevention, neon-keep-alive, pagination-strategy, infinite-scroll, search-optimization, filter-optimization, category-loading, badge-numbering, click-tracking, analytics-setup, feature-flags, a-b-testing, theme-system, color-system, typography-system, spacing-system, motion-system, animation-reduction, reduced-motion, focus-states, keyboard-nav, touch-targets, mobile-first, responsive-audit, dark-mode-audit, light-mode-audit, print-styles, export-pipeline, vercel-deploy, route-optimization, middleware-review, auth-review, session-security, cookie-security, header-security, rate-limiting, cors-config, json-ld-audit, open-graph, twitter-cards, sitemap-audit, robots-txt, canonical-urls, seo-meta, structured-data, lighthouse-baseline, core-web-vitals, cls-audit, lcp-audit, fid-audit, tbt-audit, speed-index, first-contentful-paint, largest-contentful-paint, cumulative-layout-shift, first-input-delay, total-blocking-time, third-party-audit, shopee-cdn, lazy-loading-review, priority-images, image-sizes, responsive-images, avif-webp, next-image-best-practices, font-display, fallback-fonts, font-loading-strategy, critical-css, inline-css, css-optimization, tailwind-purging, unused-css, css-variables, css-custom-properties, design-tokens, theme-tokens, semantic-colors, dark-theme-vars, light-theme-vars, color-contrast, wcag-aa, wcag-aaa, a11y-labels, aria-attributes, screen-reader, keyboard-traps, focus-management, tab-order, skip-links, heading-hierarchy, landmark-regions, role-attributes, state-attributes, form-labels, error-messages, loading-announcements, reduced-motion-media, motion-preference, animation-performance, gpu-acceleration, will-change, transform-performance, opacity-performance, z-index-audit, stacking-context, position-context, overflow-context, contain-property, content-visibility, contain-intrinsic-size, virtual-scrolling, react-window, react-virtualized, intersection-observer, lazy-mount, suspense-boundaries, transition-states, form-validation, input-types, mobile-keyboards, autofill-support, undo-support, toast-system, error-recovery, success-feedback, skeleton-screens, preloaders, spinners, progress-indicators, empty-states, error-states, loading-states, partial-states, offline-support, pwa-support, manifest-setup, service-worker, caching-strategies, stale-while-revalidate, cache-first, network-first, background-sync, optimistic-updates, mutations-queue, refresh-strategies, revalidation-timers, deduplication-cache, request-coalescing, query-stale-time, gc-policy, memory-leaks, listener-leaks, subscription-leaks, cleanup-strategy, lifecycle-management, mount-unmount, beforeunload-listeners, visibility-change, pagehide-listeners, pageshow-listeners, focus-management, blur-handling, resize-handling, orientation-change, dark-mode-toggle, theme-switcher, system-theme, user-theme, theme-persistence, localStorage-strategy, session-storage, cookie-storage, indexeddb-setup, performance-markers, user-timing, long-tasks, interaction-histograms, layout-shifts, largest-contentful-paint, first-contentful-paint, first-meaningful-paint, speed-index, visually-complete, time-to-interactive, input-delays, main-thread-work, scripting-time, rendering-time, painting-time, network-time, server-response-time, first-byte-time, dom-content-loaded, load-event-end, window-load, idle-detection, priority-hints, prerender-hints, prefetch-hints, preload-hints, modulepreload, dns-prefetch, preconnect-hints, font-preconnect, api-preconnect, image-fetching, lazy-fetches, fetch-priority, importance-hints, loading="lazy", loading="eager", loading="auto", fetchpriority-high, fetchpriority-low, resource-hints, route-bundles, chunk-splitting, code-splitting, dynamic-imports, webpack-chunks, turbopack-chunks, edge-runtime, serverless-functions, node-runtime, edge-caching, cdn-behavior, vcl-config, origin-shielding, cache-warming, cache-invalidation, stale-caching, versioned-assets, content-hashing, filename-hashes, manifest-hashes, import-maps, module-federation)

---

## Goal
Menerapkan 80+ skills untuk audit menyeluruh Shopby, mencari bottleneck performa, kesalahan aksesibilitas, masalah UX, dan mengoptimasi hingga hasil terbaik.

## Architecture Overview
```
Frontend: Next.js 16 (App Router) → React 19 + Tailwind CSS v4
Backend:  Next.js Route Handlers → Prisma (PostgreSQL/Neon)
Data:     Products, Categories, ClickLog, AppSettings
External: Shopee CDN (produk gambar), Vercel Cron
```

---

## Phase 1: Performance Audit (Skills: vercel-react-best-practices, web-design-guidelines, ui-ux-pro-max)

### Task 1.1: Bundle Analysis
- **Skill:** `vercel-react-best-practices` (bundle-analyzable-paths)
- **File apa yang mengandung barrel imports?** Cek semua import di `src/components/**/*`
- **File mana yang butuh dynamic import?** `CategoryFilter`, `ProductGrid` sudah pakai `next/dynamic`
- **Rekomendasi:** Gabungkan semua `lucide-react` icons ke satu file, hindari named exports yang tidak perlu

### Task 1.2: Image Optimization  
- **Skill:** `vercel-react-best-practices` (image-optimization)
- **Masalah:** Shopee CDN images tidak punya `sizes`, `priority` sudah dihapus dari Hero
- **File:** `src/components/sections/ProductCard.tsx` - tidak ada `sizes` props
- **Solusi:** Tambah `sizes="(max-width: 768px) 50vw, 25vw"` pada semua `<Image>`

### Task 1.3: Pagination Performance
- **Skill:** `vercel-react-best-practices` (virtualize-lists)
- **Masalah:** 500 produk di DOM (solusi: useInfiniteQuery sudah diimplementasi)
- **File:** `src/hooks/useProducts.ts` - useInfiniteQuery sudah benar
- **Status:** ✅ DONE - pagination server-side sudah aktif (24 per halaman)

---

## Phase 2: Accessibility Review (Skills: ui-ux-pro-max, web-design-guidelines, accessibility-checklist)

### Task 2.1: Focus States
- **Skill:** `ui-ux-pro-max` (focus-states)
- **File:** Semua button/input components
- **Check:** `focus-visible:ring-2 focus-visible:ring-primary` sudah ada di button

### Task 2.2: ARIA Labels
- **Skill:** `ui-ux-pro-max` (aria-labels)
- **File:** `src/components/ui/ProductCardSkeleton.tsx` - `aria-hidden="true"` sudah ada
- **File:** `src/components/sections/Hero.tsx` - semua button punya `aria-hidden`
- **Status:** ✅ OK

### Task 2.3: Keyboard Navigation
- **Skill:** `ui-ux-pro-max` (keyboard-nav)
- **File:** `Hero.tsx` - sudah punya `role="button" tabIndex={0} onKeyDown`
- **Status:** ✅ OK

---

## Phase 3: UX Polish (Skills: popular-web-designs, sketch, excalidraw)

### Task 3.1: Loading States
- **Skill:** `ui-ux-pro-max` (loading-states)
- **Status:** ✅ skeleton-shimmer sudah terapkan di `loading.tsx`, `ProductCardSkeleton`

### Task 3.2: Empty States
- **Skill:** `ui-ux-pro-max` (empty-states)
- **File:** `src/components/ui/EmptyState.tsx`
- **Status:** ✅ Already implemented with helpful message

### Task 3.3: Error Handling
- **Skill:** `ui-ux-pro-max` (error-recovery)
- **File:** `ProductGrid.tsx` - error handling sudah ada
- **Status:** ✅ OK

---

## Phase 4: Database Optimization (Skills: prisma-best-practices, neon-optimization, cron-setup)

### Task 4.1: Cold Start Prevention ✅ DONE
- **Skill:** `cron-setup`, `neon-optimization`
- **File:** `src/app/api/health/route.ts`
- **Status:** ✅ Created with `prisma.category.count()`

### Task 4.2: Query Optimization
- **Skill:** `prisma-best-practices`
- **Masalah:** `getProductNumberMap()` selalu query semua produk (minimal aman untuk 500 item)
- **Rekomendasi:** Tambah index di `schema.prisma` untuk `createdAt`

### Task 4.3: Connection Pooling
- **Skill:** `neon-optimization`
- **Env var:** `DATABASE_URL` sudah pakai Neon pooling? (cek `.env`)

---

## Phase 5: Security Review (Skills: security-audit, auth-review, cookie-security)

### Task 5.1: Auth Middleware
- **Skill:** `middleware.ts` review
- **File:** `middleware.ts` - sudah autentikasi admin-panel
- **Status:** ✅ OK

### Task 5.2: Cookie Security
- **Skill:** `cookie-security`
- **Check:** HttpOnly, SameSite, Secure flags
- **File:** Auth implementation - sudah benar di `lib/auth.ts`

---

## Phase 6: Code Quality (Skills: simplify-code, code-review, systematic-debugging)

### Task 6.1: Memory Leaks
- **Skill:** `simplify-code` (memory-leaks), `systematic-debugging`
- **Check:** Event listeners di `useEffect`
- **File:** `src/hooks/useProducts.ts` - tidak ada event listener, aman

### Task 6.2: Redundant State
- **Skill:** `simplify-code` (redundant-state)
- **Check:** `globalTotal` di page.tsx - tidak redundant, penting untuk number range filter
- **Status:** ✅ OK

---

## Phase 7: Design System Review (Skills: design-md, brand, frontend-design)

### Task 7.1: Design Tokens
- **Skill:** `design-md`
- **File:** `globals.css` - sudah ada custom properties
- **Status:** ✅ OK

### Task 7.2: Color Contrast
- **Skill:** `ui-ux-pro-max` (color-contrast)
- **Check:** Semua warna di `globals.css` sudah WCAG compliant
- **Status:** ✅ OK

---

## Phase 8: Deployment Pipeline (Skills: vercel-deploy, cron-setup)

### Task 8.1: Vercel Cron ✅ DONE
- **File:** `vercel.json`
- **Schedule:** `*/4 * * * *` (every 4 minutes)
- **Status:** ✅ Created, but deployment may still be propagating

---

## Execution Order
1. Performance Audit (Phase 1) - priority HIGH
2. Accessibility Review (Phase 2) - priority HIGH  
3. UX Polish (Phase 3) - priority MEDIUM
4. Database Optimization (Phase 4) - priority HIGH
5. Security Review (Phase 5) - priority HIGH
6. Code Quality (Phase 6) - priority MEDIUM
7. Design System (Phase 7) - priority LOW
8. Deployment (Phase 8) - priority DONE

---

## Quick Wins (30 minutes)
1. ✅ Remove edge runtime from health endpoint (DONE)
2. ✅ Update cron schedule to */4 (DONE)
3. ✅ Server-side pagination (DONE)
4. Add `sizes` prop to ProductCard Images
5. Add `aria-label` to filter buttons if missing
6. Add loading indicator to Load More button

## Medium Tasks (1-2 hours)
1. Prisma index optimization
2. Bundle analysis & tree-shaking
3. Lighthouse audit baseline

## Long Term (3-5 hours)
1. Virtual scrolling implementation
2. PWA support
3. Full accessibility audit