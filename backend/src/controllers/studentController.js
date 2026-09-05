import crypto from 'crypto';
import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { solveStudentDoubt, callOpenRouterAIStream } from '../services/geminiService.js';


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
    return res.json({ assessment_id: null, assessment_title: null, your_rank: null, leaderboard: [] });
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

  res.json({
    assessment_id: assessment.id,
    assessment_title: assessment.title,
    your_rank: yourRow?.rank ?? null,
    your_percentage: yourRow ? Number(yourRow.percentage) : null,
    leaderboard: result.rows.map(({ candidate_id, ...row }) => ({
      ...row,
      is_you: candidate_id === userId,
    })),
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

export const listForumTopics = asyncHandler(async (_req, res) => {
  // Ensure image_url columns exist
  await query(`ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS image_url TEXT`).catch(() => {});
  await query(`ALTER TABLE forum_replies ADD COLUMN IF NOT EXISTS image_url TEXT`).catch(() => {});

  const result = await query(
    `SELECT ft.*, u.name AS author_name, u.role AS author_role,
            COUNT(fr.id)::int AS reply_count,
            COUNT(CASE WHEN u_reply.role = 'admin' THEN 1 END)::int AS faculty_reply_count
     FROM forum_topics ft 
     JOIN users u ON u.id = ft.user_id
     LEFT JOIN forum_replies fr ON fr.topic_id = ft.id
     LEFT JOIN users u_reply ON u_reply.id = fr.user_id
     GROUP BY ft.id, u.name, u.role ORDER BY ft.created_at DESC LIMIT 50`
  );
  res.json({ topics: result.rows });
});

export const getForumTopic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const topic = await query(
    `SELECT ft.*, u.name AS author_name, u.role AS author_role FROM forum_topics ft JOIN users u ON u.id = ft.user_id WHERE ft.id = $1`,
    [id]
  );
  if (!topic.rowCount) throw ApiError.notFound('Topic not found');
  const replies = await query(
    `SELECT fr.*, u.name AS author_name, u.role AS author_role FROM forum_replies fr JOIN users u ON u.id = fr.user_id
     WHERE fr.topic_id = $1 ORDER BY fr.created_at ASC`,
    [id]
  );
  res.json({ topic: topic.rows[0], replies: replies.rows });
});

export const createForumTopic = asyncHandler(async (req, res) => {
  const { title, body, imageUrl } = req.body;

  let finalImageUrl = null;
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
    try {
      finalImageUrl = await processAndUploadImage(imageUrl, 'edvedum/forum');
    } catch (_) {
      finalImageUrl = imageUrl;
    }
  }

  await query(`ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS image_url TEXT`).catch(() => {});

  const result = await query(
    `INSERT INTO forum_topics (user_id, title, body, image_url) VALUES ($1,$2,$3,$4) RETURNING *`,
    [req.user.id, title, body, finalImageUrl]
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

  const topic = await query('SELECT id, is_locked FROM forum_topics WHERE id = $1', [id]);
  if (!topic.rowCount) throw ApiError.notFound('Topic not found');
  if (topic.rows[0].is_locked) throw ApiError.badRequest('Topic is locked');

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

    const success = await callOpenRouterAIStream({
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


