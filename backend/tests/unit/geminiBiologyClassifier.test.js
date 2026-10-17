import { describe, it, expect, vi } from 'vitest';
import {
  fallbackSingleBiologyQuestion,
  fallbackBiologyClassification,
  classifyBiologyQuestionsWithGemini
} from '../../src/utils/geminiVisionExtractor.js';

describe('Gemini Biology Classifier (Botany & Zoology)', () => {
  describe('Keyword & Content Detection', () => {
    it('classifies plant, cell, and genetics questions as Botany', () => {
      const q1 = {
        questionNumber: 95,
        question_text: 'Which organelle is responsible for photosynthesis in angiosperms?',
        options: [{ key: 'A', text: 'Mitochondria' }, { key: 'B', text: 'Chloroplast' }]
      };
      const res1 = fallbackSingleBiologyQuestion(q1);
      expect(res1.subject).toBe('Botany');

      const q2 = {
        questionNumber: 100,
        question_text: 'In Mendel dihybrid cross, what is the phenotypic ratio in F2 generation?',
        options: [{ key: 'A', text: '9:3:3:1' }]
      };
      const res2 = fallbackSingleBiologyQuestion(q2);
      expect(res2.subject).toBe('Botany');
    });

    it('classifies animal kingdom and human physiology questions as Zoology', () => {
      const q1 = {
        questionNumber: 140,
        question_text: 'The structural and functional unit of the human kidney is the nephron.',
        options: [{ key: 'A', text: 'Nephron' }, { key: 'B', text: 'Alveoli' }]
      };
      const res1 = fallbackSingleBiologyQuestion(q1);
      expect(res1.subject).toBe('Zoology');

      const q2 = {
        questionNumber: 155,
        question_text: 'According to Darwin theory of natural selection and evolution:',
        options: [{ key: 'A', text: 'Survival of the fittest' }]
      };
      const res2 = fallbackSingleBiologyQuestion(q2);
      expect(res2.subject).toBe('Zoology');
    });
  });

  describe('Positional Fallback for 180 NEET Layout', () => {
    it('maps Biology questions 91 to 135 to Botany and 136 to 180 to Zoology when ambiguous', () => {
      const ambiguousQ1 = {
        questionNumber: 92,
        question_text: 'Identify the correct statement regarding biological systems:',
        options: []
      };
      expect(fallbackSingleBiologyQuestion(ambiguousQ1).subject).toBe('Botany');

      const ambiguousQ2 = {
        questionNumber: 135,
        question_text: 'Consider the following statements:',
        options: []
      };
      expect(fallbackSingleBiologyQuestion(ambiguousQ2).subject).toBe('Botany');

      const ambiguousQ3 = {
        questionNumber: 136,
        question_text: 'Consider the following statements:',
        options: []
      };
      expect(fallbackSingleBiologyQuestion(ambiguousQ3).subject).toBe('Zoology');

      const ambiguousQ4 = {
        questionNumber: 180,
        question_text: 'Identify the correct statement:',
        options: []
      };
      expect(fallbackSingleBiologyQuestion(ambiguousQ4).subject).toBe('Zoology');
    });
  });

  describe('Batch Classification Helper', () => {
    it('classifies an entire array of biology questions properly', async () => {
      const list = [
        { questionNumber: 91, question_text: 'Photosynthesis happens in leaves' },
        { questionNumber: 136, question_text: 'The human heart pumps blood through arteries' },
      ];
      const results = await classifyBiologyQuestionsWithGemini(list, 'NEET Mock Test');
      expect(results[0].subject).toBe('Botany');
      expect(results[1].subject).toBe('Zoology');
    });
  });
});
