# Shopby Admin - Analytics (Mobile + Desktop)

## Mobile Analytics

Mobile-first with TopAppBar, scrollable content, and BottomNavBar.

### Key Components
- Period filter with dropdown
- Bento grid: Total Clicks (full width + trend), Conversion Rate, Avg Order Value
- Faux bar chart with SVG line overlay + day-of-week labels
- Top Traffic Sources ranked list
- BottomNavBar with Analytics active

## Desktop Analytics Overview

Full sidebar + TopNav layout.

### Key Components
- **Page Header**: "Analytics" title + date range selector (Last 30 Days)
- **4 Metric Cards**: Total Revenue (Rp 15.400), Avg Order Value (Rp 245.000), Conversion Rate (4.2%), Bounce Rate (28.5%)
- **Chart**: Clicks vs Conversions — grouped bar chart with legend
- **Top Traffic Sources**: Ranked with progress bars (Instagram 45%, TikTok 30%, Direct 15%, Twitter 10%)
- **Geographic Distribution**: City table (Jakarta, Surabaya, Bandung, Medan) with user counts

### Card Design
- `brutalist-card p-5 pt-8 rounded` with icon header
- Icons: payments, receipt_long, shopping_cart_checkout, exit_to_app
- Trend indicators: trending_up (green), trending_flat, trending_down (error)
- Progress bars: `w-24 h-2 bg-surface-container-high rounded-full overflow-hidden` with colored fill
