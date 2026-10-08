# EDVEDUM ACADEMY & AssessPro CBT Platform
# Client User Acceptance Testing (UAT) Guide & Test Scenarios

**Document Version:** 2.0 (Client Release)  
**Target Audience:** Client Project Leads, QA / Testing Team, Academic Directors  
**Platform Status:** Live Staging & Production Ready  
**Scope:** Complete End-to-End Testing of all Platform Modules, User Journeys, AI Features, and Admin Workflows  

---

## 1. Quick Access & Test Credentials

### 1.1 Environment URLs
| Environment | Access Link | Purpose |
|---|---|---|
| **Live Production Frontend** | [https://test-platform-umber-kappa.vercel.app](https://test-platform-umber-kappa.vercel.app) | Primary Testing Web Portal |
| **Live Production API** | [https://test-platform-cr9j.onrender.com/api](https://test-platform-cr9j.onrender.com/api) | Backend API Endpoint |
| **Local Environment (if running locally)** | `http://localhost:5173` | Local Development Test Instance |

---

### 1.2 Pre-Configured Test Accounts

| Role | Login URL | Email / Username | Password | Purpose |
|---|---|---|---|---|
| **Super Administrator** | `/admin-login` | `admin@assess.io` | `Admin@12345` | Complete control over questions, tests, admissions, payments, and settings. |
| **Candidate / Student** | `/student-login` | `candidate@assess.io` | `Candidate@123` | Taking tests, viewing results, analytics, Mistake Book, AI tests. |
| **Candidate 2 (Alternate)** | `/student-login` | `isha@gmail.com` | `Candidate@123` | Comparing multi-student leaderboards & peer analytics. |
| **Institution Admin (B2B)** | `/institution-login` | `instadmin@edvedum.ac.in` | `password123` | Managing school batches, student roster, assignments & reports. |

> **Note:** Candidates can also self-register at any time using the public sign-up page (`/signup`).

---

## 2. Guided Testing Scenarios (Step-by-Step)

---

### Scenario A: Candidate Experience & NTA Computer-Based Testing (CBT)

#### Step 1: Login & Dashboard Overview
1. Navigate to `/student-login`.
2. Login with `candidate@assess.io` / `Candidate@123`.
3. Verify the **Student Dashboard** displays:
   - Overall metrics: Tests attempted, average score %, overall accuracy, current rank.
   - Enrolled test series cards.
   - Quick "Resume Test" banner (if any test was left in progress).
   - Upcoming live test countdowns.

#### Step 2: Browse Catalog & Start a Free Diagnostic Mock
1. Go to **Test Series** (`/test-series`) or **Free Mock** (`/free-mock`).
2. Select **"Free Diagnostic Mock"** or **"JEE Main Diagnostic Test"**.
3. Click **"Enroll / Start Test"**.
4. Read the **Assessment Instructions Screen**:
   - Verify instructions display test duration, section breakdown, marking rules (+4, −1), and proctoring rules.
   - Check the declaration checkbox and click **"Proceed to Test"**.

#### Step 3: Experiencing the NTA Exam Engine (`/exam/:attemptId`)
1. **Fullscreen Enforcement:**
   - Confirm the test automatically enters fullscreen mode.
   - Try pressing `Esc` to exit fullscreen: A blocking modal must appear immediately warning you and requiring you to click "Re-enter Fullscreen" to resume.
2. **Palette States & Color Codes:**
   - Verify the 5 standard NTA palette states:
     - *Gray:* Not Visited
     - *Red:* Not Answered
     - *Green:* Answered
     - *Purple:* Marked for Review
     - *Purple with Green Dot:* Answered & Marked for Review
3. **Question Types:**
   - **Single Choice (SCQ):** Select an option and verify the palette turns green. Click "Clear Response" to deselect.
   - **Numerical / Integer:** Use the on-screen keypad to enter an integer or decimal answer.
   - **Mathematical Formulas:** Confirm complex LaTeX equations and diagrams render clearly.
4. **Bilingual Language Switcher:**
   - Click the language toggle (English / Hindi) in the top navigation bar.
   - Confirm the question text switches instantly without refreshing the exam timer.
5. **Virtual Scientific Calculator:**
   - Click the Calculator icon in the top header. Confirm the modal calculator opens and allows mathematical calculations.
6. **Autosave & Network Resilience:**
   - Select an answer, then refresh the browser (`F5` or Reload).
   - Confirm that upon reloading, your previously saved answers and exact elapsed time are preserved.

#### Step 4: Anti-Cheat Violation Testing
1. While the test is active, switch to another browser tab or minimize the window.
2. Return to the test tab:
   - Verify a warning toast/banner appears: *"Warning: Tab switch detected (Violation 1 of 3)"*.
3. Try right-clicking, selecting text, or copying (`Ctrl+C`): Verify right-click and clipboard actions are blocked.
4. Switch tabs 3 times (exceeding the maximum allowed violation limit):
   - Confirm the test **automatically locks and auto-submits** with a notification indicating disqualification due to excessive violations.

#### Step 5: Instant Results & Answer Key Review (`/results/:attemptId`)
1. Submit the test.
2. Confirm the Result Screen displays:
   - Total Score obtained out of maximum marks.
   - Accuracy percentage, total attempted, correct, incorrect, and unattempted counts.
   - Time taken vs allowed time.
   - Complete question-by-question breakdown with official correct answers and detailed step-by-step solutions with LaTeX math.
   - Download Certificate button (if qualifying score is achieved).

#### Step 6: Advanced Post-Test Analytics (`/analytics/test/:testId`)
1. Navigate to **Analytics** -> Select the completed test.
2. Review the following sections:
   - **Subject & Topic Radar:** Accuracy in Physics, Chemistry, Mathematics, Botany, Zoology.
   - **Time Management Curve:** Time spent per question vs class average.
   - **Compare with Topper:** Detailed visual benchmark of your score against AIR Rank 1.
   - **NEET / JEE Predicted Rank:** Estimated All India Rank based on percentiles.
   - **AI Mentor Report:** Personalized narrative identifying conceptual bottlenecks.
   - **Generate 50-Question AI Remedial Test:**
     - Click **"Generate AI Weak-Topic Booster"**.
     - Confirm the platform dynamically generates a customized 50-question practice test focusing exclusively on the topics you missed in this exam!

#### Step 7: Student Mistake Book (`/my-mistake-book`)
1. Navigate to **My Mistake Book** from the sidebar.
2. Verify that questions answered incorrectly or left unattempted appear automatically.
3. Classify mistakes using the category tags: *Conceptual Error*, *Silly Mistake*, *Time Pressure*, or *Misread*.
4. Select 3–5 mistakes using checkboxes and click **"Re-create Test from Mistakes"**:
   - Confirm the system instantly launches a targeted CBT practice session containing only those chosen mistake questions.
5. Mark mastered questions as **"Resolved"** and confirm they move to the resolved archive.

#### Step 8: AIETS Calendar, Library & Community Forum
1. **AIETS Exam Calendar (`/aiets-calendar`):** View scheduled national tests and registration deadlines.
2. **My E-Books (`/my-ebooks`):** Open digital revision formula sheets and study notes in the secure reader.
3. **Discussion Hub (`/discussion-hub`):** Post a doubt topic, add math formulas, and view faculty responses.

---

### Scenario B: Multi-Tenant Institution / Coaching Center Portal (B2B SaaS)

#### Step 1: Institution Login & Overview
1. Navigate to `/institution-login`.
2. Login with `instadmin@edvedum.ac.in` / `password123`.
3. Verify the **Institution Dashboard** loads with:
   - Total enrolled students, active batches, assigned test series, and license quota.
   - Institution branding and branch details.

#### Step 2: Batch Management & Student Roster
1. Navigate to the **Batches Tab**:
   - Click **"Create Batch"**, enter Batch Name (e.g., *"Class 12 JEE Super 30 - 2026"*), target stream, and academic year.
2. Navigate to the **Students Tab**:
   - **Single Add:** Click "Add Student", enter name, email, mobile, and assign to the newly created batch. Confirm enrollment code is generated.
   - **Bulk CSV Upload:**
     - Click **"Download Sample CSV Template"**.
     - Upload the CSV file with student details.
     - Confirm all students are parsed, imported, and assigned credentials automatically.
   - **Student Actions:** Test "Block / Unblock", "Move Batch", and "Regenerate Credentials".

#### Step 3: Test Series & E-Book Assignment
1. Navigate to **Test Series Tab**:
   - View available packages allocated to the institution.
   - Click **"Assign to Batch"**, select the target batch, set start date and expiry date.
   - Log in as one of the batch students and confirm the assigned test appears in their "My Tests" dashboard!
2. Navigate to **E-Books Tab**:
   - Upload an institutional study material PDF or assign platform formula books to the batch.

#### Step 4: Multi-Cohort Reports & Rankings (`InstitutionReportsModule`)
1. Navigate to **Reports Tab**:
   - **Overall Performance:** View institute-wide average score, completion rate, and participation trends.
   - **Rankings:** View unified institutional leaderboard with student roll numbers, batches, scores, and percentile.
   - **Batch Comparison:** Compare *"Batch A"* vs *"Batch B"* across average marks, accuracy, and completion times.
   - **Attendance:** View real-time attendance tracking indicating who completed, initiated, or missed scheduled tests.
   - **Export CSV:** Click **"Export Full Institution Report"** and verify the downloaded CSV file contains complete cohort data.

#### Step 5: Invoices & Student Reminders
1. Navigate to **Payments & Invoices Tab**: Review institutional package invoices.
2. Test **"Send Reminder"**: Click the reminder button to send an automated test reminder email/notification to students who have pending scheduled exams.

---

### Scenario C: Super Admin Command Center (`/admin`)

#### Step 1: Admin Login & Platform KPIs
1. Navigate to `/admin-login`.
2. Login with `admin@assess.io` / `Admin@12345`.
3. Confirm the **Admin Overview** displays:
   - Total Candidates, Total Assessments, Total Attempts, Pass/Fail ratios, and Financial Revenue.
   - Live system status feeds and recent transactions.

#### Step 2: Assessment Management & Stepper Builder
1. Navigate to **Assessments (`/admin/assessments`)**:
   - Click **"Create Assessment"** or edit an existing one.
   - Configure title, duration (minutes), passing marks, and maximum allowed violations (e.g., 3).
   - Set **Result Visibility** (Immediate vs Manual Release).
2. **Sections & Marking Scheme:**
   - Add sections (Physics, Chemistry, Mathematics).
   - Configure positive marks (+4) and negative marks (−1).
   - Set section-level optional question rules (e.g., attempt any 10 of 15).

#### Step 3: Testing the Gemini Vision AI Question Extractor (`geminiVisionExtractor.js`)
1. Navigate to **Question Bank (`/admin/question-bank`)** or **Assessment Questions**.
2. Click **"AI Question Paper Upload (PDF)"**.
3. Upload a sample competitive exam question paper PDF containing mathematical formulas and diagrams:
   - **What to observe in the system:**
     1. Multi-page PDF rasterization (using `@napi-rs/canvas` at 2.0x DPI).
     2. Google Gemini 3.8 Flash multimodal analysis extracting questions, options, and official answer keys.
     3. Mathematical equations converted into clean LaTeX strings (`$...$`).
     4. Automatic diagram detection: Bounding boxes are cropped using `sharp` (with Canvas fallback) and saved directly to `/uploads/diagrams/`.
     5. The questions appear in the review table with diagram images and math previews rendered cleanly!
4. Click **"Import to Question Bank / Assessment"** and confirm questions are saved into the database.

#### Step 4: Dynamic Admission Form Builder & Applications Manager (`/admin/admissions`)
1. Navigate to **Admissions Manager (`/admin/admissions`)**:
2. **Form Builder Tab:**
   - Add a new custom field (e.g., *"Hostel Required"* as Radio `Yes/No`, or *"Preferred Test Center"* as Dropdown).
   - Drag to reorder sections.
   - Enable the **"Camera Snapshot (Webcam)"** field.
   - Click **"Save Form Configuration"**.
3. **Test Public Submission:**
   - Open `/admission` in an incognito window: Confirm the newly added fields and webcam capture appear immediately!
   - Fill and submit the form with a webcam photo.
   - Confirm the confirmation page generates a unique Application Number (e.g., `EDV-2026-XXXX`) and printable application slip with barcode.
4. **Submissions Review Tab:**
   - Return to Admin Admissions: Find the submitted application.
   - Change status to **"Approved"** or **"Under Review"**.
   - Click **"Print / Download Admission Slip"** to preview the candidate slip.

#### Step 5: Test Series Marketplace & Audience Assignments (`/admin/test-series`)
1. Create or edit a Test Series package:
   - Set Title, Slug, Exam Type (JEE, NEET, Foundation), Price, and Validity (days).
   - Upload a Brochure PDF.
   - Link assessments in sequence.
2. **Audience Assignment:**
   - Use the **"Assign Series"** modal to assign the series directly to an individual candidate, a specific batch, or an entire institution.
   - Test enrollment revocation to remove access if needed.

#### Step 6: Financial Operations & Manual Offline Installment Ledger (`/admin/payments`)
1. Navigate to **Payments (`/admin/payments`)**:
2. **Online Payment Tracking:**
   - View transactions processed via Razorpay and PhonePe.
   - Click **"Reconcile Payments"** to test the background reconciliation job that recovers dropped webhook payments.
3. **Manual / Offline Payment & Installment Recording:**
   - Click **"Record Manual Payment"**.
   - Select Candidate, Test Series, Total Fee, and Payment Mode (*Cash*, *Direct UPI*, or *Bank Transfer*).
   - Configure an **Installment Plan** (e.g., ₹5,000 Total: Installment 1 = ₹2,500 Paid today, Installment 2 = ₹2,500 Due next month).
   - Save and verify the ledger records partial payment status (`partially_paid`).
   - Add Installment 2 when received and verify status updates to `fully_paid`.
   - Test payment correction / audit log entries.

#### Step 7: Coupons, Promotions & B2B School Management
1. **Coupons (`/admin/coupons`):** Create promo code `TESTER20` (20% off). Test applying it during candidate checkout on `/test-series/:slug`.
2. **Offers & Achievements (`/admin/offers-achievements`):** Update promotional banners and top rankers showcase.
3. **Schools / B2B Management (`/admin/schools`):** View partner schools, edit license quotas, generate B2B subscription invoices, and view school enquiry leads.

---

## 3. Client UAT Acceptance Checklist

Use this checklist table during testing to record results and sign off on key milestones:

| # | Module / Feature | Test Action | Expected Result | Status (Pass/Fail) | Notes |
|---|---|---|---|---|---|
| **1** | **Authentication** | Login as Student, Admin, and Institution Admin | Successful authentication, proper portal redirection, JWT persistence | `[  ]` | |
| **2** | **CBT Fullscreen** | Launch test and press `Esc` | Immediate blocking screen forcing re-entry to fullscreen | `[  ]` | |
| **3** | **Anti-Cheat Tabs** | Switch tabs 3 times during active test | Violation warnings logged; test auto-submits on 3rd violation | `[  ]` | |
| **4** | **Autosave & Resume** | Answer questions, reload page (`F5`) | All chosen answers and remaining timer state restored | `[  ]` | |
| **5** | **Bilingual Toggle** | Click Hindi / English toggle in exam | Instant question translation switch without timer reload | `[  ]` | |
| **6** | **LaTeX & Formulas** | View Physics/Maths equations & diagrams | Formulas render with KaTeX; diagrams crisp and centered | `[  ]` | |
| **7** | **Scoring & Evaluation** | Submit test | Instant marks calculation (+4, −1), accuracy %, rank computed | `[  ]` | |
| **8** | **Post-Test Analytics** | Open Post-Test report | Radar charts, time curve, Topper vs Candidate benchmark visible | `[  ]` | |
| **9** | **AI 50-Q Booster** | Click "Generate AI Test" from analytics | 50-question practice test created targeting weak topics | `[  ]` | |
| **10**| **Mistake Book** | Tag mistakes and click "Re-create Test" | Targeted CBT test generated from selected mistakes only | `[  ]` | |
| **11**| **Institution Portal** | Create batch & upload student CSV | Batch created; students imported and credentials generated | `[  ]` | |
| **12**| **Institution Reports**| View batch comparison & export CSV | Cohort performance visualized; CSV download completes | `[  ]` | |
| **13**| **Gemini Vision Extractor** | Upload question paper PDF in Admin | Automatic page render, Gemini OCR, LaTeX and diagram crop | `[  ]` | |
| **14**| **Dynamic Admissions**| Submit form with webcam photo | Unique Application No generated; printable slip with barcode | `[  ]` | |
| **15**| **Payment Ledger** | Record manual cash installment in Admin | Partial payment recorded; status updates to fully paid on completion | `[  ]` | |
| **16**| **Coupon Discount** | Apply coupon `TESTER20` on checkout | Total price discounted accurately before payment | `[  ]` | |

---

## 4. Sample Test Data & Guidelines

### 4.1 Sample Student Bulk Import CSV Template
Save the following as `sample_students.csv` when testing institutional bulk uploads:
```csv
name,email,mobile,roll_number,stream,class_target
Rahul Verma,rahul.v@testschool.edu,9876500001,2026-JEE-01,JEE,12th
Priya Nair,priya.n@testschool.edu,9876500002,2026-NEET-02,NEET,12th
Aman Singh,aman.s@testschool.edu,9876500003,2026-JEE-03,JEE,Repeater
Sneha Patel,sneha.p@testschool.edu,9876500004,2026-NEET-04,NEET,11th
```

### 4.2 Guidelines for Gemini Vision PDF Question Paper Testing
For best extraction results:
* Upload standard clean PDFs (e.g. JEE Main / NEET past year question papers).
* The extractor automatically handles:
  * Multi-column layouts
  * Inline and display LaTeX formulas
  * Geometric figures, circuit diagrams, and graphs (automatically cropped and stored)
  * Questions with integer or decimal answers

---

## 5. Feedback & Issue Reporting Template

If your testing team encounters any edge cases or unexpected behaviors, please log them using this format:

```markdown
### Bug / Feedback Report
- **Issue Title:** [Brief 1-line description]
- **Module / URL:** [e.g. /exam/:id, /admin/admissions, /institution]
- **User Role Tested:** [Candidate / Institution Admin / Super Admin]
- **Device & Browser:** [e.g. Chrome 124 on Windows 11 / Safari on macOS]
- **Steps to Reproduce:**
  1. ...
  2. ...
  3. ...
- **Expected Behavior:** [What should have happened]
- **Actual Behavior:** [What actually happened]
- **Screenshots / Console Errors:** [Attach error message or screenshot if any]
```

---
*End of Client UAT Testing Guide*
