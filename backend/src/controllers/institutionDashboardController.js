import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { hashPassword } from '../utils/password.js';
import crypto from 'crypto';

/**
 * 1. GET /api/institution/:id/profile & PUT /api/institution/:id/profile
 */
export const getInstitutionProfile = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const result = await query('SELECT * FROM institutions WHERE id = $1', [instId]);
  if (result.rowCount === 0) throw ApiError.notFound('Institution not found');
  res.json({ success: true, profile: result.rows[0] });
});

export const updateInstitutionProfile = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { contact_person, contact_email, contact_mobile, logo_url, address } = req.body;

  const result = await query(
    `UPDATE institutions
     SET contact_person = COALESCE($1, contact_person),
         contact_email = COALESCE($2, contact_email),
         contact_mobile = COALESCE($3, contact_mobile),
         logo_url = COALESCE($4, logo_url),
         address = COALESCE($5, address)
     WHERE id = $6
     RETURNING *`,
    [contact_person, contact_email, contact_mobile, logo_url, address, instId]
  );

  if (result.rowCount === 0) throw ApiError.notFound('Institution not found');
  res.json({ success: true, profile: result.rows[0], message: 'Profile updated successfully' });
});

/**
 * 2. STUDENT MANAGEMENT (CRUD)
 * GET/POST/PUT/DELETE /api/institution/:id/students
 */
export const listInstitutionStudents = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { batch_id, search } = req.query;

  let sql = `
    SELECT u.id, u.name, u.email, u.roll_number, u.created_at,
           b.id AS batch_id, COALESCE(b.batch_name, b.name) AS batch_name,
           sp.phone AS mobile
    FROM users u
    LEFT JOIN batches b ON b.id = u.batch_id
    LEFT JOIN student_profiles sp ON sp.user_id = u.id
    WHERE u.institution_id = $1
  `;
  const params = [instId];

  if (batch_id) {
    params.push(Number(batch_id));
    sql += ` AND u.batch_id = $${params.length}`;
  }

  if (search) {
    params.push(`%${search.trim().toLowerCase()}%`);
    sql += ` AND (LOWER(u.name) LIKE $${params.length} OR LOWER(u.email) LIKE $${params.length} OR LOWER(COALESCE(u.roll_number, '')) LIKE $${params.length})`;
  }

  sql += ` ORDER BY u.id DESC`;

  const result = await query(sql, params);
  res.json({ success: true, count: result.rows.length, students: result.rows });
});

export const addInstitutionStudent = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { name, email, mobile, password, batch_id, roll_number } = req.body;

  if (!name || !email) throw ApiError.badRequest('Student name and email are required');
  const normEmail = email.trim().toLowerCase();

  const existing = await query('SELECT id FROM users WHERE LOWER(email) = $1', [normEmail]);
  if (existing.rowCount > 0) throw ApiError.conflict('A user with this email already exists');

  // Auto-generate Enrollment Number / Roll Number if not provided
  let finalRollNumber = roll_number ? roll_number.trim().toUpperCase() : null;
  if (!finalRollNumber) {
    const instRes = await query('SELECT name FROM institutions WHERE id = $1', [instId]);
    let prefix = 'INST';
    if (instRes.rowCount > 0 && instRes.rows[0].name) {
      const instName = instRes.rows[0].name.trim();
      const words = instName.split(/\s+/);
      if (words.length >= 2) {
        prefix = (words[0][0] + words[1][0] + (words[2] ? words[2][0] : '')).toUpperCase();
      } else {
        prefix = instName.substring(0, 3).toUpperCase();
      }
    }
    const countRes = await query('SELECT COUNT(*) FROM users WHERE institution_id = $1', [instId]);
    const seq = Number(countRes.rows[0].count || 0) + 1;
    finalRollNumber = `${prefix}-2026-${String(seq).padStart(2, '0')}`;
  }

  const rawPass = password && password.trim() ? password.trim() : `Edu@${Math.floor(100000 + Math.random() * 900000)}`;
  const passHash = await hashPassword(rawPass);

  const student = await withTransaction(async (client) => {
    const userRes = await client.query(
      `INSERT INTO users (name, email, password_hash, role, institution_id, batch_id, roll_number)
       VALUES ($1, $2, $3, 'candidate', $4, $5, $6)
       RETURNING id, name, email, role, institution_id, batch_id, roll_number, created_at`,
      [name.trim(), normEmail, passHash, instId, batch_id || null, finalRollNumber]
    );
    const u = userRes.rows[0];

    await client.query(
      `INSERT INTO student_profiles (user_id, phone, institution_id, batch_id, roll_number)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id) DO UPDATE SET phone = EXCLUDED.phone, institution_id = EXCLUDED.institution_id, roll_number = EXCLUDED.roll_number`,
      [u.id, mobile ? mobile.trim() : null, instId, batch_id || null, finalRollNumber]
    );

    return u;
  });

  res.status(201).json({
    success: true,
    student,
    generatedPassword: rawPass,
    enrollmentId: finalRollNumber,
    message: `Student enrolled with Enrollment ID ${finalRollNumber}`,
  });
});

export const updateInstitutionStudent = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { student_id } = req.params;
  const { name, email, mobile, batch_id, roll_number } = req.body;

  const result = await query(
    `UPDATE users
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         batch_id = COALESCE($3, batch_id),
         roll_number = COALESCE($4, roll_number)
     WHERE id = $5 AND institution_id = $6
     RETURNING id, name, email, institution_id, batch_id, roll_number`,
    [name, email ? email.toLowerCase() : null, batch_id, roll_number, Number(student_id), instId]
  );

  if (result.rowCount === 0) throw ApiError.notFound('Student not found in this institution');

  if (mobile) {
    await query(
      `UPDATE student_profiles SET phone = $1 WHERE user_id = $2`,
      [mobile.trim(), Number(student_id)]
    );
  }

  res.json({ success: true, student: result.rows[0], message: 'Student updated successfully' });
});

export const deleteInstitutionStudent = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { student_id } = req.params;

  const result = await query(
    `DELETE FROM users WHERE id = $1 AND institution_id = $2 RETURNING id`,
    [Number(student_id), instId]
  );

  if (result.rowCount === 0) throw ApiError.notFound('Student not found in this institution');
  res.json({ success: true, message: 'Student deleted successfully', id: student_id });
});

/**
 * 3. BULK STUDENT UPLOAD
 * POST /api/institution/:id/students/bulk-upload
 */
export const bulkUploadStudents = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const rows = req.body.rows || [];

  if (!Array.isArray(rows) || rows.length === 0) {
    throw ApiError.badRequest('Please provide an array of student rows to upload.');
  }

  let successCount = 0;
  const failedRows = [];
  const generatedCredentials = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = row.name || row.Name;
    const email = row.email || row.Email;
    const mobile = row.mobile || row.Mobile || row.phone;
    const batchName = row['class/batch_name'] || row.batch_name || row.batch || row.Class || row.Batch;
    const rollNumber = row.roll_number || row.RollNo || row.Roll_Number;

    if (!name || !email) {
      failedRows.push({ row: i + 1, data: row, reason: 'Missing required fields (Name or Email)' });
      continue;
    }

    const normEmail = String(email).trim().toLowerCase();
    const existing = await query('SELECT id FROM users WHERE LOWER(email) = $1', [normEmail]);
    if (existing.rowCount > 0) {
      failedRows.push({ row: i + 1, data: row, reason: `Email ${normEmail} is already registered.` });
      continue;
    }

    // Handle batch auto-creation
    let batchId = null;
    if (batchName && String(batchName).trim()) {
      const cleanBatch = String(batchName).trim();
      const batchRes = await query(
        `SELECT id FROM batches WHERE institution_id = $1 AND (LOWER(batch_name) = $2 OR LOWER(name) = $2)`,
        [instId, cleanBatch.toLowerCase()]
      );
      if (batchRes.rowCount > 0) {
        batchId = batchRes.rows[0].id;
      } else {
        const newBatch = await query(
          `INSERT INTO batches (institution_id, name, batch_name) VALUES ($1, $2, $2) RETURNING id`,
          [instId, cleanBatch]
        );
        batchId = newBatch.rows[0].id;
      }
    }

    const rawPass = `Edu@${Math.floor(100000 + Math.random() * 900000)}`;
    const passHash = await hashPassword(rawPass);

    try {
      const uRes = await query(
        `INSERT INTO users (name, email, password_hash, role, institution_id, batch_id, roll_number)
         VALUES ($1, $2, $3, 'candidate', $4, $5, $6)
         RETURNING id, name, email`,
        [String(name).trim(), normEmail, passHash, instId, batchId, rollNumber ? String(rollNumber).trim() : null]
      );

      await query(
        `INSERT INTO student_profiles (user_id, phone, institution_id, batch_id, roll_number)
         VALUES ($1, $2, $3, $4, $5) ON CONFLICT (user_id) DO NOTHING`,
        [uRes.rows[0].id, mobile ? String(mobile).trim() : null, instId, batchId, rollNumber ? String(rollNumber).trim() : null]
      );

      successCount++;
      generatedCredentials.push({
        student_id: uRes.rows[0].id,
        name: String(name).trim(),
        email: normEmail,
        roll_number: rollNumber || 'N/A',
        batch_name: batchName || 'General',
        generated_password: rawPass,
      });
    } catch (err) {
      failedRows.push({ row: i + 1, data: row, reason: err.message });
    }
  }

  res.json({
    success: true,
    summary: {
      total_submitted: rows.length,
      success_count: successCount,
      failed_count: failedRows.length,
    },
    failed_rows: failedRows,
    credentials: generatedCredentials,
  });
});

export const getBulkUploadTemplate = asyncHandler(async (_req, res) => {
  const csvTemplate = `name,email,mobile,batch_name,roll_number\nJohn Doe,john@example.com,9876543210,Batch 2026-A,ROLL-001\nJane Smith,jane@example.com,9876543211,Batch 2026-B,ROLL-002\n`;
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="student_bulk_upload_template.csv"');
  res.send(csvTemplate);
});

/**
 * 4. REGENERATE CREDENTIALS
 * POST /api/institution/:id/students/:student_id/regenerate-credentials
 */
export const regenerateStudentCredentials = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { student_id } = req.params;

  const userRes = await query(
    `SELECT id, name, email, roll_number FROM users WHERE id = $1 AND institution_id = $2`,
    [Number(student_id), instId]
  );
  if (userRes.rowCount === 0) throw ApiError.notFound('Student not found in this institution');

  const u = userRes.rows[0];
  const newPass = `Edu@${Math.floor(100000 + Math.random() * 900000)}`;
  const passHash = await hashPassword(newPass);

  await query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [passHash, u.id]);

  res.json({
    success: true,
    student_id: u.id,
    name: u.name,
    email: u.email,
    roll_number: u.roll_number || 'N/A',
    new_password: newPass,
    message: 'Password regenerated successfully.',
  });
});

/**
 * 5. ASSIGN TEST SERIES (Package-Based Restrictions)
 * GET /api/institution/:id/available-tests
 * POST /api/institution/:id/tests/:test_id/assign
 */
export const getAvailablePackageTests = asyncHandler(async (req, res) => {
  const instId = req.institution_id;

  const result = await query(
    `SELECT DISTINCT t.id, t.test_name, t.test_type, t.test_date, t.duration_minutes, t.max_marks,
            tp.id AS package_id, tp.package_name
     FROM tests t
     JOIN package_tests pt ON pt.test_id = t.id
     JOIN institution_packages ip ON ip.package_id = pt.package_id
     JOIN test_packages tp ON tp.id = pt.package_id
     WHERE ip.institution_id = $1
       AND ip.is_active = TRUE
       AND (ip.valid_until IS NULL OR ip.valid_until > NOW())
       AND COALESCE(t.is_published, TRUE) = TRUE
       AND COALESCE(t.is_deleted, FALSE) = FALSE
     ORDER BY t.id DESC`,
    [instId]
  );

  res.json({ success: true, count: result.rows.length, tests: result.rows });
});

export const assignTestSeries = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { test_id } = req.params;
  const { assign_to, target_id } = req.body; // assign_to: 'institution' | 'batch' | 'student'

  if (!assign_to || !['institution', 'batch', 'student'].includes(assign_to)) {
    throw ApiError.badRequest('assign_to must be one of: institution, batch, student');
  }

  // Server-side Package Restriction Verification
  const allowedRes = await query(
    `SELECT 1
     FROM package_tests pt
     JOIN institution_packages ip ON ip.package_id = pt.package_id
     WHERE ip.institution_id = $1
       AND pt.test_id = $2
       AND ip.is_active = TRUE
       AND (ip.valid_until IS NULL OR ip.valid_until > NOW())`,
    [instId, Number(test_id)]
  );

  if (allowedRes.rowCount === 0) {
    throw ApiError.forbidden('Package Restriction Error: This test is not included in your institution’s active purchased packages.');
  }

  const assignedTargetId = assign_to === 'institution' ? instId : Number(target_id);

  const existing = await query(
    `SELECT id FROM test_assignments WHERE test_id = $1 AND assigned_to_type = $2 AND assigned_to_id = $3`,
    [Number(test_id), assign_to, assignedTargetId]
  );

  if (existing.rowCount > 0) {
    return res.json({ success: true, message: 'Test is already assigned to this target.' });
  }

  const assignment = await query(
    `INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [Number(test_id), assign_to, assignedTargetId]
  );

  res.status(201).json({
    success: true,
    assignment: assignment.rows[0],
    message: `Test successfully assigned to ${assign_to}.`,
  });
});

/**
 * 6. ASSIGN eBOOKS
 * GET /api/institution/:id/available-ebooks & POST /api/institution/:id/ebooks/:ebook_id/assign
 */
export const getAvailableEbooks = asyncHandler(async (_req, res) => {
  const result = await query('SELECT * FROM ebooks ORDER BY id DESC');
  res.json({ success: true, ebooks: result.rows });
});

export const assignEbook = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { ebook_id } = req.params;
  const { assign_to, target_id } = req.body;

  if (!assign_to || !['institution', 'batch', 'student'].includes(assign_to)) {
    throw ApiError.badRequest('assign_to must be one of: institution, batch, student');
  }

  const assignedTargetId = assign_to === 'institution' ? instId : Number(target_id);

  const assignment = await query(
    `INSERT INTO ebook_assignments (ebook_id, assigned_to_type, assigned_to_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [Number(ebook_id), assign_to, assignedTargetId]
  );

  res.status(201).json({
    success: true,
    assignment: assignment.rows[0],
    message: `eBook successfully assigned to ${assign_to}.`,
  });
});

/**
 * 7. VIEW STUDENT PROGRESS
 * GET /api/institution/:id/students/:student_id/progress
 */
export const getStudentProgress = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { student_id } = req.params;

  const userRes = await query(
    `SELECT u.id, u.name, u.email, u.roll_number, b.name AS batch_name
     FROM users u
     LEFT JOIN batches b ON b.id = u.batch_id
     WHERE u.id = $1 AND u.institution_id = $2`,
    [Number(student_id), instId]
  );
  if (userRes.rowCount === 0) throw ApiError.notFound('Student not found in this institution');

  const student = userRes.rows[0];

  const attemptsRes = await query(
    `SELECT ta.id, ta.test_id, t.test_name, ta.score, ta.max_marks, ta.percentage, ta.submitted_at, ta.institute_rank
     FROM test_attempts ta
     JOIN tests t ON t.id = ta.test_id
     WHERE ta.student_id = $1 AND ta.submitted_at IS NOT NULL
     ORDER BY ta.submitted_at ASC`,
    [Number(student_id)]
  );

  const assignedCountRes = await query(
    `SELECT COUNT(DISTINCT ta.test_id)::int AS cnt
     FROM test_assignments ta
     WHERE (ta.assigned_to_type = 'institution' AND ta.assigned_to_id = $1)
        OR (ta.assigned_to_type = 'student' AND ta.assigned_to_id = $2)`,
    [instId, Number(student_id)]
  );

  const attemptedCount = attemptsRes.rows.length;
  const assignedCount = Math.max(attemptedCount, assignedCountRes.rows[0]?.cnt || 0);

  res.json({
    success: true,
    student,
    stats: {
      tests_assigned: assignedCount,
      tests_attempted: attemptedCount,
      completion_rate: assignedCount > 0 ? Math.round((attemptedCount / assignedCount) * 100) : 0,
      average_percentage: attemptedCount > 0
        ? Number((attemptsRes.rows.reduce((acc, r) => acc + Number(r.percentage), 0) / attemptedCount).toFixed(2))
        : 0,
    },
    attempts: attemptsRes.rows,
  });
});

/**
 * 8. INSTITUTE PERFORMANCE ANALYTICS
 * GET /api/institution/:id/analytics
 */
export const getInstitutionAnalytics = asyncHandler(async (req, res) => {
  const instId = req.institution_id;

  const [aggRes, studentCountRes, batchAggRes] = await Promise.all([
    query(
      `SELECT 
         COALESCE(ROUND(AVG(ta.percentage), 2), 0) AS average_score,
         COALESCE(ROUND(MAX(ta.percentage), 2), 0) AS highest_score,
         COUNT(DISTINCT ta.student_id)::int AS active_students,
         COUNT(ta.id)::int AS total_test_attempts
       FROM test_attempts ta
       JOIN users u ON u.id = ta.student_id
       WHERE u.institution_id = $1 AND ta.submitted_at IS NOT NULL`,
      [instId]
    ),
    query(`SELECT COUNT(*)::int AS total_students FROM users WHERE institution_id = $1`, [instId]),
    query(
      `SELECT b.id AS batch_id, COALESCE(b.batch_name, b.name) AS batch_name,
              COUNT(DISTINCT u.id)::int AS total_students,
              COALESCE(ROUND(AVG(ta.percentage), 2), 0) AS avg_score
       FROM batches b
       LEFT JOIN users u ON u.batch_id = b.id AND u.institution_id = $1
       LEFT JOIN test_attempts ta ON ta.student_id = u.id AND ta.submitted_at IS NOT NULL
       WHERE b.institution_id = $1 OR u.institution_id = $1
       GROUP BY b.id, b.name, b.batch_name`,
      [instId]
    )
  ]);

  const stats = aggRes.rows[0];
  const totalEnrolled = studentCountRes.rows[0]?.total_students || 1;

  res.json({
    success: true,
    analytics: {
      average_score: Number(stats.average_score),
      highest_score: Number(stats.highest_score),
      total_students: totalEnrolled,
      active_participating_students: stats.active_students,
      total_attempts: stats.total_test_attempts,
      participation_rate: Math.min(100, Math.round((stats.active_students / totalEnrolled) * 100)),
      batch_performance: batchAggRes.rows,
    },
  });
});

/**
 * 9. DOWNLOAD REPORTS (CSV/Excel)
 * GET /api/institution/:id/reports/export?type=student|batch|institution&format=csv|excel
 */
export const exportInstitutionReport = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { type = 'student' } = req.query;

  let csvContent = '';
  let filename = `report_institution_${instId}_${type}.csv`;

  if (type === 'student') {
    const studentsRes = await query(
      `SELECT u.id, u.name, u.email, u.roll_number, COALESCE(b.batch_name, b.name, 'General') AS batch_name,
              COUNT(ta.id)::int AS attempts_count,
              COALESCE(ROUND(AVG(ta.percentage), 2), 0) AS avg_score
       FROM users u
       LEFT JOIN batches b ON b.id = u.batch_id
       LEFT JOIN test_attempts ta ON ta.student_id = u.id AND ta.submitted_at IS NOT NULL
       WHERE u.institution_id = $1
       GROUP BY u.id, u.name, u.email, u.roll_number, b.batch_name, b.name`,
      [instId]
    );

    csvContent = 'Student ID,Name,Email,Roll Number,Batch,Attempts,Average Score (%)\n';
    studentsRes.rows.forEach(r => {
      csvContent += `${r.id},"${r.name}","${r.email}","${r.roll_number || ''}","${r.batch_name}",${r.attempts_count},${r.avg_score}\n`;
    });
  } else {
    const batchRes = await query(
      `SELECT b.id, COALESCE(b.batch_name, b.name) AS batch_name,
              COUNT(DISTINCT u.id)::int AS total_students,
              COALESCE(ROUND(AVG(ta.percentage), 2), 0) AS avg_score
       FROM batches b
       LEFT JOIN users u ON u.batch_id = b.id
       LEFT JOIN test_attempts ta ON ta.student_id = u.id AND ta.submitted_at IS NOT NULL
       WHERE b.institution_id = $1 OR u.institution_id = $1
       GROUP BY b.id, b.name, b.batch_name`,
      [instId]
    );

    csvContent = 'Batch ID,Batch Name,Total Students,Average Score (%)\n';
    batchRes.rows.forEach(r => {
      csvContent += `${r.id},"${r.batch_name}",${r.total_students},${r.avg_score}\n`;
    });
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(csvContent);
});

/**
 * 10. STUDENT RANKING DASHBOARD
 * GET /api/institution/:id/rankings?test_id=X
 */
export const getInstitutionRankings = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { test_id } = req.query;

  let sql = `
    SELECT u.id AS student_id, u.name AS student_name, u.email, u.roll_number,
           COALESCE(b.batch_name, b.name, 'General') AS batch_name,
           ta.score, ta.max_marks, ta.percentage, ta.submitted_at,
           DENSE_RANK() OVER (ORDER BY ta.percentage DESC, ta.submitted_at ASC)::int AS institute_rank
    FROM users u
    JOIN test_attempts ta ON ta.student_id = u.id AND ta.submitted_at IS NOT NULL
    LEFT JOIN batches b ON b.id = u.batch_id
    WHERE u.institution_id = $1
  `;
  const params = [instId];

  if (test_id) {
    params.push(Number(test_id));
    sql += ` AND ta.test_id = $2`;
  }

  sql += ` ORDER BY institute_rank ASC`;

  const result = await query(sql, params);
  res.json({ success: true, count: result.rows.length, rankings: result.rows });
});

/**
 * 11. ATTENDANCE & TEST COMPLETION (Simplified & Merged)
 * GET /api/institution/:id/test-completion?test_id=X
 */
export const getTestCompletionStatus = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { test_id } = req.query;

  const testFilter = test_id ? Number(test_id) : null;

  const sql = `
    SELECT u.id AS student_id, u.name AS student_name, u.roll_number,
           COALESCE(b.batch_name, b.name, 'General') AS batch_name,
           b.id AS batch_id,
           CASE WHEN tas.id IS NOT NULL THEN TRUE ELSE FALSE END AS is_assigned,
           CASE WHEN ta.started_at IS NOT NULL THEN TRUE ELSE FALSE END AS is_started,
           CASE WHEN ta.submitted_at IS NOT NULL THEN TRUE ELSE FALSE END AS is_submitted,
           CASE 
             WHEN ta.submitted_at IS NOT NULL THEN 'Submitted'
             WHEN ta.started_at IS NOT NULL THEN 'In Progress'
             WHEN tas.id IS NOT NULL THEN 'Not Attempted'
             ELSE 'Unassigned'
           END AS completion_status
    FROM users u
    LEFT JOIN batches b ON b.id = u.batch_id
    LEFT JOIN test_assignments tas ON (
      (tas.assigned_to_type = 'institution' AND tas.assigned_to_id = $1) OR
      (tas.assigned_to_type = 'batch' AND tas.assigned_to_id = u.batch_id) OR
      (tas.assigned_to_type = 'student' AND tas.assigned_to_id = u.id)
    ) ${testFilter ? `AND tas.test_id = ${testFilter}` : ''}
    LEFT JOIN test_attempts ta ON ta.student_id = u.id ${testFilter ? `AND ta.test_id = ${testFilter}` : ''}
    WHERE u.institution_id = $1
    ORDER BY u.name ASC
  `;

  const result = await query(sql, [instId]);
  const students = result.rows;

  const totalStudents = students.length;
  const totalAssigned = students.filter(s => s.is_assigned || s.is_submitted).length;
  const totalAttempted = students.filter(s => s.is_submitted).length;
  const totalMissed = Math.max(0, totalAssigned - totalAttempted);
  const completionPercentage = totalAssigned > 0 ? Math.round((totalAttempted / totalAssigned) * 100) : 0;

  res.json({
    success: true,
    summary: {
      total_students: totalStudents,
      total_assigned: totalAssigned,
      total_attempted: totalAttempted,
      total_missed: totalMissed,
      completion_percentage: completionPercentage,
    },
    students,
  });
});

/**
 * 12. RESULT ANALYSIS
 * GET /api/institution/:id/result-analysis?test_id=X
 */
export const getResultAnalysis = asyncHandler(async (req, res) => {
  const instId = req.institution_id;
  const { test_id } = req.query;

  let testCondition = '';
  const params = [instId];

  if (test_id) {
    params.push(Number(test_id));
    testCondition = `AND ta.test_id = $2`;
  }

  const result = await query(
    `SELECT ta.percentage, ta.score, ta.max_marks
     FROM test_attempts ta
     JOIN users u ON u.id = ta.student_id
     WHERE u.institution_id = $1 AND ta.submitted_at IS NOT NULL ${testCondition}`,
    params
  );

  const rows = result.rows;
  const histogram = {
    '0-20%': 0,
    '21-40%': 0,
    '41-60%': 0,
    '61-80%': 0,
    '81-100%': 0,
  };

  let passedCount = 0;
  let failedCount = 0;

  rows.forEach(r => {
    const p = Number(r.percentage);
    if (p <= 20) histogram['0-20%']++;
    else if (p <= 40) histogram['21-40%']++;
    else if (p <= 60) histogram['41-60%']++;
    else if (p <= 80) histogram['61-80%']++;
    else histogram['81-100%']++;

    if (p >= 40) passedCount++;
    else failedCount++;
  });

  res.json({
    success: true,
    analysis: {
      total_attempts: rows.length,
      passed_count: passedCount,
      failed_count: failedCount,
      histogram,
      national_avg_comparison: {
        institute_avg: rows.length > 0 ? Number((rows.reduce((a, b) => a + Number(b.percentage), 0) / rows.length).toFixed(2)) : 0,
        national_avg: 58.4,
      },
    },
  });
});
