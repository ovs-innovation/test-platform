import { describe, it, expect } from 'vitest';
import { normalizeQuestionBankPayload } from '../../../src/utils/questionBankPayload.js';

describe('normalizeQuestionBankPayload', () => {
    it('converts pipe-delimited options and legacy correct_option values into API-safe fields', () => {
        const normalized = normalizeQuestionBankPayload({
            category: 'Physics',
            question_type: 'mcq',
            question_text: 'What is force?',
            options: 'A|B|C|D',
            correct_option: '1',
            solution: 'Because acceleration is needed',
        });

        expect(normalized.options).toEqual(['A', 'B', 'C', 'D']);
        expect(normalized.correct_index).toBe(1);
        expect(normalized.correct_indices).toEqual([1]);
        expect(normalized.solution).toBe('Because acceleration is needed');
    });

    it('parses multi-select correct indices from strings and arrays', () => {
        const normalized = normalizeQuestionBankPayload({
            category: 'Physics',
            question_type: 'multi_select',
            question_text: 'Select all valid units',
            options: ['m/s', 'kg', 'N', 'J'],
            correct_indices_str: '0,2',
        });

        expect(normalized.options).toEqual(['m/s', 'kg', 'N', 'J']);
        expect(normalized.correct_indices).toEqual([0, 2]);
        expect(normalized.correct_index).toBe(0);
    });
});
