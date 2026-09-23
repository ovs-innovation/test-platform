import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const DEFAULT_ADMISSION_SCHEMA = {
  sections: [
    {
      id: 'student_details',
      badge: '01',
      title: 'STUDENT DETAILS',
      subtitle: 'Personal information of the applicant',
      step: 1,
      isEnabled: true,
      fields: [
        { name: 'fullName', label: 'Full Name of Student', type: 'text', placeholder: 'Enter student full name', required: true, colSpan: 2, isEnabled: true },
        { name: 'dob', label: 'Date of Birth', type: 'date', required: true, colSpan: 1, isEnabled: true },
        { name: 'studentMobile', label: 'Student Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true, colSpan: 1, isEnabled: true },
        { name: 'whatsappNumber', label: 'WhatsApp Number', type: 'tel', placeholder: 'WhatsApp number', required: false, colSpan: 1, isEnabled: true },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'student@email.com', required: false, colSpan: 1, isEnabled: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true, colSpan: 1, isEnabled: true }
      ]
    },
    {
      id: 'parent_details',
      badge: '02',
      title: 'PARENT / GUARDIAN DETAILS',
      subtitle: 'Primary contact details of parent or guardian',
      step: 1,
      isEnabled: true,
      fields: [
        { name: 'parentName', label: 'Parent / Guardian Name', type: 'text', placeholder: 'Enter parent or guardian full name', required: true, colSpan: 2, isEnabled: true },
        { name: 'relationship', label: 'Relationship with Student', type: 'select', options: ['Father', 'Mother', 'Guardian'], required: true, colSpan: 1, isEnabled: true },
        { name: 'parentMobile', label: 'Parent Mobile Number', type: 'tel', placeholder: '10-digit primary mobile number', required: true, colSpan: 1, isEnabled: true },
        { name: 'parentEmail', label: 'Parent Email Address', type: 'email', placeholder: 'parent@email.com', required: false, colSpan: 2, isEnabled: true }
      ]
    },
    {
      id: 'academic_profile',
      badge: '03',
      title: 'ACADEMIC PROFILE',
      subtitle: 'Current educational standing and goals',
      step: 1,
      isEnabled: true,
      fields: [
        { name: 'currentClass', label: 'Current Class / Standard', type: 'select', options: ['Class 9', 'Class 10', 'Class 11', 'Class 12', '12th Pass / Dropper'], required: true, colSpan: 1, isEnabled: true },
        { name: 'school', label: 'School / College Name', type: 'text', placeholder: 'Enter current or last attended institution', required: false, colSpan: 2, isEnabled: true },
        { name: 'board', label: 'Education Board', type: 'select', options: ['CBSE', 'ICSE / ISC', 'State Board', 'Other'], required: true, colSpan: 1, isEnabled: true },
        { name: 'neetAttempt', label: 'Previous Competitive Attempt', type: 'text', placeholder: 'e.g. NEET 2025 / JEE Main 2025 (or Fresh)', required: false, colSpan: 1, isEnabled: true },
        { name: 'neetScore', label: 'Previous Score / Rank', type: 'text', placeholder: 'Marks or AIR (if applicable)', required: false, colSpan: 1, isEnabled: true },
        { name: 'targetExam', label: 'Target Examination', type: 'select', options: ['NEET 2026', 'NEET 2027', 'JEE Main 2026', 'JEE Advanced 2026', 'Foundation (9th/10th)', 'Other'], required: true, colSpan: 2, isEnabled: true }
      ]
    },
    {
      id: 'course_enrollment',
      badge: '04',
      title: 'COURSE / ENROLLMENT',
      subtitle: 'Selected academic batch and registration details',
      step: 1,
      isEnabled: true,
      fields: [
        { name: 'courseName', label: 'Course / Batch Enrolled For', type: 'select', options: ['NEET UG 2026–2027 Two-Year Comprehensive Batch', 'JEE Main + Advanced 2026 Target Batch', 'Class 11 Foundation Batch', 'Class 12 Board + Competitive Integrated', 'Dropper / Repeater Intensive Crash Course'], required: true, colSpan: 2, isEnabled: true },
        { name: 'admissionDate', label: 'Date of Admission', type: 'date', required: true, colSpan: 1, isEnabled: true },
        { name: 'academicSession', label: 'Academic Session', type: 'text', placeholder: '2026–2027', required: true, colSpan: 1, isEnabled: true },
        { name: 'counsellor', label: 'Academic Counsellor / Reference', type: 'text', placeholder: 'Counsellor name or branch ref', required: false, colSpan: 1, isEnabled: true },
        { name: 'enrollmentType', label: 'Enrollment Category', type: 'select', options: ['New', 'Renewal / Second Year', 'Transfer', 'Scholarship'], required: true, colSpan: 1, isEnabled: true },
        { name: 'leadSource', label: 'Source of Awareness', type: 'select', options: ['Website', 'Walk-in / Center', 'Social Media', 'Newspaper / Banner', 'Friend / Referral', 'Other'], required: true, colSpan: 2, isEnabled: true }
      ]
    },
    {
      id: 'address',
      badge: '05',
      title: 'ADDRESS',
      subtitle: 'Communication and residential address',
      step: 1,
      isEnabled: true,
      fields: [
        { name: 'address', label: 'Complete Postal Address', type: 'textarea', placeholder: 'House/Flat No., Street, Locality, Landmark', required: true, colSpan: 3, isEnabled: true },
        { name: 'city', label: 'City / District', type: 'text', placeholder: 'City name', required: true, colSpan: 1, isEnabled: true },
        { name: 'state', label: 'State', type: 'text', placeholder: 'State', required: true, colSpan: 1, isEnabled: true },
        { name: 'pinCode', label: 'PIN Code', type: 'text', placeholder: '6-digit postal code', required: true, colSpan: 1, isEnabled: true }
      ]
    },
    {
      id: 'payment_details',
      badge: '06',
      title: 'PAYMENT DETAILS',
      subtitle: 'Fee structure, transaction IDs and payment status',
      step: 2,
      isEnabled: true,
      fields: [
        { name: 'courseFee', label: 'Total Course Fee (₹)', type: 'number', placeholder: 'e.g. 45000', required: true, colSpan: 1, isEnabled: true },
        { name: 'amountPaid', label: 'Amount Paid (₹)', type: 'number', placeholder: 'e.g. 45000', required: true, colSpan: 1, isEnabled: true },
        { name: 'paymentMode', label: 'Payment Mode', type: 'select', options: ['UPI', 'Net Banking', 'Debit / Credit Card', 'Cheque / DD', 'Cash'], required: true, colSpan: 1, isEnabled: true },
        { name: 'transactionId', label: 'UTR / Transaction Ref No.', type: 'text', placeholder: 'Transaction reference / receipt number', required: false, colSpan: 1, isEnabled: true },
        { name: 'paymentDate', label: 'Payment Date', type: 'date', required: true, colSpan: 1, isEnabled: true },
        { name: 'paymentStatus', label: 'Fee Status', type: 'select', options: ['Paid', 'Partial / Advance', 'Pending Verification'], required: true, colSpan: 1, isEnabled: true }
      ]
    },
    {
      id: 'documents',
      badge: '07',
      title: 'DOCUMENTS',
      subtitle: 'Verification status of submitted certificates and IDs',
      step: 2,
      isEnabled: true,
      fields: [
        { name: 'docPhotoStatus', label: 'Passport Photograph', type: 'select', options: ['Uploaded', 'Submitted Physical', 'Pending', 'Not Applicable'], required: true, colSpan: 1, isEnabled: true },
        { name: 'docPhotoRemarks', label: 'Photo Remarks', type: 'text', placeholder: 'Remarks if any', required: false, colSpan: 1, isEnabled: true },
        { name: 'docIdProofStatus', label: 'Government ID / Aadhaar Proof', type: 'select', options: ['Uploaded', 'Submitted Physical', 'Pending', 'Not Applicable'], required: true, colSpan: 1, isEnabled: true },
        { name: 'docIdProofRemarks', label: 'ID Proof Remarks', type: 'text', placeholder: 'e.g. Aadhaar Card verified', required: false, colSpan: 1, isEnabled: true },
        { name: 'docPaymentProofStatus', label: 'Payment Receipt / Bank Slip', type: 'select', options: ['Uploaded', 'Submitted Physical', 'Pending', 'Not Applicable'], required: true, colSpan: 1, isEnabled: true },
        { name: 'docPaymentProofRemarks', label: 'Payment Remarks', type: 'text', placeholder: 'e.g. UPI screenshot verified', required: false, colSpan: 1, isEnabled: true },
        { name: 'docOtherStatus', label: 'Previous Marksheet / Certificate', type: 'select', options: ['Uploaded', 'Submitted Physical', 'Pending', 'Not Applicable'], required: false, colSpan: 1, isEnabled: true },
        { name: 'docOtherRemarks', label: 'Marksheet Remarks', type: 'text', placeholder: 'e.g. 10th / 11th Marksheet', required: false, colSpan: 1, isEnabled: true }
      ]
    },
    {
      id: 'communication_preference',
      badge: '08',
      title: 'COMMUNICATION PREFERENCE',
      subtitle: 'Preferred mode and recipient for alerts and scorecards',
      step: 2,
      isEnabled: true,
      fields: [
        { name: 'updatesThrough', label: 'Receive Notifications & Test Alerts Via', type: 'checkbox', options: ['Call', 'WhatsApp', 'Email', 'SMS'], required: true, colSpan: 2, isEnabled: true },
        { name: 'preferredRecipient', label: 'Primary Contact Person for Reports', type: 'radio', options: ['Student', 'Parent / Guardian', 'Both'], required: true, colSpan: 1, isEnabled: true }
      ]
    },
    {
      id: 'declaration',
      badge: '09',
      title: 'DECLARATION',
      subtitle: 'Undertaking by the student and parent',
      step: 2,
      isEnabled: true,
      fields: [
        { name: 'agreed', label: 'I hereby declare that all information provided above is true and authentic to the best of my knowledge, and I agree to abide by the academic code of conduct of EDVEDUM Academy.', type: 'checkbox_single', required: true, colSpan: 3, isEnabled: true },
        { name: 'declarationName', label: 'Full Name of Signee (Student / Parent)', type: 'text', placeholder: 'Type full legal name', required: true, colSpan: 2, isEnabled: true },
        { name: 'declarationDate', label: 'Date of Undertaking', type: 'date', required: true, colSpan: 1, isEnabled: true }
      ]
    },
    {
      id: 'office_use_only',
      badge: '10',
      title: 'FOR EDVEDUM OFFICE USE ONLY',
      subtitle: 'Administrative verification, batch allotment and ERP credentials',
      step: 2,
      isEnabled: true,
      fields: [
        { name: 'officeAdmissionId', label: 'Official Admission No.', type: 'text', placeholder: 'EDV-2026-XXXXX', required: false, colSpan: 1, isEnabled: true },
        { name: 'officeCounsellorCode', label: 'Admitting Counsellor Code', type: 'text', placeholder: 'EDV-ADM-01', required: false, colSpan: 1, isEnabled: true },
        { name: 'officeBatchCode', label: 'Assigned Batch Code', type: 'text', placeholder: 'NEET-2627-B1', required: false, colSpan: 1, isEnabled: true },
        { name: 'officeVerification', label: 'Admission Verification Status', type: 'select', options: ['Pending', 'Verified & Admitted', 'On Hold', 'Rejected'], required: false, colSpan: 1, isEnabled: true },
        { name: 'officeErpId', label: 'Student ERP / Portal ID', type: 'text', placeholder: 'ERP-XXXXX', required: false, colSpan: 1, isEnabled: true },
        { name: 'officeDiscountApprovedBy', label: 'Concession / Scholarship Sanctioned By', type: 'text', placeholder: 'Academic Director', required: false, colSpan: 1, isEnabled: true },
        { name: 'officeRemarks', label: 'Administrative Remarks', type: 'textarea', placeholder: 'Official remarks, special conditions or documentation notes', required: false, colSpan: 3, isEnabled: true }
      ]
    }
  ]
};

// ─── PUBLIC APIS ─────────────────────────────────────────────────────────────

/**
 * Public: Fetch active dynamic form schema
 */
export const getPublicAdmissionFormConfig = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT id, slug, title, academic_year, schema_json, is_active, updated_at
     FROM admission_form_config
     WHERE is_active = true
     ORDER BY updated_at DESC, id DESC
     LIMIT 1`
  );

  if (!result.rowCount) {
    return res.json({
      config: {
        title: 'EDVEDUM Academy Admission Form',
        academic_year: '2026–2027',
        schema_json: DEFAULT_ADMISSION_SCHEMA,
        is_active: true
      }
    });
  }

  res.json({ config: result.rows[0] });
});

/**
 * Public: Submit admission form application
 */
export const submitPublicAdmission = asyncHandler(async (req, res) => {
  const {
    applicationNo,
    studentName,
    fatherName,
    contactNumber,
    email,
    courseName,
    formData = {},
    documents = []
  } = req.body;

  const appNo = applicationNo || `EDV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const sName = studentName || formData.fullName || 'Student Applicant';
  const fName = fatherName || formData.parentName || '';
  const phone = contactNumber || formData.studentMobile || formData.parentMobile || '';
  const em = email || formData.email || formData.parentEmail || '';
  const course = courseName || formData.courseName || 'Classroom Batch';

  const result = await query(
    `INSERT INTO admission_submissions (
      application_no,
      student_name,
      father_name,
      contact_number,
      email,
      course_name,
      status,
      form_data,
      documents
    ) VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7, $8)
    ON CONFLICT (application_no) DO UPDATE SET
      student_name = EXCLUDED.student_name,
      father_name = EXCLUDED.father_name,
      contact_number = EXCLUDED.contact_number,
      email = EXCLUDED.email,
      course_name = EXCLUDED.course_name,
      form_data = EXCLUDED.form_data,
      documents = EXCLUDED.documents,
      updated_at = NOW()
    RETURNING *`,
    [appNo, sName, fName, phone, em, course, JSON.stringify(formData), JSON.stringify(documents)]
  );

  res.status(201).json({
    success: true,
    message: 'Admission form submitted successfully',
    submission: result.rows[0]
  });
});

/**
 * Public: Fetch submission details by application number
 */
export const getPublicAdmissionByAppNo = asyncHandler(async (req, res) => {
  const { applicationNo } = req.params;
  const result = await query(
    `SELECT * FROM admission_submissions WHERE application_no = $1 LIMIT 1`,
    [applicationNo]
  );

  if (!result.rowCount) {
    throw ApiError.notFound('Admission application not found');
  }

  res.json({ submission: result.rows[0] });
});

// ─── ADMIN APIS ──────────────────────────────────────────────────────────────

/**
 * Admin: Get current form schema
 */
export const getAdminAdmissionFormConfig = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT id, slug, title, academic_year, schema_json, is_active, updated_at
     FROM admission_form_config
     ORDER BY updated_at DESC, id DESC
     LIMIT 1`
  );

  if (!result.rowCount) {
    return res.json({
      config: {
        title: 'EDVEDUM Academy Admission Form',
        academic_year: '2026–2027',
        schema_json: DEFAULT_ADMISSION_SCHEMA,
        is_active: true
      }
    });
  }

  res.json({ config: result.rows[0] });
});

/**
 * Admin: Save/Update form schema (additions, deletions, edits)
 */
export const updateAdminAdmissionFormConfig = asyncHandler(async (req, res) => {
  const { title, academic_year, schema_json, is_active } = req.body;

  if (!schema_json || !Array.isArray(schema_json.sections)) {
    throw ApiError.badRequest('Invalid form schema: sections array is required.');
  }

  const result = await query(
    `INSERT INTO admission_form_config (slug, title, academic_year, schema_json, is_active)
     VALUES ('default', $1, $2, $3, $4)
     ON CONFLICT (slug) DO UPDATE SET
       title = EXCLUDED.title,
       academic_year = EXCLUDED.academic_year,
       schema_json = EXCLUDED.schema_json,
       is_active = EXCLUDED.is_active,
       updated_at = NOW()
     RETURNING *`,
    [
      title || 'EDVEDUM Academy Admission Form',
      academic_year || '2026–2027',
      JSON.stringify(schema_json),
      is_active !== false
    ]
  );

  res.json({
    success: true,
    message: 'Admission form configuration updated successfully',
    config: result.rows[0]
  });
});

/**
 * Admin: Reset form schema to default official template
 */
export const resetAdminAdmissionFormConfig = asyncHandler(async (req, res) => {
  const result = await query(
    `INSERT INTO admission_form_config (slug, title, academic_year, schema_json, is_active)
     VALUES ('default', 'EDVEDUM Academy Admission Form', '2026–2027', $1, true)
     ON CONFLICT (slug) DO UPDATE SET
       title = 'EDVEDUM Academy Admission Form',
       academic_year = '2026–2027',
       schema_json = $1,
       is_active = true,
       updated_at = NOW()
     RETURNING *`,
    [JSON.stringify(DEFAULT_ADMISSION_SCHEMA)]
  );

  res.json({
    success: true,
    message: 'Admission form restored to official default template',
    config: result.rows[0]
  });
});

/**
 * Admin: List all submitted admission applications with filters & pagination
 */
export const listAdminAdmissions = asyncHandler(async (req, res) => {
  const { search, status, page = 1, limit = 20 } = req.query;
  const p = Math.max(1, parseInt(page, 10));
  const l = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const offset = (p - 1) * l;

  const conditions = [];
  const params = [];

  if (status && status !== 'all') {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }

  if (search) {
    params.push(`%${search.trim().toLowerCase()}%`);
    const idx = params.length;
    conditions.push(`(
      LOWER(application_no) LIKE $${idx} OR
      LOWER(student_name) LIKE $${idx} OR
      LOWER(father_name) LIKE $${idx} OR
      LOWER(contact_number) LIKE $${idx} OR
      LOWER(email) LIKE $${idx} OR
      LOWER(course_name) LIKE $${idx}
    )`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const countRes = await query(
    `SELECT COUNT(*) AS total FROM admission_submissions ${whereClause}`,
    params
  );
  const total = parseInt(countRes.rows[0]?.total || '0', 10);

  const queryParams = [...params, l, offset];
  const listRes = await query(
    `SELECT id, application_no, student_name, father_name, contact_number, email, course_name, status, admin_notes, created_at, updated_at
     FROM admission_submissions
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`,
    queryParams
  );

  res.json({
    submissions: listRes.rows,
    total,
    page: p,
    limit: l,
    totalPages: Math.ceil(total / l)
  });
});

/**
 * Admin: Get single admission submission detail
 */
export const getAdminAdmissionDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query(
    `SELECT * FROM admission_submissions WHERE id = $1 LIMIT 1`,
    [id]
  );

  if (!result.rowCount) {
    throw ApiError.notFound('Submission not found');
  }

  res.json({ submission: result.rows[0] });
});

/**
 * Admin: Update submission status and notes
 */
export const updateAdminAdmissionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, admin_notes } = req.body;

  const result = await query(
    `UPDATE admission_submissions
     SET status = COALESCE($1, status),
         admin_notes = COALESCE($2, admin_notes),
         updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [status, admin_notes, id]
  );

  if (!result.rowCount) {
    throw ApiError.notFound('Submission not found');
  }

  res.json({
    success: true,
    message: 'Submission status updated',
    submission: result.rows[0]
  });
});

/**
 * Admin: Delete admission application
 */
export const deleteAdminAdmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query(
    `DELETE FROM admission_submissions WHERE id = $1 RETURNING id`,
    [id]
  );

  if (!result.rowCount) {
    throw ApiError.notFound('Submission not found');
  }

  res.json({ success: true, message: 'Submission deleted successfully' });
});
