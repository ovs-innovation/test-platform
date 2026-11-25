import fs from 'fs';
import { ALL_THERMO_QUESTIONS } from './thermo_jee_pyq_questions_data.mjs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/thermo_official_keys.json', 'utf8'));

console.log('=== Master Verification of All 245 Thermodynamics Questions ===');
console.log('Total questions loaded:', ALL_THERMO_QUESTIONS.length);

let errors = 0;
let mcqCount = 0;
let numCount = 0;
let diagramCount = 0;

if (ALL_THERMO_QUESTIONS.length !== 245) {
  console.error(`Total questions mismatch: expected 245, got ${ALL_THERMO_QUESTIONS.length}`);
  errors++;
}

for (let i = 1; i <= 245; i++) {
  const q = ALL_THERMO_QUESTIONS.find(x => x.qNum === i);
  if (!q) {
    console.error(`Missing Question ${i}`);
    errors++;
    continue;
  }

  const offKey = keys[i];
  if (!offKey) {
    console.error(`Missing official key for Question ${i}`);
    errors++;
  }

  if (q.image_url) {
    diagramCount++;
  }

  if (q.question_type === 'numerical') {
    numCount++;
    if (String(q.numeric_answer).trim() !== String(offKey).trim()) {
      console.error(`Numerical mismatch for Q${i}: got ${q.numeric_answer}, expected ${offKey}`);
      errors++;
    }
  } else if (q.question_type === 'mcq') {
    mcqCount++;
    const offIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey];
    if (q.correct_option !== offIdx) {
      console.error(`MCQ mismatch for Q${i}: got ${q.correct_option}, expected ${offIdx} (${offKey})`);
      errors++;
    }
    if (!q.options || q.options.length !== 4) {
      console.error(`Options count error for Q${i}: has ${q.options ? q.options.length : 0}`);
      errors++;
    }
    for (const opt of q.options || []) {
      if (typeof opt !== 'string' || opt.trim() === '' || opt.startsWith('Option (') || opt.includes('dummy')) {
        console.error(`Invalid option in Q${i}: ${opt}`);
        errors++;
      }
    }
  } else {
    console.error(`Unknown question_type for Q${i}: ${q.question_type}`);
    errors++;
  }
}

console.log(`Statistics:`);
console.log(`- MCQ Questions: ${mcqCount}`);
console.log(`- Numerical Questions: ${numCount}`);
console.log(`- Questions with Diagrams: ${diagramCount}`);
console.log(`- Total Errors: ${errors}`);

if (errors === 0) {
  console.log('MASTER VERIFICATION PASSED: All 245 questions are perfectly validated!');
} else {
  console.error('Master verification FAILED!');
  process.exit(1);
}
