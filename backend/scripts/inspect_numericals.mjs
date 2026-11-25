import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));
const existing = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_jee_final_408.json'), 'utf8'));

const numQs = [];
for (let q = 1; q <= 408; q++) {
  const k = keys[q];
  if (!['A', 'B', 'C', 'D'].includes(k)) {
    const ex = existing.find(x => x.q_num === q);
    numQs.push({
      q_num: q,
      answer: k,
      textSnippet: ex?.question_text?.slice(0, 90) || ''
    });
  }
}

console.log('Total numericals:', numQs.length);
console.log('First 25 numericals:');
numQs.slice(0, 25).forEach(n => console.log(`Q${n.q_num}: Ans=${n.answer} | ${n.textSnippet}`));
console.log('Last 25 numericals:');
numQs.slice(-25).forEach(n => console.log(`Q${n.q_num}: Ans=${n.answer} | ${n.textSnippet}`));
