import { describe, it, expect, vi } from 'vitest';
import {
  isMultiSelectQuestion,
  sanitizeQuestion,
  getOrSetQuestionMeta,
  invalidateQuestionMeta,
  invalidateExamPaperCache,
  getOrSetCachedInstitution,
} from '../../../src/services/examCacheService.js';

describe('examCacheService — Exam Paper & CBT Reliability', () => {
  describe('isMultiSelectQuestion', () => {
    it('correctly identifies single choice vs multiple choice', () => {
      expect(isMultiSelectQuestion({ question_type: 'single_choice' })).toBe(false);
      expect(isMultiSelectQuestion({ question_type: 'mcq', correct_indices: [1] })).toBe(false);
      expect(isMultiSelectQuestion({ question_type: 'multi_select' })).toBe(true);
      expect(isMultiSelectQuestion({ question_type: 'multiple_correct' })).toBe(true);
      expect(isMultiSelectQuestion({ question_type: 'mcq', correct_indices: [0, 2] })).toBe(true);
      expect(isMultiSelectQuestion({ question_text: 'Select all that apply for this reaction' })).toBe(true);
      expect(isMultiSelectQuestion(null)).toBe(false);
    });
  });

  describe('sanitizeQuestion', () => {
    it('strictly removes answer keys, solutions, and explanations from student view', () => {
      const rawQuestion = {
        id: 42,
        section_id: 5,
        question_type: 'mcq',
        question_text: 'What is Newton’s Second Law?',
        options: ['F=ma', 'E=mc^2', 'V=IR', 'P=VI'],
        correct_index: 0,
        correct_indices: [0],
        solution: 'Force equals mass times acceleration.',
        solution_image_url: 'https://cdn.example.com/sol.png',
        numeric_answer: null,
        marks: 4,
        position: 1,
        subject: 'Physics',
      };

      const sanitized = sanitizeQuestion(rawQuestion);

      expect(sanitized.id).toBe(42);
      expect(sanitized.question_text).toBe('What is Newton’s Second Law?');
      expect(sanitized.options).toEqual(['F=ma', 'E=mc^2', 'V=IR', 'P=VI']);
      expect(sanitized.marks).toBe(4);
      expect(sanitized.position).toBe(1);
      expect(sanitized.subject).toBe('Physics');

      // Crucial security asserts: No answers or solutions leaked!
      expect(sanitized).not.toHaveProperty('correct_index');
      expect(sanitized).not.toHaveProperty('correct_indices');
      expect(sanitized).not.toHaveProperty('solution');
      expect(sanitized).not.toHaveProperty('solution_image_url');
    });

    it('handles coding question types safely', () => {
      const codingQ = {
        id: 88,
        question_type: 'coding',
        question_text: 'Implement twoSum',
        starter_code: 'function twoSum() {}',
        language: 'javascript',
        test_cases: [{ input: '[2,7,11,15], 9', output: '[0,1]' }], // Hidden test cases
      };

      const sanitized = sanitizeQuestion(codingQ);
      expect(sanitized.starter_code).toBe('function twoSum() {}');
      expect(sanitized.language).toBe('javascript');
      expect(sanitized).not.toHaveProperty('test_cases');
    });
  });

  describe('Cache and Invalidation Safety', () => {
    it('invalidateExamPaperCache handles numerical and string IDs safely without throwing', async () => {
      await expect(invalidateExamPaperCache(101)).resolves.not.toThrow();
      await expect(invalidateExamPaperCache('101')).resolves.not.toThrow();
      await expect(invalidateExamPaperCache(null)).resolves.not.toThrow();
      await expect(invalidateExamPaperCache(undefined)).resolves.not.toThrow();
      await expect(invalidateExamPaperCache('invalid')).resolves.not.toThrow();
    });

    it('invalidateQuestionMeta handles IDs safely', async () => {
      await expect(invalidateQuestionMeta(50)).resolves.not.toThrow();
      await expect(invalidateQuestionMeta(null)).resolves.not.toThrow();
    });

    it('getOrSetQuestionMeta returns fallback meta for non-numeric ID', async () => {
      const meta = await getOrSetQuestionMeta(null);
      expect(meta).toEqual({ question_type: 'mcq', is_multi: false });
    });

    it('getOrSetCachedInstitution returns null for invalid ID', async () => {
      const inst = await getOrSetCachedInstitution('invalid');
      expect(inst).toBeNull();
    });
  });
});
