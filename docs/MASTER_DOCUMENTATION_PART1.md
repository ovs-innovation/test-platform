# AssessPro CBT — Master Documentation · Part 1

> Merged from client SRS + UI/UX specification PDFs. Duplicates removed.  
> Use for: client meetings · proposals · sprint planning · development reference.

---

## Table of contents

1. [Project Overview](#1-project-overview)
2. [Objectives](#2-objectives)
3. [User Roles](#3-user-roles)
4. [Student Panel](#4-student-panel)
5. [Admin Panel](#5-admin-panel)
6. [Test Series Module](#6-test-series-module)
7. [CBT Module](#7-cbt-module)
8. [Question Bank](#8-question-bank)

---

## 1. Project Overview

### 1.1 What this platform is

AssessPro CBT is **not a simple website**. It is an end-to-end **Computer-Based Testing (CBT) platform** comparable in scope to:

| Reference | Capability borrowed |
|-----------|---------------------|
| **Testbook** | Test series marketplace, enrollments, student dashboard |
| **NTA (National Testing Agency)** | Exam interface — timer, palette, sections, review states |
| **Physics Wallah (PW) style analytics** | Performance graphs, weak/strong areas, improvement tracking |

The platform serves **aspirants** preparing for JEE, NEET, SSC, Banking, and other competitive exams, and **institutes/admins** who create, sell, and monitor mock tests.

### 1.2 High-level architecture

```
                    CBT PLATFORM
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
Public Website    Student Portal        Admin Portal
    │                    │                    │
    └──────────┬─────────┴─────────┬─────────┘
               │                   │
         CBT Engine          Question Bank
               │                   │
    ┌──────────┴─────────┬─────────┴─────────┐
    │                    │                   │
Analytics Engine   Payment Service   Notification Service
    │                    │                   │
    └────────────────────┴───────────────────┘
                         │
              Future: Mobile APIs · Faculty · Parent · AI
```

### 1.3 Core user journeys

**Journey A — Test series (open market)**  
`Home → Browse test series → Sign up / Login → Purchase (or free enroll) → My Tests → Instructions → Fullscreen CBT → Result → Analytics → Solutions`

**Journey B — Invited assessment (hiring / institute)**  
`Admin invite email → OTP verification → Instructions → Proctored CBT → Auto result email + solutions`

**Journey C — Admin operations**  
`Admin login → Create question bank → Build assessment / test series → Publish → Invite or sell → Monitor reports & revenue`

### 1.4 Module map (17 modules)

| # | Module | Part |
|---|--------|------|
| 1 | Public Website | Part 1 (Website in Part 2) |
| 2 | Authentication | Part 1 |
| 3 | Role System | Part 1 |
| 4 | Student Portal | Part 1 |
| 5 | Test Series | Part 1 |
| 6 | Question Bank | Part 1 |
| 7 | Question Import Engine | Part 1 |
| 8 | CBT Engine | Part 1 |
| 9 | Proctoring | Part 1 (Security in Part 2) |
| 10 | Result Engine | Part 2 |
| 11 | Analytics Engine | Part 2 |
| 12 | Payment Engine | Part 2 |
| 13 | Notification Engine | Part 2 |
| 14 | Admin Panel | Part 1 |
| 15 | Report Engine | Part 2 |
| 16 | Database Design | Part 2 |
| 17 | System Services | Part 2 |

### 1.5 Delivery philosophy

- **Prototype first:** Clickable end-to-end flow before full production polish  
- **Reuse existing foundation:** Auth, DB, SMTP, admin shell — faster and lower risk  
- **CBT highest priority:** Exam experience is the product differentiator  
- **API-first:** Same backend for web now, mobile later  

---

## 2. Objectives

### 2.1 Business objectives

| Objective | Description |
|-----------|-------------|
| **Lead generation** | Public website converts visitors to registered students |
| **Monetization** | Paid test series via Razorpay with automated unlock |
| **Exam authenticity** | NTA-style UI builds trust and exam readiness |
| **Retention** | Analytics, leaderboard, forum drive repeat usage |
| **Operational efficiency** | Admin bulk tools reduce content creation time |
| **Scalability** | Modular architecture supports future apps and roles |

### 2.2 Product objectives

1. Provide **real exam simulation** — not a quiz app  
2. Support **multiple question types** and negative marking  
3. Enable **secure proctored** attempts with violation tracking  
4. Deliver **actionable analytics** — subject/chapter/accuracy/time  
5. Offer **complete admin control** — content, pricing, users, CMS  
6. Maintain **professional brand presence** — SEO-ready public site  

### 2.3 Technical objectives

- PostgreSQL as single source of truth  
- JWT-based stateless authentication  
- REST APIs with role-based authorization  
- Webhook-verified payments  
- SMTP-driven transactional email  
- Daily database backups and SSL deployment  

### 2.4 Success metrics (KPIs)

| Metric | Target |
|--------|--------|
| Exam completion rate | > 85% of started attempts |
| Payment success rate | > 98% (excluding user cancellation) |
| Page load (public site) | < 3s on 4G |
| Concurrent exam users | 500+ per instance (scalable) |
| Admin bulk import | 1000+ questions per batch |
| Uptime | 99.5% monthly |

---

## 3. User Roles

### 3.1 Role hierarchy

```
Super Admin (future)
      │
    Admin
      │
   Faculty (future)
      │
   Student (Candidate)
      │
   Parent (future)
```

### 3.2 Role definitions

#### Super Admin *(future phase)*
- Manage multiple institutes / tenants  
- Global settings, billing, platform analytics  

#### Admin
- Full control: assessments, test series, question bank, users, payments, CMS, coupons, faculty, settings, broadcasts  
- Create invites for proctored hiring assessments  
- View all reports and revenue  

#### Faculty *(future / partial schema ready)*
- Create questions under assigned subjects  
- View batch performance reports  
- Cannot access payment or platform settings  

#### Student (Candidate)
- Register, purchase/enroll test series  
- Attempt CBT exams (marketplace + invited)  
- View results, analytics, certificates, forum, notifications  
- Manage profile and payment history  

#### Parent *(future)*
- View linked student's performance summary  
- Receive progress notifications  

### 3.3 Permission matrix (summary)

| Capability | Admin | Student | Faculty | Parent |
|------------|:-----:|:-------:|:-------:|:------:|
| Public website browse | ✓ | ✓ | ✓ | ✓ |
| Take CBT exam | — | ✓ | — | — |
| Create assessments | ✓ | — | Partial | — |
| Question bank CRUD | ✓ | — | Partial | — |
| Test series pricing | ✓ | — | — | — |
| Purchase tests | — | ✓ | — | — |
| View own analytics | — | ✓ | — | Linked |
| Platform settings | ✓ | — | — | — |
| Revenue reports | ✓ | — | — | — |

### 3.4 Authentication flows

**Student registration**  
`Register (name, email, password) → [Email verify] → JWT issued → Dashboard`

**Student login**  
`Email + password → JWT → Role-based redirect (dashboard)`

**Admin login**  
`Separate /admin-login → JWT (role=admin) → Admin overview`

**Invite + OTP flow**  
`Email link with token → Send OTP to email → Verify OTP → JWT → Assessment instructions`

**Password recovery**  
`Forgot password → Email reset link/token → New password → Login`

**Future:** Google/Apple OAuth, SMS OTP, 2FA  

---

## 4. Student Panel

### 4.1 Purpose

Central hub after login. Objectives: show progress, drive test attempts, surface notifications, and link to analytics/payments.

### 4.2 Navigation structure

| Menu item | Function |
|-----------|----------|
| Dashboard | Overview widgets, quick actions |
| My Tests | Enrolled test series + invited assessments |
| Analytics | Performance graphs, weak areas |
| Leaderboard | Rank among aspirants |
| Forum | Discussion, doubts |
| Notifications | System + exam alerts |
| Payments | Transaction history, invoices |
| Profile | Personal info, target exam |
| Settings | Password, preferences, theme |
| Invited | Hiring / direct assessment invites |

### 4.3 Dashboard widgets

| Widget | Data shown |
|--------|------------|
| Welcome + streak | Name, recent activity |
| Invited assessments | Pending / in-progress / completed |
| Test series flow | CTA: browse, free mock, resume |
| Stats cards | Invited count, pending, completed, pass rate |
| My test series | Enrolled series with progress |
| Latest score | Most recent attempt summary |
| Quick resume | Continue in-progress attempt |
| Weak / strong subjects | From analytics engine |
| Latest notification | Unread badge + preview |

### 4.4 My Tests

**Test series tests**  
- List assessments linked to purchased/enrolled series  
- States: `locked` · `available` · `in_progress` · `completed`  
- Actions: Start · Resume · View result  

**Invited assessments**  
- Separate from marketplace tests  
- Access only via invite token + OTP  

### 4.5 Exam entry flow

```
My Tests / Series detail
        ↓
Assessment Instructions (rules, duration, marking scheme)
        ↓
[System check: fullscreen prompt]
        ↓
CBT Exam Screen
        ↓
Submit / Auto-submit
        ↓
Result Page
```

### 4.6 Profile & settings

**Profile fields:** name, email, phone, city, state, target exam, avatar  
**Settings:** change password, dark/light theme, notification preferences  

### 4.7 Student screens (Figma scope)

~12 student screens + ~10 exam screens + ~8 result screens = **~30 student-facing screens**

---

## 5. Admin Panel

### 5.1 Purpose

Complete backend control for content, users, commerce, and reporting.

### 5.2 Navigation structure

| Section | Capabilities |
|---------|--------------|
| Overview | Stats: users, attempts, revenue summary |
| Test Series | CRUD, link assessments, pricing, featured flag |
| Assessments | Create/edit tests, sections, questions, publish |
| Question Bank | Category/subject hierarchy, reusable questions |
| Subjects & Chapters | Taxonomy for analytics tagging |
| Question Bank (bulk) | CSV import/export |
| Candidates | Registered students, attempt history |
| Reports | Per-attempt detail, export CSV |
| Revenue / Payments | Razorpay transactions, admin revenue view |
| Invites | Email invites, resend, OTP flow |
| Coupons | Discount codes, validity, usage limits |
| CMS | Blog, FAQs, static pages |
| Faculty | Teacher accounts *(future active use)* |
| Settings | Platform name, SMTP, Razorpay keys, marking defaults |
| Notifications | Broadcast to all students |

### 5.3 Assessment builder

**Tabs:** General · Questions · Sections · Candidates · Invitations  

**General settings:**  
- Title, description, instructions  
- Duration, passing marks, max violations  
- Negative marking toggle + marks per wrong  
- Result visibility (immediate / hidden)  
- Publish / unpublish  

**Question builder:**  
- Add MCQ, multi-select, coding, subjective  
- Reorder, edit, delete  
- Import from question bank (single or bulk category)  
- CSV import / export  

**Sections:**  
- Aptitude, Technical MCQ, Coding, Subjective  
- Section-wise navigation in CBT  

**Invitations:**  
- Email invite → unique link → OTP → exam  

### 5.4 Admin screens (Figma scope)

~15 admin screens including editors, lists, and detail views.

---

## 6. Test Series Module

### 6.1 Business flow

```
Admin creates test series
        ↓
Sets price, validity, exam type (JEE/NEET/General)
        ↓
Links one or more assessments as "tests"
        ↓
Publishes on public catalog
        ↓
Student browses → detail page → enroll/purchase
        ↓
Payment verified (or free) → enrollment record
        ↓
Tests unlocked in "My Tests" for validity period
```

### 6.2 Test series entity

| Field | Description |
|-------|-------------|
| id | Primary key |
| title | Display name |
| slug | URL-friendly identifier |
| description | Marketing copy |
| price | 0 = free |
| validity_days | Access window after purchase |
| exam_type | JEE Main, NEET, SSC, etc. |
| test_count | Number of linked assessments |
| is_featured | Show on homepage |
| is_active | Visible in catalog |

### 6.3 Enrollment states

| State | Meaning |
|-------|---------|
| `active` | Within validity, tests accessible |
| `expired` | Validity ended |
| `pending_payment` | Checkout started, not confirmed |

### 6.4 Public catalog

- **Listing page:** filter by exam type, featured, price  
- **Detail page:** description, included tests, price, enroll CTA  
- **Free diagnostic mock:** entry point for lead conversion  

### 6.5 Admin operations

- Create / edit / delete series  
- Link assessment with label (e.g. "Mock 1", "Mock 2")  
- Unlink tests, reorder  
- View enrollment count per series  

---

## 7. CBT Module

### 7.1 Design principle

The CBT engine is the **heart of the platform**. It must feel indistinguishable from a real NTA exam — not a generic quiz UI.

### 7.2 Exam flow

```
Instructions screen
        ↓
Candidate verification (details confirm)
        ↓
"Start Exam" → fullscreen request
        ↓
Timer starts (server-synced)
        ↓
Question display + palette update
        ↓
Autosave on every action
        ↓
Mark for review / clear response
        ↓
Section navigation (if multi-section)
        ↓
Submit confirmation popup
        ↓
Auto-submit on timer expiry OR max violations
        ↓
Evaluation engine
```

### 7.3 UI components

| Component | Behavior |
|-----------|----------|
| **Header** | Exam name, section name, timer (color warning < 5 min) |
| **Question area** | Stem, options, images (zoom), LaTeX support |
| **Palette grid** | Numbered buttons: not visited · answered · review · review+answered |
| **Footer actions** | Save & Next · Mark for Review · Clear · Previous · Submit |
| **Section tabs** | Switch between Physics / Chemistry / Math etc. |
| **Calculator** | JEE-mode scientific calculator overlay |
| **Language toggle** | EN / HI *(future)* |

### 7.4 Question states (palette)

| State | Color code |
|-------|------------|
| Not visited | Grey |
| Not answered | Red |
| Answered | Green |
| Marked for review | Purple |
| Answered + marked | Purple-green |

### 7.5 Autosave & resume

- Every answer change persisted to server immediately  
- Refresh or disconnect → resume from last saved state  
- Timer continues from server elapsed time (not client-only)  

### 7.6 Submit rules

- Manual submit → confirmation modal ("Are you sure?")  
- Auto-submit when timer = 0  
- Auto-submit when violation limit exceeded  
- No changes allowed after submit  

### 7.7 Proctoring (integrated)

See Part 2 Security section for full detail. Core CBT integration:

- Fullscreen enforcement  
- Tab-switch / blur detection → violation counter  
- Copy, paste, right-click blocked during exam  
- Optional: camera / AI proctoring *(future)*  

### 7.8 Supported question types in CBT

| Type | Input method |
|------|--------------|
| Single MCQ | Radio select |
| Multiple MCQ | Checkbox multi-select |
| Integer | Numeric keypad *(planned)* |
| Numerical | Decimal input *(planned)* |
| Assertion-Reason | Special MCQ layout *(planned)* |
| Coding | In-browser code editor + run |
| Subjective | Textarea (manual grading) |

---

## 8. Question Bank

### 8.1 Purpose

Central repository of reusable questions. Admins build once, import into any assessment or test series test.

### 8.2 Hierarchy

```
Exam (JEE / NEET / SSC)
    └── Subject (Physics, Chemistry, Math)
            └── Chapter (e.g. Mechanics)
                    └── Topic (e.g. Kinematics)
                            └── Question
                                    └── Solution + metadata
```

### 8.3 Question metadata

| Field | Description |
|-------|-------------|
| question_text | Stem (supports HTML/images) |
| question_type | mcq, multi_select, integer, numerical, coding, subjective |
| options | Array or pipe-separated for import |
| correct_index | Single correct (MCQ) |
| correct_indices | Multiple correct (multi-select) |
| marks | Positive marks |
| negative_marks | Deduction per wrong *(assessment-level override possible)* |
| difficulty | easy / medium / hard |
| solution | Explanation text |
| image_url | Optional diagram |
| category / subject / chapter / topic | Taxonomy tags |
| language | en / hi |

### 8.4 Question types (full SRS)

**Phase 1 (required)**  
- Single MCQ  
- Multiple MCQ  
- Coding (with test cases)  
- Subjective  

**Phase 2 (competitive exam)**  
- Integer type  
- Numerical type  
- Assertion-Reason  

**Phase 3 (advanced)**  
- Matrix match  
- Paragraph / comprehension based  

### 8.5 Question import engine

```
Admin uploads CSV / Excel
        ↓
Server validates columns + data types
        ↓
Preview screen (errors highlighted per row)
        ↓
Confirm import
        ↓
Questions saved to bank (or directly to assessment)
        ↓
Version / audit log *(future)*
```

**CSV columns (bank):**  
`category, question_text, question_type, marks, options, correct_index, correct_indices, solution`

**CSV columns (assessment):**  
`question_text, question_type, marks, options, correct_index, correct_indices, solution, section_name`

**Supported formats:** CSV (required), XLSX (planned), image bulk upload (planned)

### 8.6 Export

- Export all questions or filter by category/subject  
- Download as CSV for backup, editing offline, or migration  

### 8.7 Import to assessment

| Method | Description |
|--------|-------------|
| Single import | Pick one bank question → adds to assessment |
| Bulk by category | Import all questions from e.g. "JavaScript" category |
| CSV bulk | Paste or upload file directly into assessment |

### 8.8 Question bank admin UI

- Category tabs (Aptitude, JavaScript, React, etc. — configurable)  
- Manual add form  
- List with edit/delete  
- CSV import modal with file picker + template  
- Export current category / export all  

---

## Part 1 — End

**Continue to:** [MASTER_DOCUMENTATION_PART2.md](./MASTER_DOCUMENTATION_PART2.md)  
**Index:** [MASTER_DOCUMENTATION_INDEX.md](./MASTER_DOCUMENTATION_INDEX.md)
