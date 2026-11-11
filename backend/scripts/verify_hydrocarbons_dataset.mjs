import fs from 'fs';
import { allHydrocarbonsPYQQuestions } from './hydrocarbons_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_official_key.json', 'utf8'));

console.log('=== Verifying Hydrocarbons PYQ Dataset ===');

let errors = [];

if (allHydrocarbonsPYQQuestions.length !== 103) {
  errors.push(`Expected 103 questions, got ${allHydrocarbonsPYQQuestions.length}`);
}

const seenNums = new Set();

for (let i = 0; i < allHydrocarbonsPYQQuestions.length; i++) {
  const q = allHydrocarbonsPYQQuestions[i];
  const qNum = q.question_number;

  if (qNum !== i + 1) {
    errors.push(`Question at index ${i} has question_number ${qNum}, expected ${i + 1}`);
  }

  if (seenNums.has(qNum)) {
    errors.push(`Duplicate question number: ${qNum}`);
  }
  seenNums.add(qNum);

  // Check official key match
  const expectedKey = officialKey[qNum];
  if (q.correct_option !== expectedKey) {
    errors.push(`Q${qNum} correct_option mismatch: got '${q.correct_option}', expected official key '${expectedKey}'`);
  }

  // Check options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`Q${qNum} does not have exactly 4 options`);
  } else {
    const keys = q.options.map(o => o.option_key).join('');
    if (keys !== 'ABCD') {
      errors.push(`Q${qNum} options keys are not ABCD: got '${keys}'`);
    }
    for (const opt of q.options) {
      if (!opt.option_text || opt.option_text.trim() === '') {
        errors.push(`Q${qNum} option ${opt.option_key} has empty text`);
      }
    }
  }

  // Check question text
  if (!q.question_text || q.question_text.trim() === '') {
    errors.push(`Q${qNum} has empty question_text`);
  }

  // Check solution text
  if (!q.solution_text || q.solution_text.trim() === '') {
    errors.push(`Q${qNum} has empty solution_text`);
  }

  // Check exam prefix leak
  if (/^Q\d+\./i.test(q.question_text) || /^\[(NEET|AIPMT|RE-NEET)/i.test(q.question_text)) {
    errors.push(`Q${qNum} question_text contains uncleaned prefix: ${q.question_text.slice(0, 30)}`);
  }

  // Check math delimiters balance
  const checkDelim = (str, fieldName) => {
    // Count unescaped $
    let countSingle = 0;
    for (let j = 0; j < str.length; j++) {
      if (str[j] === '$' && (j === 0 || str[j - 1] !== '\\')) {
        countSingle++;
      }
    }
    if (countSingle % 2 !== 0) {
      errors.push(`Q${qNum} ${fieldName} has unbalanced $ delimiter (${countSingle} unescaped '$')`);
    }
  };

  checkDelim(q.question_text, 'question_text');
  checkDelim(q.solution_text, 'solution_text');
  for (const opt of q.options) {
    checkDelim(opt.option_text, `option_${opt.option_key}`);
  }
}

if (errors.length > 0) {
  console.error(`\nVerification FAILED with ${errors.length} errors:`);
  errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log('\nVerification PASSED! All 103 questions are valid, keys match official key 100%, and KaTeX math is balanced!');
}
