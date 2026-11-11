import fs from 'fs';
import { ALL_AC_QUESTIONS } from './ac_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('backend/scripts/ac_official_key.json', 'utf8'));

console.log(`========================================`);
console.log(`  VERIFYING ALTERNATING CURRENT DATASET `);
console.log(`========================================\n`);

let errors = 0;

if (ALL_AC_QUESTIONS.length !== 75) {
  console.error(`❌ Expected 75 questions, found ${ALL_AC_QUESTIONS.length}`);
  errors++;
} else {
  console.log(`✅ Question count: 75 / 75`);
}

let diagramCount = 0;
const expectedDiagrams = [5, 9, 10, 11, 13, 18, 24, 28, 31, 34, 46, 51, 65];

ALL_AC_QUESTIONS.forEach((q, idx) => {
  const qNum = idx + 1;
  if (q.question_number !== qNum) {
    console.error(`❌ Q${qNum} has wrong question_number: ${q.question_number}`);
    errors++;
  }

  // Check official key
  const offKey = officialKey[String(qNum)];
  if (q.correct_option !== offKey) {
    console.error(`❌ Q${qNum} key mismatch: dataset=${q.correct_option}, official=${offKey}`);
    errors++;
  }

  // Check 4 options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`❌ Q${qNum} does not have exactly 4 options! Count: ${q.options?.length}`);
    errors++;
  }

  // Check exam prefix
  if (/\[\s*(NEET|RE-NEET|AIPMT)/i.test(q.question_text)) {
    console.error(`❌ Q${qNum} contains exam prefix in question_text: ${q.question_text.slice(0, 30)}`);
    errors++;
  }

  // Check math delimiters balance
  const dollarCount = (q.question_text.match(/\$/g) || []).length;
  if (dollarCount % 2 !== 0) {
    console.error(`❌ Q${qNum} has unbalanced '$' in question_text!`);
    errors++;
  }

  // Check diagram
  if (expectedDiagrams.includes(qNum)) {
    if (!q.image_url || !q.image_url.startsWith('https://res.cloudinary.com/')) {
      console.error(`❌ Q${qNum} expected Cloudinary diagram, but found: ${q.image_url}`);
      errors++;
    } else {
      diagramCount++;
    }
  } else {
    if (q.image_url) {
      console.error(`❌ Q${qNum} unexpectedly has diagram: ${q.image_url}`);
      errors++;
    }
  }
});

console.log(`✅ Diagram questions verified: ${diagramCount} / 13`);

if (errors === 0) {
  console.log(`\n🎉 ALL 75 QUESTIONS PASSED VERIFICATION WITH 100% ACCURACY!`);
} else {
  console.error(`\n❌ Found ${errors} verification errors.`);
  process.exit(1);
}
