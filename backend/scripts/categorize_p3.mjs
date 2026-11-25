import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

const numList = [];
const mcqList = [];

for (let q = 201; q <= 300; q++) {
  const k = officialKeys[String(q)];
  const isNum = !['A', 'B', 'C', 'D'].includes(k);
  if (isNum) numList.push({ q, key: k });
  else mcqList.push({ q, key: k });
}

console.log(`Part 3: ${numList.length} Numericals, ${mcqList.length} MCQs`);
console.log('Numericals:', numList.map(n => `Q${n.q}(=${n.key})`).join(', '));
console.log('MCQs:', mcqList.map(m => `Q${m.q}(${m.key})`).join(', '));
