import fs from 'fs';
import { dfBlockQuestions } from './df_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('./backend/scripts/df_official_key.json', 'utf8'));

console.log('--- VERIFYING D AND F BLOCK ELEMENTS DATASET ---');
console.log(`Total questions loaded: ${dfBlockQuestions.length}`);

if (dfBlockQuestions.length !== 105) {
  console.error(`ERROR: Expected 105 questions, found ${dfBlockQuestions.length}`);
  process.exit(1);
}

let errors = 0;
const seenQNums = new Set();

dfBlockQuestions.forEach((q, idx) => {
  const qNum = q.question_number;
  if (qNum !== idx + 1) {
    console.error(`Error: Out of order at index ${idx}: expected ${idx + 1}, got ${qNum}`);
    errors++;
  }
  if (seenQNums.has(qNum)) {
    console.error(`Error: Duplicate question number ${qNum}`);
    errors++;
  }
  seenQNums.add(qNum);

  // Check official key match
  const expectedAns = officialKey[qNum];
  if (q.correct_option !== expectedAns) {
    console.error(`Error in Q${qNum}: correct_option '${q.correct_option}' !== expected '${expectedAns}'`);
    errors++;
  }

  // Check options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Error in Q${qNum}: options must be array of 4 items`);
    errors++;
  }
  q.options.forEach((opt, optIdx) => {
    if (!opt || typeof opt !== 'string' || opt.trim().length === 0) {
      console.error(`Error in Q${qNum}: Option ${optIdx} is empty`);
      errors++;
    }
  });

  // Check question text
  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`Error in Q${qNum}: question_text is empty`);
    errors++;
  }
  if (/^Q\d+\.?/i.test(q.question_text) || /\[?(NEET|AIPMT|CBSE PMT)\s*\d+/i.test(q.question_text)) {
    console.warn(`Warning in Q${qNum}: Question text contains potential exam tag/prefix: ${q.question_text.slice(0, 40)}`);
  }

  // Check solution text
  if (!q.solution_text || q.solution_text.trim().length === 0) {
    console.error(`Error in Q${qNum}: solution_text is empty`);
    errors++;
  }

  // Check KaTeX math dollar balance in question_text, options, solution_text
  const checkMathBalance = (text, fieldName) => {
    // Remove escaped dollars `\$`
    const stripped = text.replace(/\\\$/g, '');
    const dollarCount = (stripped.match(/\$/g) || []).length;
    if (dollarCount % 2 !== 0) {
      console.error(`Error in Q${qNum} (${fieldName}): Unbalanced $ delimiter count (${dollarCount})`);
      errors++;
    }
  };

  checkMathBalance(q.question_text, 'question_text');
  q.options.forEach((opt, oIdx) => checkMathBalance(opt, `option_${oIdx}`));
  checkMathBalance(q.solution_text, 'solution_text');
});

if (errors === 0) {
  console.log('SUCCESS: All 105 questions passed validation with 100% official answer key match and balanced KaTeX math formatting!');
} else {
  console.error(`FAILED: Found ${errors} errors during verification.`);
  process.exit(1);
}

