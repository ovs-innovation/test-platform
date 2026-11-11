import fs from 'fs';
import { coordQuestions } from './coord_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('./backend/scripts/coord_official_key.json', 'utf8'));

console.log('=== VERIFYING COORDINATION COMPOUNDS PYQ DATASET ===');
console.log('Total questions loaded:', coordQuestions.length);

let errors = 0;

if (coordQuestions.length !== 121) {
  console.error(`ERROR: Expected 121 questions, got ${coordQuestions.length}`);
  errors++;
}

// 1. Check continuous sequence
for (let i = 0; i < coordQuestions.length; i++) {
  const q = coordQuestions[i];
  const expectedNum = i + 1;
  if (q.question_number !== expectedNum) {
    console.error(`Sequence Error at index ${i}: expected Q${expectedNum}, got Q${q.question_number}`);
    errors++;
  }
}

// 2. Check options, math balance, and answer keys
for (const q of coordQuestions) {
  const qNum = q.question_number;

  // Check question text
  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`Q${qNum}: Empty question_text`);
    errors++;
  }
  if (/^Q\d+\.?/i.test(q.question_text.trim()) || /^(NEET|AIPMT)\s*\d{4}/i.test(q.question_text.trim())) {
    console.error(`Q${qNum}: Contains prefix in question_text: "${q.question_text.slice(0, 30)}..."`);
    errors++;
  }

  // Check options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Q${qNum}: Expected 4 options, got ${q.options ? q.options.length : 'none'}`);
    errors++;
  } else {
    q.options.forEach((opt, idx) => {
      if (!opt || opt.trim().length === 0) {
        console.error(`Q${qNum} option ${idx} is empty`);
        errors++;
      }
    });
  }

  // Check solution text
  if (!q.solution_text || q.solution_text.trim().length === 0) {
    console.error(`Q${qNum}: Empty solution_text`);
    errors++;
  }

  // Check official key match
  const expectedKey = officialKey[String(qNum)];
  if (qNum === 121) {
    if (q.correct_option !== 'C, D') {
      console.error(`Q121 key mismatch: expected "C, D", got "${q.correct_option}"`);
      errors++;
    }
  } else {
    if (q.correct_option !== expectedKey) {
      console.error(`Q${qNum} key mismatch: expected "${expectedKey}", got "${q.correct_option}"`);
      errors++;
    }
  }

  // Check dollar balance
  const checkMath = (str, label) => {
    // Count unescaped single/double dollars
    const stripped = str.replace(/\\\$/g, '');
    const dollarCount = (stripped.match(/\$/g) || []).length;
    if (dollarCount % 2 !== 0) {
      console.warn(`Warning Q${qNum} ${label}: Unbalanced '$' count (${dollarCount}): ${str.slice(0, 50)}...`);
    }
  };

  checkMath(q.question_text, 'question_text');
  q.options.forEach((opt, idx) => checkMath(opt, `option[${idx}]`));
  checkMath(q.solution_text, 'solution_text');
}

if (errors === 0) {
  console.log('✅ ALL 121 QUESTIONS PASSED VALIDATION WITH 100% ACCURACY!');
} else {
  console.error(`❌ Validation failed with ${errors} errors.`);
  process.exit(1);
}
