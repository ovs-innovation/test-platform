import { describe, it, expect } from 'vitest';
import { resolveQuestionNeetMeta, evaluateNeetAttempt, NEET_SUBJECTS } from '../../src/utils/neetPattern.js';

describe('NEET Pattern & Section Split (Botany & Zoology)', () => {
  it('correctly defines NEET_SUBJECTS including Botany and Zoology in order', () => {
    expect(NEET_SUBJECTS).toEqual(['Physics', 'Chemistry', 'Botany', 'Zoology']);
  });

  describe('180-Question NEET layout', () => {
    it('maps Questions 1 to 45 to Section-A (Physics)', () => {
      const q1 = resolveQuestionNeetMeta({ questionNumber: 1, totalQuestions: 180 });
      expect(q1.subject).toBe('Physics');
      expect(q1.sectionTag).toBe('Section-A');

      const q45 = resolveQuestionNeetMeta({ questionNumber: 45, totalQuestions: 180 });
      expect(q45.subject).toBe('Physics');
      expect(q45.sectionTag).toBe('Section-A');
    });

    it('maps Questions 46 to 90 to Section-B (Chemistry)', () => {
      const q46 = resolveQuestionNeetMeta({ questionNumber: 46, totalQuestions: 180 });
      expect(q46.subject).toBe('Chemistry');
      expect(q46.sectionTag).toBe('Section-B');

      const q90 = resolveQuestionNeetMeta({ questionNumber: 90, totalQuestions: 180 });
      expect(q90.subject).toBe('Chemistry');
      expect(q90.sectionTag).toBe('Section-B');
    });

    it('maps Questions 91 to 135 to Section-C (Botany)', () => {
      const q91 = resolveQuestionNeetMeta({ questionNumber: 91, totalQuestions: 180 });
      expect(q91.subject).toBe('Botany');
      expect(q91.sectionTag).toBe('Section-C');

      const q135 = resolveQuestionNeetMeta({ questionNumber: 135, totalQuestions: 180 });
      expect(q135.subject).toBe('Botany');
      expect(q135.sectionTag).toBe('Section-C');
    });

    it('maps Questions 136 to 180 to Section-D (Zoology)', () => {
      const q136 = resolveQuestionNeetMeta({ questionNumber: 136, totalQuestions: 180 });
      expect(q136.subject).toBe('Zoology');
      expect(q136.sectionTag).toBe('Section-D');

      const q180 = resolveQuestionNeetMeta({ questionNumber: 180, totalQuestions: 180 });
      expect(q180.subject).toBe('Zoology');
      expect(q180.sectionTag).toBe('Section-D');
    });
  });

  describe('Standard 180-Question NEET layout (Default)', () => {
    it('defaults to 180 questions mapping even without passing totalQuestions', () => {
      // Question in Section A (Physics)
      expect(resolveQuestionNeetMeta({ questionNumber: 1 }).subject).toBe('Physics');
      expect(resolveQuestionNeetMeta({ questionNumber: 45 }).subject).toBe('Physics');
      expect(resolveQuestionNeetMeta({ questionNumber: 45 }).sectionTag).toBe('Section-A');

      // Question in Section B (Chemistry)
      expect(resolveQuestionNeetMeta({ questionNumber: 46 }).subject).toBe('Chemistry');
      expect(resolveQuestionNeetMeta({ questionNumber: 90 }).subject).toBe('Chemistry');
      expect(resolveQuestionNeetMeta({ questionNumber: 90 }).sectionTag).toBe('Section-B');

      // Question in Section C (Botany)
      expect(resolveQuestionNeetMeta({ questionNumber: 91 }).subject).toBe('Botany');
      expect(resolveQuestionNeetMeta({ questionNumber: 135 }).subject).toBe('Botany');
      expect(resolveQuestionNeetMeta({ questionNumber: 135 }).sectionTag).toBe('Section-C');

      // Question in Section D (Zoology)
      expect(resolveQuestionNeetMeta({ questionNumber: 136 }).subject).toBe('Zoology');
      expect(resolveQuestionNeetMeta({ questionNumber: 180 }).subject).toBe('Zoology');
      expect(resolveQuestionNeetMeta({ questionNumber: 180 }).sectionTag).toBe('Section-D');
    });
  });

  describe('Splitting generic Biology subject', () => {
    it('splits generic Biology into Botany (first half) and Zoology (second half)', () => {
      // 90 biology questions
      const firstBio = resolveQuestionNeetMeta({
        subject: 'Biology',
        totalSubjectQuestions: 90,
        subjectQuestionIndex: 0,
      });
      expect(firstBio.subject).toBe('Botany');
      expect(firstBio.sectionTag).toBe('Section-C');

      const midBio = resolveQuestionNeetMeta({
        subject: 'Biology',
        totalSubjectQuestions: 90,
        subjectQuestionIndex: 44,
      });
      expect(midBio.subject).toBe('Botany');
      expect(midBio.sectionTag).toBe('Section-C');

      const zoologyBio = resolveQuestionNeetMeta({
        subject: 'Biology',
        totalSubjectQuestions: 90,
        subjectQuestionIndex: 45,
      });
      expect(zoologyBio.subject).toBe('Zoology');
      expect(zoologyBio.sectionTag).toBe('Section-D');

      const lastBio = resolveQuestionNeetMeta({
        subject: 'Biology',
        totalSubjectQuestions: 90,
        subjectQuestionIndex: 89,
      });
      expect(lastBio.subject).toBe('Zoology');
      expect(lastBio.sectionTag).toBe('Section-D');
    });
  });
});
