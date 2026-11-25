import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_jee_final_300.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

console.log(`Auditing ${questions.length} questions...`);

const issues = [];

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  const qNum = i + 1;
  const offKey = officialKeys[qNum];

  // 1. Check text length
  if (!q.question_text || q.question_text.length < 15) {
    issues.push({ qNum, issue: 'Short question text', text: q.question_text });
  }

  // 2. Check options for MCQs
  if (q.question_type === 'single_choice') {
    if (!q.options || q.options.length !== 4) {
      issues.push({ qNum, issue: 'Invalid options count', count: q.options?.length });
    }
    if (q.correct_index === null || q.correct_index === undefined || q.correct_index < 0 || q.correct_index > 3) {
      issues.push({ qNum, issue: 'Invalid correct_index for MCQ', index: q.correct_index });
    }
  }

  // 3. Check numerical
  if (q.question_type === 'numerical') {
    if (q.numeric_answer === null || isNaN(q.numeric_answer)) {
      issues.push({ qNum, issue: 'Invalid numerical answer', answer: q.numeric_answer });
    }
  }

  // 4. Check solution
  if (!q.solution || q.solution.length < 5) {
    issues.push({ qNum, issue: 'Empty solution' });
  }
}

console.log(`Audit complete. Found ${issues.length} potential issues.`);
if (issues.length > 0) {
  console.log('Issues found:', issues.slice(0, 20));
}
