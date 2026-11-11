import { CAPACITOR_PYQ_QUESTIONS } from './capacitor_pyq_questions_data.mjs';

const officialAnswers = {
  1: 'A', 2: 'B', 3: 'A', 4: 'C', 5: 'A',
  6: 'B', 7: 'C', 8: 'A', 9: 'B', 10: 'D',
  11: 'B', 12: 'D', 13: 'A', 14: 'D', 15: 'C',
  16: 'D', 17: 'C', 18: 'C', 19: 'B', 20: 'D',
  21: 'C', 22: 'A', 23: 'A', 24: 'C', 25: 'B',
  26: 'D', 27: 'B', 28: 'C', 29: 'C', 30: 'C',
  31: 'C', 32: 'D', 33: 'B', 34: 'B', 35: 'B',
  36: 'A', 37: 'B', 38: 'C', 39: 'A', 40: 'A',
  41: 'B', 42: 'D', 43: 'A', 44: 'D', 45: 'D',
  46: 'B', 47: 'C'
};

const diagramExpected = [1, 2, 7, 8, 10, 12, 15, 17, 18, 20, 24, 25, 28, 35, 37, 43, 46];

let errors = 0;

if (CAPACITOR_PYQ_QUESTIONS.length !== 47) {
  console.error(`ERROR: Expected 47 questions, got ${CAPACITOR_PYQ_QUESTIONS.length}`);
  errors++;
}

CAPACITOR_PYQ_QUESTIONS.forEach(q => {
  const num = q.question_number;
  const expectedAns = officialAnswers[num];

  // 1. Check Answer Key
  if (q.correct_option !== expectedAns) {
    console.error(`ERROR Q${num}: Answer mismatch! Got ${q.correct_option}, expected ${expectedAns}`);
    errors++;
  }

  // 2. Check 4 options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`ERROR Q${num}: Expected 4 options, got ${q.options?.length}`);
    errors++;
  }

  // 3. Check for Exam year prefix in question text
  const prefixMatch = q.question_text.match(/^(?:\[|\b)(?:NEET|AIPMT|RE-NEET|JEE)[\s\d\(\)\-A-Za-z]+(?:\]|\b)/i);
  if (prefixMatch) {
    console.error(`ERROR Q${num}: Found exam prefix in question text: "${prefixMatch[0]}"`);
    errors++;
  }

  // 4. Check diagram
  const shouldHaveDiagram = diagramExpected.includes(num);
  if (shouldHaveDiagram && !q.image_url) {
    console.error(`ERROR Q${num}: Expected diagram image_url, but it is null or missing!`);
    errors++;
  } else if (!shouldHaveDiagram && q.image_url) {
    console.warn(`WARN Q${num}: Has unexpected diagram image_url: ${q.image_url}`);
  }

  // 5. Check KaTeX dollar signs balance
  const textDollars = (q.question_text.match(/\$/g) || []).length;
  if (textDollars % 2 !== 0) {
    console.error(`ERROR Q${num}: Unbalanced $ in question_text (${textDollars} dollars)`);
    errors++;
  }
});

if (errors === 0) {
  console.log(`\n>>> SUCCESS: All 47 Capacitor questions verified with 100% agreement with official answer key, zero prefixes, and valid diagrams! <<<`);
} else {
  console.error(`\n>>> FAILED: Encountered ${errors} verification errors! <<<`);
  process.exit(1);
}

