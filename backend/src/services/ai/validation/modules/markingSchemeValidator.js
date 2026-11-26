/**
 * Module 12: Marks and Negative Marking Validation
 * Validates question scoring configuration:
 * - Positive marks must be > 0 (Standard: 4 marks)
 * - Negative marks must be >= 0 (Standard: 1 mark)
 * - Negative marks must not exceed positive marks
 * - Validates penalty ratio
 */

export function validateMarkingScheme(question = {}) {
  const errors = [];
  const warnings = [];

  const rawMarks = question.marks !== undefined && question.marks !== null ? question.marks : 4;
  const rawNegMarks = question.negative_marks !== undefined && question.negative_marks !== null ? question.negative_marks : 1;

  const marks = Number(rawMarks);
  const negMarks = Number(rawNegMarks);

  if (isNaN(marks) || !Number.isFinite(marks)) {
    errors.push(`Marks value "${rawMarks}" is invalid.`);
  } else if (marks <= 0) {
    errors.push(`Positive marks must be greater than 0. Received: ${marks}.`);
  } else if (marks > 20) {
    warnings.push(`Marks value ${marks} is unusually high for standard competitive entrance questions.`);
  }

  if (isNaN(negMarks) || !Number.isFinite(negMarks)) {
    errors.push(`Negative marks value "${rawNegMarks}" is invalid.`);
  } else if (negMarks < 0) {
    errors.push(`Negative marking penalty cannot be negative (e.g. -${negMarks}). Must be >= 0.`);
  } else if (marks > 0 && negMarks > marks) {
    errors.push(`Negative marking penalty (${negMarks}) cannot exceed total positive marks (${marks}).`);
  }

  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 90 : 100) : 0;

  return {
    module: 'marking_scheme',
    isValid,
    errors,
    warnings,
    score,
    marks: isNaN(marks) ? 4 : marks,
    negativeMarks: isNaN(negMarks) ? 1 : negMarks,
    ratioValid: isValid && marks > 0 ? negMarks <= marks : false,
  };
}
