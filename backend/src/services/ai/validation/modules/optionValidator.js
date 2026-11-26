/**
 * Module 3: Option Validation
 * Validates option list integrity:
 * - Option count requirements (4 for Single MCQ, >= 4 for Multiple Correct)
 * - Detects duplicate options (exact, normalized, case-insensitive, or stripped LaTeX)
 * - Rejects empty, whitespace-only, or placeholder text ("Option A", "TBD", "N/A", "None")
 * - Ensures options are distinct from the question statement
 */

import { normalizeQuestionType } from './questionFormatValidator.js';

const PLACEHOLDER_OPTION_PATTERNS = [
  /^option\s*[a-d0-9\(\)]*$/i,
  /^choice\s*[a-d0-9\(\)]*$/i,
  /^tbd$/i,
  /^n\/?a$/i,
  /^none$/i,
  /^placeholder$/i,
  /^\[.*?\]$/,
  /^null$/i,
  /^undefined$/i,
];

export function cleanOptionText(opt) {
  if (opt === null || opt === undefined) return '';
  if (typeof opt === 'string') return opt.trim();
  if (typeof opt === 'object' && opt !== null) {
    return String(opt.text || opt.label || opt.value || '').trim();
  }
  return String(opt).trim();
}

export function normalizeOptionForDedupe(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '') // remove latex commands like \text, \frac
    .replace(/[\$\{\}\(\)\^\_\=\+\-\*\/\,\.\s]/g, '') // remove math syntax and punctuation
    .trim();
}

export function validateOptions(question = {}) {
  const errors = [];
  const warnings = [];
  const format = normalizeQuestionType(question.question_type);

  // Numerical/Integer questions do not require options
  if (format === 'numerical') {
    return {
      module: 'options',
      isValid: true,
      errors: [],
      warnings: [],
      score: 100,
      optionCount: 0,
      uniqueCount: 0,
    };
  }

  const rawOptions = Array.isArray(question.options) ? question.options : [];
  const optionCount = rawOptions.length;

  // 1. Check option count based on format
  if (format === 'single_choice' || format === 'assertion_reason') {
    if (optionCount !== 4) {
      errors.push(`Expected exactly 4 options for ${format === 'assertion_reason' ? 'Assertion-Reason' : 'Single MCQ'}, but found ${optionCount}.`);
    }
  } else if (format === 'multi_select') {
    if (optionCount < 4) {
      errors.push(`Multiple Correct MCQ requires at least 4 options. Found ${optionCount}.`);
    }
  } else if (format === 'match_the_following' && optionCount === 0) {
    // If combination options are not given, check match_pairs
    const pairs = question.match_pairs || {};
    if (!pairs.column_a || !pairs.column_b) {
      errors.push('Match the Following question is missing option choices or column data.');
    }
  }

  // 2. Validate individual option texts and check for duplicates / placeholders
  const seenExact = new Set();
  const seenNormalized = new Set();
  const cleanedTexts = [];

  for (let idx = 0; idx < rawOptions.length; idx++) {
    const raw = rawOptions[idx];
    const text = cleanOptionText(raw);
    const label = `Option ${idx + 1} (${String.fromCharCode(65 + idx)})`;

    // Empty check
    if (!text) {
      errors.push(`${label} is empty or blank.`);
      continue;
    }

    // Placeholder check
    for (const pat of PLACEHOLDER_OPTION_PATTERNS) {
      if (pat.test(text)) {
        errors.push(`${label} contains placeholder text "${text}" rather than real scientific content.`);
        break;
      }
    }

    // Exact duplicate check
    if (seenExact.has(text)) {
      errors.push(`Duplicate option found: ${label} has identical text "${text}".`);
    } else {
      seenExact.add(text);
    }

    // Normalized duplicate check (catches e.g. "$4\\text{ m/s}$" vs "4 m/s" or "10" vs "10.0")
    const norm = normalizeOptionForDedupe(text);
    if (norm && seenNormalized.has(norm)) {
      errors.push(`Near-duplicate option detected: ${label} evaluates to substantially identical content as a preceding option.`);
    } else if (norm) {
      seenNormalized.add(norm);
    }

    cleanedTexts.push(text);
  }

  // 3. Option identical to question statement
  const qNorm = normalizeOptionForDedupe(question.question_text || '');
  for (let idx = 0; idx < cleanedTexts.length; idx++) {
    const optNorm = normalizeOptionForDedupe(cleanedTexts[idx]);
    if (optNorm && optNorm.length > 15 && qNorm.includes(optNorm) && optNorm === qNorm) {
      warnings.push(`Option ${idx + 1} appears to repeat the entire question statement.`);
    }
  }

  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 85 : 100) : Math.max(0, 100 - (errors.length * 30));

  return {
    module: 'options',
    isValid,
    errors,
    warnings,
    score,
    optionCount,
    uniqueCount: seenExact.size,
  };
}
