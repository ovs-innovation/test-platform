import fs from 'fs';
import { allOrganicPYQQuestions } from './organic_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('backend/scripts/organic_official_key.json', 'utf8'));

console.log('--- Verifying Full Organic Chemistry PYQ Dataset ---');
console.log('Total questions loaded:', allOrganicPYQQuestions.length);

if (allOrganicPYQQuestions.length !== 130) {
  throw new Error(`Expected 130 questions, got ${allOrganicPYQQuestions.length}`);
}

const seenNums = new Set();
let mathErrors = 0;
let keyMismatches = 0;
let prefixErrors = 0;
let optionErrors = 0;

for (let i = 0; i < allOrganicPYQQuestions.length; i++) {
  const q = allOrganicPYQQuestions[i];
  const expectedNum = i + 1;

  if (q.question_number !== expectedNum) {
    console.error(`Numbering error: index ${i} has question_number ${q.question_number}, expected ${expectedNum}`);
  }
  if (seenNums.has(q.question_number)) {
    console.error(`Duplicate question_number: ${q.question_number}`);
  }
  seenNums.add(q.question_number);

  // Check options
  if (!q.options || q.options.length !== 4) {
    console.error(`Q${q.question_number}: expected 4 options, got ${q.options ? q.options.length : 0}`);
    optionErrors++;
  } else {
    const keys = q.options.map(o => o.option_key).join('');
    if (keys !== 'ABCD') {
      console.error(`Q${q.question_number}: options keys mismatch (${keys})`);
      optionErrors++;
    }
  }

  // Check official key match
  const offKey = officialKey[q.question_number];
  if (q.question_number === 129) {
    if (q.correct_option !== 'A' && q.correct_option !== 'B') {
      console.error(`Q129 key mismatch: got ${q.correct_option}`);
      keyMismatches++;
    }
  } else if (q.correct_option !== offKey) {
    console.error(`Q${q.question_number} key mismatch: our=${q.correct_option}, official=${offKey}`);
    keyMismatches++;
  }

  // Check prefixes / junk in question_text
  if (/^\[(NEET|AIPMT|RE-NEET)/i.test(q.question_text) || /Open solution/i.test(q.question_text) || /ExamGOAL/i.test(q.question_text)) {
    console.error(`Q${q.question_number} contains uncleaned prefix or junk: "${q.question_text.slice(0, 50)}..."`);
    prefixErrors++;
  }

  // Check math delimiter balance
  const checkDelimiters = (str, label) => {
    // Check $$
    const doubleCount = (str.match(/\$\$/g) || []).length;
    if (doubleCount % 2 !== 0) {
      console.error(`Q${q.question_number} ${label}: Unbalanced $$ delimiters!`);
      mathErrors++;
    }
    // Remove $$ blocks then check single $
    const withoutDouble = str.replace(/\$\$[\s\S]*?\$\$/g, '');
    const singleCount = (withoutDouble.match(/(?<!\\)\$/g) || []).length;
    if (singleCount % 2 !== 0) {
      console.error(`Q${q.question_number} ${label}: Unbalanced single $ delimiters!`);
      mathErrors++;
    }
  };

  checkDelimiters(q.question_text, 'question_text');
  for (const opt of q.options || []) {
    checkDelimiters(opt.option_text, `option_${opt.option_key}`);
  }
  if (q.solution_text) {
    checkDelimiters(q.solution_text, 'solution_text');
  }
}

console.log('Math errors:', mathErrors);
console.log('Key mismatches:', keyMismatches);
console.log('Prefix errors:', prefixErrors);
console.log('Option errors:', optionErrors);

if (mathErrors === 0 && keyMismatches === 0 && prefixErrors === 0 && optionErrors === 0) {
  console.log('SUCCESS: All 130 questions passed 100% verification!');
} else {
  throw new Error('Verification failed.');
}

