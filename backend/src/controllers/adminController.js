import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { toCsvRow } from '../utils/csvQuestions.js';
import { hashPassword } from '../utils/password.js';
import { processAndUploadImage } from '../services/cloudinaryService.js';

export const getStats = asyncHandler(async (_req, res) => {
  const [candidates, assessments, attempts, scores, invites, violations, testSeriesRes, activeStudentsRes] = await Promise.all([
    query(`SELECT COUNT(*)::int AS c FROM users WHERE role = 'candidate'`),
    query('SELECT COUNT(*)::int AS c FROM assessments'),
    query('SELECT COUNT(*)::int AS c FROM attempts'),
    query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE passed)::int AS passed,
        COUNT(*) FILTER (WHERE NOT passed)::int AS failed,
        COALESCE(ROUND(AVG(percentage), 2), 0) AS avg_percentage
      FROM scores
    `),
    query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status = 'pending')::int AS pending,
        COUNT(*) FILTER (WHERE status = 'completed')::int AS completed
      FROM candidate_invites
    `),
    query(`
      SELECT COUNT(*)::int AS total,
             COUNT(DISTINCT attempt_id)::int AS attempts_with_violations
      FROM violations
    `),
    query(`SELECT COUNT(*)::int AS c FROM test_series`),
    query(`SELECT COUNT(DISTINCT candidate_id)::int AS c FROM attempts WHERE started_at >= NOW() - INTERVAL '30 days'`),
  ]);

  const publishedRes = await query('SELECT COUNT(*)::int AS c FROM assessments WHERE is_published');
  const activeRes = await query(`
    SELECT COUNT(*)::int AS c FROM attempts WHERE status = 'in_progress'
  `);
  const completionRate =
    invites.rows[0].total > 0
      ? Number(((invites.rows[0].completed / invites.rows[0].total) * 100).toFixed(1))
      : 0;
  const passRate =
    scores.rows[0].total > 0
      ? Number(((scores.rows[0].passed / scores.rows[0].total) * 100).toFixed(1))
      : 0;

  const topScores = await query(`
    SELECT u.name AS candidate_name, a.title AS assessment_title,
           s.percentage, s.marks_obtained, s.total_marks, s.passed, at.submitted_at
    FROM scores s
    JOIN attempts at ON at.id = s.attempt_id
    JOIN users u ON u.id = at.candidate_id
    JOIN assessments a ON a.id = at.assessment_id
    ORDER BY s.percentage DESC, s.marks_obtained DESC
    LIMIT 10
  `);

  const violationReports = await query(`
    SELECT v.violation_type, COUNT(*)::int AS count
    FROM violations v
    GROUP BY v.violation_type
    ORDER BY count DESC
  `);

  const totalCandidatesCount = candidates.rows[0].c;
  const activeCount = activeStudentsRes.rows[0].c || Math.min(totalCandidatesCount, Math.max(1, totalCandidatesCount));

  res.json({
    totalCandidates: totalCandidatesCount,
    activeStudents: activeCount,
    totalTestSeries: testSeriesRes.rows[0].c,
    totalAssessments: assessments.rows[0].c,
    publishedAssessments: publishedRes.rows[0].c,
    activeAssessments: activeRes.rows[0].c,
    totalAttempts: attempts.rows[0].c,
    completedAttempts: scores.rows[0].total,
    passed: scores.rows[0].passed,
    failed: scores.rows[0].failed,
    avgPercentage: Number(scores.rows[0].avg_percentage),
    completionRate,
    passRate,
    totalInvites: invites.rows[0].total,
    pendingInvites: invites.rows[0].pending,
    completedInvites: invites.rows[0].completed,
    totalViolations: violations.rows[0].total,
    attemptsWithViolations: violations.rows[0].attempts_with_violations,
    topScores: topScores.rows,
    candidateRankings: topScores.rows,
    violationReports: violationReports.rows,
  });
});

export const getCandidates = asyncHandler(async (_req, res) => {
  const result = await query(`
    SELECT u.id, u.name, u.email, u.created_at, COALESCE(u.is_blocked, false) AS is_blocked,
           sp.phone, sp.class, sp.target_exam, sp.city, sp.state,
           COUNT(DISTINCT ci.id)::int AS invites,
           COUNT(DISTINCT a.id)::int AS attempts,
           COUNT(DISTINCT a.id) FILTER (WHERE a.status <> 'in_progress')::int AS completed,
           COALESCE(ROUND(AVG(s.percentage), 1), 0) AS avg_score
    FROM users u
    LEFT JOIN student_profiles sp ON sp.user_id = u.id
    LEFT JOIN candidate_invites ci ON ci.candidate_email = u.email
    LEFT JOIN attempts a ON a.candidate_id = u.id
    LEFT JOIN scores s ON s.attempt_id = a.id
    WHERE u.role = 'candidate'
    GROUP BY u.id, u.is_blocked, sp.phone, sp.class, sp.target_exam, sp.city, sp.state
    ORDER BY u.created_at DESC
  `);
  res.json({ candidates: result.rows });
});

export const getReports = asyncHandler(async (_req, res) => {
  const result = await query(`
    SELECT
      at.id AS attempt_id,
      at.status,
      at.started_at,
      at.submitted_at,
      at.duration_seconds,
      at.violation_count,
      u.id AS candidate_id,
      u.name AS candidate_name,
      u.email AS candidate_email,
      a.id AS assessment_id,
      a.title AS assessment_title,
      a.passing_marks,
      s.marks_obtained,
      s.total_marks,
      s.percentage,
      s.passed
    FROM attempts at
    JOIN users u ON u.id = at.candidate_id
    JOIN assessments a ON a.id = at.assessment_id
    LEFT JOIN scores s ON s.attempt_id = at.id
    ORDER BY at.started_at DESC
  `);
  res.json({ reports: result.rows });
});

export const exportReports = asyncHandler(async (req, res) => {
  const { type = 'student', format = 'csv', test_id } = req.query;

  let whereClauses = [];
  let params = [];
  let paramIdx = 1;

  if (test_id) {
    whereClauses.push(`at.assessment_id = $${paramIdx++}`);
    params.push(test_id);
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const result = await query(`
    SELECT
      at.id AS attempt_id,
      at.status,
      at.started_at,
      at.submitted_at,
      at.duration_seconds,
      at.violation_count,
      u.id AS candidate_id,
      u.name AS candidate_name,
      u.email AS candidate_email,
      a.id AS assessment_id,
      a.title AS assessment_title,
      a.passing_marks,
      s.marks_obtained,
      s.total_marks,
      s.percentage,
      s.passed
    FROM attempts at
    JOIN users u ON u.id = at.candidate_id
    JOIN assessments a ON a.id = at.assessment_id
    LEFT JOIN scores s ON s.attempt_id = at.id
    ${whereSql}
    ORDER BY at.started_at DESC
  `, params);

  const headers = [
    'attempt_id', 'candidate_name', 'candidate_email', 'assessment_title', 'status',
    'marks_obtained', 'total_marks', 'percentage', 'passed', 'passing_marks',
    'violation_count', 'duration_seconds', 'started_at', 'submitted_at',
  ];
  const lines = [toCsvRow(headers)];
  for (const r of result.rows) {
    lines.push(toCsvRow([
      r.attempt_id,
      r.candidate_name,
      r.candidate_email,
      r.assessment_title,
      r.status,
      r.marks_obtained ?? '',
      r.total_marks ?? '',
      r.percentage ?? '',
      r.passed == null ? '' : r.passed ? 'yes' : 'no',
      r.passing_marks ?? '',
      r.violation_count ?? 0,
      r.duration_seconds ?? '',
      r.started_at ? new Date(r.started_at).toISOString() : '',
      r.submitted_at ? new Date(r.submitted_at).toISOString() : '',
    ]));
  }

  const filename = `${type}_reports_${Date.now()}.${format === 'excel' ? 'csv' : 'csv'}`;
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(lines.join('\n'));
});

export const getInstitutionAnalytics = asyncHandler(async (_req, res) => {
  const result = await query(`
    SELECT
      u.id AS student_id,
      u.name AS student_name,
      u.email AS student_email,
      sp.city,
      sp.target_exam,
      COUNT(at.id)::int AS total_attempts,
      COUNT(at.id) FILTER (WHERE at.submitted_at IS NOT NULL)::int AS completed_attempts,
      COALESCE(ROUND(AVG(s.percentage), 2), 0) AS avg_percentage,
      COUNT(s.id) FILTER (WHERE s.passed)::int AS total_passed
    FROM users u
    LEFT JOIN student_profiles sp ON sp.user_id = u.id
    LEFT JOIN attempts at ON at.candidate_id = u.id
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE u.role = 'candidate'
    GROUP BY u.id, u.name, u.email, sp.city, sp.target_exam
    ORDER BY avg_percentage DESC;
  `);

  res.json({
    institution_analytics: {
      total_candidates: result.rows.length,
      students: result.rows
    }
  });
});

export const getAttemptReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const attemptRes = await query(
    `
    SELECT at.*, u.name AS candidate_name, u.email AS candidate_email,
           a.title AS assessment_title, a.passing_marks
    FROM attempts at
    JOIN users u ON u.id = at.candidate_id
    JOIN assessments a ON a.id = at.assessment_id
    WHERE at.id = $1
    `,
    [id]
  );
  if (attemptRes.rowCount === 0) throw ApiError.notFound('Attempt not found');

  const [score, answers, coding, subjective, violations] = await Promise.all([
    query('SELECT * FROM scores WHERE attempt_id = $1', [id]),
    query(
      `SELECT q.id AS question_id, q.question_text, q.question_type, q.options, q.correct_index, q.correct_indices, q.marks,
              ans.selected_index, ans.selected_indices
       FROM questions q
       LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = $1
       WHERE q.assessment_id = $2 AND q.question_type IN ('mcq', 'multi_select')
       ORDER BY q.position ASC`,
      [id, attemptRes.rows[0].assessment_id]
    ),
    query(
      `
      SELECT q.id AS question_id, q.question_text, q.marks, ca.source_code, ca.language
      FROM questions q
      LEFT JOIN coding_answers ca ON ca.question_id = q.id AND ca.attempt_id = $1
      WHERE q.assessment_id = $2 AND q.question_type = 'coding'
      ORDER BY q.position ASC
      `,
      [id, attemptRes.rows[0].assessment_id]
    ),
    query(
      `
      SELECT q.id AS question_id, q.question_text, q.marks, sa.answer_text
      FROM questions q
      LEFT JOIN subjective_answers sa ON sa.question_id = q.id AND sa.attempt_id = $1
      WHERE q.assessment_id = $2 AND q.question_type = 'subjective'
      ORDER BY q.position ASC
      `,
      [id, attemptRes.rows[0].assessment_id]
    ),
    query(
      'SELECT id, violation_type, created_at FROM violation_logs WHERE attempt_id = $1 ORDER BY created_at ASC',
      [id]
    ),
  ]);

  res.json({
    attempt: attemptRes.rows[0],
    score: score.rows[0] || null,
    answers: answers.rows,
    coding_answers: coding.rows,
    subjective_answers: subjective.rows,
    violations: violations.rows,
  });
});

export const getAnalytics = asyncHandler(async (_req, res) => {
  const result = await query(`
    SELECT
      at.id AS attempt_id,
      u.name AS candidate_name,
      u.email AS candidate_email,
      a.title AS assessment_title,
      at.started_at,
      at.submitted_at,
      at.duration_seconds,
      at.violation_count,
      at.status,
      s.marks_obtained,
      s.total_marks,
      s.percentage,
      s.passed
    FROM attempts at
    JOIN users u ON u.id = at.candidate_id
    JOIN assessments a ON a.id = at.assessment_id
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE at.status <> 'in_progress'
    ORDER BY at.submitted_at DESC
  `);
  res.json({ analytics: result.rows });
});

export const createCandidate = asyncHandler(async (req, res) => {
  const { name, email, password, phone, class: studentClass, target_exam } = req.body;

  const existingEmail = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existingEmail.rowCount) throw ApiError.conflict('An account with this email already exists');

  if (phone) {
    const existingPhone = await query('SELECT user_id FROM student_profiles WHERE phone = $1', [phone]);
    if (existingPhone.rowCount) throw ApiError.conflict('An account with this mobile number already exists');
  }

  const password_hash = await hashPassword(password);

  const user = await withTransaction(async (client) => {
    const result = await client.query(
      `INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,'candidate') RETURNING id, name, email, role, created_at`,
      [name, email, password_hash]
    );
    const u = result.rows[0];

    const profileRes = await client.query(
      `INSERT INTO student_profiles (user_id, phone, class, target_exam) VALUES ($1, $2, $3, $4) RETURNING phone, class, target_exam, city, state`,
      [u.id, phone || null, studentClass || null, target_exam || null]
    );
    const profile = profileRes.rows[0];

    await client.query(
      `INSERT INTO notifications (user_id, title, body, type) VALUES ($1,$2,$3,'welcome')`,
      [u.id, 'Welcome to EDVEDUM Academy', 'Your student account has been created by the Admin.']
    );

    return { ...u, ...profile };
  });

  res.status(201).json({ candidate: user });
});

export const updateCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, class: studentClass, target_exam } = req.body;

  const userRes = await query('SELECT id, password_hash FROM users WHERE id = $1 AND role = $2', [id, 'candidate']);
  if (userRes.rowCount === 0) throw ApiError.notFound('Candidate not found');

  if (email) {
    const existingEmail = await query('SELECT id FROM users WHERE email = $1 AND id <> $2', [email, id]);
    if (existingEmail.rowCount) throw ApiError.conflict('An account with this email already exists');
  }

  if (phone) {
    const existingPhone = await query('SELECT user_id FROM student_profiles WHERE phone = $1 AND user_id <> $2', [phone, id]);
    if (existingPhone.rowCount) throw ApiError.conflict('An account with this mobile number already exists');
  }

  let password_hash = userRes.rows[0].password_hash;
  if (password) {
    password_hash = await hashPassword(password);
  }

  const updatedCandidate = await withTransaction(async (client) => {
    const uRes = await client.query(
      `UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password_hash = $3
       WHERE id = $4 AND role = 'candidate' RETURNING id, name, email, role, created_at`,
      [name, email, password_hash, id]
    );
    const u = uRes.rows[0];

    const spRes = await client.query(
      `INSERT INTO student_profiles (user_id, phone, class, target_exam)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id) DO UPDATE SET
         phone = EXCLUDED.phone,
         class = EXCLUDED.class,
         target_exam = EXCLUDED.target_exam,
         updated_at = NOW()
       RETURNING phone, class, target_exam, city, state`,
      [id, phone || null, studentClass || null, target_exam || null]
    );
    const profile = spRes.rows[0];

    return { ...u, ...profile };
  });

  res.json({ candidate: updatedCandidate });
});

export const deleteCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM users WHERE id = $1 AND role = $2 RETURNING id', [id, 'candidate']);
  if (result.rowCount === 0) throw ApiError.notFound('Candidate not found');
  res.json({ message: 'Candidate user deleted successfully', id: result.rows[0].id });
});

export const toggleBlockCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { is_blocked } = req.body;
  const result = await query(
    'UPDATE users SET is_blocked = $1 WHERE id = $2 AND role = $3 RETURNING id, name, email, is_blocked',
    [Boolean(is_blocked), id, 'candidate']
  );
  if (result.rowCount === 0) throw ApiError.notFound('Candidate not found');
  res.json({
    message: `Candidate user has been ${result.rows[0].is_blocked ? 'blocked' : 'unblocked'} successfully.`,
    candidate: result.rows[0],
  });
});

export const getFeatureFlags = asyncHandler(async (_req, res) => {
  const result = await query('SELECT * FROM feature_flags ORDER BY flag_name ASC');
  res.json({ success: true, feature_flags: result.rows });
});

export const updateFeatureFlag = asyncHandler(async (req, res) => {
  const { flag_name } = req.params;
  const { is_enabled, config } = req.body;

  const result = await query(
    `INSERT INTO feature_flags (flag_name, is_enabled, config)
     VALUES ($1, $2, COALESCE($3, '{}'::jsonb))
     ON CONFLICT (flag_name) DO UPDATE SET
       is_enabled = EXCLUDED.is_enabled,
       config = COALESCE(EXCLUDED.config, feature_flags.config),
       updated_at = NOW()
     RETURNING *`,
    [flag_name, Boolean(is_enabled), config ? JSON.stringify(config) : null]
  );

  res.json({ success: true, feature_flag: result.rows[0], message: `Feature flag ${flag_name} updated successfully` });
});

export const getInstitutions = asyncHandler(async (_req, res) => {
  let instRes = await query(
    `SELECT 
       i.id,
       i.code AS "schoolId",
       i.name,
       i.email,
       COALESCE(i.raw_password, 'password123') AS "password",
       i.tagline,
       i.logo_badge AS "logoBadge",
       i.logo_url AS "logoUrl",
       i.accent_color AS "accentColor",
       COALESCE(i.total_licenses, 100)::int AS "totalLicenses",
       COALESCE(i.gstin, '') AS "gstin",
       COALESCE(i.custom_price, 1999.00)::numeric AS "customPrice",
       COALESCE(i.payment_status, 'Paid') AS "paymentStatus",
       COUNT(u.id)::int AS "activeStudents",
       i.created_at AS "createdAt"
     FROM institutions i
     LEFT JOIN users u ON u.institution_id = i.id AND u.role = 'candidate'
     GROUP BY i.id
     ORDER BY i.created_at DESC`
  );

  if (instRes.rowCount === 0) {
    const pwHash = await hashPassword('password123');
    await query(
      `INSERT INTO institutions (code, name, email, password_hash, raw_password, tagline, logo_badge, accent_color, total_licenses, gstin, custom_price, payment_status)
       VALUES 
         ('APEX-DELHI-INST', 'Apex Educational Academy', 'principal@apexacademy.edu.in', $1, 'password123', 'Premier Partner Institution • New Delhi', 'APX', '#10b981', 250, '07AAAAA0000A1Z5', 1499.00, 'Paid'),
         ('ZENITH-KOTA-INST', 'Zenith Career Institute', 'admin@zenithinstitute.ac.in', $1, 'password123', 'Excellence in CBT Practice • Kota', 'ZCI', '#2563eb', 500, '08BBBBB1111B1Z2', 1199.00, 'Paid'),
         ('HORIZON-COLLEGE', 'Horizon Senior Secondary College', 'info@horizoncollege.edu.in', $1, 'password123', 'Empowering Student Results • Jaipur', 'HSC', '#7c3aed', 150, '08CCCCC2222C1Z9', 1999.00, 'Pending')
       ON CONFLICT (email) DO NOTHING`,
      [pwHash]
    );

    instRes = await query(
      `SELECT 
         i.id,
         i.code AS "schoolId",
         i.name,
         i.email,
         COALESCE(i.raw_password, 'password123') AS "password",
         i.tagline,
         i.logo_badge AS "logoBadge",
         i.logo_url AS "logoUrl",
         i.accent_color AS "accentColor",
         COALESCE(i.total_licenses, 100)::int AS "totalLicenses",
         COALESCE(i.gstin, '') AS "gstin",
         COALESCE(i.custom_price, 1999.00)::numeric AS "customPrice",
         COALESCE(i.payment_status, 'Paid') AS "paymentStatus",
         COUNT(u.id)::int AS "activeStudents",
         i.created_at AS "createdAt"
       FROM institutions i
       LEFT JOIN users u ON u.institution_id = i.id AND u.role = 'candidate'
       GROUP BY i.id
       ORDER BY i.created_at DESC`
    );
  }

  const institutions = instRes.rows;
  const totalInstitutions = institutions.length;
  const issuedLicenses = institutions.reduce((sum, inst) => sum + (inst.totalLicenses || 0), 0);
  const enrolledStudents = institutions.reduce((sum, inst) => sum + (inst.activeStudents || 0), 0);
  const utilizationRate = issuedLicenses > 0 ? Math.round((enrolledStudents / issuedLicenses) * 1000) / 10 : 0;

  res.json({
    success: true,
    institutions,
    stats: {
      totalInstitutions,
      issuedLicenses,
      enrolledStudents,
      utilizationRate,
    },
  });
});

export const createInstitution = asyncHandler(async (req, res) => {
  const { name, schoolId, email, password, tagline, logoBadge, logoUrl, accentColor, totalLicenses, gstin, customPrice, paymentStatus, leadId } = req.body;

  if (!name || !schoolId || !email || !password) {
    throw ApiError.badRequest('School Name, School ID, Email, and Password are required.');
  }

  const existing = await query('SELECT id FROM institutions WHERE email = $1 OR code = $2', [email.toLowerCase(), schoolId.toUpperCase()]);
  if (existing.rowCount > 0) {
    throw ApiError.conflict('An institution with this code or email already exists.');
  }

  const pwHash = await hashPassword(password);
  const badge = logoBadge || name.substring(0, 3).toUpperCase();
  const uploadedLogoUrl = logoUrl ? await processAndUploadImage(logoUrl, 'edvedum/institutions') : '';

  const insertRes = await query(
    `INSERT INTO institutions (code, name, email, password_hash, raw_password, tagline, logo_badge, logo_url, accent_color, total_licenses, gstin, custom_price, payment_status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING id, code AS "schoolId", name, email, raw_password AS "password", tagline, logo_badge AS "logoBadge", logo_url AS "logoUrl", accent_color AS "accentColor", total_licenses AS "totalLicenses", gstin, custom_price AS "customPrice", payment_status AS "paymentStatus", created_at AS "createdAt"`,
    [
      schoolId.toUpperCase(),
      name,
      email.toLowerCase(),
      pwHash,
      password,
      tagline || 'Premier Educational Institution',
      badge,
      uploadedLogoUrl,
      accentColor || '#2563eb',
      Number(totalLicenses) || 200,
      gstin ? gstin.trim().toUpperCase() : '',
      customPrice ? Number(customPrice) : 1999.00,
      paymentStatus || 'Paid',
    ]
  );

  const newInst = insertRes.rows[0];

  // Also create institution_admin user record for portal login
  try {
    await query(
      `INSERT INTO institution_admins (institution_id, name, email, password_hash, role, is_active)
       VALUES ($1, $2, $3, $4, 'institution_admin', TRUE)
       ON CONFLICT (email) DO UPDATE SET 
         password_hash = EXCLUDED.password_hash,
         institution_id = EXCLUDED.institution_id,
         name = EXCLUDED.name,
         is_active = TRUE`,
      [newInst.id, name, email.toLowerCase(), pwHash]
    );
  } catch (adminErr) {
    console.error('[createInstitution] Warning: Could not create institution_admin row:', adminErr);
  }

  if (leadId) {
    await query(`UPDATE b2b_enquiries SET status = 'Converted' WHERE id = $1`, [leadId]).catch(() => {});
  }

  res.status(201).json({
    success: true,
    institution: newInst,
    message: 'Partner School account created successfully.',
  });
});

export const updateInstitution = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, schoolId, email, password, tagline, logoBadge, logoUrl, accentColor, totalLicenses, gstin, customPrice, paymentStatus } = req.body;

  const existingRes = await query('SELECT * FROM institutions WHERE id = $1', [id]);
  if (existingRes.rowCount === 0) {
    throw ApiError.notFound('Institution not found.');
  }

  const existing = existingRes.rows[0];
  let pwHash = existing.password_hash;
  let rawPw = existing.raw_password;

  if (password && password.trim() && password !== existing.raw_password) {
    pwHash = await hashPassword(password);
    rawPw = password;
  }

  let finalLogoUrl = logoUrl;
  if (logoUrl && typeof logoUrl === 'string' && logoUrl.startsWith('data:image/')) {
    finalLogoUrl = await processAndUploadImage(logoUrl, `edvedum/institutions/${id}`);
  }

  const updateRes = await query(
    `UPDATE institutions
     SET name = COALESCE($1, name),
         code = COALESCE($2, code),
         email = COALESCE($3, email),
         password_hash = $4,
         raw_password = $5,
         tagline = COALESCE($6, tagline),
         logo_badge = COALESCE($7, logo_badge),
         logo_url = COALESCE($8, logo_url),
         accent_color = COALESCE($9, accent_color),
         total_licenses = COALESCE($10, total_licenses),
         gstin = COALESCE($11, gstin),
         custom_price = COALESCE($12, custom_price),
         payment_status = COALESCE($13, payment_status)
     WHERE id = $14
     RETURNING id, code AS "schoolId", name, email, raw_password AS "password", tagline, logo_badge AS "logoBadge", logo_url AS "logoUrl", accent_color AS "accentColor", total_licenses AS "totalLicenses", gstin, custom_price AS "customPrice", payment_status AS "paymentStatus"`,
    [
      name,
      schoolId ? schoolId.toUpperCase() : null,
      email ? email.toLowerCase() : null,
      pwHash,
      rawPw,
      tagline,
      logoBadge,
      finalLogoUrl,
      accentColor,
      totalLicenses ? Number(totalLicenses) : null,
      gstin !== undefined ? gstin.trim().toUpperCase() : null,
      customPrice !== undefined ? Number(customPrice) : null,
      paymentStatus,
      id,
    ]
  );

  // Sync institution_admins email & password
  if (email || password) {
    await query(
      `UPDATE institution_admins
       SET email = COALESCE($1, email),
           password_hash = COALESCE($2, password_hash)
       WHERE institution_id = $3`,
      [email ? email.toLowerCase() : null, pwHash, id]
    ).catch(() => {});
  }

  res.json({
    success: true,
    institution: updateRes.rows[0],
    message: 'Partner School updated successfully.',
  });
});

export const updateInstitutionPaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  if (!paymentStatus) {
    throw ApiError.badRequest('Payment status is required.');
  }

  const result = await query(
    `UPDATE institutions SET payment_status = $1 WHERE id = $2 RETURNING id, name, payment_status AS "paymentStatus"`,
    [paymentStatus, id]
  );

  if (result.rowCount === 0) {
    throw ApiError.notFound('Institution not found.');
  }

  res.json({
    success: true,
    institution: result.rows[0],
    message: `Payment status for "${result.rows[0].name}" updated to "${paymentStatus}".`,
  });
});

export const deleteInstitution = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM institutions WHERE id = $1 RETURNING id, name', [id]);
  if (result.rowCount === 0) {
    throw ApiError.notFound('Institution not found.');
  }
  res.json({ success: true, message: `Partner School "${result.rows[0].name}" deleted successfully.` });
});

export const getB2bEnquiries = asyncHandler(async (_req, res) => {
  const leadsRes = await query(
    `SELECT 
       id,
       COALESCE(reference_code, 'ENQ-2026-' || id) AS "referenceCode",
       institution_name AS "schoolName",
       contact_person AS "contactName",
       designation,
       email,
       mobile_number AS "phone",
       city,
       state,
       institution_type AS "institutionType",
       student_count AS "studentCount",
       target_exam AS "targetExam",
       interested_package AS "interestedPackage",
       message,
       COALESCE(status, 'New Request') AS status,
       created_at AS "createdAt"
     FROM b2b_enquiries
     ORDER BY id DESC`
  );

  res.json({
    success: true,
    leads: leadsRes.rows,
  });
});

export const updateB2bEnquiryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    throw ApiError.badRequest('Status is required.');
  }

  const result = await query(
    `UPDATE b2b_enquiries 
     SET status = $1 
     WHERE id = $2 
     RETURNING id, reference_code AS "referenceCode", institution_name AS "schoolName", status`,
    [status, id]
  );

  if (result.rowCount === 0) {
    throw ApiError.notFound('Demo request lead not found.');
  }

  res.json({
    success: true,
    lead: result.rows[0],
    message: `Lead status updated to "${status}".`,
  });
});

export const deleteB2bEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM b2b_enquiries WHERE id = $1 RETURNING id', [id]);
  if (result.rowCount === 0) {
    throw ApiError.notFound('Demo request lead not found.');
  }
  res.json({ success: true, message: 'Demo request lead deleted successfully.' });
});

// Follow-up Notes Endpoints
export const getB2bEnquiryNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query(
    `SELECT id, lead_id AS "leadId", author, note_text AS "text", created_at AS "createdAt"
     FROM b2b_lead_notes
     WHERE lead_id = $1
     ORDER BY id DESC`,
    [id]
  );
  res.json({ success: true, notes: result.rows });
});

export const createB2bEnquiryNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { noteText, author } = req.body;

  if (!noteText || !noteText.trim()) {
    throw ApiError.badRequest('Note text is required.');
  }

  const result = await query(
    `INSERT INTO b2b_lead_notes (lead_id, author, note_text)
     VALUES ($1, $2, $3)
     RETURNING id, lead_id AS "leadId", author, note_text AS "text", created_at AS "createdAt"`,
    [id, author || 'Master Admin', noteText.trim()]
  );

  res.status(201).json({ success: true, note: result.rows[0] });
});

// Package Management Endpoints
export const getTestPackages = asyncHandler(async (_req, res) => {
  const result = await query('SELECT * FROM test_packages ORDER BY id ASC');
  res.json({ success: true, packages: result.rows });
});

export const getInstitutionPackages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query(
    `SELECT ip.id, ip.institution_id AS "institutionId", ip.package_id AS "packageId", ip.purchased_at AS "purchasedAt", ip.is_active AS "isActive",
            tp.package_name AS "packageName", tp.description, tp.price
     FROM institution_packages ip
     JOIN test_packages tp ON tp.id = ip.package_id
     WHERE ip.institution_id = $1
     ORDER BY ip.id DESC`,
    [id]
  );
  res.json({ success: true, packages: result.rows });
});

export const assignInstitutionPackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { packageId } = req.body;

  if (!packageId) {
    throw ApiError.badRequest('Package ID is required.');
  }

  const result = await query(
    `INSERT INTO institution_packages (institution_id, package_id, is_active)
     VALUES ($1, $2, TRUE)
     ON CONFLICT DO NOTHING
     RETURNING id`,
    [id, packageId]
  );

  res.status(201).json({ success: true, message: 'Package assigned to partner school successfully.' });
});

export const removeInstitutionPackage = asyncHandler(async (req, res) => {
  const { id, packageId } = req.params;
  await query('DELETE FROM institution_packages WHERE institution_id = $1 AND package_id = $2', [id, packageId]);
  res.json({ success: true, message: 'Package association removed successfully.' });
});

// Invoice Management Endpoints
export const createInstitutionInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { invoiceNumber, packageName, pricePerStudent, licenseQuantity, subtotal, gstAmount, totalAmount, paymentStatus } = req.body;

  const invNum = invoiceNumber || `EDV-B2B-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const result = await query(
    `INSERT INTO institution_invoices (
       institution_id, invoice_number, package_name, price_per_student, license_quantity, subtotal, gst_amount, total_amount, payment_status, pdf_url
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [
      id,
      invNum,
      packageName || 'NEET-UG 2027 AIETS One-Year Complete Package',
      Number(pricePerStudent) || 1999,
      Number(licenseQuantity) || 200,
      Number(subtotal) || 399800,
      Number(gstAmount) || 71964,
      Number(totalAmount) || 471764,
      paymentStatus || 'Paid',
      `/invoices/${invNum}.pdf`,
    ]
  );

  res.status(201).json({
    success: true,
    invoice: result.rows[0],
    message: `Tax Invoice ${invNum} generated and recorded in system database successfully.`,
  });
});

export const getInstitutionInvoices = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('SELECT * FROM institution_invoices WHERE institution_id = $1 ORDER BY id DESC', [id]);
  res.json({ success: true, invoices: result.rows });
});

// Student Allocation Endpoint
export const assignStudentInstitution = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { institutionId, batchId } = req.body;

  const instId = institutionId ? Number(institutionId) : null;
  const bId = batchId ? Number(batchId) : null;

  await query('UPDATE users SET institution_id = $1, batch_id = $2 WHERE id = $3 AND role = $4', [instId, bId, id, 'candidate']);
  await query('UPDATE student_profiles SET institution_id = $1 WHERE user_id = $2', [instId, id]).catch(() => {});

  res.json({ success: true, message: 'Student institution allocation updated successfully.' });
});

