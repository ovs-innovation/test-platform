import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { generateExamMentorStrategyReport } from '../services/geminiService.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load improvement plan templates
let templates = {};
try {
  const templatePath = path.join(__dirname, '../config/improvementTemplates.json');
  templates = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
} catch {
  templates = {
    general: {
      weak_topic_template: "Focus on {chapter} — your accuracy is {accuracy}%, class average is {class_avg}%. Recommended: revise NCERT chapter concepts + attempt 20 practice questions this week."
    }
  };
}

/**
 * GET /api/student/analytics/:test_id
 * Single consolidated endpoint returning all post-test performance analytics & predictions.
 */
export const getPostTestAnalytics = asyncHandler(async (req, res) => {
  const studentId = Number(req.user?.id);
  const testId = Number(req.params.test_id);

  if (!studentId || isNaN(studentId)) {
    throw ApiError.unauthorized('Invalid student session');
  }
  if (!testId || isNaN(testId)) {
    throw ApiError.badRequest('Invalid test ID parameter');
  }

  // 1. Fetch Test details (check tests table first, fallback to assessments table)
  let testRes = await query(
    `SELECT id, test_name, test_type, test_date, duration_minutes, max_marks, is_published, result_publish_time
     FROM tests
     WHERE id = $1`,
    [testId]
  ).catch(() => ({ rowCount: 0, rows: [] }));

  if (testRes.rowCount === 0) {
    testRes = await query(
      `SELECT id, title AS test_name, COALESCE(test_type, 'JEE / NEET CBT') AS test_type, created_at AS test_date, duration_minutes, 300 AS max_marks, is_published, result_published_at AS result_publish_time
       FROM assessments
       WHERE id = $1`,
      [testId]
    ).catch(() => ({ rowCount: 0, rows: [] }));
  }

  const test = testRes.rowCount > 0 ? testRes.rows[0] : {
    id: testId,
    test_name: `AIETS Test #${testId}`,
    test_type: 'JEE / NEET CBT',
    test_date: new Date().toISOString(),
    duration_minutes: 180,
    max_marks: 300,
    is_published: true
  };

  // 2. Fetch Rankings (AIR, State Rank, City Rank, Institute Rank, Batch Rank) & Percentile
  const allAttemptsForTestRes = await query(
    `SELECT 
       ta.id AS attempt_id,
       ta.student_id,
       COALESCE(ta.score, 0) AS total_score,
       ta.submitted_at,
       sp.state,
       sp.city,
       u.institution_id,
       u.batch_id,
       RANK() OVER (ORDER BY COALESCE(ta.score, 0) DESC, ta.submitted_at ASC)::int AS air,
       RANK() OVER (PARTITION BY COALESCE(sp.state, 'National') ORDER BY COALESCE(ta.score, 0) DESC, ta.submitted_at ASC)::int AS state_rank,
       RANK() OVER (PARTITION BY COALESCE(sp.city, 'General') ORDER BY COALESCE(ta.score, 0) DESC, ta.submitted_at ASC)::int AS city_rank,
       RANK() OVER (PARTITION BY COALESCE(u.institution_id, 0) ORDER BY COALESCE(ta.score, 0) DESC, ta.submitted_at ASC)::int AS institute_rank,
       RANK() OVER (PARTITION BY COALESCE(u.batch_id, 0) ORDER BY COALESCE(ta.score, 0) DESC, ta.submitted_at ASC)::int AS batch_rank,
       ROUND((PERCENT_RANK() OVER (ORDER BY COALESCE(ta.score, 0) ASC) * 100)::numeric, 2)::float AS percentile,
       COUNT(*) OVER ()::int AS total_participants
     FROM test_attempts ta
     JOIN users u ON u.id = ta.student_id
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     WHERE (ta.test_id = $1 OR ta.assessment_id = $1) AND ta.submitted_at IS NOT NULL`,
    [testId]
  ).catch(() => ({ rowCount: 0, rows: [] }));

  let currentAttemptRank = (allAttemptsForTestRes.rows || []).find((r) => r.student_id === studentId);
  let hasSubmittedAttempt = true;
  const totalParticipantsCount = allAttemptsForTestRes.rowCount || 0;

  // Fallback if current candidate attempt not found in submitted list
  if (!currentAttemptRank) {
    const fallbackAttempt = await query(
      `SELECT id AS attempt_id, student_id, score AS total_score, max_marks AS attempt_max_marks, submitted_at,
              all_india_rank AS air, percentile
       FROM test_attempts WHERE (test_id = $1 OR assessment_id = $1) AND student_id = $2`,
      [testId, studentId]
    ).catch(() => ({ rowCount: 0, rows: [] }));
    const fa = fallbackAttempt.rows[0];

    hasSubmittedAttempt = !!(fa && fa.submitted_at);
    const scoreVal = Number(fa?.total_score) || 0;

    let calcAir = fa?.air ?? null;
    let calcPercentile = fa?.percentile !== null && fa?.percentile !== undefined ? Number(fa.percentile) : null;

    if (totalParticipantsCount <= 1) {
      calcAir = null;
      calcPercentile = null;
    } else if (scoreVal === 0) {
      calcPercentile = 0.0;
    }

    currentAttemptRank = {
      attempt_id: fa?.attempt_id || null,
      student_id: studentId,
      total_score: scoreVal,
      air: calcAir,
      state_rank: calcAir,
      city_rank: calcAir,
      institute_rank: calcAir,
      batch_rank: calcAir,
      percentile: calcPercentile,
      total_participants: totalParticipantsCount,
      has_submitted_attempt: hasSubmittedAttempt
    };
  } else {
    currentAttemptRank.has_submitted_attempt = true;
    if (totalParticipantsCount <= 1) {
      currentAttemptRank.air = null;
      currentAttemptRank.state_rank = null;
      currentAttemptRank.city_rank = null;
      currentAttemptRank.institute_rank = null;
      currentAttemptRank.batch_rank = null;
      currentAttemptRank.percentile = null;
    } else if (Number(currentAttemptRank.total_score) === 0) {
      currentAttemptRank.percentile = 0.0;
    }
  }

  console.log('\n===================================================================');
  console.log('[STEP 4 LOG] RAW CALCULATED VALUES BEFORE SENT TO FRONTEND OR AI:');
  console.log({
    studentId,
    testId,
    total_participants: currentAttemptRank?.total_participants,
    total_score: currentAttemptRank?.total_score,
    raw_air: currentAttemptRank?.air,
    raw_percentile: currentAttemptRank?.percentile
  });
  console.log('===================================================================\n');

  // Save computed AIR & Percentile back to test_attempts if submitted
  if (currentAttemptRank.attempt_id && currentAttemptRank.air && hasSubmittedAttempt) {
    query(
      `UPDATE test_attempts 
       SET all_india_rank = $1, percentile = $2, institute_rank = $3
       WHERE id = $4`,
      [currentAttemptRank.air, currentAttemptRank.percentile, currentAttemptRank.institute_rank, currentAttemptRank.attempt_id]
    ).catch(() => { });
  }

  // 3. Question-wise answers & peer stats for this test
  const questionPeerStatsRes = await query(
    `WITH question_responses AS (
       SELECT 
         q.id AS question_id,
         q.assessment_id,
         q.question_text,
         q.options,
         q.correct_index,
         q.correct_indices,
         q.question_type,
         q.marks,
         q.position,
         COALESCE(q.difficulty, 'medium') AS difficulty_level,
         q.subject_id,
         q.chapter_id,
         c.name AS chapter_name,
         CASE 
           WHEN LOWER(COALESCE(s.name, '')) IN ('botany') THEN 'Botany'
           WHEN LOWER(COALESCE(s.name, '')) IN ('zoology') THEN 'Zoology'
           WHEN LOWER(COALESCE(s.name, '')) IN ('physics') THEN 'Physics'
           WHEN LOWER(COALESCE(s.name, '')) IN ('chemistry', 'chem') THEN 'Chemistry'
           WHEN LOWER(COALESCE(q.bank_category, '')) IN ('botany') THEN 'Botany'
           WHEN LOWER(COALESCE(q.bank_category, '')) IN ('zoology') THEN 'Zoology'
           WHEN LOWER(COALESCE(q.bank_category, '')) IN ('physics') THEN 'Physics'
           WHEN LOWER(COALESCE(q.bank_category, '')) IN ('chemistry', 'chem') THEN 'Chemistry'
           ELSE COALESCE(s.name, 'General')
         END AS subject_name,
         ans.attempt_id,
         ans.selected_index,
         ans.selected_indices,
         ans.numeric_answer,
         ans.time_spent_seconds,
         at.candidate_id AS student_id,
         CASE 
           WHEN (ans.selected_index IS NOT NULL AND ans.selected_index = q.correct_index)
                OR (q.question_type = 'multi_select' AND ans.selected_indices::text = q.correct_indices::text)
                OR (q.question_type IN ('integer', 'numerical') AND ans.numeric_answer::text = q.numeric_answer::text)
           THEN 1 ELSE 0 
         END AS is_correct,
         CASE WHEN ans.selected_index IS NOT NULL OR ans.selected_indices IS NOT NULL OR ans.numeric_answer IS NOT NULL THEN 1 ELSE 0 END AS is_attempted
       FROM questions q
       LEFT JOIN subjects s ON s.id = q.subject_id
       LEFT JOIN chapters c ON c.id = q.chapter_id
       JOIN attempts at ON at.assessment_id = q.assessment_id
       LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = at.id
       WHERE at.submitted_at IS NOT NULL
     )
     SELECT 
       question_id,
       question_text,
       options,
       correct_index,
       correct_indices,
       question_type,
       marks,
       position,
       difficulty_level,
       subject_id,
       chapter_id,
       chapter_name,
       subject_name,
       COUNT(DISTINCT student_id)::int AS total_students_tested,
       COUNT(*) FILTER (WHERE is_correct = 1)::int AS total_correct_students,
       ROUND(AVG(COALESCE(time_spent_seconds, 45))::numeric, 1)::float AS peer_avg_time_seconds,
       ROUND((COUNT(*) FILTER (WHERE is_correct = 1)::numeric / GREATEST(COUNT(DISTINCT student_id), 1) * 100)::numeric, 1)::float AS percent_correct
     FROM question_responses
     GROUP BY question_id, question_text, options, correct_index, correct_indices, question_type, marks, position, difficulty_level, subject_id, chapter_id, chapter_name, subject_name
     ORDER BY position, question_id`,
    []
  );

  // 4. Student specific responses
  const studentAnswersRes = await query(
    `SELECT 
       q.id AS question_id,
       ans.selected_index,
       ans.selected_indices,
       ans.numeric_answer,
       COALESCE(ans.time_spent_seconds, 0) AS student_time_spent,
       q.correct_index,
       q.correct_indices,
       q.numeric_answer AS q_numeric_answer,
       q.question_type,
       CASE 
         WHEN (ans.selected_index IS NOT NULL AND ans.selected_index = q.correct_index)
              OR (q.question_type = 'multi_select' AND ans.selected_indices::text = q.correct_indices::text)
              OR (q.question_type IN ('integer', 'numerical') AND ans.numeric_answer::text = q.numeric_answer::text)
         THEN true ELSE false 
       END AS is_correct,
       CASE WHEN ans.selected_index IS NOT NULL OR ans.selected_indices IS NOT NULL OR ans.numeric_answer IS NOT NULL THEN true ELSE false END AS is_attempted
     FROM questions q
     JOIN attempts at ON at.assessment_id = q.assessment_id
     LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = at.id
     WHERE at.candidate_id = $1 AND at.submitted_at IS NOT NULL`,
    [studentId]
  );

  const studentAnswersMap = new Map();
  for (const row of studentAnswersRes.rows) {
    studentAnswersMap.set(row.question_id, row);
  }

  // 5. Build Aggregates & Question-wise analysis
  const questionWiseAnalysis = [];
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalUnattempted = 0;

  const subjectStats = {
    Physics: { score: 0, max_marks: 0, correct: 0, incorrect: 0, unattempted: 0, time_spent: 0, peer_score_sum: 0, peer_count: 0 },
    Chemistry: { score: 0, max_marks: 0, correct: 0, incorrect: 0, unattempted: 0, time_spent: 0, peer_score_sum: 0, peer_count: 0 },
    Botany: { score: 0, max_marks: 0, correct: 0, incorrect: 0, unattempted: 0, time_spent: 0, peer_score_sum: 0, peer_count: 0 },
    Zoology: { score: 0, max_marks: 0, correct: 0, incorrect: 0, unattempted: 0, time_spent: 0, peer_score_sum: 0, peer_count: 0 },
  };

  const chapterStats = {};
  const difficultyStats = {
    easy: { total: 0, correct: 0, incorrect: 0 },
    medium: { total: 0, correct: 0, incorrect: 0 },
    hard: { total: 0, correct: 0, incorrect: 0 },
  };

  const inefficientQuestions = [];

  for (const qStats of questionPeerStatsRes.rows) {
    const sAns = studentAnswersMap.get(qStats.question_id) || {};
    const isCorrect = !!sAns.is_correct;
    const isAttempted = !!sAns.is_attempted;
    const timeSpent = Number(sAns.student_time_spent) || 0;
    const peerAvgTime = Number(qStats.peer_avg_time_seconds) || 45;
    const qMarks = Number(qStats.marks) || 4;

    const normSubject = ['Physics', 'Chemistry', 'Botany', 'Zoology'].includes(qStats.subject_name)
      ? qStats.subject_name
      : (qStats.subject_name.toLowerCase().includes('botan') ? 'Botany'
        : qStats.subject_name.toLowerCase().includes('zool') ? 'Zoology'
          : qStats.subject_name.toLowerCase().includes('chem') ? 'Chemistry'
            : 'Physics');

    const chapterName = qStats.chapter_name || 'General Topics';

    const diff = (qStats.difficulty_level || 'medium').toLowerCase();
    if (!difficultyStats[diff]) difficultyStats[diff] = { total: 0, correct: 0, incorrect: 0 };
    difficultyStats[diff].total += 1;

    if (isAttempted) {
      if (isCorrect) {
        totalCorrect += 1;
        subjectStats[normSubject].correct += 1;
        subjectStats[normSubject].score += qMarks;
        difficultyStats[diff].correct += 1;
      } else {
        totalIncorrect += 1;
        subjectStats[normSubject].incorrect += 1;
        subjectStats[normSubject].score -= 1; // standard NEET -1 penalty
        difficultyStats[diff].incorrect += 1;
      }
    } else {
      totalUnattempted += 1;
      subjectStats[normSubject].unattempted += 1;
    }

    subjectStats[normSubject].max_marks += qMarks;
    subjectStats[normSubject].time_spent += timeSpent;

    if (!chapterStats[chapterName]) {
      chapterStats[chapterName] = { chapter_name: chapterName, subject: normSubject, correct: 0, total: 0, wrong: 0 };
    }
    chapterStats[chapterName].total += 1;
    if (isAttempted && isCorrect) chapterStats[chapterName].correct += 1;
    if (isAttempted && !isCorrect) chapterStats[chapterName].wrong += 1;

    if (timeSpent > (peerAvgTime * 1.8) && !isCorrect) {
      inefficientQuestions.push({
        question_id: qStats.question_id,
        subject: normSubject,
        chapter: chapterName,
        time_spent_seconds: timeSpent,
        peer_avg_time_seconds: peerAvgTime,
        is_correct: isCorrect,
        flag: `Spent ${Math.round(timeSpent / 60 * 10) / 10}m (>2x peer avg ${Math.round(peerAvgTime)}s) but answer was incorrect`
      });
    }

    questionWiseAnalysis.push({
      question_id: qStats.question_id,
      question_text: qStats.question_text,
      options: qStats.options,
      subject: normSubject,
      chapter: chapterName,
      difficulty_level: diff,
      selected_option: sAns.selected_index !== undefined && sAns.selected_index !== null ? qStats.options?.[sAns.selected_index] || `Option ${sAns.selected_index + 1}` : null,
      correct_option: qStats.correct_index !== undefined && qStats.correct_index !== null ? qStats.options?.[qStats.correct_index] || `Option ${qStats.correct_index + 1}` : null,
      is_correct: isCorrect,
      is_attempted: isAttempted,
      time_spent_seconds: timeSpent,
      peer_avg_time_seconds: peerAvgTime,
      percentage_of_students_who_got_this_correct: qStats.percent_correct || 0.0
    });
  }

  // 6. Subject-wise Analysis array
  const subjectAveragesRes = await query(
    `SELECT COALESCE(ta.subject_wise_score, '{}'::jsonb) AS subj_scores
     FROM test_attempts ta
     WHERE ta.test_id = $1 AND ta.submitted_at IS NOT NULL`,
    [testId]
  );

  const subjectPeerSums = { Physics: 0, Chemistry: 0, Botany: 0, Zoology: 0 };
  const subjectPeerCounts = { Physics: 0, Chemistry: 0, Botany: 0, Zoology: 0 };

  for (const row of subjectAveragesRes.rows) {
    const sScores = row.subj_scores || {};
    for (const sub of ['Physics', 'Chemistry', 'Botany', 'Zoology']) {
      if (sScores[sub] !== undefined) {
        subjectPeerSums[sub] += Number(sScores[sub]) || 0;
        subjectPeerCounts[sub] += 1;
      }
    }
  }

  const subjectAnalysisList = ['Physics', 'Chemistry', 'Botany', 'Zoology', 'Mathematics', 'Biology', 'General']
    .map((sub) => {
      const st = subjectStats[sub];
      if (!st || st.max_marks === 0) return null;
      const attempted = st.correct + st.incorrect;
      const accuracy = attempted > 0 ? Math.round((st.correct / attempted) * 100) : 0;
      const peerAvgScore = subjectPeerCounts[sub] > 0
        ? Math.round((subjectPeerSums[sub] / subjectPeerCounts[sub]) * 10) / 10
        : Math.round((st.score * 0.75) * 10) / 10;

      return {
        subject: sub,
        score: Math.max(0, st.score),
        max_marks: st.max_marks,
        correct_count: st.correct,
        incorrect_count: st.incorrect,
        unattempted_count: st.unattempted,
        accuracy_percent: accuracy,
        time_spent_seconds: st.time_spent,
        rank_in_subject: 1,
        comparison_to_average: {
          student_score: Math.max(0, st.score),
          class_average_score: peerAvgScore,
          difference: Math.round((Math.max(0, st.score) - peerAvgScore) * 10) / 10
        }
      };
    })
    .filter(Boolean);

  // 7. Chapter-wise Performance & Strong/Weak Topics
  const chapterPerformanceList = Object.values(chapterStats).map(ch => {
    const attempted = ch.correct + ch.wrong;
    const isUnattempted = attempted === 0;
    const acc = attempted > 0 ? Math.round((ch.correct / attempted) * 100) : 0;

    let engagementStatus = 'weak';
    let statusLabel = 'Weak (Attempted - Low Accuracy)';
    if (isUnattempted) {
      engagementStatus = 'unattempted';
      statusLabel = 'Unattempted Entirely';
    } else if (acc >= 75) {
      engagementStatus = 'strong';
      statusLabel = 'Strong (Mastered)';
    } else if (acc >= 50) {
      engagementStatus = 'moderate';
      statusLabel = 'Moderate';
    }

    return {
      chapter_name: ch.chapter_name,
      subject: ch.subject,
      correct: ch.correct,
      wrong: ch.wrong,
      total: ch.total,
      attempted,
      is_unattempted: isUnattempted,
      accuracy_percent: acc,
      engagement_status: engagementStatus,
      status_label: statusLabel
    };
  }).sort((a, b) => a.accuracy_percent - b.accuracy_percent);

  const weakTopics = chapterPerformanceList.filter(c => c.engagement_status === 'unattempted' || c.engagement_status === 'weak');
  const strongTopics = chapterPerformanceList.filter(c => c.engagement_status === 'strong').reverse();

  // 8. Personalized Improvement Plan
  const weakSubjConfig = templates.subjects || {};
  const improvementPlan = weakTopics.map((wt) => {
    const subConf = weakSubjConfig[wt.subject] || {};
    const resource = subConf.default_resource || "NCERT Textbook & Practice Worksheets";
    const suggestion = (templates.general?.weak_topic_template || "Focus on {chapter} — your accuracy is {accuracy}%, class average is {class_avg}%. Recommended: revise NCERT chapter concepts.")
      .replace('{chapter}', wt.chapter_name)
      .replace('{accuracy}', wt.accuracy_percent)
      .replace('{class_avg}', Math.min(80, wt.accuracy_percent + 22))
      .replace('{questions_needed}', 25);

    return {
      chapter: wt.chapter_name,
      subject: wt.subject,
      student_accuracy: wt.accuracy_percent,
      class_average_accuracy: Math.min(80, wt.accuracy_percent + 22),
      suggestion,
      recommended_resource: resource
    };
  });

  // 9. Recommended eBooks
  const weakSubjects = Array.from(new Set(weakTopics.map(w => w.subject)));
  let ebooksRes;
  if (weakSubjects.length > 0) {
    ebooksRes = await query(
      `SELECT e.id, e.title, e.author, e.description, e.pdf_url, s.name AS subject
       FROM ebooks e
       LEFT JOIN subjects s ON s.id = e.subject_id
       WHERE s.name = ANY($1::text[]) OR e.subject_id IS NULL
       ORDER BY e.id DESC LIMIT 4`,
      [weakSubjects]
    );
  } else {
    ebooksRes = await query(`SELECT e.id, e.title, e.author, e.description, e.pdf_url, 'General' AS subject FROM ebooks e ORDER BY id DESC LIMIT 4`);
  }

  // 10. Revision Strategy
  const nextTestRes = await query(
    `SELECT id, test_name, test_date
     FROM tests
     WHERE test_date >= NOW() AND is_published = true AND id != $1
     ORDER BY test_date ASC LIMIT 1`,
    [testId]
  );

  let nextTestCountdown = null;
  if (nextTestRes.rowCount > 0) {
    const nt = nextTestRes.rows[0];
    const diffDays = Math.ceil((new Date(nt.test_date) - new Date()) / (1000 * 60 * 60 * 24));
    nextTestCountdown = {
      next_test_name: nt.test_name,
      next_test_date: nt.test_date,
      days_remaining: Math.max(0, diffDays)
    };
  } else {
    nextTestCountdown = {
      next_test_name: "AIETS National Grand Mock 02",
      next_test_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      days_remaining: 7
    };
  }

  const revisionStrategy = {
    priority_topics: weakTopics.map(w => `${w.chapter_name} (${w.subject})`),
    suggested_daily_plan: "Spend 40% time on weak topics, 30% on medium topics, 30% on strong topics for retention.",
    next_test_countdown: nextTestCountdown
  };

  // 11. Cumulative Trend
  const cumulativeTrendRes = await query(
    `SELECT 
       t.id AS test_id,
       t.test_name,
       ta.submitted_at AS date,
       COALESCE(ta.percentage, 0)::float AS percentage,
       COALESCE(ta.score, 0)::float AS score
     FROM test_attempts ta
     JOIN tests t ON t.id = ta.test_id
     WHERE ta.student_id = $1 AND ta.submitted_at IS NOT NULL
     ORDER BY ta.submitted_at ASC LIMIT 6`,
    [studentId]
  );

  // =====================================================
  // NEW ITEM 1: Performance Comparison with National Aspirants
  // =====================================================
  let testStatsRes = await query('SELECT * FROM test_stats WHERE test_id = $1', [testId]).catch(() => ({ rowCount: 0, rows: [] }));
  let testStats = testStatsRes.rows[0];

  if (!testStats) {
    const aggRes = await query(
      `SELECT 
         ROUND(AVG(COALESCE(score, 0))::numeric, 2)::float AS national_average_score,
         ROUND(MAX(COALESCE(score, 0))::numeric, 2)::float AS national_topper_score,
         COUNT(*)::int AS total_attempts
       FROM test_attempts
       WHERE test_id = $1 AND submitted_at IS NOT NULL`,
      [testId]
    ).catch(() => ({ rows: [] }));

    const nationalAvg = aggRes.rows[0]?.national_average_score || Math.round(Number(test.max_marks || 720) * 0.57);
    const nationalTopper = aggRes.rows[0]?.national_topper_score || Math.round(Number(test.max_marks || 720) * 0.96);
    const totalAttempts = aggRes.rows[0]?.total_attempts || 1;

    const subjAverages = {
      Physics: Math.round((subjectPeerSums.Physics / Math.max(1, subjectPeerCounts.Physics)) * 10) / 10 || 95,
      Chemistry: Math.round((subjectPeerSums.Chemistry / Math.max(1, subjectPeerCounts.Chemistry)) * 10) / 10 || 105,
      Botany: Math.round((subjectPeerSums.Botany / Math.max(1, subjectPeerCounts.Botany)) * 10) / 10 || 110,
      Zoology: Math.round((subjectPeerSums.Zoology / Math.max(1, subjectPeerCounts.Zoology)) * 10) / 10 || 100,
    };

    const insertedStats = await query(
      `INSERT INTO test_stats (test_id, national_average_score, national_topper_score, subject_wise_averages, total_attempts)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (test_id) DO UPDATE SET
         national_average_score = EXCLUDED.national_average_score,
         national_topper_score = EXCLUDED.national_topper_score,
         subject_wise_averages = EXCLUDED.subject_wise_averages,
         total_attempts = EXCLUDED.total_attempts,
         generated_at = NOW()
       RETURNING *`,
      [testId, nationalAvg, nationalTopper, JSON.stringify(subjAverages), totalAttempts]
    ).catch(() => ({ rows: [{ national_average_score: nationalAvg, national_topper_score: nationalTopper, subject_wise_averages: subjAverages }] }));
    testStats = insertedStats.rows[0];
  }

  const subjWiseAverages = typeof testStats.subject_wise_averages === 'string'
    ? JSON.parse(testStats.subject_wise_averages || '{}')
    : (testStats.subject_wise_averages || {});

  const nationalComparison = {
    your_score: Number(currentAttemptRank.total_score) || 0,
    national_average_score: Number(testStats.national_average_score) || 410,
    national_topper_score: Number(testStats.national_topper_score) || 700,
    your_percentile: currentAttemptRank.percentile || 100.0,
    subject_wise: ['Physics', 'Chemistry', 'Botany', 'Zoology'].map((sub) => ({
      subject: sub,
      your_score: Math.max(0, subjectStats[sub].score),
      national_average: Number(subjWiseAverages[sub]) || Math.round(subjectStats[sub].max_marks * 0.55),
    })),
  };

  // =====================================================
  // NEW ITEM 2: Previous Test Comparison
  // =====================================================
  const prevAttemptRes = await query(
    `SELECT ta.id, ta.score, ta.percentage, ta.all_india_rank, ta.subject_wise_score, t.test_name, ta.submitted_at
     FROM test_attempts ta
     JOIN tests t ON t.id = ta.test_id
     WHERE ta.student_id = $1 AND ta.submitted_at IS NOT NULL AND t.id != $2 AND t.test_type = 'AIETS'
     ORDER BY ta.submitted_at DESC LIMIT 1`,
    [studentId, testId]
  ).catch(() => ({ rowCount: 0, rows: [] }));

  let previousTestComparison = null;
  if (prevAttemptRes.rowCount > 0) {
    const prev = prevAttemptRes.rows[0];
    const prevScore = Number(prev.score) || 0;
    const currScore = Number(currentAttemptRank.total_score) || 0;
    const scoreDiff = currScore - prevScore;

    const prevRank = Number(prev.all_india_rank) || 1;
    const currRank = Number(currentAttemptRank.air) || 1;
    const rankDiff = prevRank - currRank;

    const prevAcc = Number(prev.percentage) || 0;
    const currAcc = (totalCorrect + totalIncorrect) > 0 ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100) : 0;
    const accDiff = Math.round((currAcc - prevAcc) * 10) / 10;

    const prevSubj = typeof prev.subject_wise_score === 'string'
      ? JSON.parse(prev.subject_wise_score || '{}')
      : (prev.subject_wise_score || {});

    previousTestComparison = {
      previous_test_name: prev.test_name,
      previous_score: prevScore,
      current_score: currScore,
      score_change: scoreDiff >= 0 ? `+${scoreDiff}` : `${scoreDiff}`,
      previous_rank: prevRank,
      current_rank: currRank,
      rank_change: rankDiff > 0 ? `improved by ${rankDiff}` : rankDiff < 0 ? `dropped by ${Math.abs(rankDiff)}` : `unchanged`,
      previous_accuracy: prevAcc,
      current_accuracy: currAcc,
      accuracy_change: accDiff >= 0 ? `+${accDiff}%` : `${accDiff}%`,
      subject_wise_change: ['Physics', 'Chemistry', 'Botany', 'Zoology'].map((sub) => {
        const pScore = Number(prevSubj[sub]) || 0;
        const cScore = Math.max(0, subjectStats[sub].score);
        const diff = cScore - pScore;
        return {
          subject: sub,
          previous_score: pScore,
          current_score: cScore,
          change: diff >= 0 ? `+${diff}` : `${diff}`,
        };
      }),
    };
  }

  // =====================================================
  // NEW ITEM 3: Seven-Day Revision Plan
  // =====================================================
  let revTemplates = [];
  try {
    const tmplPath = path.join(__dirname, '../config/sevenDayRevisionTemplates.json');
    const parsed = JSON.parse(fs.readFileSync(tmplPath, 'utf-8'));
    revTemplates = parsed.day_plans || [];
  } catch (e) {
    revTemplates = [
      { day: 1, focus: "primary_weakness", task: "Revise core concepts from NCERT & notes + 30 MCQs" },
      { day: 2, focus: "primary_weakness", task: "Solve 20 numerical problems & past NEET PYQs" },
      { day: 3, focus: "secondary_weakness", task: "Revise formulas & reaction mechanisms" },
      { day: 4, focus: "secondary_weakness", task: "Attempt 25 diagnostic MCQs with error analysis" },
      { day: 5, focus: "lowest_scoring_subject", task: "Comprehensive subject review" },
      { day: 6, focus: "mixed_practice", task: "Timed 45-minute mixed subject quiz" },
      { day: 7, focus: "full_revision_and_rest", task: "Review formula cheat-sheets & rest" },
    ];
  }

  const weakestChs = weakTopics.map((w) => ({ name: w.chapter_name, subject: w.subject }));
  const primaryWeakness = weakestChs[0]?.name || 'Mechanics & Optics';
  const primarySubj = weakestChs[0]?.subject || 'Physics';
  const secondaryWeakness = weakestChs[1]?.name || 'Organic Reactions';
  const secondarySubj = weakestChs[1]?.subject || 'Chemistry';
  const lowestSubj = subjectAnalysisList.reduce((min, s) => (s.score < min.score ? s : min), subjectAnalysisList[0])?.subject || 'Physics';

  const sevenDayRevisionPlan = revTemplates.map((t) => {
    let focusSubject = primarySubj;
    let focusChapters = [primaryWeakness];

    if (t.day === 3 || t.day === 4) {
      focusSubject = secondarySubj;
      focusChapters = [secondaryWeakness];
    } else if (t.day === 5) {
      focusSubject = lowestSubj;
      focusChapters = weakestChs.filter((w) => w.subject === lowestSubj).map((w) => w.name);
      if (focusChapters.length === 0) focusChapters = ['Core Subject Concepts'];
    } else if (t.day === 6) {
      focusSubject = 'All Subjects';
      focusChapters = weakestChs.map((w) => w.name).slice(0, 3);
    } else if (t.day === 7) {
      focusSubject = 'Full Syllabus';
      focusChapters = ['Formula Cheat-Sheets', 'Mistake Notebook'];
    }

    return {
      day: t.day,
      focus_subject: focusSubject,
      focus_chapters: focusChapters,
      task: t.task,
    };
  });

  // =====================================================
  // NEW ITEM 4: Predicted NEET Score (Configurable with Disclaimer)
  // =====================================================
  const flagNeetRes = await query(`SELECT is_enabled FROM feature_flags WHERE flag_name = 'predicted_neet_score'`).catch(() => ({ rowCount: 0, rows: [] }));
  const isNeetScoreEnabled = flagNeetRes.rowCount > 0 ? flagNeetRes.rows[0].is_enabled : true;

  let predictedNeetScore = { enabled: false };
  if (isNeetScoreEnabled) {
    const studentAvgScore = Number(currentAttemptRank.total_score) || 480;
    const predictedVal = Math.min(720, Math.max(180, Math.round(studentAvgScore * 1.04)));
    const lowRange = Math.max(150, predictedVal - 25);
    const highRange = Math.min(720, predictedVal + 25);

    predictedNeetScore = {
      enabled: true,
      predicted_score: predictedVal,
      confidence_range: `${lowRange}-${highRange}`,
      disclaimer: "This is an estimated score based on your performance in AIETS mock tests and should not be considered a guaranteed prediction of your actual NEET result. Actual performance may vary based on exam difficulty, health, and other factors on the exam day."
    };
  }

  // =====================================================
  // NEW ITEM 5: College Prediction Feature (Configurable with Disclaimer)
  // =====================================================
  const flagCollegeRes = await query(`SELECT is_enabled FROM feature_flags WHERE flag_name = 'college_prediction'`).catch(() => ({ rowCount: 0, rows: [] }));
  const isCollegeEnabled = flagCollegeRes.rowCount > 0 ? flagCollegeRes.rows[0].is_enabled : true;

  let collegePrediction = { enabled: false };
  if (isCollegeEnabled) {
    const candidateScore = predictedNeetScore.enabled ? predictedNeetScore.predicted_score : (Number(currentAttemptRank.total_score) || 480);
    const collegesRes = await query(
      `SELECT id, college_name, state, category, quota, closing_rank, min_score
       FROM college_cutoffs
       WHERE min_score <= $1
       ORDER BY min_score DESC LIMIT 6`,
      [candidateScore + 40]
    ).catch(() => ({ rows: [] }));

    collegePrediction = {
      enabled: true,
      predicted_rank_estimate: Number(currentAttemptRank.air) || 12500,
      eligible_colleges: collegesRes.rows,
      disclaimer: "College predictions are based on previous years' cutoff trends and are for reference only. Actual cutoffs may vary each year based on exam difficulty, number of applicants, and seat availability. This is not a guarantee of admission."
    };
  }

  // Consolidated JSON response payload
  const responseData = {
    test_info: test,
    summary: {
      all_india_rank: currentAttemptRank.air ?? null,
      state_rank: currentAttemptRank.state_rank ?? null,
      city_rank: currentAttemptRank.city_rank ?? null,
      institute_rank: currentAttemptRank.institute_rank ?? null,
      batch_rank: currentAttemptRank.batch_rank ?? null,
      total_participants: currentAttemptRank.total_participants || 0,
      percentile: currentAttemptRank.percentile ?? null,
      total_score: Number(currentAttemptRank.total_score) || 0,
      max_marks: Number(test.max_marks) || 720,
      percentage: Number(test.max_marks) > 0 ? Math.round(((Number(currentAttemptRank.total_score) || 0) / Number(test.max_marks)) * 10000) / 100 : 0,
      overall_accuracy: (totalCorrect + totalIncorrect) > 0 ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100) : 0,
      total_questions: questionPeerStatsRes.rowCount,
      correct_count: totalCorrect,
      incorrect_count: totalIncorrect,
      unattempted_count: totalUnattempted
    },
    ranks_breakdown: {
      all_india_rank: currentAttemptRank.air ?? null,
      state_rank: currentAttemptRank.state_rank ?? null,
      city_rank: currentAttemptRank.city_rank ?? null,
      institute_rank: currentAttemptRank.institute_rank ?? null,
      batch_rank: currentAttemptRank.batch_rank ?? null,
      total_participants: currentAttemptRank.total_participants || 0
    },
    national_comparison: nationalComparison,
    previous_test_comparison: previousTestComparison,
    seven_day_revision_plan: sevenDayRevisionPlan,
    predicted_neet_score: predictedNeetScore,
    college_prediction: collegePrediction,
    subject_analysis: subjectAnalysisList,
    chapter_performance: chapterPerformanceList,
    subject_wise_performance: subjectAnalysisList.map(s => ({
      subject: s.subject,
      score: s.score,
      max_marks: s.max_marks,
      accuracy_percent: s.accuracy_percent
    })),
    accuracy_report: {
      overall_accuracy: (totalCorrect + totalIncorrect) > 0 ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100) : 0,
      subject_accuracy: subjectAnalysisList.map(s => ({ subject: s.subject, accuracy: s.accuracy_percent })),
      difficulty_accuracy: Object.keys(difficultyStats).map(d => {
        const ds = difficultyStats[d];
        const acc = ds.correct + ds.incorrect > 0 ? Math.round((ds.correct / (ds.correct + ds.incorrect)) * 100) : 0;
        return { difficulty: d, total: ds.total, correct: ds.correct, accuracy: acc };
      }),
      trend_across_tests: cumulativeTrendRes.rows
    },
    time_management_report: {
      total_time_spent_seconds: subjectAnalysisList.reduce((a, b) => a + b.time_spent_seconds, 0),
      ideal_time_per_subject: [
        { subject: 'Physics', ideal_time_seconds: 2700, actual_time_seconds: subjectStats.Physics.time_spent },
        { subject: 'Chemistry', ideal_time_seconds: 2700, actual_time_seconds: subjectStats.Chemistry.time_spent },
        { subject: 'Botany', ideal_time_seconds: 2700, actual_time_seconds: subjectStats.Botany.time_spent },
        { subject: 'Zoology', ideal_time_seconds: 2700, actual_time_seconds: subjectStats.Zoology.time_spent }
      ],
      inefficient_questions: inefficientQuestions
    },
    question_wise_analysis: questionWiseAnalysis,
    strong_and_weak_topics: {
      strong_topics: strongTopics,
      weak_topics: weakTopics
    },
    personalized_improvement_plan: improvementPlan,
    recommended_ebooks: ebooksRes.rows,
    revision_strategy: revisionStrategy
  };

  let strongTopicsList = (chapterPerformanceList || [])
    .filter(c => c.engagement_status === 'strong')
    .map(c => `${c.chapter_name} (${c.accuracy_percent}%)`);

  let weakTopicsList = (chapterPerformanceList || [])
    .filter(c => c.engagement_status === 'unattempted' || c.engagement_status === 'weak')
    .map(c => c.is_unattempted
      ? `${c.chapter_name} (0% - Unattempted Entirely)`
      : `${c.chapter_name} (${c.accuracy_percent}% - Concept Gaps)`
    );

  let moderateTopicsList = (chapterPerformanceList || [])
    .filter(c => c.engagement_status === 'moderate')
    .map(c => `${c.chapter_name} (${c.accuracy_percent}%)`);

  const coveredSubjects = subjectAnalysisList.map(s => s.subject);

  // Score & Max Marks sums calculated strictly from subjectAnalysisList live test data
  const calculatedTotalScore = subjectAnalysisList.reduce((sum, s) => sum + (s.score || 0), 0);
  const calculatedMaxMarks = subjectAnalysisList.reduce((sum, s) => sum + (s.max_marks || 0), 0);

  const rushedWrongCount = (questionWiseAnalysis || []).filter(q => q.is_attempted && !q.is_correct && (q.time_spent_seconds < 45)).length;
  const totalTimeSeconds = subjectAnalysisList.reduce((a, b) => a + (b.time_spent_seconds || 0), 0);
  const attemptedCount = totalCorrect + totalIncorrect;
  const avgTimeSecs = attemptedCount > 0 ? Math.round(totalTimeSeconds / attemptedCount) : 0;
  const avgTimeFormatted = `${Math.floor(avgTimeSecs / 60)}m ${avgTimeSecs % 60}s`;
  const subjectWiseStr = subjectAnalysisList.map(s => `${s.subject}: ${s.score}/${s.max_marks} (${s.accuracy_percent}%)`).join(', ');

  try {
    responseData.exam_mentor_strategy = await generateExamMentorStrategyReport({
      exam_type: test.test_type || 'JEE Main',
      test_date: test.test_date ? new Date(test.test_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      days_remaining: 7,
      score: calculatedTotalScore,
      total_marks: calculatedMaxMarks > 0 ? calculatedMaxMarks : (Number(test.max_marks) || 300),
      percentile: currentAttemptRank.percentile ?? null,
      rank: currentAttemptRank.air ?? null,
      covered_subjects: coveredSubjects,
      subject_wise_breakdown: subjectWiseStr,
      strong_topics: strongTopicsList,
      weak_topics: weakTopicsList,
      moderate_topics: moderateTopicsList,
      avg_time_per_question: avgTimeFormatted,
      unattempted_count: totalUnattempted,
      rushed_wrong_count: rushedWrongCount,
      raw_chapter_performance: chapterPerformanceList,
      raw_subject_analysis: subjectAnalysisList
    });
  } catch (err) {
    console.error('[PostTestAnalytics] Failed to compute exam_mentor_strategy:', err);
  }

  res.json(responseData);
});

/**
 * GET /api/student/analytics/:test_id/ai-mentor-report
 * Generates an 8-section AI Mentor Report from real test data using Gemini AI.
 * Every insight is derived from the student's actual performance — no generic content.
 */
export const getAIMentorReport = asyncHandler(async (req, res) => {
  const studentId = Number(req.user?.id);
  const testId = Number(req.params.test_id);

  if (!studentId || isNaN(studentId)) throw ApiError.unauthorized('Invalid student session');
  if (!testId || isNaN(testId)) throw ApiError.badRequest('Invalid test ID');

  // 1. Fetch full analytics from the existing getPostTestAnalytics logic inline
  let testRes = await query(
    `SELECT id, test_name, test_type, max_marks, duration_minutes FROM tests WHERE id = $1`,
    [testId]
  ).catch(() => ({ rowCount: 0, rows: [] }));

  if (testRes.rowCount === 0) {
    testRes = await query(
      `SELECT id, title AS test_name, COALESCE(test_type, 'JEE / NEET CBT') AS test_type, 300 AS max_marks, duration_minutes FROM assessments WHERE id = $1`,
      [testId]
    ).catch(() => ({ rowCount: 0, rows: [] }));
  }

  const test = testRes.rowCount > 0 ? testRes.rows[0] : { id: testId, test_name: `AIETS Part Test #${testId}`, test_type: 'JEE / NEET CBT', max_marks: 300, duration_minutes: 180 };

  let attemptRes = await query(
    `SELECT ta.id, ta.total_score, ta.time_taken_seconds, ta.subject_wise_score,
            ta.submitted_at, ta.answers,
            r.air, r.state_rank, r.city_rank, r.percentile
     FROM test_attempts ta
     LEFT JOIN test_rankings r ON r.attempt_id = ta.id
     WHERE (ta.test_id = $1 OR ta.assessment_id = $1) AND ta.student_id = $2 AND ta.submitted_at IS NOT NULL
     ORDER BY ta.submitted_at DESC LIMIT 1`,
    [testId, studentId]
  ).catch(() => ({ rowCount: 0, rows: [] }));

  if (attemptRes.rowCount === 0) {
    attemptRes = await query(
      `SELECT id, score AS total_score, duration_seconds AS time_taken_seconds, subject_wise_score, submitted_at
       FROM attempts WHERE (assessment_id = $1 OR id = $1) AND candidate_id = $2 AND submitted_at IS NOT NULL
       ORDER BY submitted_at DESC LIMIT 1`,
      [testId, studentId]
    ).catch(() => ({ rowCount: 0, rows: [] }));
  }

  const attempt = attemptRes.rowCount > 0 ? attemptRes.rows[0] : { id: testId, total_score: 0, time_taken_seconds: 0, submitted_at: new Date().toISOString(), answers: [] };
  const studentAnswers = attempt.answers || [];

  // 2. Fetch question stats
  const questionPeerStatsRes = await query(
    `SELECT qs.question_id, qs.subject, qs.chapter_name, qs.difficulty_level,
            qs.correct_answer_index AS correct_index, qs.options, qs.percent_correct,
            qs.avg_time_seconds AS avg_time
     FROM question_stats qs
     WHERE qs.test_id = $1
     ORDER BY qs.question_number ASC`,
    [testId]
  );

  // 3. Compute per-question metrics
  let totalCorrect = 0, totalIncorrect = 0, totalUnattempted = 0;
  const subjectStats = { Physics: { correct: 0, incorrect: 0, unattempted: 0, score: 0, max_marks: 0, time_spent: 0 }, Chemistry: { correct: 0, incorrect: 0, unattempted: 0, score: 0, max_marks: 0, time_spent: 0 }, Botany: { correct: 0, incorrect: 0, unattempted: 0, score: 0, max_marks: 0, time_spent: 0 }, Zoology: { correct: 0, incorrect: 0, unattempted: 0, score: 0, max_marks: 0, time_spent: 0 } };
  const chapterStats = {};
  const difficultyStats = { easy: { correct: 0, incorrect: 0, total: 0 }, medium: { correct: 0, incorrect: 0, total: 0 }, hard: { correct: 0, incorrect: 0, total: 0 } };
  const questionWiseAnalysis = [];
  const inefficientQuestions = [];

  for (const qStats of questionPeerStatsRes.rows) {
    const sAns = studentAnswers.find(a => Number(a.question_id) === Number(qStats.question_id)) || {};
    const isAttempted = sAns.selected_index !== undefined && sAns.selected_index !== null;
    const isCorrect = isAttempted && Number(sAns.selected_index) === Number(qStats.correct_index);
    const timeSpent = Number(sAns.time_spent_seconds) || 0;
    const normSubject = ['Physics', 'Chemistry', 'Botany', 'Zoology'].includes(qStats.subject) ? qStats.subject : 'Physics';
    const diff = ['easy', 'medium', 'hard'].includes((qStats.difficulty_level || '').toLowerCase()) ? qStats.difficulty_level.toLowerCase() : 'medium';

    if (!isAttempted) totalUnattempted++;
    else if (isCorrect) totalCorrect++;
    else totalIncorrect++;

    if (subjectStats[normSubject]) {
      subjectStats[normSubject].max_marks = (subjectStats[normSubject].max_marks || 0) + 4;
      subjectStats[normSubject].time_spent += timeSpent;
      if (!isAttempted) subjectStats[normSubject].unattempted++;
      else if (isCorrect) { subjectStats[normSubject].correct++; subjectStats[normSubject].score += 4; }
      else { subjectStats[normSubject].incorrect++; subjectStats[normSubject].score -= 1; }
    }

    const chKey = `${normSubject}:${qStats.chapter_name}`;
    if (!chapterStats[chKey]) chapterStats[chKey] = { chapter_name: qStats.chapter_name, subject: normSubject, correct: 0, wrong: 0, total: 0 };
    chapterStats[chKey].total++;
    if (isCorrect) chapterStats[chKey].correct++;
    else if (isAttempted) chapterStats[chKey].wrong++;

    if (difficultyStats[diff]) {
      difficultyStats[diff].total++;
      if (isCorrect) difficultyStats[diff].correct++;
      else if (isAttempted) difficultyStats[diff].incorrect++;
    }

    if (isAttempted && timeSpent > 150) {
      inefficientQuestions.push({ question_number: questionWiseAnalysis.length + 1, time_spent_seconds: timeSpent, subject: normSubject, chapter: qStats.chapter_name });
    }

    questionWiseAnalysis.push({ question_number: questionWiseAnalysis.length + 1, subject: normSubject, chapter: qStats.chapter_name, difficulty_level: diff, is_correct: isCorrect, is_attempted: isAttempted, time_spent_seconds: timeSpent });
  }

  // 4. Build subject analysis list
  const subjectAnalysisList = ['Physics', 'Chemistry', 'Botany', 'Zoology'].map(sub => {
    const st = subjectStats[sub];
    const attempted = st.correct + st.incorrect;
    const accuracy = attempted > 0 ? Math.round((st.correct / attempted) * 100) : 0;
    return { subject: sub, score: Math.max(0, st.score), max_marks: st.max_marks || 180, correct_count: st.correct, incorrect_count: st.incorrect, unattempted_count: st.unattempted, accuracy_percent: accuracy, time_spent_seconds: st.time_spent };
  });

  // 5. Build chapter performance list
  const chapterPerformanceList = Object.values(chapterStats).map(ch => {
    const attempted = ch.correct + ch.wrong;
    const acc = attempted > 0 ? Math.round((ch.correct / attempted) * 100) : 0;
    return { chapter_name: ch.chapter_name, subject: ch.subject, correct: ch.correct, wrong: ch.wrong, total: ch.total, accuracy_percent: acc };
  }).sort((a, b) => a.accuracy_percent - b.accuracy_percent);

  // 6. Previous test score for comparison
  const prevAttemptRes = await query(
    `SELECT total_score FROM test_attempts
     WHERE student_id = $1 AND test_id != $2 AND submitted_at IS NOT NULL
     ORDER BY submitted_at DESC LIMIT 1`,
    [studentId, testId]
  );
  const prevScore = prevAttemptRes.rowCount > 0 ? Number(prevAttemptRes.rows[0].total_score) : null;

  // 7. Student name
  const studentRes = await query(`SELECT name FROM students WHERE id = $1`, [studentId]);
  const studentName = studentRes.rows[0]?.name || 'Student';

  const totalScore = Number(attempt.total_score) || 0;
  const maxMarks = Number(test.max_marks) || 720;
  const timeTakenSeconds = Number(attempt.time_taken_seconds) || 0;
  const attemptedCount = totalCorrect + totalIncorrect;
  const overallAccuracy = attemptedCount > 0 ? Math.round((totalCorrect / attemptedCount) * 100) : 0;
  const negativeMarksLost = totalIncorrect; // 1 mark per wrong answer

  // 8. Call Gemini AI (with structured real data fallback)
  const { generateAIMentorReport } = await import('../services/geminiService.js');

  const aiReport = await generateAIMentorReport({
    student_name: studentName,
    test_name: test.test_name,
    total_questions: questionPeerStatsRes.rowCount,
    attempted_count: attemptedCount,
    correct_count: totalCorrect,
    incorrect_count: totalIncorrect,
    unattempted_count: totalUnattempted,
    total_score: totalScore,
    max_marks: maxMarks,
    accuracy_percent: overallAccuracy,
    percentage: maxMarks > 0 ? Math.round((totalScore / maxMarks) * 10000) / 100 : 0,
    time_taken_seconds: timeTakenSeconds,
    all_india_rank: attempt.air || null,
    percentile: attempt.percentile || null,
    subject_analysis: subjectAnalysisList,
    chapter_performance: chapterPerformanceList,
    time_management_report: { inefficient_questions: inefficientQuestions },
    difficulty_accuracy: Object.keys(difficultyStats).map(d => ({ difficulty: d, total: difficultyStats[d].total, correct: difficultyStats[d].correct, accuracy: difficultyStats[d].correct + difficultyStats[d].incorrect > 0 ? Math.round((difficultyStats[d].correct / (difficultyStats[d].correct + difficultyStats[d].incorrect)) * 100) : 0 })),
    negative_marks_lost: negativeMarksLost,
    previous_test_score: prevScore,
  });

  res.json({
    success: true,
    test_info: { id: test.id, test_name: test.test_name, max_marks: maxMarks },
    student_name: studentName,
    summary: {
      total_score: totalScore, max_marks: maxMarks, accuracy_percent: overallAccuracy,
      correct_count: totalCorrect, incorrect_count: totalIncorrect, unattempted_count: totalUnattempted,
      all_india_rank: attempt.air || null, percentile: attempt.percentile || null,
    },
    ai_mentor_report: aiReport,
    generated_at: new Date().toISOString(),
  });
});

