import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_linear.txt'), 'utf8');
const lines = text.split('\n');
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

const qBlocks = {};
let currentQ = null;
let currentLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/^\s*(\d{1,3})\.\s+(.*)$/);
  if (m) {
    const num = parseInt(m[1], 10);
    if (num >= 201 && num <= 300) {
      if (currentQ) {
        qBlocks[currentQ] = currentLines;
      }
      currentQ = num;
      currentLines = [line];
      continue;
    }
  }
  if (currentQ) {
    currentLines.push(line);
  }
}
if (currentQ) {
  qBlocks[currentQ] = currentLines;
}

console.log('Found question blocks:', Object.keys(qBlocks).length);
fs.writeFileSync(path.resolve(__dirname, 'p3_raw_extracted.json'), JSON.stringify(qBlocks, null, 2));

// Check each Q in 201..300
for (let q = 201; q <= 300; q++) {
  const offKey = officialKeys[String(q)];
  const isNum = !['A', 'B', 'C', 'D'].includes(offKey);
  const block = qBlocks[q];
  if (!block) {
    console.log(`Q${q} NOT found in linear text! Official Key: ${offKey} (${isNum ? 'Numerical' : 'MCQ'})`);
  }
}
