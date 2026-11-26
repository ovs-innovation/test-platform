/**
 * AI Prompt Templates & Academic Schemas for NEET, JEE Main & Advanced
 * Enforces NTA and IIT JEE syllabus standards, strict structured JSON,
 * zero dummy options, and answer-isolated diagram metadata.
 */

import { z } from 'zod';

// =============================================================================
// ZOD SCHEMAS FOR STRUCTURED QUESTION VALIDATION
// =============================================================================

export const DiagramMetadataZodSchema = z.object({
  has_diagram: z.boolean().default(false),
  diagram_type: z
    .enum(['none', 'circuit', 'ray_optics', 'mechanics', 'thermodynamics', 'graph', 'geometry', 'atomic_nuclear'])
    .default('none'),
  diagram_description: z.string().default(''),
  diagram_reference_labels: z.array(z.string()).default([]),
  diagram_svg: z.string().optional(),
});

export const MatchPairItemZodSchema = z.object({
  id: z.string(), // 'A', 'B', 'C', 'D' or 'I', 'II', 'III', 'IV'
  text: z.string(),
});

export const MatchPairsZodSchema = z.object({
  column_a: z.array(MatchPairItemZodSchema).default([]),
  column_b: z.array(MatchPairItemZodSchema).default([]),
});

export const SingleAiGeneratedQuestionZodSchema = z.object({
  question_number: z.number().int().positive().optional().default(1),
  question_type: z.enum([
    'single_choice',
    'multi_select',
    'assertion_reason',
    'numerical',
    'integer',
    'match_the_following',
    'passage',
  ]),
  subject: z.string(),
  chapter: z.string(),
  topic: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard', 'Easy', 'Medium', 'Hard']).default('Medium'),
  question_text: z.string().min(10, 'Question text must be at least 10 characters'),

  // Options for MCQs, AR, Match, Passage
  options: z.array(z.string()).optional().default([]),
  correct_index: z.number().int().min(0).max(3).nullable().optional(),
  correct_indices: z.array(z.number().int().min(0).max(3)).optional().default([]),

  // Numerical / Integer
  numeric_answer: z.number().nullable().optional(),
  numerical_tolerance: z.number().nonnegative().optional().default(0),

  // Human-readable answer key (e.g. "A", "B, D", "12.5")
  correct_answer: z.string(),

  // Assertion-Reason fields
  assertion_text: z.string().optional().nullable(),
  reason_text: z.string().optional().nullable(),

  // Match the Following
  match_pairs: MatchPairsZodSchema.optional(),

  // Passage
  passage_title: z.string().optional().nullable(),
  passage_text: z.string().optional().nullable(),

  // Solution
  solution: z.string().min(15, 'Detailed step-by-step explanation required'),

  // Marks
  marks: z.number().int().positive().default(4),
  negative_marks: z.number().int().nonnegative().default(1),

  // Content type & diagram metadata
  content_type: z.enum(['text', 'diagram', 'graph']).default('text'),
  diagram_metadata: DiagramMetadataZodSchema.default({
    has_diagram: false,
    diagram_type: 'none',
    diagram_description: '',
    diagram_reference_labels: [],
  }),
});

export const BatchQuestionArrayZodSchema = z.array(SingleAiGeneratedQuestionZodSchema);

export const AiQuestionBatchResultZodSchema = z.object({
  batch_title: z.string().default('AI Generated Question Batch'),
  exam_type: z.string(),
  subject: z.string(),
  chapter: z.string(),
  topic: z.string(),
  questions: BatchQuestionArrayZodSchema,
});

// =============================================================================
// PROMPT BUILDERS
// =============================================================================

/**
 * Standard System Prompt for NTA Competitive Exam Synthesis
 */
export function buildAcademicSystemPrompt({ examType = 'NEET', classLevel = '12' }) {
  const isNeet = /neet/i.test(examType);
  const examTitle = isNeet ? 'NEET UG (Medical Entrance)' : 'JEE Main & JEE Advanced (Engineering Entrance)';

  return `You are a Senior Academic Subject Specialist and Question Author for ${examTitle} (Class ${classLevel}).
Your task is to generate rigorous, authentic competitive examination questions adhering strictly to the official NTA / IIT JEE syllabus standards.

ACADEMIC QUALITY STANDARDS:
1. CURRICULUM CONFORMANCE: Every question must map to standard NCERT / NTA curriculum concepts. Do NOT invent hypothetical laws or non-standard constants.
2. ZERO AMBIGUITY: Questions must be conceptually unambiguous with exactly one undeniable correct path (or exact multiple options for multi_select).
3. NO PLACEHOLDER OPTIONS: Every option must be substantive and plausible. Never output "Option A", "None of these", "All of above", or identical duplicate options.
4. FORMULAS & MATH: Write all math and scientific notations in standard LaTeX (e.g. \\frac{a}{b}, \\sqrt{x}, \\vec{v}, \\times 10^{-19}\\text{ C}, \\lambda_0).
5. STRICT ANSWER-ISOLATED DIAGRAMS:
   - When content_type is "diagram" or "graph", the question diagram MUST ONLY depict the physical/geometric setup with neutral reference labels (e.g. A, B, C, R_1, R_2, \\theta, v_0, t_1).
   - Under NO circumstance may the question diagram contain or highlight the answer value, resolution arrows, or solution callouts.
6. STEP-BY-STEP EXPLANATION: The explanation must include:
   - Core concept/theorem applied.
   - Intermediate mathematical steps without skipped algebra.
   - Final numeric or logical resolution clearly matching the declared correct answer.`;
}

/**
 * Maps user-friendly question type name to internal enum
 */
export function normalizeQuestionType(typeStr = '') {
  const s = String(typeStr).toLowerCase().trim();
  if (s.includes('single') || s === 'mcq') return 'single_choice';
  if (s.includes('multi') || s.includes('multiple')) return 'multi_select';
  if (s.includes('assertion') || s.includes('reason') || s === 'ar') return 'assertion_reason';
  if (s.includes('integer')) return 'integer';
  if (s.includes('numeric')) return 'numerical';
  if (s.includes('match')) return 'match_the_following';
  if (s.includes('passage') || s.includes('comprehension')) return 'passage';
  return 'single_choice';
}

/**
 * Builds the user prompt for generating a batch of questions
 */
export function buildQuestionGenerationPrompt({
  classLevel = '12',
  examType = 'NEET',
  subject = 'Physics',
  chapter = 'Kinematics',
  topic = '',
  difficulty = 'Medium',
  count = 10,
  questionTypes = ['single_choice'],
  diagramReq = 'Optional',
  explanationReq = 'Detailed Step-by-Step',
  additionalInstructions = '',
  referenceContext = '',
}) {
  const normalizedTypes = questionTypes.map(normalizeQuestionType);
  const typesListStr = normalizedTypes.join(', ');

  return `Generate exactly ${count} competitive exam questions for ${examType} (${subject}) on the chapter "${chapter}"${
    topic ? ` with focus on topic "${topic}"` : ''
  }.

INPUT CONFIGURATION:
- Target Class: Class ${classLevel}
- Target Exam: ${examType}
- Subject: ${subject}
- Chapter: ${chapter}
- Focus Topic: ${topic || 'Standard Chapter Concepts'}
- Target Difficulty: ${difficulty}
- Required Question Types: ${typesListStr}
- Diagram Requirement: ${diagramReq} (If "Required", content_type must be "diagram" or "graph" with neutral markers)
- Explanation Detail: ${explanationReq}
${additionalInstructions ? `- Additional Guidance: ${additionalInstructions}\n` : ''}
${referenceContext ? `REFERENCE CONTEXT FROM UPLOADED MATERIAL:\n"""\n${referenceContext.slice(0, 2000)}\n"""\n` : ''}

OUTPUT FORMAT RULES:
Return a JSON object conforming strictly to this structure:
{
  "batch_title": "${examType} ${subject} - ${chapter}",
  "exam_type": "${examType}",
  "subject": "${subject}",
  "chapter": "${chapter}",
  "topic": "${topic || chapter}",
  "questions": [
    {
      "question_number": 1,
      "question_type": "single_choice",
      "subject": "${subject}",
      "chapter": "${chapter}",
      "topic": "${topic || chapter}",
      "difficulty": "${difficulty}",
      "question_text": "Complete question text with LaTeX formulas like \\\\frac{a}{b}",
      "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
      "correct_index": 0,
      "correct_indices": [0],
      "numeric_answer": null,
      "numerical_tolerance": 0,
      "correct_answer": "Option A (or numerical value)",
      "assertion_text": null,
      "reason_text": null,
      "match_pairs": {
        "column_a": [{"id": "A", "text": "Item A"}],
        "column_b": [{"id": "I", "text": "Match I"}]
      },
      "passage_title": null,
      "passage_text": null,
      "solution": "Step 1: Formula \\\\nStep 2: Substitution \\\\nStep 3: Final Answer",
      "marks": 4,
      "negative_marks": 1,
      "content_type": "${diagramReq === 'Required' ? 'diagram' : 'text'}",
      "diagram_metadata": {
        "has_diagram": ${diagramReq === 'Required' ? true : false},
        "diagram_type": "${diagramReq === 'Required' ? 'circuit' : 'none'}",
        "diagram_description": "Neutral diagram setup description without answers",
        "diagram_reference_labels": ["A", "B", "R_1", "\\\\theta"]
      }
    }
  ]
}

STRICT CONSTRAINTS:
1. Return exactly ${count} objects inside the "questions" array.
2. For "single_choice" and "assertion_reason", provide exactly 4 distinct options and random correct_index (0, 1, 2, or 3).
3. For "numerical" / "integer", set numeric_answer to the exact float or integer, and options to empty [].
4. For "match_the_following", provide column_a (A, B, C, D) and column_b (I, II, III, IV), and 4 composite matching options.
5. All math formulas MUST be valid LaTeX. Escape backslashes properly in JSON (e.g. \\\\frac).
6. Output ONLY the JSON object. No conversational preamble or trailing text.`;
}

/**
 * Builds prompt for regenerating a single question with optional admin critique
 */
export function buildSingleQuestionRegenerationPrompt({
  originalQuestion,
  adminCritique = '',
  examType = 'NEET',
  subject = 'Physics',
  chapter = '',
}) {
  return `You are an academic specialist for ${examType} (${subject}).
A previous AI-generated question for Chapter "${chapter || originalQuestion.chapter}" requires replacement.

ORIGINAL QUESTION (TO BE REPLACED):
"${originalQuestion.question_text}"

ADMIN FEEDBACK / DEFECT:
${adminCritique || 'Generate a fresh, conceptually sound question of the same type and difficulty.'}

Generate a single fresh replacement question of type "${originalQuestion.question_type}" at difficulty "${originalQuestion.difficulty}".
Return a JSON object conforming to the SingleAiGeneratedQuestion structure:
{
  "question_number": ${originalQuestion.question_number || 1},
  "question_type": "${originalQuestion.question_type}",
  "subject": "${subject}",
  "chapter": "${chapter || originalQuestion.chapter}",
  "topic": "${originalQuestion.topic}",
  "difficulty": "${originalQuestion.difficulty}",
  "question_text": "...",
  "options": ["A", "B", "C", "D"],
  "correct_index": 0,
  "correct_indices": [],
  "numeric_answer": null,
  "numerical_tolerance": 0,
  "correct_answer": "...",
  "assertion_text": null,
  "reason_text": null,
  "match_pairs": { "column_a": [], "column_b": [] },
  "passage_title": null,
  "passage_text": null,
  "solution": "...",
  "marks": ${originalQuestion.marks || 4},
  "negative_marks": ${originalQuestion.negative_marks || 1},
  "content_type": "${originalQuestion.content_type || 'text'}",
  "diagram_metadata": {
    "has_diagram": ${Boolean(originalQuestion.has_diagram)},
    "diagram_type": "${originalQuestion.diagram_type || 'none'}",
    "diagram_description": "",
    "diagram_reference_labels": []
  }
}
Output ONLY valid JSON.`;
}
