import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_official_keys.json'), 'utf8'));

// Build all lines with page number
const allLines = [];
for (let p = 1; p <= 128; p++) {
  const lines = (pages[p] || '').split('\n').map(l => l.trim()).filter(Boolean);
  for (let li = 0; li < lines.length; li++) {
    allLines.push({ p, lineIdx: li, text: lines[li] });
  }
}

// Find all lines that match ANSWER:
const answerPositions = [];
for (let i = 0; i < allLines.length; i++) {
  const line = allLines[i].text;
  const m = line.match(/^ANSWER:\s*([A-Za-z0-9\.\-]+)/i);
  if (m) {
    answerPositions.push({ idx: i, page: allLines[i].p, ans: m[1].toUpperCase(), raw: line });
  }
}

console.log(`Found ${answerPositions.length} ANSWER lines.`);

// Let's match sequential official keys to these answerPositions
let currQ = 1;
const matched = [];

for (const ap of answerPositions) {
  if (currQ > 191) break;
  const expected = String(officialKeys[currQ]).toUpperCase().trim();
  // Check if this answer matches expected
  // Some answers might have slight OCR variation (e.g. 750 vs 750, or B vs 8)
  let ok = false;
  if (ap.ans === expected) ok = true;
  else if (ap.ans.includes(expected)) ok = true;
  else if (expected === 'B' && ap.ans === '8') ok = true;
  else if (expected === 'D' && (ap.ans === '0' || ap.ans === 'O')) ok = true;
  
  if (ok) {
    matched.push({ q: currQ, answerIdx: ap.idx, page: ap.page, ans: ap.ans, expected });
    currQ++;
  } else {
    // If not matching, let's see why
    console.log(`Mismatch at Q${currQ}: expected ${expected}, got ${ap.ans} on page ${ap.page} (line: ${ap.raw})`);
    // Check if maybe we should still accept it if it's right after previous Q
    matched.push({ q: currQ, answerIdx: ap.idx, page: ap.page, ans: ap.ans, expected, mismatch: true });
    currQ++;
  }
}

console.log(`Successfully mapped ${matched.length} questions to answers!`);
fs.writeFileSync(path.resolve(__dirname, 'wave_optics_q_answer_map.json'), JSON.stringify(matched, null, 2));
