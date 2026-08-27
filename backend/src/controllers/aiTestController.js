import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {
  getWeakTopics,
  distributeQuestionCounts,
  generateQuestionsForTopic,
  calculateUnlockDelay,
} from '../services/aiTestService.js';

/**
 * POST /api/tests/generate-ai-weak-topic-test
 * Runs full Weak Topic Booster generation flow.
 */
export const generateAiWeakTopicTest = asyncHandler(async (req, res) => {
  const studentId = Number(req.body.studentId || req.user?.id);
  const attemptId = req.body.attemptId || req.body.testId ? Number(req.body.attemptId || req.body.testId) : null;

  if (!studentId || isNaN(studentId)) {
    throw ApiError.badRequest('Valid student ID required.');
  }

  // 1. Resolve student's examType ("JEE" | "NEET")
  const userRes = await query(
    `SELECT u.exam_type, sp.target_exam
     FROM users u
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     WHERE u.id = $1`,
    [studentId]
  ).catch(() => ({ rows: [] }));

  let examType = userRes.rows[0]?.exam_type || 'JEE';
  if (userRes.rows[0]?.target_exam && /neet/i.test(userRes.rows[0].target_exam)) {
    examType = 'NEET';
  }

  // 2. Identify weak topics for this attempt or student overall (threshold = 60%, limit = 5)
  const weakTopics = await getWeakTopics(studentId, 60, 5, attemptId);

  if (!weakTopics || weakTopics.length === 0) {
    throw ApiError.badRequest('No weak topics found (accuracy below 60%). You are performing well across all topics!');
  }

  // 3. Distribute question counts (total 20 questions) inversely weighted by accuracy
  const distributedTopics = distributeQuestionCounts(weakTopics, 20);

  // 4. Generate fresh questions for each weak topic using Claude API
  let allQuestions = [];
  for (const wt of distributedTopics) {
    // Difficulty mix logic: skew easier if topic accuracy < 40%
    const difficultyMix = wt.accuracy < 40
      ? '60% easy, 30% medium, 10% hard'
      : '40% easy, 40% medium, 20% hard';

    const questionsForTopic = await generateQuestionsForTopic(
      wt.topic,
      wt.subtopic,
      examType,
      difficultyMix,
      wt.count,
      wt.subject
    );

    allQuestions = allQuestions.concat(questionsForTopic);
  }

  // 5. Calculate unlock delay (spaced repetition): 2 days if avg < 40%, 3 days if 40-60%
  const avgAccuracy = weakTopics.reduce((sum, t) => sum + t.accuracy, 0) / weakTopics.length;
  const delayDays = calculateUnlockDelay(avgAccuracy);

  const now = new Date();
  const unlockAt = new Date(now.getTime() + delayDays * 24 * 60 * 60 * 1000);
  const expiresAt = new Date(unlockAt.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days post unlock

  let sourceTestTitle = null;
  if (attemptId) {
    const titleRes = await query(
      `SELECT title AS name FROM assessments WHERE id = $1
       UNION
       SELECT test_name AS name FROM tests WHERE id = $1
       UNION
       SELECT a.title AS name FROM attempts at JOIN assessments a ON a.id = at.assessment_id WHERE at.id = $1
       UNION
       SELECT COALESCE(t.test_name, a.title) AS name FROM test_attempts ta LEFT JOIN tests t ON t.id = ta.test_id LEFT JOIN assessments a ON a.id = ta.assessment_id WHERE ta.id = $1
       LIMIT 1`,
      [attemptId]
    ).catch(() => ({ rows: [] }));
    sourceTestTitle = titleRes.rows[0]?.name;
  }

  const topicNames = Array.from(new Set(weakTopics.map((w) => w.topic)));
  const testTitle = sourceTestTitle
    ? `AI Improvement Test: ${sourceTestTitle} (${topicNames.join(', ')})`
    : `AI Improvement Test: ${topicNames.join(', ')}`;

  // 6. Save test in `tests` table
  const weakTopicsPayload = weakTopics.map((w) => ({
    topic: w.topic,
    subtopic: w.subtopic,
    subject: w.subject,
    accuracyAtGeneration: w.accuracy,
  }));

  const testInsertRes = await query(
    `INSERT INTO tests (
       test_name, test_type, type, status, test_date, start_time, end_time,
       duration_minutes, max_marks, is_published, available_from, available_until,
       unlock_at, expires_at, source_weak_topics, created_at
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())
     RETURNING id, test_name, type, status, unlock_at, expires_at`,
    [
      testTitle,
      'AIETS',
      'ai_weak_topic',
      'scheduled',
      unlockAt.toISOString().split('T')[0],
      '00:00:00',
      '23:59:59',
      45,
      allQuestions.length * 4,
      true,
      unlockAt,
      expiresAt,
      unlockAt,
      expiresAt,
      JSON.stringify(weakTopicsPayload),
    ]
  );

  const newTest = testInsertRes.rows[0];
  const testId = newTest.id;

  // Also create test_assignments for this specific student
  await query(
    `INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id)
     VALUES ($1, 'individual', $2)`,
    [testId, studentId]
  ).catch(() => {});

  // 7. Save generated questions in `questions` table (server-side answer storage)
  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    await query(
      `INSERT INTO questions (
         assessment_id, question_text, options, correct_index, correct_option_index,
         explanation, difficulty, topic, subtopic, subject, source, marks, position, created_at
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())`,
      [
        testId,
        q.question,
        JSON.stringify(q.options),
        q.correctOptionIndex,
        q.correctOptionIndex,
        q.explanation,
        q.difficulty,
        q.topic,
        q.subtopic,
        q.subject || 'Physics',
        'ai_generated',
        4,
        i + 1,
      ]
    );
  }

  // Return confirmation to frontend without questions
  return res.json({
    success: true,
    testId,
    unlockAt: unlockAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    delayDays,
    topics: weakTopicsPayload,
    message: `Your personalized AI improvement test on ${topicNames.join(', ')} is ready! It will unlock on ${unlockAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} (${delayDays} days revision time).`,
  });
});

/**
 * GET /api/tests/scheduled/:studentId
 * Returns list of scheduled & available AI tests for the student.
 */
export const getScheduledTests = asyncHandler(async (req, res) => {
  let studentId = req.params.studentId;
  if (!studentId || studentId === 'undefined' || studentId === 'null' || studentId === 'me' || isNaN(Number(studentId))) {
    studentId = req.user?.id;
  } else {
    studentId = Number(studentId);
  }

  if (!studentId || isNaN(studentId)) {
    return res.json({ tests: [] });
  }

  // Fetch tests assigned to candidate of type 'ai_weak_topic' or matching AI test title
  const result = await query(
    `SELECT DISTINCT ON (t.id)
       t.id AS test_id,
       t.test_name,
       t.test_type,
       t.type,
       t.status,
       t.unlock_at,
       t.expires_at,
       t.source_weak_topics,
       t.duration_minutes,
       t.max_marks,
       ta.id AS attempt_id,
       ta.submitted_at,
       ta.score,
       t.created_at
     FROM tests t
     LEFT JOIN test_assignments tas ON tas.test_id = t.id
     LEFT JOIN candidate_invites ci ON ci.assessment_id = t.id
     LEFT JOIN test_attempts ta ON ta.test_id = t.id AND ta.student_id = $1
     WHERE (t.type = 'ai_weak_topic' OR t.test_name LIKE 'AI Booster%' OR t.test_name LIKE 'AI Improvement%')
       AND (
         tas.assigned_to_id = $1 
         OR ci.candidate_email = (SELECT email FROM users WHERE id = $1)
         OR tas.assigned_to_id IS NULL
       )
       AND COALESCE(t.is_deleted, false) = false
     ORDER BY t.id, t.created_at DESC`,
    [studentId]
  );

  const now = new Date();
  const testsList = [];

  for (const row of result.rows) {
    let status = row.status || 'scheduled';
    const unlockAt = row.unlock_at ? new Date(row.unlock_at) : now;
    const expiresAt = row.expires_at ? new Date(row.expires_at) : new Date(now.getTime() + 7 * 86400000);

    // Auto-update status based on current time
    if (row.submitted_at) {
      status = 'completed';
    } else if (status === 'scheduled' && now >= unlockAt) {
      status = 'available';
      await query(`UPDATE tests SET status = 'available' WHERE id = $1`, [row.test_id]).catch(() => {});
    } else if (status === 'available' && now >= expiresAt) {
      status = 'expired';
      await query(`UPDATE tests SET status = 'expired' WHERE id = $1`, [row.test_id]).catch(() => {});
    }

    const unlocksInMs = Math.max(0, unlockAt.getTime() - now.getTime());
    const isUnlocked = now >= unlockAt;

    let topics = [];
    try {
      topics = typeof row.source_weak_topics === 'string'
        ? JSON.parse(row.source_weak_topics)
        : (row.source_weak_topics || []);
    } catch (_) {}

    testsList.push({
      id: row.test_id,
      test_id: row.test_id,
      test_name: row.test_name,
      type: row.type,
      status,
      unlock_at: unlockAt.toISOString(),
      expires_at: expiresAt.toISOString(),
      unlocksInMs,
      isUnlocked,
      duration_minutes: row.duration_minutes || 45,
      max_marks: row.max_marks || 80,
      topics,
      attempt_id: row.attempt_id || null,
      submitted_at: row.submitted_at || null,
      score: row.score != null ? Number(row.score) : null,
    });
  }

  res.json({ tests: testsList });
});

/**
 * POST /api/tests/:testId/start
 * 1. Checks unlock timing. If NOW < unlockAt -> 403 Forbidden with unlock date.
 * 2. Returns test questions with options ONLY (hiding correctOptionIndex and explanation).
 */
export const startTest = asyncHandler(async (req, res) => {
  const testId = Number(req.params.testId);
  const studentId = Number(req.user?.id);

  if (!testId || isNaN(testId)) {
    throw ApiError.badRequest('Invalid test ID');
  }

  // Fetch test details
  const testRes = await query(`SELECT * FROM tests WHERE id = $1 AND is_deleted IS NOT TRUE`, [testId]);
  if (!testRes.rowCount) {
    throw ApiError.notFound('Test not found.');
  }

  const test = testRes.rows[0];
  const now = new Date();
  const unlockAt = test.unlock_at ? new Date(test.unlock_at) : now;

  // Enforce scheduled unlock delay: Return 403 if attempt before unlock date
  if (test.type === 'ai_weak_topic' && test.status === 'scheduled' && now < unlockAt) {
    const formattedUnlock = unlockAt.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return res.status(403).json({
      success: false,
      message: `Your AI Weak Topic Booster test is currently locked for revision. It will unlock on ${formattedUnlock}.`,
      unlockAt: unlockAt.toISOString(),
    });
  }

  // If unlocked, ensure status is flipped to 'available'
  if (test.status === 'scheduled' && now >= unlockAt) {
    await query(`UPDATE tests SET status = 'available' WHERE id = $1`, [testId]).catch(() => {});
    test.status = 'available';
  }

  // Fetch questions, explicitly omitting correct_option_index, correct_index, explanation
  const questionsRes = await query(
    `SELECT 
       id, assessment_id, question_text, options, position, marks,
       difficulty, topic, subtopic, subject
     FROM questions
     WHERE assessment_id = $1
     ORDER BY position, id`,
    [testId]
  );

  const sanitizedQuestions = questionsRes.rows.map((q) => {
    let opts = q.options;
    if (typeof opts === 'string') {
      try { opts = JSON.parse(opts); } catch (_) { opts = []; }
    }
    return {
      id: q.id,
      question_id: q.id,
      assessment_id: q.assessment_id,
      question_text: q.question_text,
      options: opts,
      difficulty: q.difficulty || 'medium',
      topic: q.topic || 'Weak Topic',
      subtopic: q.subtopic || 'General',
      subject: q.subject || 'Physics',
      marks: q.marks || 4,
    };
  });

  // Record/Upsert starting test_attempt
  if (studentId && !isNaN(studentId)) {
    await query(
      `INSERT INTO test_attempts (test_id, student_id, started_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (test_id, student_id) DO UPDATE SET started_at = COALESCE(test_attempts.started_at, NOW())`,
      [testId, studentId]
    ).catch(() => {});
  }

  res.json({
    test: {
      id: test.id,
      test_name: test.test_name,
      test_type: test.test_type,
      duration_minutes: test.duration_minutes,
      max_marks: test.max_marks,
      status: test.status,
      unlock_at: test.unlock_at,
    },
    questions: sanitizedQuestions,
  });
});

/**
 * POST /api/tests/:testId/submit
 * Scores student answers against stored correct answers server-side, updates test_attempts,
 * recomputes topic accuracy, and returns Before vs After comparison + explanations.
 */
export const submitTest = asyncHandler(async (req, res) => {
  const testId = Number(req.params.testId);
  const studentId = Number(req.body.studentId || req.user?.id);
  const userAnswers = req.body.answers || []; // [{ questionId, selectedOption, timeTaken }] or Object

  if (!testId || isNaN(testId)) {
    throw ApiError.badRequest('Invalid test ID');
  }

  // Fetch test details
  const testRes = await query(`SELECT * FROM tests WHERE id = $1`, [testId]);
  if (!testRes.rowCount) throw ApiError.notFound('Test not found');
  const test = testRes.rows[0];

  // Fetch stored questions with correct answers & explanations
  const questionsRes = await query(
    `SELECT 
       id, question_text, options, correct_index, correct_option_index,
       explanation, difficulty, topic, subtopic, subject, marks
     FROM questions
     WHERE assessment_id = $1
     ORDER BY position, id`,
    [testId]
  );

  const questions = questionsRes.rows;
  const answersMap = new Map();

  if (Array.isArray(userAnswers)) {
    for (const ans of userAnswers) {
      answersMap.set(Number(ans.questionId || ans.question_id), ans);
    }
  } else if (typeof userAnswers === 'object' && userAnswers !== null) {
    for (const [qId, sel] of Object.entries(userAnswers)) {
      answersMap.set(Number(qId), typeof sel === 'object' ? sel : { selectedOption: sel });
    }
  }

  let marksObtained = 0;
  let totalMarks = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  const responsesList = [];
  const topicPerformancePost = {};

  for (const q of questions) {
    const qMarks = Number(q.marks) || 4;
    totalMarks += qMarks;

    const uAns = answersMap.get(q.id) || {};
    const selectedOpt = uAns.selectedOption !== undefined && uAns.selectedOption !== null
      ? Number(uAns.selectedOption)
      : null;
    const timeSpent = Number(uAns.timeTaken || uAns.time_spent_seconds || 0);

    const correctIndex = q.correct_option_index != null ? Number(q.correct_option_index) : Number(q.correct_index);
    const isAttempted = selectedOpt !== null && !isNaN(selectedOpt);
    const isCorrect = isAttempted && selectedOpt === correctIndex;

    if (isAttempted) {
      if (isCorrect) {
        marksObtained += qMarks;
        correctCount += 1;
      } else {
        marksObtained -= 1; // standard penalty
        wrongCount += 1;
      }
    } else {
      unattemptedCount += 1;
    }

    const tName = q.topic || 'General Topic';
    if (!topicPerformancePost[tName]) {
      topicPerformancePost[tName] = { topic: tName, subtopic: q.subtopic, correct: 0, attempted: 0, total: 0 };
    }
    topicPerformancePost[tName].total += 1;
    if (isAttempted) {
      topicPerformancePost[tName].attempted += 1;
      if (isCorrect) topicPerformancePost[tName].correct += 1;
    }

    let opts = q.options;
    if (typeof opts === 'string') {
      try { opts = JSON.parse(opts); } catch (_) { opts = []; }
    }

    responsesList.push({
      questionId: q.id,
      questionText: q.question_text,
      options: opts,
      selectedOption: selectedOpt,
      correctOptionIndex: correctIndex,
      isCorrect,
      isAttempted,
      explanation: q.explanation || 'Refer to fundamental concept principles.',
      difficulty: q.difficulty || 'medium',
      topic: q.topic,
      subtopic: q.subtopic,
      subject: q.subject,
      timeSpentSeconds: timeSpent,
    });
  }

  const percentage = totalMarks > 0 ? Math.max(0, Math.round((marksObtained / totalMarks) * 100)) : 0;

  // Calculate Before vs After Topic Accuracy Comparison
  let sourceWeak = [];
  try {
    sourceWeak = typeof test.source_weak_topics === 'string'
      ? JSON.parse(test.source_weak_topics)
      : (test.source_weak_topics || []);
  } catch (_) {}

  const beforeAfterComparison = sourceWeak.map((sw) => {
    const postData = topicPerformancePost[sw.topic] || { correct: 0, attempted: 0, total: 1 };
    const afterAccuracy = postData.attempted > 0
      ? Math.round((postData.correct / postData.attempted) * 100)
      : (postData.total > 0 ? Math.round((postData.correct / postData.total) * 100) : 0);

    const beforeAccuracy = Math.round(Number(sw.accuracyAtGeneration || sw.accuracy || 35));
    const accuracyGain = afterAccuracy - beforeAccuracy;

    return {
      topic: sw.topic,
      subtopic: sw.subtopic,
      subject: sw.subject,
      beforeAccuracy,
      afterAccuracy,
      accuracyGain,
      improved: accuracyGain > 0,
    };
  });

  // Update test_attempts and test status
  await query(
    `INSERT INTO test_attempts (
       test_id, student_id, started_at, submitted_at, score, max_marks,
       percentage, question_responses, before_after_topics
     )
     VALUES ($1, $2, NOW() - INTERVAL '30 minutes', NOW(), $3, $4, $5, $6, $7)
     ON CONFLICT (test_id, student_id) DO UPDATE SET
       submitted_at = NOW(),
       score = EXCLUDED.score,
       max_marks = EXCLUDED.max_marks,
       percentage = EXCLUDED.percentage,
       question_responses = EXCLUDED.question_responses,
       before_after_topics = EXCLUDED.before_after_topics`,
    [
      testId,
      studentId,
      marksObtained,
      totalMarks,
      percentage,
      JSON.stringify(responsesList),
      JSON.stringify(beforeAfterComparison),
    ]
  );

  await query(`UPDATE tests SET status = 'completed' WHERE id = $1`, [testId]).catch(() => {});

  res.json({
    success: true,
    score: {
      marksObtained,
      totalMarks,
      percentage,
      correctCount,
      wrongCount,
      unattemptedCount,
    },
    beforeAfterComparison,
    questionsWithExplanations: responsesList,
  });
});
