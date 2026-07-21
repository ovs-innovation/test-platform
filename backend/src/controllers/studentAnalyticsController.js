import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * GET /api/student/analytics
 */
export const studentAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const [attempts, enrollments, scores] = await Promise.all([
    query(
      `SELECT a.id, a.title, at.submitted_at, at.violation_count, at.duration_seconds,
              (SELECT COUNT(*)::int FROM questions WHERE assessment_id = a.id) AS total_questions,
              s.marks_obtained, s.total_marks, s.percentage, s.passed, s.rank, s.percentile,
              s.correct_count, s.wrong_count, s.unattempted_count
       FROM attempts at
       JOIN assessments a ON a.id = at.assessment_id
       LEFT JOIN scores s ON s.attempt_id = at.id
       WHERE at.candidate_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       ORDER BY at.submitted_at DESC`,
      [userId]
    ),
    query(
      `SELECT COUNT(*)::int AS c FROM student_enrollments WHERE user_id = $1 AND status = 'active' AND expires_at > NOW()`,
      [userId]
    ),
    query(
      `SELECT COALESCE(AVG(percentage),0)::numeric(5,2) AS avg_score,
              COALESCE(MAX(percentage),0)::numeric(5,2) AS best_score,
              COUNT(*)::int AS tests_taken,
              COUNT(*) FILTER (WHERE passed)::int AS passed_count
       FROM scores s
       JOIN attempts at ON at.id = s.attempt_id
       WHERE at.candidate_id = $1`,
      [userId]
    ),
  ]);

  const recent = attempts.rows.slice(0, 10);
  const trend = recent
    .slice()
    .reverse()
    .map((a) => {
      const attempted = (Number(a.correct_count) || 0) + (Number(a.wrong_count) || 0);
      const accuracy = attempted > 0 ? Math.round(((Number(a.correct_count) || 0) / attempted) * 100) : 0;
      return {
        date: a.submitted_at,
        percentage: Number(a.percentage) || 0,
        title: a.title,
        accuracy,
        duration_seconds: a.duration_seconds || 0,
        total_questions: a.total_questions || 0,
      };
    });

  const [subjectBreakdown, chapterBreakdown] = await Promise.all([
    query(
      `SELECT COALESCE(s.name, q.bank_category, 'General') AS subject,
              COUNT(*)::int AS total,
              COUNT(*) FILTER (WHERE ans.selected_index = q.correct_index OR
                (q.question_type = 'multi_select' AND ans.selected_indices::text = q.correct_indices::text))::int AS correct
       FROM questions q
       JOIN attempts at ON at.assessment_id = q.assessment_id
       LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = at.id
       LEFT JOIN subjects s ON s.id = q.subject_id
       WHERE at.candidate_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       GROUP BY COALESCE(s.name, q.bank_category, 'General')
       ORDER BY subject`,
      [userId]
    ),
    query(
      `SELECT COALESCE(c.name, 'General') AS chapter,
              COALESCE(s.name, q.bank_category, 'General') AS subject,
              COUNT(*)::int AS total,
              COUNT(*) FILTER (WHERE ans.selected_index = q.correct_index OR
                (q.question_type = 'multi_select' AND ans.selected_indices::text = q.correct_indices::text))::int AS correct
       FROM questions q
       JOIN attempts at ON at.assessment_id = q.assessment_id
       LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = at.id
       LEFT JOIN chapters c ON c.id = q.chapter_id
       LEFT JOIN subjects s ON s.id = q.subject_id
       WHERE at.candidate_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       GROUP BY COALESCE(c.name, 'General'), COALESCE(s.name, q.bank_category, 'General')
       ORDER BY chapter`,
      [userId]
    )
  ]);

  res.json({
    summary: {
      ...scores.rows[0],
      active_enrollments: enrollments.rows[0].c,
      pass_rate:
        scores.rows[0].tests_taken > 0
          ? Math.round((scores.rows[0].passed_count / scores.rows[0].tests_taken) * 100)
          : 0,
    },
    attempts: attempts.rows,
    trend,
    subject_breakdown: subjectBreakdown.rows.map((r) => ({
      subject: r.subject,
      total: r.total,
      correct: r.correct,
      accuracy: r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0,
    })),
    chapter_breakdown: chapterBreakdown.rows.map((r) => ({
      chapter: r.chapter,
      subject: r.subject,
      total: r.total,
      correct: r.correct,
      accuracy: r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0,
    })),
  });
});
