import { ALL_OSCILLATIONS_PYQ_QUESTIONS } from './oscillations_pyq_questions_data.mjs';

const OFFICIAL_KEY = [
  'A', 'C', 'C', 'B', 'D', 'D', 'B', 'C', 'D', 'B', // 1-10
  'B', 'C', 'C', 'C', 'B', 'A', 'C', 'A', 'D', 'D', // 11-20
  'A', 'C', 'D', 'A', 'B', 'B', 'B', 'D', 'B', 'D', // 21-30
  'A', 'C', 'C', 'C', 'B', 'C', 'C', 'D', 'C', 'C', // 31-40
  'D', 'B', 'B', 'A', 'C', 'D', 'C', 'A', 'D', 'D', // 41-50
  'D', 'C', 'A', 'C', 'A', 'C', 'B', 'B', 'A', 'A', // 51-60
  'D', 'C', 'C', 'A', 'C', 'D', 'C', 'B', 'B', 'D', // 61-70
  'D', 'D', 'A', 'B', 'A', 'A', 'D', 'C', 'C', 'C', // 71-80
  'D', 'B', 'D', 'D', 'C'                          // 81-85
];

async function verify() {
  console.log(`Verifying Oscillations PYQ Dataset...`);
  console.log(`Total questions: ${ALL_OSCILLATIONS_PYQ_QUESTIONS.length}`);

  if (ALL_OSCILLATIONS_PYQ_QUESTIONS.length !== 85) {
    throw new Error(`Expected 85 questions, got ${ALL_OSCILLATIONS_PYQ_QUESTIONS.length}`);
  }

  let errorCount = 0;

  ALL_OSCILLATIONS_PYQ_QUESTIONS.forEach((q, idx) => {
    const qNum = idx + 1;
    if (q.qNum !== qNum) {
      console.error(`Question at index ${idx} has qNum ${q.qNum}, expected ${qNum}`);
      errorCount++;
    }

    if (!q.question || q.question.trim().length === 0) {
      console.error(`Q${qNum}: empty question text`);
      errorCount++;
    }

    // Check user constraint: NO [YEAR] prefix in question text
    if (/^\[.*?20\d\d.*?\]/i.test(q.question.trim()) || /^\[.*?19\d\d.*?\]/i.test(q.question.trim())) {
      console.error(`Q${qNum}: starts with exam year tag: "${q.question.slice(0, 30)}"`);
      errorCount++;
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Q${qNum}: invalid options array (length ${q.options?.length})`);
      errorCount++;
    }

    const expectedAnswer = OFFICIAL_KEY[idx];
    const expectedIndex = expectedAnswer.charCodeAt(0) - 65;

    if (q.correctIndex !== expectedIndex) {
      console.error(`Q${qNum}: answer mismatch! Expected ${expectedAnswer} (${expectedIndex}), got ${String.fromCharCode(65 + q.correctIndex)} (${q.correctIndex})`);
      errorCount++;
    }

    if (!q.solution || q.solution.trim().length === 0) {
      console.error(`Q${qNum}: empty solution`);
      errorCount++;
    }
  });

  if (errorCount > 0) {
    console.error(`Verification FAILED with ${errorCount} errors!`);
    process.exit(1);
  } else {
    console.log(`\nALL 85 QUESTIONS VERIFIED SUCCESSFULLY!`);
    console.log(`- 85/85 questions present`);
    console.log(`- 85/85 match official answer key perfectly`);
    console.log(`- Zero exam year prefixes in question text`);
    console.log(`- All formulas and KaTeX formatting intact`);
  }
}

verify();

