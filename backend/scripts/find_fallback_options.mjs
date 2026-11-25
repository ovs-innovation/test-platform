import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const qs = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_jee_final_408.json'), 'utf8'));

// Check for common fallback options arrays in Current Electricity
const fallbackOptionSets = [
  JSON.stringify(['100%', '200%', '300%', '50%']),
  JSON.stringify(['1 A', '2 A', '0.5 A', '4 A']),
  JSON.stringify(['2 \\Omega', '4 \\Omega', '8 \\Omega', '1 \\Omega']),
  JSON.stringify(['2 V', '4 V', '6 V', '8 V']),
  JSON.stringify(['1', '2', '3', '4'])
];

let fallbackCount = 0;
const fallbackList = [];

for (let i = 0; i < qs.length; i++) {
  const q = qs[i];
  const qNum = i + 1;
  const optStr = JSON.stringify(q.options);
  if (fallbackOptionSets.includes(optStr) && qNum > 7) { // Q7 was genuinely 100%, 200%, 300%, 50%
    fallbackCount++;
    fallbackList.push({ qNum, opts: q.options, text: q.question_text.substring(0, 60) });
  }
}

console.log(`Questions using fallback option sets (after Q7): ${fallbackCount}`);
console.log('List of question numbers with fallback options:', fallbackList.map(f => f.qNum));
