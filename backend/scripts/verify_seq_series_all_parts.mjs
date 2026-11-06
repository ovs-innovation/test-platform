import fs from 'fs';
import { SEQ_SERIES_PART1 } from './data/seq_series_part1.mjs';
import { SEQ_SERIES_PART2 } from './data/seq_series_part2.mjs';
import { SEQ_SERIES_PART3 } from './data/seq_series_part3.mjs';
import { SEQ_SERIES_PART4 } from './data/seq_series_part4.mjs';
import { SEQ_SERIES_PART5 } from './data/seq_series_part5.mjs';

const allQuestions = [
  ...SEQ_SERIES_PART1,
  ...SEQ_SERIES_PART2,
  ...SEQ_SERIES_PART3,
  ...SEQ_SERIES_PART4,
  ...SEQ_SERIES_PART5
];

console.log(`Total questions loaded: ${allQuestions.length}`);

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_seq_series.json', 'utf8'));
const letters = ['A', 'B', 'C', 'D'];

let errors = 0;
const seenQNums = new Set();

for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];
  const expectedNum = i + 1;

  if (q.q_num !== expectedNum) {
    console.error(`Sequence error at index ${i}: expected Q${expectedNum}, got Q${q.q_num}`);
    errors++;
  }

  if (seenQNums.has(q.q_num)) {
    console.error(`Duplicate question number: Q${q.q_num}`);
    errors++;
  }
  seenQNums.add(q.q_num);

  if (!q.question_text || q.question_text.trim() === '') {
    console.error(`Empty question text at Q${q.q_num}`);
    errors++;
  }

  if (!q.solution || q.solution.trim() === '') {
    console.error(`Empty solution at Q${q.q_num}`);
    errors++;
  }

  const expectedAns = String(key[q.q_num]).trim();

  if (q.question_type === 'mcq') {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Q${q.q_num}: Expected 4 options, got ${q.options?.length}`);
      errors++;
    }
    const actualAns = letters[q.correct_index];
    if (actualAns !== expectedAns) {
      console.error(`Q${q.q_num}: Option index ${q.correct_index} (${actualAns}) does not match expected ${expectedAns}`);
      errors++;
    }
  } else if (q.question_type === 'numerical') {
    if (String(q.correct_answer).trim() !== expectedAns) {
      console.error(`Q${q.q_num}: Numerical answer ${q.correct_answer} does not match expected ${expectedAns}`);
      errors++;
    }
  } else {
    console.error(`Q${q.q_num}: Invalid question type ${q.question_type}`);
    errors++;
  }
}

if (errors === 0 && allQuestions.length === 350) {
  console.log('\n======================================================');
  console.log(' ALL 350 QUESTIONS VERIFIED WITH 100% SUCCESS!');
  console.log(' - Exactly 350/350 questions present in order (1..350)');
  console.log(' - 100% match against official answer key');
  console.log(' - Zero empty question texts, solutions, or options');
  console.log('======================================================\n');
} else {
  console.error(`\nFound ${errors} errors during verification!`);
  process.exit(1);
}

