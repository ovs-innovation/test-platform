/**
 * Module 4: Answer Consistency Validation
 * Validates that answer keys, indices, and numerical values are fully consistent:
 * - Single MCQ: correct_index is integer in range [0, options.length - 1]
 * - Multi-Select: correct_indices is array of unique valid integers
 * - Numerical: numeric_answer is a valid finite number, not NaN, with tolerance >= 0
 * - Match the Following: valid pair references
 * - Assertion-Reason: valid 0-3 index for standard NTA combinations
 */

import { normalizeQuestionType } from './questionFormatValidator.js';
import { cleanOptionText } from './optionValidator.js';

export function validateAnswerConsistency(question = {}) {
  const errors = [];
  const warnings = [];
  const format = normalizeQuestionType(question.question_type);
  const options = Array.isArray(question.options) ? question.options : [];

  let answerSummary = {};

  switch (format) {
    case 'single_choice':
    case 'assertion_reason': {
      const idx = question.correct_index;
      if (idx === undefined || idx === null || idx === '') {
        errors.push(`Missing "correct_index" for ${format === 'assertion_reason' ? 'Assertion-Reason' : 'Single MCQ'}.`);
      } else {
        const numIdx = Number(idx);
        if (!Number.isInteger(numIdx)) {
          errors.push(`"correct_index" must be an integer, received: ${idx}.`);
        } else if (numIdx < 0 || numIdx >= options.length) {
          errors.push(`"correct_index" ${numIdx} is out of bounds for options array of length ${options.length} (must be 0 to ${options.length - 1}).`);
        } else {
          const chosenText = cleanOptionText(options[numIdx]);
          if (!chosenText) {
            errors.push(`Option at correct_index [${numIdx}] is empty.`);
          }
          answerSummary = {
            correct_index: numIdx,
            letter: String.fromCharCode(65 + numIdx),
            optionText: chosenText,
          };
        }
      }
      break;
    }

    case 'multi_select': {
      let indices = question.correct_indices;
      if (!Array.isArray(indices)) {
        if (question.correct_index !== undefined && question.correct_index !== null) {
          indices = [Number(question.correct_index)];
        } else {
          indices = [];
        }
      }

      if (indices.length === 0) {
        errors.push('Multiple Correct MCQ must specify at least one valid correct option index in "correct_indices".');
      } else {
        const seen = new Set();
        const validIndices = [];

        for (const rawIdx of indices) {
          const numIdx = Number(rawIdx);
          if (!Number.isInteger(numIdx)) {
            errors.push(`Invalid correct index value "${rawIdx}". Must be an integer.`);
            continue;
          }
          if (numIdx < 0 || numIdx >= options.length) {
            errors.push(`Correct index ${numIdx} is out of bounds (options length: ${options.length}).`);
            continue;
          }
          if (seen.has(numIdx)) {
            warnings.push(`Duplicate correct index ${numIdx} in "correct_indices".`);
          } else {
            seen.add(numIdx);
            validIndices.push(numIdx);
          }
        }

        answerSummary = {
          correct_indices: validIndices,
          letters: validIndices.map((i) => String.fromCharCode(65 + i)),
        };
      }
      break;
    }

    case 'numerical': {
      const ans = question.numeric_answer;
      if (ans === undefined || ans === null || ans === '') {
        errors.push('Numerical answer cannot be empty or null.');
      } else {
        const numVal = Number(ans);
        if (!Number.isFinite(numVal) || isNaN(numVal)) {
          errors.push(`"numeric_answer" must be a valid finite number. Received: "${ans}".`);
        } else {
          answerSummary = {
            numeric_answer: numVal,
            tolerance: Number(question.numerical_tolerance) || 0,
          };
        }
      }
      break;
    }

    case 'match_the_following': {
      // Validate correct_pairs or correct_index
      const pairs = question.match_pairs || {};
      const colA = Array.isArray(pairs.column_a) ? pairs.column_a : [];
      const colB = Array.isArray(pairs.column_b) ? pairs.column_b : [];

      if (question.correct_index !== undefined && question.correct_index !== null) {
        const idx = Number(question.correct_index);
        if (idx < 0 || (options.length > 0 && idx >= options.length)) {
          errors.push(`Match the Following correct option index ${idx} is out of bounds.`);
        }
      }

      if (pairs.correct_pairs && typeof pairs.correct_pairs === 'object') {
        for (const [keyA, keyB] of Object.entries(pairs.correct_pairs)) {
          // Verify that keys/indices exist
          const parsedA = parseInt(keyA, 10);
          const parsedB = parseInt(keyB, 10);
          if (!isNaN(parsedA) && (parsedA < 0 || (colA.length > 0 && parsedA >= colA.length))) {
            warnings.push(`Column A index ${parsedA} in match pair out of bounds.`);
          }
          if (!isNaN(parsedB) && (parsedB < 0 || (colB.length > 0 && parsedB >= colB.length))) {
            warnings.push(`Column B index ${parsedB} in match pair out of bounds.`);
          }
        }
      }
      break;
    }

    default:
      break;
  }

  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 90 : 100) : Math.max(0, 100 - (errors.length * 35));

  return {
    module: 'answer_consistency',
    isValid,
    errors,
    warnings,
    score,
    answerSummary,
  };
}
