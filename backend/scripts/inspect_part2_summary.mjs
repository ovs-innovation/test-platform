import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('./backend/scripts/extracted_305_raw.json', 'utf8'));

console.log('Part 2: Q61 to Q120 summary:');
let mcqCount = 0, numCount = 0;
for (let i = 60; i < 120; i++) {
  const q = raw[i];
  if (q.question_type === 'mcq') mcqCount++;
  else numCount++;
}
console.log('MCQs:', mcqCount, 'Numerical:', numCount);

// Sample first 5
for (let i = 60; i < 65; i++) {
  const q = raw[i];
  console.log(`\nQ${q.q_num} (Page ${q.page}) [${q.question_type}] Ans: ${q.expectedAns}`);
  console.log('Text:', q.question_text.slice(0, 100));
}

// Sample numerical questions in Part 2
for (let i = 60; i < 120; i++) {
  const q = raw[i];
  if (q.question_type === 'numerical') {
    console.log(`\nNumerical Q${q.q_num} (Page ${q.page}) Ans: ${q.expectedAns}`);
    console.log('Text:', q.question_text.slice(0, 100));
  }
}

