import { EMI_PYQ_QUESTIONS } from './emi_pyq_questions_data.mjs';

const officialAnswers = {
  1: 'B', 2: 'A', 3: 'C', 4: 'D', 5: 'B',
  6: 'A', 7: 'A', 8: 'B', 9: 'B', 10: 'D',
  11: 'A', 12: 'B', 13: 'A', 14: 'B', 15: 'C',
  16: 'C', 17: 'B', 18: 'C', 19: 'D', 20: 'B',
  21: 'D', 22: 'B', 23: 'A', 24: 'B', 25: 'D',
  26: 'B', 27: 'D', 28: 'B', 29: 'A', 30: 'D',
  31: 'A', 32: 'B', 33: 'A', 34: 'D', 35: 'A',
  36: 'C', 37: 'D', 38: 'A', 39: 'B', 40: 'A',
  41: 'B', 42: 'C', 43: 'D', 44: 'D', 45: 'C',
  46: 'B', 47: 'C', 48: 'C', 49: 'A', 50: 'D',
  51: 'C', 52: 'B', 53: 'A', 54: 'C', 55: 'B',
  56: 'A', 57: 'C'
};

const diagramExpected = [2, 3, 5, 7, 21, 23, 24, 25, 28, 30, 31, 38, 44];

let errors = 0;

if (EMI_PYQ_QUESTIONS.length !== 57) {
  console.error(`ERROR: Expected 57 questions, got ${EMI_PYQ_QUESTIONS.length}`);
  errors++;
}

EMI_PYQ_QUESTIONS.forEach(q => {
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
  console.log(`\n>>> SUCCESS: All 57 Electromagnetic Induction questions verified with 100% agreement with official answer key, zero prefixes, and valid diagrams! <<<`);
} else {
  console.error(`\n>>> FAILED: Encountered ${errors} verification errors! <<<`);
  process.exit(1);
}
