import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { gradeCodingAnswer } from '../utils/gradeCoding.js';
import { sendCompletionEmail } from '../utils/email.js';
import { createAdminNotification } from '../utils/createAdminNotification.js';

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
  const base = {
    id: q.id,
    section_id: q.section_id,
    question_type: q.question_type,
    question_text: q.question_text,
    assertion_text: q.assertion_text || null,
    reason_text: q.reason_text || null,
    image_url: q.image_url || '',
    marks: q.marks,
    position: q.position,
  };
  if (q.question_type === 'mcq' || q.question_type === 'single_choice' || q.question_type === 'multi_select' || q.question_type === 'assertion_reason') {
    return { ...base, options: q.options };
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

    const negEnabled = assessment.negative_marking === true;
    const negPenalty = Number(assessment.negative_marks_per_wrong) || 0.25;

    let totalMarks = 0;
    let marksObtained = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

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
        if (userVal === null || Number.isNaN(userVal)) unattemptedCount += 1;
        else if (targetVal !== null && Math.round(userVal) === Math.round(targetVal)) {
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
        if (userVal === null || Number.isNaN(userVal)) unattemptedCount += 1;
        else if (targetVal !== null && Math.abs(userVal - targetVal) <= tol) {
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

    const percentage = totalMarks > 0 ? Number(((marksObtained / totalMarks) * 100).toFixed(2)) : 0;
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

    const scoreRes = await client.query(
      `INSERT INTO scores (attempt_id, marks_obtained, total_marks, percentage, passed, correct_count, wrong_count, unattempted_count)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (attempt_id) DO UPDATE
         SET marks_obtained = EXCLUDED.marks_obtained,
             total_marks = EXCLUDED.total_marks,
             percentage = EXCLUDED.percentage,
             passed = EXCLUDED.passed,
             correct_count = EXCLUDED.correct_count,
             wrong_count = EXCLUDED.wrong_count,
             unattempted_count = EXCLUDED.unattempted_count
       RETURNING *`,
      [attemptId, marksObtained, totalMarks, percentage, passed, correctCount, wrongCount, unattemptedCount]
    );

    await client.query(
      `WITH ranked AS (
         SELECT s.attempt_id,
                RANK() OVER (ORDER BY s.marks_obtained DESC, s.attempt_id ASC) AS rk,
                CASE WHEN cnt.total <= 1 THEN 100
                     ELSE ROUND((below.c::numeric / cnt.total) * 100, 2)
                END AS pct
         FROM scores s
         JOIN attempts a ON a.id = s.attempt_id
         CROSS JOIN (SELECT COUNT(*)::int AS total FROM scores s2 JOIN attempts a2 ON a2.id = s2.attempt_id WHERE a2.assessment_id = $1) cnt
         LEFT JOIN LATERAL (
           SELECT COUNT(*)::int AS c FROM scores s3
           JOIN attempts a3 ON a3.id = s3.attempt_id
           WHERE a3.assessment_id = $1 AND s3.marks_obtained <= s.marks_obtained
         ) below ON true
         WHERE a.assessment_id = $1
       )
       UPDATE scores SET rank = ranked.rk, percentile = ranked.pct
       FROM ranked WHERE scores.attempt_id = ranked.attempt_id`,
      [attempt.assessment_id]
    );

    const refreshed = await client.query('SELECT * FROM scores WHERE attempt_id = $1', [attemptId]);
    return {
      alreadyDone: false,
      score: refreshed.rows[0] || scoreRes.rows[0],
      attempt,
      assessment,
      durationSeconds,
      violationCount: attempt.violation_count,
    };
  });

  if (result && !result.alreadyDone && result.score) {
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
         OR (assigned_to_type = 'individual' AND assigned_to_id = $2)
         OR (assigned_to_type = 'batch' AND $3::int IS NOT NULL AND assigned_to_id = $3)
         OR (assigned_to_type = 'institution' AND $4::int IS NOT NULL AND assigned_to_id = $4)
       )`,
    [assessmentId, user.id, batchId, instId]
  );
  if (assignCheck.rowCount > 0) {
    return { invite: null, source: 'assignment' };
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
  const tCheck = await query('SELECT id FROM test_assignments WHERE test_id = $1 LIMIT 1', [attempt.assessment_id]);
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

  res.json({
    attempt,
    assessment: {
      id: assessmentObj.id,
      title: assessmentObj.title,
      duration_minutes: assessmentObj.duration_minutes,
      max_violations: assessmentObj.max_violations || 5,
      question_paper_url: assessmentObj.question_paper_url || null,
      solution_pdf_url: assessmentObj.solution_pdf_url || null,
      answer_key_url: assessmentObj.answer_key_url || null,
    },
    sections: sectionsRes.rows,
    questions: questionsRes.rows.map(sanitizeQuestion),
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
    'SELECT id, question_type, question_text, correct_indices FROM questions WHERE id = $1 AND assessment_id = $2',
    [question_id, attempt.assessment_id]
  );
  if (qRes.rowCount === 0) throw ApiError.badRequest('Invalid question');

  const targetQ = qRes.rows[0];
  const qType = targetQ.question_type;
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
  } else if (qType === 'mcq' || qType === 'single_choice' || qType === 'assertion_reason') {
    if (selected_index === undefined && selected_index !== null) throw ApiError.badRequest('selected_index required');
    await query(
      `INSERT INTO answers (attempt_id, question_id, selected_index, updated_at)
       VALUES ($1,$2,$3, NOW())
       ON CONFLICT (attempt_id, question_id)
       DO UPDATE SET selected_index = EXCLUDED.selected_index, updated_at = NOW()`,
      [id, question_id, selected_index]
    );
  } else if (qType === 'integer' || qType === 'numerical') {
    const val = numeric_answer !== undefined && numeric_answer !== null && numeric_answer !== '' ? Number(numeric_answer) : null;
    await query(
      `INSERT INTO answers (attempt_id, question_id, numeric_answer, updated_at)
       VALUES ($1,$2,$3, NOW())
       ON CONFLICT (attempt_id, question_id)
       DO UPDATE SET numeric_answer = EXCLUDED.numeric_answer, updated_at = NOW()`,
      [id, question_id, val]
    );
  } else {
    throw ApiError.badRequest('Use coding or subjective endpoints for this question type');
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
  const score = scoreRes.rows[0] || null;

  const [questionsRes, answersRes, codingRes, subjectiveRes] = await Promise.all([
    query(
      `SELECT q.id, q.question_type, q.question_text, q.options, q.correct_index, q.correct_indices, q.numeric_answer, q.numerical_tolerance, q.assertion_text, q.reason_text, q.marks, q.position, q.solution, q.test_cases, q.section_id, q.subject_id, q.bank_category, s.name AS section_name, subj.name AS subject_name
       FROM questions q
       LEFT JOIN assessment_sections s ON s.id = q.section_id
       LEFT JOIN subjects subj ON subj.id = q.subject_id
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

  const negEnabled = assessment.negative_marking === true;
  const negPenalty = Number(assessment.negative_marks_per_wrong) || 0.25;

  const solutions = questionsRes.rows.map((q) => {
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
      if (yourAnswer === null || Number.isNaN(yourAnswer)) {
        questionMarksObtained = 0;
      } else if (targetVal !== null && (q.question_type === 'integer' ? Math.round(yourAnswer) === Math.round(targetVal) : Math.abs(yourAnswer - targetVal) <= tol)) {
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

    return {
      id: q.id,
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
      subject_name: q.subject_name || null,
      bank_category: q.subject_name || q.bank_category || null,
      section_name: q.subject_name || q.bank_category || q.section_name || 'General',
    };
  });

  res.json({
    attempt: {
      id: attempt.id,
      status: attempt.status,
      started_at: attempt.started_at,
      submitted_at: attempt.submitted_at,
      duration_seconds: attempt.duration_seconds,
      violation_count: attempt.violation_count,
    },
    assessment: { id: assessment.id, title: assessment.title, passing_marks: assessment.passing_marks },
    score: scoreRes.rows[0] || null,
    solutions,
    resultVisible: true,
  });
});

export const getResult = getAttemptResult;
export { finalizeAttempt };
