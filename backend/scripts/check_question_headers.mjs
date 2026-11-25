import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Check how many questions start on each page
const foundQ = {};
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let l of lines) {
    l = l.trim();
    // match "1.", "2.", "15.", etc.
    const m = l.match(/^(\d{1,3})[\.\s\:\-]\s*(.*)/);
    if (m) {
      const num = parseInt(m[1], 10);
      if (num >= 1 && num <= 300) {
        if (!foundQ[num]) foundQ[num] = [];
        foundQ[num].push({ page: p, line: l.substring(0, 60) });
      }
    }
  }
}

const missing = [];
for (let i = 1; i <= 300; i++) {
  if (!foundQ[i]) missing.push(i);
}

console.log(`Found ${Object.keys(foundQ).length} unique question numbers matching regex.`);
console.log(`Missing question numbers (${missing.length}):`, missing.slice(0, 30));
