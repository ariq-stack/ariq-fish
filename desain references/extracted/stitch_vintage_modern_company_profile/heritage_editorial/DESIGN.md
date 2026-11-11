---
name: Heritage Editorial
colors:
  surface: '#fef8f4'
  surface-dim: '#dfd9d5'
  surface-bright: '#fef8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f2ee'
  surface-container: '#f3ede9'
  surface-container-high: '#ede7e3'
  surface-container-highest: '#e7e1dd'
  on-surface: '#1d1b19'
  on-surface-variant: '#40474f'
  inverse-surface: '#32302e'
  inverse-on-surface: '#f6f0ec'
  outline: '#707881'
  outline-variant: '#c0c7d1'
  surface-tint: '#006399'
  primary: '#00507d'
  on-primary: '#ffffff'
  primary-container: '#0369a1'
  on-primary-container: '#cbe4ff'
  inverse-primary: '#94ccff'
  secondary: '#6e5a52'
  on-secondary: '#ffffff'
  secondary-container: '#f5dad0'
  on-secondary-container: '#735e56'
  tertiary: '#634706'
  on-tertiary: '#ffffff'
  tertiary-container: '#7e5f1f'
  on-tertiary-container: '#ffdda1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cde5ff'
  primary-fixed-dim: '#94ccff'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#004b74'
  secondary-fixed: '#f8ddd3'
  secondary-fixed-dim: '#dbc1b7'
  on-secondary-fixed: '#271812'
  on-secondary-fixed-variant: '#55433c'
  tertiary-fixed: '#ffdea5'
  tertiary-fixed-dim: '#e9c176'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4201'
  background: '#fef8f4'
  on-background: '#1d1b19'
  surface-variant: '#e7e1dd'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: 4.25rem
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Playfair Display
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 3rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.25rem
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-tablet: 2.5rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a refined intersection of archival heritage and contemporary digital clarity. Built for institutional and corporate storytelling, it evokes the gravitas of a prestige publishing house or bespoke advisory firm, tempered by clean modern interface discipline. 

The aesthetic marries classical editorial sensibilities—generous margins, deliberate typographic contrast, and restrained decorative flourishes—with functional UI architecture. The visual atmosphere leans into warm, tactile parchment planes rather than sterile digital whites, grounding users in an environment that feels deliberate, permanent, and authoritative. Visual accents bridge old-world craftsmanship (patinated bronze, fine hairline borders) with a deep, structured ocean blue that directs focus and actions.

## Colors

The palette establishes an intentional dialogue between warm, grounding dark neutrals and crisp maritime accents:

- **Primary (`#0369A1`)**: Deep Ocean Blue serves as the decisive interactive signal. It commands focal links, primary button fills, focus rings, and high-priority state indicators, delivering institutional clarity against pale backgrounds.
- **Secondary (`#2D1E18`)**: Deep Espresso Brown acts as the dominant typographic base and anchor surface color. Used for headings, primary text, and dense contrasting header bands, providing richer optical depth than raw neutral black.
- **Tertiary (`#C5A059`)**: Antique Bronze/Gold provides hairline accents, bespoke dividers, delicate framing rules, active pill borders, and micro-ornamental flourishes without overwhelming interface pragmatism.
- **Neutral Surface Palette**: Grounded in `#FDFBF7` (Canvas/Base) and `#F5EFEB` (Surface Container), moving into `#EFE6DC` for recessed panels and borders. This parchment spectrum reduces eye fatigue while reinforcing an editorial print quality.
- **Text & Contrast Strategy**: Primary copy defaults to `#2D1E18` over parchment tones, yielding WCAG AAA contrast. Secondary copy uses a muted deep taupe (`#6B584E`). Avoid pure `#000000` anywhere in the design.

## Typography

The typographic system leverages tension between two distinct genres: the classic, high-contrast transitional serif **Playfair Display** for editorial pacing, and the neutral, rigorously engineered neo-grotesque **Inter** for sustained technical legibility.

- **Playfair Display** commands `display` and `headline` levels. It must be styled with tight letter-spacing at large sizes and preserved generous line-heights to honor classical proportions.
- **Inter** handles all `body`, `label`, and data metrics. To maintain architectural harmony with the headlines, body copy is tracked neutrally and rendered in dark espresso rather than stark black.
- **Micro-labels and Overlines**: Rendered via `label-sm`, set in all-caps with widened tracking (`0.08em`) to act as refined section headers, dates, and metric qualifiers.

## Layout & Spacing

The layout model adheres to a structured 12-column grid system balancing editorial asymmetry with enterprise predictability. Maximum readable layout container width is fixed at `1280px` (`80rem`) centered within the parchment viewport.

- **Desktop (>= 1024px)**: 12-column grid, `2.5rem` gutters, `4rem` outer canvas margins. Feature modules often adopt asymmetric 5/7 column divisions reminiscent of archival editorial journals.
- **Tablet (768px – 1023px)**: 8-column grid, `1.5rem` gutters, `2.5rem` outer margins. Content groups reflow into balanced 4/4 or full-width blocks.
- **Mobile (< 768px)**: 4-column grid, `1rem` gutters, `1.25rem` outer margins. Multi-column editorial compositions collapse into single-column vertical stacks.
- **Rhythm**: Component interiors prioritize comfortable internal breathing room, with vertical paragraph gaps locked to `space-md` (`1rem`) and section partitions using `space-xl` (`2.5rem`) paired with subtle horizontal hairline dividers.

## Elevation & Depth

This design system eschews heavy drop shadows in favor of tonal layering, warm ambient diffusion, and precise architectural boundaries:

- **Tonal Planes**: Depth is expressed primarily by nesting surfaces. The base viewport sits on `#FDFBF7`. Lifted surfaces (cards, sidebars) rest on `#F5EFEB`, and active or elevated panels occupy `#FFFFFF` framed by a 1px border of `#EFE6DC`.
- **Ambient Warm Shadows**: When physical lift is needed (dialogs, dropdowns, floating navigational bars), shadows use a warm espresso cast rather than neutral gray:
  - *Resting Card*: No shadow; defined strictly by a 1px solid `#EFE6DC` border.
  - *Hover Elevation*: `0 4px 20px -2px rgba(45, 30, 24, 0.07), 0 1px 3px 0 rgba(45, 30, 24, 0.04)`.
  - *Floating Menu / Modal*: `0 16px 32px -4px rgba(45, 30, 24, 0.12), 0 4px 8px -2px rgba(45, 30, 24, 0.06)`.
- **Hairlines and Frames**: Double-lines (a 1px solid `#C5A059` accent nested inside a 3px padding zone) are reserved for premium certificates, callout stats, and block quotes to invoke vintage ledger craft.

## Shapes

The design system employs a soft, crisp border radius (`roundedness: 1` = `0.25rem` / `4px`). This structural choice mimics traditional hand-trimmed letterpress card stock:

- **Standard Components**: Buttons, inputs, chips, and small badges default to `0.25rem` (`4px`).
- **Containers**: Cards, banners, and modals use `rounded-lg` (`0.5rem` / `8px`) to maintain tailored structure without looking boxy or utilitarian.
- **Avatars & Status Dots**: Retain pure circular geometries (`50%`), providing focal contrast against crisp rectilinear containers.

## Components

- **Buttons**:
  - *Primary*: Deep Ocean Blue (`#0369A1`) solid background, `#FFFFFF` text, `0.25rem` radius, `0.625rem 1.25rem` padding. Subtle hover shifts to `#0284C7`.
  - *Secondary*: Deep Espresso (`#2D1E18`) outline (1px), transparent background, `#2D1E18` text. Hover fills with `#2D1E18` and turns text `#FDFBF7`.
  - *Tertiary / Editorial*: Ghost style, `#0369A1` text with an underline offset of 4px and Antique Gold (`#C5A059`) inline arrow glyph.
- **Cards**:
  - Constructed on `#FFFFFF` or `#F5EFEB`, bounded by 1px solid `#EFE6DC`. 
  - Featured corporate cards integrate a top accent rule: 2px solid `#C5A059`.
  - Inner padding is spacious: `space-lg` (`1.5rem`) on desktop.
- **Inputs & Form Controls**:
  - Text fields use a `#FDFBF7` surface with a 1px `#EFE6DC` border.
  - Active/Focus state shifts border immediately to `#0369A1` accompanied by a 2px outer glow of `rgba(3, 105, 161, 0.15)`.
  - Labels are pinned above fields using `label-md` in `#2D1E18`.
- **Checkboxes & Radios**:
  - Checkboxes use `0.25rem` corner radius; radios are circular.
  - Unchecked state features an espresso tint boundary (`#D1C4B8`) on `#FDFBF7`.
  - Checked state uses `#0369A1` fill with crisp white checkmark/dot.
- **Chips & Badges**:
  - Compact `label-sm` text with subtle letter-spacing.
  - Light variant: `#E0F2FE` background with `#0369A1` text and no border.
  - Prestige variant: `#F5EFEB` background with `#2D1E18` text and a 1px `#C5A059` border.
- **Lists & Timeline Markers**:
  - Unordered items use small square or diamond gold bullet glyphs instead of round dots.
  - Corporate chronology milestones connect via vertical 1px hairline rules in `#EFE6DC` punctuated by solid `#0369A1` node indicators.