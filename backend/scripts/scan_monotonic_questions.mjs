import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

const detections = [];

for (let p = 1; p <= 211; p++) {
  const text = cache[p] || '';
  const lines = text.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim();
    // Look for lines that look like start of a question
    // E.g. "407. A moving coil...", "71. In the electric...", "73.", "108. The..."
    const m = line.match(/^(\d{1,3})\s*[\.\)]\s*(.*)/);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 408) {
        detections.push({ page: p, qNum, lineText: line.slice(0, 70) });
      }
    }
  }
}

console.log('Total detections of standard Q numbers:', detections.length);
// Filter out detections that are obviously not question headings (e.g. inside solution formulas)
// If detections are mostly in increasing order:
const monotonic = [];
let lastQ = 0;
for (const d of detections) {
  if (d.qNum > lastQ && d.qNum <= lastQ + 10) {
    monotonic.push(d);
    lastQ = d.qNum;
  }
}

console.log('Monotonic question detections:', monotonic.length);
console.log('First 15 monotonic:', monotonic.slice(0, 15));
console.log('Last 15 monotonic:', monotonic.slice(-15));
