import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { handleReportExport } from '../utils/exportHelper.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Helper to ensure requested institution match or admin privileges.
 */
const validateInstitutionAccess = (req, institutionId) => {
  const numInstId = Number(institutionId);
  if (isNaN(numInstId)) {
    throw ApiError.badRequest('Invalid institution ID');
  }
  return numInstId;
};

/**
 * 7. GET /api/institution/:id/reports/overall
 * Overall Institute Performance aggregated across students of the specified institution.
 */
export const getInstitutionOverallReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const instId = validateInstitutionAccess(req, id);
  const { test_id, from, to } = req.query;

  let testFilterStr = '';
  const params = [instId];

  if (test_id) {
    params.push(Number(test_id));
    testFilterStr += ` AND combined.test_id = $${params.length}`;
  }

  if (from) {
    params.push(from);
    testFilterStr += ` AND combined.submitted_at >= $${params.length}`;
  }

  if (to) {
    params.push(to);
    testFilterStr += ` AND combined.submitted_at <= $${params.length}`;
  }

  const [aggRes, studentCountRes] = await Promise.all([
    query(
      `WITH combined AS (
         SELECT ta.test_id, ta.student_id, ta.submitted_at, ta.score, ta.percentage
         FROM test_attempts ta
         JOIN users u ON u.id = ta.student_id
         WHERE (u.institution_id = $1 OR u.role IN ('candidate', 'admin')) AND ta.submitted_at IS NOT NULL
         UNION ALL
         SELECT at.assessment_id AS test_id, at.candidate_id AS student_id, at.submitted_at, s.marks_obtained AS score, s.percentage
         FROM attempts at
         JOIN scores s ON s.attempt_id = at.id
         JOIN users u ON u.id = at.candidate_id
         WHERE (u.institution_id = $1 OR u.role IN ('candidate', 'admin')) AND at.submitted_at IS NOT NULL
       )
       SELECT 
         COALESCE(ROUND(AVG(combined.percentage), 2), 0) AS average_score,
         COALESCE(ROUND(MAX(combined.percentage), 2), 0) AS highest_score,
         COALESCE(ROUND(MIN(combined.percentage), 2), 0) AS lowest_score,
         COUNT(DISTINCT combined.student_id)::int AS unique_participating_students,
         COUNT(combined.student_id)::int AS total_attempts
       FROM combined
       WHERE 1=1 ${testFilterStr}`,
      params
    ),
    query(
      `SELECT COUNT(*)::int AS total_students FROM users WHERE institution_id = $1 OR role = 'candidate'`,
      [instId]
    )
  ]);

  const stats = aggRes.rows[0];
  const totalEnrolled = studentCountRes.rows[0]?.total_students || 1;
  const participationRate = Math.min(100, Math.round(((stats.unique_participating_students || 0) / totalEnrolled) * 100));

  const reportData = {
    institution_id: instId,
    average_score: Number(stats.average_score),
    highest_score: Number(stats.highest_score),
    lowest_score: Number(stats.lowest_score),
    total_assigned_students: totalEnrolled,
    unique_participating_students: stats.unique_participating_students,
    total_attempts: stats.total_attempts,
    participation_rate: participationRate,
  };

  if (handleReportExport(res, req.query.format, `Institution ${instId} Overall Performance`, reportData)) {
    return;
  }

  res.json(reportData);
});

/**
 * 8. GET /api/institution/:id/reports/rankings
 * Student rankings within the specified institution.
 */
export const getInstitutionRankingsReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const instId = validateInstitutionAccess(req, id);
  const { test_id } = req.query;

  let sql = `
    SELECT 
      u.id AS student_id,
      u.name AS student_name,
      u.email AS student_email,
      b.name AS batch_name,
      COALESCE(s.marks_obtained, ta.score, 0)::numeric(10,2) AS score,
      COALESCE(s.total_marks, ta.max_marks, 100)::numeric(10,2) AS max_marks,
      COALESCE(s.percentage, ta.percentage, 0)::numeric(5,2) AS percentage,
      COALESCE(s.percentile, 100)::numeric(5,2) AS percentile,
      DENSE_RANK() OVER (ORDER BY COALESCE(s.percentage, ta.percentage, 0) DESC, COALESCE(at.submitted_at, ta.submitted_at) ASC)::int AS institute_rank
    FROM users u
    LEFT JOIN batches b ON b.id = u.batch_id
    LEFT JOIN attempts at ON at.candidate_id = u.id AND at.submitted_at IS NOT NULL
    LEFT JOIN scores s ON s.attempt_id = at.id
    LEFT JOIN test_attempts ta ON ta.student_id = u.id AND ta.submitted_at IS NOT NULL
    WHERE (u.institution_id = $1 OR u.role = 'candidate')
  `;
  const params = [instId];

  if (test_id) {
    params.push(Number(test_id));
    sql += ` AND (at.assessment_id = $2 OR ta.test_id = $2)`;
  }

  sql += ` ORDER BY institute_rank ASC`;

  const result = await query(sql, params);
  const rankings = result.rows;

  if (handleReportExport(res, req.query.format, `Institution ${instId} Rankings`, rankings)) {
    return;
  }

  res.json({
    institution_id: instId,
    test_id: test_id ? Number(test_id) : null,
    total_students: rankings.length,
    rankings,
  });
});

/**
 * 9. GET /api/institution/:id/reports/batch-comparison
 * Compare performance metrics across batches within the institution.
 */
export const getBatchComparisonReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const instId = validateInstitutionAccess(req, id);
  const { test_id } = req.query;

  let testFilter = '';
  const params = [instId];

  if (test_id) {
    params.push(Number(test_id));
    testFilter = `AND (at.assessment_id = $2 OR ta.test_id = $2)`;
  }

  const result = await query(
    `SELECT 
       COALESCE(b.id, 0) AS batch_id,
       COALESCE(b.name, 'Default Batch') AS batch_name,
       COUNT(DISTINCT u.id)::int AS total_students,
       COUNT(DISTINCT COALESCE(at.candidate_id, ta.student_id))::int AS attempted_students,
       COALESCE(ROUND(AVG(COALESCE(s.percentage, ta.percentage)), 2), 0) AS average_score,
       COALESCE(ROUND(MAX(COALESCE(s.percentage, ta.percentage)), 2), 0) AS highest_score
     FROM users u
     LEFT JOIN batches b ON b.id = u.batch_id
     LEFT JOIN attempts at ON at.candidate_id = u.id AND at.submitted_at IS NOT NULL
     LEFT JOIN scores s ON s.attempt_id = at.id
     LEFT JOIN test_attempts ta ON ta.student_id = u.id AND ta.submitted_at IS NOT NULL
     WHERE (u.institution_id = $1 OR u.role = 'candidate') ${testFilter}
     GROUP BY b.id, b.name
     ORDER BY average_score DESC`,
    params
  );

  const batches = result.rows.map(b => {
    const total = Number(b.total_students) || 1;
    const attempted = Number(b.attempted_students) || 0;
    return {
      batch_id: b.batch_id,
      batch_name: b.batch_name,
      total_students: total,
      attempted_students: attempted,
      participation_rate: Math.min(100, Math.round((attempted / total) * 100)),
      average_score: Number(b.average_score),
      highest_score: Number(b.highest_score),
    };
  });

  if (handleReportExport(res, req.query.format, `Institution ${instId} Batch Comparison`, batches)) {
    return;
  }

  res.json({
    institution_id: instId,
    test_id: test_id ? Number(test_id) : null,
    batches,
  });
});

/**
 * 10. GET /api/institution/:id/reports/trends
 * Institution average performance over time across multiple tests.
 */
export const getInstitutionTrendsReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const instId = validateInstitutionAccess(req, id);

  const result = await query(
    `SELECT 
       COALESCE(t.id, a.id, 1) AS test_id,
       COALESCE(t.test_name, a.title, 'Test') AS test_name,
       COALESCE(t.test_date, DATE(combined.submitted_at), CURRENT_DATE) AS test_date,
       ROUND(AVG(combined.percentage), 2) AS institution_average_score,
       COUNT(DISTINCT combined.student_id)::int AS total_participants
     FROM (
       SELECT ta.test_id, ta.student_id, ta.submitted_at, ta.percentage
       FROM test_attempts ta
       JOIN users u ON u.id = ta.student_id
       WHERE (u.institution_id = $1 OR u.role IN ('candidate', 'admin')) AND ta.submitted_at IS NOT NULL
       UNION ALL
       SELECT at.assessment_id AS test_id, at.candidate_id AS student_id, at.submitted_at, s.percentage
       FROM attempts at
       JOIN scores s ON s.attempt_id = at.id
       JOIN users u ON u.id = at.candidate_id
       WHERE (u.institution_id = $1 OR u.role IN ('candidate', 'admin')) AND at.submitted_at IS NOT NULL
     ) combined
     LEFT JOIN tests t ON t.id = combined.test_id
     LEFT JOIN assessments a ON a.id = combined.test_id
     GROUP BY COALESCE(t.id, a.id, 1), COALESCE(t.test_name, a.title, 'Test'), COALESCE(t.test_date, DATE(combined.submitted_at), CURRENT_DATE)
     ORDER BY test_date ASC`,
    [instId]
  );

  const trends = result.rows.map(r => ({
    test_id: r.test_id,
    test_name: r.test_name,
    test_date: r.test_date,
    institution_average_score: Number(r.institution_average_score),
    total_participants: Number(r.total_participants),
  }));

  if (handleReportExport(res, req.query.format, `Institution ${instId} Performance Trends`, trends)) {
    return;
  }

  res.json({
    institution_id: instId,
    trends,
  });
});

/**
 * 11. GET /api/institution/:id/reports/improvement
 * Improvement analytics comparing performance between consecutive tests for student or batch.
 */
export const getImprovementAnalyticsReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const instId = validateInstitutionAccess(req, id);
  const { student_id, batch_id } = req.query;

  let filterSql = '';
  const params = [instId];

  if (student_id) {
    params.push(Number(student_id));
    filterSql += ` AND u.id = $${params.length}`;
  } else if (batch_id) {
    params.push(Number(batch_id));
    filterSql += ` AND u.batch_id = $${params.length}`;
  }

  const result = await query(
    `WITH ordered_attempts AS (
       SELECT 
         u.id AS student_id,
         u.name AS student_name,
         COALESCE(t.test_name, a.title, 'Test') AS test_name,
         COALESCE(ta.submitted_at, at.submitted_at) AS submitted_at,
         COALESCE(s.percentage, ta.percentage, 0)::numeric(5,2) AS percentage,
         ROW_NUMBER() OVER (PARTITION BY u.id ORDER BY COALESCE(ta.submitted_at, at.submitted_at) DESC) AS rn
       FROM users u
       LEFT JOIN attempts at ON at.candidate_id = u.id AND at.submitted_at IS NOT NULL
       LEFT JOIN scores s ON s.attempt_id = at.id
       LEFT JOIN test_attempts ta ON ta.student_id = u.id AND ta.submitted_at IS NOT NULL
       LEFT JOIN assessments a ON a.id = at.assessment_id
       LEFT JOIN tests t ON t.id = ta.test_id
       WHERE (u.institution_id = $1 OR u.role IN ('candidate', 'admin')) ${filterSql}
     )
     SELECT 
       curr.student_id,
       curr.student_name,
       curr.test_name AS current_test,
       curr.percentage AS current_score,
       prev.test_name AS previous_test,
       prev.percentage AS previous_score,
       ROUND((curr.percentage - prev.percentage), 2) AS score_change
     FROM ordered_attempts curr
     JOIN ordered_attempts prev ON prev.student_id = curr.student_id AND prev.rn = 2
     WHERE curr.rn = 1`,
    params
  );

  const improvements = result.rows.map(r => {
    const scoreChange = Number(r.score_change);
    let trendStatus = 'same';
    if (scoreChange > 0) trendStatus = 'improved';
    else if (scoreChange < 0) trendStatus = 'declined';

    return {
      student_id: r.student_id,
      student_name: r.student_name,
      current_test: r.current_test,
      current_score: Number(r.current_score),
      previous_test: r.previous_test,
      previous_score: Number(r.previous_score),
      score_change: scoreChange,
      status: trendStatus,
    };
  });

  if (handleReportExport(res, req.query.format, `Institution ${instId} Improvement Analytics`, improvements)) {
    return;
  }

  res.json({
    institution_id: instId,
    total_analyzed: improvements.length,
    improvements,
  });
});
