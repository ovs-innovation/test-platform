import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Search each page for question headers
const qLocations = {};

for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx].trim();
    const m = l.match(/^[\"\'\\(\\[]?(\d{1,3})[\.\:\;\,\s\-]\s*(.*)/);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 300) {
        if (!qLocations[qNum]) qLocations[qNum] = [];
        qLocations[qNum].push({ page: p, lineIdx: idx, line: l });
      }
    }
  }
}

console.log(`Found explicit headers for ${Object.keys(qLocations).length} / 300 questions.`);
const missing = [];
for (let i = 1; i <= 300; i++) {
  if (!qLocations[i]) missing.push(i);
}
console.log(`Missing headers (${missing.length}):`, missing);
