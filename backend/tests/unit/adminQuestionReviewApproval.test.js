/**
 * Phase 8: Admin Question Review & Approval Engine Test Suite
 * Tests draft question preview, inline editing, regeneration, rejection,
 * single & batch approval into question_bank, duplicate insertion protection,
 * audit trail logging, and answer key protection.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { query } from '../../src/config/db.js';
import {
  createDraft,
  saveDraftQuestions,
  getDraftById,
  updateDraftQuestion,
  approveDraftToQuestionBank,
  rejectDraftQuestion,
  regenerateDraftQuestionDiagram,
  deleteDraft,
} from '../../src/services/ai/aiDraftService.js';

describe('Phase 8: Admin Question Review and Approval System', () => {
  let testDraftId = null;
  let testQuestionIds = [];
  const mockAdminId = 1;

  beforeAll(async () => {
    // 0. Clean any leftover test rows from question_bank
    await query("DELETE FROM question_bank WHERE question_text LIKE '%barrier potential $V_0$ opposes%' OR question_text LIKE '%Current through resistor%'");

    // 1. Create a staging draft batch for review testing
    const draft = await createDraft({
      title: 'Review System Integration Batch',
      exam_type: 'JEE',
      class_level: '12',
      subject: 'Physics',
      chapter: 'Semiconductor',
      topic: 'Logic Gates and Diodes',
      difficulty: 'Medium',
      question_types: ['single_choice', 'numerical', 'assertion_reason'],
      count: 3,
    }, mockAdminId);

    testDraftId = draft.id;

    // 2. Stage test questions inside the draft
    const staged = await saveDraftQuestions(testDraftId, draft.batch_id, [
      {
        question_number: 1,
        question_type: 'single_choice',
        subject: 'Physics',
        chapter: 'Semiconductor',
        topic: 'Diodes',
        difficulty: 'Medium',
        question_text: 'In a forward-biased p-n junction diode, the width of the depletion layer $d$ is:',
        options: ['Increases', 'Decreases', 'Remains unchanged', 'Becomes infinite'],
        correct_index: 1,
        solution: 'Under forward bias, the applied external voltage opposes the built-in potential barrier, reducing the width of the depletion layer.',
        marks: 4,
        negative_marks: 1,
        diagram_metadata: {
          has_diagram: true,
          diagram_type: 'circuit',
          diagram_description: 'Forward biased p-n junction diode circuit with DC source',
        },
      },
      {
        question_number: 2,
        question_type: 'numerical',
        subject: 'Physics',
        chapter: 'Semiconductor',
        topic: 'Zener Diode',
        difficulty: 'Hard',
        question_text: 'A Zener diode with breakdown voltage $V_Z = 10\\text{ V}$ is connected in series with a resistor $R = 200\\,\\Omega$. If input voltage is $20\\text{ V}$, the current through the resistor is $I = \\dots\\times 10^{-2}\\text{ A}$.',
        numeric_answer: 5,
        numerical_tolerance: 0.1,
        solution: 'Current through resistor: $I = (V_{in} - V_Z)/R = (20 - 10)/200 = 10/200 = 0.05\\text{ A} = 5\\times 10^{-2}\\text{ A}$.',
        marks: 4,
        negative_marks: 0,
      },
      {
        question_number: 3,
        question_type: 'assertion_reason',
        subject: 'Physics',
        chapter: 'Semiconductor',
        topic: 'Intrinsic Semiconductors',
        difficulty: 'Easy',
        question_text: 'Assertion: At absolute zero, pure silicon behaves as a perfect insulator. Reason: At $0\\text{ K}$, all valence electrons are tightly bound in covalent bonds.',
        assertion_text: 'At absolute zero, pure silicon behaves as a perfect insulator.',
        reason_text: 'At 0 K, all valence electrons are tightly bound in covalent bonds.',
        options: [
          'Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.',
          'Both Assertion and Reason are true, but Reason is not the correct explanation.',
          'Assertion is true, but Reason is false.',
          'Assertion is false, but Reason is true.',
        ],
        correct_index: 0,
        solution: 'At absolute zero (0 K), no thermal energy is available to break covalent bonds; hence the conduction band is completely empty and valence band is completely full.',
        marks: 4,
        negative_marks: 1,
      },
    ]);

    testQuestionIds = staged.map((q) => q.id);
  });

  afterAll(async () => {
    // Cleanup created test records
    if (testDraftId) {
      await deleteDraft(testDraftId).catch(() => {});
    }
    // Clean any approved test questions from question_bank
    await query(`DELETE FROM question_bank WHERE question_text LIKE '%forward-biased p-n junction diode%'`).catch(() => {});
    await query(`DELETE FROM question_bank WHERE question_text LIKE '%A Zener diode with breakdown voltage%'`).catch(() => {});
  });

  // ---------------------------------------------------------------------------
  // 1. DRAFT PREVIEW & VALIDATION REPORTS
  // ---------------------------------------------------------------------------
  describe('Draft & Question Preview', () => {
    it('retrieves draft batch with all questions, LaTeX expressions, and validation details', async () => {
      const draftDetail = await getDraftById(testDraftId);

      expect(draftDetail).toBeDefined();
      expect(draftDetail.id).toBe(String(testDraftId));
      expect(draftDetail.exam_type).toBe('JEE');
      expect(draftDetail.subject).toBe('Physics');
      expect(draftDetail.chapter).toBe('Semiconductor');
      expect(draftDetail.questions).toHaveLength(3);

      const q1 = draftDetail.questions[0];
      expect(q1.question_text).toContain('depletion layer $d$');
      expect(q1.options).toHaveLength(4);
      expect(q1.correct_index).toBe(1);
      expect(q1.solution).toContain('forward bias');
      expect(q1.validation_status).toBeDefined();
      expect(q1.validation_score).toBeGreaterThan(0);
    });
  });

  // ---------------------------------------------------------------------------
  // 2. INLINE QUESTION EDITING
  // ---------------------------------------------------------------------------
  describe('Inline Question Editing', () => {
    it('allows admin to edit question text, options, correct answer, and explanation with modified_by tracking', async () => {
      const qId = testQuestionIds[0];

      const patchData = {
        question_text: 'In an unbiased p-n junction, the barrier potential $V_0$ opposes:',
        options: [
          'Flow of majority carriers across the junction',
          'Flow of minority carriers across the junction',
          'Both majority and minority carriers',
          'Generation of electron-hole pairs',
        ],
        correct_index: 0,
        difficulty: 'Hard',
        solution: 'The built-in barrier potential opposes the forward diffusion of majority carriers across the depletion barrier.',
        admin_notes: 'Edited statement for precision and aligned with JEE Advanced syllabus.',
      };

      const updated = await updateDraftQuestion(testDraftId, qId, patchData, mockAdminId);

      expect(updated).toBeDefined();
      expect(updated.question_text).toBe(patchData.question_text);
      expect(updated.correct_index).toBe(0);
      expect(updated.difficulty).toBe('Hard');
      expect(updated.solution).toBe(patchData.solution);
      expect(updated.admin_notes).toBe(patchData.admin_notes);
      expect(updated.modified_by).toBe(mockAdminId);

      // Re-validation must have automatically run
      expect(updated.validation_report).toBeDefined();
      expect(updated.validation_score).toBeGreaterThanOrEqual(70);
    });
  });

  // ---------------------------------------------------------------------------
  // 3. QUESTION REJECTION
  // ---------------------------------------------------------------------------
  describe('Question Rejection with Audit Reason', () => {
    it('marks a draft question as rejected with reason and tracks who rejected it', async () => {
      const qId = testQuestionIds[2]; // Assertion-reason question
      const reason = 'Assertion statement overlaps with another question in batch.';

      const rejected = await rejectDraftQuestion(testDraftId, qId, reason, mockAdminId);

      expect(rejected).toBeDefined();
      expect(rejected.review_status).toBe('rejected');
      expect(rejected.validation_status).toBe('rejected');
      expect(rejected.rejection_reason).toBe(reason);
      expect(rejected.modified_by).toBe(mockAdminId);

      // Verify draft summary counters updated
      const draftDetail = await getDraftById(testDraftId);
      expect(draftDetail.rejected_count).toBeGreaterThanOrEqual(1);
    });
  });

  // ---------------------------------------------------------------------------
  // 4. DIAGRAM REGENERATION
  // ---------------------------------------------------------------------------
  describe('Diagram Regeneration', () => {
    it('regenerates diagram for a draft question, updating SVG content and re-validating', async () => {
      const qId = testQuestionIds[0];

      const result = await regenerateDraftQuestionDiagram(
        testDraftId,
        qId,
        {
          prompt: 'P-N junction diode under forward bias with DC battery and milliammeter',
          markers: ['P', 'N', 'V_ext', 'mA'],
          method: 'programmatic',
        },
        mockAdminId
      );

      expect(result).toBeDefined();
      expect(result.question).toBeDefined();
      expect(result.question.has_diagram).toBe(true);
      expect(result.question.image_url).toBeDefined();
      expect(result.question.diagram_svg).toContain('<svg');
      expect(result.diagramAsset).toBeDefined();
      expect(result.diagramAsset.review_status).toBeDefined();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. APPROVAL INTO QUESTION BANK & DUPLICATE PROTECTION
  // ---------------------------------------------------------------------------
  describe('Approval into Production Question Bank', () => {
    it('approves a single draft question into question_bank with full relational schema and audit tracking', async () => {
      const qId = testQuestionIds[0];

      const approvalResult = await approveDraftToQuestionBank(testDraftId, [qId], mockAdminId);

      expect(approvalResult).toBeDefined();
      expect(approvalResult.count).toBe(1);
      expect(approvalResult.insertedIds).toHaveLength(1);

      const bankId = approvalResult.insertedIds[0];
      expect(bankId).toBeDefined();

      // Verify the record inside production question_bank
      const qbRes = await query('SELECT * FROM question_bank WHERE id = $1', [bankId]);
      expect(qbRes.rows).toHaveLength(1);
      const qbRow = qbRes.rows[0];

      expect(qbRow.category).toBe('Physics');
      expect(qbRow.exam_type).toBe('JEE');
      expect(qbRow.chapter).toBe('Semiconductor');
      expect(qbRow.question_text).toContain('barrier potential $V_0$ opposes');
      expect(qbRow.correct_index).toBe(0);
      expect(qbRow.status).toBe('available');
      expect(qbRow.is_ai_generated).toBe(true);
      expect(qbRow.image_url).toBeDefined();

      // Verify audit trail on ai_draft_questions
      const draftQRes = await query('SELECT * FROM ai_draft_questions WHERE id = $1', [qId]);
      const draftQ = draftQRes.rows[0];
      expect(draftQ.bank_question_id).toBe(String(bankId));
      expect(draftQ.review_status).toBe('approved');
      expect(draftQ.validation_status).toBe('approved');
      expect(draftQ.approved_by).toBe(mockAdminId);
      expect(draftQ.approved_at).toBeDefined();
    });

    it('PREVENTS duplicate approval and duplicate insertion into question_bank', async () => {
      const qId = testQuestionIds[0];

      // Re-approving the same question must be safely blocked
      const reApprovalResult = await approveDraftToQuestionBank(testDraftId, [qId], mockAdminId);

      expect(reApprovalResult).toBeDefined();
      expect(reApprovalResult.count).toBe(0);
      expect(reApprovalResult.alreadyApprovedCount).toBe(1);
      expect(reApprovalResult.message).toContain('already been approved');

      // Verify no duplicate row was created in question_bank
      const qbRes = await query(
        `SELECT COUNT(*)::int AS count FROM question_bank WHERE question_text LIKE '%barrier potential $V_0$ opposes%'`
      );
      expect(qbRes.rows[0].count).toBe(1);
    });

    it('approves numerical question and verifies numerical answer format in question_bank', async () => {
      const qId = testQuestionIds[1]; // Numerical question

      const approvalResult = await approveDraftToQuestionBank(testDraftId, [qId], mockAdminId);

      expect(approvalResult.count).toBe(1);
      const bankId = approvalResult.insertedIds[0];

      const qbRes = await query('SELECT * FROM question_bank WHERE id = $1', [bankId]);
      const qbRow = qbRes.rows[0];

      expect(Number(qbRow.numeric_answer)).toBe(5);
      expect(Number(qbRow.numerical_tolerance)).toBe(0.1);
      expect(qbRow.solution).toContain('Current through resistor');
    });

    it('ignores rejected questions during bulk approval', async () => {
      const qIdRejected = testQuestionIds[2]; // Marked as rejected earlier

      const bulkResult = await approveDraftToQuestionBank(testDraftId, [qIdRejected], mockAdminId);
      expect(bulkResult.count).toBe(0);
    });
  });

  // ---------------------------------------------------------------------------
  // 6. SECURITY: DRAFTS NEVER EXPOSED TO STUDENTS
  // ---------------------------------------------------------------------------
  describe('Student-Facing Draft Isolation Security', () => {
    it('guarantees that draft questions remain strictly isolated and never queried in student assessment flows', async () => {
      // In student assessment fetching, only question_bank with status = 'available' is queried
      const studentQueryRes = await query(`
        SELECT COUNT(*)::int AS count 
        FROM question_bank 
        WHERE status = 'available' AND (ai_metadata->>'draft_id') = $1
      `, [String(testDraftId)]);

      // Only the 2 approved questions (Q1 and Q2) exist in question_bank. Q3 (rejected) must never enter question_bank!
      expect(studentQueryRes.rows[0].count).toBe(2);

      // Verify Q3 is NOT in question_bank
      const q3Check = await query(`
        SELECT COUNT(*)::int AS count 
        FROM question_bank 
        WHERE (ai_metadata->>'draft_question_id') = $1
      `, [String(testQuestionIds[2])]);

      expect(q3Check.rows[0].count).toBe(0);
    });
  });

  afterAll(async () => {
    if (testDraftId) {
      await deleteDraft(testDraftId).catch(() => {});
    }
    await query("DELETE FROM question_bank WHERE question_text LIKE '%barrier potential $V_0$ opposes%' OR question_text LIKE '%Current through resistor%'").catch(() => {});
  });
});
