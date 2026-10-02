import { query, pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import { gradeCodingAnswer } from '../utils/gradeCoding.js';

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

export const normalizeSubject = (str) => {
  if (!str || typeof str !== 'string') return 'General';
  const clean = str.trim();
  const lower = clean.toLowerCase();
  if (['general', 'general aptitude', 'default', 'uncategorized', 'all'].includes(lower)) {
    return 'General';
  }
  if (lower.includes('chem')) return 'Chemistry';
  if (lower.includes('phys')) return 'Physics';
  if (lower.includes('math')) return 'Mathematics';
  if (lower.includes('botan')) return 'Botany';
  if (lower.includes('zool')) return 'Zoology';
  if (lower.includes('bio')) return 'Biology';
  if (lower.includes('aptitude') || lower.includes('reasoning')) return 'Aptitude';
  return clean;
};

/**
 * Record mistakes for a single finalized attempt
 * Can accept a transaction client or will use the general pool
 */
export const recordAttemptMistakes = async (dbClientOrPool, attemptId, candidateId, assessmentId) => {
  const db = dbClientOrPool || pool;

  try {
    const [questionsRes, answersRes, codingRes, subjectiveRes, assessmentRes] = await Promise.all([
      db.query(
        `SELECT q.id, q.question_type, q.question_text, q.options, q.correct_index, q.correct_indices,
                q.numeric_answer, q.numerical_tolerance, q.assertion_text, q.reason_text, q.marks,
                q.position, q.solution, q.test_cases, q.subject_id, q.bank_category, q.topic,
                q.subject, q.chapter, subj.name AS subject_name, c.name AS chapter_name, s.name AS section_name
         FROM questions q
         LEFT JOIN assessment_sections s ON s.id = q.section_id
         LEFT JOIN subjects subj ON subj.id = q.subject_id
         LEFT JOIN chapters c ON c.id = q.chapter_id
         WHERE q.assessment_id = $1
         ORDER BY q.position ASC, q.id ASC`,
        [assessmentId]
      ),
      db.query(
        `SELECT question_id, selected_index, selected_indices, numeric_answer
         FROM answers WHERE attempt_id = $1`,
        [attemptId]
      ),
      db.query(
        `SELECT question_id, source_code FROM coding_answers WHERE attempt_id = $1`,
        [attemptId]
      ),
      db.query(
        `SELECT question_id, answer_text FROM subjective_answers WHERE attempt_id = $1`,
        [attemptId]
      ),
      db.query(
        `SELECT id, COALESCE(title, test_name) AS title, subject FROM assessments WHERE id = $1
         UNION
         SELECT id, COALESCE(test_name, title) AS title, subject FROM tests WHERE id = $1
         LIMIT 1`,
        [assessmentId]
      ).catch(() => ({ rows: [] }))
    ]);

    const assessmentTitle = assessmentRes.rows[0]?.title || 'Assessment Test';
    const ansMap = new Map(answersRes.rows.map((a) => [a.question_id, a]));
    const codeMap = new Map(codingRes.rows.map((a) => [a.question_id, a.source_code]));
    const subjMap = new Map(subjectiveRes.rows.map((a) => [a.question_id, a.answer_text]));

    const resolvedQuestionIds = [];
    const mistakeRows = [];

    for (const q of questionsRes.rows) {
      const type = (q.question_type || 'mcq').toLowerCase();
      const ans = ansMap.get(q.id);
      let isAttempted = false;
      let isCorrect = false;
      let yourAnswer = null;

      if (['multi_select', 'multiple_correct', 'multiple_select'].includes(type) || ensureArray(q.correct_indices).length > 1) {
        let selected = ensureArray(ans?.selected_indices);
        if (!selected.length && ans?.selected_index != null) {
          selected = [ans.selected_index];
        }
        yourAnswer = selected;
        isAttempted = selected.length > 0;
        if (isAttempted) {
          const ci = ensureArray(q.correct_indices);
          isCorrect = arraysEqual(selected, ci);
        }
      } else if (['mcq', 'single_choice', 'assertion_reason'].includes(type)) {
        yourAnswer = ans?.selected_index;
        isAttempted = yourAnswer !== undefined && yourAnswer !== null;
        if (isAttempted) {
          isCorrect = Number(yourAnswer) === Number(q.correct_index);
        }
      } else if (['integer', 'numerical'].includes(type)) {
        yourAnswer = ans?.numeric_answer != null ? Number(ans.numeric_answer) : null;
        isAttempted = yourAnswer !== null && !Number.isNaN(yourAnswer);
        if (isAttempted) {
          const targetVal = q.numeric_answer != null ? Number(q.numeric_answer) : null;
          const tol = type === 'numerical' ? (Number(q.numerical_tolerance) || 0.01) : 0;
          if (targetVal !== null) {
            isCorrect = type === 'integer'
              ? Math.round(yourAnswer) === Math.round(targetVal)
              : Math.abs(yourAnswer - targetVal) <= tol;
          }
        }
      } else if (type === 'coding') {
        yourAnswer = codeMap.get(q.id) || '';
        isAttempted = Boolean(yourAnswer.trim());
        if (isAttempted) {
          const tests = Array.isArray(q.test_cases) ? q.test_cases : [];
          const grade = gradeCodingAnswer(yourAnswer, tests);
          isCorrect = grade.passed;
        }
      } else if (type === 'subjective') {
        yourAnswer = subjMap.get(q.id) || '';
        isAttempted = Boolean(yourAnswer.trim());
        if (isAttempted) {
          isCorrect = yourAnswer.trim().length >= 20;
        }
      } else {
        yourAnswer = ans?.selected_index;
        isAttempted = yourAnswer !== undefined && yourAnswer !== null;
        if (isAttempted) {
          isCorrect = Number(yourAnswer) === Number(q.correct_index);
        }
      }

      const resolvedSubject = normalizeSubject(
        q.subject_name || q.subject || q.section_name || q.bank_category || assessmentRes.rows[0]?.subject || assessmentTitle
      );
      const resolvedTopic = q.topic || q.chapter || q.chapter_name || (q.bank_category && q.bank_category !== 'General' ? q.bank_category : `${resolvedSubject} Concepts`);
      const resolvedChapter = q.chapter || q.chapter_name || resolvedTopic;

      if (isCorrect) {
        resolvedQuestionIds.push(q.id);
      } else if (isAttempted && !isCorrect) {
        mistakeRows.push({
          student_id: candidateId,
          assessment_id: assessmentId,
          attempt_id: attemptId,
          question_id: q.id,
          mistake_type: 'incorrect',
          selected_answer: { answer: yourAnswer, type },
          subject: resolvedSubject,
          topic: resolvedTopic,
          chapter: resolvedChapter,
        });
      } else if (!isAttempted) {
        mistakeRows.push({
          student_id: candidateId,
          assessment_id: assessmentId,
          attempt_id: attemptId,
          question_id: q.id,
          mistake_type: 'unattempted',
          selected_answer: null,
          subject: resolvedSubject,
          topic: resolvedTopic,
          chapter: resolvedChapter,
        });
      }
    }

    // 1. Batch update resolved questions
    if (resolvedQuestionIds.length > 0) {
      await db.query(
        `UPDATE student_mistake_book
         SET status = 'resolved', updated_at = NOW()
         WHERE student_id = $1 AND question_id = ANY($2::int[])`,
        [candidateId, resolvedQuestionIds]
      ).catch(() => {});
    }

    // 2. Batch upsert mistake questions
    if (mistakeRows.length > 0) {
      const placeholders = [];
      const params = [];
      let pIdx = 1;

      for (const m of mistakeRows) {
        placeholders.push(`($${pIdx}, $${pIdx + 1}, $${pIdx + 2}, $${pIdx + 3}, $${pIdx + 4}, $${pIdx + 5}::jsonb, $${pIdx + 6}, $${pIdx + 7}, $${pIdx + 8}, 'active', NOW())`);
        params.push(
          m.student_id,
          m.assessment_id,
          m.attempt_id,
          m.question_id,
          m.mistake_type,
          m.selected_answer ? JSON.stringify(m.selected_answer) : null,
          m.subject,
          m.topic,
          m.chapter
        );
        pIdx += 9;
      }

      await db.query(
        `INSERT INTO student_mistake_book (
           student_id, assessment_id, attempt_id, question_id,
           mistake_type, selected_answer, subject, topic, chapter, status, updated_at
         )
         VALUES ${placeholders.join(', ')}
         ON CONFLICT (student_id, question_id)
         DO UPDATE SET
           assessment_id = EXCLUDED.assessment_id,
           attempt_id = EXCLUDED.attempt_id,
           mistake_type = EXCLUDED.mistake_type,
           selected_answer = COALESCE(EXCLUDED.selected_answer, student_mistake_book.selected_answer),
           subject = COALESCE(EXCLUDED.subject, student_mistake_book.subject),
           topic = COALESCE(EXCLUDED.topic, student_mistake_book.topic),
           chapter = COALESCE(EXCLUDED.chapter, student_mistake_book.chapter),
           status = 'active',
           times_attempted = student_mistake_book.times_attempted + 1,
           updated_at = NOW()`,
        params
      ).catch((err) => {
        console.warn('[recordAttemptMistakes] Batch upsert warning:', err.message);
      });
    }
  } catch (err) {
    console.error('[recordAttemptMistakes] Failed to process attempt mistakes:', err);
  }
};

/**
 * Auto-sync all previous completed attempts for a candidate into student_mistake_book
 */
export const syncAllAttemptsForStudent = async (candidateId) => {
  const attemptsRes = await query(
    `SELECT at.id AS attempt_id, at.assessment_id
     FROM attempts at
     WHERE at.candidate_id = $1 AND at.status::text IN ('submitted', 'auto_submitted', 'violation_submitted')
     ORDER BY at.submitted_at ASC, at.id ASC`,
    [candidateId]
  );

  let processedCount = 0;
  for (const row of attemptsRes.rows) {
    await recordAttemptMistakes(pool, row.attempt_id, candidateId, row.assessment_id);
    processedCount++;
  }
  return { processed_attempts: processedCount };
};

/**
 * Get all mistake book entries for a student with filtering and analytics
 * Strictly restricted to academic subjects: Physics, Chemistry, Biology, Mathematics
 * Questions-only payload: answers and solutions are omitted as requested
 */
export const getMistakesForStudent = async (candidateId, filters = {}) => {
  const { subject, type, status = 'active', search, limit = 500, offset = 0 } = filters;

  const countRes = await query(
    `SELECT
       COUNT(*) FILTER (WHERE status = 'active')::int AS total_active,
       COUNT(*) FILTER (WHERE status = 'active' AND mistake_type = 'incorrect')::int AS total_incorrect,
       COUNT(*) FILTER (WHERE status = 'active' AND mistake_type = 'unattempted')::int AS total_unattempted,
       COUNT(*) FILTER (WHERE status = 'resolved')::int AS total_resolved,
       COUNT(*)::int AS total_all
     FROM student_mistake_book
     WHERE student_id = $1
       AND (LOWER(subject) LIKE '%phys%' OR LOWER(subject) LIKE '%chem%' OR LOWER(subject) LIKE '%bio%' OR LOWER(subject) LIKE '%botan%' OR LOWER(subject) LIKE '%zool%' OR LOWER(subject) LIKE '%math%')`,
    [candidateId]
  );

  const subjectCountsRes = await query(
    `SELECT
       CASE
         WHEN LOWER(subject) LIKE '%phys%' THEN 'Physics'
         WHEN LOWER(subject) LIKE '%chem%' THEN 'Chemistry'
         WHEN LOWER(subject) LIKE '%bio%' OR LOWER(subject) LIKE '%botan%' OR LOWER(subject) LIKE '%zool%' THEN 'Biology'
         WHEN LOWER(subject) LIKE '%math%' THEN 'Mathematics'
       END AS subject,
       COUNT(*)::int AS count
     FROM student_mistake_book
     WHERE student_id = $1
       AND (LOWER(subject) LIKE '%phys%' OR LOWER(subject) LIKE '%chem%' OR LOWER(subject) LIKE '%bio%' OR LOWER(subject) LIKE '%botan%' OR LOWER(subject) LIKE '%zool%' OR LOWER(subject) LIKE '%math%')
       ${status !== 'all' ? `AND status = '${status === 'resolved' ? 'resolved' : 'active'}'` : ''}
     GROUP BY 1
     ORDER BY
       CASE
         WHEN CASE WHEN LOWER(subject) LIKE '%phys%' THEN 'Physics' WHEN LOWER(subject) LIKE '%chem%' THEN 'Chemistry' WHEN LOWER(subject) LIKE '%bio%' OR LOWER(subject) LIKE '%botan%' OR LOWER(subject) LIKE '%zool%' THEN 'Biology' WHEN LOWER(subject) LIKE '%math%' THEN 'Mathematics' END = 'Physics' THEN 1
         WHEN CASE WHEN LOWER(subject) LIKE '%phys%' THEN 'Physics' WHEN LOWER(subject) LIKE '%chem%' THEN 'Chemistry' WHEN LOWER(subject) LIKE '%bio%' OR LOWER(subject) LIKE '%botan%' OR LOWER(subject) LIKE '%zool%' THEN 'Biology' WHEN LOWER(subject) LIKE '%math%' THEN 'Mathematics' END = 'Chemistry' THEN 2
         WHEN CASE WHEN LOWER(subject) LIKE '%phys%' THEN 'Physics' WHEN LOWER(subject) LIKE '%chem%' THEN 'Chemistry' WHEN LOWER(subject) LIKE '%bio%' OR LOWER(subject) LIKE '%botan%' OR LOWER(subject) LIKE '%zool%' THEN 'Biology' WHEN LOWER(subject) LIKE '%math%' THEN 'Mathematics' END = 'Biology' THEN 3
         ELSE 4
       END ASC`,
    [candidateId]
  );

  let queryStr = `
    SELECT smb.id AS mistake_id, smb.mistake_type, smb.status,
           smb.times_attempted, smb.created_at, smb.updated_at,
           CASE
             WHEN LOWER(smb.subject) LIKE '%phys%' THEN 'Physics'
             WHEN LOWER(smb.subject) LIKE '%chem%' THEN 'Chemistry'
             WHEN LOWER(smb.subject) LIKE '%bio%' OR LOWER(smb.subject) LIKE '%botan%' OR LOWER(smb.subject) LIKE '%zool%' THEN 'Biology'
             WHEN LOWER(smb.subject) LIKE '%math%' THEN 'Mathematics'
             ELSE 'Other'
           END AS mistake_subject,
           smb.topic AS mistake_topic, smb.chapter AS mistake_chapter,
           q.id AS question_id, q.question_type, q.question_text, q.options,
           q.assertion_text, q.reason_text, q.marks, q.image_url, q.media, q.difficulty,
           COALESCE(a.title, t.test_name, 'Diagnostic Mock') AS source_assessment_title,
           COALESCE(smb.assessment_id, q.assessment_id) AS assessment_id,
           at.submitted_at AS attempt_date
    FROM student_mistake_book smb
    JOIN questions q ON q.id = smb.question_id
    LEFT JOIN assessments a ON a.id = smb.assessment_id
    LEFT JOIN tests t ON t.id = smb.assessment_id
    LEFT JOIN attempts at ON at.id = smb.attempt_id
    WHERE smb.student_id = $1
      AND (LOWER(smb.subject) LIKE '%phys%' OR LOWER(smb.subject) LIKE '%chem%' OR LOWER(smb.subject) LIKE '%bio%' OR LOWER(smb.subject) LIKE '%botan%' OR LOWER(smb.subject) LIKE '%zool%' OR LOWER(smb.subject) LIKE '%math%')
  `;
  const params = [candidateId];

  if (status && status !== 'all') {
    params.push(status);
    queryStr += ` AND smb.status = $${params.length}`;
  }

  if (type && type !== 'all') {
    params.push(type);
    queryStr += ` AND smb.mistake_type = $${params.length}`;
  }

  if (subject && subject !== 'all') {
    const sLower = subject.toLowerCase();
    if (sLower.includes('phys')) {
      queryStr += ` AND LOWER(smb.subject) LIKE '%phys%'`;
    } else if (sLower.includes('chem')) {
      queryStr += ` AND LOWER(smb.subject) LIKE '%chem%'`;
    } else if (sLower.includes('bio') || sLower.includes('botan') || sLower.includes('zool')) {
      queryStr += ` AND (LOWER(smb.subject) LIKE '%bio%' OR LOWER(smb.subject) LIKE '%botan%' OR LOWER(smb.subject) LIKE '%zool%')`;
    } else if (sLower.includes('math')) {
      queryStr += ` AND LOWER(smb.subject) LIKE '%math%'`;
    }
  }

  if (search && search.trim()) {
    params.push(`%${search.trim().toLowerCase()}%`);
    queryStr += ` AND (LOWER(q.question_text) LIKE $${params.length} OR LOWER(COALESCE(smb.topic, '')) LIKE $${params.length})`;
  }

  queryStr += ` ORDER BY smb.updated_at DESC, smb.id DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(Number(limit) || 500, Number(offset) || 0);

  const mistakesRes = await query(queryStr, params);

  const formattedMistakes = mistakesRes.rows.map((row) => {
    let options = row.options;
    if (typeof options === 'string') {
      try {
        options = JSON.parse(options);
      } catch (_) {}
    }
    if (!Array.isArray(options)) options = [];

    let mediaArr = [];
    if (Array.isArray(row.media)) {
      mediaArr = row.media;
    } else if (typeof row.media === 'string') {
      try {
        mediaArr = JSON.parse(row.media);
      } catch (_) {}
    }

    return {
      id: row.mistake_id,
      question_id: row.question_id,
      mistake_type: row.mistake_type,
      status: row.status,
      times_attempted: row.times_attempted,
      created_at: row.created_at,
      updated_at: row.updated_at,
      subject: row.mistake_subject || 'Physics',
      topic: row.mistake_topic || 'General Topics',
      chapter: row.mistake_chapter || row.mistake_topic || 'General Topics',
      source_assessment_title: row.source_assessment_title,
      attempt_date: row.attempt_date,
      question: {
        id: row.question_id,
        question_type: row.question_type || 'mcq',
        question_text: row.question_text,
        assertion_text: row.assertion_text,
        reason_text: row.reason_text,
        options,
        marks: row.marks || 4,
        image_url: row.image_url,
        media: mediaArr,
        difficulty: row.difficulty || 'medium',
      }
    };
  });

  return {
    summary: {
      active: countRes.rows[0]?.total_active || 0,
      incorrect: countRes.rows[0]?.total_incorrect || 0,
      unattempted: countRes.rows[0]?.total_unattempted || 0,
      resolved: countRes.rows[0]?.total_resolved || 0,
      total: countRes.rows[0]?.total_all || 0,
    },
    subjects: subjectCountsRes.rows,
    mistakes: formattedMistakes,
  };
};

/**
 * Recreate a new CBT practice test from chosen mistake questions
 */
export const recreateTestFromMistakes = async (candidateId, { question_ids, title, duration_minutes }) => {
  if (!Array.isArray(question_ids) || question_ids.length === 0) {
    throw ApiError.badRequest('Please select at least one question to recreate a test.');
  }

  // Fetch full question definitions for the selected questions
  const qRes = await query(
    `SELECT q.*, smb.subject AS mistake_subject, smb.topic AS mistake_topic
     FROM questions q
     JOIN student_mistake_book smb ON smb.question_id = q.id AND smb.student_id = $1
     WHERE q.id = ANY($2::int[])
     ORDER BY q.id ASC`,
    [candidateId, question_ids]
  );

  if (qRes.rows.length === 0) {
    throw ApiError.notFound('None of the selected questions were found in your Mistake Book.');
  }

  const selectedQuestions = qRes.rows;
  const count = selectedQuestions.length;

  // Calculate default title and duration if not provided
  const subjectsPresent = Array.from(new Set(selectedQuestions.map((q) => q.mistake_subject || q.subject || 'Revision'))).filter(Boolean);
  const subjectLabel = subjectsPresent.slice(0, 3).join(' & ') + (subjectsPresent.length > 3 ? '...' : '');

  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const finalTitle = title?.trim() || `Mistake Book Revision: ${subjectLabel} (${count} Qs - ${dateStr})`;

  // Default duration: 2 minutes per question, minimum 15 mins
  const finalDuration = Number(duration_minutes) > 0
    ? Number(duration_minutes)
    : Math.max(15, count * 2);

  // Total marks calculation
  const totalMarks = selectedQuestions.reduce((sum, q) => sum + (Number(q.marks) || 4), 0);

  // 1. Create the new assessment
  const assessmentInsertRes = await query(
    `INSERT INTO assessments (
       title, description, instructions, duration_minutes, passing_marks, max_violations,
       result_visible, is_published, created_by, created_at, updated_at
     )
     VALUES ($1, $2, $3, $4, $5, 5, true, true, $6, NOW(), NOW())
     RETURNING *`,
    [
      finalTitle,
      `Personalized revision mock exam containing ${count} questions previously incorrect or unattempted in your tests.`,
      'Standard examination CBT instructions apply. Take your time to carefully re-solve the concepts you previously missed.',
      finalDuration,
      Math.round(totalMarks * 0.4),
      candidateId
    ]
  );

  const newAssessment = assessmentInsertRes.rows[0];
  const assessmentId = newAssessment.id;

  // 2. Create default section
  const sectionRes = await query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
     VALUES ($1, 'Mistake Book Revision', 'technical_mcq', 1)
     RETURNING id`,
    [assessmentId]
  );
  const sectionId = sectionRes.rows[0].id;

  // 3. Clone selected questions into the new assessment
  for (let i = 0; i < selectedQuestions.length; i++) {
    const src = selectedQuestions[i];
    let opts = src.options;
    if (typeof opts === 'object') opts = JSON.stringify(opts);

    await query(
      `INSERT INTO questions (
         assessment_id, question_text, options, correct_index, correct_indices,
         numeric_answer, numerical_tolerance, assertion_text, reason_text,
         marks, position, solution, image_url, solution_image_url, media,
         subject, topic, chapter, question_type, section_id, test_cases, created_at
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, NOW())`,
      [
        assessmentId,
        src.question_text,
        opts,
        src.correct_index,
        src.correct_indices ? JSON.stringify(src.correct_indices) : null,
        src.numeric_answer,
        src.numerical_tolerance,
        src.assertion_text,
        src.reason_text,
        src.marks || 4,
        i + 1,
        src.solution,
        src.image_url,
        src.solution_image_url,
        src.media ? (typeof src.media === 'object' ? JSON.stringify(src.media) : src.media) : null,
        src.mistake_subject || src.subject || 'General',
        src.mistake_topic || src.topic || 'Revision',
        src.chapter || src.mistake_topic || 'Revision',
        src.question_type || 'mcq',
        sectionId,
        src.test_cases ? (typeof src.test_cases === 'object' ? JSON.stringify(src.test_cases) : src.test_cases) : null,
      ]
    );
  }

  // 4. Assign individual access to candidate
  await query(
    `INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id)
     VALUES ($1, 'individual', $2)`,
    [assessmentId, candidateId]
  ).catch(() => {});

  return {
    success: true,
    assessment_id: assessmentId,
    title: finalTitle,
    question_count: count,
    duration_minutes: finalDuration,
    total_marks: totalMarks,
    message: `Successfully created revision test with ${count} questions!`,
  };
};

/**
 * Toggle mistake status between 'resolved' and 'active'
 */
export const updateMistakeStatus = async (candidateId, mistakeId, status) => {
  if (!['active', 'resolved'].includes(status)) {
    throw ApiError.badRequest('Status must be either active or resolved');
  }

  const res = await query(
    `UPDATE student_mistake_book
     SET status = $1, updated_at = NOW()
     WHERE id = $2 AND student_id = $3
     RETURNING *`,
    [status, mistakeId, candidateId]
  );

  if (res.rowCount === 0) {
    throw ApiError.notFound('Mistake entry not found');
  }
  return res.rows[0];
};

/**
 * Delete a mistake entry
 */
export const deleteMistake = async (candidateId, mistakeId) => {
  const res = await query(
    `DELETE FROM student_mistake_book
     WHERE id = $1 AND student_id = $2
     RETURNING id`,
    [mistakeId, candidateId]
  );

  if (res.rowCount === 0) {
    throw ApiError.notFound('Mistake entry not found');
  }
  return { deleted: true, id: mistakeId };
};
