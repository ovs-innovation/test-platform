import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BONDING_PART6 } from './clean_bonding_part6.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'bonding_official_keys.json'), 'utf8'));

console.log('=== VERIFYING CHEMICAL BONDING PART 6 (Q271 to Q314) ===');
console.log(`Loaded ${BONDING_PART6.length} questions.`);

if (BONDING_PART6.length !== 44) {
  console.error(`Expected 44 questions, got ${BONDING_PART6.length}`);
  process.exit(1);
}

let mismatches = 0;
let dummyCount = 0;

BONDING_PART6.forEach((q, idx) => {
  const expectedNum = 271 + idx;
  if (q.qNum !== expectedNum) {
    console.error(`Index ${idx}: expected qNum ${expectedNum}, got ${q.qNum}`);
    mismatches++;
  }

  const offKey = officialKeys[String(q.qNum)];
  if (offKey === undefined) {
    console.error(`Q${q.qNum}: missing official key`);
    mismatches++;
  }

  if (q.question_type === 'numerical') {
    if (q.options.length !== 0) {
      console.error(`Q${q.qNum}: numerical question has non-empty options`);
      dummyCount++;
    }
    if (Number(q.numeric_answer) !== Number(offKey)) {
      console.error(`Q${q.qNum}: numeric mismatch: parsed ${q.numeric_answer} vs official ${offKey}`);
      mismatches++;
    }
    if (q.marks !== 4 || q.negative_marks !== 0) {
      console.error(`Q${q.qNum}: invalid marks for numerical: ${q.marks}, ${q.negative_marks}`);
      mismatches++;
    }
  } else {
    if (q.options.length !== 4) {
      console.error(`Q${q.qNum}: MCQ has ${q.options.length} options (expected 4)`);
      dummyCount++;
    }
    q.options.forEach((opt, oIdx) => {
      if (!opt || String(opt).trim().length === 0 || /dummy|placeholder/i.test(opt)) {
        console.error(`Q${q.qNum} Opt ${oIdx}: invalid/dummy option "${opt}"`);
        dummyCount++;
      }
    });

    const expectedIdx = ['A', 'B', 'C', 'D'].indexOf(offKey);
    if (q.correct_option !== expectedIdx) {
      console.error(`Q${q.qNum}: MCQ key mismatch: parsed idx ${q.correct_option} vs official ${offKey} (idx ${expectedIdx})`);
      mismatches++;
    }
    if (q.marks !== 4 || q.negative_marks !== 1) {
      console.error(`Q${q.qNum}: invalid marks for MCQ: ${q.marks}, ${q.negative_marks}`);
      mismatches++;
    }
  }

  if (!q.question || q.question.trim().length === 0) {
    console.error(`Q${q.qNum}: empty question text`);
    dummyCount++;
  }
  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`Q${q.qNum}: empty solution text`);
    dummyCount++;
  }
});

console.log(`Verification Complete. Mismatches: ${mismatches}, Dummy issues: ${dummyCount}`);
if (mismatches === 0 && dummyCount === 0) {
  console.log('ALL 44 QUESTIONS IN PART 6 ARE 100% VERIFIED AND PASS ALL CRITERIA!');
} else {
  process.exit(1);
}
