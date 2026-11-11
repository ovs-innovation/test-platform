import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { semiQuestions } from './semi_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKey = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'semi_official_key.json'), 'utf8'));

console.log('=== Verifying Semiconductor PYQ Dataset ===');
console.log(`Total questions loaded: ${semiQuestions.length} (Expected: 167)`);

if (semiQuestions.length !== 167) {
  console.error(`ERROR: Expected 167 questions, got ${semiQuestions.length}`);
  process.exit(1);
}

let keyMismatches = 0;
let optionErrors = 0;
let textErrors = 0;
let diagramCount = 0;

for (let i = 1; i <= 167; i++) {
  const q = semiQuestions.find(item => item.question_number === i);
  if (!q) {
    console.error(`Missing question number ${i}`);
    continue;
  }

  // Key check
  const expKey = officialKey[i];
  if (q.correct_option !== expKey) {
    console.error(`Q${i} key mismatch: Got ${q.correct_option}, Expected ${expKey}`);
    keyMismatches++;
  }

  // Options check
  if (!Array.isArray(q.options) || q.options.length !== 4 || q.options.some(o => !o || !o.trim())) {
    console.error(`Q${i} invalid options:`, q.options);
    optionErrors++;
  }

  // Text check
  if (!q.question_text || q.question_text.trim().length < 5) {
    console.error(`Q${i} invalid question_text:`, q.question_text);
    textErrors++;
  }
  if (/^\[(NEET|AIPMT|RE-NEET)/i.test(q.question_text.trim())) {
    console.warn(`Q${i} still has exam prefix:`, q.question_text.substring(0, 30));
  }

  // Diagram check
  if (q.image_url) {
    diagramCount++;
  }
}

console.log(`Key mismatches: ${keyMismatches}`);
console.log(`Option errors: ${optionErrors}`);
console.log(`Text errors: ${textErrors}`);
console.log(`Total questions with diagrams: ${diagramCount} (Expected: 61)`);

if (keyMismatches === 0 && optionErrors === 0 && textErrors === 0 && diagramCount === 61) {
  console.log('\n✓ DATASET VERIFICATION SUCCESS: All 167 questions, options, official keys, and 61 diagrams are 100% VALID!');
} else {
  console.error('\n✗ VERIFICATION FAILED: Please fix errors above.');
  process.exit(1);
}
