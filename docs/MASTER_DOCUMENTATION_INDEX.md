# AssessPro CBT — Master Documentation

**Version:** 1.0 (Merged SRS)  
**Platform type:** Testbook + NTA CBT + PW Analytics  
**Purpose:** Client meeting · Proposal · Development reference  

---

## Document structure

| Part | File | Sections |
|------|------|----------|
| **Part 1** | [MASTER_DOCUMENTATION_PART1.md](./MASTER_DOCUMENTATION_PART1.md) | Overview, Objectives, Roles, Student Panel, Admin Panel, Test Series, CBT, Question Bank |
| **Part 2** | [MASTER_DOCUMENTATION_PART2.md](./MASTER_DOCUMENTATION_PART2.md) | Results, Analytics, Payment, Notifications, Website, Security, Stack, Performance, Backup, Acceptance Criteria, Future Scope |

---

## Executive summary

AssessPro CBT is a **modular online examination platform** for competitive exam preparation (JEE, NEET, SSC, Govt exams). It combines:

1. **Public marketing website** — lead generation, registration, test series sales  
2. **Student portal** — purchased tests, live CBT, results, analytics  
3. **Admin portal** — question bank, test creation, payments, reports, CMS  
4. **CBT engine** — NTA-style fullscreen exam with proctoring  
5. **Supporting services** — payments (Razorpay), notifications (SMTP), analytics  

Architecture is **API-first** so future Android/iOS apps, faculty panel, and parent dashboard can be added without rewriting the core.

---

## Reuse strategy (meeting highlight)

> Existing foundation is reused: PostgreSQL, JWT authentication, SMTP email, role middleware, admin layout, API structure, validation, error handling, and CBT engine core. New work focuses on business modules (test series marketplace, payments, bulk import, deep analytics, NTA polish).

---

## Related technical docs

- [API.md](./API.md) — REST API reference for current build  
- [UI_UX_PRD.md](./UI_UX_PRD.md) — **Design & experience spec (PRD level)**  
- [ARCHITECT_DEVELOPMENT_ROADMAP.md](./ARCHITECT_DEVELOPMENT_ROADMAP.md) — What to build next (no rebuilds)
