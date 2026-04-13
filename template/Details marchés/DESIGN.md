```markdown
# Design System Specification: The Institutional Authority

## 1. Overview & Creative North Star
### Creative North Star: "The Architectural Ledger"
Public procurement for an institute like 2iE demands a visual language that balances the gravity of institutional governance with the fluid efficiency of modern SaaS. We are moving away from the "cluttered dashboard" trope. Instead, we embrace **The Architectural Ledger**: a system defined by vast white space, precise editorial typography, and a "No-Line" philosophy that uses structural layering to organize complex data.

This design system avoids the "out-of-the-box" look by eschewing standard borders in favor of **Tonal Depth**. We treat the interface as a series of nested physical planes—fine paper stacked on architectural stone—ensuring the user feels they are navigating a high-end, bespoke institutional tool rather than a generic database.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a commanding `primary` (#001E40), evoking deep-sea stability and academic rigor.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. Traditional borders create visual noise that exhausts the user’s eye in data-heavy environments.
- **Boundaries:** Define sections using background color shifts (e.g., a `surface-container-low` section sitting on a `surface` background).
- **Transitions:** Use soft, tonal transitions. If a separation is required, use a 4px vertical "accent bar" of `surface-tint` rather than a box.

### Surface Hierarchy & Nesting
We utilize a five-tier nesting system to create natural depth without clutter:
1.  **Level 0 (Base):** `surface` (#F8F9FA) - The canvas for the entire application.
2.  **Level 1 (Sections):** `surface-container-low` (#F3F4F5) - Used for the retractable sidebar and secondary navigation zones.
3.  **Level 2 (Cards):** `surface-container-lowest` (#FFFFFF) - The primary work surface for data tables and forms.
4.  **Level 3 (Interactions):** `surface-container-high` (#E7E8E9) - Used for hover states on list items.

### The "Glass & Signature" Rule
- **Glassmorphism:** Floating elements like the Profile Dropdown or Tooltips must use a semi-transparent `surface` color with a 12px `backdrop-blur`. This allows the "institutional blue" of the primary CTAs to bleed through softly.
- **Signature Textures:** Use a subtle linear gradient from `primary` (#001E40) to `primary-container` (#003366) for global CTAs. This creates a "weighted" feel that flat hex codes cannot replicate.

---

## 3. Typography: The Editorial Scale
We pair **Manrope** (Display/Headline) for institutional authority with **Inter** (Body/UI) for technical precision.

*   **Display & Headline (Manrope):** High-contrast, wide tracking (-0.02em). These are used for page titles (e.g., "Procurement Oversight") to provide an editorial, magazine-like feel.
*   **Title & Body (Inter):** Tight, functional, and highly legible. Use `title-md` for data headers and `body-md` for standard cell content.
*   **The Weight Hierarchy:** Never use "Bold" for body text. Use `Medium (500)` or `Semi-Bold (600)` in `on-surface-variant` to create emphasis. This maintains the "Lightness" of the architectural style.

---

## 4. Elevation & Depth
### The Layering Principle
Depth is achieved through "Tonal Stacking." To elevate a card, do not reach for a shadow first; instead, place a `surface-container-lowest` (#FFFFFF) element onto a `surface-container` (#EDEEEF) background.

### Ambient Shadows
When an element must float (e.g., a modal or a primary action card):
- **Shadow Token:** `0px 12px 32px rgba(0, 30, 64, 0.06)`
- **The Tint Rule:** Shadows must never be pure grey. They must be tinted with the `primary` hue (as shown above) to simulate natural ambient light reflecting off the deep blue brand elements.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., in high-contrast mode), use a **Ghost Border**: `outline-variant` at 15% opacity. 100% opaque borders are strictly forbidden.

---

## 5. Components

### Buttons: The Weighted Action
- **Primary:** Gradient (`primary` to `primary-container`), `md` (0.375rem) corner radius. Use `on-primary` text.
- **Secondary:** Transparent background with a `Ghost Border`.
- **Tertiary:** Pure text with `primary` color, used for "Cancel" or "Back" actions to minimize visual weight.

### Cards & Data Tables
- **The "No-Divider" Rule:** Data tables must not use horizontal lines between rows. Use alternating row colors (`surface` and `surface-container-low`) or 16px of vertical white space to define rows.
- **Header:** Use `label-sm` in all-caps with 0.1em tracking for table headers to create an "Archive" feel.

### Input Fields
- **Style:** "Soft Inset." Use `surface-container-highest` for the background with no border. On focus, transition to a `primary` 2px bottom-border only. This mimics a physical ledger line.

### Procurement Progress Chips
- Use `secondary-container` for neutral states. Use high-chroma `on-error_container` or `success` tokens only for final statuses (e.g., "Rejected" or "Awarded").

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts in the Topbar (e.g., breadcrumbs left-aligned, profile right-aligned with a wide gap) to create a sense of bespoke design.
*   **Do** use "Breathing Room." If you think a section has enough padding, add 8px more.
*   **Do** use `primary-fixed-dim` for inactive sidebar icons to maintain brand presence without competing with content.

### Don't:
*   **Don't** use 1px dividers to separate the sidebar from the main content. Use a subtle change from `surface-container-low` to `surface`.
*   **Don't** use pure black (#000000) for text. Use `on-surface` (#191C1D) for a softer, premium reading experience.
*   **Don't** use sharp 90-degree corners. Even the most "professional" tool needs the `sm` (0.125rem) radius to feel modern and tactile.

---

## 7. Layout Signature
The **Retractable Sidebar** should not push content; it should overlay it with a heavy `backdrop-blur`. This reinforces the idea that the "Navigation" is a tool sitting *above* the "Ledger." The **Topbar** should be transparent until the user scrolls, at which point it transitions to `surface-container-lowest` with a 10% `outline-variant` bottom-border (The Ghost Border).```