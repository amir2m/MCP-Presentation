# Implementation Plan: MCP Interactive Presentation
**برنامه پیاده‌سازی و نقشه راه فنی پروژه ارائه تعاملی MCP**

---

## 1. Project Roadmap & Phases

### Phase 1: Foundation, Initial Architecture & Chapter 01 (Completed: TASK-001)
- [x] Analyze repository structure and existing Next.js / Tailwind setup.
- [x] Author comprehensive documentation (`PROJECT_BRIEF.md`, `CONTENT_STRUCTURE.md`, `DESIGN_GUIDELINES.md`, `IMPLEMENTATION_PLAN.md`, `README.md`).
- [x] Configure Persian typography (Vazirmatn / RTL layout support) and theme color tokens in `globals.css` and Tailwind v4.
- [x] Implement foundational data types and chapter metadata structures (`src/types/presentation.ts`, `src/lib/presentation.ts`).
- [x] Build reusable UI primitives (`Button`, `Card`, `Badge`).
- [x] Build presentation layout components (`Navbar`, `Footer`, `PresentationControls`, `ScrollProgress`, `PresentationNavigation`, `ProgressIndicator`).
- [x] Implement Hero / Landing view with visual hierarchy, mode switcher, and roadmap.
- [x] Build dual-mode container (`ScrollMode` & `PresentationMode`) with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).
- [x] Implement Chapter 01 ("مقدمه و مسئله اصلی") with visual comparison (Text Generation vs. External Action) and interactive concept check quiz.
- [x] Verify build, lint, TypeScript checks, and responsive / RTL rendering.

### Phase 1.5: Visual Enhancement & 3D Foundation (Completed: TASK-001.5)
- [x] Verify peer dependency compatibility for `@react-three/fiber` and `@react-three/drei` with `react@19.3.0` and `three@0.187.0`.
- [x] Implement restrained 3D scene (`HeroNetworkScene.tsx`) with central AI node, 4 external tool nodes, and luminous connection beams.
- [x] Build dedicated Client Component (`Hero3DContainer.tsx`) with `next/dynamic(..., { ssr: false })`.
- [x] Isolate pointer events (`pointer-events-none`) so canvas does not block clicks, text selection, or scrolling.
- [x] Implement graceful SVG fallback (`HeroFallbackSVG.tsx`) for WebGL context loss, lack of WebGL, or `prefers-reduced-motion`.
- [x] Enforce reserved canvas dimensions (`aspect-square`, `minHeight: 360px`) to prevent Cumulative Layout Shifts (CLS = 0).
- [x] Restrain GPU consumption with low-poly geometry, capped pixel ratio (`dpr={[1, 1.5]}`), and low-power preference.
- [x] Clean TypeScript, ESLint (React 19 hooks compliant), and Turbopack production build.

### Phase 1.6: Scientific Accuracy & Educational Refinement — Chapter 01 (Completed: TASK-001.6)
- [x] Clarify boundary between LLM Core, Host Environment, and Tools with approved scientific statement.
- [x] Replace vague terminology with "Next-Token Predictor" and precise definition of Tokens.
- [x] Design and implement responsive 2D `AccessBoundaryDiagram` (State A: Isolated/Blocked vs State B: Host-Mediated).
- [x] Add prominent and persistent Mock Data Disclosure banner to the Chapter 01 simulator.
- [x] Replace guaranteed correctness claims with accurate terms ("Tool Execution", "Data Returned by Tool", "Tool-mediated Action").
- [x] Add scientific cautionary note regarding tool failure, stale data, and model misinterpretation.
- [x] Differentiate Training Knowledge (weights/cutoff) from Runtime Context (injected tool output).
- [x] Update simulator host trace: `[HOST] Validating and Processing Tool Request` and clarify Host vs MCP Client roles.
- [x] Progressive multi-stage execution sequence in the simulator with Replay and Skip controls.
- [x] Reframe 3 cards under "ویژگی‌های مورد انتظار از یک استاندارد ارتباطی مناسب" as general criteria.
- [x] Clarify N×M integration complexity model note.
- [x] Add prominent Chapter 02 CTA button/banner linking to Chapter 02.
- [x] Full TypeScript, ESLint, and Turbopack build verification with zero errors.

### Phase 2: Chapters 02 & 03
- [x] Implement Chapter 02: "از پیش‌بینی کلمه تا انجام عملیات" (Large Language Models & External Tools) (Completed: TASK-002).
  - [x] Educational breakdowns: LLM conceptual definition, Token representation and probability distributions.
  - [x] Model Knowledge vs External Data boundary and the Hallucination scenario.
  - [x] 8-stage Tool Calling lifecycle highlighting the Host / Application Runtime as the secure executor.
  - [x] Interactive Comparison Simulator with Mode A (unverified guess) and Mode B (verified execution with mock data 12).
  - [x] Educational disclaimer clearly marked ("شبیه‌سازی آموزشی — بدون اتصال واقعی به پایگاه داده").
  - [x] The Missing Piece: N×M custom integration spaghetti problem bridging to Chapter 03.
  - [x] 3-question interactive quiz with scoring, per-option feedback, and retry.
  - [x] Full integration into Presentation Mode (6 slides) and Scroll Mode.
- [ ] Formal introduction of MCP specification and history (Chapter 03 - Future Task).
- [ ] Interactive USB-C vs Spaghetti wiring diagram (Chapter 03 - Future Task).
- [ ] Chapter 03 checkpoint questions (Future Task).

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

- **Sprint:** TASK-001.6
- **Focus:** Educational and Scientific Refinement of Chapter 01 (LLM vs Host vs Tools distinction, Next-Token Predictor, AccessBoundaryDiagram, persistent mock disclosure, progressive simulation, Chapter 02 CTA).
- **Status:** Complete & Verified.

---

## 3. Key Technical Decisions & Architecture Log

1. **Framework & Engine:**
   - Next.js 16 (App Router) with React 19.3.0 and Turbopack.
   - Strict TypeScript configuration (`strict: true`).
   - Tailwind CSS v4.

2. **3D Subsystem:**
   - `@react-three/fiber` (v9.8.2) + `@react-three/drei` (v10.7.9) + `three` (v0.187.0).
   - Dynamic import isolated in `'use client'` component.
   - Dual-layer architecture: WebGL 3D dynamic canvas with SVG vector fallback on unsupported environments or reduced-motion.
   - Low GPU footprint: low-poly icosahedron, ambient and directional lights, `dpr={[1, 1.5]}`, `powerPreference: 'low-power'`.
   - `pointer-events-none` on the 3D canvas so user clicks and page scrolls pass through unblocked.
