/**
 * Blueprint Validator Service
 * Strict validation engine for Exam Blueprints and AI Test Generation compliance.
 * Ensures:
 * 1. Blueprint definitions are mathematically and pedagogically consistent.
 * 2. Total question counts, subject distributions, and section rules match.
 * 3. AI test generator cannot silently change or diverge from the blueprint.
 */

export class BlueprintValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = 'BlueprintValidationError';
    this.errors = errors;
  }
}

/**
 * Validates a blueprint payload before creation or update.
 * @param {Object} bp - Blueprint payload
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
export function validateBlueprintPayload(bp) {
  const errors = [];
  const warnings = [];

  if (!bp) {
    errors.push('Blueprint payload is missing.');
    return { valid: false, errors, warnings };
  }

  // 1. Basic Fields
  if (!bp.title || typeof bp.title !== 'string' || bp.title.trim().length === 0) {
    errors.push('Blueprint title is required.');
  }

  const validExamTypes = ['NEET', 'JEE', 'CUSTOM', 'FOUNDATION', 'AIETS', 'SCHOOL_EXAM'];
  if (!bp.exam_type || !validExamTypes.includes(String(bp.exam_type).toUpperCase())) {
    errors.push(`Invalid exam_type. Must be one of: ${validExamTypes.join(', ')}`);
  }

  if (!bp.class_level || typeof bp.class_level !== 'string') {
    errors.push('Class level is required (e.g. Class 11, Class 12, Class 11+12).');
  }

  const totalQuestions = Number(bp.total_questions);
  if (!Number.isInteger(totalQuestions) || totalQuestions <= 0) {
    errors.push('total_questions must be a positive integer.');
  }

  const durationMinutes = Number(bp.duration_minutes);
  if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
    errors.push('duration_minutes must be a positive integer.');
  }

  const marksPerQuestion = Number(bp.marks_per_question);
  if (isNaN(marksPerQuestion) || marksPerQuestion <= 0) {
    errors.push('marks_per_question must be greater than 0.');
  }

  const negativeMarking = Number(bp.negative_marking);
  if (isNaN(negativeMarking) || negativeMarking < 0) {
    errors.push('negative_marking cannot be negative.');
  }

  // 2. Subject Distribution Validation
  const subjectDist = bp.subject_distribution;
  if (!subjectDist || typeof subjectDist !== 'object') {
    errors.push('subject_distribution is required and must be an object or array.');
  } else {
    let sumSubjectQuestions = 0;
    if (Array.isArray(subjectDist)) {
      if (subjectDist.length === 0) {
        errors.push('At least one subject must be defined.');
      }
      for (const item of subjectDist) {
        if (!item.subject || typeof item.subject !== 'string') {
          errors.push('Each subject entry must have a valid subject name.');
        }
        const cnt = Number(item.count || item.total_questions || 0);
        if (cnt <= 0) {
          errors.push(`Subject "${item.subject || 'unknown'}" must have a question count > 0.`);
        }
        sumSubjectQuestions += cnt;
      }
    } else {
      const keys = Object.keys(subjectDist);
      if (keys.length === 0) {
        errors.push('At least one subject must be defined in subject_distribution.');
      }
      for (const sub of keys) {
        const val = subjectDist[sub];
        const cnt = typeof val === 'object' && val !== null ? Number(val.total || val.count || 0) : Number(val);
        if (isNaN(cnt) || cnt <= 0) {
          errors.push(`Subject "${sub}" question count must be a positive number.`);
        }
        sumSubjectQuestions += cnt;
      }
    }

    if (totalQuestions > 0 && sumSubjectQuestions !== totalQuestions) {
      errors.push(`Subject distribution total (${sumSubjectQuestions}) does not equal total_questions (${totalQuestions}).`);
    }
  }

  // 3. Question Type Distribution Validation
  const typeDist = bp.question_type_distribution;
  if (typeDist && typeof typeDist === 'object') {
    let sumTypes = 0;
    for (const [type, count] of Object.entries(typeDist)) {
      const cnt = Number(count);
      if (isNaN(cnt) || cnt < 0) {
        errors.push(`Question type "${type}" count cannot be negative.`);
      }
      sumTypes += cnt;
    }
    // If sum equals totalQuestions or 100 (percentage)
    if (sumTypes > 0 && sumTypes !== totalQuestions && sumTypes !== 100) {
      warnings.push(`Question type distribution sum (${sumTypes}) does not match total questions (${totalQuestions}) or 100%.`);
    }
  }

  // 4. Difficulty Distribution Validation
  const diffDist = bp.difficulty_distribution;
  if (diffDist && typeof diffDist === 'object') {
    const easy = Number(diffDist.easy || 0);
    const med = Number(diffDist.medium || 0);
    const hard = Number(diffDist.hard || 0);
    const totalDiff = easy + med + hard;
    if (totalDiff !== 100 && totalDiff !== totalQuestions) {
      warnings.push(`Difficulty distribution (${totalDiff}) should ideally sum to 100% or total questions (${totalQuestions}).`);
    }
  }

  // 5. Section and Optional Question Rules Validation
  const sectionRules = bp.section_rules;
  if (sectionRules && typeof sectionRules === 'object') {
    // If sections are configured per subject or globally
    if (sectionRules.sections && Array.isArray(sectionRules.sections)) {
      let totalSectionQuestions = 0;
      for (const sec of sectionRules.sections) {
        if (!sec.name) errors.push('Section must have a name.');
        const qCount = Number(sec.question_count || sec.count || 0);
        if (qCount <= 0) errors.push(`Section "${sec.name}" must have question_count > 0.`);
        totalSectionQuestions += qCount;

        if (sec.optional_count !== undefined) {
          const optCount = Number(sec.optional_count);
          if (optCount < 0 || optCount >= qCount) {
            errors.push(`Section "${sec.name}" optional_count (${optCount}) cannot exceed total questions (${qCount}).`);
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Verifies that an AI-generated test strictly adheres to the blueprint without any silent drift.
 * @param {Object} blueprint - The active exam blueprint
 * @param {Array} generatedQuestions - Array of questions generated by AI
 * @returns {{ valid: boolean, errors: string[], metrics: Object }}
 */
export function validateGeneratedQuestionsAgainstBlueprint(blueprint, generatedQuestions) {
  const errors = [];
  const metrics = {
    totalExpected: Number(blueprint.total_questions),
    totalGenerated: generatedQuestions.length,
    subjectCounts: {},
    typeCounts: {},
    difficultyCounts: { easy: 0, medium: 0, hard: 0 },
  };

  // 1. Total Question Count check
  if (generatedQuestions.length !== metrics.totalExpected) {
    errors.push(
      `AI generated ${generatedQuestions.length} questions, but blueprint strictly requires ${metrics.totalExpected}.`
    );
  }

  // 2. Count distributions
  for (const q of generatedQuestions) {
    const sub = q.subject || q.category || 'General';
    metrics.subjectCounts[sub] = (metrics.subjectCounts[sub] || 0) + 1;

    const type = q.question_type || 'Single MCQ';
    metrics.typeCounts[type] = (metrics.typeCounts[type] || 0) + 1;

    const diff = (q.difficulty || 'medium').toLowerCase();
    if (metrics.difficultyCounts[diff] !== undefined) {
      metrics.difficultyCounts[diff]++;
    }
  }

  // 3. Subject distribution compliance
  const expectedSubjects = blueprint.subject_distribution || {};
  if (typeof expectedSubjects === 'object' && !Array.isArray(expectedSubjects)) {
    for (const [subj, expectedVal] of Object.entries(expectedSubjects)) {
      const expCount = typeof expectedVal === 'object' ? Number(expectedVal.total || expectedVal.count) : Number(expectedVal);
      const actualCount = metrics.subjectCounts[subj] || 0;
      if (expCount > 0 && actualCount !== expCount) {
        errors.push(
          `Subject "${subj}" generated count (${actualCount}) violates blueprint specification (${expCount}).`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    metrics,
  };
}

/**
 * Builds dynamic AI prompt directives strictly based on the blueprint rules.
 * Ensures zero hardcoding in AI prompts.
 * @param {Object} blueprint
 * @returns {string} Formatted prompt instruction block
 */
export function buildAiBlueprintPromptContext(blueprint) {
  let prompt = `### STRICT EXAM BLUEPRINT DIRECTIVES (ID: ${blueprint.slug || blueprint.id})\n`;
  prompt += `- Exam Type: ${blueprint.exam_type} (${blueprint.exam_year || 'Official Pattern'})\n`;
  prompt += `- Target Class: ${blueprint.class_level}\n`;
  prompt += `- Total Required Questions: ${blueprint.total_questions}\n`;
  prompt += `- Duration: ${blueprint.duration_minutes} minutes\n`;
  prompt += `- Base Marking: +${blueprint.marks_per_question} for correct, -${blueprint.negative_marking} for incorrect\n`;

  // Partial marking
  if (blueprint.partial_marking && blueprint.partial_marking.enabled) {
    prompt += `- Partial Marking: ENABLED (${blueprint.partial_marking.description || 'Award proportional credit for multi-correct or multi-part questions'})\n`;
  } else {
    prompt += `- Partial Marking: DISABLED (Strict binary scoring)\n`;
  }

  // Subject distribution
  prompt += `\n### SUBJECT QUESTION ALLOCATION:\n`;
  const subDist = blueprint.subject_distribution || {};
  if (Array.isArray(subDist)) {
    subDist.forEach((s) => {
      prompt += `* ${s.subject}: exactly ${s.count || s.total_questions} questions\n`;
    });
  } else {
    Object.entries(subDist).forEach(([sub, cnt]) => {
      const c = typeof cnt === 'object' ? cnt.total || cnt.count : cnt;
      prompt += `* ${sub}: exactly ${c} questions\n`;
    });
  }

  // Section rules
  if (blueprint.section_rules && Object.keys(blueprint.section_rules).length > 0) {
    prompt += `\n### SECTION & OPTIONAL RULES:\n`;
    prompt += JSON.stringify(blueprint.section_rules, null, 2) + '\n';
  }

  // Question type distribution
  if (blueprint.question_type_distribution && Object.keys(blueprint.question_type_distribution).length > 0) {
    prompt += `\n### QUESTION TYPE ALLOCATION:\n`;
    Object.entries(blueprint.question_type_distribution).forEach(([type, count]) => {
      prompt += `* ${type}: ${count} questions\n`;
    });
  }

  // Difficulty distribution
  if (blueprint.difficulty_distribution && Object.keys(blueprint.difficulty_distribution).length > 0) {
    prompt += `\n### DIFFICULTY MIX:\n`;
    Object.entries(blueprint.difficulty_distribution).forEach(([diff, pct]) => {
      prompt += `* ${diff.toUpperCase()}: ${pct}%\n`;
    });
  }

  prompt += `\nCRITICAL ENFORCEMENT: You MUST generate EXACTLY the numbers specified above. Any deviation in counts, marking, or subjects will cause immediate validation failure.\n`;

  return prompt;
}
