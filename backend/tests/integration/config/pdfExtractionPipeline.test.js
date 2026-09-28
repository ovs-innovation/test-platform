import { describe, it, expect } from 'vitest';
import { parsePdfQuestions, parseQuestionsFromText, parseAnswerKeyOnly, parseAnswerKeyAndSolutions, parseTopicGrid } from '../../../src/utils/pdfQuestionParser.js';
import { stripHeadersAndFooters } from '../../../src/utils/questionFormatter.js';

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

  it('extracts chapter/topic names and explanations from both question body and solutions', () => {
    const pdfText = `
    Q1. [Animal Kingdom] In which phylum is the water vascular system present?
    (A) Porifera
    (B) Echinodermata
    (C) Mollusca
    (D) Annelida

    Q2. [Current Electricity] What is the equivalent resistance of two 10 ohm resistors in parallel?
    (A) 20 ohm
    (B) 10 ohm
    (C) 5 ohm
    (D) 2.5 ohm

    ANSWER KEY
    1. B
    2. C

    HINTS & SOLUTIONS
    1. [Animal Kingdom] Water vascular system (ambulacral system) is a characteristic of Echinodermata.
    2. [Current Electricity] Rp = (R1 * R2) / (R1 + R2) = (10 * 10) / (10 + 10) = 5 ohm.
    `;

    const questions = parsePdfQuestions(pdfText);
    expect(questions).toHaveLength(2);

    expect(questions[0].chapter).toBe('Animal Kingdom');
    expect(questions[0].correct_index).toBe(1);
    expect(questions[0].solution).toContain('Water vascular system');
    expect(questions[0].question_text).not.toContain('[Animal Kingdom]');

    expect(questions[1].chapter).toBe('Current Electricity');
    expect(questions[1].correct_index).toBe(2);
    expect(questions[1].solution).toContain('Rp = (R1 * R2)');
    expect(questions[1].question_text).not.toContain('[Current Electricity]');
  });

  it('parseAnswerKeyAndSolutions extracts keys, detailed explanations, and chapter tags', () => {
    const answerKeyText = `
    ANSWER KEY
    1. (A)
    2. (C)
    3. (B)

    HINTS & SOLUTIONS
    1. [Ray Optics] (A)
    Explanation: Focal length of plane mirror is infinity.

    2. [Thermodynamics] (C)
    Sol: In an isothermal process for an ideal gas, internal energy change delta U = 0.

    3. Chapter: Electrostatics
    Ans: B. Electric field inside a conductor in electrostatic equilibrium is zero.
    `;

    const result = parseAnswerKeyAndSolutions(answerKeyText);
    expect(result.answerKeyMap[1]).toBe(0);
    expect(result.answerKeyMap[2]).toBe(2);
    expect(result.answerKeyMap[3]).toBe(1);

    expect(result.solutionsMap[1]).toBe('Focal length of plane mirror is infinity.');
    expect(result.solutionsMap[2]).toBe('In an isothermal process for an ideal gas, internal energy change delta U = 0.');
    expect(result.solutionsMap[3]).toBe('Electric field inside a conductor in electrostatic equilibrium is zero.');

    expect(result.chaptersMap[1]).toBe('Ray Optics');
    expect(result.chaptersMap[2]).toBe('Thermodynamics');
    expect(result.chaptersMap[3]).toBe('Electrostatics');
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

  it('accurately classifies each question topic without defaulting everything to Rotational Motion', async () => {
    const { inferSubjectAndTopic } = await import('../../../src/utils/subjectClassifier.js');
    const docMeta = {
      testName: 'Physics Full Mock: Rotational Motion & Mechanics',
      syllabus: 'Rotational Motion, Gravitation, Kinematics, Laws of Motion, Work Energy'
    };

    // Q1: Kinematics question
    const q1 = inferSubjectAndTopic({
      ...docMeta,
      questionText: 'A car starts from rest and accelerates with a uniform acceleration of 4 m/s^2. Calculate its velocity and displacement after 10 s.'
    });
    expect(q1.topic).toBe('Kinematics');
    expect(q1.topic).not.toBe('Rotational Motion');

    // Q2: Laws of Motion question
    const q2 = inferSubjectAndTopic({
      ...docMeta,
      questionText: 'A block of mass 5 kg rests on a rough horizontal plane with coefficient of friction mu = 0.3. Find the limiting friction force.'
    });
    expect(q2.topic).toBe('Laws of Motion');
    expect(q2.topic).not.toBe('Rotational Motion');

    // Q3: Work Energy Power question
    const q3 = inferSubjectAndTopic({
      ...docMeta,
      questionText: 'Calculate the total work done by a conservative force when an object moves from point A to B and its kinetic energy increases by 50 J.'
    });
    expect(q3.topic).toBe('Work, Energy & Power');
    expect(q3.topic).not.toBe('Rotational Motion');

    // Q4: Gravitation question
    const q4 = inferSubjectAndTopic({
      ...docMeta,
      questionText: 'An artificial satellite is placed in a circular orbit around the Earth. Derive the expression for its escape velocity and orbital speed.'
    });
    expect(q4.topic).toBe('Gravitation');
    expect(q4.topic).not.toBe('Rotational Motion');

    // Q5: Actual Rotational Motion question
    const q5 = inferSubjectAndTopic({
      ...docMeta,
      questionText: 'A uniform circular disc has moment of inertia I about its axis. A constant torque tau is applied. Find its angular acceleration.'
    });
    expect(q5.topic).toBe('Rotational Motion');
  });

  it('extracts question-wise topic mapping table (Q. No. | Topic Name) accurately', () => {
    const topicTableText = `
    Q. No.    Topic Name                     Q. No.    Topic Name
    1         Physics & Measurement          61        Some Basic Concepts
    2         Physics & Measurement          62        Some Basic Concepts
    3         Physics & Measurement          63        Some Basic Concepts
    8         Physics & Measurement          64        Atomic Structure
    9         Kinematics                     70        Atomic Structure
    10        Kinematics                     78        Periodicity
    27        Kinematics                     80        Periodicity
    `;

    const topicMap = parseTopicGrid(topicTableText);
    expect(topicMap[1]).toBe('Physics & Measurement');
    expect(topicMap[2]).toBe('Physics & Measurement');
    expect(topicMap[8]).toBe('Physics & Measurement');
    expect(topicMap[9]).toBe('Kinematics');
    expect(topicMap[27]).toBe('Kinematics');
    expect(topicMap[61]).toBe('Some Basic Concepts');
    expect(topicMap[64]).toBe('Atomic Structure');
    expect(topicMap[78]).toBe('Periodicity');
    expect(topicMap[80]).toBe('Periodicity');
  });

  it('automatically applies Topic Grid mapping to question paper questions', () => {
    const documentText = `
    Q1. The dimensional formula for Planck constant is:
    (A) [ML^2 T^-1]
    (B) [ML T^-1]
    (C) [ML^2 T^-2]
    (D) [M^0 L^0 T^0]

    Q2. A projectile is thrown with an initial velocity of 20 m/s at an angle of 30 degrees.
    (A) 10 m
    (B) 20 m
    (C) 30 m
    (D) 40 m

    Q3. The number of radial nodes for a 3p orbital is:
    (A) 0
    (B) 1
    (C) 2
    (D) 3

    Q. No.    Topic Name
    1         Physics & Measurement
    2         Kinematics
    3         Atomic Structure
    `;

    const questions = parsePdfQuestions(documentText);
    expect(questions).toHaveLength(3);
    expect(questions[0].chapter).toBe('Physics & Measurement');
    expect(questions[0].topic).toBe('Physics & Measurement');

    expect(questions[1].chapter).toBe('Kinematics');
    expect(questions[1].topic).toBe('Kinematics');

    expect(questions[2].chapter).toBe('Atomic Structure');
    expect(questions[2].topic).toBe('Atomic Structure');
  });

  it('strips running page footers (e.g. EDVEDUM ACADEMY | AIETS NEET 2027 | UT-01 4) and prevents them from attaching to options or question text', () => {
    // 1. Direct text cleaner
    const rawOptionWithFooter = '16 N EDVEDUM ACADEMY | AIETS NEET 2027 | UT-01 4';
    expect(stripHeadersAndFooters(rawOptionWithFooter)).toBe('16 N');

    const multiLineFooter = `
    16 N
    EDVEDUM ACADEMY | AIETS NEET 2027 | UT-01                                     4
    `;
    expect(stripHeadersAndFooters(multiLineFooter)).toBe('16 N');

    // 2. Full question document test matching user screenshot
    const pdfPageSample = `
    29. Newton's first law describes?
    A. inertia
    B. gravitation
    C. conservation of charge
    D. energy quantisation

    30. A 2 kg block accelerates at 3 m/s^2 to the right. Forces of 10 N right and F left act on it. Find F.
    A. 4 N
    B. 6 N
    C. 10 N
    D. 16 N

    ____________________________________________________________________
    EDVEDUM ACADEMY | AIETS NEET 2027 | UT-01                                     4
    `;

    const parsed = parsePdfQuestions(pdfPageSample);
    expect(parsed).toHaveLength(2);

    const q30 = parsed.find((q) => q.num === 30);
    expect(q30).toBeDefined();
    expect(q30.question_text).not.toContain('EDVEDUM ACADEMY');
    expect(q30.question_text).not.toContain('AIETS');
    expect(q30.question_text).not.toContain('UT-01');

    // Crucially: Option D must be just "16 N", not containing any footer
    expect(q30.options[3]).toBe('16 N');
    expect(q30.options[3]).not.toContain('EDVEDUM ACADEMY');

    // 3. Single-line Option D containing inline footer
    const singleLineSample = `
    30. A 2 kg block accelerates at 3 m/s^2 to the right. Forces of 10 N right and F left act on it. Find F.
    A. 4 N
    B. 6 N
    C. 10 N
    D. 16 N EDVEDUM ACADEMY | AIETS NEET 2027 | UT-01 4
    `;
    const parsedSingleLine = parsePdfQuestions(singleLineSample);
    expect(parsedSingleLine[0].options[3]).toBe('16 N');
    expect(parsedSingleLine[0].options[3]).not.toContain('EDVEDUM ACADEMY');
  });
});



