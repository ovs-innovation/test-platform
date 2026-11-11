import fs from 'fs';
import { pblockAllQuestions } from './pblock_pyq_questions_data.mjs';

const key = JSON.parse(fs.readFileSync('./backend/scripts/pblock_official_key.json', 'utf8'));

console.log(`--- Verifying p-block Questions Dataset ---`);
console.log(`Total questions loaded: ${pblockAllQuestions.length}`);

if (pblockAllQuestions.length !== 161) {
  console.error(`ERROR: Expected 161 questions, got ${pblockAllQuestions.length}`);
  process.exit(1);
}

let errors = 0;
const seen = new Set();

pblockAllQuestions.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.question_number !== expectedNum) {
    console.error(`Index ${idx}: expected question_number ${expectedNum}, got ${q.question_number}`);
    errors++;
  }
  if (seen.has(q.question_number)) {
    console.error(`Duplicate question_number: ${q.question_number}`);
    errors++;
  }
  seen.add(q.question_number);

  // Check official key match
  const official = key[q.question_number];
  if (q.correct_option !== official) {
    console.error(`Q${q.question_number}: official key is ${official}, but question has ${q.correct_option}`);
    errors++;
  }

  // Check 4 options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Q${q.question_number}: invalid options array length ${q.options ? q.options.length : 0}`);
    errors++;
  } else {
    q.options.forEach((opt, oi) => {
      if (!opt || typeof opt !== 'string' || opt.trim().length === 0) {
        console.error(`Q${q.question_number} opt ${oi}: empty option`);
        errors++;
      }
    });
  }

  // Check valid option letter
  if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
    console.error(`Q${q.question_number}: invalid correct_option ${q.correct_option}`);
    errors++;
  }

  // Check question text and solution text
  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`Q${q.question_number}: empty question_text`);
    errors++;
  }
  if (!q.solution_text || q.solution_text.trim().length === 0) {
    console.error(`Q${q.question_number}: empty solution_text`);
    errors++;
  }

  // Check for exam prefix tags in question text
  if (/^(\[)?\s*(NEET|AIPMT)/i.test(q.question_text)) {
    console.warn(`Q${q.question_number}: question_text starts with exam prefix: "${q.question_text.slice(0, 30)}..."`);
    errors++;
  }

  // Check KaTeX dollar balance
  const checkDollars = (txt, field) => {
    let count = 0;
    for (let i = 0; i < txt.length; i++) {
      if (txt[i] === '$' && (i === 0 || txt[i-1] !== '\\')) {
        count++;
      }
    }
    if (count % 2 !== 0) {
      console.error(`Q${q.question_number} [${field}]: Unbalanced '$' count (${count}) in: "${txt.slice(0, 60)}..."`);
      errors++;
    }
  };

  checkDollars(q.question_text, 'question_text');
  q.options.forEach((opt, oi) => checkDollars(opt, `opt[${oi}]`));
  checkDollars(q.solution_text, 'solution_text');
});

console.log(`Verification completed with ${errors} error(s).`);
if (errors === 0) {
  console.log(`SUCCESS: All 161 questions passed verification!`);
} else {
  process.exit(1);
}

