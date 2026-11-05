import fs from 'fs';

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));

console.log("Answers for Q1 to Q65:");
const list = [];
for (let i = 1; i <= 65; i++) {
  list.push(`Q${i}:${key[i]}`);
}
console.log(list.join(', '));

