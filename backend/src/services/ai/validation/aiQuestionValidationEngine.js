/**
 * Central AI Question Validation Engine
 * Orchestrates all 12 validation modules:
 * 1. JSON schema validation
 * 2. Question format validation
 * 3. Option validation
 * 4. Answer consistency validation
 * 5. Explanation consistency validation
 * 6. Duplicate detection (batch & database)
 * 7. Subject and chapter validation
 * 8. Difficulty validation
 * 9. Diagram marker validation
 * 10. Diagram/question consistency validation
 * 11. Scientific accuracy checks
 * 12. Marks and negative marking validation
 *
 * Implements deterministic status transitions:
 * - 'generated' -> initial raw AI payload
 * - 'validation_pending' -> queued for validation
 * - 'validation_passed' -> all technical & consistency checks passed
 * - 'needs_correction' -> technical or formatting errors that require adjustment
 * - 'rejected' -> fatal duplicates, impossible physics, or unfixable formats
 * - 'approved' -> manual human administrative approval (NEVER auto-approved)
 */

import { validateJsonSchema } from './modules/jsonSchemaValidator.js';
import { validateQuestionFormat } from './modules/questionFormatValidator.js';
import { validateOptions } from './modules/optionValidator.js';
import { validateAnswerConsistency } from './modules/answerConsistencyValidator.js';
import { validateExplanationConsistency } from './modules/explanationConsistencyValidator.js';
import { detectDuplicates, normalizeQuestionText } from './modules/duplicateDetector.js';
import { validateCurriculum } from './modules/curriculumValidator.js';
import { validateDifficulty } from './modules/difficultyValidator.js';
import { validateDiagramMarkers } from './modules/diagramMarkerValidator.js';
import { validateDiagramQuestionConsistency } from './modules/diagramQuestionConsistencyValidator.js';
import { checkScientificAccuracy } from './modules/scientificAccuracyChecker.js';
import { validateMarkingScheme } from './modules/markingSchemeValidator.js';

export const QUESTION_STATUSES = {
  GENERATED: 'generated',
  VALIDATION_PENDING: 'validation_pending',
  VALIDATION_PASSED: 'validation_passed',
  NEEDS_CORRECTION: 'needs_correction',
  REJECTED: 'rejected',
  APPROVED: 'approved',
};

// Module weight distribution for composite validation score (total = 100)
const MODULE_WEIGHTS = {
  json_schema: 0.10,
  question_format: 0.15,
  options: 0.15,
  answer_consistency: 0.15,
  explanation_consistency: 0.10,
  duplicate_detection: 0.10,
  curriculum: 0.05,
  difficulty: 0.05,
  diagram_markers: 0.05,
  diagram_consistency: 0.05,
  scientific_accuracy: 0.05,
  marking_scheme: 0.05,
};

export class AiQuestionValidationEngine {
  /**
   * Validates a single question against all 12 modules
   *
   * @param {Object} question - The question payload
   * @param {Object} [options]
   * @param {Array} [options.batchQuestions] - All questions in the current batch for deduplication
   * @param {number} [options.currentIndex] - Index of current question in batch
   * @param {Object} [options.pool] - Database pool for checking existing bank questions
   * @param {string} [options.subject] - Fallback subject
   * @param {string} [options.chapter] - Fallback chapter
   * @param {string} [options.examType] - Fallback exam type (NEET / JEE)
   * @returns {Promise<Object>} Full validation result
   */
  static async validateQuestion(question = {}, options = {}) {
    const allErrors = [];
    const allWarnings = [];
    const reviewReasons = [];
    let requiresManualReview = false;

    // 1. JSON Schema Validation
    const m1 = validateJsonSchema(question);
    if (!m1.isValid) allErrors.push(...m1.errors);
    allWarnings.push(...m1.warnings);

    // 2. Question Format Validation
    const m2 = validateQuestionFormat(question);
    if (!m2.isValid) allErrors.push(...m2.errors);
    allWarnings.push(...m2.warnings);

    // 3. Option Validation
    const m3 = validateOptions(question);
    if (!m3.isValid) allErrors.push(...m3.errors);
    allWarnings.push(...m3.warnings);

    // 4. Answer Consistency Validation
    const m4 = validateAnswerConsistency(question);
    if (!m4.isValid) allErrors.push(...m4.errors);
    allWarnings.push(...m4.warnings);

    // 5. Explanation Consistency Validation
    const m5 = validateExplanationConsistency(question);
    if (!m5.isValid) allErrors.push(...m5.errors);
    allWarnings.push(...m5.warnings);

    // 6. Duplicate Detection
    const m6 = await detectDuplicates(question, options);
    if (!m6.isValid) allErrors.push(...m6.errors);
    allWarnings.push(...m6.warnings);
    if (m6.similarityScore >= 70 && m6.similarityScore < 85) {
      requiresManualReview = true;
      reviewReasons.push(`Potential question similarity (${m6.similarityScore}%)`);
    }

    // 7. Subject and Chapter Validation
    const m7 = validateCurriculum(question, options);
    if (!m7.isValid) allErrors.push(...m7.errors);
    allWarnings.push(...m7.warnings);

    // 8. Difficulty Validation
    const m8 = validateDifficulty(question);
    if (!m8.isValid) allErrors.push(...m8.errors);
    allWarnings.push(...m8.warnings);

    // 9. Diagram Marker Validation
    const m9 = validateDiagramMarkers(question, options);
    if (!m9.isValid) allErrors.push(...m9.errors);
    allWarnings.push(...m9.warnings);

    // 10. Diagram/Question Consistency Validation
    const m10 = validateDiagramQuestionConsistency(question);
    if (!m10.isValid) allErrors.push(...m10.errors);
    allWarnings.push(...m10.warnings);

    // 11. Scientific Accuracy Checks
    const m11 = checkScientificAccuracy(question);
    if (!m11.isValid) allErrors.push(...m11.errors);
    allWarnings.push(...m11.warnings);
    if (m11.requiresManualReview) {
      requiresManualReview = true;
      reviewReasons.push(...(m11.reviewFlags || ['scientific_uncertainty']));
    }

    // 12. Marks and Negative Marking Validation
    const m12 = validateMarkingScheme(question);
    if (!m12.isValid) allErrors.push(...m12.errors);
    allWarnings.push(...m12.warnings);

    // Composite Score Calculation
    let compositeScore = 0;
    const modules = {
      json_schema: m1,
      question_format: m2,
      options: m3,
      answer_consistency: m4,
      explanation_consistency: m5,
      duplicate_detection: m6,
      curriculum: m7,
      difficulty: m8,
      diagram_markers: m9,
      diagram_consistency: m10,
      scientific_accuracy: m11,
      marking_scheme: m12,
    };

    for (const [modKey, modResult] of Object.entries(modules)) {
      const weight = MODULE_WEIGHTS[modKey] || 0.05;
      compositeScore += (modResult.score || 0) * weight;
    }
    compositeScore = Math.round(Math.max(0, Math.min(100, compositeScore)));

    // Determine Final Validation Status
    let status = QUESTION_STATUSES.VALIDATION_PASSED;

    if (m6.isDuplicate || !m9.noAnswerLeaks) {
      // Duplicates or leaked answers in question diagram are fatal -> rejected
      status = QUESTION_STATUSES.REJECTED;
    } else if (allErrors.length > 0) {
      // Fixable format/option/marking errors -> needs_correction
      status = QUESTION_STATUSES.NEEDS_CORRECTION;
    } else {
      // Passed technical validation
      status = QUESTION_STATUSES.VALIDATION_PASSED;
    }

    if (allWarnings.length > 0 || reviewReasons.length > 0) {
      requiresManualReview = true;
    }

    const normalizedSignature = normalizeQuestionText(question.question_text || '').slice(0, 200);

    return {
      isValid: allErrors.length === 0,
      status,
      score: compositeScore,
      requiresManualReview,
      manualReviewReasons: reviewReasons,
      errors: allErrors,
      warnings: allWarnings,
      isDuplicate: m6.isDuplicate,
      duplicateType: m6.duplicateType,
      duplicateOfId: m6.duplicateOfId,
      similarityScore: m6.similarityScore,
      normalizedSignature,
      modules,
    };
  }

  /**
   * Validates an entire batch of questions, computing cross-question metrics
   *
   * @param {Array<Object>} questions - List of questions in batch
   * @param {Object} [options] - Context options (subject, chapter, pool)
   * @returns {Promise<Object>} Batch validation summary and per-question reports
   */
  static async validateBatch(questions = [], options = {}) {
    if (!Array.isArray(questions) || questions.length === 0) {
      return {
        total: 0,
        passedCount: 0,
        needsCorrectionCount: 0,
        rejectedCount: 0,
        manualReviewCount: 0,
        averageScore: 0,
        results: [],
      };
    }

    const results = [];
    let passedCount = 0;
    let needsCorrectionCount = 0;
    let rejectedCount = 0;
    let manualReviewCount = 0;
    let totalScore = 0;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const res = await this.validateQuestion(q, {
        ...options,
        batchQuestions: questions,
        currentIndex: i,
      });

      results.push(res);
      totalScore += res.score;

      if (res.status === QUESTION_STATUSES.VALIDATION_PASSED) passedCount++;
      else if (res.status === QUESTION_STATUSES.NEEDS_CORRECTION) needsCorrectionCount++;
      else if (res.status === QUESTION_STATUSES.REJECTED) rejectedCount++;

      if (res.requiresManualReview) manualReviewCount++;
    }

    const averageScore = Math.round(totalScore / questions.length);

    return {
      total: questions.length,
      passedCount,
      needsCorrectionCount,
      rejectedCount,
      manualReviewCount,
      averageScore,
      results,
    };
  }
}
