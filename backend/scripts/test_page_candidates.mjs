import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// For each page 1..211, find question candidate lines
const pageCandidates = {};

for (let p = 1; p <= 211; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  const candidates = [];

  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx].trim();
    if (!l) continue;
    if (l.includes('AcadXL') || l.includes('PREVIOUS') || l.includes('Current Electricity') || l.includes('Questions: 408')) continue;

    // A question start line typically:
    // Starts with a number (1..408) or OCR equivalent
    // And is followed by question statement text (>10 chars or next line is long)
    const mNum = l.match(/^(?:[~*#_>|§©®\s()[\]-]{0,3})?(\d{1,3}|[A-Za-z]{1,2}\d{0,2})[\.\:\;\,\s\-\)\~*#]\s*(.*)/);
    if (mNum) {
      const rest = mNum[2].trim();
      const nextLine = (idx + 1 < lines.length) ? lines[idx + 1].trim() : '';
      if (rest.length > 10 || nextLine.length > 10) {
        // Exclude options like (A) ... or (1) ...
        if (!/^[A-D]\)/i.test(l) && !/^\([A-D]\)/i.test(l)) {
          candidates.push({ lIdx: idx, rawNum: mNum[1], text: l });
        }
      }
    }
  }
  pageCandidates[p] = candidates;
}

let totalCand = 0;
for (let p = 1; p <= 211; p++) {
  totalCand += pageCandidates[p].length;
}
console.log(`Total question start candidates found across 211 pages: ${totalCand}`);

// Print candidates for first 25 pages
for (let p = 1; p <= 25; p++) {
  console.log(`Page ${p} (${pageCandidates[p].length} Qs):`, pageCandidates[p].map(c => `[L${c.lIdx}] ${c.rawNum}: ${c.text.substring(0, 50)}`));
}
