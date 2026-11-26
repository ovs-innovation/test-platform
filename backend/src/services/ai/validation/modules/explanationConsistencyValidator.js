/**
 * Module 5: Explanation Consistency Validation
 * Validates that the provided solution / explanation:
 * - Is non-trivial, pedagogically useful, and substantive (> 20 chars)
 * - Concludes with or references the actual designated correct answer
 * - Does not contradict the assigned answer key (e.g. key says Option A, but explanation concludes Option C)
 * - Verifies mathematical derivations conclude with the correct value
 */

import { normalizeQuestionType } from './questionFormatValidator.js';
import { cleanOptionText } from './optionValidator.js';

export function validateExplanationConsistency(question = {}) {
  const errors = [];
  const warnings = [];
  const format = normalizeQuestionType(question.question_type);
  const solution = String(question.solution || '').trim();

  // 1. Length & Substantive Content Check
  if (!solution) {
    errors.push('Explanation / solution cannot be empty.');
    return {
      module: 'explanation_consistency',
      isValid: false,
      errors,
      warnings,
      score: 0,
      mentionsCorrectOption: false,
      mathConsistent: false,
    };
  }

  if (solution.length < 20) {
    errors.push(`Explanation is too brief (${solution.length} chars). Detailed step-by-step reasoning is required.`);
  } else if (solution.length < 50) {
    warnings.push('Explanation is relatively short. Consider expanding the step-by-step derivation.');
  }

  let mentionsCorrectOption = false;
  let mathConsistent = true;

  // 2. Cross-check for Single MCQ / Option-based
  if (format === 'single_choice' || format === 'assertion_reason') {
    const idx = question.correct_index;
    if (idx !== undefined && idx !== null && Array.isArray(question.options)) {
      const expectedLetter = String.fromCharCode(65 + Number(idx)); // A, B, C, D
      const chosenOptionText = cleanOptionText(question.options[idx]);

      // Check if explanation references ANY option letter
      const optionLetterMatches = [
        ...solution.matchAll(/\b(?:option|choice|answer|ans)\s*[:=]?\s*[\(\[]?([A-D])[\)\]]?/gi),
        ...solution.matchAll(/\b([A-D])\s*(?:is\s*(?:the\s*)?(?:correct|right|true))\b/gi),
        ...solution.matchAll(/hence[,\s]+(?:option\s*)?[\(\[]?([A-D])[\)\]]?/gi),
      ];

      const foundLetters = new Set();
      for (const m of optionLetterMatches) {
        if (m[1]) foundLetters.add(m[1].toUpperCase());
      }

      if (foundLetters.size > 0) {
        if (foundLetters.has(expectedLetter)) {
          mentionsCorrectOption = true;
        } else {
          // Explanation concluded with a DIFFERENT letter!
          const conflicting = Array.from(foundLetters).join(', ');
          errors.push(
            `Answer discrepancy: Answer key specifies Option (${expectedLetter}), but the explanation concludes that Option (${conflicting}) is correct.`
          );
        }
      } else {
        // If no explicit letter mentioned, check if the chosen option text appears in solution
        if (chosenOptionText && chosenOptionText.length > 2) {
          const normOpt = chosenOptionText.toLowerCase().replace(/[^a-z0-9]/g, '');
          const normSol = solution.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (normSol.includes(normOpt)) {
            mentionsCorrectOption = true;
          }
        }
      }
    }
  }

  // 3. Cross-check for Numerical / Integer format
  if (format === 'numerical') {
    const expectedNum = Number(question.numeric_answer);
    if (!isNaN(expectedNum)) {
      // Look for the numerical answer inside the solution text
      const regexNum = new RegExp(`\\b${escapeRegExp(String(expectedNum))}\\b`);
      const hasNumber = regexNum.test(solution);

      if (!hasNumber) {
        // Check with floating-point tolerance e.g. 10 vs 10.0
        const floatMatches = solution.match(/-?\d+(?:\.\d+)?/g);
        let foundApprox = false;
        if (floatMatches) {
          const tol = Math.max(0.01, Number(question.numerical_tolerance) || 0.05);
          for (const rawFloat of floatMatches) {
            const num = parseFloat(rawFloat);
            if (Math.abs(num - expectedNum) <= tol) {
              foundApprox = true;
              break;
            }
          }
        }
        if (!foundApprox) {
          warnings.push(
            `Numerical answer "${expectedNum}" does not clearly appear in the final calculation step of the explanation.`
          );
          mathConsistent = false;
        }
      }
    }
  }

  // 4. Score calculation
  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 85 : 100) : Math.max(0, 100 - (errors.length * 35));

  return {
    module: 'explanation_consistency',
    isValid,
    errors,
    warnings,
    score,
    mentionsCorrectOption,
    mathConsistent,
  };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
