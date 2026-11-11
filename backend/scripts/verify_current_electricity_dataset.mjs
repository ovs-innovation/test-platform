import fs from 'fs';
import { ALL_CURRENT_ELECTRICITY_QUESTIONS } from './current_electricity_pyq_questions_data.mjs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/current_electricity_official_key.json', 'utf8'));
const urlMap = JSON.parse(fs.readFileSync('backend/scripts/current_electricity_diagram_urls.json', 'utf8'));

console.log(`=== Validating ${ALL_CURRENT_ELECTRICITY_QUESTIONS.length} Current Electricity Questions ===`);

let errors = 0;
let diagramsCount = 0;

if (ALL_CURRENT_ELECTRICITY_QUESTIONS.length !== 173) {
  console.error(`ERROR: Expected 173 questions, got ${ALL_CURRENT_ELECTRICITY_QUESTIONS.length}`);
  errors++;
}

const seenNumbers = new Set();

ALL_CURRENT_ELECTRICITY_QUESTIONS.forEach((q, idx) => {
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

  if (q.image_url) {
    diagramsCount++;
    if (!q.image_url.startsWith('https://res.cloudinary.com/')) {
      console.error(`ERROR in Q${q.question_number}: invalid image_url: ${q.image_url}`);
      errors++;
    }
  }
});

console.log(`Total questions checked: ${ALL_CURRENT_ELECTRICITY_QUESTIONS.length}`);
console.log(`Total diagrams linked: ${diagramsCount} (Expected: 56)`);
console.log(`Total errors: ${errors}`);

if (errors === 0 && diagramsCount === 56) {
  console.log('✅ ALL 173 QUESTIONS VALIDATED PERFECTLY WITH 56 DIAGRAMS AND OFFICIAL KEYS!');
} else {
  console.error('❌ VALIDATION FAILED!');
  process.exit(1);
}

