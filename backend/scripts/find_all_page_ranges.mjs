import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

// We want to determine for each page p (1 to 78), which questions are on that page.
// We know Q1 is on page 1, and Q221 is on page 78.
// Every question 1 to 221 appears in strict sequential order.
// Let's write a script to find for each question q in 1..221 its page,
// or search sequentially through pages.

const qLocations = {};
let currentSearchQ = 1;

for (let p = 1; p <= 78; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n');

  // Look for occurrences of question numbers
  // Note: OCR might recognize "11." as "11.", "11:", "MM.", etc.
  // We can look for questions that match currentSearchQ, currentSearchQ+1, etc.
  for (let q = currentSearchQ; q <= Math.min(221, currentSearchQ + 8); q++) {
    // Variations of q
    let found = false;
    const pats = [
      new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}[\\.:\\)]\\s+`, 'i'),
      new RegExp(`(?:^|\\n)\\s*${q}\\s+[A-Z]`, 'i')
    ];
    // Special OCR fixes:
    if (q === 110 && /M0\./.test(text)) found = true;
    if (q === 111 && /MM\./.test(text)) found = true;
    if (q === 112 && /M2\./.test(text)) found = true;
    if (q === 113 && /M3\./.test(text)) found = true;
    if (q === 146 && /M6\./.test(text)) found = true;
    if (q === 147 && /47\.\s*\(?5g/.test(text)) found = true;
    if (q === 151 && /51\.\s*Given/.test(text)) found = true;

    for (const pat of pats) {
      if (pat.test(text)) {
        found = true;
        break;
      }
    }

    if (found) {
      qLocations[q] = p;
      currentSearchQ = q + 1;
    }
  }
}

console.log(`Found locations for ${Object.keys(qLocations).length}/221 questions.`);
const missing = [];
for (let q = 1; q <= 221; q++) {
  if (!qLocations[q]) missing.push(q);
}
console.log('Missing from initial pass:', missing);

fs.writeFileSync(path.resolve(__dirname, 'basic_chem_page_map_temp.json'), JSON.stringify(qLocations, null, 2));
