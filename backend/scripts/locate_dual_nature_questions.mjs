import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_official_keys.json'), 'utf8'));

// Track which page each question appears on
const qPageMap = {};

// Clean OCR text helpers
for (let p = 1; p <= 114; p++) {
  const text = cache[p] || '';
  for (let q = 1; q <= 217; q++) {
    // Regex for Question header: "Q. 1", "1.", "1)", "Q1." at beginning of line
    const r = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\:\\)]\\s*`, 'i');
    if (r.test(text)) {
      if (!qPageMap[q]) qPageMap[q] = [];
      qPageMap[q].push(p);
    }
  }
}

const foundCount = Object.keys(qPageMap).length;
console.log(`Found ${foundCount} / 217 questions via direct regex.`);

// Missing questions
const missing = [];
for (let q = 1; q <= 217; q++) {
  if (!qPageMap[q]) missing.push(q);
}
console.log('Missing question numbers:', missing);

fs.writeFileSync(path.resolve(__dirname, 'dual_nature_q_page_map.json'), JSON.stringify(qPageMap, null, 2));
