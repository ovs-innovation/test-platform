/**
 * AI Question Generation Engine
 * Handles batching (15-20 questions per LLM call), progress tracking,
 * partial failure tolerance, deduplication, and single-question regeneration.
 */

import { aiProvider } from './aiProvider.js';
import {
  buildAcademicSystemPrompt,
  buildQuestionGenerationPrompt,
  buildSingleQuestionRegenerationPrompt,
  AiQuestionBatchResultZodSchema,
  SingleAiGeneratedQuestionZodSchema,
} from './aiPromptTemplates.js';
import {
  createDraft,
  updateDraftStatus,
  saveDraftQuestions,
  getDraftById,
  replaceDraftQuestion,
} from './aiDraftService.js';

export const CHUNK_SIZE = 15; // Recommended batch size per AI call (15-20 questions)

export class AiQuestionGeneratorService {
  /**
   * Splits a total question count into chunks of max 20 questions
   */
  static partitionCount(totalCount, maxChunk = CHUNK_SIZE) {
    const total = Math.max(1, Number(totalCount) || 1);
    const chunks = [];
    let remaining = total;

    while (remaining > 0) {
      const take = Math.min(remaining, maxChunk);
      chunks.push(take);
      remaining -= take;
    }
    return chunks;
  }

  /**
   * Executes full batch generation for an incoming admin request
   *
   * @param {Object} input - Admin configuration payload
   * @param {number} [userId] - Admin user ID
   * @returns {Promise<{ draft_id: number, batch_id: string, total_generated: number, status: string, questions: Array }>}
   */
  static async generateBatch(input = {}, userId = null) {
    const requestedCount = Math.max(1, Math.min(50, Number(input.count) || 10));
    const examType = input.exam_type || 'NEET';
    const classLevel = input.class_level || '12';
    const subject = input.subject || 'Physics';
    const chapter = Array.isArray(input.chapters) && input.chapters.length
      ? input.chapters[0]
      : (input.chapter || 'Kinematics');
    const topic = input.topic || '';
    const difficulty = input.difficulty || 'Medium';
    const questionTypes = Array.isArray(input.question_types) && input.question_types.length
      ? input.question_types
      : ['Single MCQ'];
    const diagramReq = input.diagram_req || 'Optional';
    const explanationReq = input.explanation_req || 'Detailed Step-by-Step';
    const additionalInstructions = input.additional_instructions || '';
    const referenceContext = input.reference_context || '';

    // 1. Initialize Staging Draft in PostgreSQL
    const draft = await createDraft(
      {
        ...input,
        count: requestedCount,
        chapter,
      },
      userId
    );

    const draftId = draft.id;
    const batchId = draft.batch_id;

    console.info(
      `[AiQuestionGenerator] Starting batch generation for draft #${draftId} (${requestedCount} Qs, ${examType} - ${subject} - ${chapter})...`
    );

    // 2. Partition into chunks of 15-20 questions
    const chunkCounts = this.partitionCount(requestedCount, CHUNK_SIZE);
    const systemPrompt = buildAcademicSystemPrompt({ examType, classLevel });

    let totalSaved = 0;
    const savedQuestions = [];
    const errorsEncountered = [];

    // 3. Process each chunk sequentially with progress updates
    for (let cIdx = 0; cIdx < chunkCounts.length; cIdx++) {
      const chunkSize = chunkCounts[cIdx];
      const progressBase = Math.round(((cIdx) / chunkCounts.length) * 80) + 10;

      await updateDraftStatus(draftId, {
        progress: progressBase,
        status: 'processing',
      });

      console.info(
        `[AiQuestionGenerator] Draft #${draftId}: Executing chunk ${cIdx + 1}/${chunkCounts.length} (${chunkSize} Qs)...`
      );

      const userPrompt = buildQuestionGenerationPrompt({
        classLevel,
        examType,
        subject,
        chapter,
        topic,
        difficulty,
        count: chunkSize,
        questionTypes,
        diagramReq,
        explanationReq,
        additionalInstructions,
        referenceContext,
      });

      try {
        // Structured generation with Zod validation
        const aiResponse = await aiProvider.generateStructured({
          systemPrompt,
          prompt: userPrompt,
          schema: AiQuestionBatchResultZodSchema,
          schemaName: `QuestionBatchChunk_${cIdx + 1}`,
          model: input.model,
          temperature: 0.25,
          timeoutMs: 50000,
        });

        const rawQuestions = aiResponse.data?.questions || [];

        // Save chunk questions into database
        const chunkSaved = await saveDraftQuestions(draftId, batchId, rawQuestions);
        totalSaved += chunkSaved.length;
        savedQuestions.push(...chunkSaved);

        console.info(
          `[AiQuestionGenerator] Draft #${draftId}: Chunk ${cIdx + 1} succeeded. ${chunkSaved.length} questions persisted.`
        );
      } catch (chunkErr) {
        console.error(
          `[AiQuestionGenerator] Draft #${draftId}: Chunk ${cIdx + 1} failed:`,
          chunkErr.message
        );
        errorsEncountered.push(`Chunk ${cIdx + 1}: ${chunkErr.message}`);
        // Continue to next chunk (partial failure tolerance)
      }
    }

    // 4. Finalize Draft Status
    let finalStatus = 'completed';
    if (totalSaved === 0) {
      finalStatus = 'failed';
    } else if (errorsEncountered.length > 0 || totalSaved < requestedCount) {
      finalStatus = 'partial';
    }

    const updatedDraft = await updateDraftStatus(draftId, {
      status: finalStatus,
      progress: 100,
      totalGenerated: totalSaved,
      errorMessage: errorsEncountered.length ? errorsEncountered.join(' | ') : null,
    });

    console.info(
      `[AiQuestionGenerator] Draft #${draftId} finished with status "${finalStatus}". Total saved: ${totalSaved}/${requestedCount}.`
    );

    return {
      draft_id: draftId,
      batch_id: batchId,
      total_requested: requestedCount,
      total_generated: totalSaved,
      status: finalStatus,
      errors: errorsEncountered,
      draft: updatedDraft,
      questions: savedQuestions,
    };
  }

  /**
   * Regenerates a single question inside an existing draft
   */
  static async regenerateSingleQuestion(draftId, questionId, adminCritique = '') {
    const draftDetails = await getDraftById(draftId);
    if (!draftDetails) {
      throw new Error(`Draft #${draftId} not found`);
    }

    const targetQuestion = draftDetails.questions?.find((q) => Number(q.id) === Number(questionId));
    if (!targetQuestion) {
      throw new Error(`Question #${questionId} not found in draft #${draftId}`);
    }

    console.info(`[AiQuestionGenerator] Regenerating question #${questionId} in draft #${draftId}...`);

    const prompt = buildSingleQuestionRegenerationPrompt({
      originalQuestion: targetQuestion,
      adminCritique,
      examType: draftDetails.exam_type,
      subject: targetQuestion.subject,
      chapter: targetQuestion.chapter,
    });

    const systemPrompt = buildAcademicSystemPrompt({
      examType: draftDetails.exam_type,
      classLevel: draftDetails.class_level || '12',
    });

    const aiRes = await aiProvider.generateStructured({
      systemPrompt,
      prompt,
      schema: SingleAiGeneratedQuestionZodSchema,
      schemaName: `SingleRegenQuestion_${questionId}`,
      temperature: 0.35, // Slightly higher temperature for fresh question diversity
      timeoutMs: 30000,
    });

    const replacement = aiRes.data;
    const updated = await replaceDraftQuestion(draftId, questionId, replacement);

    console.info(`[AiQuestionGenerator] Question #${questionId} successfully replaced with regenerated content.`);

    return {
      success: true,
      question: updated,
    };
  }
}
