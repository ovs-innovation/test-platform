# AssessPro CBT — UI/UX Product Requirements Document (PRD)

**Version:** 1.0  
**Audience:** Product · Design · Frontend · Client stakeholders  
**Companion docs:** [MASTER_DOCUMENTATION](./MASTER_DOCUMENTATION_INDEX.md) · [ARCHITECT_ROADMAP](./ARCHITECT_DEVELOPMENT_ROADMAP.md)

---

## Purpose of this document

The SRS defines **what** the platform does. The original UI/UX PDF only lists screen names (Landing, Dashboard, CBT, Result, Admin). That produces an **average dashboard**.

This PRD defines **exact experience** — layout, components, motion rules, emotional tone, and deliverables — so designers build a **premium, NTA-trustworthy product**, not a generic LMS.

**Implementation rule:** Core screens and flows **already exist in code**. This PRD guides **polish, extension, and Figma alignment** — not a ground-up rewrite.

---

## 0. Current build vs PRD (honest map)

| Area | In codebase today | PRD gap (design + polish) |
|------|-------------------|---------------------------|
| Landing | Hero, stats, featured series | Testimonials, partner logos, GSAP motion, top rankers |
| Dashboard | Widgets, flows, invited tests | Performance ring, calendar, recommended tests |
| Test series | Catalog + detail cards | Ratings, difficulty, rich filters |
| Instructions | Rules + start CTA | Timeline, checklist, countdown |
| CBT exam | Timer, palette, sections, calculator | Roll no header, image zoom, pure white NTA skin |
| Result | Score, rank, percentile, solutions | Animated score, subject rings, share/PDF |
| Analytics | API + basic page | Heatmap, prediction, AI suggestion UI |
| Admin | 14 pages, tables, editors | SaaS density widgets, stepper test builder |
| Design system | Tailwind + partial components | Full Figma library per §3 |
| Dark mode | Implemented | Audit contrast on all screens |

**Designer mandate:** Audit existing UI first → gap-fill in Figma → handoff deltas to dev.

---

## 1. Design philosophy

### 1.1 What this product must NOT feel like

- Generic coaching website template  
- Cluttered LMS with sidebar overload  
- “Student project” dashboard with emoji icons  
- Flashy exam screen with animations  

### 1.2 Target feel

| Attribute | Description |
|-----------|-------------|
| **Premium** | Spacing, typography, and shadows feel paid-product quality |
| **Trustworthy** | Blues, clean whites, visible security cues on exam/payment |
| **Fast** | Instant feedback; skeletons not spinners on lists |
| **Minimal** | One primary action per screen region |
| **NTA inspired** | Exam UI prioritizes familiarity over brand flair |
| **Enterprise grade** | Admin feels like Stripe / Linear — dense but clear |

### 1.3 Reference products (mood board)

| Product | Borrow |
|---------|--------|
| Testbook | Test series cards, enroll flow |
| Allen Digital | Academic trust, results storytelling |
| Physics Wallah | Analytics depth, progress narrative |
| Unacademy | Category browsing patterns |
| LeetCode | Focused exam/code interface discipline |
| Stripe Dashboard | Admin metrics, tables, empty states |
| Linear | Spacing, sidebar, keyboard-first admin |
| Notion | Clean typography, calm neutrals |

---

## 2. Design language

### 2.1 Theme

**Modern minimal** — white surfaces, blue accent, semantic color only for status.

### 2.2 Typography

| Token | Value |
|-------|-------|
| Font family | **Inter** (already loaded) |
| Grid | **8px base** — all spacing multiples of 4/8 |
| Display / H1 | 36–48px, weight 800, tracking tight |
| H2 | 24–30px, weight 700 |
| Body | 14–16px, weight 400–500 |
| Caption | 12px, weight 500, muted |
| Mono | Exam timer, CSV preview — `font-mono` |

### 2.3 Shape & elevation

| Token | Value |
|-------|-------|
| Border radius | **12px** cards; 8px inputs; 9999px pills |
| Shadow | Soft: `0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.05)` |
| Glass / blur | **Landing hero only** — never in exam or admin tables |
| Border | `slate-200/80` light · `slate-700/80` dark |

### 2.4 Color tokens

```text
Primary     #2563EB   (brand-600 — already in tailwind.config)
Primary hover #1D4ED8
Success     #22C55E   (emerald-500)
Danger      #EF4444   (red-500)
Warning     #F59E0B   (amber-500)
Neutral bg  #F8FAFC   (slate-50)
Neutral text #0F172A / #64748B
Exam canvas #FFFFFF   (no dark mode in exam)
```

### 2.5 Golden rule — context split

| Surface | Visual treatment |
|---------|------------------|
| **Marketing** (Landing, Pricing, Results) | Gradients, illustrations, GSAP/Lottie, storytelling |
| **Student dashboard** | SaaS product — cards, rings, charts, calm |
| **CBT exam** | NTA-like — white, zero distraction, no dark mode |
| **Admin** | Data density, tables, filters — decoration minimal |

---

## 3. Design system (Figma library)

Designer must produce a **single source of truth** component set. Dev already has primitives in `components/ui.jsx` — **extend, don’t duplicate naming**.

### 3.1 Required components

| Category | Components |
|----------|------------|
| Actions | Primary, secondary, ghost, danger, icon buttons |
| Inputs | Text, textarea, select, multi-select, search, OTP |
| Feedback | Toast, alert, inline error, skeleton, spinner |
| Containers | Card, modal, drawer, sheet, tabs, accordion |
| Data | Table, data grid, pagination, empty state |
| Status | Badge (success/warning/danger/info), progress bar, ring |
| Navigation | Sidebar, topbar, breadcrumb, stepper |
| Charts | Line, bar, donut, heatmap cell |
| Exam-specific | Palette cell, timer, section tab, legend strip |

### 3.2 Component states (every component)

Default · Hover · Focus · Active · Disabled · Loading · Error

### 3.3 Developer handoff format

- Figma variables → CSS custom properties / Tailwind extend  
- Spacing scale documented  
- Icon set: **Lucide** or **Heroicons** (match current SVG style)  
- Redlines for mobile breakpoints  

---

## 4. Complete user journey (connected screens)

Every arrow = clickable prototype link.

```text
Landing → Signup → [Verify Email] → Dashboard
    → Test Series → Detail → Checkout → Payment Success
    → Instructions → Exam → Submit → Result
    → Analytics → Solutions → Leaderboard
    → Profile / Notifications (anytime)
```

**Admin parallel path:** Login → Overview → Test Series / Builder → Question Bank → Reports

---

## 5. Screen specifications

### 5.1 Landing page

**Goal:** Trust + conversion in &lt; 10 seconds.

| Section | Requirements |
|---------|--------------|
| Hero | H1 &lt; 12 words, subcopy, dual CTA (Browse / Free Mock), trust badge (“NTA-style CBT”) |
| Social proof | Animated counters (students, tests taken, series) |
| AIR / results strip | Top ranker cards with photo, exam name, rank |
| Partner logos | Grayscale row, optional |
| Exam categories | JEE · NEET · SSC chips → filtered catalog |
| Popular test series | 3–6 cards with price, test count |
| Testimonials | Carousel, photo + name + rank |
| FAQs | Accordion, 5–8 items |
| Footer | Legal links, contact |

**Motion:** GSAP fade-up on scroll; Lottie on hero optional; **no** parallax on mobile.

**Current gap:** Testimonials, partners, rankers, motion.

---

### 5.2 Student dashboard

**Goal:** Answer “What should I do next?” in one glance.

| Widget | Spec |
|--------|------|
| Welcome card | Name, streak, target exam |
| Today’s schedule | List or mini calendar |
| Upcoming tests | Next 3 with countdown |
| Performance ring | Donut: overall accuracy |
| Weak / strong subjects | Horizontal bars, top 3 each |
| Quick resume | In-progress attempt CTA |
| Recent results | Last 3 scores with trend arrow |
| Latest notification | Single line + link |
| Recommended tests | Based on weak subjects |
| Leaderboard snippet | Top 5 + user rank |

**Layout:** 12-col grid desktop; stack mobile. **Not** a single empty card.

**Current gap:** Ring, calendar, recommendations.

---

### 5.3 Test series page

**Catalog filters:** JEE · NEET · Free · Paid · Latest · Popular

**Card anatomy:**

```text
┌─────────────────────────────┐
│ [Banner image 16:9]         │
│ Exam type badge             │
│ Title (2 lines max)         │
│ ★ 4.8 · 12 tests · 180 min  │
│ ₹499  ~~₹999~~  · 365 days   │
│ [ Enroll ]                  │
└─────────────────────────────┘
```

**Detail page:** Hero banner, included tests list (numbered), sticky enroll bar on mobile.

**Current gap:** Ratings, difficulty, banner images, filter chips.

---

### 5.4 Exam instructions

**Layout:** Two columns desktop — rules left, checklist right.

| Element | Spec |
|---------|------|
| Timeline | Visual steps: Read → Verify → Fullscreen → Start |
| Rules | Duration, marks, negative marking, sections |
| Checklist | ☐ I agree to terms · ☐ No external help |
| Language | EN / HI toggle (if paper supports) |
| Countdown | Optional 10s before start after click |
| CTA | Primary “I am ready — Start exam” |

**Current gap:** Timeline, checklist, countdown polish.

---

### 5.5 CBT screen (hero screen)

**Non-negotiable:** Pure white `#FFFFFF`, no sidebar, no marketing chrome, **no fancy animation**.

```text
┌──────────────────────────────────────────────────────────────┐
│ HEADER: Candidate · Roll · Section · Timer (red < 5 min)     │
├──────────────────────────────┬───────────────────────────────┤
│ QUESTION AREA                │ PALETTE                       │
│ Qn 12 of 90 · Marks: +4 -1   │ [grid 5×N]                  │
│ Stem + image [zoom]          │ Legend: NV·A·R·RA            │
│ Options A–D (large hit area) │ Section summary              │
├──────────────────────────────┴───────────────────────────────┤
│ FOOTER: ◀ Prev · Save & Next · Mark Review · Clear · Submit  │
└──────────────────────────────────────────────────────────────┘
```

| Interaction | Behavior |
|-------------|----------|
| Option click | Instant select + autosave (&lt; 200ms perceived) |
| Palette cell | Jump question; update visited state |
| Timer | Server-synced; amber at 10 min, red at 5 min |
| Submit | Modal: “Unattempted: N” confirmation |
| Calculator | Floating panel, draggable (JEE) |

**Palette colors (NTA standard):**

| State | Color |
|-------|-------|
| Not visited | Grey |
| Not answered | Red |
| Answered | Green |
| Marked for review | Purple |
| Answered + marked | Purple-green split |

**Current:** Layout exists — **reskin** to white NTA density; add roll no, image zoom.

---

### 5.6 Result screen

**Emotional peak** — celebrate without childish confetti.

| Block | Spec |
|-------|------|
| Score hero | Large animated count-up (1.2s ease) |
| Stats row | Correct · Wrong · Skipped · Accuracy |
| Rank / percentile | Prominent if cohort &gt; 10 |
| Subject cards | 3-column marks breakdown |
| Charts | Donut accuracy + bar time-per-section |
| Question grid | Tap → review drawer |
| Actions | Solutions · Certificate · Share · Retake (if allowed) |

**Current gap:** Animation, subject cards layout, share/PDF.

---

### 5.7 Analytics

**Not** three plain numbers — insight dashboard.

| View | Visualization |
|------|---------------|
| Overall | Score trend line (last 10 attempts) |
| Subject | Grouped bar chart |
| Chapter | Drill-down table + sparkline |
| Topic | Heatmap (chapter × accuracy) |
| Speed | Avg sec/question vs benchmark |
| Improvement | Week-over-week delta badges |
| AI suggestion | Card: “Practice Mechanics — 12 questions” *(future)* |

---

### 5.8 Question review (post-result)

Per-question drawer:

- Stem + options  
- Your answer vs correct (color coded)  
- Solution + explanation  
- Time spent  
- Difficulty tag  
- Bookmark · Report issue  

---

### 5.9 Admin dashboard

**Stripe-like SaaS** — metrics top, activity feed bottom.

| Widget | Metric |
|--------|--------|
| Revenue | MTD + sparkline |
| Students | Total + new today |
| Active tests | Live now |
| Payments | Recent 5 rows |
| Pending actions | Unpublished tests, failed webhooks |
| Activity feed | Timestamped events |

**Current gap:** Widget density, sparklines, activity feed.

---

### 5.10 Question bank (admin)

**Professional data grid** — not a vertical list of cards.

| Feature | Spec |
|---------|------|
| Columns | ID, stem preview, subject, chapter, type, difficulty, marks |
| Toolbar | Search, filters, bulk import/export, add |
| Row actions | Edit, duplicate, delete, preview drawer |
| Image | Thumbnail column |
| Pagination | 25/50/100 per page |

**Current:** Functional list — **upgrade to grid** per this spec.

---

### 5.11 Test builder (admin)

**Stepper wizard** — no single long form.

```text
Step 1 Basic Info → Step 2 Sections → Step 3 Questions
    → Step 4 Instructions → Step 5 Preview → Step 6 Publish
```

Each step: save progress, back/next, validation inline.

**Current:** Tabbed editor exists — **wrap in stepper UX** without changing API.

---

### 5.12 Payment checkout

| Element | Spec |
|---------|------|
| Order summary | Series name, price, validity |
| Coupon | Inline apply + success toast |
| GST line | If B2B enabled |
| Trust | Razorpay badge, lock icon |
| Success | Check animation → redirect My Tests |

---

### 5.13 Notifications inbox

| Feature | Spec |
|---------|------|
| Grouping | Today · Earlier |
| Unread | Bold + blue dot |
| Actions | Mark read, mark all, delete |
| Empty | Illustration + “You’re all caught up” |

---

### 5.14 Profile

| Section | Fields |
|---------|--------|
| Identity | Photo, name, email, phone |
| Goals | Target exam, target AIR, target college |
| Achievements | Badges earned *(future)* |
| Security | Change password, sessions/devices |
| Settings link | Theme, notifications |

---

## 6. Responsive design

| Breakpoint | Width | Layout notes |
|------------|-------|--------------|
| Desktop XL | 1920 | Max content 1280px centered |
| Laptop | 1440 | Standard dashboard grid |
| Tablet | 768 | Collapsible sidebar; exam palette bottom sheet |
| Mobile | 390 | Single column; sticky CTAs |

**Adaptive, not just shrunk:** Exam on mobile = palette as bottom drawer, not side column.

---

## 7. Motion design

### 7.1 Allowed

- Fade / slide page transitions (150–250ms)  
- Scale on button press (0.98)  
- Hover elevation on cards  
- Skeleton shimmer  
- Score count-up on result  

### 7.2 Not allowed

- 3D transforms  
- Lottie on exam screen  
- Transitions &gt; 300ms on interactive elements  
- Auto-playing video in dashboard  

---

## 8. Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Keyboard nav | Tab order logical; exam options arrow-key selectable |
| Focus ring | Visible `ring-2 ring-brand-500` |
| Screen reader | `aria-label` on palette cells, timer |
| Contrast | WCAG AA minimum (4.5:1 body text) |
| Font resize | `rem` units; no fixed px body |

---

## 9. Visual identity & brand guidelines

**Client workshop question:** *“What feeling should AssessPro represent?”*

| Brand direction | Palette | Use when |
|-----------------|---------|----------|
| **Academic + Trust** | White, blue `#2563EB`, green success | Default — JEE/NEET institutes |
| **Premium + Modern** | White, indigo, slate-900 text | B2B coaching chains |
| **Youth + Competitive** | Bold gradients **marketing only** | Student acquisition campaigns |

### Logo usage

- Primary: icon + “AssessPro” wordmark  
- Minimum clear space: 1× icon height  
- Never on busy photographic backgrounds without scrim  

### Photography & illustration

- Marketing: aspirational students, exam halls (stock, diverse)  
- Product: screenshots, no stock inside app chrome  

---

## 10. UI audit & approval phase (mandatory milestone)

**Insert before frontend sprint.** Prevents redesign debt.

```text
Design System (tokens + components)
        ↓
Wireframes (low-fi, all flows)
        ↓
Client review #1
        ↓
High-fidelity UI (60–70 screens)
        ↓
Interactive prototype (Figma)
        ↓
UI Audit (accessibility, NTA exam check, mobile)
        ↓
Client sign-off #2
        ↓
Developer handoff (specs + assets)
        ↓
Frontend implementation (delta only on existing code)
```

### Audit checklist (sign-off required)

- [ ] Exam screen: white, distraction-free, palette matches NTA legend  
- [ ] Dashboard: no empty states without illustration  
- [ ] All forms: error states designed  
- [ ] Dark mode: contrast pass on student + admin (not exam)  
- [ ] Mobile: exam palette usable one-handed  
- [ ] Admin tables: pagination + empty + loading designed  

---

## 11. Design deliverables

| Deliverable | Quantity / standard |
|-------------|---------------------|
| Design system (Figma) | Full component library §3 |
| High-fidelity screens | **60–70** unique frames |
| Responsive variants | Desktop + tablet + mobile for student + exam |
| Clickable prototype | Full journey §4 |
| Typography guide | Type scale + usage |
| Color tokens | JSON / CSS variables |
| Icon library | Consistent stroke 1.5–2px |
| Spacing guide | 8px grid documentation |
| Developer handoff | Zeplin / Figma dev mode + asset export |
| SVG assets | Logo, empty states, marketing illustrations |
| State coverage | Empty, error, loading for every list screen |

---

## 12. Screen inventory (target 65 screens)

| Area | Count | Notes |
|------|-------|-------|
| Public / marketing | 14 | Landing variants, legal |
| Auth | 6 | Login, signup, forgot, reset, verify |
| Student dashboard & tests | 12 | Dashboard, my tests, series |
| Exam flow | 8 | Instructions, exam, calculator, submit modal |
| Result & review | 8 | Result, solutions, certificate |
| Analytics & leaderboard | 6 | |
| Profile & settings | 4 | |
| Payments & notifications | 4 | |
| Admin | 15 | Overview, builder, bank, reports |
| **Total** | **~77** | Some states share frames |

---

## 13. Implementation strategy for dev team

Aligns with [ARCHITECT_DEVELOPMENT_ROADMAP](./ARCHITECT_DEVELOPMENT_ROADMAP.md):

1. **Do not rebuild** working routes — apply design tokens + component swaps  
2. **Phase B** (UX polish): Landing, dashboard widgets, admin overview  
3. **Phase C** (CBT reskin): Exam white-skin, instructions stepper  
4. **Phase D** (Analytics visuals): Charts per §5.7  
5. New Figma components map 1:1 to `components/ui.jsx` extensions  

---

## 14. Success criteria (UX)

| Metric | Target |
|--------|--------|
| Landing bounce rate | &lt; 40% |
| Signup completion | &gt; 70% of started registrations |
| Exam abandon mid-test | &lt; 15% |
| Time to first question (from login) | &lt; 3 clicks |
| Designer → dev rework rounds | ≤ 2 after audit sign-off |
| Client UI approval | Written sign-off before Phase C dev |

---

## 15. Open questions for client workshop

1. Brand direction: Academic Trust vs Premium Modern vs Youth?  
2. Hindi UI required at launch?  
3. Real student photos vs illustrations on landing?  
4. Certificate visual template approval?  
5. Admin white-label (multi-institute) now or later?  

---

*This PRD supersedes generic screen-list PDFs for design execution. Functional requirements remain in MASTER_DOCUMENTATION Parts 1–2.*
