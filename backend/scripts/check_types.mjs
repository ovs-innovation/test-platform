import fs from 'fs';

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));

let mcqCount = 0;
let numCount = 0;
const numList = [];

for (let i = 1; i <= 260; i++) {
  const ans = key[i];
  if (['A', 'B', 'C', 'D'].includes(ans)) {
    mcqCount++;
  } else {
    numCount++;
    numList.push({ q: i, ans });
  }
}

console.log(`Total: 260 questions`);
console.log(`MCQs: ${mcqCount}`);
console.log(`Numerical: ${numCount}`);
console.log(`Sample numericals:`, numList.slice(0, 15));

