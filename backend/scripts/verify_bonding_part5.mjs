import fs from 'fs';
import { BONDING_PART5 } from './clean_bonding_part5.mjs';

const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/bonding_official_keys.json', 'utf8'));

console.log('=== Verifying Part 5 (Q221 - Q270) ===');
console.log('Total questions in Part 5:', BONDING_PART5.length);

let errors = 0;
const expectedCount = 50;
if (BONDING_PART5.length !== expectedCount) {
  console.error(`Error: Expected ${expectedCount} questions, got ${BONDING_PART5.length}`);
  errors++;
}

for (let i = 0; i < BONDING_PART5.length; i++) {
  const q = BONDING_PART5[i];
  const expectedQNum = 221 + i;
  if (q.qNum !== expectedQNum) {
    console.error(`Error at index ${i}: expected qNum ${expectedQNum}, got ${q.qNum}`);
    errors++;
  }

  const offKey = officialKeys[q.qNum] || officialKeys[String(q.qNum)];
  if (!offKey) {
    console.error(`Missing official key for Q${q.qNum}`);
    errors++;
    continue;
  }

  if (q.question_type === 'mcq') {
    const letters = ['A', 'B', 'C', 'D'];
    const chosenLetter = letters[q.correct_option];
    if (chosenLetter !== offKey) {
      console.error(`Key mismatch for Q${q.qNum}: parsed option index ${q.correct_option} (${chosenLetter}) vs official key ${offKey}`);
      errors++;
    }
    if (!q.options || q.options.length !== 4) {
      console.error(`Invalid options count for Q${q.qNum}: ${q.options?.length}`);
      errors++;
    }
    for (const opt of q.options) {
      if (opt.toLowerCase().includes('dummy') || opt.trim().length === 0) {
        console.error(`Dummy or empty option in Q${q.qNum}: "${opt}"`);
        errors++;
      }
    }
  } else if (q.question_type === 'numerical') {
    if (parseInt(q.numeric_answer) !== parseInt(offKey)) {
      console.error(`Numeric answer mismatch for Q${q.qNum}: got ${q.numeric_answer} vs official key ${offKey}`);
      errors++;
    }
  }

  if (!q.question || q.question.toLowerCase().includes('dummy')) {
    console.error(`Dummy question text in Q${q.qNum}`);
    errors++;
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 50 questions in Part 5 verified cleanly with 100% key match and 0 dummy options!');
} else {
  console.error(`FAILED: ${errors} errors found in Part 5.`);
  process.exit(1);
}
