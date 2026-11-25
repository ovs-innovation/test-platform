import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// Let's gather all lines across pages 1..250 with their page numbers
const allLines = [];
for (let p = 1; p <= 250; p++) {
  const text = ocrCache[String(p)] || '';
  const lines = text.split('\n');
  for (let l of lines) {
    allLines.push({ page: p, text: l.trim() });
  }
}

// Track question blocks
let currentQ = 1;
const questionBlocks = {};

for (let i = 0; i < allLines.length; i++) {
  const { page, text } = allLines[i];
  if (!text) continue;

  // Check if line starts a question number matching currentQ or near currentQ
  // E.g. currentQ=31, line might be "31. The focal...", "3. The focal...", "31 -", etc.
  const m = text.match(/^(?:Q\.?\s*)?(\d{1,3})[\.\-\)]\s*(.*)/i);
  if (m) {
    const num = parseInt(m[1], 10);
    // If num is exactly currentQ, or within +/- 1 of currentQ
    if (num === currentQ) {
      if (!questionBlocks[currentQ]) {
        questionBlocks[currentQ] = { page, startLine: text, lines: [] };
      }
    }
  }

  // Also check if line has ANSWER: or Answer:
  const mAns = text.match(/^(?:ANSWER|Answer|Ans)\s*:\s*([^\s]+)/i);
  if (mAns) {
    let ans = mAns[1].toUpperCase().replace(/[\(\)\[\]\.]/g, '');
    if (ans === '©' || ans === 'C') ans = 'C';
    if (ans === '0' || ans === 'D') ans = 'D';
    if (ans === 'B' || ans === '8') ans = 'B';
    if (ans === 'A' || ans === '4') ans = 'A';

    if (!questionBlocks[currentQ]) {
      questionBlocks[currentQ] = { page, answer: ans, lines: [] };
    } else {
      questionBlocks[currentQ].answer = ans;
    }
    currentQ++;
  } else if (questionBlocks[currentQ]) {
    questionBlocks[currentQ].lines.push(text);
  }
}

console.log(`Tracked up to question: ${currentQ - 1}`);
console.log(`Total question blocks created: ${Object.keys(questionBlocks).length}`);
fs.writeFileSync(
  path.resolve(__dirname, 'ray_monotonic_blocks.json'),
  JSON.stringify(questionBlocks, null, 2)
);
