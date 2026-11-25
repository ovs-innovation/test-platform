import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const finalQuestions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_jee_final_217.json'), 'utf8'));

console.log(`Loaded ${finalQuestions.length} questions.`);

let mcqs = 0;
let numerics = 0;
let diagrams = 0;
let dummyOptions = 0;
const diagQs = [];

for (const q of finalQuestions) {
  if (q.question_type === 'numerical') {
    numerics++;
    if (q.options.length !== 0) console.error(`Q${q.q_num} numerical has options!`);
    if (isNaN(q.numeric_answer)) console.error(`Q${q.q_num} numerical answer is NaN!`);
  } else {
    mcqs++;
    if (q.options.length !== 4) console.error(`Q${q.q_num} MCQ does not have 4 options!`);
    for (const opt of q.options) {
      if (!opt || /^(?:\([A-D]\)|Option [A-D])$/i.test(opt.trim())) {
        dummyOptions++;
        console.error(`Q${q.q_num} has dummy option: ${opt}`);
      }
    }
  }

  if (q.image_url) {
    diagrams++;
    diagQs.push(q.q_num);
  }
}

console.log(`=== AUDIT SUMMARY ===`);
console.log(`Total questions: ${finalQuestions.length}`);
console.log(`MCQs: ${mcqs}`);
console.log(`Numericals: ${numerics}`);
console.log(`Dummy options count: ${dummyOptions}`);
console.log(`Diagrams attached: ${diagrams} (Qs: ${diagQs.join(', ')})`);

console.log(`\nSample Q1:`, finalQuestions[0]);
console.log(`\nSample Q13 (diagram):`, finalQuestions[12]);
console.log(`\nSample Q64 (numerical):`, finalQuestions[63]);
console.log(`\nSample Q217 (last):`, finalQuestions[216]);
