import fs from 'fs';
import { allAldehydesQuestions } from './aldehydes_pyq_questions_data.mjs';

const officialAnswers = JSON.parse(fs.readFileSync('./backend/scripts/aldehydes_official_key.json', 'utf8'));

console.log(`Verifying ${allAldehydesQuestions.length} questions against official answer key...`);

let errors = 0;

for (let i = 1; i <= 138; i++) {
  const q = allAldehydesQuestions.find(item => item.question_number === i);
  if (!q) {
    console.error(`Missing Question ${i}`);
    errors++;
    continue;
  }

  const expectedAns = officialAnswers[i];
  // For Q138, can be A or A, D
  if (i === 138) {
    if (q.correct_option !== 'A' && q.correct_option !== 'D') {
      console.error(`Mismatch Q${i}: Got ${q.correct_option}, Expected A or D`);
      errors++;
    }
  } else if (q.correct_option !== expectedAns) {
    console.error(`Mismatch Q${i}: Got ${q.correct_option}, Expected ${expectedAns}`);
    errors++;
  }

  if (!q.question_text || !q.option_a || !q.option_b || !q.option_c || !q.option_d || !q.solution) {
    console.error(`Incomplete fields in Q${i}`);
    errors++;
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 138 questions verified 100% against official answer key with complete fields!');
} else {
  console.error(`Found ${errors} issues during verification.`);
  process.exit(1);
}

