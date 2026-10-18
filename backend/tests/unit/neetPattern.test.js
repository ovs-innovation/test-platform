import { describe, it, expect } from 'vitest';
import { resolveQuestionNeetMeta, evaluateNeetAttempt, NEET_SUBJECTS, normalizeNeetAssessmentPayload } from '../../src/utils/neetPattern.js';

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

  describe('normalizeNeetAssessmentPayload', () => {
    it('accurately normalizes unsequenced 180 questions into 45 Physics, 45 Chemistry, 45 Botany, 45 Zoology', () => {
      // Create mock questions matching booklet layout:
      // Q1..33 Botany, Q34..90 Zoology (57 Qs where 12 are plant topics), Q91..135 Physics, Q136..180 Chemistry
      const questions = [];
      // 33 Botany
      for (let i = 1; i <= 33; i++) {
        questions.push({ id: i, position: i, subject: 'Botany', topic: 'Plant Kingdom', question_text: `Botany Q${i}` });
      }
      // 12 Zoology questions that have plant topics (e.g. anatomy, flowering)
      for (let i = 34; i <= 45; i++) {
        questions.push({ id: i, position: i, subject: 'Zoology', topic: 'Anatomy of Flowering Plants', question_text: `Plant Anatomy Q${i}` });
      }
      // 45 true Zoology questions
      for (let i = 46; i <= 90; i++) {
        questions.push({ id: i, position: i, subject: 'Zoology', topic: 'Animal Kingdom', question_text: `Animal Q${i}` });
      }
      // 45 Physics questions (originally 91-135)
      for (let i = 91; i <= 135; i++) {
        questions.push({ id: i, position: i, subject: 'Physics', topic: 'Kinematics', question_text: `Physics Q${i}` });
      }
      // 45 Chemistry questions (originally 136-180)
      for (let i = 136; i <= 180; i++) {
        questions.push({ id: i, position: i, subject: 'Chemistry', topic: 'Periodic Table', question_text: `Chemistry Q${i}` });
      }

      const res = normalizeNeetAssessmentPayload({ id: 41, title: 'NEET Mock Paper 3' }, questions, []);
      expect(res.questions.length).toBe(180);
      expect(res.sections.length).toBe(4);

      // Verify Section-A: Physics (1-45)
      expect(res.sections[0].name).toBe('Section-A: Physics');
      expect(res.questions[0].subject).toBe('Physics');
      expect(res.questions[0].position).toBe(1);
      expect(res.questions[44].subject).toBe('Physics');
      expect(res.questions[44].position).toBe(45);

      // Verify Section-B: Chemistry (46-90)
      expect(res.sections[1].name).toBe('Section-B: Chemistry');
      expect(res.questions[45].subject).toBe('Chemistry');
      expect(res.questions[45].position).toBe(46);
      expect(res.questions[89].subject).toBe('Chemistry');
      expect(res.questions[89].position).toBe(90);

      // Verify Section-C: Botany (91-135)
      expect(res.sections[2].name).toBe('Section-C: Botany');
      expect(res.questions[90].subject).toBe('Botany');
      expect(res.questions[90].position).toBe(91);
      expect(res.questions[134].subject).toBe('Botany');
      expect(res.questions[134].position).toBe(135);

      // Verify Section-D: Zoology (136-180)
      expect(res.sections[3].name).toBe('Section-D: Zoology');
      expect(res.questions[135].subject).toBe('Zoology');
      expect(res.questions[135].position).toBe(136);
      expect(res.questions[179].subject).toBe('Zoology');
      expect(res.questions[179].position).toBe(180);
    });
  });
});
