# Shopby Admin - Product Management (Desktop)

Full-width admin layout with sidebar navigation, top bar, and product data table.

## Key Components
- **Sidebar**: Brand header, 4 nav links (Dashboard, Analytics, Products active, Settings), View Storefront CTA, Help & Logout
- **TopNav**: Search bar, notifications bell, help icon, profile avatar
- **Page header**: "Product Links" title + "Add New Link" button
- **Filters**: Category pills (All, Electronics, Fashion, Home, Beauty) + Sort button
- **Data table** (receipt style): Product (with image + ID), Category, Price (tag-yellow bg), Commission, Status (Active/Out of Stock), Actions (copy/edit/delete)
- **Pagination**: Monospaced, minimalist with page numbers

## Notable Design Patterns
- Active nav: `bg-secondary-container text-on-secondary-container font-bold border-l-4 border-primary`
- Row stripe: `border-b border-dashed border-receipt-border`
- Image: notch-clipped via `clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), ...)`
- Out of stock: `opacity-75 grayscale line-through`
- Product ID displayed as mono text below name
