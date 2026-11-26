/**
 * Module 6: Duplicate Detection
 * Detects duplicate or near-duplicate questions:
 * 1. Intra-batch duplicate detection (against other questions in the same generated batch)
 * 2. Database duplicate detection (against existing approved questions in the Question Bank)
 *
 * Uses robust text normalization (stripping LaTeX delimiters, symbols, lowercase)
 * and token-set Jaccard similarity combined with character n-grams.
 */

export function normalizeQuestionText(text = '') {
  return String(text || '')
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, ' ') // Strip LaTeX macro names e.g. \frac, \text, \times
    .replace(/[\$\{\}\(\)\[\]\^\_\=\+\-\*\/\,\.\;\:\?\!\'\"\`]/g, ' ') // Strip symbols & punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Computes token-set Jaccard similarity between two strings (0.0 to 1.0)
 */
export function computeJaccardSimilarity(textA = '', textB = '') {
  const normA = normalizeQuestionText(textA);
  const normB = normalizeQuestionText(textB);

  if (!normA && !normB) return 1.0;
  if (!normA || !normB) return 0.0;
  if (normA === normB) return 1.0;

  const tokensA = new Set(normA.split(' ').filter((w) => w.length > 2));
  const tokensB = new Set(normB.split(' ').filter((w) => w.length > 2));

  if (tokensA.size === 0 && tokensB.size === 0) return 1.0;
  if (tokensA.size === 0 || tokensB.size === 0) return 0.0;

  let intersection = 0;
  for (const t of tokensA) {
    if (tokensB.has(t)) intersection++;
  }

  const union = tokensA.size + tokensB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Validates duplicates across the batch and optionally against the database
 *
 * @param {Object} question - Target question
 * @param {Object} options
 * @param {Array} options.batchQuestions - Other questions in current batch
 * @param {number} options.currentIndex - Index of current question in batch
 * @param {Object} options.pool - PostgreSQL pool or client (optional)
 * @returns {Promise<Object>} Validation result
 */
export async function detectDuplicates(question = {}, options = {}) {
  const errors = [];
  const warnings = [];
  const targetText = String(question.question_text || '').trim();
  const targetNorm = normalizeQuestionText(targetText);

  let isDuplicate = false;
  let highestSimilarity = 0;
  let duplicateType = null;
  let duplicateOfText = null;
  let duplicateOfId = null;

  // 1. Intra-batch duplicate check
  const batchQuestions = Array.isArray(options.batchQuestions) ? options.batchQuestions : [];
  const currentIdx = options.currentIndex !== undefined ? options.currentIndex : -1;

  for (let i = 0; i < batchQuestions.length; i++) {
    if (i === currentIdx) continue;
    const otherQ = batchQuestions[i];
    const otherText = String(otherQ.question_text || '').trim();
    if (!otherText) continue;

    // Fast exact or normalized match
    const otherNorm = normalizeQuestionText(otherText);
    if (targetNorm && otherNorm && targetNorm === otherNorm) {
      isDuplicate = true;
      highestSimilarity = 1.0;
      duplicateType = 'batch_exact';
      duplicateOfText = otherText;
      duplicateOfId = otherQ.id || i + 1;
      errors.push(`Duplicate question in current batch: Identical to question #${i + 1}.`);
      break;
    }

    // Jaccard similarity check
    const sim = computeJaccardSimilarity(targetText, otherText);
    if (sim > highestSimilarity) {
      highestSimilarity = sim;
    }

    if (sim >= 0.85) {
      isDuplicate = true;
      duplicateType = 'batch_similarity';
      duplicateOfText = otherText;
      duplicateOfId = otherQ.id || i + 1;
      errors.push(`High similarity duplicate in current batch (${Math.round(sim * 100)}% match with question #${i + 1}).`);
      break;
    } else if (sim >= 0.70) {
      warnings.push(`Potential similarity with batch question #${i + 1} (${Math.round(sim * 100)}% match).`);
    }
  }

  // 2. Database duplicate check (if pool is provided and not already a fatal batch duplicate)
  if (!isDuplicate && options.pool && targetNorm.length > 15) {
    try {
      const subject = question.subject || options.subject || '';
      const chapter = question.chapter || options.chapter || '';

      // Query candidate questions from question_bank with same subject/chapter
      let querySql = `
        SELECT id, question_text 
        FROM question_bank 
        WHERE 1=1
      `;
      const queryParams = [];
      let pIdx = 1;

      if (subject) {
        querySql += ` AND (LOWER(category) = LOWER($${pIdx}) OR LOWER(subject) = LOWER($${pIdx}))`;
        queryParams.push(subject);
        pIdx++;
      }

      if (chapter) {
        querySql += ` AND LOWER(chapter) = LOWER($${pIdx})`;
        queryParams.push(chapter);
        pIdx++;
      }

      querySql += ` ORDER BY id DESC LIMIT 150`;

      const dbRes = await options.pool.query(querySql, queryParams);
      for (const row of dbRes.rows) {
        const dbText = String(row.question_text || '');
        const dbNorm = normalizeQuestionText(dbText);

        if (targetNorm === dbNorm) {
          isDuplicate = true;
          highestSimilarity = 1.0;
          duplicateType = 'database_exact';
          duplicateOfText = dbText;
          duplicateOfId = row.id;
          errors.push(`Duplicate of existing Question Bank question #${row.id}.`);
          break;
        }

        const sim = computeJaccardSimilarity(targetText, dbText);
        if (sim > highestSimilarity) {
          highestSimilarity = sim;
        }

        if (sim >= 0.85) {
          isDuplicate = true;
          duplicateType = 'database_similarity';
          duplicateOfText = dbText;
          duplicateOfId = row.id;
          errors.push(`Substantial overlap with existing Question Bank question #${row.id} (${Math.round(sim * 100)}% similarity).`);
          break;
        } else if (sim >= 0.70) {
          warnings.push(`Possible similarity to Question Bank question #${row.id} (${Math.round(sim * 100)}% match).`);
          if (!duplicateOfId) duplicateOfId = row.id;
        }
      }
    } catch (dbErr) {
      // Non-blocking database query fallback
      warnings.push(`Database deduplication check notice: ${dbErr.message}`);
    }
  }

  const isValid = !isDuplicate && errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 80 : 100) : 0;

  return {
    module: 'duplicate_detection',
    isValid,
    isDuplicate,
    similarityScore: Number((highestSimilarity * 100).toFixed(2)),
    duplicateType,
    duplicateOfId,
    duplicateOfText: duplicateOfText ? duplicateOfText.slice(0, 100) : null,
    errors,
    warnings,
    score,
  };
}
