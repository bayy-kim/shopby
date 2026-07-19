# Shopby Admin - Dashboard Empty State (Mobile)

Mobile dashboard showing metrics, recent activity, and empty state.

## Key Components
- **TopAppBar**: Menu icon, "SHOPBY_ADMIN" brand, notifications with dot
- **Metrics Card** (notched top):
  - Total Revenue: Rp 42,500,000
  - Daily Clicks: 1,204
  - Generate Report button (shadow offset style)
- **Recent Activity**: 3 order items with receipt icon, order ID, time, amount
- **Empty State**: Icon + "NO_NEW_MESSAGES" centered in dashed border box
- **BottomNavBar**: Dashboard active (icon only, labels hidden)

## Design Patterns
- Notched card: `clip-path: polygon(0 0, calc(50% - 10px) 0, 50% 10px, calc(50% + 10px) 0, 100% 0, 100% 100%, 0 100%)`
- Receipt edge divider: `linear-gradient(to right, transparent 50%, #e2e3e0 50%) background-size: 8px 1px`
- Shadow offset button: `shadow-[2px_2px_0px_0px_rgba(26,28,27,1)] active:translate-y-[2px] active:translate-x-[2px]`
- Background texture: SVG pattern with circles
- Bottom nav: labels hidden with `hidden` class (icons only)
