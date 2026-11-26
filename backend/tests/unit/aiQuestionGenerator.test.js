import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  normalizeQuestionType,
  buildAcademicSystemPrompt,
  buildQuestionGenerationPrompt,
  buildSingleQuestionRegenerationPrompt,
  SingleAiGeneratedQuestionZodSchema,
  AiQuestionBatchResultZodSchema,
} from '../../src/services/ai/aiPromptTemplates.js';
import {
  AiQuestionGeneratorService,
  CHUNK_SIZE,
} from '../../src/services/ai/aiQuestionGeneratorService.js';
import { aiProvider } from '../../src/services/ai/aiProvider.js';
import * as aiDraftService from '../../src/services/ai/aiDraftService.js';

describe('AI Question Generation Engine Suite', () => {
  // =========================================================================
  // 1. Prompt Templates & Question Type Normalization
  // =========================================================================
  describe('aiPromptTemplates & Question Normalization', () => {
    it('normalizes various input question types to internal enum keys', () => {
      expect(normalizeQuestionType('Single MCQ')).toBe('single_choice');
      expect(normalizeQuestionType('Single Correct')).toBe('single_choice');
      expect(normalizeQuestionType('Multiple Correct MCQ')).toBe('multi_select');
      expect(normalizeQuestionType('Assertion-Reason')).toBe('assertion_reason');
      expect(normalizeQuestionType('Integer')).toBe('integer');
      expect(normalizeQuestionType('Numerical')).toBe('numerical');
      expect(normalizeQuestionType('Match the Following')).toBe('match_the_following');
      expect(normalizeQuestionType('Passage-based')).toBe('passage');
    });

    it('builds system prompt with distinct exam guidance for NEET vs JEE', () => {
      const neetPrompt = buildAcademicSystemPrompt({ examType: 'NEET', classLevel: '12' });
      expect(neetPrompt).toContain('NEET UG');
      expect(neetPrompt).toContain('Class 12');
      expect(neetPrompt).toContain('ZERO AMBIGUITY');

      const jeePrompt = buildAcademicSystemPrompt({ examType: 'JEE', classLevel: '11' });
      expect(jeePrompt).toContain('JEE Main & JEE Advanced');
      expect(jeePrompt).toContain('Class 11');
    });

    it('constructs detailed question generation prompt including diagram and LaTeX constraints', () => {
      const prompt = buildQuestionGenerationPrompt({
        classLevel: '12',
        examType: 'NEET',
        subject: 'Physics',
        chapter: 'Current Electricity',
        topic: 'Kirchhoff Laws & Wheatstone Bridge',
        difficulty: 'Hard',
        count: 15,
        questionTypes: ['Single MCQ', 'Assertion-Reason'],
        diagramReq: 'Required',
        explanationReq: 'Detailed Step-by-Step',
        additionalInstructions: 'Include numerical resistor values',
      });

      expect(prompt).toContain('Current Electricity');
      expect(prompt).toContain('Kirchhoff Laws & Wheatstone Bridge');
      expect(prompt).toContain('single_choice, assertion_reason');
      expect(prompt).toContain('Include numerical resistor values');
      expect(prompt).toContain('content_type');
    });

    it('constructs single question regeneration prompt incorporating admin critique', () => {
      const original = {
        question_number: 3,
        question_type: 'single_choice',
        subject: 'Physics',
        chapter: 'Electrostatics',
        topic: 'Gauss Law',
        difficulty: 'Medium',
        question_text: 'What is flux through sphere?',
        marks: 4,
        negative_marks: 1,
      };

      const prompt = buildSingleQuestionRegenerationPrompt({
        originalQuestion: original,
        adminCritique: 'The options were duplicate and calculation was trivial.',
        examType: 'JEE',
        subject: 'Physics',
        chapter: 'Electrostatics',
      });

      expect(prompt).toContain('The options were duplicate and calculation was trivial.');
      expect(prompt).toContain('Gauss Law');
    });
  });

  // =========================================================================
  // 2. Schema Validation across Question Formats
  // =========================================================================
  describe('Zod Schema Validation for Competitive Formats', () => {
    it('validates a Single Correct MCQ with LaTeX', () => {
      const mcq = {
        question_number: 1,
        question_type: 'single_choice',
        subject: 'Physics',
        chapter: 'Ray Optics',
        topic: 'Prism Deviation',
        difficulty: 'Medium',
        question_text: 'A light ray passes through an equilateral prism with refractive index $\\mu = \\sqrt{2}$. The angle of minimum deviation is:',
        options: ['30°', '45°', '60°', '90°'],
        correct_index: 0,
        correct_answer: '30°',
        solution: 'Using prism formula $\\mu = \\frac{\\sin((A+\\delta_m)/2)}{\\sin(A/2)}$, substituting $A=60^\\circ$ yields $\\delta_m = 30^\\circ$.',
        marks: 4,
        negative_marks: 1,
        content_type: 'text',
      };

      const res = SingleAiGeneratedQuestionZodSchema.safeParse(mcq);
      expect(res.success).toBe(true);
      expect(res.data.correct_index).toBe(0);
    });

    it('validates an Assertion-Reason question', () => {
      const arQuestion = {
        question_number: 2,
        question_type: 'assertion_reason',
        subject: 'Chemistry',
        chapter: 'Chemical Bonding',
        topic: 'Dipole Moment',
        difficulty: 'Hard',
        question_text: 'Consider the following statements regarding $BF_3$ and $NF_3$ molecules.',
        assertion_text: 'The dipole moment of $BF_3$ is zero while that of $NF_3$ is non-zero.',
        reason_text: '$BF_3$ has a trigonal planar geometry where bond dipoles cancel out symmetrically.',
        options: [
          'Both Assertion and Reason are true and Reason is the correct explanation',
          'Both Assertion and Reason are true but Reason is NOT the correct explanation',
          'Assertion is true but Reason is false',
          'Assertion is false but Reason is true',
        ],
        correct_index: 0,
        correct_answer: 'A',
        solution: 'In $BF_3$, $sp^2$ planar symmetry causes vector cancellation of B-F bonds resulting in $\\mu = 0$. In $NF_3$, lone pair moment opposes N-F bonds, leaving net $\\mu \\neq 0$.',
        marks: 4,
        negative_marks: 1,
        content_type: 'text',
      };

      const res = SingleAiGeneratedQuestionZodSchema.safeParse(arQuestion);
      expect(res.success).toBe(true);
      expect(res.data.assertion_text).toBeDefined();
    });

    it('validates a Numerical / Integer question with decimal answer', () => {
      const numQuestion = {
        question_number: 3,
        question_type: 'numerical',
        subject: 'Physics',
        chapter: 'Current Electricity',
        topic: 'Potentiometer',
        difficulty: 'Hard',
        question_text: 'A potentiometer wire of length 10 m has a resistance of 20 $\\Omega$. The balancing length for 1.5 V cell is:',
        numeric_answer: 7.5,
        numerical_tolerance: 0.1,
        correct_answer: '7.5',
        solution: 'Potential gradient $k = V/L = 0.2\\text{ V/m}$. Balancing length $l = E/k = 1.5 / 0.2 = 7.5\\text{ m}$.',
        marks: 4,
        negative_marks: 1,
        content_type: 'text',
      };

      const res = SingleAiGeneratedQuestionZodSchema.safeParse(numQuestion);
      expect(res.success).toBe(true);
      expect(res.data.numeric_answer).toBe(7.5);
    });

    it('validates a Match the Following question with paired columns', () => {
      const matchQuestion = {
        question_number: 4,
        question_type: 'match_the_following',
        subject: 'Botany',
        chapter: 'Plant Kingdom',
        topic: 'Algae Classification',
        difficulty: 'Medium',
        question_text: 'Match List-I (Class of Algae) with List-II (Stored Food material):',
        match_pairs: {
          column_a: [
            { id: 'A', text: 'Chlorophyceae' },
            { id: 'B', text: 'Phaeophyceae' },
            { id: 'C', text: 'Rhodophyceae' },
          ],
          column_b: [
            { id: 'I', text: 'Floridean starch' },
            { id: 'II', text: 'Mannitol & Laminarin' },
            { id: 'III', text: 'Starch' },
          ],
        },
        options: [
          'A-III, B-II, C-I',
          'A-I, B-II, C-III',
          'A-II, B-I, C-III',
          'A-III, B-I, C-II',
        ],
        correct_index: 0,
        correct_answer: 'A-III, B-II, C-I',
        solution: 'Chlorophyceae stores starch; Phaeophyceae stores mannitol/laminarin; Rhodophyceae stores floridean starch.',
        marks: 4,
        negative_marks: 1,
        content_type: 'text',
      };

      const res = SingleAiGeneratedQuestionZodSchema.safeParse(matchQuestion);
      expect(res.success).toBe(true);
      expect(res.data.match_pairs.column_a).toHaveLength(3);
    });

    it('validates a Diagram-based question with neutral reference markers', () => {
      const diagramQuestion = {
        question_number: 5,
        question_type: 'single_choice',
        subject: 'Physics',
        chapter: 'Current Electricity',
        topic: 'Resistor Bridge',
        difficulty: 'Hard',
        question_text: 'In the circuit diagram shown, determine the equivalent resistance between nodes A and B.',
        options: ['2 $\\Omega$', '4 $\\Omega$', '8 $\\Omega$', '16 $\\Omega$'],
        correct_index: 1,
        correct_answer: '4 $\\Omega$',
        solution: 'Recognizing bridge balance condition $\\frac{R_1}{R_2} = \\frac{R_3}{R_4}$, central resistor carries 0 current. $R_{eq} = 4\\,\\Omega$.',
        marks: 4,
        negative_marks: 1,
        content_type: 'diagram',
        diagram_metadata: {
          has_diagram: true,
          diagram_type: 'circuit',
          diagram_description: 'Wheatstone bridge network with five resistors labeled R1, R2, R3, R4, R5 connected across terminals A and B.',
          diagram_reference_labels: ['A', 'B', 'R_1', 'R_2', 'R_3', 'R_4', 'R_5'],
        },
      };

      const res = SingleAiGeneratedQuestionZodSchema.safeParse(diagramQuestion);
      expect(res.success).toBe(true);
      expect(res.data.diagram_metadata.has_diagram).toBe(true);
      expect(res.data.diagram_metadata.diagram_reference_labels).toContain('R_1');
    });
  });

  // =========================================================================
  // 3. Partitioning & Batch Chunk Execution
  // =========================================================================
  describe('AiQuestionGeneratorService Execution', () => {
    it('correctly partitions counts into chunks of max CHUNK_SIZE (15)', () => {
      expect(AiQuestionGeneratorService.partitionCount(5)).toEqual([5]);
      expect(AiQuestionGeneratorService.partitionCount(15)).toEqual([15]);
      expect(AiQuestionGeneratorService.partitionCount(20)).toEqual([15, 5]);
      expect(AiQuestionGeneratorService.partitionCount(35)).toEqual([15, 15, 5]);
      expect(AiQuestionGeneratorService.partitionCount(50)).toEqual([15, 15, 15, 5]);
    });

    it('successfully processes full batch generation, calling AI and persisting to staging draft', async () => {
      const mockDraft = {
        id: 101,
        batch_id: 'ai-mock-123',
        status: 'processing',
      };

      vi.spyOn(aiDraftService, 'createDraft').mockResolvedValue(mockDraft);
      vi.spyOn(aiDraftService, 'updateDraftStatus').mockImplementation(async (id, data) => ({
        ...mockDraft,
        ...data,
      }));

      const mockAiBatchResult = {
        batch_title: 'NEET Physics - Kinematics',
        exam_type: 'NEET',
        subject: 'Physics',
        chapter: 'Kinematics',
        topic: 'Projectile Motion',
        questions: [
          {
            question_number: 1,
            question_type: 'single_choice',
            subject: 'Physics',
            chapter: 'Kinematics',
            topic: 'Projectile Motion',
            difficulty: 'Medium',
            question_text: 'A projectile is fired at an angle of 45° with velocity 20 m/s. The maximum height is:',
            options: ['10 m', '20 m', '30 m', '40 m'],
            correct_index: 0,
            correct_answer: '10 m',
            solution: '$H = \\frac{u^2 \\sin^2(45^\\circ)}{2g} = \\frac{400 \\times 0.5}{20} = 10\\text{ m}$.',
            marks: 4,
            negative_marks: 1,
            content_type: 'text',
          },
        ],
      };

      vi.spyOn(aiProvider, 'generateStructured').mockResolvedValue({
        success: true,
        data: mockAiBatchResult,
        usage: { promptTokens: 300, completionTokens: 150, estimatedCostUsd: 0.0001 },
        model: 'gemini-3.8-flash',
      });

      vi.spyOn(aiDraftService, 'saveDraftQuestions').mockResolvedValue(mockAiBatchResult.questions);

      const result = await AiQuestionGeneratorService.generateBatch({
        exam_type: 'NEET',
        class_level: '12',
        subject: 'Physics',
        chapter: 'Kinematics',
        count: 1,
      });

      expect(result.draft_id).toBe(101);
      expect(result.total_generated).toBe(1);
      expect(result.status).toBe('completed');
      expect(result.questions).toHaveLength(1);
    });

    it('tolerates partial chunk failures without failing previous successful questions', async () => {
      const mockDraft = { id: 102, batch_id: 'ai-partial-123', status: 'processing' };
      vi.spyOn(aiDraftService, 'createDraft').mockResolvedValue(mockDraft);
      vi.spyOn(aiDraftService, 'updateDraftStatus').mockImplementation(async (id, data) => ({
        ...mockDraft,
        ...data,
      }));

      // 20 questions partitions to [15, 5]
      let callNum = 0;
      vi.spyOn(aiProvider, 'generateStructured').mockImplementation(async () => {
        callNum++;
        if (callNum === 1) {
          // First chunk succeeds with 15 questions
          return {
            success: true,
            data: {
              batch_title: 'NEET',
              exam_type: 'NEET',
              subject: 'Physics',
              chapter: 'Kinematics',
              topic: 'Core',
              questions: Array(15).fill({
                question_number: 1,
                question_type: 'single_choice',
                subject: 'Physics',
                chapter: 'Kinematics',
                topic: 'Core',
                difficulty: 'Medium',
                question_text: 'Valid question',
                options: ['A', 'B', 'C', 'D'],
                correct_index: 0,
                correct_answer: 'A',
                solution: 'Detailed solution step.',
                marks: 4,
                negative_marks: 1,
                content_type: 'text',
              }),
            },
          };
        } else {
          // Second chunk fails with timeout or rate limit
          throw new Error('API Rate limit exceeded on chunk 2');
        }
      });

      vi.spyOn(aiDraftService, 'saveDraftQuestions').mockImplementation(async (id, bId, qs) => qs);

      const result = await AiQuestionGeneratorService.generateBatch({
        exam_type: 'NEET',
        class_level: '12',
        subject: 'Physics',
        chapter: 'Kinematics',
        count: 20,
      });

      // Status should be 'partial' with 15 questions saved and 1 error reported
      expect(result.status).toBe('partial');
      expect(result.total_generated).toBe(15);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('Chunk 2: API Rate limit exceeded');
    });

    it('regenerates a single question with feedback and updates staging', async () => {
      const mockDraft = {
        id: 103,
        exam_type: 'JEE',
        subject: 'Physics',
        questions: [
          {
            id: 55,
            question_number: 1,
            question_type: 'single_choice',
            subject: 'Physics',
            chapter: 'Oscillations',
            topic: 'SHM',
            difficulty: 'Medium',
            question_text: 'Original defective question',
            marks: 4,
            negative_marks: 1,
          },
        ],
      };

      vi.spyOn(aiDraftService, 'getDraftById').mockResolvedValue(mockDraft);

      const replacementQuestion = {
        question_number: 1,
        question_type: 'single_choice',
        subject: 'Physics',
        chapter: 'Oscillations',
        topic: 'SHM',
        difficulty: 'Medium',
        question_text: 'A particle executes SHM with amplitude A. At what displacement from mean position is kinetic energy equal to potential energy?',
        options: ['A/2', 'A/\\sqrt{2}', 'A/\\sqrt{3}', 'A/4'],
        correct_index: 1,
        correct_answer: 'A/\\sqrt{2}',
        solution: 'Setting $\\frac{1}{2}m\\omega^2(A^2 - x^2) = \\frac{1}{2}m\\omega^2 x^2 \\implies A^2 - x^2 = x^2 \\implies x = A/\\sqrt{2}$.',
        marks: 4,
        negative_marks: 1,
        content_type: 'text',
      };

      vi.spyOn(aiProvider, 'generateStructured').mockResolvedValue({
        success: true,
        data: replacementQuestion,
        usage: { promptTokens: 200, completionTokens: 100 },
      });

      vi.spyOn(aiDraftService, 'replaceDraftQuestion').mockResolvedValue({
        ...replacementQuestion,
        id: 55,
        review_status: 'regenerated',
      });

      const result = await AiQuestionGeneratorService.regenerateSingleQuestion(
        103,
        55,
        'Make the calculation require energy conservation.'
      );

      expect(result.success).toBe(true);
      expect(result.question.review_status).toBe('regenerated');
      expect(result.question.correct_answer).toBe('A/\\sqrt{2}');
    });
  });
});
