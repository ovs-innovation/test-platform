import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_part1_questions.json'), 'utf8'));
const p2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_part2_questions.json'), 'utf8'));
const p3 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_part3_questions.json'), 'utf8'));
const p4 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_part4_questions.json'), 'utf8'));

const allQuestions = [...p1, ...p2, ...p3, ...p4];
console.log(`Total questions merged: ${allQuestions.length}`);

// Validation
if (allQuestions.length !== 268) {
  throw new Error(`Expected exactly 268 questions, found ${allQuestions.length}`);
}

let mcqCount = 0;
let numCount = 0;
let diagCount = 0;
let dummyCount = 0;

for (let i = 0; i < 268; i++) {
  const expectedNum = i + 1;
  const q = allQuestions[i];

  if (q.question_number !== expectedNum) {
    throw new Error(`Question at index ${i} has number ${q.question_number}, expected ${expectedNum}`);
  }

  if (q.diagram_url) diagCount++;

  // Check for dummy options
  const dummyTerms = ['Option A', 'Option B', 'Option C', 'Option D', '(A)', '(B)', '(C)', '(D)'];
  for (const opt of q.options) {
    if (dummyTerms.includes(opt.option_text.trim())) {
      dummyCount++;
      console.error(`Dummy option detected at Q${q.question_number}: ${opt.option_text}`);
    }
  }

  if (q.question_type === 'numerical') {
    numCount++;
    if (q.options.length !== 0) {
      throw new Error(`Numerical Q${q.question_number} has non-empty options!`);
    }
    if (q.numeric_answer === null || isNaN(q.numeric_answer)) {
      throw new Error(`Numerical Q${q.question_number} has null/NaN numeric_answer!`);
    }
    if (q.numerical_tolerance !== 0) {
      throw new Error(`Numerical Q${q.question_number} has non-zero tolerance!`);
    }
  } else if (q.question_type === 'mcq') {
    mcqCount++;
    if (q.options.length !== 4) {
      throw new Error(`MCQ Q${q.question_number} does not have 4 options!`);
    }
    const ids = q.options.map(o => o.option_id);
    if (ids.join('') !== 'ABCD') {
      throw new Error(`MCQ Q${q.question_number} option IDs are ${ids.join(',')}, expected ABCD!`);
    }
  } else {
    throw new Error(`Invalid question_type: ${q.question_type} at Q${q.question_number}`);
  }
}

if (dummyCount > 0) {
  throw new Error(`Found ${dummyCount} dummy options! Must be strictly 0.`);
}

console.log('=== VALIDATION SUMMARY ===');
console.log(`Total questions: ${allQuestions.length} (Q1 to Q268)`);
console.log(`MCQs: ${mcqCount}`);
console.log(`Numericals: ${numCount}`);
console.log(`Questions with Diagrams: ${diagCount}`);
console.log(`Dummy Options: ${dummyCount} (PERFECT 0)`);

const OUT_FILE = path.resolve(__dirname, 'mag_jee_final_268.json');
fs.writeFileSync(OUT_FILE, JSON.stringify(allQuestions, null, 2));
console.log(`Successfully written final perfect dataset to ${OUT_FILE}`);
