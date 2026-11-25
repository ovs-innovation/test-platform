import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prelim = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_prelim_191.json'), 'utf8'));

// Function to split optLines into 4 options
function parseOptions(optLines) {
  const fullText = optLines.join(' ');
  // Try pattern: (A) ... (B) ... (C) ... (D) ...
  // Handle OCR variations: (8) for (B), © for (C), (©) for (C), (0) for (D), ® for (B)
  const norm = fullText
    .replace(/\(([A-Da-d1-4])\)/g, ' @$1@ ')
    .replace(/\((8)\)/g, ' @B@ ')
    .replace(/[©]\s*/g, ' @C@ ')
    .replace(/[®]\s*/g, ' @B@ ')
    .replace(/@([1-4])@/g, (m, d) => {
      const map = { '1': '@A@', '2': '@B@', '3': '@C@', '4': '@D@' };
      return map[d];
    });

  const aIdx = norm.indexOf('@A@');
  const bIdx = norm.indexOf('@B@');
  const cIdx = norm.indexOf('@C@');
  const dIdx = norm.indexOf('@D@');

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1 && aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
    const optA = norm.substring(aIdx + 3, bIdx).trim();
    const optB = norm.substring(bIdx + 3, cIdx).trim();
    const optC = norm.substring(cIdx + 3, dIdx).trim();
    const optD = norm.substring(dIdx + 3).trim();
    return [optA, optB, optC, optD];
  }

  return null;
}

let mcqSuccess = 0;
let mcqFail = 0;
const failedQs = [];

for (const q of prelim) {
  if (q.isNumeric) continue;
  const opts = parseOptions(q.optLines);
  if (opts && opts.length === 4 && opts.every(o => o.length > 0)) {
    mcqSuccess++;
  } else {
    mcqFail++;
    failedQs.push({ q: q.qNum, page: q.page, raw: q.optLines });
  }
}

console.log(`MCQ Options Parser: ${mcqSuccess} succeeded, ${mcqFail} need fine-tuning.`);
if (failedQs.length > 0) {
  console.log(`Failed Q numbers (${failedQs.length}):`, failedQs.map(f => f.q));
  console.log('Sample failed Qs:', failedQs.slice(0, 5));
}
