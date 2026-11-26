/**
 * Module 7: Subject and Chapter Validation
 * Validates that question topic, subject, and chapter strictly match
 * the official NEET / JEE competitive examination curriculum.
 */

import { resolveStandardChapter } from '../../../utils/chapterResolver.js';

const VALID_SUBJECTS = {
  neet: ['physics', 'chemistry', 'biology', 'botany', 'zoology'],
  jee: ['physics', 'chemistry', 'mathematics'],
};

const ALL_VALID_SUBJECTS = [
  'physics',
  'chemistry',
  'mathematics',
  'biology',
  'botany',
  'zoology',
];

export function validateCurriculum(question = {}, options = {}) {
  const errors = [];
  const warnings = [];

  const rawSubject = String(question.subject || options.subject || '').trim();
  const rawChapter = String(question.chapter || options.chapter || '').trim();
  const rawExamType = String(question.exam_type || options.examType || options.exam_type || 'NEET').trim().toUpperCase();

  // 1. Subject validation
  if (!rawSubject) {
    errors.push('Question is missing a curriculum subject.');
  } else {
    const normSubj = rawSubject.toLowerCase();
    if (!ALL_VALID_SUBJECTS.includes(normSubj)) {
      errors.push(`Invalid subject "${rawSubject}". Supported competitive subjects: Physics, Chemistry, Mathematics, Biology (Botany/Zoology).`);
    } else {
      // Check subject compatibility with exam stream
      const stream = rawExamType.includes('JEE') ? 'jee' : 'neet';
      const allowed = VALID_SUBJECTS[stream] || [];
      if (!allowed.includes(normSubj)) {
        errors.push(`Subject "${rawSubject}" is not part of the standard ${rawExamType} competitive curriculum.`);
      }
    }
  }

  // 2. Chapter validation
  let resolvedChapter = rawChapter;
  if (!rawChapter) {
    warnings.push('Chapter is not specified. Questions should be categorized by chapter.');
  } else {
    // Attempt canonical resolution
    const resolved = resolveStandardChapter(rawSubject, rawChapter, question.question_text || '');
    if (resolved && resolved !== 'General') {
      resolvedChapter = resolved;
    }
  }

  // 3. Class Level validation
  const classLevel = question.class_level || options.class_level || options.classLevel;
  if (classLevel) {
    const normClass = String(classLevel).toLowerCase();
    if (!normClass.includes('11') && !normClass.includes('12') && !normClass.includes('repeater')) {
      warnings.push(`Unrecognized class level "${classLevel}". Typical values are Class 11, Class 12, or Class 11+12.`);
    }
  }

  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 90 : 100) : Math.max(0, 100 - (errors.length * 35));

  return {
    module: 'curriculum',
    isValid,
    errors,
    warnings,
    score,
    subject: rawSubject,
    chapter: rawChapter,
    resolvedChapter,
    examType: rawExamType,
  };
}
