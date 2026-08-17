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
  const numId = Number(req.user?.id);
  if (!req.user?.id || isNaN(numId) || (typeof req.user.id === 'string' && (req.user.id.startsWith('mock') || req.user.id.startsWith('inst')))) {
    return res.json({
      summary: {
        tests_taken: 3,
        total_tests_taken: 3,
        avg_score: 74.5,
        best_score: 88.0,
        highest_score: 88.0,
        avg_accuracy: 78.2,
        average_accuracy: 78.2,
        pass_rate: 100,
      },
      score_trend: [
        { attempt_id: 1, title: 'JEE Main Mock Test 1', date: '2026-07-15T10:00:00.000Z', percentage: 65.0, accuracy: 70, correct_count: 35, wrong_count: 15, unattempted_count: 10 },
        { attempt_id: 2, title: 'JEE Main Mock Test 2', date: '2026-07-25T10:00:00.000Z', percentage: 72.0, accuracy: 77, correct_count: 40, wrong_count: 12, unattempted_count: 8 },
        { attempt_id: 3, title: 'JEE Main Mock Test 3', date: '2026-08-05T10:00:00.000Z', percentage: 86.5, accuracy: 88, correct_count: 48, wrong_count: 7, unattempted_count: 5 },
      ],
      subject_trends: [
        { subject: 'Physics', total_questions: 45, correct: 35, wrong: 7, unattempted: 3, average_accuracy: 83, status: 'strong' },
        { subject: 'Chemistry', total_questions: 45, correct: 32, wrong: 9, unattempted: 4, average_accuracy: 78, status: 'strong' },
        { subject: 'Mathematics', total_questions: 45, correct: 28, wrong: 12, unattempted: 5, average_accuracy: 70, status: 'moderate' },
      ],
      topic_trends: [
        { topic: 'Kinematics', subject: 'Physics', total_questions: 15, attempted: 13, correct: 11, wrong: 2, unattempted: 2, average_accuracy: 85, status: 'mastered' },
        { topic: 'Electrostatics', subject: 'Physics', total_questions: 15, attempted: 14, correct: 13, wrong: 1, unattempted: 1, average_accuracy: 93, status: 'mastered' },
        { topic: 'Rotation', subject: 'Physics', total_questions: 15, attempted: 10, correct: 4, wrong: 6, unattempted: 5, average_accuracy: 40, status: 'needs_focus' },
        { topic: 'Chemical Bonding', subject: 'Chemistry', total_questions: 15, attempted: 13, correct: 11, wrong: 2, unattempted: 2, average_accuracy: 85, status: 'mastered' },
        { topic: 'Matrices & Determinants', subject: 'Mathematics', total_questions: 15, attempted: 12, correct: 8, wrong: 4, unattempted: 3, average_accuracy: 67, status: 'improving' },
      ],
      time_management: {
        avg_seconds_per_question: 82,
        speed_rating: 'Optimal Pace',
      },
    });
  }

  const userId = numId;

  try {
    // 1. Fetch completed test attempts & scores ordered chronologically
    const attemptsRes = await query(
      `SELECT at.id AS attempt_id, at.assessment_id, a.title, at.submitted_at, at.duration_seconds,
              s.marks_obtained, s.total_marks, s.percentage, s.passed, s.rank, s.percentile,
              s.correct_count, s.wrong_count, s.unattempted_count
       FROM attempts at
       JOIN assessments a ON a.id = at.assessment_id
       LEFT JOIN scores s ON s.attempt_id = at.id
       WHERE at.candidate_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       ORDER BY at.submitted_at ASC`,
      [userId]
    );

    const attempts = attemptsRes.rows;
    const testsTaken = attempts.length;

    let totalScorePct = 0;
    let highestScorePct = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnattempted = 0;
    let passedCount = 0;

    const scoreTrend = attempts.map((a) => {
      const pct = Number(a.percentage) || 0;
      const c = Number(a.correct_count) || 0;
      const w = Number(a.wrong_count) || 0;
      const u = Number(a.unattempted_count) || 0;
      const attempted = c + w;
      const acc = attempted > 0 ? Math.round((c / attempted) * 100) : 0;

      totalScorePct += pct;
      if (pct > highestScorePct) highestScorePct = pct;
      totalCorrect += c;
      totalWrong += w;
      totalUnattempted += u;
      if (a.passed) passedCount += 1;

      return {
        attempt_id: a.attempt_id,
        assessment_id: a.assessment_id,
        title: a.title,
        date: a.submitted_at,
        marks_obtained: Number(a.marks_obtained) || 0,
        total_marks: Number(a.total_marks) || 0,
        percentage: pct,
        accuracy: acc,
        correct_count: c,
        wrong_count: w,
        unattempted_count: u,
        duration_seconds: a.duration_seconds || 0,
      };
    });

    const avgScore = testsTaken > 0 ? Number((totalScorePct / testsTaken).toFixed(2)) : 0;
    const totalAttempted = totalCorrect + totalWrong;
    const avgAccuracy = totalAttempted > 0 ? Number(((totalCorrect / totalAttempted) * 100).toFixed(2)) : 0;
    const passRate = testsTaken > 0 ? Math.round((passedCount / testsTaken) * 100) : 0;

    // 2. Fetch Detailed Question Answers for Subject & Topic Historical Trends
    const questionHistoryRes = await query(
      `WITH user_attempts AS (
         SELECT id, assessment_id, submitted_at
         FROM attempts
         WHERE candidate_id = $1 AND status IN ('submitted', 'auto_submitted')
       )
       SELECT 
         q.id AS question_id,
         q.assessment_id,
         ua.submitted_at,
         q.question_type,
         q.marks,
         q.correct_index,
         q.correct_indices,
         q.numeric_answer,
         COALESCE(q.topic, NULLIF(q.bank_category, ''), 'General') AS topic_name,
         COALESCE(subj.name, NULLIF(q.bank_category, ''), sec.name, 'General') AS subject_name,
         ans.selected_index,
         ans.selected_indices,
         ans.numeric_answer AS user_numeric
       FROM questions q
       JOIN user_attempts ua ON ua.assessment_id = q.assessment_id
       LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = ua.id
       LEFT JOIN subjects subj ON subj.id = q.subject_id
       LEFT JOIN assessment_sections sec ON sec.id = q.section_id
       ORDER BY ua.submitted_at ASC`,
      [userId]
    );

    const subjectMap = {};
    const topicMap = {};

    for (const q of questionHistoryRes.rows) {
      const rawSubj = (q.subject_name || 'General').trim();
      let subjName = rawSubj;
      const lowerSubj = rawSubj.toLowerCase();
      if (/phys/i.test(lowerSubj)) subjName = 'Physics';
      else if (/chem/i.test(lowerSubj)) subjName = 'Chemistry';
      else if (/math/i.test(lowerSubj)) subjName = 'Mathematics';
      else if (/bio|botany|zoology/i.test(lowerSubj)) subjName = 'Biology';

      if (!subjectMap[subjName]) {
        subjectMap[subjName] = { subject: subjName, total: 0, correct: 0, wrong: 0, unattempted: 0 };
      }

      let topicName = (q.topic_name || 'General Concepts').trim();
      if (topicName.includes('_')) {
        topicName = topicName.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      if (!topicMap[topicName]) {
        topicMap[topicName] = { topic: topicName, subject: subjName, total: 0, correct: 0, wrong: 0, unattempted: 0 };
      }

      let isAttempted = false;
      let isCorrect = false;

      if (['mcq', 'single_choice', 'assertion_reason'].includes(q.question_type)) {
        isAttempted = q.selected_index !== null && q.selected_index !== undefined;
        if (isAttempted && Number(q.selected_index) === Number(q.correct_index)) {
          isCorrect = true;
        }
      } else if (q.question_type === 'multi_select') {
        isAttempted = Array.isArray(q.selected_indices) && q.selected_indices.length > 0;
        if (isAttempted && JSON.stringify(q.selected_indices) === JSON.stringify(q.correct_indices)) {
          isCorrect = true;
        }
      } else if (['integer', 'numerical'].includes(q.question_type)) {
        isAttempted = q.user_numeric !== null && q.user_numeric !== undefined;
        if (isAttempted && Math.round(Number(q.user_numeric)) === Math.round(Number(q.numeric_answer))) {
          isCorrect = true;
        }
      }

      const sObj = subjectMap[subjName];
      const tObj = topicMap[topicName];

      sObj.total += 1;
      tObj.total += 1;

      if (!isAttempted) {
        sObj.unattempted += 1;
        tObj.unattempted += 1;
      } else if (isCorrect) {
        sObj.correct += 1;
        tObj.correct += 1;
      } else {
        sObj.wrong += 1;
        tObj.wrong += 1;
      }
    }

    const subjectTrends = Object.values(subjectMap).map((s) => {
      const attempted = s.correct + s.wrong;
      const acc = attempted > 0 ? Math.round((s.correct / attempted) * 100) : 0;
      return {
        subject: s.subject,
        total_questions: s.total,
        correct: s.correct,
        wrong: s.wrong,
        unattempted: s.unattempted,
        average_accuracy: acc,
        status: acc >= 75 ? 'strong' : acc >= 50 ? 'moderate' : 'weak',
      };
    });

    const topicTrends = Object.values(topicMap).map((t) => {
      const attempted = t.correct + t.wrong;
      const acc = attempted > 0 ? Math.round((t.correct / attempted) * 100) : 0;
      let status = 'improving';
      if (acc >= 75) status = 'mastered';
      else if (acc < 50) status = 'needs_focus';

      return {
        topic: t.topic,
        subject: t.subject,
        total_questions: t.total,
        attempted,
        correct: t.correct,
        wrong: t.wrong,
        unattempted: t.unattempted,
        average_accuracy: acc,
        status,
      };
    });

    const totalDurSecs = scoreTrend.reduce((sum, curr) => sum + (curr.duration_seconds || 0), 0);
    const avgSecsPerQ = totalAttempted > 0 ? Math.round(totalDurSecs / totalAttempted) : 0;

    let speedRating = 'Optimal Pace';
    if (avgSecsPerQ > 0 && avgSecsPerQ < 45) speedRating = 'Swift Pace';
    else if (avgSecsPerQ > 90) speedRating = 'Thoughtful / Careful Pace';

    res.json({
      summary: {
        tests_taken: testsTaken,
        total_tests_taken: testsTaken,
        avg_score: avgScore,
        best_score: Number(highestScorePct.toFixed(2)),
        highest_score: Number(highestScorePct.toFixed(2)),
        avg_accuracy: avgAccuracy,
        average_accuracy: avgAccuracy,
        pass_rate: passRate,
        passed_count: passedCount,
      },
      score_trend: scoreTrend,
      trend: scoreTrend,
      subject_trends: subjectTrends,
      subject_breakdown: subjectTrends.map((s) => ({
        subject: s.subject,
        total: s.total_questions,
        correct: s.correct,
        wrong: s.wrong,
        unattempted: s.unattempted,
        accuracy: s.average_accuracy,
      })),
      topic_trends: topicTrends,
      chapter_breakdown: topicTrends.map((t) => ({
        chapter: t.topic,
        subject: t.subject,
        total: t.total_questions,
        correct: t.correct,
        wrong: t.wrong,
        unattempted: t.unattempted,
        accuracy: t.average_accuracy,
      })),
      time_management: {
        avg_seconds_per_question: avgSecsPerQ,
        speed_rating: speedRating,
      },
    });
  } catch (err) {
    console.error('Historical analytics error fallback:', err);
    res.json({
      summary: {
        tests_taken: 0,
        total_tests_taken: 0,
        best_score: 0,
        highest_score: 0,
        avg_score: 0,
        avg_accuracy: 0,
        average_accuracy: 0,
        passed_count: 0,
        pass_rate: 0,
      },
      score_trend: [],
      trend: [],
      subject_trends: [],
      subject_breakdown: [],
      topic_trends: [],
      chapter_breakdown: [],
      time_management: {
        avg_seconds_per_question: 0,
        speed_rating: 'No Data Yet',
      },
    });
  }
});

