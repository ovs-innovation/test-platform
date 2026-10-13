import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { createAdminNotification } from '../utils/createAdminNotification.js';

/**
 * Public: Submit Student Enquiry (e.g. from First Visit modal or general landing lead)
 */
export const submitPublicStudentEnquiry = asyncHandler(async (req, res) => {
  const {
    name,
    studentName,
    mobile,
    phone,
    contactNumber,
    email,
    studentClass,
    currentClass,
    exam,
    targetExam,
    source = 'first_visit_popup',
    notes,
    metadata = {}
  } = req.body;

  const resolvedName = (name || studentName || '').trim();
  const rawPhone = String(mobile || phone || contactNumber || '').trim();
  const resolvedEmail = (email || '').trim().toLowerCase();
  const resolvedClass = (studentClass || currentClass || '').trim();
  const resolvedExam = (exam || targetExam || '').trim();

  if (!resolvedName) {
    throw ApiError.badRequest('Please enter student name.');
  }

  const cleanPhone = rawPhone.replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    throw ApiError.badRequest('Please provide a valid 10-digit mobile number.');
  }

  if (resolvedEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resolvedEmail)) {
      throw ApiError.badRequest('Please provide a valid email address.');
    }
  }

  // Generate unique reference code
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const referenceNo = `ENQ-${year}-${randomSuffix}`;

  const insertQuery = `
    INSERT INTO student_enquiries (
      reference_no,
      student_name,
      mobile,
      email,
      student_class,
      target_exam,
      status,
      source,
      notes,
      metadata,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, 'new', $7, $8, $9, NOW(), NOW())
    RETURNING *;
  `;

  const metaWithIp = {
    ...metadata,
    ip: req.ip || req.headers['x-forwarded-for'] || null,
    userAgent: req.headers['user-agent'] || null,
    submittedAt: new Date().toISOString()
  };

  const result = await query(insertQuery, [
    referenceNo,
    resolvedName,
    cleanPhone,
    resolvedEmail || null,
    resolvedClass || null,
    resolvedExam || null,
    source,
    notes || null,
    JSON.stringify(metaWithIp)
  ]);

  const newEnquiry = result.rows[0];

  // Send admin notification in platform
  createAdminNotification({
    title: 'New Student Enquiry Received',
    body: `${resolvedName} (${cleanPhone}) enquired for ${resolvedExam || 'Courses'} (${resolvedClass || 'General'})`,
    type: 'enquiry'
  }).catch(() => {});

  res.status(201).json({
    success: true,
    message: 'Thank you! Your enquiry has been received. Our counselling team will contact you shortly.',
    enquiry: newEnquiry
  });
});

/**
 * Admin: List all student inquiries with filters, search, and pagination
 */
export const listAdminStudentEnquiries = asyncHandler(async (req, res) => {
  const {
    search,
    status = 'all',
    exam = 'all',
    studentClass = 'all',
    page = 1,
    limit = 25,
    sortBy = 'created_at',
    sortOrder = 'desc'
  } = req.query;

  const p = Math.max(1, parseInt(page, 10));
  const l = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const offset = (p - 1) * l;

  const conditions = [];
  const params = [];

  if (status && status !== 'all') {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }

  if (exam && exam !== 'all') {
    params.push(exam);
    conditions.push(`target_exam = $${params.length}`);
  }

  if (studentClass && studentClass !== 'all') {
    params.push(studentClass);
    conditions.push(`student_class = $${params.length}`);
  }

  if (search && search.trim()) {
    const term = `%${search.trim().toLowerCase()}%`;
    params.push(term);
    const idx = params.length;
    conditions.push(`(
      LOWER(reference_no) LIKE $${idx} OR
      LOWER(student_name) LIKE $${idx} OR
      LOWER(mobile) LIKE $${idx} OR
      LOWER(COALESCE(email, '')) LIKE $${idx} OR
      LOWER(COALESCE(target_exam, '')) LIKE $${idx} OR
      LOWER(COALESCE(student_class, '')) LIKE $${idx} OR
      LOWER(COALESCE(notes, '')) LIKE $${idx}
    )`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  // Get total matching
  const countRes = await query(
    `SELECT COUNT(*) AS total FROM student_enquiries ${whereClause}`,
    params
  );
  const total = parseInt(countRes.rows[0]?.total || '0', 10);

  // Valid sort columns
  const allowedSortCols = {
    created_at: 'created_at',
    student_name: 'student_name',
    status: 'status',
    last_contacted_at: 'last_contacted_at'
  };
  const safeSortCol = allowedSortCols[sortBy] || 'created_at';
  const safeSortOrder = sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  const queryParams = [...params, l, offset];
  const listRes = await query(
    `SELECT 
      id,
      reference_no,
      student_name,
      mobile,
      email,
      student_class,
      target_exam,
      status,
      source,
      notes,
      last_contacted_at,
      contacted_by,
      metadata,
      created_at,
      updated_at
     FROM student_enquiries
     ${whereClause}
     ORDER BY ${safeSortCol} ${safeSortOrder}
     LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`,
    queryParams
  );

  // Compute overall aggregate KPI statistics
  const statsRes = await query(`
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status = 'new') AS new_count,
      COUNT(*) FILTER (WHERE status = 'contacted') AS contacted_count,
      COUNT(*) FILTER (WHERE status = 'follow_up') AS follow_up_count,
      COUNT(*) FILTER (WHERE status = 'enrolled') AS enrolled_count,
      COUNT(*) FILTER (WHERE status = 'closed') AS closed_count
    FROM student_enquiries
  `);

  const rawStats = statsRes.rows[0] || {};
  const stats = {
    totalCount: parseInt(rawStats.total || '0', 10),
    newCount: parseInt(rawStats.new_count || '0', 10),
    contactedCount: parseInt(rawStats.contacted_count || '0', 10),
    followUpCount: parseInt(rawStats.follow_up_count || '0', 10),
    enrolledCount: parseInt(rawStats.enrolled_count || '0', 10),
    closedCount: parseInt(rawStats.closed_count || '0', 10),
  };

  res.json({
    enquiries: listRes.rows,
    total,
    page: p,
    limit: l,
    totalPages: Math.ceil(total / l) || 1,
    stats
  });
});

/**
 * Admin: Get single student enquiry detail
 */
export const getAdminStudentEnquiryDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query(
    `SELECT * FROM student_enquiries WHERE id = $1 LIMIT 1`,
    [id]
  );

  if (!result.rowCount) {
    throw ApiError.notFound('Student enquiry not found.');
  }

  res.json({ enquiry: result.rows[0] });
});

/**
 * Admin: Update student enquiry status and counsellor follow-up notes
 */
export const updateAdminStudentEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes, last_contacted_at, contacted_by } = req.body;

  const existingRes = await query(`SELECT * FROM student_enquiries WHERE id = $1`, [id]);
  if (!existingRes.rowCount) {
    throw ApiError.notFound('Student enquiry not found.');
  }

  const existing = existingRes.rows[0];
  const newStatus = status !== undefined ? status : existing.status;
  const newNotes = notes !== undefined ? notes : existing.notes;

  // Auto-mark last_contacted_at if transitioning to contacted/follow_up without an explicit timestamp
  let contactTime = last_contacted_at;
  if (!contactTime && (newStatus === 'contacted' || newStatus === 'follow_up')) {
    contactTime = existing.last_contacted_at || new Date().toISOString();
  }

  const counsellorName = contacted_by || req.user?.name || req.user?.email || existing.contacted_by || 'Admin';

  const updateRes = await query(
    `UPDATE student_enquiries
     SET status = $1,
         notes = $2,
         last_contacted_at = COALESCE($3, last_contacted_at),
         contacted_by = $4,
         updated_at = NOW()
     WHERE id = $5
     RETURNING *`,
    [newStatus, newNotes, contactTime || null, counsellorName, id]
  );

  res.json({
    success: true,
    message: 'Enquiry updated successfully.',
    enquiry: updateRes.rows[0]
  });
});

/**
 * Admin: Delete student enquiry
 */
export const deleteAdminStudentEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query(
    `DELETE FROM student_enquiries WHERE id = $1 RETURNING id`,
    [id]
  );

  if (!result.rowCount) {
    throw ApiError.notFound('Student enquiry not found.');
  }

  res.json({
    success: true,
    message: 'Student enquiry deleted successfully.',
    id: result.rows[0].id
  });
});
