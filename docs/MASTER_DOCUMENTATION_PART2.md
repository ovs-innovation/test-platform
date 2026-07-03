# AssessPro CBT — Master Documentation · Part 2

> Continuation of merged client SRS. See [Part 1](./MASTER_DOCUMENTATION_PART1.md) for overview through Question Bank.

---

## Table of contents

9. [Result System](#9-result-system)
10. [Analytics](#10-analytics)
11. [Payment](#11-payment)
12. [Notification](#12-notification)
13. [Website Pages](#13-website-pages)
14. [Security](#14-security)
15. [Technical Stack](#15-technical-stack)
16. [Performance](#16-performance)
17. [Backup & Recovery](#17-backup--recovery)
18. [Acceptance Criteria](#18-acceptance-criteria)
19. [Future Scope](#19-future-scope)

---

## 9. Result System

### 9.1 Purpose

Immediately after exam submission, evaluate answers, compute scores, and present a comprehensive result experience comparable to real competitive exam portals.

### 9.2 Evaluation flow

```
Attempt submitted (manual / auto / violation)
        ↓
Server locks attempt (no further edits)
        ↓
For each question:
    ├── MCQ: compare selected_index vs correct_index
    ├── Multi-select: compare selected_indices set vs correct set
    ├── Coding: run against test cases (partial marks)
    └── Subjective: pending manual review flag
        ↓
Apply positive marks + negative marking rules
        ↓
Compute total, percentage, pass/fail
        ↓
Calculate rank & percentile (within assessment cohort)
        ↓
Store score record + generate certificate eligibility
        ↓
Send result email (invited flow)
        ↓
Display result page to student
```

### 9.3 Scoring rules

| Rule | Description |
|------|-------------|
| Positive marking | Per-question `marks` field |
| Negative marking | Configurable per assessment (e.g. −0.25 per wrong) |
| Unattempted | Zero marks, no negative |
| Partial marking | Multi-select: proportional or all-or-nothing *(configurable)* |
| Pass criteria | `marks_obtained >= passing_marks` |

### 9.4 Result page components

| Section | Content |
|---------|---------|
| Score summary | Obtained / total marks, percentage, pass/fail badge |
| Rank & percentile | Position among all submitted attempts |
| Time analysis | Total duration vs allowed duration |
| Section-wise breakdown | Marks per section |
| Question-wise review | Correct / wrong / unattempted grid |
| Solutions | Explanation per question (if enabled) |
| Certificate CTA | Download PDF certificate if passed |
| Share / retake | Social share *(future)* · Retake if allowed |

### 9.5 Result history

- Student can view all past attempts from dashboard  
- Filter by test series, assessment, date  
- Compare improvement across attempts  

### 9.6 Admin result access

- Full attempt report: every answer, violation log, timing  
- Export individual or bulk reports (CSV)  
- Manual score override for subjective questions *(admin only)*  

---

## 10. Analytics

### 10.1 Purpose

Transform raw attempt data into **actionable insights** — the PW/Testbook-style value layer that drives retention and paid upgrades.

### 10.2 Student analytics

| View | Metrics |
|------|---------|
| **Overall performance** | Average score, tests taken, pass rate trend |
| **Subject analysis** | Bar chart: Physics vs Chemistry vs Math accuracy |
| **Chapter analysis** | Drill-down within subject |
| **Accuracy** | Correct / attempted ratio over time |
| **Speed** | Avg time per question vs benchmark |
| **Time management** | Questions left unattempted, rush at end |
| **Improvement graph** | Score trend over last N attempts |
| **Weak topics** | Bottom 5 chapters by accuracy |
| **Strong topics** | Top 5 chapters |
| **Recommendations** | Suggested tests/chapters to practice |

### 10.3 Admin analytics

| View | Metrics |
|------|---------|
| Platform overview | Total students, attempts, revenue |
| Assessment analytics | Avg score, completion rate, difficulty index |
| Question analytics | Most wrong questions, discrimination index |
| Conversion funnel | Visit → signup → purchase → attempt |
| Faculty reports | Batch performance *(future)* |

### 10.4 Leaderboard

- Rank students by score within assessment or globally  
- Filters: weekly / monthly / all-time  
- Display: rank, name, score, tests completed  

### 10.5 Future analytics (AI layer)

- AI study planner based on weak areas  
- Predicted rank / AIR estimator  
- AI doubt solver integration  
- Performance heatmap (question-type × accuracy)  

---

## 11. Payment

### 11.1 Purpose

Monetize test series through secure online payments with automated access unlock.

### 11.2 Payment provider

**Primary:** Razorpay (India)  
**Future:** Stripe (international), UPI direct, wallet  

### 11.3 Purchase flow

```
Student selects paid test series
        ↓
Create order (server → Razorpay order_id)
        ↓
Razorpay checkout modal (UPI / card / netbanking)
        ↓
Payment success callback (client)
        ↓
Server verifies signature (HMAC)
        ↓
Webhook confirmation (server-to-server)
        ↓
Enrollment record created / activated
        ↓
Invoice email sent
        ↓
Dashboard updated — tests unlocked
```

### 11.4 Free enrollment

- Price = 0 → skip Razorpay, direct enrollment API  
- Used for lead magnets (free diagnostic mock)  

### 11.5 Payment entity

| Field | Description |
|-------|-------------|
| user_id | Student |
| test_series_id | Purchased series |
| amount | In INR paise |
| razorpay_order_id | Gateway reference |
| razorpay_payment_id | Transaction ID |
| status | pending / success / failed / refunded |
| created_at | Timestamp |

### 11.6 Student payment history

- List all transactions with status, amount, date  
- Download invoice PDF *(planned)*  

### 11.7 Admin revenue

- Revenue dashboard: total, monthly, per series  
- Transaction list with filters  
- Export CSV  

### 11.8 Coupons *(module)*

| Field | Description |
|-------|-------------|
| code | e.g. LAUNCH50 |
| discount_type | percentage / flat |
| discount_value | Amount |
| max_uses | Usage cap |
| valid_until | Expiry date |
| is_active | Toggle |

Applied at checkout → reduced Razorpay amount.

### 11.9 Future payment features

- GST invoice generation  
- Affiliate / referral commissions  
- Subscription plans (monthly access)  
- Refund workflow with admin approval  

---

## 12. Notification

### 12.1 Purpose

Keep students informed across the lifecycle — registration through results — using email as primary channel (SMTP already in foundation).

### 12.2 Notification types

| Trigger | Channel | Recipient |
|---------|---------|-----------|
| Registration welcome | Email | Student |
| Email verification | Email | Student |
| OTP (invite login) | Email | Candidate |
| Payment success + invoice | Email | Student |
| Test reminder (24h before) | Email | Student |
| Result published | Email | Student |
| Password reset | Email | User |
| Admin broadcast | Email + in-app | All / segment |
| Marketing / offers | Email | Opted-in students |

### 12.3 In-app notifications

| Feature | Description |
|---------|-------------|
| Notification list | Paginated, read/unread state |
| Unread badge | Sidebar counter |
| Mark read / mark all read | User actions |
| Deep links | Click → relevant page (result, payment, etc.) |

### 12.4 Admin broadcast

- Compose title + body  
- Send to all registered students  
- Stored in notifications table + optional email  

### 12.5 Future channels

- WhatsApp Business API  
- SMS (OTP + alerts)  
- Push notifications (mobile app)  
- Web push (PWA)  

### 12.6 Email infrastructure

- SMTP (Gmail / SendGrid / AWS SES)  
- HTML templates: invite, OTP, result, invoice, reset password  
- Email logs table for audit  
- Dev mode: OTP fallback on screen when SMTP unavailable  

---

## 13. Website Pages

### 13.1 Purpose

Public marketing layer for SEO, trust, and conversion. Objective chain:

`Lead Generation → Registration → Purchase → Student Dashboard`

### 13.2 Page inventory

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, features, featured series, stats |
| About | `/about` | Company story, mission |
| Test Series | `/test-series` | Catalog listing |
| Test Series Detail | `/test-series/:slug` | Single series + enroll CTA |
| Pricing | `/pricing` | Plans comparison |
| Free Mock | `/free-mock` | Lead magnet entry |
| Blog | `/blog` | SEO content, updates |
| Blog Post | `/blog/:slug` | Individual article (CMS) |
| FAQs | `/faqs` | Common questions (CMS) |
| Contact | `/contact` | Contact form |
| Privacy Policy | `/privacy` | Legal |
| Terms of Service | `/terms` | Legal |
| Refund Policy | `/refund` | Legal |
| Student Login | `/student-login` | Candidate auth |
| Sign Up | `/signup` | Registration |
| Forgot Password | `/forgot-password` | Reset request |
| Reset Password | `/reset-password` | New password form |
| Admin Login | `/admin-login` | Admin auth (separate) |

**Total public screens:** ~12 (+ responsive variants)

### 13.3 SEO requirements

- Unique `<title>` and meta description per page  
- Open Graph tags for social sharing  
- Semantic HTML headings (H1 per page)  
- Sitemap.xml + robots.txt  
- Fast LCP (< 2.5s target)  
- Keywords: NTA CBT, JEE mock, NEET mock, test series, online exam  

### 13.4 Design requirements

- Professional, institute-grade (not "childish" UI)  
- Dark / light theme toggle  
- Mobile-first responsive  
- Consistent design system: typography, spacing, shadows, brand colors  
- Accessible contrast ratios (WCAG AA)  

### 13.5 CMS-managed content

Admin can edit without code deploy:

- Blog posts  
- FAQ entries  
- Static page blocks (About, Policies)  
- Homepage featured series toggle  

---

## 14. Security

### 14.1 Authentication security

| Control | Implementation |
|---------|----------------|
| Password hashing | bcrypt |
| Session tokens | JWT with expiry |
| Rate limiting | Login, OTP, API endpoints |
| Role middleware | Route-level authorization |
| HTTPS | SSL/TLS in production |

### 14.2 Exam proctoring

```
Fullscreen enforcement
        ↓
Tab switch / window blur → violation logged
        ↓
Copy / paste / cut blocked
        ↓
Right-click disabled
        ↓
Violation counter displayed to student
        ↓
Max violations reached → auto-submit
        ↓
Violation log stored per attempt (admin review)
```

### 14.3 API security

- Helmet.js HTTP headers  
- CORS whitelist (frontend origin only)  
- Input validation (Zod schemas)  
- SQL injection prevention (parameterized queries)  
- JWT required on protected routes  

### 14.4 Payment security

- Razorpay signature verification (client + webhook)  
- Never store card details on server  
- Webhook endpoint with raw body HMAC check  

### 14.5 Data privacy

- Password never returned in API responses  
- Student data accessible only to self + admin  
- Privacy policy compliance (India DPDP awareness)  
- Right to delete account *(planned)*  

### 14.6 Future security

- AI face detection during exam  
- Eye tracking / gaze monitoring  
- Audio noise detection  
- IP-based anomaly detection  
- 2FA for admin accounts  

---

## 15. Technical Stack

### 15.1 Frontend

| Technology | Use |
|------------|-----|
| React 18 | UI framework |
| Vite | Build tool, dev server |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling + design system |
| Axios | HTTP client |
| Context API | Auth, theme, toast state |

**Optional / planned:** TanStack Query, React Hook Form, Framer Motion (marketing pages only)

### 15.2 Backend

| Technology | Use |
|------------|-----|
| Node.js 18+ | Runtime |
| Express 4 | REST API framework |
| PostgreSQL | Primary database (Neon cloud) |
| pg | Database driver |
| Zod | Request validation |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Nodemailer | SMTP email |
| Razorpay SDK | Payments |
| Helmet + Morgan | Security + logging |

### 15.3 Database (core tables)

```
users · student_profiles · assessments · assessment_sections
questions · question_bank · test_series · test_series_assessments
enrollments · attempts · answers · scores · violations
payments · notifications · invites · otp_codes
coupons · cms_pages · faculty · subjects · chapters · topics
forum_topics · forum_replies · certificates · settings · password_resets
```

### 15.4 Services architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│  Express    │────▶│ PostgreSQL  │
│   (Vite)    │     │  REST API   │     │   (Neon)    │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
           SMTP        Razorpay      File Storage
          (Email)     (Payments)    (Images, future)
```

### 15.5 Deployment

| Component | Tool |
|-----------|------|
| Server | VPS (Ubuntu) |
| Process manager | PM2 |
| Reverse proxy | Nginx |
| SSL | Let's Encrypt |
| Database | Neon PostgreSQL (managed) |
| Frontend | Static build served via Nginx or CDN |
| Env secrets | `.env` (never committed) |

### 15.6 Development workflow

```
Sprint 1: Architecture + DB + design system + prototype
Sprint 2: Website + auth + student portal
Sprint 3: Question bank + test series + payment
Sprint 4: CBT engine polish (palette, review, sections)
Sprint 5: Results + analytics + reports + notifications
Sprint 6: Testing + optimization + deployment + documentation
```

---

## 16. Performance

### 16.1 Targets

| Metric | Target |
|--------|--------|
| API response (p95) | < 500ms (excluding exam submit) |
| Exam autosave | < 200ms perceived |
| Public page LCP | < 2.5s |
| Concurrent users | 500+ per node |
| Database connections | Pooled (pg pool) |

### 16.2 Optimization strategies

- Database indexes on foreign keys, `user_id`, `assessment_id`, `attempt_id`  
- Pagination on list endpoints (reports, notifications, forum)  
- Lazy loading for analytics charts  
- Code splitting for exam screen (heavy bundle isolated)  
- CDN for static assets and question images  
- Redis caching for public catalog *(planned)*  

### 16.3 Exam-specific performance

- Autosave debounced but immediate on navigation  
- Timer synced from server every 30s (prevent client drift)  
- Question payload loaded once at attempt start (not per question fetch)  

### 16.4 Load testing

- Simulate 200 concurrent exam submissions before launch  
- Payment webhook idempotency (duplicate webhook safe)  

---

## 17. Backup & Recovery

### 17.1 Database backup

| Policy | Detail |
|--------|--------|
| Frequency | Daily automated (Neon built-in + manual pg_dump) |
| Retention | 30 days rolling |
| Storage | Off-site (separate from application server) |
| Test restore | Monthly restore drill |

### 17.2 Application backup

- Git repository (code version control)  
- Environment variables documented in `.env.example` (no secrets)  
- Media files (question images) → cloud storage with versioning *(planned)*  

### 17.3 Disaster recovery

| Scenario | RTO | RPO |
|----------|-----|-----|
| DB corruption | < 4 hours | < 24 hours |
| Server failure | < 1 hour | 0 (stateless API) |
| Payment webhook miss | Manual reconcile | Real-time retry |

### 17.4 Audit logs

- Admin actions on assessments, payments, user data *(planned)*  
- Violation logs per attempt (implemented)  
- Email send logs  

---

## 18. Acceptance Criteria

### 18.1 Public website

- [ ] All 12+ pages render on mobile, tablet, desktop  
- [ ] SEO meta tags present on every public page  
- [ ] Dark mode works without contrast failures  
- [ ] Free mock enroll flow completes without payment  

### 18.2 Authentication

- [ ] Student can register, login, logout  
- [ ] Admin has separate login route  
- [ ] Forgot / reset password works via email  
- [ ] Invite + OTP flow delivers code to email  
- [ ] JWT expires and redirects to login on 401  

### 18.3 Student portal

- [ ] Dashboard shows enrolled series and invited tests  
- [ ] My Tests lists available / in-progress / completed  
- [ ] Profile editable and persisted  
- [ ] Payment history shows all transactions  
- [ ] Notifications list with unread count  

### 18.4 Test series

- [ ] Admin creates series, links tests, sets price  
- [ ] Student purchases via Razorpay (or free enroll)  
- [ ] Tests unlock only after successful payment  
- [ ] Validity expiry blocks new attempts  

### 18.5 Question bank

- [ ] CRUD for bank questions by category  
- [ ] CSV import with validation errors per row  
- [ ] CSV export (category + all)  
- [ ] Bulk import category into assessment  
- [ ] Subject → chapter → topic hierarchy navigable  

### 18.6 CBT engine

- [ ] Fullscreen exam with working timer  
- [ ] Question palette shows all states correctly  
- [ ] Save & Next, Mark for Review, Clear work  
- [ ] Section tabs switch questions  
- [ ] Autosave survives page refresh  
- [ ] Auto-submit on timer = 0  
- [ ] Multi-select questions supported  
- [ ] Calculator available (JEE mode)  

### 18.7 Proctoring

- [ ] Tab switch increments violation counter  
- [ ] Copy/paste blocked in exam  
- [ ] Auto-submit at max violations  
- [ ] Violations visible in admin attempt report  

### 18.8 Results

- [ ] Score calculated with negative marking when enabled  
- [ ] Rank and percentile displayed  
- [ ] Solutions shown when `result_visible = true`  
- [ ] Certificate downloadable on pass  

### 18.9 Analytics

- [ ] Student sees subject-wise performance  
- [ ] Leaderboard ranks by score  
- [ ] Admin sees platform stats and reports  
- [ ] Reports exportable as CSV  

### 18.10 Payment

- [ ] Razorpay live keys work in production  
- [ ] Webhook unlocks test on `payment.captured`  
- [ ] Invoice email sent on success  
- [ ] Coupons reduce checkout amount  

### 18.11 Admin panel

- [ ] All admin sections accessible with role guard  
- [ ] Assessment builder: create, publish, invite  
- [ ] CMS: edit blog, FAQs, static content  
- [ ] Broadcast notification reaches all students  

### 18.12 Non-functional

- [ ] SSL enabled in production  
- [ ] Daily DB backup configured  
- [ ] API rate limiting active  
- [ ] No critical security vulnerabilities (OWASP top 10)  
- [ ] Load test passed for 200 concurrent users  

---

## 19. Future Scope

### 19.1 Mobile applications

- Android app (React Native / Flutter)  
- iOS app  
- Same REST APIs — no backend rewrite  

### 19.2 Additional roles

- **Teacher / Faculty dashboard** — batch management, content creation  
- **Parent dashboard** — child progress view  
- **Super admin** — multi-tenant institutes  

### 19.3 Advanced exam features

- Matrix match questions  
- Paragraph comprehension blocks  
- Integer / numerical NTA input UI  
- Multi-language question paper (EN / HI)  
- Offline exam mode (sync later)  

### 19.4 AI-powered features

- AI proctoring (face, gaze, audio)  
- AI doubt solver (chat)  
- AI study planner (personalized schedule)  
- Predicted rank / AIR estimator  
- Auto question tagging by difficulty  

### 19.5 Community & engagement

- Discussion forum (implemented — extend with moderation)  
- Leaderboards (implemented — extend with leagues)  
- Referral program + affiliate dashboard  
- Live classes integration (Zoom / YouTube embed)  
- Gamification: badges, streaks, XP  

### 19.6 Commerce extensions

- Subscription plans (monthly all-access)  
- Bundled test series packages  
- GST-compliant invoicing  
- EMI payment options  

### 19.7 Platform extensions

- White-label for coaching institutes  
- API marketplace for third-party content providers  
- Webhook integrations (CRM, LMS)  
- Advanced BI dashboard (Metabase / Grafana)  

---

## Appendix A — Screen count summary

| Area | Screens |
|------|---------|
| Public website | 12 |
| Student portal | 12 |
| Exam flow | 10 |
| Results & analytics | 8 |
| Admin panel | 15 |
| **Total** | **~57** |

---

## Appendix B — Meeting pitch (one paragraph)

> *"We are not building just a website — we are building a modular CBT platform where Authentication, CBT Engine, Question Bank, Payment, Notification, and Analytics are independent services. Our reusable foundation (PostgreSQL, JWT auth, SMTP, admin framework) is already in place, so we focus on NTA-level exam experience and business modules. The architecture supports future Android/iOS apps, faculty panel, parent dashboard, and AI analytics without a system rewrite."*

---

## Part 2 — End

**Back to:** [MASTER_DOCUMENTATION_PART1.md](./MASTER_DOCUMENTATION_PART1.md)  
**Index:** [MASTER_DOCUMENTATION_INDEX.md](./MASTER_DOCUMENTATION_INDEX.md)
