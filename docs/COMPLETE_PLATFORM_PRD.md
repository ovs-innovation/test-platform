# EDVEDUM ACADEMY & AssessPro CBT Platform
## Complete Product Requirements Document (PRD)

**Document Version:** 2.0 (Consolidated Master PRD)  
**Status:** Approved & Implemented Baseline  
**Product Scope:** Full-Stack Online Examination, Test Series Marketplace, Multi-Tenant Institutional B2B SaaS, and Academic Management Platform  
**Target Examinations:** JEE Main, JEE Advanced, NEET-UG, Foundation (Classes 8–10), SSC & National Competitive Exams  
**Technology Stack:** React 18 + Vite + Tailwind CSS · Node.js 18+ (Express) · PostgreSQL 15+ · Gemini 3.8 Flash Vision AI · Razorpay & PhonePe Gateway  

---

## Table of Contents

1. [Executive Summary & Strategic Vision](#1-executive-summary--strategic-vision)
2. [Stakeholders & User Personas Matrix](#2-stakeholders--user-personas-matrix)
3. [System Architecture & Technology Blueprint](#3-system-architecture--technology-blueprint)
4. [Module 1: Public Marketing, Discovery & Admissions Engine](#4-module-1-public-marketing-discovery--admissions-engine)
5. [Module 2: Candidate / Student Learning & CBT Portal](#5-module-2-candidate--student-learning--cbt-portal)
6. [Module 3: Computer-Based Testing (CBT) Assessment Engine](#6-module-3-computer-based-testing-cbt-assessment-engine)
7. [Module 4: Anti-Cheat & Security Proctoring Engine](#7-module-4-anti-cheat--security-proctoring-engine)
8. [Module 5: Multi-Tenant Institution / Coaching Center Portal (B2B SaaS)](#8-module-5-multi-tenant-institution--coaching-center-portal-b2b-saas)
9. [Module 6: Super Admin Command Center](#9-module-6-super-admin-command-center)
10. [Module 7: AI Vision Paper Extractor & Question Bank System](#10-module-7-ai-vision-paper-extractor--question-bank-system)
11. [Module 8: Evaluation, Scoring & Longitudinal Analytics Engine](#11-module-8-evaluation-scoring--longitudinal-analytics-engine)
12. [Module 9: Financial Operations, Dual-Gateway & Offline Ledger](#12-module-9-financial-operations-dual-gateway--offline-ledger)
13. [Module 10: Communications, Notifications & Content Engine](#13-module-10-communications-notifications--content-engine)
14. [Consolidated Database Architecture (Migrations v1–v56)](#14-consolidated-database-architecture-migrations-v1v56)
15. [Non-Functional Requirements & Compliance](#15-non-functional-requirements--compliance)
16. [Future Product Roadmap](#16-future-product-roadmap)

---

## 1. Executive Summary & Strategic Vision

### 1.1 Product Definition
**EDVEDUM ACADEMY (AssessPro CBT)** is a high-concurrency, enterprise-grade EdTech testing and academic operations ecosystem. It unifies four critical pillars into a single consolidated platform:
1. **High-Stakes NTA-Style CBT Simulation:** Replicates the exact test environment of India's National Testing Agency (JEE Main/Advanced, NEET) with bilingual support, section rules, offline resilience, and anti-cheat tracking.
2. **PW & Allen Style Advanced Analytics:** Deep post-test diagnostics, percentile prediction, All India Rank (AIR), subject-topic radar charts, time-management curves, and AI-driven personalized remedial test generation.
3. **E-Commerce & Test Series Marketplace:** Packaged multi-test series, brochure downloads, coupons, and payments via dual gateways (Razorpay + PhonePe) and manual offline installment tracking.
4. **B2B Multi-Tenant Institutional Platform:** Dedicated portal for partner schools and coaching institutes to manage batches, bulk-onboard students, assign tests, monitor attendance, and compare cohort performance.
5. **Dynamic Admissions & Institutional Management:** Drag-and-drop form schema builder, webcam photo capture, barcode application slip generation, and application lifecycle tracking.

### 1.2 Core Value Propositions
* **For Students:** Practice in an authentic CBT exam interface, pinpoint exact conceptual weak points via an automated Mistake Book, compare performance against top rankers, and receive targeted 50-question AI booster tests.
* **For Institutions & Schools:** Zero infrastructure overhead to host digital exams, automated grading, batch-to-batch comparisons, and institutional rank reports.
* **For Platform Administrators:** Complete operational control over content, live test monitoring, automated PDF question extraction with diagrams using Google Gemini Vision AI, and flexible fee collection.

---

## 2. Stakeholders & User Personas Matrix

| Persona | Primary Needs & Goals | Core Platform Touchpoints | Key Permissions |
|---|---|---|---|
| **Student / Candidate** | Prepare for competitive exams, attempt CBT tests, analyze weaknesses, practice mistake lists, download certificates. | Candidate Portal, CBT Exam Screen, Post-Test Analytics, Mistake Book, Forum, Calendar. | Read/attempt assigned & purchased tests; view personal analytics; submit doubts; manage profile. |
| **Institution Admin** | Onboard students, group into batches, assign institutional tests and e-books, track batch attendance and comparative rankings. | Institution Portal (`/institution`), Student Roster, Batch Manager, Institution Reports. | Manage institution's students, batches, and assignments; view institution-level analytics; request licenses. |
| **Super Administrator** | Oversee all platform metrics, manage questions and exams, configure pricing, approve admissions, review audit logs. | Admin Command Center (`/admin`), Assessment Editor, Question Bank, Admissions Manager. | Full read/write access across all tenants, users, financial ledgers, system settings, and feature flags. |
| **Faculty / Evaluator** | Create and review questions, moderate community discussion forums, resolve student academic doubts. | Question Bank, Discussion Hub Moderation, AI Doubt Solver. | Create/edit questions, reply to and moderate discussion topics, view student performance. |
| **School Principal / Director** | Evaluate institutional academic outcomes, monitor batch trends, manage institutional subscription invoices. | Institution Reports Module, Invoices Tab, Batch Analytics. | High-level reporting, subscription management, student directory viewing. |
| **Prospective Applicant / Parent** | Discover courses, fill admission forms, download prospectuses, purchase test series, verify payment receipts. | Public Website, Admission Portal, Test Series Catalog, Payment Status. | Public access, submit admission application, initiate payments, track application. |

---

## 3. System Architecture & Technology Blueprint

### 3.1 Architectural Topology
The platform is designed with an **API-First, Service-Oriented Architecture** allowing decoupled web frontends and future native mobile applications (iOS/Android) to consume identical REST APIs:

```
                              CLIENT TIER
  ┌───────────────────────┬──────────────────────┬───────────────────────┐
  │  Public / Candidate   │  Institution Portal  │  Super Admin Console  │
  │   React 18 SPA (Vite) │   React 18 SPA (Vite)│   React 18 SPA (Vite) │
  └───────────┬───────────┴──────────┬───────────┴───────────┬───────────┘
              │                      │                       │
              └──────────────────────┼───────────────────────┘
                                     │ HTTPS / REST / JSON
                                     ▼
                          APPLICATION SERVER TIER
                    Node.js 18+ / Express Engine
  ┌──────────────────────────────────────────────────────────────────────┐
  │ Middleware: Helmet, Strict CORS, Rate Limiting, JWT Auth, Zod Schema │
  ├──────────────────────────────────────────────────────────────────────┤
  │ Routers:                                                             │
  │ • /api/auth               • /api/attempts          • /api/institution│
  │ • /api/assessments        • /api/test-series       • /api/payments   │
  │ • /api/student            • /api/question-bank     • /api/admission  │
  │ • /api/ai-test            • /api/institution-report• /api/cms        │
  └──────────────────────────────┬───────────────────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
  DATABASE TIER            EXTERNAL APIS            STORAGE / AI
  PostgreSQL 15+         • Razorpay (Checkout/API)• Gemini 3.8 Flash Vision
  (Connection Pool       • PhonePe (PG SDK)       • Sharp / Canvas Engine
   Normalized Schema     • SMTP Mailer (Nodemailer• Local & S3 Storage
   Migrations v1-v56)    • Firebase (Cloud Alerts)• KaTeX / MathJax TeX
```

### 3.2 Key Technical Specifications
* **Frontend:** React 18, Vite 5, Tailwind CSS, Lucide Icons, KaTeX Math rendering, HTML5 Fullscreen API, Web Storage API with sync reconciliation.
* **Backend:** Node.js (ES Modules), Express 4, `pg` connection pool with parameterized queries, Zod validation, `bcrypt` (salt rounds 10), JWT tokens.
* **AI & Document Processing:** Google Gemini 3.8 Flash via `@google/genai`, PDF.js (`pdfjs-dist/legacy`), Node Canvas (`@napi-rs/canvas`), `sharp` image processing.
* **Payment Processing:** Dual integration supporting Razorpay webhook verification and PhonePe V2 Standard Checkout with an automated cron reconciliation job.

---

## 4. Module 1: Public Marketing, Discovery & Admissions Engine

### 4.1 Marketing Pages & Catalog
* **Dynamic Landing Page (`/`):** Hero showcase with animated statistics, featured test series highlights, top rankers/toppers ticker, testimonial carousel, trust indicators, and quick-action navigation.
* **Test Series Marketplace (`/test-series`, `/test-series/:slug`):**
  * Search, category filtering (JEE, NEET, Foundation), and academic target year tags (1-Year, 2-Year series).
  * Comprehensive detail page including full syllabus schedule breakdown, feature list, validity duration in days, pricing, brochure PDF download, and instant enrollment checkout CTA.
* **Diagnostic Free Mock Portal (`/free-mock`):** Frictionless entry point enabling unregistered and newly registered students to attempt an authentic diagnostic test without upfront payment.
* **Institutional B2B Showcase (`/for-schools`, `/for-institutions`):** Dedicated B2B portal articulating institutional advantages, licensing tiers, live demo request form with backend enquiry storage, and follow-up CRM notes.
* **CMS & Content Engine (`/blog`, `/blog/:slug`, `/faqs`, `/about`, `/contact`, `/careers`):** Database-driven blog management, dynamic FAQ accordions, contact inquiry routing, and career listings.
* **Legal & Regulatory Compliance Suite:** Dedicated legal pages for Terms & Conditions, Privacy Policy, Refund & Cancellation Policy, Cookies, Disclaimer, Copyright, Data Protection, and Digital Delivery Policy.

### 4.2 Dynamic Admission Engine (`/admission`, `/admission/confirmation`)
* **Dynamic Form Architecture:** Dynamic JSON schema form rendered on the frontend and fully configurable from the Super Admin portal without code deployments.
* **Supported Field Types:** Text, Email, Phone with validation, Date of Birth, Select Dropdowns, Radio groups, Checkboxes, File Uploads, and live **Camera Snapshot** for instant applicant webcam photographs.
* **Application Lifecycle:**
  1. Applicant submits dynamic form.
  2. System generates unique, immutable Application Number (e.g., `EDV-2026-XXXX`).
  3. Real-time applicant confirmation screen displaying personal details, target stream, academic year, and timestamp.
  4. Printable **Admission Application Card** formatted with applicant photograph, barcodes, institutional seal, and candidate instructions.
  5. Status workflow tracked from `pending` -> `under_review` -> `approved` -> `rejected`.

---

## 5. Module 2: Candidate / Student Learning & CBT Portal

### 5.1 Student Dashboard (`/dashboard`)
* **Executive Summary:** Live metrics displaying Total Tests Attempted, Average Score Percentage, Overall Accuracy %, and All India Rank position.
* **Quick Resume Banner:** Detects active or incomplete in-progress tests and provides instant 1-click continuation.
* **Enrolled Series Carousel:** Interactive view of purchased packages, expiration countdowns, and completion progress bars.
* **Upcoming Exam Feed:** Chronological schedule of scheduled live tests synchronized with institutional test series.

### 5.2 AIETS Exam Calendar (`/aiets-calendar`)
* Comprehensive All India Exam Test Series interactive calendar.
* Monthly and list views displaying test release dates, registration windows, and countdown timers.
* Target filter by exam stream (JEE Main, JEE Advanced, NEET-UG).

### 5.3 Student Mistake Book (`/my-mistake-book`)
* **Automatic Error Aggregation:** Real-time ingestion of incorrect and unattempted questions from submitted test attempts.
* **Categorized Error Taxonomy:** Students tag errors into specific root causes:
  * *Conceptual Error* (gap in fundamental theory)
  * *Silly / Calculation Mistake* (mathematical error or rushed step)
  * *Time Pressure* (ran out of time / unattempted)
  * *Question Misread* (misinterpreted conditions)
* **Status Tracking:** Items toggle between `Active` and `Resolved` once mastered.
* **Dynamic Mistake Test Recreation:** 1-click test generation engine allowing students to select specific mistake questions and launch a customized real-time re-test to verify conceptual mastery.

### 5.4 Digital Study Library (`/my-ebooks`)
* Access to digital formula sheets, chapter revision notes, and reference books assigned individually or via institutional packages.
* In-app secure PDF viewer preventing unauthorized direct downloads.

### 5.5 AI Doubt Solver & Discussion Hub (`/discussion-hub`)
* **AI Doubt Solver:** Instant step-by-step resolution of complex scientific problems with LaTeX math explanation.
* **Peer & Faculty Forum:** Student community where learners post question queries, share solution techniques, and receive verified answers from faculty and peers.

### 5.6 All India Leaderboards & Digital Certificates (`/leaderboard`, `/certificates/:attemptId`)
* **Dynamic Leaderboards:** Real-time rank tables with AIR, percentile, score, and completion time. Filterable by All India, Institute, and Batch levels.
* **Topper Comparison Feature:** Detailed side-by-side metric comparison between candidate and AIR Rank 1 across every test.
* **Digital Certificate Generation:** Instant verifiable PDF certificate generated for candidates meeting passing score criteria, featuring unique verification IDs and institutional signatures.

---

## 6. Module 3: Computer-Based Testing (CBT) Assessment Engine

### 6.1 NTA CBT Exam Interface (`/exam/:attemptId`)
The exam interface replicates the National Testing Agency (NTA) Computer-Based Test console:
* **Strict Fullscreen Lockdown:** Enforced upon start; exiting immediately blocks the interface with an overlay requiring re-entry.
* **Candidate Information Header:** Displays candidate name, roll number, test title, section indicator, and remaining countdown timer.
* **NTA Question Palette States:**
  1. *Silver Gray:* Not Visited
  2. *Crimson Red:* Not Answered
  3. *Forest Green:* Answered
  4. *Deep Violet:* Marked for Review
  5. *Violet with Green Dot:* Answered & Marked for Review (counted in final evaluation)
* **Section Tab Bar:** Multi-subject tabs (Physics, Chemistry, Mathematics / Biology) with instant switching and section-level attempt counters.
* **Optional Section Question Rules:** Enforces competitive exam formats (e.g., NEET / JEE Section B: attempt any 10 out of 15 questions; locks remaining questions once 10 are selected).

### 6.2 Question Types & Mathematical Rendering
* **Single Choice (SCQ):** Standard 4-option radio choice with positive marks and negative penalty.
* **Multiple Choice (MSQ):** Multi-select checkboxes with configurable partial or all-or-nothing marking.
* **Numerical / Integer Value:** On-screen virtual keypad input supporting single integers or floating-point answers within tolerance ranges.
* **Bilingual Switcher:** Instant top-bar language toggle switching between English and Hindi translations without reloading the session.
* **Mathematical Notation:** Full rendering of complex LaTeX mathematical symbols, Greek letters, matrices, and chemical formulas using KaTeX / MathJax.
* **Built-in Virtual Scientific Calculator:** Modal scientific calculator accessible for advanced engineering exams.

### 6.3 State Reliability & Auto-Recovery
* **Real-Time Autosave:** Every selection executes an upsert to the database (`PUT /api/attempts/:id/answer`), preventing data loss.
* **Heartbeat & Resumption:** Reloading or reconnecting restores exact answered states, palette color codes, and calculates elapsed time based on the server-authoritative `ends_at` timestamp.
* **Server-Authoritative Auto-Submit:** When remaining time reaches zero, the client locks input and submits. The backend automatically marks attempts expired if submission is delayed.

---

## 7. Module 4: Anti-Cheat & Security Proctoring Engine

### 7.1 Client-Side Violation Detection
* **Fullscreen Exit Detection:** Triggers whenever the browser exits fullscreen mode.
* **Tab Switch & Visibility Change:** Logs an immediate violation when the document visibility state changes or window loses focus (`window.blur`).
* **Shortcut & Clipboard Lockdown:** Disables `Ctrl+C`, `Ctrl+V`, `Ctrl+X`, `PrintScreen`, right-click context menus, and Developer Tools shortcuts (`F12`, `Ctrl+Shift+I`).

### 7.2 Violation Logging & Auto-Disqualification
* Every detected incident triggers an immediate background call to `POST /api/attempts/:id/violation` recording violation type, timestamp, and metadata.
* **Configurable Warning Limit:** Per-assessment threshold (e.g., maximum 3 warnings).
* **Forced Auto-Submission:** Upon exceeding the threshold, the exam engine automatically locks all inputs, submits the paper, records `status = 'auto_submitted_violation'`, and flags the attempt for admin review.

---

## 8. Module 5: Multi-Tenant Institution / Coaching Center Portal (B2B SaaS)

### 8.1 Multi-Tenant Tenant Management (`/institution`)
* **Dedicated Authentication:** Secure portal login (`/institution-login`) using institution credentials with isolated tenant context.
* **Institution Profile & Branding:** Custom institute logo, branch details, primary contact, and institutional license quota overview.

### 8.2 Batch & Student Lifecycle Management
* **Classroom / Batch Organization:** Create, edit, and archive batches (e.g., "Class 12 JEE Elite 2026", "NEET Repeater Batch A").
* **Student Onboarding:**
  * Single student manual addition with automatic enrollment code generation.
  * **Bulk CSV Import:** Downloadable CSV template, batch upload parsing, automatic credential generation, and welcome email dispatch.
  * Student management actions: Block/Unblock, move across batches, reset credentials, and delete.

### 8.3 Package & Test Series Assignments
* **Package Licensing:** Access to test series governed by institutional package allocations.
* **Targeted Assignment:** Institutional administrators assign specific test series or standalone mock exams to entire batches or selected students with custom start/end access windows.

### 8.4 Institutional E-Book Distribution
* Institutional library management: create institutional study guides or assign platform e-books directly to specific batches.

### 8.5 Institutional Analytics & Reporting (`InstitutionReportsModule.jsx`)
* **Overall Performance Tab:** Institute-wide average score, completion rate, accuracy breakdown, and student participation percentage.
* **Rankings Tab:** Unified institutional leaderboard ranking all students across all branches and batches.
* **Batch Comparison Tab:** Side-by-side comparative analytics of batches (Batch A vs Batch B average score, accuracy, completion speed).
* **Trends & Growth Analytics:** Longitudinal graphs tracking cohort score improvements across successive tests.
* **Attendance & Completion Module:** Real-time visibility into which students completed, started, or missed scheduled tests.
* **Export Engine:** 1-click comprehensive CSV reports for batch performance and administrative record-keeping.

### 8.6 Billing & Communication
* **Invoice History:** View all B2B subscription invoices and payment statuses.
* **License Top-Ups:** Direct in-portal request form to order additional student seat licenses.
* **Automated Student Reminders:** 1-click notification trigger sending email/in-app test reminders to students with pending or upcoming exams.

---

## 9. Module 6: Super Admin Command Center

### 9.1 Executive Dashboard (`/admin`)
* Real-time metrics: Total Registered Candidates, Total Published Assessments, Cumulative Test Attempts, Total Revenue, Active Institutions.
* Revenue breakdown graphs, attempt activity trends, and recent transaction feeds.

### 9.2 Assessment Lifecycle Builder (`/admin/assessments`, `/admin/assessments/:id`)
* **Assessment Management:** Full CRUD operations across tests with status transitions (`draft` -> `scheduled` -> `live` -> `archived`).
* **Multi-Section Builder:** Add sections (Physics, Chemistry, Maths), specify optional questions rules, time limits, and positive/negative marking schemes.
* **Advanced Settings:** Proctoring violation limits, result visibility settings (Immediate, Manual Release, Scheduled), passing marks, and certificate eligibility.

### 9.3 Test Series Marketplace Bundler (`/admin/test-series`)
* Create comprehensive test series packages with titles, slugs, thumbnails, brochures, target stream, and target classes (1-Year, 2-Year).
* Pricing engine: Base price, discounted price, and validity duration in days.
* Link/unlink individual assessments in defined sequence.
* Direct audience assignment: assign test series to individual students, entire batches, or partner institutions with revocation controls.

### 9.4 Dynamic Admission Manager (`/admin/admissions`)
* **Schema Builder Tab:** Visual drag-and-drop form editor to add, edit, reorder, and configure admission form sections and input fields.
* **Submissions Tab:** Comprehensive table of received applications with instant search, filter by academic year, status toggles (`Under Review`, `Approved`, `Rejected`), and printable admission slips.

### 9.5 Discussion Hub Moderation (`/admin/discussion-hub`)
* Centralized forum oversight: pin vital announcements, lock abusive threads, delete offensive replies, and monitor discussion velocity.

### 9.6 Coupons & Promotions Engine (`/admin/coupons`)
* Configure discount promo codes (Percentage Discount or Flat Amount).
* Set minimum order value, maximum discount cap, validity expiry dates, and total usage limits.

### 9.7 Multi-School B2B Management (`/admin/schools`, `/admin/schools/:id`)
* Super-admin directory of all registered partner institutions.
* Configure institution license quotas, assign packages, generate B2B invoices, and monitor school-level performance.

---

## 10. Module 7: AI Vision Paper Extractor & Question Bank System

### 10.1 Gemini Vision Automated Paper Extraction Pipeline (`geminiVisionExtractor.js`)
* **Enterprise Ingestion Workflow:** Solves manual data entry by extracting complete competitive exam papers directly from scanned PDFs and question paper images.
* **Page Rasterization:** High-resolution multi-page rendering using `pdfjs-dist/legacy` and `@napi-rs/canvas` at 2.0x scale.
* **Gemini 3.8 Flash Multimodal Analysis:**
  * Extracts question body, option choices, sub-questions, and official answer keys.
  * Formats all scientific mathematical formulas into standard LaTeX (`$...$` and `$$...$$`).
  * Automatically detects diagrams, circuit charts, and geometric figures.
* **Automated Diagram Cropping:** Detects bounding boxes for figures and uses `sharp` to automatically crop, optimize, and save diagrams to `/uploads/diagrams`, embedding clean image URLs into the question markdown.
* **Numeric Answer Normalization:** Robust parsing for integer and numerical questions, preserving decimal ranges and multiple accepted answers (e.g., "107 or 108").

### 10.2 Question Bank Taxonomy & Hierarchy (`/admin/question-bank`, `/admin/subjects`)
* **Normalized Academic Hierarchy:** Exam Stream -> Subject -> Chapter -> Topic.
* **Metadata & Tagging:** Difficulty level (Easy, Medium, Hard), question type (SCQ, MSQ, Numeric), ideal solution text, and step-by-step explanations.
* **Bulk Import Engine:**
  * Gemini Vision PDF extractor
  * Excel / XLSX bulk import with schema validation
  * Standard CSV import and export

---

## 11. Module 8: Evaluation, Scoring & Longitudinal Analytics Engine

### 11.1 Real-Time Scoring Algorithm
Upon exam completion, the backend evaluation engine executes:
$$\text{Score} = \sum (\text{Correct} \times M_{\text{pos}}) - \sum (\text{Incorrect} \times M_{\text{neg}})$$
* **Percentile Calculation:** Authoritative percentile within cohort:
  $$\text{Percentile} = \left(\frac{\text{Number of candidates scored below candidate}}{\text{Total candidates in cohort}}\right) \times 100$$
* **NEET / JEE Rank Prediction Engine:** Calibrated prediction model calculating estimated All India Rank based on historical score percentiles.

### 11.2 Post-Test Analytics (`/analytics/test/:testId`)
* **Executive Score Card:** Total Marks, Percentage, Accuracy %, All India Rank, and Percentile.
* **Subject & Topic Breakdown:** Detailed score, accuracy, and negative-mark distribution across individual subjects and chapters.
* **Time Management Curve:** Time spent per question versus average cohort time, identifying conceptual bottlenecks and rushed errors.
* **Question-by-Question Audit:** Full interactive grid showing Student Answer vs Correct Answer with step-by-step LaTeX solutions.
* **Compare with Topper:** Detailed visual benchmark against AIR Rank 1 across accuracy, speed, and negative mark avoidance.
* **AI Mentor Report & 50-Question Booster:**
  * Automated diagnostic insights highlighting exact weak conceptual areas.
  * 1-click **Generate AI Practice Test** button creating a customized 50-question remedial test focused exclusively on identified weak topics.

---

## 12. Module 9: Financial Operations, Dual-Gateway & Offline Ledger

### 12.1 Online Payment Processing (`/api/payments`)
* **Razorpay Gateway:** Automated order creation (`createOrder`), checkout modal popup, and cryptographic HMAC-SHA256 signature verification.
* **PhonePe Gateway:** Direct API integration with PhonePe PG SDK supporting UPI, QR, net banking, and cards.
* **Automated Reconciliation Cron (`reconcilePayments.js`):** Scheduled background task periodically checking pending payment states with gateway APIs, auto-confirming orders that succeeded during network dropouts.

### 12.2 Manual & Offline Installment Ledger (`/admin/payments`)
* Record offline fees collected via Cash, Direct UPI, or Bank Transfer.
* **Multi-Installment Tracking:** Manage fee payment plans (e.g., Installment 1 of 3), record installment dates, and issue installment receipts.
* **Audit Trail & Corrections:** Track administrative fee adjustments, refunds, and cancellations with detailed operational logs.

---

## 13. Module 10: Communications, Notifications & Content Engine

### 13.1 Transactional Email Service
* Built on SMTP with HTML responsive email templates:
  * *Registration & Welcome Email* with login credentials.
  * *Test Completion & Score Card Email* (detailed score, percentile, AIR rank, and violation summary).
  * *Payment Receipt & Invoice Confirmation*.
  * *Password Reset with Secure Token Verification*.

### 13.2 Real-Time Notifications
* In-app notification center for candidates and institutions.
* System broadcast engine allowing Super Admin to dispatch urgent alerts across all active student dashboards.

---

## 14. Consolidated Database Architecture (Migrations v1–v56)

The relational schema is implemented in PostgreSQL with 56 migrations:

```
┌──────────────────┐       ┌──────────────────────┐       ┌──────────────────┐
│   institutions   │1     *│       batches        │1     *│    candidates    │
│  (Multi-Tenant)  ├───────┤   (Classrooms)       ├───────┤ (Student Roster) │
└────────┬─────────┘       └──────────┬───────────┘       └────────┬─────────┘
         │1                           │1                           │1
         │*                           │*                           │*
┌────────┴─────────┐       ┌──────────┴───────────┐       ┌────────┴─────────┐
│institution_pkgs  │       │ test_assignments     │       │     attempts     │
│  & invoices      │       │ (Batch-level tests)  │       │  (Exam Sessions) │
└──────────────────┘       └──────────────────────┘       └────────┬─────────┘
                                                                   │1
┌──────────────────┐       ┌──────────────────────┐                │*
│   test_series    │1     *│     assessments      │1      *   ┌────┴─────────┐
│ (Market Packages)├───────┤   (CBT Exam Papers)  ├───────────┤   answers    │
└────────┬─────────┘       └──────────┬───────────┘           │  (Responses) │
         │1                           │1                      └──────────────┘
         │*                           │*
┌────────┴─────────┐       ┌──────────┴───────────┐
│test_series_items │       │  sections/questions  │
│(Included Tests)  │       │  (LaTeX / Options)   │
└──────────────────┘       └──────────────────────┘
```

### Key Data Entities
1. **`users` & `candidates`:** Authentication identities, roles (`admin`, `candidate`, `institution_admin`), profile metadata, academic targets.
2. **`institutions` & `batches`:** Multi-tenant tenant accounts, licensing limits, branch details, batch-to-student memberships.
3. **`assessments`, `sections`, `questions`, `question_options`:** Test paper configuration, sections, questions with LaTeX strings, correct options, numeric tolerances, diagrams, and bilingual translations.
4. **`attempts`, `answers`, `violations`:** Candidate test sessions, start/end timestamps, individual question responses, review flags, violation audit trail.
5. **`test_series`, `test_series_enrollments`, `test_series_assignments`:** Marketplace packages, student purchases, batch-level assignments.
6. **`payments`, `payment_installments`:** Online gateway transactions, manual cash/UPI installments, refund states.
7. **`mistake_book`:** Aggregated candidate mistakes, error classifications, resolution flags.
8. **`admission_forms`, `admission_submissions`:** Dynamic JSON schema form definitions and applicant submissions.

---

## 15. Non-Functional Requirements & Compliance

### 15.1 Performance & Scalability
* **CBT Concurrency:** Architecture benchmarked to sustain 1,000+ simultaneous test takers per cluster with sub-100ms response time on question autosave.
* **Authoritative Timekeeping:** All countdown timers calculated against immutable database timestamps (`ends_at`), eliminating client clock tampering.
* **Lightweight Payloads:** Skeletons and lazy-loaded routes reduce initial bundle load time below 1.5 seconds.

### 15.2 Security & Integrity
* **Stateless Authentication:** Secure JWT tokens with role-based authorization guards on every endpoint.
* **SQL Injection Prevention:** 100% parameterized queries via PostgreSQL driver.
* **Input Sanitization:** Strict Zod schema validation on every write endpoint.
* **Transport Security & Rate Limiting:** HTTPS enforcement, Helmet security headers, CORS origin lockdown, and rate limiters on authentication and payment routes.

---

## 16. Future Product Roadmap

* **Phase 2 (Mobile Apps):** Native iOS and Android applications utilizing the identical REST API endpoints.
* **Phase 3 (AI Proctoring):** On-device WebRTC webcam face verification, gaze estimation, and multiple-person detection.
* **Phase 4 (Live Classroom Integration):** Interactive live video lectures, attendance sync, and teacher screen-sharing.
* **Phase 5 (Parent Portal):** Dedicated mobile app for parents with real-time score alerts, attendance notifications, and fee payment reminders.

---
*End of Complete Product Requirements Document (PRD)*
