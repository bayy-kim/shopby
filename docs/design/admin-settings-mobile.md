# Shopby Admin - Settings (Mobile)

Mobile-first settings page with receipt card sections.

## Key Components
- **TopAppBar**: Brand + notifications
- **Page title**: "Configuration" with settings icon
- **Sections**:
  1. **Store Profile**: Store name, contact email, currency selector
  2. **Payout Settings**: Auto-payouts toggle, bank account (masked + edit)
  3. **Security**: Update password link, 2FA enable button
- **Save button**: Full-width vivid-orange with scan-line animation
- **System version** footer: "Sys_Ver 2.4.1"
- **BottomNavBar**: Settings active

## Design Patterns
- Section receipts: `receipt-card p-4` with label badges
- Brutalist inputs: `border-bottom: 2px solid #E5E1D8`
- Toggle switch: peer-checked with vivid-orange
- 2FA enable button: `bg-brand-yellow text-brand-ink border border-brand-ink`
- Background: paper texture with radial-gradient dots
