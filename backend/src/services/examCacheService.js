import { query } from '../config/db.js';
import { getCache, setCache, delCache } from '../config/redis.js';
import { isNeetTest, resolveQuestionNeetMeta, normalizeNeetAssessmentPayload } from '../utils/neetPattern.js';

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

export const isMultiSelectQuestion = (q) => {
  if (!q) return false;
  const t = (q.question_type || '').toLowerCase();
  if (['multi_select', 'multiple_correct', 'multiple_select', 'multiple_choice', 'multiple'].includes(t)) return true;
  const idxs = ensureArray(q.correct_indices);
  if (idxs.length > 1) return true;
  const text = q.question_text || '';
  return /one\s*or\s*more\s*options?|more\s*than\s*one\s*correct|multiple\s*correct|select\s*all\s*that\s*apply/i.test(text);
};

export const sanitizeQuestion = (q) => {
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

/**
 * Retrieves cached, sanitized exam paper (assessment meta, sections, and questions)
 * or queries PostgreSQL, caches in Redis/memory, and returns it.
 *
 * NOTE: Questions are strictly sanitized before caching to ensure NO answer keys,
 * solutions, or explanations are ever stored in the exam paper cache.
 */
export async function getOrSetCachedExamPaper(assessmentId) {
  const numId = Number(assessmentId);
  if (!numId || isNaN(numId)) return null;

  const cacheKey = `exam_paper:${numId}`;
  const cached = await getCache(cacheKey).catch(() => null);
  if (cached && cached.assessment && Array.isArray(cached.questions)) {
    return cached;
  }

  // 1. Fetch assessment / test metadata
  let assessmentObj = null;
  const tCheck = await query('SELECT id FROM tests WHERE id = $1 LIMIT 1', [numId]).catch(() => ({ rowCount: 0 }));
  if (tCheck.rowCount > 0) {
    const tRes = await query(
      `SELECT t.id, COALESCE(t.test_name, t.title) AS title, t.duration_minutes,
              5 AS max_violations, t.question_paper_url, t.solution_pdf_url, t.answer_key_url,
              (t.is_published = true OR t.status = 'published') AS is_published,
              t.max_marks
       FROM tests t WHERE t.id = $1`,
      [numId]
    );
    assessmentObj = tRes.rows[0];
  }

  if (!assessmentObj) {
    const assessmentRes = await query('SELECT * FROM assessments WHERE id = $1', [numId]);
    assessmentObj = assessmentRes.rows[0];
  }

  if (!assessmentObj) {
    assessmentObj = { id: numId, title: 'Assessment', duration_minutes: 180, max_violations: 5, is_published: true };
  }

  // 2. Fetch sections and questions in parallel
  const [sectionsRes, questionsRes] = await Promise.all([
    query(
      'SELECT * FROM assessment_sections WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
      [numId]
    ),
    query(
      'SELECT * FROM questions WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
      [numId]
    ),
  ]);

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

  let finalQuestions = sanitizedQuestions;
  let finalSections = sectionsRes.rows;
  if (isNeet) {
    const normalized = normalizeNeetAssessmentPayload(assessmentObj, sanitizedQuestions, sectionsRes.rows);
    finalQuestions = normalized.questions;
    finalSections = normalized.sections;
  }

  const paper = {
    assessment: {
      id: assessmentObj.id,
      title: assessmentObj.title,
      duration_minutes: assessmentObj.duration_minutes,
      max_violations: assessmentObj.max_violations || 5,
      question_paper_url: assessmentObj.question_paper_url || null,
      solution_pdf_url: assessmentObj.solution_pdf_url || null,
      answer_key_url: assessmentObj.answer_key_url || null,
      is_neet: isNeet,
      total_marks: isNeet ? 720 : (assessmentObj.total_marks || assessmentObj.max_marks || null),
      is_published: Boolean(assessmentObj.is_published),
    },
    sections: finalSections,
    questions: finalQuestions,
  };

  // Cache published papers for 30 minutes (1800 seconds)
  if (assessmentObj.is_published !== false) {
    await setCache(cacheKey, paper, 1800).catch(() => {});
  }

  return paper;
}

/**
 * Invalidates cached exam paper when an assessment or its questions/sections are updated.
 */
export async function invalidateExamPaperCache(assessmentId) {
  const numId = Number(assessmentId);
  if (!numId || isNaN(numId)) return;
  await Promise.all([
    delCache(`exam_paper:${numId}`).catch(() => {}),
    delCache(`exam_paper:test:${numId}`).catch(() => {}),
  ]);
}

/**
 * Caches question classification metadata (question_type, is_multi)
 * to eliminate repeated question lookups during candidate answer saves.
 */
export async function getOrSetQuestionMeta(questionId) {
  const numId = Number(questionId);
  if (!numId || isNaN(numId)) return { question_type: 'mcq', is_multi: false };

  const cacheKey = `q_meta:${numId}`;
  const cached = await getCache(cacheKey).catch(() => null);
  if (cached && cached.question_type !== undefined) {
    return cached;
  }

  const qRes = await query(
    'SELECT id, question_type, question_text, correct_indices FROM questions WHERE id = $1',
    [numId]
  ).catch(() => ({ rows: [] }));

  const targetQ = qRes.rows[0] || { question_type: 'mcq' };
  const meta = {
    id: targetQ.id,
    question_type: targetQ.question_type || 'mcq',
    is_multi: isMultiSelectQuestion(targetQ),
  };

  await setCache(cacheKey, meta, 3600).catch(() => {});
  return meta;
}

/**
 * Invalidates question metadata cache when a question is edited or deleted.
 */
export async function invalidateQuestionMeta(questionId) {
  const numId = Number(questionId);
  if (!numId || isNaN(numId)) return;
  await delCache(`q_meta:${numId}`).catch(() => {});
}

/**
 * Caches institution branding metadata (name, logo, badge, code) for 1 hour.
 */
export async function getOrSetCachedInstitution(institutionId) {
  const numId = Number(institutionId);
  if (!numId || isNaN(numId)) return null;

  const cacheKey = `inst_meta:${numId}`;
  const cached = await getCache(cacheKey).catch(() => null);
  if (cached && cached.name) return cached;

  const instRes = await query(
    'SELECT id, name, logo_url, logo_badge, code FROM institutions WHERE id = $1',
    [numId]
  ).catch(() => ({ rows: [] }));

  if (instRes.rows.length === 0) return null;
  const row = instRes.rows[0];
  const obj = {
    id: row.id,
    name: row.name,
    logo_url: row.logo_url || '',
    logo_badge: row.logo_badge || (row.name ? row.name.substring(0, 3).toUpperCase() : 'INST'),
    code: row.code || '',
  };

  await setCache(cacheKey, obj, 3600).catch(() => {});
  return obj;
}
