import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// We know questions run 1 to 300 sequentially across pages 1 to 170.
// Let's inspect page by page.
const qPositions = [];
let currentQ = 1;

for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim();
    if (!line) continue;

    // Check if line starts with currentQ
    // e.g. "1 ", "1.", "1-", "1)", "(1)", "M." for 11, "©." for 6/9/29/33, etc.
    let matchedQ = null;
    const numMatch = line.match(/^(\d{1,3})[\.\:\;\,\s\-\)\~]\s*(.*)/);
    if (numMatch) {
      const n = parseInt(numMatch[1], 10);
      if (n === currentQ || n === currentQ + 1) {
        matchedQ = n;
      }
    }

    // Special OCR replacements for AcadXL PYQ Bank:
    if (!matchedQ) {
      if (currentQ === 6 && p === 2 && /^©[\.\:\s]/.test(line)) matchedQ = 6;
      if (currentQ === 9 && p === 3 && /^©[\.\:\s]/.test(line)) matchedQ = 9;
      if (currentQ === 11 && p === 4 && /^M[\.\:\s]/.test(line)) matchedQ = 11;
      if (currentQ === 29 && p === 10 && /^(answeR|Two identical|The electrostatic)/i.test(line) === false && l === 0) matchedQ = 29;
      if (currentQ === 33 && p === 11 && /^33[\.\:\s]/.test(line)) matchedQ = 33;
    }

    if (matchedQ === currentQ) {
      qPositions.push({ qNum: currentQ, page: p, lineIdx: l, lineText: line });
      currentQ++;
    }
  }
}

console.log(`Found ${qPositions.length} out of 300 questions.`);
if (qPositions.length < 300) {
  console.log(`Next unlocated question: ${currentQ}`);
}
