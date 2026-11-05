import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/official_answer_key_statistics.json', 'utf8').replace(/^\uFEFF/, '');
const ansKey = JSON.parse(raw);

let mcqCount = 0;
let numCount = 0;

for (let i = 1; i <= 160; i++) {
  const ans = ansKey[i];
  if (['A', 'B', 'C', 'D'].includes(ans)) {
    mcqCount++;
  } else {
    numCount++;
    console.log(`Q${i}: numerical answer = ${ans}`);
  }
}

console.log(`Total MCQs: ${mcqCount}, Total Numerical: ${numCount}`);

