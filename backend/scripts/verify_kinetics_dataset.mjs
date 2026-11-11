import fs from 'fs';
import { chemicalKineticsQuestions } from './kinetics_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('./backend/scripts/kinetics_official_key.json', 'utf8'));

console.log(`Total questions in dataset: ${chemicalKineticsQuestions.length}`);
if (chemicalKineticsQuestions.length !== 85) {
  console.error(`ERROR: Expected 85 questions, got ${chemicalKineticsQuestions.length}`);
  process.exit(1);
}

let mismatches = 0;
let katexErrors = 0;
let formatErrors = 0;

chemicalKineticsQuestions.forEach((q, idx) => {
  const qNum = idx + 1;
  const expectedKey = officialKey[qNum];

  // Check question number sequence
  if (q.question_number !== qNum) {
    console.error(`Q${qNum}: question_number mismatch: has ${q.question_number}`);
    formatErrors++;
  }

  // Check question text
  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`Q${qNum}: Empty question_text`);
    formatErrors++;
  }

  // Check for lingering [NEET ...] or [AIPMT ...] headers
  if (/^\[(NEET|AIPMT|CBSE|Karnataka|Re-NEET)/i.test(q.question_text.trim())) {
    console.error(`Q${qNum}: Contains raw exam header in question_text: ${q.question_text.slice(0, 30)}...`);
    formatErrors++;
  }

  // Check options
  if (!Array.isArray(q.options) || q.options.length < 4) {
    console.error(`Q${qNum}: Invalid options array: length ${q.options ? q.options.length : 0}`);
    formatErrors++;
  }

  // Check KaTeX balance ($ pairs)
  const fullText = `${q.question_text} ${q.options.join(' ')} ${q.solution_text || ''}`;
  const dollarCount = (fullText.match(/(?<!\\)\$/g) || []).length;
  if (dollarCount % 2 !== 0) {
    console.warn(`Q${qNum}: Unbalanced KaTeX $ count (${dollarCount}): ${q.question_text.slice(0, 60)}...`);
    katexErrors++;
  }

  // Check answer key
  if (Array.isArray(expectedKey)) {
    // Multi-select e.g. ['B', 'D']
    const expectedStr = expectedKey.slice().sort().join(', ');
    const actualStr = (q.correct_option || '').split(',').map(s => s.trim()).sort().join(', ');
    if (actualStr !== expectedStr) {
      console.error(`Q${qNum}: Answer mismatch! Expected [${expectedStr}], got [${actualStr}]`);
      mismatches++;
    }
  } else {
    // Single answer e.g. 'A'
    const actualStr = (q.correct_option || '').trim();
    if (actualStr !== expectedKey) {
      console.error(`Q${qNum}: Answer mismatch! Expected ${expectedKey}, got ${actualStr}`);
      mismatches++;
    }
  }
});

console.log('--- Verification Summary ---');
console.log(`Total Checked: ${chemicalKineticsQuestions.length}`);
console.log(`Answer Key Mismatches: ${mismatches}`);
console.log(`Formatting Errors: ${formatErrors}`);
console.log(`KaTeX Warning Count: ${katexErrors}`);

if (mismatches === 0 && formatErrors === 0) {
  console.log('SUCCESS: All 85 questions verified and 100% matched with official answer key!');
} else {
  process.exit(1);
}
