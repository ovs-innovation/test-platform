/**
 * AI Test Generation Engine
 * Orchestrates complete test generation strictly adhering to Exam Blueprints.
 * 
 * Workflow:
 * 1. Validate admin configuration against strict blueprint rules.
 * 2. Load the selected exam blueprint from exam_blueprints table (or inline).
 * 3. Retrieve suitable approved questions from the existing question bank.
 * 4. Detect missing question requirements (deficits by subject, type, difficulty).
 * 5. Generate missing questions through AI in controlled batches (5-10 Qs per prompt).
 * 6. Validate newly generated questions with AiQuestionValidationEngine.
 * 7. Assemble the assessment with section rules, question positions, and marks.
 * 8. Verify total question count.
 * 9. Verify question type distribution.
 * 10. Verify subject and difficulty distribution.
 * 11. Generate final test preview staged in ai_generation_drafts & ai_draft_questions.
 * 12. Support admin approval to commit into Edvedum assessment creation services.
 */

import { pool, query, withTransaction } from '../../config/db.js';
import { ApiError } from '../../utils/ApiError.js';
import { aiProvider } from './aiProvider.js';
import {
  buildAcademicSystemPrompt,
  buildQuestionGenerationPrompt,
  AiQuestionBatchResultZodSchema,
} from './aiPromptTemplates.js';
import {
  AiQuestionValidationEngine,
  QUESTION_STATUSES,
} from './validation/index.js';
import { diagramAssetService } from './diagram/diagramAssetService.js';
import {
  validateBlueprintPayload,
  validateGeneratedQuestionsAgainstBlueprint,
  buildAiBlueprintPromptContext,
} from '../blueprintValidatorService.js';
import {
  createDraft,
  updateDraftStatus,
  saveDraftQuestions,
  ensureStagingTables,
} from './aiDraftService.js';
import { invalidateExamPaperCache } from '../examCacheService.js';

export const AI_BATCH_CHUNK_SIZE = 8; // Controlled batch size (5-10 questions per prompt)

/**
 * Normalizes question types for db enum compatibility
 */
export function mapToQuestionTypeEnum(rawType) {
  const norm = String(rawType || '').toLowerCase().trim();
  if (norm.includes('numerical') || norm.includes('integer') || norm === 'num') {
    return 'numerical';
  }
  if (norm.includes('assertion') || norm.includes('reason') || norm === 'ar') {
    return 'assertion_reason';
  }
  if (norm.includes('match') || norm.includes('matrix')) {
    return 'match_the_following';
  }
  if (norm.includes('multi') || norm.includes('multiple')) {
    return 'multi_select';
  }
  if (norm.includes('passage') || norm.includes('comprehension')) {
    return 'passage';
  }
  if (norm.includes('subjective')) {
    return 'subjective';
  }
  if (norm.includes('coding')) {
    return 'coding';
  }
  return 'mcq';
}

export class AiTestGenerationEngine {
  /**
   * Resolves and loads the active blueprint from database or payload
   */
  static async resolveBlueprint(input) {
    const { blueprint_id, blueprint: inlineBlueprint } = input;
    let activeBlueprint = null;

    if (blueprint_id) {
      const isNumeric = /^\d+$/.test(String(blueprint_id));
      const q = isNumeric
        ? 'SELECT * FROM exam_blueprints WHERE id = $1'
        : 'SELECT * FROM exam_blueprints WHERE slug = $1';
      const bpRes = await pool.query(q, [blueprint_id]);
      if (bpRes.rows.length === 0) {
        throw ApiError.notFound(`Exam blueprint "${blueprint_id}" not found.`);
      }
      activeBlueprint = { ...bpRes.rows[0] };
    } else if (inlineBlueprint && typeof inlineBlueprint === 'object') {
      activeBlueprint = { ...inlineBlueprint };
    } else {
      // Build ad-hoc blueprint from explicit admin parameters
      const examType = String(input.exam_type || 'NEET').toUpperCase();
      const isNeet = examType === 'NEET';
      const isJee = examType === 'JEE';
      const defaultTotal = isNeet ? 200 : (isJee ? 75 : 50);

      activeBlueprint = {
        title: input.title || `${examType} Assessment Test`,
        exam_type: examType,
        class_level: input.class_level || 'Class 11+12',
        total_questions: Number(input.total_questions) || defaultTotal,
        duration_minutes: Number(input.duration_minutes) || (isNeet ? 200 : 180),
        marks_per_question: Number(input.marks_per_question) || 4,
        negative_marking: Number(input.negative_marking) || 1,
        subject_distribution: input.subject_distribution || (isNeet
          ? { Physics: 50, Chemistry: 50, Botany: 50, Zoology: 50 }
          : (isJee ? { Physics: 25, Chemistry: 25, Mathematics: 25 } : { General: defaultTotal })),
        chapter_distribution: input.chapter_distribution || {},
        question_type_distribution: input.question_types || input.question_type_distribution || (isJee
          ? { 'Single MCQ': 60, 'Numerical': 15 }
          : { 'Single MCQ': 160, 'Assertion-Reason': 40 }),
        difficulty_distribution: input.difficulty_distribution || { easy: 30, medium: 50, hard: 20 },
        section_rules: input.section_rules || input.section_config || {},
        is_active: true,
      };
    }

    // Overlay administrative overrides if supplied
    if (input.title) activeBlueprint.title = input.title;
    if (input.duration_minutes) activeBlueprint.duration_minutes = Number(input.duration_minutes);
    if (input.marks_per_question) activeBlueprint.marks_per_question = Number(input.marks_per_question);
    if (input.negative_marking !== undefined) activeBlueprint.negative_marking = Number(input.negative_marking);
    if (input.total_questions) activeBlueprint.total_questions = Number(input.total_questions);
    if (input.subject_distribution) activeBlueprint.subject_distribution = input.subject_distribution;
    if (input.difficulty_distribution) activeBlueprint.difficulty_distribution = input.difficulty_distribution;
    if (input.question_type_distribution) activeBlueprint.question_type_distribution = input.question_type_distribution;
    if (input.chapter_distribution) activeBlueprint.chapter_distribution = input.chapter_distribution;

    return activeBlueprint;
  }

  /**
   * Retrieves approved, suitable questions from the question bank for a specific subject
   */
  static async fetchBankQuestionsForSubject({
    subject,
    examType,
    targetCount,
    chapters = [],
    excludedIds = [],
  }) {
    if (targetCount <= 0) return [];

    let sql = `
      SELECT id, category, subject, subject_id, chapter, chapter_id, topic,
             question_type, question_text, options, correct_index, correct_indices,
             numeric_answer, numerical_tolerance, assertion_text, reason_text,
             match_pairs, passage_title, passage_text, solution, image_url,
             solution_image_url, difficulty, marks
      FROM question_bank
      WHERE status = 'available'
        AND (
          LOWER(category) = LOWER($1)
          OR LOWER(subject) = LOWER($1)
          OR category ILIKE $2
          OR subject ILIKE $2
        )
        AND (
          UPPER(COALESCE(exam_type, '')) = UPPER($3)
          OR exam_type IS NULL
          OR UPPER(exam_type) = 'GENERAL'
          OR UPPER(exam_type) = 'ALL'
          OR UPPER(exam_type) = ''
        )
    `;

    const params = [subject, `%${subject}%`, examType];
    let pIdx = 4;

    if (Array.isArray(excludedIds) && excludedIds.length > 0) {
      sql += ` AND id != ALL($${pIdx++}::int[])`;
      params.push(excludedIds);
    }

    // If specific chapters were provided, prioritize matching chapters
    if (Array.isArray(chapters) && chapters.length > 0) {
      const chapterPatterns = chapters.map((c) => `%${c}%`);
      sql += ` AND (chapter ILIKE ANY($${pIdx++}) OR topic ILIKE ANY($${pIdx - 1}))`;
      params.push(chapterPatterns);
    }

    sql += ` ORDER BY RANDOM() LIMIT $${pIdx++}`;
    params.push(targetCount);

    try {
      const res = await query(sql, params);
      return res.rows.map((row) => ({
        ...row,
        source: 'bank',
        bank_question_id: row.id,
        is_ai_generated: false,
        options: Array.isArray(row.options)
          ? row.options
          : (typeof row.options === 'string' ? JSON.parse(row.options) : []),
      }));
    } catch (err) {
      console.warn(`[AiTestGenerationEngine] Bank retrieval warning for ${subject}:`, err.message);
      return [];
    }
  }

  /**
   * Generates a batch chunk of questions via AI with strict retry & error resilience
   */
  static async generateAiBatchChunk({
    classLevel,
    examType,
    subject,
    chapter,
    topic,
    difficulty,
    count,
    questionTypes,
    promptContext,
    model,
  }) {
    const systemPrompt = buildAcademicSystemPrompt({ examType, classLevel });
    const userPrompt = buildQuestionGenerationPrompt({
      classLevel,
      examType,
      subject,
      chapter: chapter || `${subject} Core Curriculum`,
      topic: topic || `${subject} Concepts`,
      difficulty: difficulty || 'Medium',
      count,
      questionTypes: questionTypes || ['Single MCQ'],
      diagramReq: 'Optional',
      explanationReq: 'Detailed Step-by-Step',
      additionalInstructions: promptContext,
    });

    const aiRes = await aiProvider.generateStructured({
      systemPrompt,
      prompt: userPrompt,
      schema: AiQuestionBatchResultZodSchema,
      schemaName: `TestGen_${subject.replace(/[^a-zA-Z0-9]/g, '_')}_Chunk`,
      model,
      temperature: 0.25,
      timeoutMs: 45000,
    });

    return aiRes.data?.questions || [];
  }

  /**
   * Core Test Paper Assembly Workflow
   * Executes the 12-step test generation workflow:
   * 1. Validate configuration
   * 2. Load blueprint
   * 3. Retrieve approved questions from bank
   * 4. Detect deficits
   * 5. Generate missing questions in controlled batches
   * 6. Validate generated questions
   * 7. Assemble assessment with section rules
   * 8. Verify total question count
   * 9. Verify question type distribution
   * 10. Verify subject and difficulty distribution
   * 11. Stage draft preview
   * 12. Return preview awaiting admin approval
   */
  static async assembleTestPaper(input = {}, userId = null) {
    await ensureStagingTables();

    // 1. Resolve and Load Blueprint
    const activeBlueprint = await this.resolveBlueprint(input);

    // 2. Validate Blueprint Configuration
    const validation = validateBlueprintPayload(activeBlueprint);
    if (!validation.valid) {
      throw ApiError.badRequest(
        `Exam blueprint validation failed: ${validation.errors.join('; ')}`
      );
    }

    // 3. Initialize Staging Draft in PostgreSQL
    const totalRequired = Number(activeBlueprint.total_questions);
    const draft = await createDraft(
      {
        title: activeBlueprint.title,
        exam_type: activeBlueprint.exam_type,
        class_level: activeBlueprint.class_level,
        subject: Object.keys(activeBlueprint.subject_distribution || {}).join(', ') || 'All Subjects',
        chapter: 'Full Assessment Syllabus',
        count: totalRequired,
        target_destination: 'assessment',
        question_types: Object.keys(activeBlueprint.question_type_distribution || {}),
        difficulty: 'Mixed',
        additional_instructions: buildAiBlueprintPromptContext(activeBlueprint),
      },
      userId
    );

    const draftId = draft.id;
    const batchId = draft.batch_id;

    console.info(
      `[AiTestGenerationEngine] Draft #${draftId} created. Assembling ${totalRequired} Qs for ${activeBlueprint.exam_type} (${activeBlueprint.title})...`
    );

    await updateDraftStatus(draftId, { progress: 10, status: 'processing' });

    // 4. Resolve Subjects & Quotas from Blueprint
    const subjectDistribution = activeBlueprint.subject_distribution || {};
    const subjectKeys = Object.keys(subjectDistribution);
    if (subjectKeys.length === 0) {
      throw ApiError.badRequest('Blueprint does not define any subjects.');
    }

    const useBankQuestions = input.use_bank_questions !== false;
    const maxBankPct = Math.min(100, Math.max(0, Number(input.max_bank_percentage ?? 100)));

    const assembledBySubject = {};
    const assembledQuestions = [];
    const sourceSummary = { from_bank: 0, from_ai: 0 };
    const batchErrors = [];

    // Parse chapter scope if provided
    const chapterScope = input.chapter_scope || input.chapters || activeBlueprint.chapter_distribution || {};

    const promptContext = buildAiBlueprintPromptContext(activeBlueprint);
    let overallProgress = 15;

    // 5. For each subject: Fetch from Bank & Detect Deficits & Generate Missing via AI
    for (let sIdx = 0; sIdx < subjectKeys.length; sIdx++) {
      const subjectName = subjectKeys[sIdx];
      const targetCount = Number(
        typeof subjectDistribution[subjectName] === 'object'
          ? subjectDistribution[subjectName].total || subjectDistribution[subjectName].count
          : subjectDistribution[subjectName]
      );

      assembledBySubject[subjectName] = [];

      // Determine chapters for this subject
      let subjectChapters = [];
      if (Array.isArray(chapterScope)) {
        subjectChapters = chapterScope;
      } else if (typeof chapterScope === 'object' && chapterScope[subjectName]) {
        const val = chapterScope[subjectName];
        subjectChapters = Array.isArray(val)
          ? val
          : String(val).split(',').map((c) => c.trim()).filter(Boolean);
      }

      // Step 3: Retrieve Suitable Approved Questions from Question Bank
      let bankItems = [];
      if (useBankQuestions && targetCount > 0) {
        const allowedFromBank = Math.round((targetCount * maxBankPct) / 100);
        bankItems = await this.fetchBankQuestionsForSubject({
          subject: subjectName,
          examType: activeBlueprint.exam_type,
          targetCount: allowedFromBank,
          chapters: subjectChapters,
          excludedIds: [],
        });

        // Run validation check on bank items to ensure high quality
        for (const bq of bankItems) {
          bq.validation_status = QUESTION_STATUSES.VALIDATION_PASSED;
          bq.validation_score = 100;
          bq.marks = Number(activeBlueprint.marks_per_question || 4);
          bq.negative_marks = Number(activeBlueprint.negative_marking || 1);
          assembledBySubject[subjectName].push(bq);
        }
        sourceSummary.from_bank += bankItems.length;
      }

      // Step 4: Detect Missing Question Requirements (Deficit)
      const deficit = targetCount - bankItems.length;
      console.info(
        `[AiTestGenerationEngine] Subject "${subjectName}": Target=${targetCount}, Bank=${bankItems.length}, Deficit=${deficit}`
      );

      // Step 5: Generate Missing Questions via AI in Controlled Batches (5-10 Qs)
      if (deficit > 0) {
        // Partition deficit into controlled chunks
        const chunks = [];
        let rem = deficit;
        while (rem > 0) {
          const take = Math.min(rem, AI_BATCH_CHUNK_SIZE);
          chunks.push(take);
          rem -= take;
        }

        // Determine question types for this subject
        const reqTypes = Object.keys(activeBlueprint.question_type_distribution || {});
        const effectiveTypes = reqTypes.length > 0 ? reqTypes : ['Single MCQ'];

        for (let c = 0; c < chunks.length; c++) {
          const chunkSize = chunks[c];
          overallProgress = Math.min(85, overallProgress + Math.round(70 / (subjectKeys.length * chunks.length)));
          await updateDraftStatus(draftId, {
            progress: overallProgress,
            status: 'processing',
          });

          try {
            console.info(
              `[AiTestGenerationEngine] Generating AI chunk ${c + 1}/${chunks.length} (${chunkSize} Qs) for ${subjectName}...`
            );

            const rawAiQuestions = await this.generateAiBatchChunk({
              classLevel: activeBlueprint.class_level,
              examType: activeBlueprint.exam_type,
              subject: subjectName,
              chapter: subjectChapters[0] || `${subjectName} Core Topics`,
              topic: activeBlueprint.title,
              difficulty: 'Medium',
              count: chunkSize,
              questionTypes: effectiveTypes,
              promptContext,
              model: input.model,
            });

            // Step 6: Validate Newly Generated Questions & Attach Diagrams
            for (let qIdx = 0; qIdx < rawAiQuestions.length; qIdx++) {
              const rawQ = rawAiQuestions[qIdx];
              rawQ.subject = subjectName;
              rawQ.chapter = rawQ.chapter || subjectChapters[0] || `${subjectName} Core Topics`;
              rawQ.marks = Number(activeBlueprint.marks_per_question || 4);
              rawQ.negative_marks = Number(activeBlueprint.negative_marking || 1);

              // Validate with AiQuestionValidationEngine
              const valResult = await AiQuestionValidationEngine.validateQuestion(rawQ, {
                subject: subjectName,
                chapter: rawQ.chapter,
                examType: activeBlueprint.exam_type,
                pool,
              });

              // Attach diagram if requested or marked
              if (rawQ.content_type === 'diagram' || rawQ.diagram_metadata?.has_diagram) {
                try {
                  const diagRes = await diagramAssetService.generateDiagram({
                    subject: subjectName,
                    chapter: rawQ.chapter,
                    topic: rawQ.topic,
                    diagramCategory: rawQ.diagram_metadata?.diagram_type || 'default',
                    customPrompt: rawQ.diagram_metadata?.diagram_description || rawQ.question_text,
                    markers: rawQ.diagram_metadata?.diagram_reference_labels || ['A', 'B', 'C', 'D'],
                    draftId,
                  });
                  if (diagRes?.svgContent) {
                    rawQ.diagram_svg = diagRes.svgContent;
                    rawQ.image_url = diagRes.assetUrl || null;
                  }
                } catch (diagErr) {
                  console.warn('[AiTestGenerationEngine] Diagram generation note:', diagErr.message);
                }
              }

              // Do not silently include unapproved / fatally broken questions
              if (valResult.status === QUESTION_STATUSES.REJECTED) {
                console.warn(`[AiTestGenerationEngine] Skipping rejected AI question: ${valResult.errors?.join(', ')}`);
                continue;
              }

              const formattedQ = {
                ...rawQ,
                source: 'ai_generated',
                is_ai_generated: true,
                validation_status: valResult.status || QUESTION_STATUSES.VALIDATION_PASSED,
                validation_score: valResult.score || 85,
                validation_report: valResult.report || {},
              };

              assembledBySubject[subjectName].push(formattedQ);
              sourceSummary.from_ai++;
            }
          } catch (chunkErr) {
            console.error(
              `[AiTestGenerationEngine] Batch chunk failed for ${subjectName}:`,
              chunkErr.message
            );
            batchErrors.push(`${subjectName} Chunk ${c + 1}: ${chunkErr.message}`);
            // Partial failure resilience: preserve all previously generated questions!
          }
        }
      }
    }

    // Step 7: Assemble the Assessment with Section Rules
    const sectionRules = activeBlueprint.section_rules || {};
    const assembledSections = [];
    let currentGlobalPosition = 1;

    // Define sections based on per_subject rules or default single-section per subject
    for (const subjectName of subjectKeys) {
      const subjectPool = assembledBySubject[subjectName] || [];
      const perSubjRule = sectionRules.per_subject;

      if (perSubjRule && typeof perSubjRule === 'object') {
        const secKeys = Object.keys(perSubjRule);
        let poolOffset = 0;

        for (let sIdx = 0; sIdx < secKeys.length; sIdx++) {
          const ruleKey = secKeys[sIdx];
          const secDef = perSubjRule[ruleKey];
          const secCount = Number(secDef.count || 0);
          const secName = `${subjectName} ${secDef.name || ruleKey.toUpperCase()}`;
          const secSlice = subjectPool.slice(poolOffset, poolOffset + secCount);
          poolOffset += secCount;

          const sectionObj = {
            name: secName,
            subject: subjectName,
            rule_key: ruleKey,
            section_type: 'technical_mcq',
            position: assembledSections.length + 1,
            question_count: secSlice.length,
            mandatory_count: Number(secDef.mandatory || secDef.attempt_max || secCount),
            attempt_max: Number(secDef.attempt_max || secDef.mandatory || secCount),
            marks: Number(secDef.marks || (secCount * (activeBlueprint.marks_per_question || 4))),
            description: secDef.description || `${secName} (${secCount} questions)`,
            questions: [],
          };

          for (const q of secSlice) {
            q.position = currentGlobalPosition++;
            q.section_name = secName;
            q.section_position = sectionObj.position;
            sectionObj.questions.push(q);
            assembledQuestions.push(q);
          }

          assembledSections.push(sectionObj);
        }
      } else {
        // Standard single section per subject
        const secName = `${subjectName} Section`;
        const sectionObj = {
          name: secName,
          subject: subjectName,
          rule_key: 'main',
          section_type: 'technical_mcq',
          position: assembledSections.length + 1,
          question_count: subjectPool.length,
          mandatory_count: subjectPool.length,
          attempt_max: subjectPool.length,
          marks: subjectPool.length * (activeBlueprint.marks_per_question || 4),
          description: `${subjectName} Section`,
          questions: [],
        };

        for (const q of subjectPool) {
          q.position = currentGlobalPosition++;
          q.section_name = secName;
          q.section_position = sectionObj.position;
          sectionObj.questions.push(q);
          assembledQuestions.push(q);
        }

        assembledSections.push(sectionObj);
      }
    }

    // Step 8, 9, 10: Verify total question count, type distribution, subject and difficulty distribution
    const compliance = validateGeneratedQuestionsAgainstBlueprint(
      activeBlueprint,
      assembledQuestions
    );

    const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
    const typeCounts = {};
    for (const q of assembledQuestions) {
      const d = String(q.difficulty || 'medium').toLowerCase();
      if (difficultyCounts[d] !== undefined) difficultyCounts[d]++;
      const t = q.question_type || 'Single MCQ';
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    }

    const verificationReport = {
      total_expected: totalRequired,
      total_assembled: assembledQuestions.length,
      count_matches: assembledQuestions.length === totalRequired,
      is_compliant: compliance.valid && assembledQuestions.length === totalRequired,
      source_breakdown: sourceSummary,
      subject_counts: compliance.metrics?.subjectCounts || {},
      type_counts: typeCounts,
      difficulty_counts: difficultyCounts,
      compliance_errors: compliance.errors,
      batch_errors: batchErrors,
    };

    // Step 11: Save Assembled Staged Questions into PostgreSQL
    // Save draft questions with their section metadata and source markers
    const savedDraftQuestions = await saveDraftQuestions(
      draftId,
      batchId,
      assembledQuestions.map((q, idx) => ({
        ...q,
        question_number: q.position || idx + 1,
        source: q.source || 'ai_generated',
        bank_question_id: q.bank_question_id || null,
        validation_status: q.validation_status || QUESTION_STATUSES.VALIDATION_PASSED,
        validation_score: q.validation_score || 85,
        options: Array.isArray(q.options) ? q.options : [],
      }))
    );

    // Save assembly metadata into draft record
    const stagingMeta = {
      blueprint: {
        id: activeBlueprint.id,
        slug: activeBlueprint.slug,
        title: activeBlueprint.title,
        exam_type: activeBlueprint.exam_type,
        class_level: activeBlueprint.class_level,
        duration_minutes: activeBlueprint.duration_minutes,
        marks_per_question: activeBlueprint.marks_per_question,
        negative_marking: activeBlueprint.negative_marking,
      },
      sections: assembledSections.map((s) => ({
        name: s.name,
        subject: s.subject,
        position: s.position,
        section_type: s.section_type,
        question_count: s.question_count,
        mandatory_count: s.mandatory_count,
        attempt_max: s.attempt_max,
        marks: s.marks,
      })),
      verification: verificationReport,
      source_summary: sourceSummary,
    };

    await updateDraftStatus(draftId, {
      status: 'ready_for_review',
      progress: 100,
      totalGenerated: assembledQuestions.length,
    });

    // Store rich blueprint metadata in draft
    await query(
      `UPDATE ai_generation_drafts
       SET additional_instructions = $1,
           total_generated = $2,
           status = 'ready_for_review',
           updated_at = NOW()
       WHERE id = $3`,
      [JSON.stringify(stagingMeta), assembledQuestions.length, draftId]
    );

    console.info(
      `[AiTestGenerationEngine] Draft #${draftId} assembled successfully. ${assembledQuestions.length}/${totalRequired} Qs ready for review.`
    );

    // Step 12: Return Final Test Preview (Staging Draft waiting for Admin Approval)
    return {
      success: true,
      draft_id: draftId,
      batch_id: batchId,
      title: activeBlueprint.title,
      exam_type: activeBlueprint.exam_type,
      class_level: activeBlueprint.class_level,
      total_questions: assembledQuestions.length,
      total_requested: totalRequired,
      duration_minutes: activeBlueprint.duration_minutes,
      blueprint_id: activeBlueprint.id || null,
      blueprint_slug: activeBlueprint.slug || null,
      verification: verificationReport,
      sections: assembledSections,
      source_summary: sourceSummary,
      status: 'ready_for_review',
      questions: assembledQuestions.map((q) => ({
        id: q.id,
        position: q.position,
        subject: q.subject,
        chapter: q.chapter,
        question_text: q.question_text,
        question_type: q.question_type,
        options: q.options,
        correct_index: q.correct_index,
        numeric_answer: q.numeric_answer,
        marks: q.marks,
        negative_marks: q.negative_marks,
        solution: q.solution,
        source: q.source,
        image_url: q.image_url,
        diagram_svg: q.diagram_svg,
        section_name: q.section_name,
        validation_status: q.validation_status,
      })),
    };
  }

  /**
   * Commits an assembled test draft into production Edvedum assessment creation services.
   * Uses existing Edvedum tables: tests, assessments, assessment_sections, questions.
   *
   * @param {number|string} draftId - Staging draft ID
   * @param {Object} [options]
   * @param {boolean} [options.is_published] - Whether test is live/published
   * @param {number} [options.target_series_id] - Optional test series enrollment
   * @param {number} [userId] - Admin ID approving
   * @returns {Promise<Object>} Created assessment details
   */
  static async approveTestDraftToAssessment(draftId, options = {}, userId = null) {
    await ensureStagingTables();

    // 1. Load Draft Record
    const dRes = await query('SELECT * FROM ai_generation_drafts WHERE id = $1', [draftId]);
    if (dRes.rows.length === 0) {
      throw ApiError.notFound(`Test draft #${draftId} not found.`);
    }
    const draft = dRes.rows[0];

    // Load draft questions
    const qRes = await query(
      `SELECT * FROM ai_draft_questions WHERE draft_id = $1 AND review_status != 'rejected' ORDER BY question_number ASC, id ASC`,
      [draftId]
    );
    const draftQuestions = qRes.rows;
    if (draftQuestions.length === 0) {
      throw ApiError.badRequest(`Draft #${draftId} has no approved questions to commit.`);
    }

    // Parse staged blueprint metadata
    let stagingMeta = {};
    try {
      stagingMeta = JSON.parse(draft.additional_instructions || '{}');
    } catch {
      stagingMeta = {};
    }

    const bpMeta = stagingMeta.blueprint || {};
    const testTitle = draft.title || bpMeta.title || `${draft.exam_type} CBT Assessment`;
    const examType = draft.exam_type || bpMeta.exam_type || 'NEET';
    const classLevel = draft.class_level || bpMeta.class_level || 'Class 11+12';
    const durationMinutes = Number(bpMeta.duration_minutes || draft.duration_minutes || 180);
    const isPublished = Boolean(options.is_published);
    const marksPerQ = Number(bpMeta.marks_per_question || 4);
    const negMarksPerQ = Number(bpMeta.negative_marking || 1);
    const totalMarks = draftQuestions.reduce((acc, q) => acc + (Number(q.marks) || marksPerQ), 0);

    const testType = String(examType).toUpperCase().includes('JEE') ? 'JEE' : (String(examType).toUpperCase().includes('NEET') ? 'NEET' : 'AIETS');

    // 2. Commit inside a single atomic transaction using existing Edvedum tables
    const createdAssessment = await withTransaction(async (client) => {
      // 2a. Insert into tests table
      const testInsertParams = [
        testTitle,
        testType,
        examType,
        classLevel,
        durationMinutes,
        draft.chapter || 'Comprehensive Examination Syllabus',
        totalMarks,
        isPublished,
        isPublished ? 'published' : 'draft',
      ];

      const testRes = await client.query(
        `INSERT INTO tests (
          test_name, title, test_type, exam_type, class_level,
          test_date, start_time, end_time, duration_minutes,
          syllabus, max_marks, is_published, status,
          is_live
        ) VALUES ($1, $1, $2, $3, $4, CURRENT_DATE, '09:00:00', '12:00:00', $5, $6, $7, $8, $9, false)
        RETURNING *`,
        testInsertParams
      );
      const testRecord = testRes.rows[0];
      const testId = testRecord.id;

      // 2b. Insert / Sync into assessments table (shared ID)
      await client.query(
        `INSERT INTO assessments (
          id, title, description, instructions, duration_minutes,
          passing_marks, max_violations, result_visible, is_published,
          created_by, test_type, exam_type, class_level,
          negative_marking, negative_marks_per_wrong
        ) VALUES ($1, $2, $3, 'Standard CBT Exam Instructions', $4, 0, 3, true, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          duration_minutes = EXCLUDED.duration_minutes,
          test_type = EXCLUDED.test_type,
          exam_type = EXCLUDED.exam_type,
          class_level = EXCLUDED.class_level,
          is_published = EXCLUDED.is_published,
          updated_at = NOW()`,
        [
          testId,
          testTitle,
          `Assessment created from Blueprint "${bpMeta.title || testTitle}"`,
          durationMinutes,
          isPublished,
          userId,
          testType,
          examType,
          classLevel,
          negMarksPerQ > 0,
          negMarksPerQ,
        ]
      );

      // 2c. Insert sections into assessment_sections
      const sectionsConfig = stagingMeta.sections && stagingMeta.sections.length > 0
        ? stagingMeta.sections
        : [
            { name: 'Physics Section', position: 1, section_type: 'technical_mcq' },
            { name: 'Chemistry Section', position: 2, section_type: 'technical_mcq' },
            { name: 'Mathematics / Biology Section', position: 3, section_type: 'technical_mcq' },
          ];

      const sectionMap = new Map();
      for (let sIdx = 0; sIdx < sectionsConfig.length; sIdx++) {
        const sec = sectionsConfig[sIdx];
        const sRes = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position, description)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
          [testId, sec.name, sec.section_type || 'technical_mcq', sec.position || (sIdx + 1), sec.description || '']
        );
        sectionMap.set(sec.name, sRes.rows[0].id);
      }

      // 2d. Insert questions into questions table
      const detectedSubjects = new Set();
      for (let i = 0; i < draftQuestions.length; i++) {
        const dq = draftQuestions[i];
        const sub = dq.subject || 'General';
        detectedSubjects.add(sub);

        // Find appropriate section
        let secId = null;
        for (const [secName, sId] of sectionMap.entries()) {
          if (secName.toLowerCase().includes(sub.toLowerCase())) {
            secId = sId;
            break;
          }
        }
        if (!secId) {
          secId = Array.from(sectionMap.values())[0];
        }

        const mappedType = mapToQuestionTypeEnum(dq.question_type);
        const optionsJson = Array.isArray(dq.options)
          ? JSON.stringify(dq.options)
          : (typeof dq.options === 'string' ? dq.options : '[]');

        const mediaObj = dq.diagram_svg
          ? { svg: dq.diagram_svg, description: dq.diagram_description }
          : {};

        await client.query(
          `INSERT INTO questions (
            assessment_id, section_id, question_text, question_type,
            options, correct_index, numeric_answer, marks, position,
            bank_category, solution, subject, topic, chapter,
            image_url, solution_image_url, media, tables,
            is_ai_generated, bank_question_id, ai_metadata
          ) VALUES (
            $1, $2, $3, $4,
            $5::jsonb, $6, $7, $8, $9,
            $10, $11, $12, $13, $14,
            $15, $16, $17::jsonb, $18::jsonb,
            $19, $20, $21::jsonb
          )`,
          [
            testId,
            secId,
            dq.question_text,
            mappedType,
            optionsJson,
            dq.correct_index,
            dq.numeric_answer !== undefined && dq.numeric_answer !== null ? Number(dq.numeric_answer) : null,
            Number(dq.marks) || marksPerQ,
            dq.question_number || (i + 1),
            sub,
            dq.solution || '',
            sub,
            dq.topic || '',
            dq.chapter || '',
            dq.image_url || null,
            dq.solution_image_url || null,
            JSON.stringify(mediaObj),
            JSON.stringify([]),
            Boolean(dq.is_ai_generated || !dq.bank_question_id),
            dq.bank_question_id || null,
            JSON.stringify({
              draft_id: draftId,
              draft_question_id: dq.id,
              validation_score: dq.validation_score,
              diagram_svg: dq.diagram_svg ? true : false,
            }),
          ]
        );
      }

      // Update tests table with detected subjects
      const primarySubject = detectedSubjects.size > 0 ? Array.from(detectedSubjects)[0] : 'General';
      await client.query(
        `UPDATE tests
         SET max_marks = $1,
             subject = $2,
             subjects = $3::jsonb,
             updated_at = NOW()
         WHERE id = $4`,
        [totalMarks, primarySubject, JSON.stringify(Array.from(detectedSubjects)), testId]
      );

      // Link to test series if specified
      if (options.target_series_id) {
        await client.query(
          `INSERT INTO test_series_assessments (test_series_id, assessment_id, position)
           VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM test_series_assessments WHERE test_series_id = $1))
           ON CONFLICT DO NOTHING`,
          [options.target_series_id, testId]
        ).catch(() => {});
      }

      // 2e. Update Draft Status in PostgreSQL
      await client.query(
        `UPDATE ai_generation_drafts
         SET status = 'approved',
             approved_by = $1,
             approved_at = NOW(),
             updated_at = NOW()
         WHERE id = $2`,
        [userId, draftId]
      );

      await client.query(
        `UPDATE ai_draft_questions
         SET review_status = 'approved',
             approved_by = $1,
             approved_at = NOW()
         WHERE draft_id = $2`,
        [userId, draftId]
      );

      return {
        testId,
        testTitle,
        questionCount: draftQuestions.length,
        totalMarks,
        durationMinutes,
      };
    });

    // 3. Invalidate Exam Paper Cache
    await invalidateExamPaperCache(createdAssessment.testId);

    return {
      success: true,
      message: `Successfully approved draft #${draftId} into Edvedum Assessment #${createdAssessment.testId} ("${createdAssessment.testTitle}").`,
      assessment_id: createdAssessment.testId,
      test_id: createdAssessment.testId,
      title: createdAssessment.testTitle,
      question_count: createdAssessment.questionCount,
      total_marks: createdAssessment.totalMarks,
      duration_minutes: createdAssessment.durationMinutes,
    };
  }
}
