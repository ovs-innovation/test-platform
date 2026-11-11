import fs from 'fs';
import { ALL_RO_QUESTIONS } from './ro_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('backend/scripts/ro_official_key.json', 'utf8'));

console.log('========================================================');
console.log('  VERIFYING RAY OPTICS DATASET');
console.log('========================================================\n');

console.log(`Total questions in dataset: ${ALL_RO_QUESTIONS.length}`);
if (ALL_RO_QUESTIONS.length !== 114) {
  console.error(`ERROR: Expected 114 questions, found ${ALL_RO_QUESTIONS.length}`);
  process.exit(1);
}

const letterMap = ['A', 'B', 'C', 'D'];
let keyMismatch = 0;
let optionErrors = 0;
let diagramCount = 0;
let examPrefixErrors = 0;

ALL_RO_QUESTIONS.forEach((q, idx) => {
  const qNum = q.question_number;
  if (qNum !== idx + 1) {
    console.error(`ERROR: Question index mismatch: expected ${idx + 1}, found ${qNum}`);
  }

  // Check official answer key
  const official = officialKey[qNum] || officialKey[String(qNum)];
  if (q.correct_option !== official) {
    console.error(`KEY MISMATCH Q${qNum}: Dataset has ${q.correct_option}, Official is ${official}`);
    keyMismatch++;
  }

  if (letterMap[q.correct_index] !== q.correct_option) {
    console.error(`INDEX MISMATCH Q${qNum}: correct_index ${q.correct_index} does not match ${q.correct_option}`);
    keyMismatch++;
  }

  // Check options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`OPTION ERROR Q${qNum}: Options length is ${q.options?.length}`);
    optionErrors++;
  }

  q.options.forEach((opt, oIdx) => {
    if (!opt || typeof opt !== 'string' || opt.trim().length === 0) {
      console.error(`OPTION EMPTY Q${qNum} Option ${letterMap[oIdx]}`);
      optionErrors++;
    }
  });

  // Check diagrams
  if (q.image_url) {
    diagramCount++;
    if (!q.image_url.startsWith('https://res.cloudinary.com/')) {
      console.warn(`WARNING Q${qNum}: Image URL is not Cloudinary: ${q.image_url}`);
    }
  }

  // Check exam prefixes
  if (/^\[?(NEET|RE-NEET|AIPMT)\s*\d{4}\]?/i.test(q.question_text)) {
    console.error(`EXAM PREFIX DETECTED Q${qNum}: ${q.question_text.slice(0, 30)}`);
    examPrefixErrors++;
  }
});

console.log(`\nKey mismatches: ${keyMismatch}`);
console.log(`Option errors: ${optionErrors}`);
console.log(`Diagram count: ${diagramCount} / 15`);
console.log(`Exam prefix errors: ${examPrefixErrors}`);

if (keyMismatch === 0 && optionErrors === 0 && diagramCount === 15 && examPrefixErrors === 0) {
  console.log('\n>>> ALL 114 QUESTIONS PERFECTLY VALIDATED! 100% READY FOR SEED & SYNC! <<<');
} else {
  console.error('\n>>> VALIDATION FAILED! Please fix the errors above. <<<');
  process.exit(1);
}

