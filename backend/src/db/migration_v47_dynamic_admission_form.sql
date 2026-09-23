-- Migration v47: Dynamic Admission Form Schema and Submissions

CREATE TABLE IF NOT EXISTS admission_form_config (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE DEFAULT 'default',
  title VARCHAR(255) DEFAULT 'EDVEDUM Academy Admission Form',
  academic_year VARCHAR(50) DEFAULT '2026–2027',
  schema_json JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admission_submissions (
  id SERIAL PRIMARY KEY,
  application_no VARCHAR(100) UNIQUE NOT NULL,
  student_name VARCHAR(255),
  father_name VARCHAR(255),
  contact_number VARCHAR(50),
  email VARCHAR(255),
  course_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  form_data JSONB NOT NULL,
  documents JSONB DEFAULT '[]'::jsonb,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admission_submissions_app_no ON admission_submissions(application_no);
CREATE INDEX IF NOT EXISTS idx_admission_submissions_status ON admission_submissions(status);
CREATE INDEX IF NOT EXISTS idx_admission_submissions_created_at ON admission_submissions(created_at DESC);

-- Seed default initial 10-section schema
INSERT INTO admission_form_config (slug, title, academic_year, schema_json, is_active)
VALUES (
  'default',
  'EDVEDUM Academy Admission Form',
  '2026–2027',
  '{
    "sections": [
      {
        "id": "student_details",
        "badge": "01",
        "title": "STUDENT DETAILS",
        "subtitle": "Personal information of the applicant",
        "step": 1,
        "isEnabled": true,
        "fields": [
          { "name": "fullName", "label": "Full Name of Student", "type": "text", "placeholder": "Enter student full name", "required": true, "colSpan": 2, "isEnabled": true },
          { "name": "dob", "label": "Date of Birth", "type": "date", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "studentMobile", "label": "Student Mobile Number", "type": "tel", "placeholder": "10-digit mobile number", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "whatsappNumber", "label": "WhatsApp Number", "type": "tel", "placeholder": "WhatsApp number", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "email", "label": "Email Address", "type": "email", "placeholder": "student@email.com", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "gender", "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"], "required": true, "colSpan": 1, "isEnabled": true }
        ]
      },
      {
        "id": "parent_details",
        "badge": "02",
        "title": "PARENT / GUARDIAN DETAILS",
        "subtitle": "Primary contact details of parent or guardian",
        "step": 1,
        "isEnabled": true,
        "fields": [
          { "name": "parentName", "label": "Parent / Guardian Name", "type": "text", "placeholder": "Enter parent or guardian full name", "required": true, "colSpan": 2, "isEnabled": true },
          { "name": "relationship", "label": "Relationship with Student", "type": "select", "options": ["Father", "Mother", "Guardian"], "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "parentMobile", "label": "Parent Mobile Number", "type": "tel", "placeholder": "10-digit primary mobile number", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "parentEmail", "label": "Parent Email Address", "type": "email", "placeholder": "parent@email.com", "required": false, "colSpan": 2, "isEnabled": true }
        ]
      },
      {
        "id": "academic_profile",
        "badge": "03",
        "title": "ACADEMIC PROFILE",
        "subtitle": "Current educational standing and goals",
        "step": 1,
        "isEnabled": true,
        "fields": [
          { "name": "currentClass", "label": "Current Class / Standard", "type": "select", "options": ["Class 9", "Class 10", "Class 11", "Class 12", "12th Pass / Dropper"], "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "school", "label": "School / College Name", "type": "text", "placeholder": "Enter current or last attended institution", "required": false, "colSpan": 2, "isEnabled": true },
          { "name": "board", "label": "Education Board", "type": "select", "options": ["CBSE", "ICSE / ISC", "State Board", "Other"], "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "neetAttempt", "label": "Previous Competitive Attempt", "type": "text", "placeholder": "e.g. NEET 2025 / JEE Main 2025 (or Fresh)", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "neetScore", "label": "Previous Score / Rank", "type": "text", "placeholder": "Marks or AIR (if applicable)", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "targetExam", "label": "Target Examination", "type": "select", "options": ["NEET 2026", "NEET 2027", "JEE Main 2026", "JEE Advanced 2026", "Foundation (9th/10th)", "Other"], "required": true, "colSpan": 2, "isEnabled": true }
        ]
      },
      {
        "id": "course_enrollment",
        "badge": "04",
        "title": "COURSE / ENROLLMENT",
        "subtitle": "Selected academic batch and registration details",
        "step": 1,
        "isEnabled": true,
        "fields": [
          { "name": "courseName", "label": "Course / Batch Enrolled For", "type": "select", "options": ["NEET UG 2026–2027 Two-Year Comprehensive Batch", "JEE Main + Advanced 2026 Target Batch", "Class 11 Foundation Batch", "Class 12 Board + Competitive Integrated", "Dropper / Repeater Intensive Crash Course"], "required": true, "colSpan": 2, "isEnabled": true },
          { "name": "admissionDate", "label": "Date of Admission", "type": "date", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "academicSession", "label": "Academic Session", "type": "text", "placeholder": "2026–2027", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "counsellor", "label": "Academic Counsellor / Reference", "type": "text", "placeholder": "Counsellor name or branch ref", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "enrollmentType", "label": "Enrollment Category", "type": "select", "options": ["New", "Renewal / Second Year", "Transfer", "Scholarship"], "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "leadSource", "label": "Source of Awareness", "type": "select", "options": ["Website", "Walk-in / Center", "Social Media", "Newspaper / Banner", "Friend / Referral", "Other"], "required": true, "colSpan": 2, "isEnabled": true }
        ]
      },
      {
        "id": "address",
        "badge": "05",
        "title": "ADDRESS",
        "subtitle": "Communication and residential address",
        "step": 1,
        "isEnabled": true,
        "fields": [
          { "name": "address", "label": "Complete Postal Address", "type": "textarea", "placeholder": "House/Flat No., Street, Locality, Landmark", "required": true, "colSpan": 3, "isEnabled": true },
          { "name": "city", "label": "City / District", "type": "text", "placeholder": "City name", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "state", "label": "State", "type": "text", "placeholder": "State", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "pinCode", "label": "PIN Code", "type": "text", "placeholder": "6-digit postal code", "required": true, "colSpan": 1, "isEnabled": true }
        ]
      },
      {
        "id": "payment_details",
        "badge": "06",
        "title": "PAYMENT DETAILS",
        "subtitle": "Fee structure, transaction IDs and payment status",
        "step": 2,
        "isEnabled": true,
        "fields": [
          { "name": "courseFee", "label": "Total Course Fee (₹)", "type": "number", "placeholder": "e.g. 45000", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "amountPaid", "label": "Amount Paid (₹)", "type": "number", "placeholder": "e.g. 45000", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "paymentMode", "label": "Payment Mode", "type": "select", "options": ["UPI", "Net Banking", "Debit / Credit Card", "Cheque / DD", "Cash"], "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "transactionId", "label": "UTR / Transaction Ref No.", "type": "text", "placeholder": "Transaction reference / receipt number", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "paymentDate", "label": "Payment Date", "type": "date", "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "paymentStatus", "label": "Fee Status", "type": "select", "options": ["Paid", "Partial / Advance", "Pending Verification"], "required": true, "colSpan": 1, "isEnabled": true }
        ]
      },
      {
        "id": "documents",
        "badge": "07",
        "title": "DOCUMENTS",
        "subtitle": "Verification status of submitted certificates and IDs",
        "step": 2,
        "isEnabled": true,
        "fields": [
          { "name": "docPhotoStatus", "label": "Passport Photograph", "type": "select", "options": ["Uploaded", "Submitted Physical", "Pending", "Not Applicable"], "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "docPhotoRemarks", "label": "Photo Remarks", "type": "text", "placeholder": "Remarks if any", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "docIdProofStatus", "label": "Government ID / Aadhaar Proof", "type": "select", "options": ["Uploaded", "Submitted Physical", "Pending", "Not Applicable"], "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "docIdProofRemarks", "label": "ID Proof Remarks", "type": "text", "placeholder": "e.g. Aadhaar Card verified", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "docPaymentProofStatus", "label": "Payment Receipt / Bank Slip", "type": "select", "options": ["Uploaded", "Submitted Physical", "Pending", "Not Applicable"], "required": true, "colSpan": 1, "isEnabled": true },
          { "name": "docPaymentProofRemarks", "label": "Payment Remarks", "type": "text", "placeholder": "e.g. UPI screenshot verified", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "docOtherStatus", "label": "Previous Marksheet / Certificate", "type": "select", "options": ["Uploaded", "Submitted Physical", "Pending", "Not Applicable"], "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "docOtherRemarks", "label": "Marksheet Remarks", "type": "text", "placeholder": "e.g. 10th / 11th Marksheet", "required": false, "colSpan": 1, "isEnabled": true }
        ]
      },
      {
        "id": "communication_preference",
        "badge": "08",
        "title": "COMMUNICATION PREFERENCE",
        "subtitle": "Preferred mode and recipient for alerts and scorecards",
        "step": 2,
        "isEnabled": true,
        "fields": [
          { "name": "updatesThrough", "label": "Receive Notifications & Test Alerts Via", "type": "checkbox", "options": ["Call", "WhatsApp", "Email", "SMS"], "required": true, "colSpan": 2, "isEnabled": true },
          { "name": "preferredRecipient", "label": "Primary Contact Person for Reports", "type": "radio", "options": ["Student", "Parent / Guardian", "Both"], "required": true, "colSpan": 1, "isEnabled": true }
        ]
      },
      {
        "id": "declaration",
        "badge": "09",
        "title": "DECLARATION",
        "subtitle": "Undertaking by the student and parent",
        "step": 2,
        "isEnabled": true,
        "fields": [
          { "name": "agreed", "label": "I hereby declare that all information provided above is true and authentic to the best of my knowledge, and I agree to abide by the academic code of conduct of EDVEDUM Academy.", "type": "checkbox_single", "required": true, "colSpan": 3, "isEnabled": true },
          { "name": "declarationName", "label": "Full Name of Signee (Student / Parent)", "type": "text", "placeholder": "Type full legal name", "required": true, "colSpan": 2, "isEnabled": true },
          { "name": "declarationDate", "label": "Date of Undertaking", "type": "date", "required": true, "colSpan": 1, "isEnabled": true }
        ]
      },
      {
        "id": "office_use_only",
        "badge": "10",
        "title": "FOR EDVEDUM OFFICE USE ONLY",
        "subtitle": "Administrative verification, batch allotment and ERP credentials",
        "step": 2,
        "isEnabled": true,
        "fields": [
          { "name": "officeAdmissionId", "label": "Official Admission No.", "type": "text", "placeholder": "EDV-2026-XXXXX", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "officeCounsellorCode", "label": "Admitting Counsellor Code", "type": "text", "placeholder": "EDV-ADM-01", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "officeBatchCode", "label": "Assigned Batch Code", "type": "text", "placeholder": "NEET-2627-B1", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "officeVerification", "label": "Admission Verification Status", "type": "select", "options": ["Pending", "Verified & Admitted", "On Hold", "Rejected"], "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "officeErpId", "label": "Student ERP / Portal ID", "type": "text", "placeholder": "ERP-XXXXX", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "officeDiscountApprovedBy", "label": "Concession / Scholarship Sanctioned By", "type": "text", "placeholder": "Academic Director", "required": false, "colSpan": 1, "isEnabled": true },
          { "name": "officeRemarks", "label": "Administrative Remarks", "type": "textarea", "placeholder": "Official remarks, special conditions or documentation notes", "required": false, "colSpan": 3, "isEnabled": true }
        ]
      }
    ]
  }'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE
SET updated_at = NOW();
