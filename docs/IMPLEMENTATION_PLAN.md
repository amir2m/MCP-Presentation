# Implementation Plan: MCP Interactive Presentation
**برنامه پیاده‌سازی و نقشه راه فنی پروژه ارائه تعاملی MCP**

---

## 1. Project Roadmap & Phases

### Phase 1: Foundation, Initial Architecture & Chapter 01 (Current Task: TASK-001)
- [x] Analyze repository structure and existing Next.js / Tailwind setup.
- [x] Author comprehensive documentation (`PROJECT_BRIEF.md`, `CONTENT_STRUCTURE.md`, `DESIGN_GUIDELINES.md`, `IMPLEMENTATION_PLAN.md`, `README.md`).
- [ ] Configure Persian typography (Vazirmatn / RTL layout support) and theme color tokens in `globals.css` and Tailwind v4.
- [ ] Implement foundational data types and chapter metadata structures (`src/types/presentation.ts`, `src/lib/presentation.ts`).
- [ ] Build reusable UI primitives (`Button`, `Card`, `Badge`).
- [ ] Build presentation layout components (`Navbar`, `PresentationControls`, `ScrollProgress`, `PresentationNavigation`).
- [ ] Implement Hero / Landing view with abstract animated neural/protocol network.
- [ ] Build dual-mode container (`ScrollMode` & `PresentationMode`) with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).
- [ ] Implement Chapter 01 ("مقدمه و مسئله اصلی") with visual comparison (Text Generation vs. External Action) and interactive concept check quiz.
- [ ] Verify build, lint, TypeScript checks, and responsive / RTL rendering.

### Phase 2: Chapters 02 & 03 (Future Task)
- [ ] Deep research and technical validation of LLM tool-calling limits (Chapter 02).
- [ ] Formal introduction of MCP specification and history (Chapter 03).
- [ ] Interactive USB-C vs Spaghetti wiring SVG diagram.
- [ ] Chapter-specific checkpoint questions.

### Phase 3: Chapters 04 & 05 (Future Task)
- [ ] MCP Architecture visualization (Host, Client, Server, Transports) (Chapter 04).
- [ ] Live protocol inspector simulation: JSON-RPC 2.0 handshake, Tools, Prompts, Resources (Chapter 05).
- [ ] Interactive payload debugger widget.

### Phase 4: Chapters 06 & 07 (Future Task)
- [ ] Comparative architectural matrix (MCP vs REST, Function Calling, Ad-hoc connectors) (Chapter 06).
- [ ] Production security practices, real-world case studies, and future roadmap (Chapter 07).
- [ ] Final lecture wrap-up and interactive Q&A summary board.

### Phase 5: Polish & Final Review (Future Task)
- [ ] Full end-to-end rehearsal mode with presenter notes timer.
- [ ] Performance and bundle optimization.
- [ ] Offline readiness and PWA asset verification.

---

## 2. Current Implementation Status

- **Sprint:** TASK-001
- **Focus:** Project Foundation, Core UI System, Dual Mode System, and Chapter 01 implementation.
- **Status:** In Progress.

---

## 3. Key Technical Decisions & Architecture Log

1. **Framework & Engine:**
   - Next.js 16 (App Router) with React 19.
   - Strict TypeScript configuration (`strict: true`).
   - Tailwind CSS v4 for zero-runtime utility styling with custom CSS custom properties.

2. **Animation Layer:**
   - Standardizing on `motion/react` (Motion for React).
   - Leveraging hardware-accelerated transforms (`opacity`, `transform`) for fluid 60fps transitions.
   - Guarding against excessive motion via CSS media queries and Motion's `useReducedMotion`.

3. **Presentation & State Strategy:**
   - Single source of truth for chapter progression (`src/lib/presentation.ts`).
   - Dual presentation model:
     - *Scroll Mode:* Natural vertical flow with intersection observers / scroll triggers.
     - *Presentation Mode:* Full-screen slide deck with discrete step navigation, slide counters, keyboard bindings, and focused slide presentation.

4. **Typography & Bidirectional Strategy:**
   - Persian primary typography using `Vazirmatn` with fallbacks.
   - Explicit `dir="ltr"` encapsulation on technical acronyms, JSON payloads, and code snippets to avoid bi-directional text bugs.

