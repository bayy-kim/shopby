# Shopby Admin - Settings & Configuration (Desktop)

Full-width admin layout with sidebar, top bar, and settings form with vertical tabs.

## Key Components
- **Sidebar**: Standard nav with Settings active
- **TopNav**: Minimal (mobile brand left, notification/help/profile right)
- **Vertical tabs**: General, Storefront (active), Payouts, Account
- **Sections** (receipt card style with punch-hole):
  1. **Storefront Settings**: Store name, URL, bio, branding (logo upload + color picker)
  2. **Payout Information**: Bank name, account number, holder name, min payout threshold
  3. **Security**: Change Password link, 2FA toggle
- **Sticky bottom bar**: Discard + Save Changes buttons

## Design Patterns
- Section cards: `receipt-card notch-top-left p-6` with `.punch-hole`
- Toggle switch: peer-checked styling with `#FF4D2D` color
- Nested dashed dividers between sections
- Hover effects on interactive rows
