import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);
const ansKey = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_statistics.json', 'utf8').replace(/^\uFEFF/, ''));

// Let's see how each page breaks down
console.log('Testing question boundaries on first 10 pages...');

for (let i = 0; i < 10; i++) {
  const p = pages[i];
  console.log(`\n--- Page ${p.page} ---`);
  // Look for ANSWER:
  const ansMatches = [...p.text.matchAll(/ANSWER:\s*([A-Za-z0-9\-]+)/gi)];
  console.log(`Answers on page ${p.page}:`, ansMatches.map(m => m[1]));
}

