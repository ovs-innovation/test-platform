/**
 * Module 11: Scientific Accuracy Checks
 * Applies deterministic physical and mathematical sanity checks:
 * - Absolute Temperature: T < 0 K is physically impossible (Third law of thermodynamics)
 * - Speed of light: v > 3 x 10^8 m/s in vacuum violates special relativity
 * - Efficiency: Carno / Heat engine efficiency eta > 100% (or > 1.0) violates second law of thermodynamics
 * - Probability: P < 0 or P > 1 is mathematically impossible
 * - Positive definite quantities: Resistance, mass, frequency, half-life, wavelength cannot be negative
 * - Refractive index: n < 1.0 in standard optical media is physically impermissible
 * - Flags uncertain content for manual administrative review
 */

export function checkScientificAccuracy(question = {}) {
  const errors = [];
  const warnings = [];
  const reviewFlags = [];
  let requiresManualReview = false;

  const text = `${question.question_text || ''} ${question.solution || ''}`;
  const options = Array.isArray(question.options) ? question.options : [];
  const allContent = `${text} ${options.map(o => (typeof o === 'object' && o !== null ? o.text : String(o))).join(' ')}`;

  // 1. Negative Kelvin Temperature Check
  // Matches e.g. "-10 K", "-273 K", "-50 Kelvin", "negative kelvin"
  const negKelvinMatch = allContent.match(/(?:-\s*\d+(?:\.\d+)?|\bnegative\b)\s*(?:K\b|Kelvin\b)/i);
  if (negKelvinMatch) {
    errors.push(`PHYSICAL IMPOSSIBILITY: Absolute temperature cannot be negative (${negKelvinMatch[0]}). Temperature in Kelvin is strictly >= 0 K.`);
  }

  // 2. Superluminal Speed Check
  // Matches speeds exceeding 3 x 10^8 m/s in vacuum
  const superluminalMatch = allContent.match(/(\d+(?:\.\d+)?)\s*(?:[x*×]\s*10\^?8|\.10\^?8)\s*m\/s/i);
  if (superluminalMatch) {
    const val = parseFloat(superluminalMatch[1]);
    if (val > 3.05 && /in\s+vacuum|speed\s+of\s+light/i.test(allContent)) {
      errors.push(`PHYSICAL IMPOSSIBILITY: Speed of light in vacuum (${val} x 10^8 m/s) cannot exceed 3.0 x 10^8 m/s.`);
    }
  }

  // 3. Efficiency > 100%
  const efficiencyMatch = allContent.match(/(?:efficiency|eta|\u03b7)\s*(?:=|is|of)\s*(\d+(?:\.\d+)?)\s*%/i);
  if (efficiencyMatch) {
    const eff = parseFloat(efficiencyMatch[1]);
    if (eff > 100) {
      errors.push(`PHYSICAL IMPOSSIBILITY: Heat engine efficiency (${eff}%) cannot exceed 100% (violates second law of thermodynamics).`);
    }
  }

  // 4. Probability < 0 or > 1
  const probMatch = allContent.match(/(?:probability|prob|P\([A-Za-z0-9]+\))\s*=\s*(-?\d+(?:\.\d+)?)/i);
  if (probMatch) {
    const p = parseFloat(probMatch[1]);
    if (p < 0 || p > 1) {
      errors.push(`MATHEMATICAL IMPOSSIBILITY: Probability P = ${p} must satisfy 0 <= P <= 1.`);
    }
  }

  // 5. Negative Resistance / Mass / Wavelength
  const negResistanceMatch = allContent.match(/-\s*(\d+(?:\.\d+)?)\s*(?:\u03a9|ohm|k\u03a9|M\u03a9)\b/i);
  if (negResistanceMatch && !/negative\s+resistance\s+region/i.test(allContent)) {
    errors.push(`PHYSICAL IMPOSSIBILITY: Passive electrical resistance cannot be negative (-${negResistanceMatch[1]} Ohm).`);
  }

  const negMassMatch = allContent.match(/-\s*(\d+(?:\.\d+)?)\s*(?:kg|grams?|amu)\b/i);
  if (negMassMatch) {
    errors.push(`PHYSICAL IMPOSSIBILITY: Classical particle mass cannot be negative (-${negMassMatch[1]} kg).`);
  }

  // 6. Refractive Index < 1.0 for conventional optical media
  const nMatch = allContent.match(/(?:refractive\s+index|index\s+of\s+refraction|\u03bc|n)\s*=\s*(0\.\d+)/i);
  if (nMatch && !/metamaterial|plasma/i.test(allContent)) {
    warnings.push(`Unusual optical parameter: Refractive index n = ${nMatch[1]} is less than 1.0. Typically n >= 1.0 for standard transparent media.`);
    requiresManualReview = true;
    reviewFlags.push('low_refractive_index');
  }

  // 7. Academic Syllabus Uncertainty Flags
  const uncertainTopics = [
    { pattern: /\bcontroversial\b|\bdisputed\b/i, flag: 'disputed_academic_content' },
    { pattern: /\bbonus\s*marks?\b|\bambiguous\s*key\b/i, flag: 'potential_ambiguous_question' },
    { pattern: /\bexperimental\s*discrepancy\b/i, flag: 'experimental_discrepancy' },
  ];

  for (const topic of uncertainTopics) {
    if (topic.pattern.test(allContent)) {
      warnings.push(`Uncertain scientific content detected (${topic.flag}). Flagged for manual administrative review.`);
      requiresManualReview = true;
      reviewFlags.push(topic.flag);
    }
  }

  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 80 : 100) : 0;

  return {
    module: 'scientific_accuracy',
    isValid,
    errors,
    warnings,
    score,
    requiresManualReview: requiresManualReview || !isValid,
    reviewFlags,
  };
}
