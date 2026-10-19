import crypto from 'crypto';
import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { solveStudentDoubt, callGeminiAIStream, callOpenRouterAIStream, generatePersonalized7DayPlan } from '../services/geminiService.js';
import { getCachedAIReport, saveCachedAIReport } from '../services/aiReportCache.js';
import { getTopperComparison } from '../services/topperComparisonService.js';


export const getProfile = asyncHandler(async (req, res) => {
  const numId = Number(req.user?.id);
  if (!req.user?.id || isNaN(numId) || (typeof req.user.id === 'string' && (req.user.id.startsWith('mock') || req.user.id.startsWith('inst')))) {
    return res.json({
      user: req.user,
      profile: {
        phone: req.user?.phone || '+91 98765 43210',
        city: 'New Delhi',
        state: 'Delhi',
        target_exam: 'JEE Main & Advanced',
        class: 'Class 12',
        avatar_url: req.user?.avatar_url || null,
      }
    });
  }

  const [user, profile] = await Promise.all([
    query('SELECT id, name, email, role, avatar_url, created_at FROM users WHERE id = $1', [numId]).catch(() => query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [numId])),
    query('SELECT * FROM student_profiles WHERE user_id = $1', [numId]),
  ]);

  const userObj = user.rows[0] || req.user;
  const profileObj = profile.rows[0] || null;
  if (userObj && profileObj?.avatar_url && !userObj.avatar_url) {
    userObj.avatar_url = profileObj.avatar_url;
  }
  if (profileObj && !profileObj.avatar_url && userObj?.avatar_url) {
    profileObj.avatar_url = userObj.avatar_url;
  }

  res.json({ user: userObj, profile: profileObj });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const numId = Number(req.user?.id);
  if (!req.user?.id || isNaN(numId) || (typeof req.user.id === 'string' && (req.user.id.startsWith('mock') || req.user.id.startsWith('inst')))) {
    return res.json({ message: 'Profile updated' });
  }

  const { name, phone, city, state, target_exam, class: studentClass, avatar_url } = req.body;

  if (name && avatar_url) {
    await query('UPDATE users SET name = $1, avatar_url = $2 WHERE id = $3', [name, avatar_url, numId]).catch(() => {});
  } else if (name) {
    await query('UPDATE users SET name = $1 WHERE id = $2', [name, numId]);
  } else if (avatar_url) {
    await query('UPDATE users SET avatar_url = $1 WHERE id = $2', [avatar_url, numId]).catch(() => {});
  }

  await query(
    `INSERT INTO student_profiles (user_id, phone, city, state, target_exam, class, avatar_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (user_id) DO UPDATE SET phone = EXCLUDED.phone, city = EXCLUDED.city,
       state = EXCLUDED.state, target_exam = EXCLUDED.target_exam, class = EXCLUDED.class,
       avatar_url = COALESCE(EXCLUDED.avatar_url, student_profiles.avatar_url), updated_at = NOW()`,
    [numId, phone || null, city || null, state || null, target_exam || null, studentClass || null, avatar_url || null]
  );
  res.json({ message: 'Profile updated' });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { current_password, new_password } = req.body;
  const userRes = await query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
  const valid = await comparePassword(current_password, userRes.rows[0].password_hash);
  if (!valid) throw ApiError.unauthorized('Current password is incorrect');
  const password_hash = await hashPassword(new_password);
  await query('UPDATE users SET password_hash = $1 WHERE id = $2', [password_hash, req.user.id]);
  res.json({ message: 'Password changed' });
});

export const getLeaderboardAssessments = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT a.id, a.title, COUNT(DISTINCT at.id)::int AS attempt_count
     FROM assessments a
     JOIN attempts at ON at.assessment_id = a.id
     JOIN scores s ON s.attempt_id = at.id
     WHERE at.status IN ('submitted', 'auto_submitted')
     GROUP BY a.id, a.title
     ORDER BY a.title ASC`
  );
  res.json({ assessments: result.rows });
});

export const NEET_TIERS = [
  { minScore: 672, maxScore: 720, minRank: 1,      maxRank: 10,       rangeStr: '1–10' },
  { minScore: 650, maxScore: 671, minRank: 11,     maxRank: 100,      rangeStr: '11–100' },
  { minScore: 630, maxScore: 649, minRank: 101,    maxRank: 500,      rangeStr: '101–500' },
  { minScore: 616, maxScore: 629, minRank: 501,    maxRank: 1000,     rangeStr: '501–1,000' },
  { minScore: 571, maxScore: 615, minRank: 1001,   maxRank: 5000,     rangeStr: '1,001–5,000' },
  { minScore: 542, maxScore: 570, minRank: 5001,   maxRank: 10000,    rangeStr: '5,001–10,000' },
  { minScore: 528, maxScore: 541, minRank: 10001,  maxRank: 20000,    rangeStr: '10,001–20,000' },
  { minScore: 515, maxScore: 527, minRank: 20001,  maxRank: 30000,    rangeStr: '20,001–30,000' },
  { minScore: 496, maxScore: 514, minRank: 30001,  maxRank: 50000,    rangeStr: '30,001–50,000' },
  { minScore: 465, maxScore: 495, minRank: 50001,  maxRank: 100000,   rangeStr: '50,001–1,00,000' },
  { minScore: 424, maxScore: 464, minRank: 100001, maxRank: 200000,   rangeStr: '1,00,001–2,00,000' },
  { minScore: 0,   maxScore: 423, minRank: 200001, maxRank: 400000,   rangeStr: 'Above 2,00,000' },
];

export function getExactNeetRank(marksObtained, totalMarks = 720) {
  if (marksObtained == null || isNaN(Number(marksObtained))) return null;
  const numScore = totalMarks && Number(totalMarks) !== 720
    ? (Number(marksObtained) / Number(totalMarks)) * 720
    : Number(marksObtained);

  const tier = NEET_TIERS.find((t) => numScore >= t.minScore) || NEET_TIERS[NEET_TIERS.length - 1];
  if (tier.minScore === 0) {
    const deficit = Math.max(0, 423 - numScore);
    return Math.min(tier.maxRank, 200000 + Math.round(deficit * 470) + 1);
  }
  const spanScore = tier.maxScore - tier.minScore;
  const spanRank = tier.maxRank - tier.minRank;
  const fractionFromTop = spanScore > 0 ? (tier.maxScore - numScore) / spanScore : 0;
  return tier.minRank + Math.round(fractionFromTop * spanRank);
}

export function getNeetPredictedRank(marksObtained, totalMarks = 720) {
  if (marksObtained == null) return 'Above 2,00,000';
  const score = totalMarks && Number(totalMarks) !== 720 
    ? (Number(marksObtained) / Number(totalMarks)) * 720 
    : Number(marksObtained);
  const tier = NEET_TIERS.find((t) => score >= t.minScore) || NEET_TIERS[NEET_TIERS.length - 1];
  return tier.rangeStr;
}

export const getLeaderboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let assessmentId = req.query.assessment_id ? Number(req.query.assessment_id) : null;
  const testSeriesId = req.query.test_series_id ? Number(req.query.test_series_id) : null;

  if (testSeriesId && !assessmentId) {
    const inSeries = await query(
      `SELECT a.id, a.title
       FROM assessments a
       JOIN test_series_assessments tsa ON tsa.assessment_id = a.id
       JOIN attempts at ON at.assessment_id = a.id
       JOIN scores s ON s.attempt_id = at.id
       WHERE tsa.test_series_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       GROUP BY a.id, a.title
       ORDER BY a.title ASC
       LIMIT 1`,
      [testSeriesId]
    );
    if (inSeries.rowCount) assessmentId = inSeries.rows[0].id;
  }

  if (!assessmentId) {
    const recent = await query(
      `SELECT at.assessment_id
       FROM attempts at
       JOIN scores s ON s.attempt_id = at.id
       WHERE at.candidate_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       ORDER BY at.submitted_at DESC NULLS LAST
       LIMIT 1`,
      [userId]
    );
    if (recent.rowCount) {
      assessmentId = recent.rows[0].assessment_id;
    } else {
      const any = await query(
        `SELECT at.assessment_id
         FROM attempts at
         JOIN scores s ON s.attempt_id = at.id
         WHERE at.status IN ('submitted', 'auto_submitted')
         ORDER BY at.submitted_at DESC NULLS LAST
         LIMIT 1`
      );
      assessmentId = any.rows[0]?.assessment_id ?? null;
    }
  }

  if (!assessmentId) {
    return res.json({
      assessment_id: null,
      assessment_title: null,
      your_rank: null,
      your_predicted_rank: null,
      leaderboard: [],
      topper_comparison: null,
      topperComparison: null,
      student_stats: null,
      has_student_attempt: false,
    });
  }

  const assessmentRes = await query('SELECT id, title FROM assessments WHERE id = $1', [assessmentId]);
  const assessment = assessmentRes.rows[0];
  if (!assessment) throw ApiError.notFound('Assessment not found');

  const result = await query(
    `SELECT at.id AS attempt_id,
            at.candidate_id,
            u.name,
            s.marks_obtained,
            s.total_marks,
            s.percentage,
            s.percentile,
            s.predicted_rank_range,
            s.rank_range,
            at.submitted_at,
            RANK() OVER (ORDER BY s.marks_obtained DESC, at.submitted_at ASC)::int AS rank
     FROM scores s
     JOIN attempts at ON at.id = s.attempt_id
     JOIN users u ON u.id = at.candidate_id
     WHERE at.assessment_id = $1
       AND at.status IN ('submitted', 'auto_submitted')
     ORDER BY rank ASC, at.submitted_at ASC
     LIMIT 100`,
    [assessmentId]
  );

  const yourRow = result.rows.find((r) => r.candidate_id === userId);
  const yourPredRank = yourRow
    ? (yourRow.predicted_rank_range || yourRow.rank_range || getNeetPredictedRank(yourRow.marks_obtained, yourRow.total_marks))
    : null;

  let currentStudentStats = null;
  if (yourRow) {
    const attDetailsRes = await query(
      `SELECT at.id AS attempt_id, at.duration_seconds, s.correct_count, s.wrong_count, s.unattempted_count, s.accuracy
       FROM attempts at
       LEFT JOIN scores s ON s.attempt_id = at.id
       WHERE at.id = $1`,
      [yourRow.attempt_id]
    ).catch(() => ({ rows: [] }));
    const attDet = attDetailsRes.rows[0] || {};
    currentStudentStats = {
      attempt_id: yourRow.attempt_id,
      candidate_id: userId,
      marks_obtained: Number(yourRow.marks_obtained),
      score: Number(yourRow.marks_obtained),
      total_marks: Number(yourRow.total_marks),
      percentage: Number(yourRow.percentage),
      duration_seconds: Number(attDet.duration_seconds || 0),
      correct_count: Number(attDet.correct_count || 0),
      wrong_count: Number(attDet.wrong_count || 0),
      unattempted_count: Number(attDet.unattempted_count || 0),
      accuracy: attDet.accuracy != null ? Number(attDet.accuracy) : null,
      rank: yourRow.rank,
    };
  }

  let topperComparison = null;
  try {
    topperComparison = await getTopperComparison({
      assessmentId,
      attemptId: yourRow?.attempt_id || null,
      candidateId: userId,
      currentStudentStats,
    });
  } catch (err) {
    console.error('Failed to get topper comparison for leaderboard:', err);
  }

  const yourExactRank = yourRow ? getExactNeetRank(yourRow.marks_obtained, yourRow.total_marks) : null;

  res.json({
    assessment_id: assessment.id,
    assessment_title: assessment.title,
    your_rank: yourRow?.rank ?? null,
    your_exact_rank: yourExactRank,
    your_predicted_rank: yourPredRank,
    your_percentage: yourRow ? Number(yourRow.percentage) : null,
    leaderboard: result.rows.map(({ candidate_id, ...row }) => {
      const predRank = row.predicted_rank_range || row.rank_range || getNeetPredictedRank(row.marks_obtained, row.total_marks);
      const exactRank = getExactNeetRank(row.marks_obtained, row.total_marks);
      return {
        ...row,
        exact_rank: exactRank,
        predicted_rank_range: predRank,
        is_you: candidate_id === userId,
      };
    }),
    topper_comparison: topperComparison,
    topperComparison,
    student_stats: currentStudentStats,
    has_student_attempt: Boolean(yourRow),
  });
});

export const getCertificate = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;
  const attempt = await query(
    `SELECT at.*, a.title AS assessment_title, u.name AS student_name, s.percentage, s.passed
     FROM attempts at JOIN assessments a ON a.id = at.assessment_id
     JOIN users u ON u.id = at.candidate_id
     LEFT JOIN scores s ON s.attempt_id = at.id
     WHERE at.id = $1`,
    [attemptId]
  );
  if (!attempt.rowCount) throw ApiError.notFound('Attempt not found');
  if (attempt.rows[0].candidate_id !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not allowed');
  }
  if (!attempt.rows[0].passed) throw ApiError.badRequest('Certificate only for passed attempts');

  let cert = await query('SELECT * FROM certificates WHERE attempt_id = $1', [attemptId]);
  if (!cert.rowCount) {
    const code = `AP-${attemptId}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    cert = await query(
      `INSERT INTO certificates (attempt_id, user_id, certificate_code) VALUES ($1,$2,$3) RETURNING *`,
      [attemptId, attempt.rows[0].candidate_id, code]
    );
  }
  res.json({ certificate: cert.rows[0], attempt: attempt.rows[0] });
});

import { processAndUploadImage } from '../services/cloudinaryService.js';

/**
 * Helper: Retrieve student's discussion scope (enrolled test series & target exam)
 */
export async function getStudentDiscussionScope(userId) {
  const numId = Number(userId);
  if (!numId || isNaN(numId)) {
    return {
      testSeriesList: [],
      testSeriesIds: [],
      examTypes: [],
      targetExam: null,
      isFreeDefault: false
    };
  }

  // 1. Fetch active test series enrollments
  const enrollRes = await query(
    `SELECT se.test_series_id, ts.title AS test_series_title, ts.exam_type, ts.slug
     FROM student_enrollments se
     JOIN test_series ts ON ts.id = se.test_series_id
     WHERE se.user_id = $1 AND se.status = 'active'
     ORDER BY se.purchased_at DESC`,
    [numId]
  );

  // 2. Fetch student profile target exam
  const profileRes = await query(
    `SELECT target_exam FROM student_profiles WHERE user_id = $1`,
    [numId]
  );
  const targetExam = profileRes.rows[0]?.target_exam || null;

  const testSeriesList = enrollRes.rows;
  const testSeriesIds = testSeriesList.map((r) => r.test_series_id);

  // 3. Extract unique exam types
  const examSet = new Set();
  testSeriesList.forEach((r) => {
    if (r.exam_type && r.exam_type.trim()) {
      examSet.add(r.exam_type.trim());
    }
  });
  if (targetExam && targetExam.trim()) {
    examSet.add(targetExam.trim());
  }

  // If student has no enrollments yet, offer free/active test series so they can participate in free student discussions
  if (testSeriesIds.length === 0) {
    const freeRes = await query(
      `SELECT id AS test_series_id, title AS test_series_title, exam_type, slug
       FROM test_series
       WHERE is_active = true AND (price = 0 OR is_featured = true)
       LIMIT 6`
    );
    freeRes.rows.forEach((r) => {
      if (r.exam_type) examSet.add(r.exam_type.trim());
    });
    return {
      testSeriesList: freeRes.rows,
      testSeriesIds: freeRes.rows.map((r) => r.test_series_id),
      examTypes: Array.from(examSet),
      targetExam,
      isFreeDefault: true
    };
  }

  return {
    testSeriesList,
    testSeriesIds,
    examTypes: Array.from(examSet),
    targetExam,
    isFreeDefault: false
  };
}

export const listForumTopics = asyncHandler(async (req, res) => {
  // Ensure image_url, test_series_id, and exam_type columns exist
  await query(`ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS image_url TEXT`).catch(() => {});
  await query(`ALTER TABLE forum_replies ADD COLUMN IF NOT EXISTS image_url TEXT`).catch(() => {});
  await query(`ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS test_series_id INTEGER REFERENCES test_series(id) ON DELETE SET NULL`).catch(() => {});
  await query(`ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS exam_type VARCHAR(100)`).catch(() => {});

  const { testSeriesId, examType } = req.query;
  const isStaff = req.user?.role === 'admin' || req.user?.role === 'faculty';

  let scope = null;
  const conditions = [];
  const params = [];

  if (!isStaff) {
    scope = await getStudentDiscussionScope(req.user.id);

    // If specific testSeriesId filter requested
    if (testSeriesId && testSeriesId !== 'all') {
      const tsId = parseInt(testSeriesId, 10);
      params.push(tsId);
      conditions.push(`ft.test_series_id = $${params.length}`);
    } else if (examType && examType !== 'all') {
      params.push(examType.trim());
      conditions.push(`LOWER(COALESCE(ft.exam_type, '')) = LOWER($${params.length})`);
    } else {
      // Default candidate view: ONLY show topics matching student's enrolled test series OR their enrolled exams
      const allowedSeries = scope.testSeriesIds;
      const allowedExams = scope.examTypes.map((e) => e.toLowerCase());

      const scopeConditions = [];

      if (allowedSeries.length > 0) {
        params.push(allowedSeries);
        scopeConditions.push(`ft.test_series_id = ANY($${params.length}::int[])`);
      }

      if (allowedExams.length > 0) {
        params.push(allowedExams);
        scopeConditions.push(`LOWER(COALESCE(ft.exam_type, '')) = ANY($${params.length}::text[])`);
      }

      if (scopeConditions.length > 0) {
        conditions.push(`(${scopeConditions.join(' OR ')})`);
      } else {
        conditions.push(`(ft.test_series_id IS NULL AND (ft.exam_type IS NULL OR ft.exam_type = 'General'))`);
      }
    }
  } else {
    // Staff view: can see all topics or filter
    if (testSeriesId && testSeriesId !== 'all') {
      params.push(parseInt(testSeriesId, 10));
      conditions.push(`ft.test_series_id = $${params.length}`);
    }
    if (examType && examType !== 'all') {
      params.push(examType.trim());
      conditions.push(`LOWER(COALESCE(ft.exam_type, '')) = LOWER($${params.length})`);
    }
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const result = await query(
    `SELECT ft.*, 
            ts.title AS test_series_title,
            ts.slug AS test_series_slug,
            u.name AS author_name, 
            u.role AS author_role,
            COUNT(fr.id)::int AS reply_count,
            COUNT(CASE WHEN u_reply.role = 'admin' OR u_reply.role = 'faculty' THEN 1 END)::int AS faculty_reply_count
     FROM forum_topics ft 
     JOIN users u ON u.id = ft.user_id
     LEFT JOIN test_series ts ON ts.id = ft.test_series_id
     LEFT JOIN forum_replies fr ON fr.topic_id = ft.id
     LEFT JOIN users u_reply ON u_reply.id = fr.user_id
     ${whereClause}
     GROUP BY ft.id, ts.title, ts.slug, u.name, u.role 
     ORDER BY ft.created_at DESC 
     LIMIT 100`,
    params
  );

  res.json({
    topics: result.rows,
    scope: scope || { testSeriesList: [], examTypes: [], targetExam: null }
  });
});

export const getForumTopic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const topic = await query(
    `SELECT ft.*, 
            ts.title AS test_series_title,
            ts.slug AS test_series_slug,
            u.name AS author_name, 
            u.role AS author_role 
     FROM forum_topics ft 
     LEFT JOIN test_series ts ON ts.id = ft.test_series_id
     JOIN users u ON u.id = ft.user_id 
     WHERE ft.id = $1`,
    [id]
  );
  if (!topic.rowCount) throw ApiError.notFound('Topic not found');

  const topicData = topic.rows[0];
  const isStaff = req.user?.role === 'admin' || req.user?.role === 'faculty';

  // Security: Check candidate has matching test series or exam
  if (!isStaff) {
    const scope = await getStudentDiscussionScope(req.user.id);
    const hasSeriesMatch = topicData.test_series_id && scope.testSeriesIds.includes(topicData.test_series_id);
    const hasExamMatch = topicData.exam_type && scope.examTypes.some((e) => e.toLowerCase() === topicData.exam_type.toLowerCase());
    const isAuthor = topicData.user_id === req.user.id;

    if (topicData.test_series_id || topicData.exam_type) {
      if (!hasSeriesMatch && !hasExamMatch && !isAuthor && !scope.isFreeDefault) {
        throw ApiError.forbidden('This discussion topic is exclusive to students enrolled in this Test Series or Exam.');
      }
    }
  }

  const replies = await query(
    `SELECT fr.*, u.name AS author_name, u.role AS author_role 
     FROM forum_replies fr 
     JOIN users u ON u.id = fr.user_id
     WHERE fr.topic_id = $1 
     ORDER BY fr.created_at ASC`,
    [id]
  );
  res.json({ topic: topicData, replies: replies.rows });
});

export const createForumTopic = asyncHandler(async (req, res) => {
  const { title, body, imageUrl, testSeriesId, examType } = req.body;

  let finalImageUrl = null;
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
    try {
      finalImageUrl = await processAndUploadImage(imageUrl, 'edvedum/forum');
    } catch (_) {
      finalImageUrl = imageUrl;
    }
  }

  await query(`ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS image_url TEXT`).catch(() => {});
  await query(`ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS test_series_id INTEGER REFERENCES test_series(id) ON DELETE SET NULL`).catch(() => {});
  await query(`ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS exam_type VARCHAR(100)`).catch(() => {});

  const scope = await getStudentDiscussionScope(req.user.id);

  let targetSeriesId = testSeriesId ? parseInt(testSeriesId, 10) : null;
  let targetExam = examType ? examType.trim() : null;

  // If candidate selected a test series, verify enrollment or lookup exam type
  if (targetSeriesId) {
    const matched = scope.testSeriesList.find((ts) => ts.test_series_id === targetSeriesId);
    if (matched) {
      targetExam = targetExam || matched.exam_type;
    } else {
      const tsRow = await query('SELECT id, exam_type FROM test_series WHERE id = $1', [targetSeriesId]);
      if (tsRow.rowCount) {
        targetExam = targetExam || tsRow.rows[0].exam_type;
      }
    }
  } else {
    // Default to student's first active enrolled test series
    if (scope.testSeriesList.length > 0) {
      targetSeriesId = scope.testSeriesList[0].test_series_id;
      targetExam = targetExam || scope.testSeriesList[0].exam_type;
    } else if (scope.targetExam) {
      targetExam = scope.targetExam;
    } else {
      targetExam = 'General';
    }
  }

  const result = await query(
    `INSERT INTO forum_topics (user_id, title, body, image_url, test_series_id, exam_type) 
     VALUES ($1,$2,$3,$4,$5,$6) 
     RETURNING *`,
    [req.user.id, title, body, finalImageUrl, targetSeriesId || null, targetExam || null]
  );
  res.status(201).json({ topic: result.rows[0] });
});

export const replyForumTopic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { body, imageUrl } = req.body;

  let finalImageUrl = null;
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
    try {
      finalImageUrl = await processAndUploadImage(imageUrl, 'edvedum/forum');
    } catch (_) {
      finalImageUrl = imageUrl;
    }
  }

  await query(`ALTER TABLE forum_replies ADD COLUMN IF NOT EXISTS image_url TEXT`).catch(() => {});

  const topicRes = await query('SELECT id, is_locked, test_series_id, exam_type, user_id FROM forum_topics WHERE id = $1', [id]);
  if (!topicRes.rowCount) throw ApiError.notFound('Topic not found');
  const topic = topicRes.rows[0];

  if (topic.is_locked) throw ApiError.badRequest('This topic is locked by faculty/admin.');

  const isStaff = req.user?.role === 'admin' || req.user?.role === 'faculty';

  // Candidate enrollment check: can only reply if enrolled in same test series or exam
  if (!isStaff) {
    const scope = await getStudentDiscussionScope(req.user.id);
    const hasSeriesMatch = topic.test_series_id && scope.testSeriesIds.includes(topic.test_series_id);
    const hasExamMatch = topic.exam_type && scope.examTypes.some((e) => e.toLowerCase() === topic.exam_type.toLowerCase());
    const isAuthor = topic.user_id === req.user.id;

    if (topic.test_series_id || topic.exam_type) {
      if (!hasSeriesMatch && !hasExamMatch && !isAuthor && !scope.isFreeDefault) {
        throw ApiError.forbidden('You can only reply to discussions in your enrolled Test Series or Exam.');
      }
    }
  }

  const result = await query(
    `INSERT INTO forum_replies (topic_id, user_id, body, image_url) VALUES ($1,$2,$3,$4) RETURNING *`,
    [id, req.user.id, body, finalImageUrl]
  );
  res.status(201).json({ reply: result.rows[0] });
});

/**
 * GET /api/student/dashboard/institute-rank
 * Fast O(1) read from precomputed student_institute_rank table.
 * Returns null/isB2B: false for direct (non-institutional) students.
 */
export const getInstituteRank = asyncHandler(async (req, res) => {
  const userId = Number(req.user?.id);

  if (!userId || isNaN(userId)) {
    return res.json({ isB2B: false, rankInfo: null });
  }

  // 1. Fetch user institution info
  const userRes = await query('SELECT id, institution_id, batch_id FROM users WHERE id = $1', [userId]);
  const userRow = userRes.rows[0];

  const instId = Number(userRow?.institution_id || req.user?.institution_id);

  // Direct/individual student -> return isB2B: false, rankInfo: null
  if (!instId || isNaN(instId) || instId <= 0) {
    return res.json({ isB2B: false, rankInfo: null });
  }

  // 2. Fetch precomputed rank from student_institute_rank (O(1) lookup)
  let rankRes = await query('SELECT * FROM student_institute_rank WHERE student_id = $1', [userId]);

  // 3. If rank row does not exist yet for this B2B student, compute ranks for the institution
  if (rankRes.rowCount === 0) {
    const { recomputeInstituteRanks } = await import('../services/rankService.js');
    await recomputeInstituteRanks(instId);
    rankRes = await query('SELECT * FROM student_institute_rank WHERE student_id = $1', [userId]);
  }

  const r = rankRes.rows[0];

  if (!r) {
    return res.json({
      isB2B: true,
      institution_id: instId,
      rankInfo: {
        rank: 1,
        totalStudents: 1,
        batchRank: null,
        totalBatchStudents: null,
        avgScore: 0,
      },
    });
  }

  return res.json({
    isB2B: true,
    institution_id: instId,
    rankInfo: {
      rank: r.rank,
      totalStudents: r.total_students,
      batchRank: r.batch_rank,
      totalBatchStudents: r.total_batch_students,
      avgScore: Number(r.avg_score),
      testsAttempted: r.tests_attempted,
      updatedAt: r.updated_at,
    },
  });
});

/**
 * POST /api/student/doubt-solver
 * Solves student academic doubt via Gemini AI (text query or camera/image upload).
 */
export const askAIDoubt = asyncHandler(async (req, res) => {
  const { questionText, imageBase64, mimeType, subject, testContext } = req.body || {};

  if (!questionText && !imageBase64) {
    throw ApiError.badRequest('Please provide a question text or upload/capture a photo of your doubt.');
  }

  const studentName = req.user?.name || 'Student';

  console.log('\n======================================================');
  console.log(`📥 [DoubtSolver API Request] Student: ${studentName}`);
  console.log(`📝 Question Query: "${questionText || 'Image/Photo Uploaded'}"`);
  if (testContext) console.log(`🎯 Test Context: ${testContext.title || 'Test Attached'} (${testContext.score || ''})`);
  if (imageBase64) console.log(`📷 Image Attached: Yes (${mimeType || 'image/jpeg'})`);
  console.log('------------------------------------------------------');

  const isStreaming = req.query.stream === 'true' || req.body?.stream === true || req.headers.accept?.includes('text/event-stream');

  let testContextBlock = '';
  if (testContext && (testContext.title || testContext.score)) {
    testContextBlock = `
ACTIVE TEST CONTEXT BEING DISCUSSED WITH STUDENT:
- Test Title: ${testContext.title || 'Diagnostic Assessment'}
- Student Score: ${testContext.score || 'N/A'} ${testContext.percentage ? `(${testContext.percentage})` : ''}
- Accuracy: ${testContext.accuracy || 'N/A'}
- Correct Answers: ${testContext.correct ?? 'N/A'} | Wrong Answers: ${testContext.wrong ?? 'N/A'} | Unattempted: ${testContext.unattempted ?? 'N/A'}
- Weak Topics Identified: ${Array.isArray(testContext.weakTopics) ? testContext.weakTopics.join(', ') : (testContext.weakTopics || 'None')}
- Strong Topics Mastered: ${Array.isArray(testContext.strongTopics) ? testContext.strongTopics.join(', ') : (testContext.strongTopics || 'None')}
${testContext.timeTaken ? `- Time Spent: ${testContext.timeTaken}` : ''}

INSTRUCTIONS FOR TEST MENTOR CHAT:
You are speaking to ${studentName} about their specific test "${testContext.title || 'Assessment'}".
Provide direct, encouraging, highly actionable advice based on their score, weak topics, and accuracy in this exact test.
Answer their questions specifically using the test performance data above!`;
  }

  // Fetch all completed test attempts for this candidate from DB
  let studentHistoryBlock = '';
  try {
    const userId = req.user?.id;
    if (userId) {
      const attemptsRes = await query(`
        SELECT 
          COALESCE(a.title, t.test_name, t.title) AS test_title,
          at.id AS attempt_id,
          at.status::text AS status,
          s.marks_obtained,
          s.total_marks,
          s.percentage,
          s.percentile,
          s.rank
        FROM attempts at
        LEFT JOIN assessments a ON a.id = at.assessment_id
        LEFT JOIN tests t ON t.id = at.assessment_id
        LEFT JOIN scores s ON s.attempt_id = at.id
        WHERE at.candidate_id = $1

        UNION ALL

        SELECT 
          COALESCE(t.test_name, t.title) AS test_title,
          tat.id AS attempt_id,
          (CASE WHEN tat.submitted_at IS NOT NULL THEN 'completed' ELSE 'in_progress' END)::text AS status,
          ts.marks_obtained,
          ts.total_marks,
          ts.percentage,
          ts.percentile,
          ts.rank
        FROM test_attempts tat
        JOIN tests t ON t.id = tat.test_id
        LEFT JOIN scores ts ON ts.attempt_id = tat.id
        WHERE tat.student_id = $1

        ORDER BY attempt_id DESC
        LIMIT 20
      `, [userId]);

      if (attemptsRes.rows.length > 0) {
        const rows = attemptsRes.rows.map((row, i) => 
          `${i + 1}. Test: "${row.test_title}" | Marks Obtained: ${row.marks_obtained ?? 'N/A'} / ${row.total_marks ?? 'N/A'} | Percentage: ${row.percentage != null ? row.percentage + '%' : 'N/A'} | Rank: ${row.rank ? '#' + row.rank : 'N/A'} | Status: ${row.status}`
        );
        studentHistoryBlock = `
OFFICIAL ACADEMIC DATABASE RECORDS FOR CANDIDATE ${studentName}:
The student has taken the following tests on Edvedum test platform:
${rows.join('\n')}

INSTRUCTION REGARDING TEST SCORES & PERCENTAGES:
When the student asks about their score, percentage, rank, or performance in ANY test listed above (e.g. "What is my percentage in AIETS 2028: Part Test 6?"), refer to the exact values in the OFFICIAL ACADEMIC DATABASE RECORDS table above. State their score and percentage clearly and accurately!`;
      }
    }
  } catch (err) {
    console.error('Failed to fetch student test history for AI prompt:', err.message);
  }

  if (isStreaming) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const systemPrompt = `You are "Ask Vedum", an expert STEM tutor, examination mentor, and NEET / JEE CBT test analyst for AIETS (All India Edvedum Test Series), specializing in Physics, Chemistry, Mathematics, and Biology at the JEE (Main & Advanced) and NEET level.

Student Name: ${studentName}
${subject ? `Subject Context: ${subject}` : ''}
${testContextBlock}
${studentHistoryBlock}
${questionText ? `Student Query: "${questionText}"` : ''}

CRITICAL PRESENTATION RULES (STRICT COMPLIANCE REQUIRED):
1. NEVER output meta-commentary like "Mode Detected:", "Mode 1:", "Mode 2:", or "Mode 3:". Start DIRECTLY with the topic title, test analysis, or solution.
2. NEVER output horizontal lines like "---" or "===". Use clean paragraph spacing instead.
3. NEVER output raw markdown tables using pipe characters (|). Use clean bullet points (•) or numbered lists instead.
4. AVOID messy raw LaTeX command noise like \\frac{a}{b} or \\text{...}. Use clean standard math symbols like (a / b) or clean math formatting.
5. Keep explanations clear, elegant, well-structured, and easy for students to read.`;

    const success = await (callGeminiAIStream || callOpenRouterAIStream)({
      systemPrompt,
      questionText,
      imageBase64,
      mimeType: mimeType || 'image/jpeg',
      onToken: (token) => {
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }
    });

    if (!success) {
      const combinedText = [testContextBlock, studentHistoryBlock, questionText].filter(Boolean).join('\n\n');
      const solution = await solveStudentDoubt({
        questionText: combinedText,
        imageBase64,
        mimeType: mimeType || 'image/jpeg',
        studentName,
        subjectContext: subject || ''
      });
      res.write(`data: ${JSON.stringify({ token: solution.text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    return res.end();
  }

  let solution;
  try {
    const combinedText = [testContextBlock, studentHistoryBlock, questionText].filter(Boolean).join('\n\n');
    solution = await solveStudentDoubt({
      questionText: combinedText,
      imageBase64,
      mimeType: mimeType || 'image/jpeg',
      studentName,
      subjectContext: subject || ''
    });
  } catch (err) {
    console.error('❌ [DoubtSolver API Exception]:', err.message);
    solution = {
      success: false,
      text: `⚠️ **Something went wrong while connecting to the AI Tutor**\n\nThe AI service is currently experiencing a temporary issue. Please check your network or try asking your doubt again!`
    };
  }

  console.log('🤖 [DoubtSolver API Response Text]:');
  console.log(solution?.text || '[No text returned]');
  console.log('======================================================\n');

  return res.json({
    success: true,
    text: solution?.text,
    solution,
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/student/7-day-plan
 * Retrieves cached 7-day revision plan from cache or PostgreSQL if already generated.
 */
export const getStudent7DayPlan = asyncHandler(async (req, res) => {
  const studentId = Number(req.user?.id);
  const attemptId = req.query.attemptId;
  const testId = req.query.testId;

  let resolvedTestId = Number(testId);
  let resolvedAttemptId = Number(attemptId);

  if ((!resolvedTestId || isNaN(resolvedTestId)) && resolvedAttemptId && !isNaN(resolvedAttemptId)) {
    try {
      const attCheck = await query(
        `SELECT test_id, assessment_id FROM test_attempts WHERE id = $1 UNION ALL SELECT assessment_id as test_id, assessment_id FROM attempts WHERE id = $1 LIMIT 1`,
        [resolvedAttemptId]
      );
      if (attCheck.rowCount > 0) {
        resolvedTestId = Number(attCheck.rows[0].test_id || attCheck.rows[0].assessment_id) || null;
      }
    } catch (_) {}
  }

  const cached = await getCachedAIReport(studentId, resolvedTestId, resolvedAttemptId);
  if (cached && (cached.daily_plan || cached.seven_day_plan_data?.daily_plan)) {
    const plan = cached.seven_day_plan_data || cached;
    return res.json({
      success: true,
      plan,
      cached: true,
    });
  }

  return res.json({
    success: false,
    plan: null,
    cached: false,
  });
});

/**
 * POST /api/student/generate-7-day-plan
 * Explicit on-demand 7-day revision plan generator based on test performance.
 * Checks cache first so repeated calls never re-invoke Gemini unless regenerate=true.
 */
export const generateStudent7DayPlan = asyncHandler(async (req, res) => {
  const studentId = Number(req.user?.id);
  const studentName = req.user?.name || 'Student';
  const { attemptId, testId, testPerformance, regenerate } = req.body || {};

  let resolvedTestId = Number(testId);
  let resolvedAttemptId = Number(attemptId);

  if ((!resolvedTestId || isNaN(resolvedTestId)) && resolvedAttemptId && !isNaN(resolvedAttemptId)) {
    try {
      const attCheck = await query(
        `SELECT test_id, assessment_id FROM test_attempts WHERE id = $1 UNION ALL SELECT assessment_id as test_id, assessment_id FROM attempts WHERE id = $1 LIMIT 1`,
        [resolvedAttemptId]
      );
      if (attCheck.rowCount > 0) {
        resolvedTestId = Number(attCheck.rows[0].test_id || attCheck.rows[0].assessment_id) || null;
      }
    } catch (_) {}
  }

  console.log(`[7DayPlan] Plan request: student ${studentId}, testId: ${resolvedTestId}, attemptId: ${resolvedAttemptId}, regenerate: ${regenerate}`);

  // 1. Check existing cached 7-day plan if not explicitly regenerating
  if (!regenerate) {
    const cached = await getCachedAIReport(studentId, resolvedTestId, resolvedAttemptId);
    if (cached && (cached.daily_plan || cached.seven_day_plan_data?.daily_plan)) {
      const plan = cached.seven_day_plan_data || cached;
      console.log(`[7DayPlan] Returning CACHED 7-day plan for student ${studentId}. No AI call needed.`);
      return res.json({
        success: true,
        plan,
        cached: true,
      });
    }
  }

  // 2. Build performance metrics
  let metrics = {
    student_name: studentName,
    ...(testPerformance || {})
  };

  // Augment from DB if performance details are missing
  if ((!metrics.score && metrics.score !== 0) && resolvedAttemptId) {
    try {
      const attRes = await query(
        `SELECT ta.*, t.test_name, t.test_type, t.max_marks as t_max_marks,
                a.title as a_title, a.type as a_type, a.max_marks as a_max_marks
         FROM test_attempts ta
         LEFT JOIN tests t ON t.id = ta.test_id
         LEFT JOIN assessments a ON a.id = ta.assessment_id
         WHERE ta.id = $1 AND ta.student_id = $2`,
        [resolvedAttemptId, studentId]
      );
      if (attRes.rowCount > 0) {
        const row = attRes.rows[0];
        metrics.test_name = metrics.test_name || row.test_name || row.a_title || 'CBT Assessment';
        metrics.exam_type = metrics.exam_type || row.test_type || row.a_type || 'JEE / NEET CBT';
        metrics.score = Number(row.total_score || 0);
        metrics.max_marks = Number(row.t_max_marks || row.a_max_marks || 300);
      }
    } catch (dbErr) {
      console.warn('[7DayPlan] DB query error:', dbErr.message);
    }
  }

  // 3. Generate 7-day plan with Gemini
  const plan = await generatePersonalized7DayPlan(metrics);

  // 4. Cache generated plan persistently in DB and Redis
  const saveKeyTestId = resolvedTestId || resolvedAttemptId;
  if (saveKeyTestId) {
    await saveCachedAIReport(studentId, saveKeyTestId, resolvedAttemptId, { seven_day_plan_data: plan, ...plan });
  }

  return res.json({
    success: true,
    plan,
    cached: false,
    generated_at: new Date().toISOString()
  });
});




