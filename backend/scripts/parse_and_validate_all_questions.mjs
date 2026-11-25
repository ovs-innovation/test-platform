import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_official_keys.json'), 'utf8'));

// Each question block starts around a page. Let's find each question 1..176 sequentially.
// In AcadXL: Questions appear in strictly ascending order: 1, 2, 3, ... 176.
// Let's find the page and start index for each question.

const questions = [];
let currentPage = 1;

// Regex patterns to detect question starts:
// "1.", "1 ", "1:", "1;", "1 -", "M." for 11, etc.

for (let q = 1; q <= 176; q++) {
  let found = null;

  // Search starting from currentPage up to currentPage + 3
  for (let p = currentPage; p <= Math.min(144, currentPage + 4); p++) {
    const text = cache[String(p)] || '';
    const lines = text.split('\n');

    for (let l = 0; l < lines.length; l++) {
      const line = lines[l].trim();

      // Check standard: "^q[\.\s\:\;\,\-]"
      const pat = new RegExp(`^${q}[\\.\\s\\:\\;\\,\\-]\\s*(.*)`, 'i');
      const m = line.match(pat);

      // Special overrides for OCR noise
      const isOverride = 
        (q === 11 && /^M\.\s*/.test(line)) ||
        (q === 31 && (/radius.*second.*Bohr/i.test(line) || /parallel.*plate/i.test(line) || /^31[\.\s]/.test(line))) ||
        (q === 65 && (/^65[\.\s]/.test(line) || p === 49 || p === 50)) ||
        (q === 111 && (/^m[\.\s]/.test(line) || p === 86 || p === 87));

      if (m || (isOverride && !found)) {
        found = { q, page: p, lineIdx: l, headerLine: line };
        break;
      }
    }
    if (found) break;
  }

  if (found) {
    currentPage = found.page;
    questions.push(found);
  } else {
    // If not found, let's record missing
    questions.push({ q, page: null, lineIdx: null, headerLine: null });
  }
}

const foundCount = questions.filter(q => q.page !== null).length;
console.log(`Found ${foundCount} / 176 question headers.`);
const missing = questions.filter(q => q.page === null).map(q => q.q);
console.log('Still missing question headers:', missing);
