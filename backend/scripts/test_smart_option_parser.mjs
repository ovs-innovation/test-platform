import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), 'utf8'));

// Smart option parser
function parseOptions(rawText) {
  // Normalize OCR symbols for options
  let text = rawText;
  text = text.replace(/®\s*\)/g, '(B)');
  text = text.replace(/®/g, '(B)');
  text = text.replace(/©\s*\)/g, '(C)');
  text = text.replace(/©/g, '(C)');
  text = text.replace(/\bW\s*([0-9a-zA-Z\$\\])/g, '(A) $1');
  text = text.replace(/\bA\)\s*/g, '(A) ');
  text = text.replace(/\bB\)\s*/g, '(B) ');
  text = text.replace(/\bC\)\s*/g, '(C) ');
  text = text.replace(/\bD\)\s*/g, '(D) ');

  // Look for indices of (A), (B), (C), (D)
  const aMatch = text.match(/\(A\)\s*/i);
  const bMatch = text.match(/\(B\)\s*/i);
  const cMatch = text.match(/\(C\)\s*/i);
  const dMatch = text.match(/\(D\)\s*/i);

  if (aMatch && bMatch && cMatch && dMatch) {
    const aIdx = aMatch.index;
    const bIdx = bMatch.index;
    const cIdx = cMatch.index;
    const dIdx = dMatch.index;

    if (aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
      const qBody = text.slice(0, aIdx).trim();
      const optA = text.slice(aIdx + aMatch[0].length, bIdx).trim();
      const optB = text.slice(bIdx + bMatch[0].length, cIdx).trim();
      const optC = text.slice(cIdx + cMatch[0].length, dIdx).trim();
      const optD = text.slice(dIdx + dMatch[0].length).trim();
      return { qBody, options: [optA, optB, optC, optD], success: true };
    }
  }

  return { qBody: text, options: [], success: false };
}

let successCount = 0;
let failCount = 0;
const failedQs = [];

for (let q = 1; q <= 217; q++) {
  const item = parsed[q];
  if (item.isNumeric) continue;
  const res = parseOptions(item.rawQuestion);
  if (res.success && res.options.every(o => o.length > 0)) {
    successCount++;
  } else {
    failCount++;
    failedQs.push(q);
  }
}

console.log(`Smart option parser: ${successCount} successful, ${failCount} failed.`);
console.log('Failed question numbers:', failedQs);
