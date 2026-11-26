/**
 * Module 8: Difficulty Validation
 * Validates that difficulty tags ('Easy', 'Medium', 'Hard') correspond coherently
 * to the question's cognitive depth, calculation steps, and formula complexity.
 */

const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

export function estimateCognitiveComplexity(question = {}) {
  const text = String(question.question_text || '');
  const solution = String(question.solution || '');

  let complexityPoints = 0;

  // 1. Formula & Math density
  const mathMatches = text.match(/\$[^$]+\$|\\[a-zA-Z]+/g) || [];
  complexityPoints += Math.min(mathMatches.length * 2, 8);

  // 2. Multistep indicators
  const multiStepKeywords = [
    /\bfirst\b/i,
    /\bthen\b/i,
    /\bsubstitut/i,
    /\bintegrat/i,
    /\bdifferentiat/i,
    /\bsimultaneous/i,
    /\bequation\s*(?:1|2|i|ii)/i,
    /\bratio\s*of\b/i,
    /\bpercentage\s*change\b/i,
    /\bmaximum\b|\bminimum\b/i,
  ];

  for (const kw of multiStepKeywords) {
    if (kw.test(solution) || kw.test(text)) {
      complexityPoints += 2;
    }
  }

  // 3. Question Length
  if (text.length > 250) complexityPoints += 3;
  else if (text.length < 80) complexityPoints -= 2;

  // 4. Solution Length & Step Depth
  if (solution.length > 350) complexityPoints += 3;
  else if (solution.length < 100) complexityPoints -= 2;

  if (complexityPoints <= 4) return 'Easy';
  if (complexityPoints <= 11) return 'Medium';
  return 'Hard';
}

export function validateDifficulty(question = {}) {
  const errors = [];
  const warnings = [];

  const rawDiff = String(question.difficulty || '').trim();
  if (!rawDiff) {
    warnings.push('Question is missing difficulty tag; defaulting to Medium.');
  } else {
    const norm = rawDiff.toLowerCase();
    if (!VALID_DIFFICULTIES.includes(norm)) {
      errors.push(`Invalid difficulty "${rawDiff}". Supported difficulty levels: Easy, Medium, Hard.`);
    }
  }

  // Estimate cognitive complexity
  const estimatedComplexity = estimateCognitiveComplexity(question);
  const statedNorm = rawDiff.toLowerCase();

  if (statedNorm === 'easy' && estimatedComplexity === 'Hard') {
    warnings.push('Question is tagged "Easy" but contains multiple calculation steps and complex formulas typically characteristic of "Hard" problems.');
  } else if (statedNorm === 'hard' && estimatedComplexity === 'Easy') {
    warnings.push('Question is tagged "Hard" but appears to be a direct single-step factual recall question.');
  }

  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 85 : 100) : 40;

  return {
    module: 'difficulty',
    isValid,
    errors,
    warnings,
    score,
    statedDifficulty: rawDiff || 'Medium',
    estimatedComplexity,
  };
}
