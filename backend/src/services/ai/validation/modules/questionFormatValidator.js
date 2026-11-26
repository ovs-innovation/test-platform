/**
 * Module 2: Question Format Validation
 * Validates format-specific structural criteria for all 8 supported question formats:
 * 1. Single Correct MCQ
 * 2. Multiple Correct MCQ
 * 3. Assertion-Reason
 * 4. Integer / Numerical
 * 5. Match the Following
 * 6. Passage-based
 * 7. Diagram-based
 * 8. Graph-based
 */

export function normalizeQuestionType(rawType = '') {
  const norm = String(rawType).trim().toLowerCase();
  if (norm.includes('single') || norm === 'single_choice' || norm === 'mcq') return 'single_choice';
  if (norm.includes('multi') || norm === 'multi_select') return 'multi_select';
  if (norm.includes('assertion')) return 'assertion_reason';
  if (norm.includes('integer') || norm.includes('numerical')) return 'numerical';
  if (norm.includes('match')) return 'match_the_following';
  if (norm.includes('passage')) return 'passage';
  if (norm.includes('diagram')) return 'diagram';
  if (norm.includes('graph')) return 'graph';
  return 'single_choice';
}

export function validateQuestionFormat(question = {}) {
  const errors = [];
  const warnings = [];
  const format = normalizeQuestionType(question.question_type);

  const text = String(question.question_text || '').trim();
  if (text.length < 10) {
    errors.push('Question statement is too short (must be at least 10 characters).');
  }

  switch (format) {
    case 'single_choice': {
      // Must have options and a valid correct_index
      if (!Array.isArray(question.options) || question.options.length === 0) {
        errors.push('Single MCQ must have a non-empty options array.');
      } else if (question.options.length !== 4) {
        errors.push(`Single MCQ must have exactly 4 options. Found ${question.options.length}.`);
      }
      if (question.correct_index === undefined || question.correct_index === null) {
        errors.push('Single MCQ must specify "correct_index".');
      }
      break;
    }

    case 'multi_select': {
      // Must have at least 4 options and multiple correct indices
      if (!Array.isArray(question.options) || question.options.length < 4) {
        errors.push('Multiple Correct MCQ must have at least 4 options.');
      }
      const indices = Array.isArray(question.correct_indices) ? question.correct_indices : [];
      if (indices.length === 0) {
        errors.push('Multiple Correct MCQ must specify "correct_indices" with at least one correct option.');
      } else if (indices.length < 2) {
        warnings.push('Multiple Correct MCQ typically has 2 or more correct options.');
      }
      break;
    }

    case 'assertion_reason': {
      // Check for assertion_text and reason_text or assertion/reason in statement
      const hasAssertionField = Boolean(question.assertion_text && String(question.assertion_text).trim());
      const hasReasonField = Boolean(question.reason_text && String(question.reason_text).trim());
      const hasEmbeddedText = /assertion/i.test(text) && /reason/i.test(text);

      if (!hasAssertionField && !hasEmbeddedText) {
        errors.push('Assertion-Reason question must have "assertion_text" or explicit Assertion statement.');
      }
      if (!hasReasonField && !hasEmbeddedText) {
        errors.push('Assertion-Reason question must have "reason_text" or explicit Reason statement.');
      }

      // Check standard 4 answer combinations
      if (Array.isArray(question.options) && question.options.length > 0 && question.options.length !== 4) {
        warnings.push(`Assertion-Reason typically uses standard 4 combination options. Found ${question.options.length}.`);
      }
      break;
    }

    case 'numerical': {
      // Must have numeric_answer, options should be empty or omitted
      if (question.numeric_answer === undefined || question.numeric_answer === null || question.numeric_answer === '') {
        errors.push('Numerical / Integer question must specify a finite "numeric_answer".');
      } else if (isNaN(Number(question.numeric_answer))) {
        errors.push(`Numerical answer "${question.numeric_answer}" is not a valid number.`);
      }

      if (Array.isArray(question.options) && question.options.length > 0) {
        warnings.push('Numerical / Integer question has option choices defined, but student inputs direct value.');
      }

      if (question.numerical_tolerance !== undefined && question.numerical_tolerance !== null) {
        if (Number(question.numerical_tolerance) < 0) {
          errors.push('Numerical tolerance cannot be negative.');
        }
      }
      break;
    }

    case 'match_the_following': {
      // Must have match_pairs with column_a and column_b
      const pairs = question.match_pairs || {};
      const colA = Array.isArray(pairs.column_a) ? pairs.column_a : [];
      const colB = Array.isArray(pairs.column_b) ? pairs.column_b : [];

      if (colA.length === 0 || colB.length === 0) {
        errors.push('Match the Following question must provide items for both Column A and Column B.');
      } else if (colA.length < 2 || colB.length < 2) {
        errors.push('Match the Following must have at least 2 items in each column.');
      }

      // Check correct pair mappings or option choices
      if (!Array.isArray(question.options) || question.options.length === 0) {
        if (!pairs.correct_pairs || Object.keys(pairs.correct_pairs).length === 0) {
          errors.push('Match the Following must provide standard combination options or a correct_pairs mapping.');
        }
      }
      break;
    }

    case 'passage': {
      const passage = String(question.passage_text || '').trim();
      if (!passage && text.length < 100) {
        errors.push('Passage-based question must have "passage_text" or an extensive shared context (>= 100 chars).');
      } else if (passage.length < 50) {
        warnings.push('Passage text is relatively brief for a comprehension question (< 50 chars).');
      }
      break;
    }

    case 'diagram':
    case 'graph': {
      const hasDiagramProp = Boolean(question.has_diagram || question.content_type === 'diagram' || question.content_type === 'graph');
      const hasAsset = Boolean(question.diagram_svg || question.image_url || question.diagram_metadata?.diagram_svg);

      if (!hasDiagramProp && !hasAsset) {
        errors.push(`${format === 'diagram' ? 'Diagram-based' : 'Graph-based'} question requires an associated diagram asset or "has_diagram: true".`);
      }
      break;
    }

    default:
      break;
  }

  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 85 : 100) : Math.max(0, 100 - (errors.length * 30));

  return {
    module: 'question_format',
    detectedFormat: format,
    isValid,
    errors,
    warnings,
    score,
  };
}
