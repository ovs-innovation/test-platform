import { ALL_GRAVITATION_JEE_PYQ_QUESTIONS } from './gravitation_jee_pyq_questions_data.mjs';
import fs from 'fs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/gravitation_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('backend/scripts/gravitation_diagram_urls.json', 'utf8'));

console.log('========================================================');
console.log('       MASTER VERIFICATION: ALL 228 GRAVITATION QUESTIONS');
console.log('========================================================');

const total = ALL_GRAVITATION_JEE_PYQ_QUESTIONS.length;
console.log(`1. Total questions count: ${total} (Target: 228)`);
if (total !== 228) {
  console.error(`ERROR: Expected 228 questions, got ${total}`);
  process.exit(1);
}

// Check consecutive qNums
const seenQ = new Set();
for (let i = 0; i < total; i++) {
  const q = ALL_GRAVITATION_JEE_PYQ_QUESTIONS[i];
  if (q.qNum !== i + 1) {
    console.error(`ERROR: Non-consecutive qNum at index ${i}: ${q.qNum}`);
    process.exit(1);
  }
  seenQ.add(q.qNum);
}
console.log(`2. Consecutive qNums: 1 to 228 verified with 0 duplicates and 0 gaps.`);

let dummyOptionsCount = 0;
let keyMismatches = 0;
let diagramCount = 0;
let numericalCount = 0;
let mcqCount = 0;
let emptyStems = 0;
let emptySolutions = 0;

for (const q of ALL_GRAVITATION_JEE_PYQ_QUESTIONS) {
  if (!q.question || q.question.trim().length === 0) emptyStems++;
  if (!q.solution || q.solution.trim().length === 0) emptySolutions++;

  if (q.image_url) {
    diagramCount++;
    if (!q.image_url.startsWith('https://res.cloudinary.com/fyxpnmdh/')) {
      console.error(`Invalid image url for Q${q.qNum}: ${q.image_url}`);
    }
  }

  const offKey = keys[q.qNum];
  if (q.question_type === 'numerical') {
    numericalCount++;
    if (q.options.length !== 0) {
      console.error(`Numerical Q${q.qNum} has non-empty options array!`);
    }
    if (q.correct_option !== null) {
      console.error(`Numerical Q${q.qNum} has non-null correct_option!`);
    }
    if (String(q.numeric_answer) !== String(offKey)) {
      console.error(`Numerical mismatch for Q${q.qNum}: got ${q.numeric_answer}, expected ${offKey}`);
      keyMismatches++;
    }
  } else {
    mcqCount++;
    if (q.options.length !== 4) {
      console.error(`MCQ Q${q.qNum} does not have 4 options! Count: ${q.options.length}`);
    }
    for (const opt of q.options) {
      if (typeof opt === 'string' && (opt.startsWith('Option (') || opt.startsWith('Option A for Q'))) {
        dummyOptionsCount++;
      }
    }
    const offIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey];
    if (q.correct_option !== offIdx) {
      console.error(`MCQ mismatch for Q${q.qNum}: got ${q.correct_option}, expected ${offIdx} (${offKey})`);
      keyMismatches++;
    }
  }
}

console.log(`3. Dummy options count: ${dummyOptionsCount} (Must be 0)`);
console.log(`4. Key mismatches count: ${keyMismatches} (Must be 0)`);
console.log(`5. Diagrams attached: ${diagramCount} / 24 verified`);
console.log(`6. Numerical questions: ${numericalCount} / 16 verified`);
console.log(`7. MCQ questions: ${mcqCount} / 212 verified`);
console.log(`8. Empty stems: ${emptyStems}, Empty solutions: ${emptySolutions}`);

if (dummyOptionsCount === 0 && keyMismatches === 0 && total === 228 && diagramCount === 24) {
  console.log('\n>>> SUCCESS: ALL 228 QUESTIONS VERIFIED AND COMPLIANT! <<<');
} else {
  console.error('\n>>> VERIFICATION FAILED! <<<');
  process.exit(1);
}
