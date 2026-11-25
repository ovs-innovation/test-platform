import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_official_keys.json'), 'utf8'));

// We want to detect every question's page and approximate line position.
// Let's create an accurate page-by-page mapping.
const pageMap = [];

for (let p = 1; p <= 131; p++) {
  const text = cache[p] || '';
  const lines = text.split('\n');
  const qMatches = [];

  for (let li = 0; li < lines.length; li++) {
    const l = lines[li].trim();
    // Match question starts like "1.", "14.", "105.", etc.
    const m = l.match(/^(\d{1,3})\s*[\.\)]\s*(.*)$/);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 241) {
        qMatches.push({ qNum, lineIdx: li, rest: m[2] });
      }
    }
  }

  pageMap.push({ page: p, qMatches });
}

console.log('=== PAGE QUESTION DETECTION SUMMARY ===');
let totalDetected = 0;
const detectedMap = {};

for (const pm of pageMap) {
  for (const q of pm.qMatches) {
    if (!detectedMap[q.qNum]) {
      detectedMap[q.qNum] = [];
    }
    detectedMap[q.qNum].push(pm.page);
    totalDetected++;
  }
}

const missing = [];
for (let i = 1; i <= 241; i++) {
  if (!detectedMap[i]) missing.push(i);
}

console.log(`Total detected question starts: ${Object.keys(detectedMap).length}/241`);
console.log(`Missing from standard regex: ${missing.length}`, missing);
