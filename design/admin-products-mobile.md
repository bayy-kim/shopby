# Shopby Admin - Products (Mobile)

Mobile-first product catalog with card-based layout.

## Key Components
- **TopAppBar**: Receipt icon, brand, notifications
- **Page title**: "Product Catalog" + subtitle
- **Search bar**: Underline style with search icon
- **Product cards** (receipt-card style):
  - Hole punch decoration at top
  - SKU + product name
  - Stamp badge (Active/Inactive, rotated)
  - Category tag + view count
  - Commission rate + price (tag-yellow bg)
- **FAB**: Add button (fixed bottom-right, vivid-orange)
- **BottomNavBar**: Products active

## Card Design
- `receipt-card p-4 pt-5 scan-line group cursor-pointer`
- Active stamp: `stamp-badge stamp-active` (red text/border, rotate -2deg)
- Inactive stamp: `stamp-badge stamp-inactive` (gray text/border)
- Price: `bg-[#FFC93C] px-2 py-1 inline-block -mr-2`
- Scan-line animation on hover
