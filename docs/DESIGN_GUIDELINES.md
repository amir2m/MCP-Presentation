# Design Guidelines & Visual Identity System
**راهنمای طراحی و سیستم بصری ارائه تعاملی MCP**

---

## 1. Visual Identity & Aesthetic Philosophy

The presentation adopts a **futuristic, cinematic, and developer-grade aesthetic** inspired by modern technical pioneers in the AI ecosystem (e.g., Anthropic, Linear, Vercel, Stripe).

- **Theme:** Deep space dark mode with ambient luminescence.
- **Atmosphere:** Rigorous, clean, and intellectually stimulating. It avoids gimmicky hyper-gamification or generic AI template clutter, maintaining focus on technical clarity.
- **Key Motifs:** Subtle grid topologies, luminous connection vectors (evoking graph protocols and tool bridges), and translucent glass surfaces with crisp hairline borders.

---

## 2. Color Palette & Tokens

| Token Name | Hex Code | Purpose & Usage |
|---|---|---|
| `--bg-main` | `#0B1020` | Primary viewport background; deep cosmic navy |
| `--bg-card` | `#141C2E` | Solid card and modal surface base |
| `--bg-card-subtle` | `rgba(20, 28, 46, 0.75)` | Translucent backdrop with backdrop-blur |
| `--accent-primary` | `#6366F1` | Primary interactive brand accent (Indigo / Iris) |
| `--accent-secondary` | `#22D3EE` | Protocol / data stream accent (Cyan / Neon) |
| `--text-main` | `#F8FAFC` | Primary text and headings (Slate 50) |
| `--text-secondary` | `#94A3B8` | Body copy, subtitles, secondary metadata (Slate 400) |
| `--border-subtle` | `rgba(99, 102, 241, 0.15)` | Subtle technical separator borders |
| `--border-active` | `rgba(34, 211, 238, 0.4)` | Highlighted and focused element borders |

---

## 3. Typography & RTL Rules

### Persian Typography (Primary)
- **Primary Typeface:** `Vazirmatn` (with standard Persian fallbacks: `Shabnam`, `Tahoma`, `sans-serif`).
- **Base Direction:** `dir="rtl"` applied at the root `<html>` tag.
- **Font Scale & Line Heights:**
  - Display / Hero Title: `text-3xl md:text-5xl lg:text-6xl`, `leading-[1.25]`, `font-bold`
  - Chapter Titles: `text-2xl md:text-4xl`, `leading-[1.3]`, `font-bold`
  - Subheadings & Section Titles: `text-xl md:text-2xl`, `leading-[1.4]`, `font-semibold`
  - Body Copy: `text-base md:text-lg`, `leading-[1.8]`, `font-normal`
  - UI Labels & Badges: `text-xs md:text-sm`, `leading-normal`, `font-medium`

### English & Technical Elements (LTR Isolation)
- **Monospace Typeface:** `Geist Mono`, `JetBrains Mono`, `ui-monospace`, `monospace`.
- **Directional Isolation:**
  - Any English technical acronyms (e.g. `MCP`, `JSON-RPC`, `LLM`, `SDK`) or code keywords embedded in Persian prose must be rendered with explicit `dir="ltr"` or enclosed in `<span dir="ltr" className="inline-block font-mono">` to prevent bidirectional punctuation jumping.
  - Code blocks, JSON payloads, and network diagrams must have `dir="ltr"` set on their container.

---

## 4. Visual Components & Styling Standards

### Cards & Surfaces
- Background: `#141C2E` with optional 80% opacity and `backdrop-blur-md`.
- Border: `1px solid rgba(255, 255, 255, 0.08)` or subtle Indigo glow on hover `border-indigo-500/30`.
- Rounded corners: `rounded-2xl` for major structural cards, `rounded-xl` for interactive elements.
- Shadows: Multi-layer soft ambient shadows (`shadow-2xl shadow-indigo-950/40`).

### Buttons & Interactive Controls
- **Primary Button:** Gradient background from `#6366F1` to `#4F46E5` with `#22D3EE` hover glow, white text, smooth transform on tap/hover.
- **Secondary / Ghost Button:** Translucent card surface, border `border-slate-700/60`, hover `border-cyan-400/50`.
- **Focus Rings:** Distinct 2px cyan ring with 2px offset for keyboard accessibility (`focus-visible:ring-2 focus-visible:ring-cyan-400`).

---

## 5. Animation Principles & Motion Guidelines

We use **Motion for React** (`motion/react`) with strict performance and aesthetic constraints:

1. **Purposeful Motion Only:**
   - Every animation must clarify state transitions or hierarchy (e.g., revealing an architectural layer, demonstrating data flow, or indicating forward progress).
   - Zero decorative spinning artifacts that distract from technical content.

2. **Transition Curves & Timings:**
   - Entrance transitions: `duration: 0.5s` to `0.7s`, `ease: [0.16, 1, 0.3, 1]` (custom spring-like smooth deceleration).
   - Interactive hover transitions: `duration: 0.2s`, `ease: "easeOut"`.
   - Stagger delays: `staggerChildren: 0.1` between list items or visual cards.

3. **Accessibility (`prefers-reduced-motion`):**
   - For users with motion sensitivity, animations must fall back to simple opacity fades (`opacity: 1`) without translation or scaling.

4. **Hardware Acceleration:**
   - Restrict animations to `transform` (`translateX`, `translateY`, `scale`) and `opacity` to maintain 60 FPS across desktop and mobile browsers.

---

## 6. Responsive Layout Breakpoints

- **Mobile (< 768px):** Single-column vertical flow, simplified navigation bar, sticky bottom controls in presentation mode, full-width touch cards.
- **Tablet (768px - 1024px):** Two-column comparisons, collapsible chapter drawer, proportional typography.
- **Desktop (1024px+):** Full widescreen cinematic canvas, side-by-side architectural diagrams, keyboard shortcut hints, comprehensive progress HUD.

