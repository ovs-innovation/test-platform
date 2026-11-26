/**
 * Module 1: JSON Schema Validation
 * Validates fundamental object structure, required fields, and primitive data types.
 */

const VALID_QUESTION_TYPES = [
  'single_choice',
  'single mcq',
  'single correct mcq',
  'multi_select',
  'multiple correct',
  'multiple correct mcq',
  'assertion_reason',
  'assertion-reason',
  'numerical',
  'integer',
  'match_the_following',
  'match the following',
  'passage',
  'passage-based',
  'diagram',
  'diagram-based',
  'graph',
  'graph-based',
];

export function validateJsonSchema(question = {}) {
  const errors = [];
  const warnings = [];

  if (!question || typeof question !== 'object' || Array.isArray(question)) {
    return {
      isValid: false,
      errors: ['Question must be a valid JSON object.'],
      warnings: [],
      score: 0,
    };
  }

  // 1. Required core fields
  if (!question.question_text || typeof question.question_text !== 'string' || !question.question_text.trim()) {
    errors.push('Missing or empty required field "question_text".');
  }

  if (!question.question_type || typeof question.question_type !== 'string' || !question.question_type.trim()) {
    errors.push('Missing or empty required field "question_type".');
  } else {
    const normType = question.question_type.trim().toLowerCase();
    if (!VALID_QUESTION_TYPES.includes(normType)) {
      errors.push(`Invalid question_type "${question.question_type}". Supported types: Single MCQ, Multiple Correct, Assertion-Reason, Numerical/Integer, Match the Following, Passage-based, Diagram-based, Graph-based.`);
    }
  }

  if (!question.solution || typeof question.solution !== 'string' || !question.solution.trim()) {
    errors.push('Missing or empty required field "solution" (explanation).');
  }

  // 2. Metadata field types
  if (question.subject && typeof question.subject !== 'string') {
    errors.push('Field "subject" must be a string.');
  }

  if (question.chapter && typeof question.chapter !== 'string') {
    errors.push('Field "chapter" must be a string.');
  }

  if (question.topic && typeof question.topic !== 'string') {
    errors.push('Field "topic" must be a string.');
  }

  if (question.difficulty && typeof question.difficulty !== 'string') {
    errors.push('Field "difficulty" must be a string.');
  }

  // 3. Score calculation
  const isValid = errors.length === 0;
  const score = isValid ? 100 : Math.max(0, 100 - (errors.length * 25));

  return {
    module: 'json_schema',
    isValid,
    errors,
    warnings,
    score,
  };
}
