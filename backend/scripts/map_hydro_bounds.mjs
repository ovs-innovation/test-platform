import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_FILE = path.resolve(__dirname, 'hydro_jee_ocr_cache.json');
const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));

console.log('=== ANALYZING QUESTION BOUNDARIES IN HYDROCARBONS ===');

const sortedPages = Object.keys(cache).map(Number).sort((a, b) => a - b);
const qStartRegex = /(?:^|\n)\s*(\d{1,3})\s*[\.\)]\s+/g;

const foundQuestions = [];

for (const p of sortedPages) {
  if (p === 132) continue; // Answer key page
  const text = cache[p];
  let match;
  while ((match = qStartRegex.exec(text)) !== null) {
    const qNum = parseInt(match[1], 10);
    if (qNum >= 1 && qNum <= 241) {
      foundQuestions.push({ qNum, page: p, index: match.index });
    }
  }
}

console.log(`Found ${foundQuestions.length} potential question starts in OCR text.`);

// Filter for chronological 1..241 sequence
const sequence = [];
let nextExpected = 1;

for (const f of foundQuestions) {
  if (f.qNum === nextExpected) {
    sequence.push(f);
    nextExpected++;
  } else if (f.qNum > nextExpected && f.qNum <= nextExpected + 3) {
    console.warn(`Missed Q${nextExpected} before Q${f.qNum} on Page ${f.page}`);
    // Record missing
    while (nextExpected < f.qNum) {
      sequence.push({ qNum: nextExpected, page: f.page, missed: true });
      nextExpected++;
    }
    sequence.push(f);
    nextExpected++;
  }
}

console.log(`Mapped sequence length: ${sequence.length}`);
const missing = sequence.filter(s => s.missed);
console.log(`Missing question starts in regex: ${missing.length}`, missing.map(m => m.qNum));

// Group questions by page
const pageToQs = {};
for (const s of sequence) {
  if (!pageToQs[s.page]) pageToQs[s.page] = [];
  pageToQs[s.page].push(s.qNum);
}

fs.writeFileSync(path.resolve(__dirname, 'hydro_question_bounds.json'), JSON.stringify(sequence, null, 2));
console.log('Saved hydro_question_bounds.json');
