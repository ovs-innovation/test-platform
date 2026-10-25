import { describe, it, expect, vi, beforeEach } from 'vitest';
import { normalizeQuestionBankPayload } from '../../../backend/src/utils/questionBankPayload.js';

describe('Question Bank Integer Question Type Normalization & Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('correctly normalizes integer question type payload: clears options, preserves integer numeric_answer, and nulls correct_index', () => {
    const rawPayload = {
      category: 'Mathematics',
      question_type: 'integer',
      question_text: 'What is 5 + 7?',
      options: 'A|B|C|D',
      correct_index: 0,
      numeric_answer: 12,
      marks: 4,
    };

    const normalized = normalizeQuestionBankPayload(rawPayload);

    expect(normalized.question_type).toBe('integer');
    expect(normalized.numeric_answer).toBe(12);
    expect(normalized.options).toEqual([]);
    expect(normalized.correct_index).toBeNull();
    expect(normalized.correct_indices).toEqual([]);
    expect(normalized.marks).toBe(4);
  });

  it('correctly normalizes numerical question type with tolerance', () => {
    const rawPayload = {
      category: 'Physics',
      question_type: 'numerical',
      question_text: 'Calculate value of g in m/s²',
      numeric_answer: 9.81,
      numerical_tolerance: 0.05,
      marks: 4,
    };

    const normalized = normalizeQuestionBankPayload(rawPayload);

    expect(normalized.question_type).toBe('numerical');
    expect(normalized.numeric_answer).toBe(9.81);
    expect(normalized.numerical_tolerance).toBe(0.05);
    expect(normalized.options).toEqual([]);
    expect(normalized.correct_index).toBeNull();
  });

  it('keeps options and indices intact for mcq question type', () => {
    const rawPayload = {
      category: 'Chemistry',
      question_type: 'mcq',
      question_text: 'What is water?',
      options: 'H2O|CO2|NaCl|CH4',
      correct_index: 0,
      marks: 4,
    };

    const normalized = normalizeQuestionBankPayload(rawPayload);

    expect(normalized.question_type).toBe('mcq');
    expect(normalized.options).toEqual(['H2O', 'CO2', 'NaCl', 'CH4']);
    expect(normalized.correct_index).toBe(0);
    expect(normalized.correct_indices).toEqual([0]);
    expect(normalized.numeric_answer).toBeNull();
  });
});
