import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Function to find raw text of question q
export function getRawQuestionText(q) {
  // Approximate page: q is between page Math.floor((q-1)/2.2) and Math.ceil(q/1.8) + 2
  const minP = Math.max(1, Math.floor((q - 10) / 2.2));
  const maxP = Math.min(211, Math.ceil((q + 10) / 1.8));

  // Search across pages for q
  let candidateText = '';
  let foundPage = 0;

  for (let p = minP; p <= maxP; p++) {
    const text = cache[p] || '';
    // Look for q followed by dot or parenthesis
    const reg = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\:\\)]\\s*(.*)`, 'i');
    const m = text.match(reg);
    if (m) {
      foundPage = p;
      // Extract from match up to next question or end of page
      const startIdx = m.index;
      const sub = text.slice(startIdx);
      // Cut off at next question if any: e.g. (q+1).
      const nextReg = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q+1}\\s*[\\.\\:\\)]`, 'i');
      const nextM = sub.search(nextReg);
      candidateText = nextM !== -1 ? sub.slice(0, nextM) : sub;
      break;
    }
  }

  return { q, page: foundPage, raw: candidateText.trim() };
}

// Test on questions 51..65
console.log('Testing raw extraction on questions 51 to 65:');
for (let q = 51; q <= 65; q++) {
  const res = getRawQuestionText(q);
  console.log(`Q${q} (Page ${res.page}): ${res.raw.slice(0, 100).replace(/\n/g, ' ')}...`);
}
