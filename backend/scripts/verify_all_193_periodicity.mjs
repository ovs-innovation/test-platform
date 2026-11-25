import fs from 'fs';
import { ALL_PERIODICITY_QUESTIONS } from './periodicity_jee_pyq_questions_data.mjs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/periodicity_official_keys.json', 'utf8'));

console.log('=== VERIFYING MASTER PERIODICITY DATASET (193 QUESTIONS) ===');
console.log(`Total questions loaded: ${ALL_PERIODICITY_QUESTIONS.length}`);

if (ALL_PERIODICITY_QUESTIONS.length !== 193) {
  console.error(`ERROR: Expected 193 questions, got ${ALL_PERIODICITY_QUESTIONS.length}`);
  process.exit(1);
}

let dummyCount = 0;
let keyMismatch = 0;
let diagramsWithUrl = 0;
let numericalCount = 0;
let mcqCount = 0;

for (let idx = 0; idx < ALL_PERIODICITY_QUESTIONS.length; idx++) {
  const q = ALL_PERIODICITY_QUESTIONS[idx];
  const expectedNum = idx + 1;

  if (q.qNum !== expectedNum) {
    console.error(`Sequence error at index ${idx}: expected qNum ${expectedNum}, got ${q.qNum}`);
    process.exit(1);
  }

  const offKey = keys[q.qNum];

  if (q.question_type === 'numerical') {
    numericalCount++;
    if (String(q.numeric_answer) !== String(offKey)) {
      console.error(`Numerical mismatch for Q${q.qNum}: got ${q.numeric_answer}, expected ${offKey}`);
      keyMismatch++;
    }
  } else {
    mcqCount++;
    const offIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey];
    if (q.correct_option !== offIdx) {
      console.error(`MCQ mismatch for Q${q.qNum}: got ${q.correct_option}, expected ${offIdx} (${offKey})`);
      keyMismatch++;
    }
    if (!q.options || q.options.length !== 4) {
      console.error(`Options length error for Q${q.qNum}: expected 4 options`);
      process.exit(1);
    }
    for (const opt of q.options) {
      if (typeof opt === 'string' && opt.startsWith('Option (')) {
        dummyCount++;
      }
    }
  }

  if (q.image_url) {
    console.log(`Q${q.qNum} has Question Diagram: ${q.image_url}`);
    diagramsWithUrl++;
  }
  if (q.solution_image_url) {
    console.log(`Q${q.qNum} has Solution Diagram: ${q.solution_image_url}`);
    diagramsWithUrl++;
  }
}

console.log(`MCQ count: ${mcqCount}`);
console.log(`Numerical count: ${numericalCount}`);
console.log(`Total diagrams attached: ${diagramsWithUrl}`);
console.log(`Dummy options found: ${dummyCount}`);
console.log(`Key mismatches found: ${keyMismatch}`);

if (dummyCount === 0 && keyMismatch === 0 && ALL_PERIODICITY_QUESTIONS.length === 193) {
  console.log('SUCCESS: ALL 193 QUESTIONS 100% VALIDATED AGAINST OFFICIAL KEYS WITH 0 DUMMY OPTIONS!');
} else {
  console.error('FAILED: Validation found errors.');
  process.exit(1);
}
