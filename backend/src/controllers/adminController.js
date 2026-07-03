import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { toCsvRow } from '../utils/csvQuestions.js';

export const getStats = asyncHandler(async (_req, res) => {
  const [candidates, assessments, attempts, scores, invites, violations] = await Promise.all([
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

  res.json({
    totalCandidates: candidates.rows[0].c,
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
    SELECT u.id, u.name, u.email, u.created_at,
           COUNT(DISTINCT ci.id)::int AS invites,
           COUNT(DISTINCT a.id)::int AS attempts,
           COUNT(DISTINCT a.id) FILTER (WHERE a.status <> 'in_progress')::int AS completed,
           COALESCE(ROUND(AVG(s.percentage), 1), 0) AS avg_score
    FROM users u
    LEFT JOIN candidate_invites ci ON ci.candidate_email = u.email
    LEFT JOIN attempts a ON a.candidate_id = u.id
    LEFT JOIN scores s ON s.attempt_id = a.id
    WHERE u.role = 'candidate'
    GROUP BY u.id
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

export const exportReports = asyncHandler(async (_req, res) => {
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

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="attempt_reports.csv"');
  res.send(lines.join('\n'));
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
