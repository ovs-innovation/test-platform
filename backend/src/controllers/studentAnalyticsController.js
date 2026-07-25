import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * GET /api/student/analytics
 * Returns comprehensive performance analytics including:
 * 1. Subject-wise performance
 * 2. Chapter-wise performance
 * 3. Accuracy graph data
 * 4. Score improvement graph data
 * 5. Time management analysis
 * 6. Weak chapters (<60% accuracy)
 * 7. Strong chapters (>=60% accuracy)
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
      const correct = Number(a.correct_count) || 0;
      const wrong = Number(a.wrong_count) || 0;
      const attempted = correct + wrong;
      const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
      return {
        date: a.submitted_at,
        percentage: Number(a.percentage) || 0,
        title: a.title,
        accuracy,
        duration_seconds: a.duration_seconds || 0,
        total_questions: a.total_questions || 0,
        correct_count: correct,
        wrong_count: wrong,
        unattempted_count: Number(a.unattempted_count) || 0,
      };
    });

  const [subjectBreakdown, chapterBreakdown] = await Promise.all([
    query(
      `WITH normalized_data AS (
         SELECT 
           q.id AS question_id,
           at.candidate_id,
           ans.id AS answer_id,
           ans.selected_index,
           ans.selected_indices,
           q.correct_index,
           q.correct_indices,
           q.question_type,
           CASE 
             WHEN s.name IN ('Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Aptitude') THEN s.name
             WHEN cs.name IN ('Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Aptitude') THEN cs.name
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(mechanic|thermo|optic|electro|magnet|physic|kinematic|gravitat|wave|fluid|work energy|motion|rotation|unit|measurement)%' THEN 'Physics'
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(chem|organic|inorganic|acid|base|element|bond|atom|mole|solution|equilibrium|period|biomolecule|kinetics|electrochem)%' THEN 'Chemistry'
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(math|algebra|calculus|trigonomet|geometr|matrix|determinant|vector|integral|derivative|limit|function|probability|stat|coordinate)%' THEN 'Mathematics'
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(bio|botany|zoology|physiol|genetics|cell|plant|human|ecolog|evolution|anatomy|reproduction|diversity)%' THEN 'Biology'
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(aptitude|reasoning|logic|verbal|english|mental|data interpretation)%' THEN 'General Aptitude'
             ELSE COALESCE(s.name, cs.name, 'Physics')
           END AS subject
         FROM questions q
         JOIN attempts at ON at.assessment_id = q.assessment_id
         LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = at.id
         LEFT JOIN subjects s ON s.id = q.subject_id
         LEFT JOIN chapters c ON c.id = q.chapter_id
         LEFT JOIN subjects cs ON cs.id = c.subject_id
         LEFT JOIN assessment_sections sec ON sec.id = q.section_id
         WHERE at.candidate_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       )
       SELECT subject,
              COUNT(*)::int AS total,
              COUNT(*) FILTER (WHERE (selected_index IS NOT NULL AND selected_index = correct_index) OR
                (question_type = 'multi_select' AND selected_indices::text = correct_indices::text) OR
                (question_type IN ('integer', 'numerical') AND selected_index::text = correct_index::text))::int AS correct,
              COUNT(*) FILTER (WHERE answer_id IS NOT NULL AND (selected_index IS NOT NULL OR selected_indices IS NOT NULL) AND NOT (
                (selected_index = correct_index) OR
                (question_type = 'multi_select' AND selected_indices::text = correct_indices::text) OR
                (question_type IN ('integer', 'numerical') AND selected_index::text = correct_index::text)
              ))::int AS wrong
       FROM normalized_data
       GROUP BY subject
       ORDER BY subject`,
      [userId]
    ),
    query(
      `WITH normalized_data AS (
         SELECT 
           q.id AS question_id,
           at.candidate_id,
           ans.id AS answer_id,
           ans.selected_index,
           ans.selected_indices,
           q.correct_index,
           q.correct_indices,
           q.question_type,
           COALESCE(c.name, NULLIF(q.bank_category, ''), 'General Topics') AS chapter,
           CASE 
             WHEN s.name IN ('Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Aptitude') THEN s.name
             WHEN cs.name IN ('Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Aptitude') THEN cs.name
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(mechanic|thermo|optic|electro|magnet|physic|kinematic|gravitat|wave|fluid|work energy|motion|rotation|unit|measurement)%' THEN 'Physics'
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(chem|organic|inorganic|acid|base|element|bond|atom|mole|solution|equilibrium|period|biomolecule|kinetics|electrochem)%' THEN 'Chemistry'
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(math|algebra|calculus|trigonomet|geometr|matrix|determinant|vector|integral|derivative|limit|function|probability|stat|coordinate)%' THEN 'Mathematics'
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(bio|botany|zoology|physiol|genetics|cell|plant|human|ecolog|evolution|anatomy|reproduction|diversity)%' THEN 'Biology'
             WHEN LOWER(COALESCE(q.bank_category, c.name, sec.name, s.name, '')) SIMILAR TO '%(aptitude|reasoning|logic|verbal|english|mental|data interpretation)%' THEN 'General Aptitude'
             ELSE COALESCE(s.name, cs.name, 'Physics')
           END AS subject
         FROM questions q
         JOIN attempts at ON at.assessment_id = q.assessment_id
         LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = at.id
         LEFT JOIN subjects s ON s.id = q.subject_id
         LEFT JOIN chapters c ON c.id = q.chapter_id
         LEFT JOIN subjects cs ON cs.id = c.subject_id
         LEFT JOIN assessment_sections sec ON sec.id = q.section_id
         WHERE at.candidate_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       )
       SELECT chapter,
              subject,
              COUNT(*)::int AS total,
              COUNT(*) FILTER (WHERE (selected_index IS NOT NULL AND selected_index = correct_index) OR
                (question_type = 'multi_select' AND selected_indices::text = correct_indices::text) OR
                (question_type IN ('integer', 'numerical') AND selected_index::text = correct_index::text))::int AS correct,
              COUNT(*) FILTER (WHERE answer_id IS NOT NULL AND (selected_index IS NOT NULL OR selected_indices IS NOT NULL) AND NOT (
                (selected_index = correct_index) OR
                (question_type = 'multi_select' AND selected_indices::text = correct_indices::text) OR
                (question_type IN ('integer', 'numerical') AND selected_index::text = correct_index::text)
              ))::int AS wrong
       FROM normalized_data
       GROUP BY chapter, subject
       ORDER BY chapter`,
      [userId]
    ),
  ]);

  // Compute Time Management Metrics
  let totalTimeSecs = 0;
  let totalQCount = 0;
  let totalAttemptedCount = 0;

  for (const a of attempts.rows) {
    totalTimeSecs += Number(a.duration_seconds) || 0;
    totalQCount += Number(a.total_questions) || 0;
    totalAttemptedCount += (Number(a.correct_count) || 0) + (Number(a.wrong_count) || 0);
  }

  const avgSecsPerQ = totalQCount > 0 ? Math.round(totalTimeSecs / totalQCount) : 0;
  const avgSecsPerAttemptedQ = totalAttemptedCount > 0 ? Math.round(totalTimeSecs / totalAttemptedCount) : 0;
  const avgSecsPerTest = attempts.rows.length > 0 ? Math.round(totalTimeSecs / attempts.rows.length) : 0;

  let speedRating = 'Optimal Pace';
  if (avgSecsPerQ > 0 && avgSecsPerQ < 45) {
    speedRating = 'Swift Pace';
  } else if (avgSecsPerQ > 90) {
    speedRating = 'Thoughtful / Careful Pace';
  }

  const timeManagement = {
    total_time_seconds: totalTimeSecs,
    total_questions: totalQCount,
    total_attempted: totalAttemptedCount,
    avg_seconds_per_question: avgSecsPerQ,
    avg_seconds_per_attempted_question: avgSecsPerAttemptedQ,
    avg_seconds_per_test: avgSecsPerTest,
    speed_rating: speedRating,
    test_breakdown: attempts.rows.map((a) => {
      const qCount = Number(a.total_questions) || 0;
      const dur = Number(a.duration_seconds) || 0;
      return {
        id: a.id,
        title: a.title,
        date: a.submitted_at,
        duration_seconds: dur,
        total_questions: qCount,
        seconds_per_question: qCount > 0 ? Math.round(dur / qCount) : 0,
      };
    }),
  };

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
    subject_breakdown: subjectBreakdown.rows.map((r) => {
      const wrong = Number(r.wrong) || 0;
      const correct = Number(r.correct) || 0;
      const total = Number(r.total) || 0;
      const unattempted = Math.max(0, total - (correct + wrong));
      const attempted = correct + wrong;
      return {
        subject: r.subject,
        total,
        correct,
        wrong,
        unattempted,
        accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : (total > 0 ? Math.round((correct / total) * 100) : 0),
      };
    }),
    chapter_breakdown: chapterBreakdown.rows.map((r) => {
      const wrong = Number(r.wrong) || 0;
      const correct = Number(r.correct) || 0;
      const total = Number(r.total) || 0;
      const unattempted = Math.max(0, total - (correct + wrong));
      const attempted = correct + wrong;
      return {
        chapter: r.chapter,
        subject: r.subject,
        total,
        correct,
        wrong,
        unattempted,
        accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : (total > 0 ? Math.round((correct / total) * 100) : 0),
      };
    }),
    time_management: timeManagement,
  });
});

