# Project Brief: MCP Interactive Presentation
**ارائه تعاملی پروتکل زمینه مدل (Model Context Protocol - MCP)**

---

## 1. Project Purpose and Objectives

The primary objective of this project is to build a premium, interactive, educational presentation website titled:

> **"مدلهای زبانی و Model Context Protocol (MCP): از تولید متن تا تعامل با ابزارهای خارجی"**
> *(Language Models and Model Context Protocol: From Text Generation to Interaction with External Tools)*

This is an **educational presentation platform**, not a conventional business landing page, corporate dashboard, or documentation reader. Its mission is to make advanced concepts around Large Language Models (LLMs), Tool Use, and the open standard **Model Context Protocol (MCP)** tangible, visually intuitive, and conceptually accessible through modern web interaction and technical storytelling.

### Key Educational Goals
- Demystify why modern LLMs are fundamentally isolated text predictors and why external integration is needed.
- Explain the architectural paradigm shift brought by Model Context Protocol (MCP) as an open standard (analogous to USB-C for AI systems).
- Illustrate the differences between traditional bespoke integrations (point-to-point APIs, raw Function Calling) and standardized protocol-based tool mediation.
- Provide interactive diagrams, live comparisons, and quiz checkpoints that keep university audiences engaged.

---

## 2. Target Audience & Duration

- **Audience:** Mixed technical and non-technical university students (Computer Science, Software Engineering, Data Science, and general tech enthusiasts).
- **Prerequisites:** Basic knowledge of what ChatGPT or LLMs are; no deep systems programming or compiler experience assumed.
- **Estimated Presentation Duration:** 20 to 30 minutes (calibrated for a ~25-minute live lecture with Q&A).

---

## 3. Language & Localization Requirements

- **Primary Language:** Persian (Farsi - فارسی).
- **Directionality:** Correct RTL (Right-to-Left) layout across all components, typography, layout margins, and navigation flow.
- **Technical Terminology:** English technical acronyms and key terms (e.g., *Model Context Protocol*, *JSON-RPC 2.0*, *Host*, *Client*, *Server*, *Transport*, *Function Calling*, *REST API*) are displayed with strict LTR inline isolation (`dir="ltr"`), accurate technical casing, and clear Persian explanatory framing.
- **Code & Data Snippets:** Rendered strictly in LTR monospaced typography with syntax highlighting and clear data structures.

---

## 4. Dual Presentation Experiences

The platform provides two distinct user experiences tailored for different presentation settings:

1. **Scroll Mode (حالت روایتی / اسکرول):**
   - Cinematic, vertical scroll-driven storytelling experience.
   - Rich section-by-section reveals, sticky graphics, scroll progress indicators, and interactive self-paced widgets.
   - Ideal for personal study, review after the lecture, and asynchronous exploration.

2. **Presentation Mode (حالت ارائه / اسلاید تمام‌صفحه):**
   - Full-screen slide-based presentation layout with clean theater framing.
   - Keyboard navigation (`ArrowRight` / `ArrowLeft` for next/previous, `Escape` to exit).
   - Touch/click navigation controls with progress indicator and slide counter.
   - Optimized for live projection in lecture halls and auditoriums without browser UI distraction.

---

## 5. Functional & Non-Functional Requirements

### Functional Requirements
- **Hero & Landing Section:** Engaging title, description, mode selectors ("شروع ارائه", "مشاهده سرفصل‌ها"), and animated AI network backdrop.
- **Chapter Navigation:** Persistent, accessible drawer/bar with current chapter state, completion tracking, and quick jumping.
- **Interactive Checkpoints:** Step-by-step interactive diagrams, visual side-by-side comparisons, and multiple-choice concept check questions.
- **Presentation State Management:** URL-friendly or clean state synchronization between chapters and slides, retaining the user's progress.
- **Keyboard Protection:** Navigation hotkeys (`ArrowLeft`, `ArrowRight`, `Space`, `Esc`) active only when focus is not inside form inputs or interactive text fields.

### Non-Functional Requirements
- **Performance:** Lightweight bundle, 60 FPS animations using modern CSS and GPU-accelerated Motion transforms, zero layout shifts.
- **Aesthetic Excellence:** Futuristic dark-mode aesthetic (#0B1020 background, subtle #6366F1 / #22D3EE accents, high-contrast readable typography).
- **Accessibility:** Semantic HTML elements, proper contrast ratios (WCAG AA compliant), keyboard focus outlines, and `prefers-reduced-motion` compliance.
- **Pure Frontend Architecture:** No external databases, server actions, or authentication barriers. Entirely self-contained, statically exportable, and deterministic.

