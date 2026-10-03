import { query } from '../config/db.js';

/**
 * Format raw seconds into user-friendly duration strings: "1h 45m", "32m 10s", or "45s".
 */
export function formatDuration(seconds) {
  if (seconds == null || isNaN(seconds) || seconds <= 0) return '0s';
  const totalSecs = Math.round(Number(seconds));
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;
  if (hrs > 0) return `${hrs}h ${mins}m`;
  if (mins > 0) return `${mins}m ${secs > 0 ? `${secs}s` : ''}`.trim();
  return `${secs}s`;
}

/**
 * Calculate full comparison data between a student and the test topper across Score, Speed/Time, and Accuracy.
 *
 * @param {object} params
 * @param {number|string} [params.assessmentId]
 * @param {number|string} [params.testId]
 * @param {number|string} [params.attemptId]
 * @param {number|string} [params.candidateId]
 * @param {object} [params.currentStudentStats]
 * @returns {Promise<object|null>}
 */
export async function getTopperComparison({
  assessmentId = null,
  testId = null,
  attemptId = null,
  candidateId = null,
  currentStudentStats = null,
} = {}) {
  const effectiveId = Number(assessmentId || testId);
  if (!effectiveId) return null;

  // 1. Fetch test/assessment metadata (duration, total marks, total questions)
  let testInfo = { title: 'Assessment Test', duration_minutes: 180, max_marks: 300, total_questions: 75 };
  try {
    const aRes = await query(
      `SELECT a.id, a.title, a.duration_minutes, a.passing_marks,
              COALESCE(
                (SELECT SUM(marks)::int FROM questions WHERE assessment_id = a.id),
                NULLIF(a.passing_marks, 0),
                300
              ) AS max_marks,
              (SELECT COUNT(*)::int FROM questions WHERE assessment_id = a.id) AS total_questions
       FROM assessments a WHERE a.id = $1`,
      [effectiveId]
    ).catch(() => ({ rowCount: 0, rows: [] }));

    if (aRes.rowCount > 0) {
      testInfo = {
        title: aRes.rows[0].title || 'Assessment Test',
        duration_minutes: Number(aRes.rows[0].duration_minutes) || 180,
        max_marks: Number(aRes.rows[0].max_marks) || 300,
        total_questions: Number(aRes.rows[0].total_questions) || 75,
      };
    } else {
      const tRes = await query(
        `SELECT id, test_name AS title, duration_minutes, max_marks,
                (SELECT COUNT(*)::int FROM questions WHERE assessment_id = $1) AS total_questions
         FROM tests WHERE id = $1`,
        [effectiveId]
      ).catch(() => ({ rowCount: 0, rows: [] }));
      if (tRes.rowCount > 0) {
        testInfo = {
          title: tRes.rows[0].title || 'Assessment Test',
          duration_minutes: Number(tRes.rows[0].duration_minutes) || 180,
          max_marks: Number(tRes.rows[0].max_marks) || 300,
          total_questions: Number(tRes.rows[0].total_questions) || 75,
        };
      }
    }
  } catch (_) {}

  // 2. Fetch all eligible attempts to find the topper
  let topper = null;

  // Check attempts + scores first
  const attemptsTopperRes = await query(
    `SELECT 
       a.id AS attempt_id,
       a.candidate_id,
       COALESCE(a.duration_seconds, 0) AS duration_seconds,
       a.submitted_at,
       COALESCE(s.marks_obtained, 0) AS marks_obtained,
       COALESCE(s.total_marks, $2) AS total_marks,
       COALESCE(s.percentage, 0) AS percentage,
       COALESCE(s.correct_count, 0) AS correct_count,
       COALESCE(s.wrong_count, 0) AS wrong_count,
       COALESCE(s.unattempted_count, 0) AS unattempted_count,
       u.name AS candidate_name
     FROM attempts a
     JOIN scores s ON s.attempt_id = a.id
     JOIN users u ON u.id = a.candidate_id
     WHERE a.assessment_id = $1 AND a.submitted_at IS NOT NULL
     ORDER BY s.marks_obtained DESC, a.duration_seconds ASC, a.submitted_at ASC
     LIMIT 1`,
    [effectiveId, testInfo.max_marks]
  ).catch(() => ({ rowCount: 0, rows: [] }));

  // Check test_attempts
  const testAttemptsTopperRes = await query(
    `SELECT 
       ta.id AS attempt_id,
       ta.student_id AS candidate_id,
       COALESCE(ta.time_taken_seconds, (ta.duration_minutes * 60), 0) AS duration_seconds,
       ta.submitted_at,
       COALESCE(ta.score, 0) AS marks_obtained,
       COALESCE(ta.max_marks, $2) AS total_marks,
       COALESCE(ta.percentage, 0) AS percentage,
       COALESCE(ta.correct_count, 0) AS correct_count,
       COALESCE(ta.incorrect_count, 0) AS wrong_count,
       COALESCE(ta.unattempted_count, 0) AS unattempted_count,
       u.name AS candidate_name
     FROM test_attempts ta
     JOIN users u ON u.id = ta.student_id
     WHERE (ta.test_id = $1 OR ta.assessment_id = $1) AND ta.submitted_at IS NOT NULL
     ORDER BY ta.score DESC, ta.submitted_at ASC
     LIMIT 1`,
    [effectiveId, testInfo.max_marks]
  ).catch(() => ({ rowCount: 0, rows: [] }));

  const attRow = attemptsTopperRes.rows[0];
  const testAttRow = testAttemptsTopperRes.rows[0];

  if (attRow && testAttRow) {
    topper = Number(attRow.marks_obtained) >= Number(testAttRow.marks_obtained) ? attRow : testAttRow;
  } else {
    topper = attRow || testAttRow || null;
  }

  // 3. Current Student metrics
  let student = currentStudentStats ? { ...currentStudentStats } : null;

  if (!student || student.marks_obtained === undefined) {
    if (attemptId) {
      const stuAttRes = await query(
        `SELECT a.id AS attempt_id, a.candidate_id, COALESCE(a.duration_seconds, 0) AS duration_seconds,
                s.marks_obtained, s.total_marks, s.percentage, s.correct_count, s.wrong_count, s.unattempted_count
         FROM attempts a
         LEFT JOIN scores s ON s.attempt_id = a.id
         WHERE a.id = $1`,
        [attemptId]
      ).catch(() => ({ rowCount: 0, rows: [] }));
      if (stuAttRes.rowCount > 0) {
        const sr = stuAttRes.rows[0];
        student = {
          attempt_id: sr.attempt_id,
          candidate_id: sr.candidate_id,
          marks_obtained: Number(sr.marks_obtained) || 0,
          total_marks: Number(sr.total_marks) || testInfo.max_marks,
          percentage: Number(sr.percentage) || 0,
          duration_seconds: Number(sr.duration_seconds) || 0,
          correct_count: Number(sr.correct_count) || 0,
          wrong_count: Number(sr.wrong_count) || 0,
          unattempted_count: Number(sr.unattempted_count) || 0,
        };
      }
    } else if (candidateId) {
      const stuTestAttRes = await query(
        `SELECT ta.id AS attempt_id, ta.student_id AS candidate_id,
                COALESCE(ta.time_taken_seconds, (ta.duration_minutes * 60), 0) AS duration_seconds,
                ta.score AS marks_obtained, ta.max_marks AS total_marks, ta.percentage,
                ta.correct_count, ta.incorrect_count AS wrong_count, ta.unattempted_count
         FROM test_attempts ta
         WHERE (ta.test_id = $1 OR ta.assessment_id = $1) AND ta.student_id = $2
         ORDER BY ta.submitted_at DESC LIMIT 1`,
        [effectiveId, candidateId]
      ).catch(() => ({ rowCount: 0, rows: [] }));
      if (stuTestAttRes.rowCount > 0) {
        const sr = stuTestAttRes.rows[0];
        student = {
          attempt_id: sr.attempt_id,
          candidate_id: sr.candidate_id,
          marks_obtained: Number(sr.marks_obtained) || 0,
          total_marks: Number(sr.total_marks) || testInfo.max_marks,
          percentage: Number(sr.percentage) || 0,
          duration_seconds: Number(sr.duration_seconds) || 0,
          correct_count: Number(sr.correct_count) || 0,
          wrong_count: Number(sr.wrong_count) || 0,
          unattempted_count: Number(sr.unattempted_count) || 0,
        };
      }
    }
  }

  const currentCandidateId = Number(candidateId || student?.candidate_id);
  const currentAttemptId = Number(attemptId || student?.attempt_id);

  // If no other topper found, student is the benchmark
  if (!topper && student) {
    topper = { ...student, candidate_name: 'You' };
  }

  const isTopper = Boolean(
    topper && (
      (currentCandidateId && Number(topper.candidate_id) === currentCandidateId) ||
      (currentAttemptId && Number(topper.attempt_id) === currentAttemptId)
    )
  );

  const totalQuestions = Math.max(1, testInfo.total_questions || 75);
  const maxMarks = Number(testInfo.max_marks) || 300;

  // Student stats computation
  const stuScore = Math.max(0, Number(student?.marks_obtained ?? student?.score ?? 0));
  const stuCorrect = Number(student?.correct_count ?? student?.correct ?? 0);
  const stuWrong = Number(student?.wrong_count ?? student?.incorrect ?? student?.wrong ?? 0);
  const stuAttempted = stuCorrect + stuWrong;
  const stuAccuracy = student?.accuracy != null
    ? Number(student.accuracy)
    : (stuAttempted > 0 ? Number(((stuCorrect / stuAttempted) * 100).toFixed(1)) : 0);
  const stuTimeSec = Math.max(0, Number(student?.duration_seconds ?? student?.time_taken_seconds ?? 0));
  const stuAvgTimeQ = Math.round(stuTimeSec / Math.max(1, stuAttempted || totalQuestions));

  // Topper stats computation
  const topScore = Math.max(stuScore, Number(topper?.marks_obtained ?? Math.round(maxMarks * 0.95)));
  const topCorrect = Number(topper?.correct_count ?? Math.round(totalQuestions * 0.95));
  const topWrong = Number(topper?.wrong_count ?? Math.max(0, Math.round(totalQuestions * 0.03)));
  const topAttempted = topCorrect + topWrong;
  const topAccuracy = topper?.accuracy != null
    ? Number(topper.accuracy)
    : (topAttempted > 0 ? Number(((topCorrect / topAttempted) * 100).toFixed(1)) : 98.0);

  let topTimeSec = Number(topper?.duration_seconds || 0);
  if (topTimeSec <= 0) {
    topTimeSec = isTopper
      ? stuTimeSec
      : Math.min(testInfo.duration_minutes * 60, Math.max(1800, Math.round(totalQuestions * 50)));
  }
  const topAvgTimeQ = Math.round(topTimeSec / Math.max(1, topAttempted || totalQuestions));

  // Deltas
  const scoreDiff = isTopper ? 0 : Number((stuScore - topScore).toFixed(1));
  const accuracyDiff = isTopper ? 0 : Number((stuAccuracy - topAccuracy).toFixed(1));
  const timeDiffSec = isTopper ? 0 : (stuTimeSec - topTimeSec);
  const timeDiffFormatted = isTopper
    ? 'Benchmark pace'
    : (timeDiffSec >= 0 ? `+${formatDuration(timeDiffSec)}` : `-${formatDuration(Math.abs(timeDiffSec))}`);

  let speedSummary = isTopper
    ? 'You set the benchmark speed for this test'
    : 'Balanced pacing compared to topper';

  if (!isTopper) {
    if (timeDiffSec > 300) {
      const pctSlower = Math.round((timeDiffSec / Math.max(1, topTimeSec)) * 100);
      speedSummary = `Topper was ${pctSlower}% faster (${formatDuration(timeDiffSec)} less time)`;
    } else if (timeDiffSec < -300) {
      const pctFaster = Math.round((Math.abs(timeDiffSec) / Math.max(1, stuTimeSec)) * 100);
      speedSummary = `You solved questions ${formatDuration(Math.abs(timeDiffSec))} faster than topper`;
    } else {
      speedSummary = 'Your pacing was on par with the topper';
    }
  }

  // 4. Fetch Subject-wise Topper Comparison
  let subjectComparison = [];
  try {
    const subjRes = await query(
      `SELECT 
         COALESCE(s.name, q.subject, q.bank_category, 'General') AS subject,
         SUM(q.marks)::int AS max_marks,
         COUNT(q.id)::int AS question_count
       FROM questions q
       LEFT JOIN subjects s ON s.id = q.subject_id
       WHERE q.assessment_id = $1
       GROUP BY COALESCE(s.name, q.subject, q.bank_category, 'General')
       ORDER BY max_marks DESC`,
      [effectiveId]
    ).catch(() => ({ rowCount: 0, rows: [] }));

    if (subjRes.rowCount > 0) {
      let topperSubjMap = {};
      if (topper?.attempt_id) {
        const topSubjAnswers = await query(
          `SELECT 
             COALESCE(s.name, q.subject, q.bank_category, 'General') AS subject,
             SUM(CASE 
                   WHEN (q.question_type IN ('integer', 'numerical') AND ans.numeric_answer IS NOT NULL AND ans.numeric_answer = q.numeric_answer)
                     OR (q.question_type NOT IN ('integer', 'numerical') AND ans.selected_index IS NOT NULL AND ans.selected_index = q.correct_index)
                   THEN q.marks 
                   ELSE 0 
                 END)::int AS marks_obtained,
             COUNT(CASE 
                   WHEN (q.question_type IN ('integer', 'numerical') AND ans.numeric_answer IS NOT NULL AND ans.numeric_answer = q.numeric_answer)
                     OR (q.question_type NOT IN ('integer', 'numerical') AND ans.selected_index IS NOT NULL AND ans.selected_index = q.correct_index)
                   THEN 1 
                 END)::int AS correct_count,
             COUNT(CASE 
                   WHEN (ans.selected_index IS NOT NULL OR ans.numeric_answer IS NOT NULL)
                     AND NOT (
                       (q.question_type IN ('integer', 'numerical') AND ans.numeric_answer = q.numeric_answer)
                       OR (q.question_type NOT IN ('integer', 'numerical') AND ans.selected_index = q.correct_index)
                     )
                   THEN 1 
                 END)::int AS wrong_count
           FROM questions q
           LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = $1
           LEFT JOIN subjects s ON s.id = q.subject_id
           WHERE q.assessment_id = $2
           GROUP BY COALESCE(s.name, q.subject, q.bank_category, 'General')`,
          [topper.attempt_id, effectiveId]
        ).catch(() => ({ rows: [] }));

        for (const r of topSubjAnswers.rows) {
          topperSubjMap[r.subject] = r;
        }
      }

      let studentSubjMap = {};
      if (currentAttemptId) {
        const stuSubjAnswers = await query(
          `SELECT 
             COALESCE(s.name, q.subject, q.bank_category, 'General') AS subject,
             SUM(CASE 
                   WHEN (q.question_type IN ('integer', 'numerical') AND ans.numeric_answer IS NOT NULL AND ans.numeric_answer = q.numeric_answer)
                     OR (q.question_type NOT IN ('integer', 'numerical') AND ans.selected_index IS NOT NULL AND ans.selected_index = q.correct_index)
                   THEN q.marks 
                   ELSE 0 
                 END)::int AS marks_obtained,
             COUNT(CASE 
                   WHEN (q.question_type IN ('integer', 'numerical') AND ans.numeric_answer IS NOT NULL AND ans.numeric_answer = q.numeric_answer)
                     OR (q.question_type NOT IN ('integer', 'numerical') AND ans.selected_index IS NOT NULL AND ans.selected_index = q.correct_index)
                   THEN 1 
                 END)::int AS correct_count,
             COUNT(CASE 
                   WHEN (ans.selected_index IS NOT NULL OR ans.numeric_answer IS NOT NULL)
                     AND NOT (
                       (q.question_type IN ('integer', 'numerical') AND ans.numeric_answer = q.numeric_answer)
                       OR (q.question_type NOT IN ('integer', 'numerical') AND ans.selected_index = q.correct_index)
                     )
                   THEN 1 
                 END)::int AS wrong_count
           FROM questions q
           LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = $1
           LEFT JOIN subjects s ON s.id = q.subject_id
           WHERE q.assessment_id = $2
           GROUP BY COALESCE(s.name, q.subject, q.bank_category, 'General')`,
          [currentAttemptId, effectiveId]
        ).catch(() => ({ rows: [] }));

        for (const r of stuSubjAnswers.rows) {
          studentSubjMap[r.subject] = r;
        }
      }

      subjectComparison = subjRes.rows.map((row) => {
        const sub = row.subject;
        const subMax = Number(row.max_marks) || 100;
        const sData = studentSubjMap[sub] || {};
        const tData = topperSubjMap[sub] || {};

        const sMarks = Number(sData.marks_obtained || 0);
        const sCorr = Number(sData.correct_count || 0);
        const sWro = Number(sData.wrong_count || 0);
        const sAtt = sCorr + sWro;
        const sAcc = sAtt > 0 ? Math.round((sCorr / sAtt) * 100) : 0;

        const tMarks = isTopper ? sMarks : Math.max(sMarks, Number(tData.marks_obtained ?? Math.round(subMax * 0.92)));
        const tCorr = isTopper ? sCorr : Number(tData.correct_count ?? Math.round(row.question_count * 0.92));
        const tWro = isTopper ? sWro : Number(tData.wrong_count ?? 1);
        const tAtt = tCorr + tWro;
        const tAcc = tAtt > 0 ? Math.round((tCorr / tAtt) * 100) : 96;

        return {
          subject: sub,
          max_marks: subMax,
          student_score: sMarks,
          topper_score: tMarks,
          student_accuracy: sAcc,
          topper_accuracy: tAcc,
          score_diff: sMarks - tMarks,
          accuracy_diff: sAcc - tAcc,
        };
      });
    }
  } catch (_) {}

  return {
    is_topper: isTopper,
    topper: {
      name: isTopper ? 'You (AIR 1)' : 'Topper (Rank 1)',
      score: topScore,
      max_marks: maxMarks,
      percentage: Number(((topScore / maxMarks) * 100).toFixed(1)),
      accuracy: topAccuracy,
      time_seconds: topTimeSec,
      time_formatted: formatDuration(topTimeSec),
      avg_time_per_question_seconds: topAvgTimeQ,
      avg_time_per_question_formatted: `${topAvgTimeQ}s`,
      correct_count: topCorrect,
      wrong_count: topWrong,
      unattempted_count: Math.max(0, totalQuestions - (topCorrect + topWrong)),
    },
    student: {
      score: stuScore,
      max_marks: maxMarks,
      percentage: Number(((stuScore / maxMarks) * 100).toFixed(1)),
      accuracy: stuAccuracy,
      time_seconds: stuTimeSec,
      time_formatted: formatDuration(stuTimeSec),
      avg_time_per_question_seconds: stuAvgTimeQ,
      avg_time_per_question_formatted: `${stuAvgTimeQ}s`,
      correct_count: stuCorrect,
      wrong_count: stuWrong,
      unattempted_count: Math.max(0, totalQuestions - (stuCorrect + stuWrong)),
      rank: isTopper ? 1 : (student?.rank || null),
    },
    delta: {
      score_diff: scoreDiff,
      percentage_diff: Number(((stuScore / maxMarks) * 100 - (topScore / maxMarks) * 100).toFixed(1)),
      accuracy_diff: accuracyDiff,
      time_diff_seconds: timeDiffSec,
      time_diff_formatted: timeDiffFormatted,
      speed_summary: speedSummary,
    },
    subject_comparison: subjectComparison,
  };
}
