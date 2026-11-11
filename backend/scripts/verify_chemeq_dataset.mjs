import fs from 'fs';
import { allChemEqQuestions } from './chemeq_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('backend/scripts/chemeq_official_key.json', 'utf8'));

console.log('=== VERIFYING CHEMICAL EQUILIBRIUM DATASET ===');
console.log(`Total questions in dataset: ${allChemEqQuestions.length}`);

if (allChemEqQuestions.length !== 45) {
  console.error(`ERROR: Expected 45 questions, got ${allChemEqQuestions.length}`);
  process.exit(1);
}

let mismatches = 0;
let errors = 0;

allChemEqQuestions.forEach(q => {
  const num = q.question_number;
  const expectedKey = officialKey[num];

  if (!expectedKey) {
    console.error(`ERROR: No official key for Q${num}`);
    errors++;
  } else if (q.correct_option !== expectedKey) {
    console.error(`MISMATCH on Q${num}: dataset has ${q.correct_option}, official key has ${expectedKey}`);
    mismatches++;
  }

  if (!q.options || q.options.length !== 4) {
    console.error(`ERROR: Q${num} does not have 4 options`);
    errors++;
  }

  q.options.forEach((opt, idx) => {
    if (!opt || typeof opt !== 'string' || opt.trim().length === 0) {
      console.error(`ERROR: Q${num} option ${idx} is empty`);
      errors++;
    }
  });

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`ERROR: Q${num} question text is empty`);
    errors++;
  }

  if (!q.solution_text || q.solution_text.trim().length === 0) {
    console.error(`ERROR: Q${num} solution text is empty`);
    errors++;
  }

  // Check for unwanted exam prefixes
  if (/^Q\d+\./i.test(q.question_text) || /\[(NEET|AIPMT).*?\]/i.test(q.question_text)) {
    console.error(`ERROR: Q${num} has exam prefix in question_text: "${q.question_text.slice(0, 40)}"`);
    errors++;
  }

  // Check dollar balance
  const countDollars = (str) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '$' && (i === 0 || str[i - 1] !== '\\')) count++;
    }
    return count;
  };

  const qDollars = countDollars(q.question_text);
  if (qDollars % 2 !== 0) {
    console.warn(`WARNING: Q${num} question_text has unbalanced dollar signs (${qDollars})`);
  }

  const sDollars = countDollars(q.solution_text);
  if (sDollars % 2 !== 0) {
    console.warn(`WARNING: Q${num} solution_text has unbalanced dollar signs (${sDollars})`);
  }
});

console.log(`Verification Complete:`);
console.log(`- Total Questions: ${allChemEqQuestions.length}`);
console.log(`- Key Mismatches: ${mismatches}`);
console.log(`- Format Errors: ${errors}`);

if (mismatches === 0 && errors === 0) {
  console.log('SUCCESS: All 45 questions 100% verified against official answer key!');
} else {
  process.exit(1);
}
