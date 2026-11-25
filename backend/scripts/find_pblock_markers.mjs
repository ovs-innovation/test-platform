import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.resolve(__dirname, 'pblock_ocr_linear.txt'), 'utf8');

const regex = /(?:^|\n)\s*(\d{1,2})\.\s+/g;
let match;
const qPositions = [];
while ((match = regex.exec(text)) !== null) {
  const num = parseInt(match[1], 10);
  qPositions.push({ num, index: match.index, raw: match[0].trim() });
}

console.log(`Found ${qPositions.length} question markers.`);
const foundNums = new Set(qPositions.map(q => q.num));
const missing = [];
for (let i = 1; i <= 96; i++) {
  if (!foundNums.has(i)) missing.push(i);
}
console.log('Missing question numbers:', missing);
console.log('Duplicate or extra question numbers:', qPositions.filter((q, idx) => qPositions.findIndex(other => other.num === q.num) !== idx));
