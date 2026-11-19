import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.join(__dirname, 'fluids_full_ocr_concat.txt'), 'utf8');

// Questions are numbered 1 to 195
// Let's find matches for question markers: (?:^|\n)\s*(?:Q\.?\s*)?([0-9]{1,3})[\.\s:\)]\s+
const lines = text.split('\n');

const qIndices = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const m = line.match(/^(?:Q\.?\s*)?([0-9]{1,3})[\.\s:\)]\s+(.*)/i);
  if (m) {
    const num = parseInt(m[1], 10);
    if (num >= 1 && num <= 195) {
      qIndices.push({ lineIndex: i, num, header: line });
    }
  }
}

console.log('Total question line matches found:', qIndices.length);
// Check for sequential matching
const byNum = {};
qIndices.forEach(item => {
  if (!byNum[item.num]) byNum[item.num] = [];
  byNum[item.num].push(item);
});

const missing = [];
for (let i = 1; i <= 195; i++) {
  if (!byNum[i]) missing.push(i);
}
console.log(`Missing question numbers (${missing.length}):`, missing);
