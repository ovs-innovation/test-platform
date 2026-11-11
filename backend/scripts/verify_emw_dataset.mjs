import fs from 'fs';
import { ALL_EMW_QUESTIONS } from './emw_pyq_questions_data.mjs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/emw_official_key.json', 'utf8'));

console.log(`=== Validating ${ALL_EMW_QUESTIONS.length} Electromagnetic Waves Questions ===`);

let errors = 0;

if (ALL_EMW_QUESTIONS.length !== 56) {
  console.error(`ERROR: Expected 56 questions, got ${ALL_EMW_QUESTIONS.length}`);
  errors++;
}

const seenNumbers = new Set();

ALL_EMW_QUESTIONS.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.question_number !== expectedNum) {
    console.error(`ERROR at index ${idx}: expected qNum ${expectedNum}, got ${q.question_number}`);
    errors++;
  }

  if (seenNumbers.has(q.question_number)) {
    console.error(`ERROR: Duplicate question_number ${q.question_number}`);
    errors++;
  }
  seenNumbers.add(q.question_number);

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`ERROR in Q${q.question_number}: empty question_text`);
    errors++;
  }

  // Check that year prefix was removed
  if (/\[(?:NEET|RE-NEET|AIPMT|AIEEE|JEE)\s*\d{4}[^\]]*\]/i.test(q.question_text)) {
    console.error(`WARNING in Q${q.question_number}: question_text still contains exam tag!`);
    errors++;
  }

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`ERROR in Q${q.question_number}: options is not 4 items`);
    errors++;
  }

  const expectedKey = keys[String(q.question_number)];
  if (q.correct_option !== expectedKey) {
    console.error(`ERROR in Q${q.question_number}: key mismatch (got ${q.correct_option}, expected ${expectedKey})`);
    errors++;
  }

  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`ERROR in Q${q.question_number}: empty solution`);
    errors++;
  }
});

console.log(`Total questions checked: ${ALL_EMW_QUESTIONS.length}`);
console.log(`Total errors: ${errors}`);

if (errors === 0) {
  console.log('✅ ALL 56 QUESTIONS VALIDATED PERFECTLY WITH OFFICIAL KEYS!');
} else {
  console.error('❌ VALIDATION FAILED!');
  process.exit(1);
}

