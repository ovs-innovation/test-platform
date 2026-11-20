import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_PBLOCK_JEE_PYQ_QUESTIONS } from './pblock_jee_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_diagram_urls.json'), 'utf8'));

console.log('=== VERIFYING ALL 96 P-BLOCK QUESTIONS ===');
console.log(`Total questions in dataset: ${ALL_PBLOCK_JEE_PYQ_QUESTIONS.length}`);

let errors = [];
let dummyOptions = [];
let diagramMatches = 0;
let mcqCount = 0;
let numericalCount = 0;

ALL_PBLOCK_JEE_PYQ_QUESTIONS.forEach((q, index) => {
  const expectedQ = index + 1;
  if (q.qNum !== expectedQ) {
    errors.push(`QNum mismatch at index ${index}: expected ${expectedQ}, got ${q.qNum}`);
  }

  const officialKey = officialKeys[String(q.qNum)];
  if (!officialKey) {
    errors.push(`Missing official key for Q${q.qNum}`);
  }

  // Check diagram
  if (diagramUrls[String(q.qNum)]) {
    if (q.image_url !== diagramUrls[String(q.qNum)]) {
      errors.push(`Q${q.qNum} image_url mismatch: expected ${diagramUrls[String(q.qNum)]}, got ${q.image_url}`);
    }
    diagramMatches++;
  } else {
    if (q.image_url) {
      errors.push(`Q${q.qNum} has unexpected image_url: ${q.image_url}`);
    }
  }

  if (q.question_type === 'numerical') {
    numericalCount++;
    if (!Array.isArray(q.options) || q.options.length !== 0) {
      errors.push(`Numerical Q${q.qNum} has non-empty options`);
    }
    if (q.correct_option !== null) {
      errors.push(`Numerical Q${q.qNum} has non-null correct_option`);
    }
    if (String(q.numeric_answer) !== officialKey) {
      errors.push(`Numerical Q${q.qNum} answer mismatch: expected ${officialKey}, got ${q.numeric_answer}`);
    }
  } else if (q.question_type === 'mcq') {
    mcqCount++;
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`MCQ Q${q.qNum} does not have exactly 4 options: got ${q.options?.length}`);
    }
    const optionLetters = ['A', 'B', 'C', 'D'];
    const letter = optionLetters[q.correct_option];
    if (letter !== officialKey) {
      errors.push(`MCQ Q${q.qNum} answer mismatch: expected ${officialKey}, got ${letter} (index ${q.correct_option})`);
    }

    q.options.forEach((opt, optIdx) => {
      if (!opt || opt.trim().length === 0) {
        dummyOptions.push(`Q${q.qNum} option ${optionLetters[optIdx]} is empty`);
      }
      if (/^option\s*[A-D]$/i.test(opt.trim()) || /^dummy/i.test(opt.trim())) {
        dummyOptions.push(`Q${q.qNum} option ${optionLetters[optIdx]} is a dummy placeholder: "${opt}"`);
      }
    });
  } else {
    errors.push(`Q${q.qNum} has invalid question_type: ${q.question_type}`);
  }
});

console.log(`- MCQs verified: ${mcqCount}`);
console.log(`- Numericals verified: ${numericalCount}`);
console.log(`- Diagrams attached & matched: ${diagramMatches}/21`);
console.log(`- Dummy options found: ${dummyOptions.length}`);
console.log(`- Total validation errors: ${errors.length}`);

if (errors.length > 0) {
  console.error('\nERRORS:');
  errors.forEach(e => console.error('  *', e));
  process.exit(1);
} else if (dummyOptions.length > 0) {
  console.error('\nDUMMY OPTIONS:');
  dummyOptions.forEach(d => console.error('  *', d));
  process.exit(1);
} else {
  console.log('\n[SUCCESS] ALL 96 P-BLOCK QUESTIONS VERIFIED 100% PERFECT WITH ZERO ERRORS!');
}
