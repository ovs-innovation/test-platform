import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_BONDING_QUESTIONS } from './bonding_jee_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'bonding_official_keys.json'), 'utf8'));

console.log('=== RIGOROUS VERIFICATION OF ALL 314 CHEMICAL BONDING JEE QUESTIONS ===');
console.log(`Total questions in dataset: ${ALL_BONDING_QUESTIONS.length}`);

if (ALL_BONDING_QUESTIONS.length !== 314) {
  console.error(`FATAL: Expected exactly 314 questions, got ${ALL_BONDING_QUESTIONS.length}`);
  process.exit(1);
}

let mismatches = 0;
let dummyErrors = 0;
let diagramCount = 0;
let mcqCount = 0;
let numericalCount = 0;

ALL_BONDING_QUESTIONS.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.qNum !== expectedNum) {
    console.error(`Index ${idx}: expected qNum ${expectedNum}, got ${q.qNum}`);
    mismatches++;
  }

  const offKey = officialKeys[String(q.qNum)];
  if (offKey === undefined) {
    console.error(`Q${q.qNum}: missing from official answer key`);
    mismatches++;
  }

  if (q.image_url) {
    diagramCount++;
    if (!q.image_url.startsWith('https://res.cloudinary.com/fyxpnmdh/image/upload/')) {
      console.error(`Q${q.qNum}: diagram URL is not valid Cloudinary CDN: ${q.image_url}`);
      dummyErrors++;
    }
  }

  if (q.question_type === 'numerical') {
    numericalCount++;
    if (q.options.length !== 0) {
      console.error(`Q${q.qNum}: Numerical has ${q.options.length} options (should be 0)`);
      dummyErrors++;
    }
    if (Number(q.numeric_answer) !== Number(offKey)) {
      console.error(`Q${q.qNum}: Numerical mismatch: parsed ${q.numeric_answer} vs official ${offKey}`);
      mismatches++;
    }
    if (q.marks !== 4 || q.negative_marks !== 0) {
      console.error(`Q${q.qNum}: Invalid marks for numerical: ${q.marks}, -${q.negative_marks}`);
      dummyErrors++;
    }
  } else if (q.question_type === 'mcq') {
    mcqCount++;
    if (q.options.length !== 4) {
      console.error(`Q${q.qNum}: MCQ has ${q.options.length} options (must be 4)`);
      dummyErrors++;
    }
    q.options.forEach((opt, oIdx) => {
      if (!opt || String(opt).trim().length === 0 || /dummy|placeholder/i.test(opt)) {
        console.error(`Q${q.qNum} Option ${oIdx}: invalid/dummy option text: "${opt}"`);
        dummyErrors++;
      }
    });

    const expectedIdx = ['A', 'B', 'C', 'D'].indexOf(offKey);
    if (q.correct_option !== expectedIdx) {
      console.error(`Q${q.qNum}: MCQ answer mismatch: parsed idx ${q.correct_option} vs official ${offKey} (idx ${expectedIdx})`);
      mismatches++;
    }
    if (q.marks !== 4 || q.negative_marks !== 1) {
      console.error(`Q${q.qNum}: Invalid marks for MCQ: ${q.marks}, -${q.negative_marks}`);
      dummyErrors++;
    }
  } else {
    console.error(`Q${q.qNum}: Unknown question_type: ${q.question_type}`);
    dummyErrors++;
  }

  if (!q.question || q.question.trim().length === 0) {
    console.error(`Q${q.qNum}: Empty question text`);
    dummyErrors++;
  }
  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`Q${q.qNum}: Empty solution text`);
    dummyErrors++;
  }
});

console.log('--- Summary ---');
console.log(`Total MCQs: ${mcqCount}`);
console.log(`Total Numericals: ${numericalCount}`);
console.log(`Total Diagrams Attached: ${diagramCount}`);
console.log(`Answer Key Mismatches: ${mismatches}`);
console.log(`Dummy / Validation Errors: ${dummyErrors}`);

if (mismatches === 0 && dummyErrors === 0 && ALL_BONDING_QUESTIONS.length === 314) {
  console.log('\n SUCCESS: ALL 314 QUESTIONS ARE 100% CLEAN, VERIFIED AND READY FOR DATABASE SEEDING!');
} else {
  console.error('\n FAILED: Corrections needed before seeding.');
  process.exit(1);
}
