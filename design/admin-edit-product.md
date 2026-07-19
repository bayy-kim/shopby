# Shopby Admin - Edit Product

Centered receipt-style form for editing a single product.

## Key Components
- **Toast notification** (hidden by default, slides in on save)
- **Receipt container**: Jagged edge top/bottom simulation
- **Form fields**:
  1. Item No. (readonly): `#PRD-90210-XYZ`
  2. Product Name (headline input)
  3. Category (select dropdown with arrow icon)
  4. Affiliate Link (URL input)
  5. Price (IDR with Rp prefix, price-xl font)
  6. Status toggle (Active/Inactive)
- **Actions**: Save Changes (vivid-orange with scan-line), Discard Edits (dashed underline)
- **Footer**: "*** END OF RECORD ***"

## Design Patterns
- Receipt top/bottom jagged edge: radial-gradient background
- Brutalist inputs: no border, just bottom border
- Price: `font-price-xl text-price-xl` with `Rp` prefix in primary color
- Status toggle: `w-14 h-7` with vivid-orange active state
- Save button: scan-line animation, active shift effect
- Toast: tag-yellow bg, ink border, shadow offset, slides from top
