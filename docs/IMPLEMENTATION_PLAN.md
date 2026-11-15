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
- [x] Chapter 03 Scientific Audit & Conceptual Demarcation (TASK-003-AUDIT).
- [x] Chapter 03 Content Finalization & Implementation Planning (TASK-003.1 — see [CHAPTER_03_CONTENT_SPEC.md](CHAPTER_03_CONTENT_SPEC.md) & [CHAPTER_03_IMPLEMENTATION_PLAN.md](CHAPTER_03_IMPLEMENTATION_PLAN.md)).
- [x] Chapter 03 Application Implementation across 6 sections and dual presentation/scroll modes (TASK-003.2).
- [x] Chapter 03 Final Scientific & Educational Refinement and Browser QA (TASK-003.3).

### Phase 3: Chapters 04 & 05
- [x] Chapter 04 Scientific Audit & Content Architecture (TASK-004.1, TASK-004.1.1, TASK-004.1.2 & TASK-004.1.3 — see [CHAPTER_04_CONTENT_SPEC.md](CHAPTER_04_CONTENT_SPEC.md) & [CHAPTER_04_IMPLEMENTATION_PLAN.md](CHAPTER_04_IMPLEMENTATION_PLAN.md)).
- [x] Chapter 04 Application Implementation across 6 sections and dual presentation/scroll modes (TASK-004.2).
- [x] Chapter 04 Scientific Audit, Server Isolation Nuance & Multi-Viewport Browser QA (TASK-004.2.1).
- [x] Chapter 05 Scientific Content Finalization, Corrections & Implementation Planning (TASK-005.1, TASK-005.1.1, TASK-005.1.2 & TASK-005.1.3 — see [CHAPTER_05_CONTENT_SPEC.md](CHAPTER_05_CONTENT_SPEC.md) & [CHAPTER_05_IMPLEMENTATION_PLAN.md](CHAPTER_05_IMPLEMENTATION_PLAN.md)).
- [x] Chapter 05 Application Implementation: Request Lifecycle Simulator, 6 sections, Payload Debugger, dual-mode integration, multi-viewport responsive QA (TASK-005.2 Complete — see [CHAPTER_05_IMPLEMENTATION_REPORT.md](CHAPTER_05_IMPLEMENTATION_REPORT.md)).

### Phase 4: Chapters 06 & 07 (Future Task)
- [ ] Comparative architectural matrix (MCP vs REST, Function Calling, Ad-hoc connectors) (Chapter 06).
- [ ] Production security practices, real-world case studies, and future roadmap (Chapter 07).
- [ ] Final lecture wrap-up and interactive Q&A summary board.

### Phase 5: Polish & Final Review (Future Task)
- [ ] Full end-to-end rehearsal mode with presenter notes timer.
- [ ] Performance and bundle optimization.
- [ ] Offline readiness and PWA asset verification.

---

## ۲. وضعیت فعلی پیاده‌سازی و پیشرفت اسپرینت‌ها (Current Implementation Status)

- **Completed Sprints:**
  - **TASK-001 / TASK-001.6:** Chapter 01 Educational & Scientific Refinement (Complete & Verified).
  - **TASK-002 / TASK-002.1 / TASK-002.3 / TASK-002.4:** Chapter 02 Implementation & Browser QA (Complete & Verified).
  - **TASK-003-AUDIT / TASK-003.1 / TASK-003.2 / TASK-003.3:** Chapter 03 Planning, Implementation & Refinement (Complete & Verified).
  - **TASK-004.1 / TASK-004.1.1 / TASK-004.1.2 / TASK-004.1.3:** Chapter 04 Scientific Audit, Content Architecture, Client Capabilities Requirement Correction & Implementation Roadmap (Complete & Documented).
  - **TASK-004.2 / TASK-004.2.1:** Chapter 04 Application Implementation across 6 sections, Server Isolation Nuance Qualification & 8-Combination Browser QA (Complete & Verified).
  - **TASK-005.1 / TASK-005.1.1 / TASK-005.1.2 / TASK-005.1.3:** Chapter 05 Scientific Content Finalization, Raw JSON Verification & Implementation Planning (Complete & Documented).
  - **TASK-005.2:** Chapter 05 Application Implementation: Request Lifecycle Simulator, 6 sections, Payload Debugger, dual-mode integration, and multi-viewport responsive QA (Complete & Verified).
- **Next Milestone:** TASK-006.1 — Chapter 06 Scientific Content Finalization & Architecture Planning.

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
