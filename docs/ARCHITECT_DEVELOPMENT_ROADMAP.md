# CBT Platform — Architect Development Roadmap

**Role:** Software Architect + Tech Lead view  
**Product:** JEE / NEET Computer-Based Test Platform (AssessPro CBT)  
**Rule:** **Jo ban chuka hai, dubara nahi banayenge — sirf extend, polish, aur net-new modules.**

Related docs: [MASTER_DOCUMENTATION_INDEX.md](./MASTER_DOCUMENTATION_INDEX.md) · [API.md](./API.md)

---

## 1. Project vision (locked)

Develop a **scalable, secure, production-ready CBT platform** with:

- NTA-style examination experience  
- Test series marketplace + payments  
- Performance analytics + student management  
- API-first design for future mobile apps  

**Core principles (non-negotiable)**

| Principle | How we apply it |
|-----------|-----------------|
| Modular architecture | Auth, CBT, payments, notifications as separate route modules |
| API first | React consumes REST; mobile reuses same APIs |
| Scalable DB | PostgreSQL + migrations v2–v7, normalized schema |
| Secure auth | JWT + RBAC + rate limits + proctoring |
| Reusable components | Admin shell, cards, exam engine — extend, don’t rewrite |
| Responsive UI | Tailwind, dark mode, mobile sidebar |
| Future ready | Faculty/parent roles in schema; webhook payments |

---

## 2. Architecture (current + target)

```
                        CBT PLATFORM
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   Public Website      Student Portal          Admin Portal
   [~85% built]        [~75% built]           [~80% built]
        │                     │                     │
        └──────────┬──────────┴──────────┬────────┘
                   │                     │
              CBT Engine            Question Bank
              [~70% built]          [~60% built]
                   │                     │
        ┌──────────┴──────────┬──────────┴──────────┐
        │                     │                     │
   Result & Analytics    Payment Service    Notification Service
   [~65% built]          [~70% built]       [~75% built]
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                    PostgreSQL (Neon) — LIVE
                              │
              SMTP · Razorpay · Logging · Backup (partial)
```

---

## 3. Module status — DO NOT REBUILD vs BUILD NEXT

Legend: **✅ Done (reuse as-is)** · **🟡 Extend only** · **🔴 Net-new**

| Module | Plan section | Status | Action |
|--------|--------------|--------|--------|
| **M1 Foundation** | JWT, PG, SMTP, validation, APIs | ✅ **Done** | **Do not rebuild.** Harden config, monitoring only |
| **M2 Public website** | 12+ pages, SEO, CTA | 🟡 **~85%** | Polish content/CMS; add Results page, testimonials — **no new stack** |
| **M3 Authentication** | Register, login, forgot password | 🟡 **~80%** | **Done:** admin + student login, signup, forgot/reset, invite OTP. **Add:** email verify, mobile OTP |
| **M4 Role management** | Super admin, faculty, parent | 🟡 **~40%** | **Done:** admin + candidate. **Extend:** faculty login UI, parent — schema ready |
| **M5 Student portal** | Dashboard, tests, analytics | 🟡 **~75%** | **Done:** all routes exist. **Polish:** widgets (weak subjects, live tests split) |
| **M6 Test series** | Create, price, validity, publish | ✅ **~85%** | **Do not rebuild.** Add banner image field if client wants |
| **M7 Test management** | Draft→Live lifecycle, schedule | 🟡 **~70%** | **Done:** builder, publish, sections. **Add:** scheduled/live/archived status enum |
| **M8 Question bank** | Subject→chapter→topic | 🟡 **~60%** | **Done:** bank + subjects admin. **Extend:** topic UI, integer/numerical types |
| **M9 Bulk import** | Excel, CSV, preview | 🟡 **~70%** | **Done:** CSV import/export (assessment + bank). **Add:** XLSX parser, preview screen |
| **M10 CBT engine** | NTA palette, timer, autosave | 🟡 **~70%** | **Do not rewrite engine.** Polish: language switch, image zoom, integer UI |
| **M11 Exam security** | Fullscreen, violations | ✅ **~85%** | **Do not rebuild.** Future: AI proctoring = new module |
| **M12 Result engine** | Rank, percentile, solutions | 🟡 **~75%** | **Done:** scoring, rank, percentile, solutions, certificate. **Polish:** subject breakdown charts |
| **M13 Analytics** | Subject/chapter/weak areas | 🟡 **~55%** | **Done:** student analytics API + page. **Extend:** chapter graphs, AI recommendations |
| **M14 Payment** | Razorpay, webhook, invoice | 🟡 **~70%** | **Done:** create-order, verify, webhook, history, mock mode. **Add:** PDF invoice, refund flow |
| **M15 Notifications** | Email + in-app | 🟡 **~75%** | **Done:** SMTP, list, unread, broadcast. **Add:** SMS/WhatsApp adapters |
| **M16 Admin panel** | Full CMS + reports | 🟡 **~80%** | **Done:** 14 admin pages. **Polish:** dashboard stat cards per client spec |
| **M17 Reporting** | Export PDF/Excel | 🟡 **~60%** | **Done:** reports + CSV export. **Add:** PDF reports |
| **M18 Database** | 20+ tables | ✅ **~90%** | **Do not redesign.** Incremental migrations only |
| **M19 Security** | JWT, SSL, rate limit | 🟡 **~80%** | **Done:** core controls. **Add:** audit log UI, CSRF if cookie auth added |
| **M20 Performance** | CDN, cache, 500 concurrent | 🔴 **~30%** | **Net-new:** Redis cache, load test, CDN for assets |
| **M21 Backup & monitoring** | Daily backup, alerts | 🔴 **~25%** | **Net-new:** automated pg_dump cron, uptime monitoring |
| **M22 Future roadmap** | App, AI, live class | 🔴 **0–40%** | Leaderboard + forum **done**; rest is Phase 2 product |

---

## 4. What is ALREADY built (meeting demo list)

**Do not re-implement these — demo and extend only.**

### Backend (Express + PostgreSQL)
- 12 route modules: auth, assessments, attempts, test-series, payments, notifications, student, admin, question-bank, invites, public, sections/questions  
- Migrations v2–v7 (profiles, forum, coupons, CMS, certificates, negative marking, rank)  
- Gmail SMTP connected  
- Razorpay integration + webhook + dev mock  
- Bulk CSV import/export (questions + bank + reports)  

### Frontend (React + Vite + Tailwind)
- **57+ routes** — public, student, admin, exam fullscreen  
- NTA-style exam: timer, palette, sections, multi-select, calculator, violations  
- Test series catalog → enroll (free + paid) → my tests → exam → result  
- Invite OTP flow  
- Admin: assessment editor, test series, question bank, CMS, coupons, faculty, settings, reports  

### Credentials (dev)
- Admin: `admin@assess.io` / `Admin@12345`  
- Student: register at `/signup`  
- Admin login: `/admin-login`  

---

## 5. Revised development phases (remaining work only)

> Phases 1–4 are **largely complete**. Roadmap below starts from **current codebase**, not zero.

### Phase A — Production hardening (1–2 weeks)
**Goal:** Client-ready stability, no feature duplication  

| Task | Type |
|------|------|
| Production Razorpay keys + webhook URL on VPS | Config |
| SSL + Nginx + PM2 deployment runbook | Ops |
| SMTP production sender + email templates polish | Extend |
| Error monitoring (logs aggregation) | Net-new |
| Daily DB backup cron | Net-new |
| Load smoke test (200 concurrent autosaves) | QA |

**Explicitly out of scope:** Rebuilding auth, DB, or CBT core.

---

### Phase B — Client UX & content polish (1–2 weeks)
**Goal:** Professional face for meeting + launch  

| Task | Type |
|------|------|
| Public pages: real copy, testimonials, featured results | Content |
| SEO: sitemap, structured data, per-page meta | Extend |
| Student dashboard widgets (weak/strong subjects from analytics) | Extend |
| Admin overview: revenue, active tests, top students cards | Extend |
| Dark mode contrast audit (done mostly — regression pass) | QA |
| Figma alignment pass (spacing, typography) | Polish |

**Out of scope:** New student portal from scratch.

---

### Phase C — Examination depth (2–3 weeks)
**Goal:** Closer to official NTA parity  

| Task | Type |
|------|------|
| Integer / numerical question UI in CBT | Net-new UI on existing engine |
| Question image upload + zoom in exam | Net-new |
| Hindi / English paper toggle | Net-new |
| Test lifecycle: Draft → Scheduled → Live → Archived | Extend assessments table |
| Scheduled publish cron | Net-new job |
| Excel (.xlsx) bulk import with preview grid | Extend M9 |

**Out of scope:** Rewriting ExamScreen from zero.

---

### Phase D — Analytics & reporting depth (1–2 weeks)
**Goal:** PW/Testbook-level insights  

| Task | Type |
|------|------|
| Chapter/topic drill-down charts | Extend analytics API |
| Time-per-question analysis | Extend |
| Admin: question difficulty report | Extend reports |
| PDF export for attempt + revenue reports | Net-new |
| Improvement trend graph (student) | Extend frontend |

---

### Phase E — Commerce & growth (1–2 weeks)
**Goal:** Monetization completeness  

| Task | Type |
|------|------|
| GST invoice PDF | Net-new |
| Coupon apply at Razorpay checkout UI | Extend |
| Refund admin workflow | Net-new |
| Payment reminder emails | Extend notifications |

---

### Phase F — Future platform (post-launch backlog)
**Not in current sprint — architecture already supports via APIs**

- Android / iOS apps  
- Faculty dashboard (login + scoped permissions)  
- Parent dashboard  
- AI proctoring, AI study planner  
- SMS / WhatsApp notifications  
- Live classes integration  
- Referral / affiliate engine  

---

## 6. Client deliverables mapping

| Client deliverable | Status | Remaining |
|--------------------|--------|-----------|
| Responsive website | 🟡 | Content + Results page |
| Student portal | ✅ | Widget polish |
| Admin portal | ✅ | Dashboard stats |
| NTA-style CBT | 🟡 | Integer/numerical, images |
| Question bank | 🟡 | Topic hierarchy UI |
| Test series | ✅ | Banner optional |
| Payment gateway | 🟡 | Live keys + invoice PDF |
| Result & analytics | 🟡 | Deeper charts |
| Notifications | ✅ | SMS later |
| Security / proctoring | ✅ | AI later |
| VPS deployment | 🔴 | Phase A |
| Technical documentation | ✅ | This doc + MASTER SRS |
| Source code | ✅ | In repo |
| Modular architecture | ✅ | Demonstrate diagram |

---

## 7. Team allocation (suggested)

| Track | Owner focus | Weeks |
|-------|-------------|-------|
| **Track 1 — Platform** | DevOps, payments live, backup, monitoring | A |
| **Track 2 — Product UI** | Public site, dashboard widgets, admin stats | B |
| **Track 3 — CBT** | NTA parity features on existing ExamScreen | C |
| **Track 4 — Data** | Analytics depth, PDF reports | D |

Tracks B + C can run **in parallel** after Phase A config is stable.

---

## 8. Meeting narrative (architect pitch)

Use this verbatim structure:

1. **Vision** — NTA + Testbook + analytics, modular, API-first  
2. **What exists today** — Live demo: enroll → exam → result → admin builder (5 min)  
3. **Reuse statement** — *"Foundation is built; we are in extension and production phase, not greenfield."*  
4. **Roadmap** — Phases A–E above (timeline, not re-building)  
5. **Future** — Mobile + AI on same APIs (Phase F)  

**Power line:**

> *"Humne authentication, database, CBT engine, payments, notifications, aur admin panel ka modular core already implement kar liya hai. Ab kaam duplication nahi — production hardening, NTA-level polish, aur analytics depth hai. Isse timeline aur risk dono control mein rehte hain."*

---

## 9. Risk register

| Risk | Mitigation |
|------|------------|
| Client expects 100% NTA day one | Show gap list (integer UI, scheduling); Phase C timeline |
| Scope creep ("sab dubara banao") | Point to module table §3 — **Do not rebuild** column |
| Payment go-live delay | Mock mode works for demo; Razorpay test → live switch |
| Concurrent exam load | Phase A load test before marketing push |

---

## 10. Summary

| Metric | Value |
|--------|-------|
| **Overall SRS completion (code)** | ~**70–75%** (post recent bulk export + UI work) |
| **Demo-critical path** | ~**85%** ready |
| **Rebuild required** | **None** for core modules |
| **Net-new effort** | ~**6–10 weeks** for Phases A–E (parallel tracks) |

---

*Last updated: aligned with 22-module architect plan. Rule: extend existing AssessPro codebase; no duplicate implementation of finished modules.*
