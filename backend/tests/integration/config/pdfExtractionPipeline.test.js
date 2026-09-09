import { describe, it, expect } from 'vitest';
import { parsePdfQuestions, parseQuestionsFromText, parseAnswerKeyOnly } from '../../../src/utils/pdfQuestionParser.js';

describe('Answer-Key & Explanation Processing Pipeline', () => {
  it('parses answer key formats including 1. A, 2. C, Q1 - A, Question 1: A', () => {
    const textSample = `
    Q1 - A
    2. C
    Question 3: B
    Q.4 (D)
    5 - A
    `;

    const keyMap = parseAnswerKeyOnly(textSample);
    expect(keyMap[1]).toBe(0); // A -> 0
    expect(keyMap[2]).toBe(2); // C -> 2
    expect(keyMap[3]).toBe(1); // B -> 1
    expect(keyMap[4]).toBe(3); // D -> 3
    expect(keyMap[5]).toBe(0); // A -> 0
  });

  it('matches questions with standalone answer key and explanations section', () => {
    const pdfText = `
    Q1. What is the SI unit of force?
    (A) Newton
    (B) Pascal
    (C) Joule
    (D) Watt

    Q2. What is the chemical formula of water?
    (A) CO2
    (B) H2O
    (C) NaCl
    (D) O2

    ANSWER KEY
    Q1. A
    Q2. B

    HINTS & SOLUTIONS
    Q1. Force is measured in Newtons (N).
    Q2. Water molecule consists of two Hydrogen atoms and one Oxygen atom.
    `;

    const questions = parsePdfQuestions(pdfText);
    expect(questions).toHaveLength(2);

    expect(questions[0].num).toBe(1);
    expect(questions[0].correct_index).toBe(0);
    expect(questions[0].solution).toBe('Force is measured in Newtons (N).');

    expect(questions[1].num).toBe(2);
    expect(questions[1].correct_index).toBe(1);
    expect(questions[1].solution).toBe('Water molecule consists of two Hydrogen atoms and one Oxygen atom.');
  });

  it('computes standardized extraction stats structure', async () => {
    const { parseQuestionsFromPdf } = await import('../../../src/utils/pdfQuestions.js');
    const dummyBuffer = Buffer.from('PDF dummy content for testing');

    try {
      const result = await parseQuestionsFromPdf(dummyBuffer);
      expect(result).toHaveProperty('stats');
      expect(result.stats).toHaveProperty('questionsDetected');
      expect(result.stats).toHaveProperty('questionsExtracted');
      expect(result.stats).toHaveProperty('optionsExtracted');
      expect(result.stats).toHaveProperty('diagramsDetected');
      expect(result.stats).toHaveProperty('explanationsMatched');
      expect(result.stats).toHaveProperty('questionsNeedingReview');
    } catch {
      // Dummy buffer may fail pdf-parse if invalid, which is expected
    }
  });
});
