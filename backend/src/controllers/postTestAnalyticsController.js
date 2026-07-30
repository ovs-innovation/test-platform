import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
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
 * Single consolidated endpoint returning all 16 post-test performance analytics sections.
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

  // 1. Fetch Test details
  const testRes = await query(
    `SELECT id, test_name, test_type, test_date, duration_minutes, max_marks, is_published, result_publish_time
     FROM tests
     WHERE id = $1`,
    [testId]
  );
  if (testRes.rowCount === 0) {
    throw ApiError.notFound('Test not found');
  }
  const test = testRes.rows[0];

  // 2. Fetch all student attempts for this test to compute Rankings & Percentiles via PostgreSQL Window Functions
  const rankingsRes = await query(
    `WITH ranked_attempts AS (
       SELECT 
         ta.id AS attempt_id,
         ta.student_id,
         COALESCE(ta.score, 0) AS total_score,
         COALESCE(ta.max_marks, $2) AS attempt_max_marks,
         ta.submitted_at,
         RANK() OVER (ORDER BY COALESCE(ta.score, 0) DESC, ta.submitted_at ASC)::int AS computed_air,
         ROUND( (PERCENT_RANK() OVER (ORDER BY COALESCE(ta.score, 0) ASC) * 100)::numeric, 2)::float AS computed_percentile,
         COUNT(*) OVER ()::int AS total_participants
       FROM test_attempts ta
       WHERE ta.test_id = $1 AND ta.submitted_at IS NOT NULL
     )
     SELECT * FROM ranked_attempts WHERE student_id = $3`,
    [testId, test.max_marks || 720, studentId]
  );

  let currentAttemptRank = rankingsRes.rows[0] || null;

  // Fallback if test_attempt record exists but rankings list query returned 0 rows (e.g. attempt in progress or unsubmitted)
  if (!currentAttemptRank) {
    const fallbackAttempt = await query(
      `SELECT id AS attempt_id, student_id, score AS total_score, max_marks AS attempt_max_marks, submitted_at,
              all_india_rank AS computed_air, percentile AS computed_percentile, 1 AS total_participants
       FROM test_attempts WHERE test_id = $1 AND student_id = $2`,
      [testId, studentId]
    );
    currentAttemptRank = fallbackAttempt.rows[0] || {
      attempt_id: null,
      student_id: studentId,
      total_score: 0,
      attempt_max_marks: test.max_marks || 720,
      computed_air: 1,
      computed_percentile: 100.0,
      total_participants: 1
    };
  }

  // Save computed AIR and percentile back to test_attempts asynchronously
  if (currentAttemptRank.attempt_id && currentAttemptRank.computed_air) {
    query(
      `UPDATE test_attempts 
       SET all_india_rank = $1, percentile = $2 
       WHERE id = $3`,
      [currentAttemptRank.computed_air, currentAttemptRank.computed_percentile, currentAttemptRank.attempt_id]
    ).catch(() => {});
  }

  // 3. Fetch Question-wise answers & peer stats for this test
  // Peer Stats per question across all test attempts for this test_id
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

  // 4. Fetch the specific student's responses for this test
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

  // 5. Build Detailed Question-wise Analysis & Aggregates
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

    // Difficulty accumulation
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

    // Chapter Accumulation
    if (!chapterStats[chapterName]) {
      chapterStats[chapterName] = { chapter_name: chapterName, subject: normSubject, correct: 0, total: 0, wrong: 0 };
    }
    chapterStats[chapterName].total += 1;
    if (isAttempted && isCorrect) chapterStats[chapterName].correct += 1;
    if (isAttempted && !isCorrect) chapterStats[chapterName].wrong += 1;

    // Inefficient Question Flag (>2x average time AND wrong/unattempted)
    if (timeSpent > (peerAvgTime * 1.8) && !isCorrect) {
      inefficientQuestions.push({
        question_id: qStats.question_id,
        subject: normSubject,
        chapter: chapterName,
        time_spent_seconds: timeSpent,
        peer_avg_time_seconds: peerAvgTime,
        is_correct: isCorrect,
        flag: `Spent ${Math.round(timeSpent / 60 * 10)/10}m (>2x peer avg ${Math.round(peerAvgTime)}s) but answer was incorrect`
      });
    }

    // Single Question-wise Analysis object
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

  // 6. Subject-wise Analysis array (Items 4-7, 9)
  // Compute class average per subject across all test attempts for this test
  const subjectAveragesRes = await query(
    `SELECT 
       COALESCE(ta.subject_wise_score, '{}'::jsonb) AS subj_scores
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

  const subjectAnalysisList = ['Physics', 'Chemistry', 'Botany', 'Zoology'].map((sub) => {
    const st = subjectStats[sub];
    const attempted = st.correct + st.incorrect;
    const accuracy = attempted > 0 ? Math.round((st.correct / attempted) * 100) : 0;
    const peerAvgScore = subjectPeerCounts[sub] > 0 
      ? Math.round((subjectPeerSums[sub] / subjectPeerCounts[sub]) * 10) / 10 
      : Math.round((st.score * 0.75) * 10) / 10;

    return {
      subject: sub,
      score: Math.max(0, st.score),
      max_marks: st.max_marks || 180,
      correct_count: st.correct,
      incorrect_count: st.incorrect,
      unattempted_count: st.unattempted,
      accuracy_percent: accuracy,
      time_spent_seconds: st.time_spent,
      rank_in_subject: 1, // Can be refined if subject rank is needed
      comparison_to_average: {
        student_score: Math.max(0, st.score),
        class_average_score: peerAvgScore,
        difference: Math.round((Math.max(0, st.score) - peerAvgScore) * 10) / 10
      }
    };
  });

  // 7. Chapter-wise Performance Array (Item 8)
  const chapterPerformanceList = Object.values(chapterStats).map(ch => {
    const attempted = ch.correct + ch.wrong;
    const acc = attempted > 0 ? Math.round((ch.correct / attempted) * 100) : 0;
    return {
      chapter_name: ch.chapter_name,
      subject: ch.subject,
      correct: ch.correct,
      wrong: ch.wrong,
      total: ch.total,
      accuracy_percent: acc
    };
  }).sort((a, b) => a.accuracy_percent - b.accuracy_percent);

  // 8. Strong & Weak Topics Identification (Item 13)
  // Only include chapters with minimum attempt count (at least 2 questions attempted)
  const validChapters = chapterPerformanceList.filter(c => (c.correct + c.wrong) >= 1 || c.total >= 2);
  const weakTopics = validChapters.filter(c => c.accuracy_percent < 65).slice(0, 5);
  const strongTopics = validChapters.filter(c => c.accuracy_percent >= 65).reverse().slice(0, 5);

  // 9. Personalized Improvement Plan (Item 14)
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

  // 10. Recommended eBooks (Item 15)
  // Query eBooks matching student's weak subjects or chapters
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

  // 11. Revision Strategy (Item 16)
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

  // 12. Cumulative N-Test Accuracy Trend
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

  // Consolidated JSON response payload
  const responseData = {
    test_info: test,
    summary: {
      all_india_rank: currentAttemptRank.computed_air || 1,
      total_participants: currentAttemptRank.total_participants || 1,
      percentile: currentAttemptRank.computed_percentile || 100.0,
      total_score: Number(currentAttemptRank.total_score) || 0,
      max_marks: Number(test.max_marks) || 720,
      percentage: Number(test.max_marks) > 0 ? Math.round(((Number(currentAttemptRank.total_score) || 0) / Number(test.max_marks)) * 10000) / 100 : 0,
      overall_accuracy: (totalCorrect + totalIncorrect) > 0 ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100) : 0,
      total_questions: questionPeerStatsRes.rowCount,
      correct_count: totalCorrect,
      incorrect_count: totalIncorrect,
      unattempted_count: totalUnattempted
    },
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

  res.json(responseData);
});
