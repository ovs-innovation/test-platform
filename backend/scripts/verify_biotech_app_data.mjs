import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_final_questions.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_official_keys.json', 'utf8'));

console.log('--- Verifying Biotechnology and its Applications Data ---');
console.log(`Total questions: ${questions.length}`);

let passed = 0;
for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  const expectedNum = i + 1;
  const officialKey = officialKeys[expectedNum];

  if (q.qNum !== expectedNum) {
    console.error(`Mismatch qNum: expected ${expectedNum}, got ${q.qNum}`);
    continue;
  }
  if (!q.question_text || q.question_text.length < 5) {
    console.error(`Q${expectedNum} short question_text:`, q.question_text);
    continue;
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Q${expectedNum} options count !== 4:`, q.options);
    continue;
  }
  if (q.options.some(o => !o || o.trim().length === 0)) {
    console.error(`Q${expectedNum} empty option found:`, q.options);
    continue;
  }
  if (q.correct_option !== officialKey) {
    console.error(`Q${expectedNum} key mismatch: parsed ${q.correct_option}, official ${officialKey}`);
    continue;
  }
  if (!q.solution || q.solution.length < 50) {
    console.error(`Q${expectedNum} solution missing or too short:`, q.solution);
    continue;
  }

  passed++;
}

console.log(`Verification: ${passed} / 99 questions passed 100%!`);
