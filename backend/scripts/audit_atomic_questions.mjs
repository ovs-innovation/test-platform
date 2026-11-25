import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atomic_jee_final_146.json'), 'utf8'));

console.log(`Auditing ${questions.length} questions...`);

const dummyTerms = ['Option A', 'Option B', 'Option C', 'Option D', '(A)', '(B)', '(C)', '(D)'];
let dummyOptsCount = 0;
let shortStemCount = 0;
let shortSolCount = 0;

for (const q of questions) {
  if (q.question_text.length < 20) {
    console.warn(`Short stem Q${q.question_number}: "${q.question_text}"`);
    shortStemCount++;
  }
  if (q.question_type === 'mcq') {
    if (q.options.length !== 4) {
      console.error(`Q${q.question_number} MCQ does not have 4 options!`);
    }
    for (const opt of q.options) {
      if (dummyTerms.includes(opt.option_text.trim())) {
        dummyOptsCount++;
        console.warn(`Dummy option at Q${q.question_number}: "${opt.option_text}"`);
      }
    }
  } else {
    if (q.numeric_answer === null || isNaN(q.numeric_answer)) {
      console.error(`Numerical Q${q.question_number} has invalid numeric_answer:`, q.numeric_answer);
    }
  }

  if (q.solution.length < 20) {
    console.warn(`Short solution at Q${q.question_number}: "${q.solution}"`);
    shortSolCount++;
  }
}

console.log('\nAudit Summary:');
console.log(`- Total Questions: ${questions.length} / 146`);
console.log(`- Dummy Options: ${dummyOptsCount}`);
console.log(`- Short Stems: ${shortStemCount}`);
console.log(`- Short Solutions: ${shortSolCount}`);
