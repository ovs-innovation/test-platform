import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_part1_questions.json'), 'utf8'));
const p2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_part2_questions.json'), 'utf8'));
const p3 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_part3_questions.json'), 'utf8'));
const p4 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_part4_questions.json'), 'utf8'));

const allQuestions = [...p1, ...p2, ...p3, ...p4];
console.log(`Total questions merged: ${allQuestions.length}`);

// Validation
if (allQuestions.length !== 298) {
  throw new Error(`Expected exactly 298 questions, found ${allQuestions.length}`);
}

let mcqCount = 0;
let numCount = 0;
let diagCount = 0;
let dummyCount = 0;

for (let i = 0; i < 298; i++) {
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

  if (q.question_type === 'mcq') {
    mcqCount++;
    if (q.options.length !== 4) {
      throw new Error(`MCQ at Q${q.question_number} must have exactly 4 options`);
    }
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      throw new Error(`MCQ at Q${q.question_number} has invalid answer: ${q.correct_answer}`);
    }
  } else if (q.question_type === 'numerical') {
    numCount++;
    if (q.options.length !== 0) {
      throw new Error(`Numerical Q${q.question_number} must have empty options array`);
    }
    if (q.numeric_answer === null || isNaN(q.numeric_answer)) {
      throw new Error(`Numerical Q${q.question_number} has invalid numeric_answer: ${q.numeric_answer}`);
    }
  } else {
    throw new Error(`Unknown question_type: ${q.question_type} at Q${q.question_number}`);
  }
}

if (dummyCount > 0) {
  throw new Error(`Found ${dummyCount} dummy options! Must be strictly 0.`);
}

console.log('=== VALIDATION SUMMARY ===');
console.log(`- Total Questions: ${allQuestions.length} / 298`);
console.log(`- Multiple Choice (MCQ): ${mcqCount}`);
console.log(`- Numerical: ${numCount}`);
console.log(`- With Diagrams: ${diagCount}`);
console.log(`- Dummy Options: ${dummyCount} (strictly 0)`);

const outPath = path.resolve(__dirname, 'ray_jee_final_298.json');
fs.writeFileSync(outPath, JSON.stringify(allQuestions, null, 2));
console.log(`Final validated dataset saved to ${outPath}`);
