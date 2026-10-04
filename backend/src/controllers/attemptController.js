import { query, pool, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { gradeCodingAnswer } from '../utils/gradeCoding.js';
import { sendCompletionEmail } from '../utils/email.js';
import { createAdminNotification } from '../utils/createAdminNotification.js';
import { isNeetTest, resolveQuestionNeetMeta, evaluateNeetAttempt, NEET_SUBJECTS, predictNeetRank } from '../utils/neetPattern.js';
import { getAssessmentRankingData, syncAssessmentRankings } from '../services/assessmentRankingService.js';
import { recordAttemptMistakes } from '../services/mistakeBookService.js';
import { getTopperComparison } from '../services/topperComparisonService.js';

const ensureArray = (val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {
      return [];
    }
  }
  return [];
};

const arraysEqual = (a, b) => {
  const arrA = ensureArray(a).map(Number);
  const arrB = ensureArray(b).map(Number);
  const sa = [...arrA].sort((x, y) => x - y);
  const sb = [...arrB].sort((x, y) => x - y);
  return sa.length === sb.length && sa.every((v, i) => v === sb[i]);
};

const isJeeTest = (assessment = {}, questions = []) => {
  const type = String(assessment.test_type || '').toUpperCase();
  const title = String(assessment.title || assessment.test_name || '').toUpperCase();
  const syllabus = String(assessment.syllabus || '').toUpperCase();
  return type.includes('JEE') || title.includes('JEE') || syllabus.includes('JEE');
};

const isMultiSelectQuestion = (q) => {
  if (!q) return false;
  const t = (q.question_type || '').toLowerCase();
  if (['multi_select', 'multiple_correct', 'multiple_select', 'multiple_choice', 'multiple'].includes(t)) return true;
  const idxs = ensureArray(q.correct_indices);
  if (idxs.length > 1) return true;
  const text = q.question_text || '';
  return /one\s*or\s*more\s*options?|more\s*than\s*one\s*correct|multiple\s*correct|select\s*all\s*that\s*apply/i.test(text);
};

const sanitizeQuestion = (q) => {
  const cleanText = q.question_text || '';
  const cleanOpts = ensureArray(q.options);

  const base = {
    id: q.id,
    section_id: q.section_id,
    question_type: q.question_type || 'mcq',
    question_text: cleanText,
    assertion_text: q.assertion_text || null,
    reason_text: q.reason_text || null,
    image_url: q.image_url || '',
    marks: q.marks || 4,
    position: q.position || 1,
    subject: q.subject || q.bank_category || null,
    section: q.section || null,
    bank_category: q.bank_category || null,
    topic: q.topic || null,
    chapter: q.chapter || null,
    translations: q.translations || {},
  };
  if (q.question_type === 'mcq' || q.question_type === 'single_choice' || q.question_type === 'multi_select' || q.question_type === 'assertion_reason' || !q.question_type) {
    return { ...base, options: cleanOpts };
  }
  if (q.question_type === 'coding') {
    return {
      ...base,
      starter_code: q.starter_code || '',
      language: q.language || 'javascript',
    };
  }
  return base;
};

const getAcceptedNumericAnswers = (q, targetVal) => {
  const meta = typeof q.extraction_meta === 'string'
    ? (() => { try { return JSON.parse(q.extraction_meta); } catch { return null; } })()
    : q.extraction_meta;
  if (Array.isArray(q.accepted_answers) && q.accepted_answers.length > 0) return q.accepted_answers.map(Number);
  if (Array.isArray(q.acceptedAnswers) && q.acceptedAnswers.length > 0) return q.acceptedAnswers.map(Number);
  if (Array.isArray(meta?.acceptedAnswers) && meta.acceptedAnswers.length > 0) return meta.acceptedAnswers.map(Number);
  return targetVal !== null ? [Number(targetVal)] : [];
};

const finalizeAttempt = async (attemptId, status = 'submitted') => {
  const result = await withTransaction(async (client) => {
    const attemptRes = await client.query('SELECT * FROM attempts WHERE id = $1 FOR UPDATE', [attemptId]);
    const attempt = attemptRes.rows[0];
    if (!attempt) throw ApiError.notFound('Attempt not found');
    if (attempt.status !== 'in_progress') {
      const existing = await client.query('SELECT * FROM scores WHERE attempt_id = $1', [attemptId]);
      return { alreadyDone: true, score: existing.rows[0] || null };
    }

    const assessmentRes = await client.query('SELECT * FROM assessments WHERE id = $1', [attempt.assessment_id]);
    const assessment = assessmentRes.rows[0];

    const questionsRes = await client.query(
      'SELECT * FROM questions WHERE assessment_id = $1',
      [attempt.assessment_id]
    );
    const answersRes = await client.query(
      'SELECT question_id, selected_index, selected_indices, numeric_answer FROM answers WHERE attempt_id = $1',
      [attemptId]
    );
    const codingRes = await client.query(
      'SELECT question_id, source_code, language FROM coding_answers WHERE attempt_id = $1',
      [attemptId]
    );
    const subjectiveRes = await client.query(
      'SELECT question_id, answer_text FROM subjective_answers WHERE attempt_id = $1',
      [attemptId]
    );

    const answerMap = new Map(answersRes.rows.map((a) => [a.question_id, a]));
    const codingMap = new Map(codingRes.rows.map((a) => [a.question_id, a]));
    const subjectiveMap = new Map(subjectiveRes.rows.map((a) => [a.question_id, a.answer_text]));

    const isNeet = isNeetTest(assessment, questionsRes.rows);
    const isJee = isJeeTest(assessment, questionsRes.rows);
    const negEnabled = isNeet || isJee || assessment.negative_marking === true;
    const negPenalty = isNeet || isJee
      ? 1
      : (Number(assessment.negative_marks_per_wrong) || 0.25);

    let totalMarks = 0;
    let marksObtained = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    let percentage = 0;

    if (isNeet) {
      const neetEval = evaluateNeetAttempt({
        questions: questionsRes.rows,
        answers: answersRes.rows,
        negEnabled,
        negPenalty,
      });
      totalMarks = neetEval.totalMarks; // 720
      marksObtained = neetEval.marksObtained;
      correctCount = neetEval.correctCount;
      wrongCount = neetEval.wrongCount;
      unattemptedCount = neetEval.unattemptedCount;
      percentage = neetEval.percentage;
    } else {
      for (const q of questionsRes.rows) {
        totalMarks += q.marks;
        const type = q.question_type || 'mcq';
        const ans = answerMap.get(q.id);

        if (isMultiSelectQuestion(q)) {
          const correct = ensureArray(q.correct_indices);
          let selected = ensureArray(ans?.selected_indices);
          if (!selected.length && ans?.selected_index != null) {
            selected = [ans.selected_index];
          }
          if (!selected.length) unattemptedCount += 1;
          else if (arraysEqual(selected, correct)) {
            correctCount += 1;
            marksObtained += q.marks;
          } else {
            wrongCount += 1;
            if (negEnabled) marksObtained -= negPenalty;
          }
        } else if (type === 'mcq' || type === 'single_choice' || type === 'assertion_reason') {
          const sel = ans?.selected_index;
          if (sel === undefined || sel === null) unattemptedCount += 1;
          else if (sel === q.correct_index) {
            correctCount += 1;
            marksObtained += q.marks;
          } else {
            wrongCount += 1;
            if (negEnabled) marksObtained -= negPenalty;
          }
        } else if (type === 'integer') {
          const userVal = ans?.numeric_answer != null ? Number(ans.numeric_answer) : null;
          const targetVal = q.numeric_answer != null ? Number(q.numeric_answer) : null;
          const acceptedAnswers = getAcceptedNumericAnswers(q, targetVal);
          if (userVal === null || Number.isNaN(userVal)) unattemptedCount += 1;
          else if (acceptedAnswers.length > 0 && acceptedAnswers.some((acc) => Math.round(userVal) === Math.round(acc))) {
            correctCount += 1;
            marksObtained += q.marks;
          } else {
            wrongCount += 1;
            if (negEnabled) marksObtained -= negPenalty;
          }
        } else if (type === 'numerical') {
          const userVal = ans?.numeric_answer != null ? Number(ans.numeric_answer) : null;
          const targetVal = q.numeric_answer != null ? Number(q.numeric_answer) : null;
          const tol = Number(q.numerical_tolerance) || 0.01;
          const acceptedAnswers = getAcceptedNumericAnswers(q, targetVal);
          if (userVal === null || Number.isNaN(userVal)) unattemptedCount += 1;
          else if (acceptedAnswers.length > 0 && acceptedAnswers.some((acc) => Math.abs(userVal - acc) <= tol)) {
            correctCount += 1;
            marksObtained += q.marks;
          } else {
            wrongCount += 1;
            if (negEnabled) marksObtained -= negPenalty;
          }
        } else if (type === 'coding') {
          const code = codingMap.get(q.id);
          const tests = Array.isArray(q.test_cases) ? q.test_cases : [];
          if (!code?.source_code?.trim()) unattemptedCount += 1;
          else {
            const grade = gradeCodingAnswer(code.source_code, tests);
            if (grade.passed) {
              correctCount += 1;
              marksObtained += q.marks;
            } else if (grade.total > 0) {
              const partial = Math.round((grade.passedCount / grade.total) * q.marks);
              marksObtained += partial;
              if (partial > 0) correctCount += 1;
              else wrongCount += 1;
            } else wrongCount += 1;
          }
        } else if (type === 'subjective') {
          const text = subjectiveMap.get(q.id) || '';
          if (text.trim().length < 20) unattemptedCount += 1;
          else {
            correctCount += 1;
            marksObtained += q.marks;
          }
        }
      }

      marksObtained = Math.max(0, Number(marksObtained.toFixed(2)));
      percentage = totalMarks > 0 ? Number(((marksObtained / totalMarks) * 100).toFixed(2)) : 0;
    }
    const passed = marksObtained >= assessment.passing_marks;
    const durationSeconds = Math.round((Date.now() - new Date(attempt.started_at).getTime()) / 1000);

    await client.query(
      `UPDATE attempts SET status = $1, submitted_at = NOW(), duration_seconds = $2 WHERE id = $3`,
      [status, durationSeconds, attemptId]
    );

    if (attempt.invite_id) {
      await client.query(
        `UPDATE candidate_invites SET status = 'completed', completed_at = NOW() WHERE id = $1`,
        [attempt.invite_id]
      );
    }

    if (status === 'violation_submitted') {
      await createAdminNotification({
        title: 'URGENT: Proctoring Auto-Submit',
        body: `Test "${assessment.title}" auto-submitted due to proctoring violation limit.`,
        type: 'violation_submitted'
      });
    } else {
      await createAdminNotification({
        title: 'Assessment Submitted',
        body: `Candidate completed "${assessment.title}". Score: ${marksObtained}/${totalMarks} (${percentage}%).`,
        type: 'assessment_submitted'
      });
    }

    const isNeetSubmit = isNeet;
    let initRank = null;
    let initPercentile = null;
    let initRankRange = null;
    if (isNeetSubmit) {
      const pred = predictNeetRank(marksObtained);
      initRank = pred.rank;
      initPercentile = pred.percentile;
      initRankRange = pred.rank_range;
    }

    const scoreRes = await client.query(
      `INSERT INTO scores (attempt_id, marks_obtained, total_marks, percentage, passed, correct_count, wrong_count, unattempted_count, rank, percentile, rank_range, predicted_rank_range)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (attempt_id) DO UPDATE
         SET marks_obtained = EXCLUDED.marks_obtained,
             total_marks = EXCLUDED.total_marks,
             percentage = EXCLUDED.percentage,
             passed = EXCLUDED.passed,
             correct_count = EXCLUDED.correct_count,
             wrong_count = EXCLUDED.wrong_count,
             unattempted_count = EXCLUDED.unattempted_count,
             rank = COALESCE(EXCLUDED.rank, scores.rank),
             percentile = COALESCE(EXCLUDED.percentile, scores.percentile),
             rank_range = COALESCE(EXCLUDED.rank_range, scores.rank_range),
             predicted_rank_range = COALESCE(EXCLUDED.predicted_rank_range, scores.predicted_rank_range)
       RETURNING *`,
      [attemptId, marksObtained, totalMarks, percentage, passed, correctCount, wrongCount, unattemptedCount, initRank, initPercentile, initRankRange, initRankRange]
    );

    return {
      alreadyDone: false,
      score: scoreRes.rows[0],
      attempt,
      assessment,
      durationSeconds,
      violationCount: attempt.violation_count,
    };
  });

  if (result && !result.alreadyDone && result.score) {
    // Asynchronously compute background ranks using unified assessment ranking rules
    setImmediate(async () => {
      try {
        await syncAssessmentRankings(result.attempt.assessment_id);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[RankComputation] Background rank update error:', e.message);
      }
    });

    // Record mistake questions asynchronously in background using pool so core score transaction is never blocked
    setImmediate(async () => {
      try {
        await recordAttemptMistakes(pool, attemptId, result.attempt.candidate_id, result.attempt.assessment_id);
      } catch (mistakeErr) {
        console.error('[finalizeAttempt] Mistake book recording error:', mistakeErr?.message || mistakeErr);
      }
    });

    // Trigger background rank recomputation for candidate's institution if candidate is B2B
    (async () => {
      try {
        const uInst = await query('SELECT institution_id FROM users WHERE id = $1', [result.attempt.candidate_id]);
        const instId = uInst.rows[0]?.institution_id;
        if (instId && instId > 0) {
          const { recomputeInstituteRanks } = await import('../services/rankService.js');
          recomputeInstituteRanks(instId).catch((e) => console.error('[RankTrigger] Error:', e));
        }
      } catch (e) {
        console.error('[RankTrigger] Background trigger failed:', e);
      }
    })();

    const userRes = await query('SELECT name, email FROM users WHERE id = $1', [result.attempt.candidate_id]);
    const user = userRes.rows[0];
    if (user?.email) {
      sendCompletionEmail({
        to: user.email,
        name: user.name,
        assessmentTitle: result.assessment.title,
        marksObtained: result.score.marks_obtained,
        totalMarks: result.score.total_marks,
        percentage: result.score.percentage,
        passed: result.score.passed,
        durationSeconds: result.durationSeconds,
        violationCount: result.violationCount,
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[email] Completion email failed:', err.message);
      });
    }
  }

  return result?.score || null;
};

const ensureAssessmentAccess = async (user, assessmentId) => {
  const creatorCheck = await query(
    `SELECT id FROM assessments WHERE id = $1 AND created_by = $2`,
    [assessmentId, user.id]
  );
  if (creatorCheck.rowCount > 0) {
    return { invite: null, source: 'creator' };
  }

  const inviteRes = await query(
    `SELECT * FROM candidate_invites
     WHERE candidate_email = $1 AND assessment_id = $2 AND status <> 'expired'`,
    [user.email, assessmentId]
  );
  if (inviteRes.rowCount > 0) {
    return { invite: inviteRes.rows[0], source: 'invite' };
  }

  const enrRes = await query(
    `SELECT se.id FROM student_enrollments se
     LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = se.test_series_id
     LEFT JOIN test_series_tests tst ON tst.series_id = se.test_series_id
     WHERE se.user_id = $1 AND (tsa.assessment_id = $2 OR tst.test_id = $2)
       AND se.status = 'active' AND se.expires_at > NOW()`,
    [user.id, assessmentId]
  );
  if (enrRes.rowCount > 0) {
    return { invite: null, source: 'enrollment' };
  }

  const userRes = await query('SELECT batch_id, institution_id FROM users WHERE id = $1', [user.id]);
  const student = userRes.rows[0] || {};
  const batchId = student.batch_id || null;
  const instId = student.institution_id || null;

  const assignCheck = await query(
    `SELECT id FROM test_assignments
     WHERE test_id = $1
       AND (
         assigned_to_type = 'all'
         OR (assigned_to_type IN ('individual', 'student') AND assigned_to_id = $2)
         OR (assigned_to_type = 'batch' AND $3::int IS NOT NULL AND assigned_to_id = $3)
         OR (assigned_to_type = 'institution' AND $4::int IS NOT NULL AND assigned_to_id = $4)
       )`,
    [assessmentId, user.id, batchId, instId]
  );
  if (assignCheck.rowCount > 0) {
    return { invite: null, source: 'assignment' };
  }

  if (instId) {
    const pkgCheck = await query(
      `SELECT ip.id FROM institution_packages ip
       LEFT JOIN package_tests pt ON pt.package_id = ip.package_id
       LEFT JOIN test_series_tests tst ON tst.series_id = ip.package_id
       LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ip.package_id
       WHERE ip.institution_id = $1
         AND COALESCE(ip.is_active, TRUE) = TRUE
         AND (ip.valid_until IS NULL OR ip.valid_until > NOW())
         AND (pt.test_id = $2 OR tst.test_id = $2 OR tsa.assessment_id = $2 OR ip.package_id = $2)`,
      [instId, assessmentId]
    );
    if (pkgCheck.rowCount > 0) {
      return { invite: null, source: 'institution_package' };
    }
  }
  const freeCheck = await query(
    `SELECT ts.id FROM test_series ts
     LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
     LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
     WHERE (tsa.assessment_id = $1 OR tst.test_id = $1)
       AND (ts.price = 0 OR ts.slug LIKE '%free%') AND ts.is_active = true`,
    [assessmentId]
  );
  if (freeCheck.rowCount > 0) {
    await query(
      `INSERT INTO student_enrollments (user_id, test_series_id, status, expires_at)
       VALUES ($1, $2, 'active', NOW() + INTERVAL '365 days')
       ON CONFLICT (user_id, test_series_id) DO NOTHING`,
      [user.id, freeCheck.rows[0].id]
    );
    return { invite: null, source: 'enrollment' };
  }

  throw ApiError.forbidden('You do not have access to this assessment');
};

export const startAttempt = asyncHandler(async (req, res) => {
  const assessmentId = Number(req.body.assessment_id);
  if (!Number.isInteger(assessmentId)) throw ApiError.badRequest('assessment_id is required');

  const { invite, source } = await ensureAssessmentAccess(req.user, assessmentId);

  let assessment = null;
  if (source === 'assignment') {
    const tRes = await query(
      `SELECT t.id, COALESCE(t.test_name, t.title) AS title,
              t.syllabus AS description,
              'Standard examination instructions apply.' AS instructions,
              t.duration_minutes, 0 AS passing_marks, 5 AS max_violations,
              true AS result_visible, (t.is_published = true OR t.status = 'published') AS is_published,
              t.available_from, t.available_until,
              t.question_paper_url, t.answer_key_url, t.solution_pdf_url
       FROM tests t
       WHERE t.id = $1 AND COALESCE(t.is_deleted, false) = false`,
      [assessmentId]
    );
    assessment = tRes.rows[0];
  }

  if (!assessment) {
    const aRes = await query('SELECT * FROM assessments WHERE id = $1', [assessmentId]);
    assessment = aRes.rows[0];
  }

  if (!assessment) {
    const tRes = await query(
      `SELECT t.id, COALESCE(t.test_name, t.title) AS title,
              t.syllabus AS description,
              'Standard examination instructions apply.' AS instructions,
              t.duration_minutes, 0 AS passing_marks, 5 AS max_violations,
              true AS result_visible, (t.is_published = true OR t.status = 'published') AS is_published,
              t.available_from, t.available_until,
              t.question_paper_url, t.answer_key_url, t.solution_pdf_url
       FROM tests t
       WHERE t.id = $1 AND COALESCE(t.is_deleted, false) = false`,
      [assessmentId]
    );
    assessment = tRes.rows[0];
  }

  if (!assessment) throw ApiError.notFound('Assessment not found');
  if (!assessment.is_published) throw ApiError.forbidden('This assessment is not available');

  const now = new Date();
  if (assessment.available_from && new Date(assessment.available_from) > now) {
    throw ApiError.forbidden(`This assessment is scheduled to start at ${new Date(assessment.available_from).toLocaleString()}`);
  }
  if (assessment.available_until && new Date(assessment.available_until) < now) {
    throw ApiError.forbidden('This assessment availability window has expired');
  }

  const qCount = await query('SELECT COUNT(*)::int AS c FROM questions WHERE assessment_id = $1', [assessmentId]);
  const hasPdf = Boolean(assessment.question_paper_url || assessment.solution_pdf_url || assessment.answer_key_url);

  if (qCount.rows[0].c === 0 && !hasPdf) {
    throw ApiError.badRequest('Question paper PDF or questions have not been uploaded for this assessment yet.');
  }

  const existing = await query(
    'SELECT * FROM attempts WHERE assessment_id = $1 AND candidate_id = $2',
    [assessmentId, req.user.id]
  );

  if (existing.rowCount > 0) {
    const attempt = existing.rows[0];
    if (attempt.status !== 'in_progress') {
      throw ApiError.conflict('You have already completed this assessment');
    }
    if (new Date(attempt.ends_at).getTime() <= Date.now()) {
      await finalizeAttempt(attempt.id, 'auto_submitted');
      throw ApiError.conflict('Your time for this assessment has expired');
    }
    return res.json({ attempt, resumed: true });
  }

  if (invite?.status === 'completed') {
    throw ApiError.conflict('This invitation has already been used');
  }

  const created = await query(
    `INSERT INTO attempts (assessment_id, candidate_id, ends_at, invite_id)
     VALUES ($1, $2, NOW() + ($3 || ' minutes')::interval, $4)
     RETURNING *`,
    [assessmentId, req.user.id, assessment.duration_minutes, invite?.id || null]
  );

  if (invite) {
    await query(
      `UPDATE candidate_invites SET status = 'accessed', accessed_at = COALESCE(accessed_at, NOW()) WHERE id = $1`,
      [invite.id]
    );
  }

  res.status(201).json({ attempt: created.rows[0], resumed: false });
});

export const getAttemptState = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const attemptRes = await query('SELECT * FROM attempts WHERE id = $1', [id]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('This is not your attempt');

  if (attempt.status === 'in_progress' && new Date(attempt.ends_at).getTime() <= Date.now()) {
    await finalizeAttempt(attempt.id, 'auto_submitted');
    const refreshed = await query('SELECT * FROM attempts WHERE id = $1', [id]);
    return res.json({ attempt: refreshed.rows[0], sections: [], questions: [], answers: [], expired: true });
  }

  let assessmentObj = null;
  const tCheck = await query('SELECT id FROM tests WHERE id = $1 LIMIT 1', [attempt.assessment_id]);
  if (tCheck.rowCount > 0) {
    const tRes = await query(
      `SELECT t.id, COALESCE(t.test_name, t.title) AS title, t.duration_minutes,
              5 AS max_violations, t.question_paper_url, t.solution_pdf_url, t.answer_key_url
       FROM tests t WHERE t.id = $1`,
      [attempt.assessment_id]
    );
    assessmentObj = tRes.rows[0];
  }

  if (!assessmentObj) {
    const assessmentRes = await query('SELECT * FROM assessments WHERE id = $1', [attempt.assessment_id]);
    assessmentObj = assessmentRes.rows[0];
  }

  if (!assessmentObj) {
    assessmentObj = { id: attempt.assessment_id, title: 'Assessment', duration_minutes: 180, max_violations: 5 };
  }

  const sectionsRes = await query(
    'SELECT * FROM assessment_sections WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
    [attempt.assessment_id]
  );
  const questionsRes = await query(
    'SELECT * FROM questions WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
    [attempt.assessment_id]
  );
  const answersRes = await query(
    'SELECT question_id, selected_index, selected_indices, marked_for_review, numeric_answer FROM answers WHERE attempt_id = $1',
    [id]
  );
  const codingRes = await query(
    'SELECT question_id, source_code, language FROM coding_answers WHERE attempt_id = $1',
    [id]
  );
  const subjectiveRes = await query(
    'SELECT question_id, answer_text FROM subjective_answers WHERE attempt_id = $1',
    [id]
  );

  let institutionObj = null;
  const userInstRes = await query('SELECT institution_id FROM users WHERE id = $1', [attempt.candidate_id]).catch(() => ({ rows: [] }));
  const candInstId = userInstRes.rows[0]?.institution_id;
  if (candInstId) {
    const instRes = await query(
      'SELECT id, name, logo_url, logo_badge, code FROM institutions WHERE id = $1',
      [candInstId]
    ).catch(() => ({ rows: [] }));
    if (instRes.rows.length > 0) {
      const row = instRes.rows[0];
      institutionObj = {
        id: row.id,
        name: row.name,
        logo_url: row.logo_url || '',
        logo_badge: row.logo_badge || (row.name ? row.name.substring(0, 3).toUpperCase() : 'INST'),
        code: row.code || '',
      };
    }
  }

  const isNeet = isNeetTest(assessmentObj, questionsRes.rows);
  const totalQCount = questionsRes.rows.length;

  const sanitizedQuestions = questionsRes.rows.map((q, idx) => {
    const clean = sanitizeQuestion(q);
    if (isNeet) {
      const neetMeta = resolveQuestionNeetMeta(q, idx, totalQCount);
      return {
        ...clean,
        subject: neetMeta.subject,
        section: neetMeta.section,
        questionNumber: neetMeta.subjectQuestionNumber,
        overallQuestionNumber: neetMeta.overallQuestionNumber,
        is_neet: true,
        is_section_b: neetMeta.isSectionB,
      };
    }
    return clean;
  });

  res.json({
    attempt,
    assessment: {
      id: assessmentObj.id,
      title: assessmentObj.title,
      duration_minutes: assessmentObj.duration_minutes,
      max_violations: assessmentObj.max_violations || 5,
      question_paper_url: assessmentObj.question_paper_url || null,
      solution_pdf_url: attempt.status === 'in_progress' ? null : (assessmentObj.solution_pdf_url || null),
      answer_key_url: attempt.status === 'in_progress' ? null : (assessmentObj.answer_key_url || null),
      institution: institutionObj,
      institution_id: institutionObj?.id || null,
      institution_name: institutionObj?.name || null,
      institution_logo_url: institutionObj?.logo_url || null,
      institution_logo_badge: institutionObj?.logo_badge || null,
      is_neet: isNeet,
      total_marks: isNeet ? 720 : (assessmentObj.total_marks || null),
    },
    institution: institutionObj,
    sections: sectionsRes.rows,
    questions: sanitizedQuestions,
    answers: answersRes.rows,
    coding_answers: codingRes.rows,
    subjective_answers: subjectiveRes.rows,
  });
});

export const saveAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question_id, selected_index, selected_indices, numeric_answer } = req.body;

  const attemptRes = await query('SELECT * FROM attempts WHERE id = $1', [id]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('This is not your attempt');
  if (attempt.status !== 'in_progress') throw ApiError.conflict('This attempt is already submitted');

  if (new Date(attempt.ends_at).getTime() <= Date.now()) {
    await finalizeAttempt(attempt.id, 'auto_submitted');
    throw ApiError.conflict('Time has expired; your test was auto-submitted');
  }

  const qRes = await query(
    'SELECT id, question_type, question_text, correct_indices FROM questions WHERE id = $1',
    [question_id]
  );

  const targetQ = qRes.rows[0] || { question_type: 'mcq' };
  const qType = targetQ.question_type || 'mcq';
  const isMulti = isMultiSelectQuestion(targetQ);

  if (isMulti) {
    let indices = Array.isArray(selected_indices) ? selected_indices : [];
    if (!indices.length && selected_index != null) {
      indices = [Number(selected_index)];
    }
    const firstIndex = indices[0] ?? 0;
    await query(
      `INSERT INTO answers (attempt_id, question_id, selected_index, selected_indices, updated_at)
       VALUES ($1,$2,$3,$4, NOW())
       ON CONFLICT (attempt_id, question_id)
       DO UPDATE SET selected_index = EXCLUDED.selected_index, selected_indices = EXCLUDED.selected_indices, updated_at = NOW()`,
      [id, question_id, firstIndex, JSON.stringify(indices)]
    );
  } else if (qType === 'integer' || qType === 'numerical' || numeric_answer !== undefined) {
    const val = numeric_answer !== undefined && numeric_answer !== null && numeric_answer !== '' ? Number(numeric_answer) : null;
    await query(
      `INSERT INTO answers (attempt_id, question_id, numeric_answer, updated_at)
       VALUES ($1,$2,$3, NOW())
       ON CONFLICT (attempt_id, question_id)
       DO UPDATE SET numeric_answer = EXCLUDED.numeric_answer, updated_at = NOW()`,
      [id, question_id, val]
    );
  } else {
    const selIndex = selected_index !== undefined ? selected_index : null;
    await query(
      `INSERT INTO answers (attempt_id, question_id, selected_index, updated_at)
       VALUES ($1,$2,$3, NOW())
       ON CONFLICT (attempt_id, question_id)
       DO UPDATE SET selected_index = EXCLUDED.selected_index, updated_at = NOW()`,
      [id, question_id, selIndex]
    );
  }
  res.json({ saved: true });
});

export const markForReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question_id, marked_for_review } = req.body;
  if (marked_for_review === undefined) throw ApiError.badRequest('marked_for_review required');
  const attemptRes = await query('SELECT * FROM attempts WHERE id = $1', [id]);
  const attempt = attemptRes.rows[0];
  if (!attempt || attempt.candidate_id !== req.user.id) throw ApiError.forbidden('Not allowed');
  if (attempt.status !== 'in_progress') throw ApiError.conflict('Attempt submitted');

  await query(
    `INSERT INTO answers (attempt_id, question_id, marked_for_review, updated_at)
     VALUES ($1,$2,$3, NOW())
     ON CONFLICT (attempt_id, question_id)
     DO UPDATE SET marked_for_review = EXCLUDED.marked_for_review, updated_at = NOW()`,
    [id, question_id, marked_for_review]
  );
  res.json({ marked: marked_for_review });
});

export const clearAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { questionId } = req.params;
  const attemptRes = await query('SELECT * FROM attempts WHERE id = $1', [id]);
  const attempt = attemptRes.rows[0];
  if (!attempt || attempt.candidate_id !== req.user.id) throw ApiError.forbidden('Not allowed');
  if (attempt.status !== 'in_progress') throw ApiError.conflict('Attempt submitted');

  await query('DELETE FROM answers WHERE attempt_id = $1 AND question_id = $2', [id, questionId]);
  await query('DELETE FROM coding_answers WHERE attempt_id = $1 AND question_id = $2', [id, questionId]);
  await query('DELETE FROM subjective_answers WHERE attempt_id = $1 AND question_id = $2', [id, questionId]);
  res.json({ cleared: true });
});

export const saveCodingAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question_id, source_code, language } = req.body;

  const attemptRes = await query('SELECT * FROM attempts WHERE id = $1', [id]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('This is not your attempt');
  if (attempt.status !== 'in_progress') throw ApiError.conflict('This attempt is already submitted');

  if (new Date(attempt.ends_at).getTime() <= Date.now()) {
    await finalizeAttempt(attempt.id, 'auto_submitted');
    throw ApiError.conflict('Time has expired; your test was auto-submitted');
  }

  await query(
    `INSERT INTO coding_answers (attempt_id, question_id, source_code, language, updated_at)
     VALUES ($1,$2,$3,$4, NOW())
     ON CONFLICT (attempt_id, question_id)
     DO UPDATE SET source_code = EXCLUDED.source_code, language = EXCLUDED.language, updated_at = NOW()`,
    [id, question_id, source_code || '', language || 'javascript']
  );
  res.json({ saved: true });
});

export const saveSubjectiveAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question_id, answer_text } = req.body;

  const attemptRes = await query('SELECT * FROM attempts WHERE id = $1', [id]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('This is not your attempt');
  if (attempt.status !== 'in_progress') throw ApiError.conflict('This attempt is already submitted');

  if (new Date(attempt.ends_at).getTime() <= Date.now()) {
    await finalizeAttempt(attempt.id, 'auto_submitted');
    throw ApiError.conflict('Time has expired; your test was auto-submitted');
  }

  await query(
    `INSERT INTO subjective_answers (attempt_id, question_id, answer_text, updated_at)
     VALUES ($1,$2,$3, NOW())
     ON CONFLICT (attempt_id, question_id)
     DO UPDATE SET answer_text = EXCLUDED.answer_text, updated_at = NOW()`,
    [id, question_id, answer_text || '']
  );
  res.json({ saved: true });
});

export const submitAttempt = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const attemptRes = await query('SELECT * FROM attempts WHERE id = $1', [id]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('This is not your attempt');

  const score = await finalizeAttempt(id, 'submitted');
  const refreshed = await query('SELECT * FROM attempts WHERE id = $1', [id]);
  const assessmentRes = await query('SELECT * FROM assessments WHERE id = $1', [attempt.assessment_id]);
  res.json({
    attempt: refreshed.rows[0],
    assessment: assessmentRes.rows[0],
    score,
  });
});

export const getAttemptResult = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const attemptRes = await query('SELECT * FROM attempts WHERE id = $1', [id]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');

  if (attempt.candidate_id !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('You are not authorized to view these results');
  }

  const assessmentRes = await query('SELECT * FROM assessments WHERE id = $1', [attempt.assessment_id]);
  const assessment = assessmentRes.rows[0];

  if (!assessment.result_visible && req.user.role !== 'admin') {
    throw ApiError.forbidden('Results for this assessment are hidden by the administrator.');
  }

  const scoreRes = await query('SELECT * FROM scores WHERE attempt_id = $1', [id]);
  let score = scoreRes.rows[0] || null;
  if (!score) {
    const finalized = await finalizeAttempt(id, 'submitted');
    score = (finalized && finalized.score) ? finalized.score : (finalized || null);
  }

  const [questionsRes, answersRes, codingRes, subjectiveRes] = await Promise.all([
    query(
      `SELECT q.id, q.question_type, q.question_text, q.options, q.correct_index, q.correct_indices, q.numeric_answer, q.numerical_tolerance, q.assertion_text, q.reason_text, q.marks, q.position, q.solution, q.test_cases, q.extraction_meta, q.section_id, q.subject_id, q.bank_category, q.topic, q.subject, q.chapter, q.image_url, q.solution_image_url, q.media, s.name AS section_name, subj.name AS subject_name, c.name AS chapter_name
       FROM questions q
       LEFT JOIN assessment_sections s ON s.id = q.section_id
       LEFT JOIN subjects subj ON subj.id = q.subject_id
       LEFT JOIN chapters c ON c.id = q.chapter_id
       WHERE q.assessment_id = $1
       ORDER BY q.position ASC, q.id ASC`,
      [attempt.assessment_id]
    ),
    query('SELECT question_id, selected_index, selected_indices, numeric_answer FROM answers WHERE attempt_id = $1', [id]),
    query('SELECT question_id, source_code FROM coding_answers WHERE attempt_id = $1', [id]),
    query('SELECT question_id, answer_text FROM subjective_answers WHERE attempt_id = $1', [id]),
  ]);

  const ansMap = new Map(answersRes.rows.map((a) => [a.question_id, a]));
  const codeMap = new Map(codingRes.rows.map((a) => [a.question_id, a.source_code]));
  const subjMap = new Map(subjectiveRes.rows.map((a) => [a.question_id, a.answer_text]));

  const isNeet = isNeetTest(assessment, questionsRes.rows);
  const isJee = isJeeTest(assessment, questionsRes.rows);
  const negEnabled = isNeet || isJee || assessment.negative_marking === true;
  const negPenalty = isNeet || isJee
    ? 1
    : (Number(assessment.negative_marks_per_wrong) || 0.25);

  const normalizeSubject = (str) => {
    if (!str || typeof str !== 'string') return null;
    const clean = str.trim();
    const lower = clean.toLowerCase();
    if (['general', 'general aptitude', 'default', 'uncategorized', 'section 1', 'section 2', 'section 3', 'all'].includes(lower)) {
      return null;
    }
    if (lower.includes('chem')) return 'Chemistry';
    if (lower.includes('phys')) return 'Physics';
    if (lower.includes('math')) return 'Mathematics';
    if (lower.includes('botany')) return 'Botany';
    if (lower.includes('zoology')) return 'Zoology';
    if (lower.includes('bio')) return 'Biology';
    return clean;
  };

  const defaultAssessmentSubject = normalizeSubject(assessment.subject) || normalizeSubject(assessment.title);

  // Detect dominant subject across questions if test has one
  let dominantSubject = defaultAssessmentSubject;
  if (!dominantSubject && questionsRes.rows.length > 0) {
    const counts = {};
    for (const q of questionsRes.rows) {
      const s = normalizeSubject(q.subject_name) || normalizeSubject(q.subject) || normalizeSubject(q.bank_category);
      if (s) counts[s] = (counts[s] || 0) + 1;
    }
    const detected = Object.keys(counts);
    if (detected.length === 1) {
      dominantSubject = detected[0];
    }
  }

  const solutions = questionsRes.rows.map((q, idx) => {
    const ans = ansMap.get(q.id);
    let yourAnswer = null;
    let correct = false;
    let questionMarksObtained = 0;

    if (isMultiSelectQuestion(q)) {
      let selected = ensureArray(ans?.selected_indices);
      if (!selected.length && ans?.selected_index != null) {
        selected = [ans.selected_index];
      }
      yourAnswer = selected;
      const ci = ensureArray(q.correct_indices);
      const si = yourAnswer;
      correct = arraysEqual(si, ci);
      if (!si.length) {
        questionMarksObtained = 0;
      } else if (correct) {
        questionMarksObtained = q.marks;
      } else {
        questionMarksObtained = negEnabled ? -negPenalty : 0;
      }
    } else if (q.question_type === 'mcq' || q.question_type === 'single_choice' || q.question_type === 'assertion_reason') {
      yourAnswer = ans?.selected_index;
      correct = yourAnswer === q.correct_index;
      if (yourAnswer === undefined || yourAnswer === null) {
        questionMarksObtained = 0;
      } else if (correct) {
        questionMarksObtained = q.marks;
      } else {
        questionMarksObtained = negEnabled ? -negPenalty : 0;
      }
    } else if (q.question_type === 'integer' || q.question_type === 'numerical') {
      yourAnswer = ans?.numeric_answer != null ? Number(ans.numeric_answer) : null;
      const targetVal = q.numeric_answer != null ? Number(q.numeric_answer) : null;
      const tol = q.question_type === 'numerical' ? (Number(q.numerical_tolerance) || 0.01) : 0;
      const acceptedAnswers = getAcceptedNumericAnswers(q, targetVal);
      if (yourAnswer === null || Number.isNaN(yourAnswer)) {
        questionMarksObtained = 0;
      } else if (
        acceptedAnswers.length > 0 && (
          q.question_type === 'integer'
            ? acceptedAnswers.some((acc) => Math.round(yourAnswer) === Math.round(acc))
            : acceptedAnswers.some((acc) => Math.abs(yourAnswer - acc) <= tol)
        )
      ) {
        correct = true;
        questionMarksObtained = q.marks;
      } else {
        questionMarksObtained = negEnabled ? -negPenalty : 0;
      }
    } else if (q.question_type === 'coding') {
      yourAnswer = codeMap.get(q.id) || '';
      const tests = Array.isArray(q.test_cases) ? q.test_cases : [];
      if (yourAnswer.trim()) {
        const grade = gradeCodingAnswer(yourAnswer, tests);
        if (grade.passed) {
          correct = true;
          questionMarksObtained = q.marks;
        } else if (grade.total > 0) {
          const partial = Math.round((grade.passedCount / grade.total) * q.marks);
          questionMarksObtained = partial;
          correct = partial > 0;
        }
      }
    } else if (q.question_type === 'subjective') {
      yourAnswer = subjMap.get(q.id) || '';
      if (yourAnswer.trim().length >= 20) {
        correct = true;
        questionMarksObtained = q.marks;
      }
    }

    const resolvedSubject = normalizeSubject(q.subject_name)
      || normalizeSubject(q.subject)
      || normalizeSubject(q.section_name)
      || normalizeSubject(q.bank_category)
      || dominantSubject
      || 'General';

    const resolvedTopic = q.topic || q.chapter || q.chapter_name || (q.bank_category && q.bank_category !== 'General' ? q.bank_category : `${resolvedSubject} Concepts`);

    let mediaArr = [];
    if (Array.isArray(q.media)) {
      mediaArr = q.media;
    } else if (typeof q.media === 'string') {
      try {
        mediaArr = JSON.parse(q.media);
      } catch (_) {}
    }

    const solImg = q.solution_image_url
      || (Array.isArray(mediaArr) ? mediaArr.find((m) => m && (m.id?.includes('-exp-') || m.type === 'solution' || m.type === 'explanation'))?.url : null)
      || null;

    const questionImg = q.image_url
      || (Array.isArray(mediaArr) ? mediaArr.find((m) => m && (m.id?.includes('-img-') || m.type === 'diagram' || m.type === 'question'))?.url : null)
      || null;

    let neetMeta = null;
    if (isNeet) {
      neetMeta = resolveQuestionNeetMeta(q, idx, questionsRes.rows.length);
    }

    return {
      id: q.id,
      position: q.position || idx + 1,
      question_type: q.question_type,
      question_text: q.question_text,
      assertion_text: q.assertion_text || null,
      reason_text: q.reason_text || null,
      options: q.options,
      correct_index: q.correct_index,
      correct_indices: q.correct_indices,
      numeric_answer: q.numeric_answer,
      numerical_tolerance: q.numerical_tolerance,
      marks: q.marks,
      marks_obtained: questionMarksObtained,
      is_correct: correct,
      your_answer: yourAnswer,
      solution: q.solution,
      image_url: questionImg,
      solution_image_url: solImg,
      media: mediaArr,
      topic: resolvedTopic,
      chapter: q.chapter || q.chapter_name || resolvedTopic,
      subject_name: isNeet && neetMeta?.subject ? neetMeta.subject : resolvedSubject,
      bank_category: isNeet && neetMeta?.subject ? neetMeta.subject : (q.bank_category || resolvedSubject),
      section_name: isNeet && neetMeta?.section ? `Section ${neetMeta.section}` : (q.section_name || resolvedSubject),
      section: isNeet ? neetMeta?.section : (q.section || null),
      is_neet: isNeet,
      is_section_b: isNeet ? neetMeta?.isSectionB : false,
      subject_question_number: isNeet ? neetMeta?.subjectQuestionNumber : (idx + 1),
    };
  });

  const isNeetAssessment = isNeetTest(assessment, questionsRes.rows);
  let rawScore = score || scoreRes.rows[0] || null;
  const formattedReport = buildFormattedResult(attempt, assessment, rawScore, solutions, isNeetAssessment, answersRes.rows);

  // Compute live ranking data: participant count, ranking availability, rank, percentile, ranking status
  const rankingData = await getAssessmentRankingData(attempt.assessment_id, attempt.candidate_id);

  // Auto-correct any previously stored score that missed negative marking deduction
  if (rawScore) {
    let correctedMarks = null;
    let correctedPercentage = null;

    if (isNeetAssessment && formattedReport?.neetBreakdown) {
      correctedMarks = formattedReport.neetBreakdown.marksObtained;
      correctedPercentage = formattedReport.neetBreakdown.percentage;
    } else if (negEnabled && Number(rawScore.wrong_count) > 0) {
      const calculatedMarks = Math.max(0, (Number(rawScore.correct_count) * (isJee ? 4 : 4)) - (Number(rawScore.wrong_count) * negPenalty));
      if (Number(rawScore.marks_obtained) > calculatedMarks) {
        correctedMarks = calculatedMarks;
        const total = Number(rawScore.total_marks) || 720;
        correctedPercentage = Number(((calculatedMarks / total) * 100).toFixed(2));
      }
    }

    if (correctedMarks !== null && Number(rawScore.marks_obtained) !== Number(correctedMarks)) {
      await query(
        'UPDATE scores SET marks_obtained = $1, percentage = $2 WHERE id = $3',
        [correctedMarks, correctedPercentage, rawScore.id]
      );
      rawScore.marks_obtained = correctedMarks;
      rawScore.percentage = correctedPercentage;
      if (formattedReport?.overall) {
        formattedReport.overall.marks = Number(correctedMarks);
        formattedReport.overall.percentage = Number(correctedPercentage);
      }
    }
  }

  if (isNeetAssessment && rankingData) {
    const effectiveMarks = rawScore?.marks_obtained ?? formattedReport?.overall?.marks ?? 0;
    const neetPred = predictNeetRank(effectiveMarks);
    rankingData.ranking_available = true;
    rankingData.rankingAvailable = true;
    rankingData.ranking_status = 'predicted';
    rankingData.rankingStatus = 'predicted';
    rankingData.rank = neetPred.rank;
    rankingData.rank_range = neetPred.rank_range;
    rankingData.rankRange = neetPred.rank_range;
    rankingData.predicted_rank_range = neetPred.predicted_rank_range;
    rankingData.percentile = neetPred.percentile;
    rankingData.is_neet = true;
  }

  const enhancedScore = rawScore ? {
    ...rawScore,
    total_participants: rankingData?.total_participants ?? 0,
    totalParticipants: rankingData?.total_participants ?? 0,
    ranking_available: rankingData?.ranking_available ?? false,
    rankingAvailable: rankingData?.ranking_available ?? false,
    ranking_status: rankingData?.ranking_status ?? 'pending',
    rankingStatus: rankingData?.ranking_status ?? 'pending',
    rank: rankingData?.rank ?? rawScore?.rank ?? null,
    rank_num: rankingData?.rank ?? rawScore?.rank ?? null,
    rank_range: rankingData?.rank_range,
    rankRange: rankingData?.rank_range,
    predicted_rank_range: rankingData?.predicted_rank_range,
    percentile: rankingData?.percentile,
    is_neet: Boolean(isNeetAssessment),
  } : null;

  let topperComparison = null;
  try {
    topperComparison = await getTopperComparison({
      assessmentId: assessment.id,
      attemptId: attempt.id,
      candidateId: attempt.candidate_id,
      currentStudentStats: {
        attempt_id: attempt.id,
        candidate_id: attempt.candidate_id,
        marks_obtained: Number(rawScore?.marks_obtained ?? formattedReport?.overall?.marks ?? 0),
        total_marks: Number(rawScore?.total_marks ?? formattedReport?.overall?.totalMarks ?? 0),
        percentage: Number(rawScore?.percentage ?? formattedReport?.overall?.percentage ?? 0),
        duration_seconds: Number(attempt.duration_seconds || 0),
        correct_count: Number(rawScore?.correct_count ?? formattedReport?.overall?.correct ?? 0),
        wrong_count: Number(rawScore?.wrong_count ?? formattedReport?.overall?.incorrect ?? 0),
        unattempted_count: Number(rawScore?.unattempted_count ?? formattedReport?.overall?.unattempted ?? 0),
        accuracy: Number(rawScore?.accuracy ?? formattedReport?.overall?.accuracy ?? 0),
        rank: rankingData.rank,
      }
    });
  } catch (err) {
    console.error('Failed to get topper comparison for attempt result:', err);
  }

  res.json({
    attempt: {
      id: attempt.id,
      status: attempt.status,
      started_at: attempt.started_at,
      submitted_at: attempt.submitted_at,
      duration_seconds: attempt.duration_seconds,
      violation_count: attempt.violation_count,
    },
    assessment: {
      id: assessment.id,
      title: assessment.title,
      subject: assessment.subject || dominantSubject || null,
      test_type: assessment.test_type || null,
      passing_marks: assessment.passing_marks
    },
    score: enhancedScore,
    total_participants: rankingData.total_participants,
    totalParticipants: rankingData.total_participants,
    ranking_available: rankingData.ranking_available,
    rankingAvailable: rankingData.ranking_available,
    ranking_status: rankingData.ranking_status,
    rankingStatus: rankingData.ranking_status,
    rank: rankingData?.rank ?? rawScore?.rank ?? null,
    rank_num: rankingData?.rank ?? rawScore?.rank ?? null,
    rank_range: rankingData.rank_range,
    rankRange: rankingData.rank_range,
    predicted_rank_range: rankingData.predicted_rank_range,
    percentile: rankingData.percentile,
    is_neet: Boolean(isNeetAssessment),
    solutions,
    formattedReport,
    ...formattedReport,
    topper_comparison: topperComparison,
    topperComparison,
    resultVisible: true,
  });
});

const buildFormattedResult = (attempt, assessment, score, solutions, isNeet = false, rawAnswers = []) => {
  const correct = Number(score?.correct_count || 0);
  const incorrect = Number(score?.wrong_count || 0);
  const unattempted = Number(score?.unattempted_count || 0);
  const attemptedTotal = correct + incorrect;
  const overallAccuracy = attemptedTotal > 0 ? Number(((correct / attemptedTotal) * 100).toFixed(2)) : 0;

  const subjects = {};
  const topics = {};

  for (const sol of solutions) {
    const rawSubj = sol.subject_name || sol.bank_category || sol.section_name || 'General';
    const subjKey = rawSubj.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'general';

    if (!subjects[subjKey]) {
      subjects[subjKey] = { marks: 0, correct: 0, incorrect: 0, unattempted: 0, accuracy: 0 };
    }

    const marksObt = Number(sol.marks_obtained || 0);
    subjects[subjKey].marks += marksObt;

    const isUnattempted = sol.your_answer === null || sol.your_answer === undefined || (Array.isArray(sol.your_answer) && sol.your_answer.length === 0) || (typeof sol.your_answer === 'string' && !sol.your_answer.trim());

    if (isUnattempted) {
      subjects[subjKey].unattempted += 1;
    } else if (sol.is_correct) {
      subjects[subjKey].correct += 1;
    } else {
      subjects[subjKey].incorrect += 1;
    }

    const rawTopic = sol.topic || sol.bank_category || 'general';
    const topicKey = String(rawTopic).toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'general';

    if (!topics[topicKey]) {
      topics[topicKey] = { attempted: 0, correct: 0, incorrect: 0, accuracy: 0 };
    }

    if (!isUnattempted) {
      topics[topicKey].attempted += 1;
      if (sol.is_correct) {
        topics[topicKey].correct += 1;
      } else {
        topics[topicKey].incorrect += 1;
      }
    }
  }

  for (const key of Object.keys(subjects)) {
    const s = subjects[key];
    s.marks = Number(s.marks.toFixed(2));
    const sAttempted = s.correct + s.incorrect;
    s.accuracy = sAttempted > 0 ? Number(((s.correct / sAttempted) * 100).toFixed(2)) : 0;
  }

  for (const key of Object.keys(topics)) {
    const t = topics[key];
    t.accuracy = t.attempted > 0 ? Number(((t.correct / t.attempted) * 100).toFixed(2)) : 0;
  }

  let neetBreakdown = null;
  if (isNeet) {
    const neetEval = evaluateNeetAttempt({
      questions: solutions,
      answers: rawAnswers,
      negEnabled: true,
      negPenalty: 1,
    });
    neetBreakdown = {
      isNeet: true,
      maxMarks: 720,
      totalMarks: 720,
      marksObtained: neetEval.marksObtained,
      percentage: neetEval.percentage,
      evaluatedQuestionsCount: neetEval.evaluatedQuestionsCount, // Max 180
      subjectResults: neetEval.subjectResults,
    };
  }

  const durationSec = Number(attempt.duration_seconds || 0);
  const totalQuestions = solutions.length;
  const avgTimePerQ = totalQuestions > 0 ? Math.round(durationSec / totalQuestions) : 0;

  const timeAnalysis = {
    averageTimePerQuestion: avgTimePerQ
  };

  for (const key of Object.keys(subjects)) {
    timeAnalysis[`${key}Average`] = avgTimePerQ;
  }

  return {
    student: {
      id: String(attempt.candidate_id || '')
    },
    test: {
      name: assessment.title || 'Assessment Test',
      totalMarks: isNeet ? 720 : Number(score?.total_marks || assessment.total_marks || 0),
      durationMinutes: Number(assessment.duration_minutes || 0),
      isNeet,
    },
    overall: {
      marks: isNeet && neetBreakdown ? neetBreakdown.marksObtained : Number(score?.marks_obtained || 0),
      totalMarks: isNeet ? 720 : Number(score?.total_marks || assessment.total_marks || 0),
      percentage: isNeet && neetBreakdown ? neetBreakdown.percentage : Number(score?.percentage || 0),
      correct,
      incorrect,
      unattempted,
      accuracy: overallAccuracy
    },
    subjects,
    topics,
    timeAnalysis,
    neetBreakdown,
  };
};

export const getResult = getAttemptResult;
export { finalizeAttempt };
