# Shopby Admin - Dashboard (Mobile + Desktop)

## Mobile Dashboard

Mobile-first layout (max-width 480px) with fixed TopAppBar and BottomNavBar.

### Key Components
- **TopAppBar**: Receipt icon, "SHOPBY ADMIN" brand, notifications bell
- **Period filter**: "PERIOD — LAST 7 DAYS" with dropdown
- **Key Metrics Bento Grid**: Total Clicks (full width, with trend), Conversion Rate, Avg Order Value (secondary-container bg)
- **Chart**: Bar chart + SVG line overlay, day labels
- **Top Traffic Sources**: Ranked list (Instagram 45%, TikTok 30%, Direct 15%)
- **BottomNavBar**: Dashboard (active with secondary-container bg), Analytics, Products, Settings

## Desktop Dashboard Overview

Full sidebar + TopNav layout.

### Key Components
- **Sidebar**: Brand (Shopby logo + text), Dashboard active, Analytics, Products, Settings, "Create New Link" CTA
- **TopNav**: Search bar, notifications, profile avatar
- **Stats Grid** (4 cards): Total Sales $24,590, Active Links 142, Total Clicks 89.2K, Est. Commission $3,420
- **Chart**: SVG line chart with grid lines, labeled axes (Mon-Sat)
- **Recent Activity Table**: Product | Clicks | Status (Active/Ended/Draft)

### Card Design
- `price-tag-card`: Bold mono numbers with uppercase labels
- Hover: `hover:scale-[1.02] hover:shadow-lg transition-transform`
- Card 4 (commission): `hover:bg-secondary-container` for highlight

## Design Patterns
- Mobile: `fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-max-width`
- Active bottom nav: `bg-secondary-container text-on-secondary-container rounded-full`
- Chart grid: dashed lines with mono labels
- Status badges: inline-flex with colored dot indicator
