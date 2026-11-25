import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

// We know approximately where each question is based on the question index
// There are 173 questions across 143 pages, roughly 1.2 questions per page.
// Let's print candidate pages for the missing Qs:
const checks = [
  { q: 46, approxPage: 36 },
  { q: 71, approxPage: 58 },
  { q: 110, approxPage: 92 },
  { q: 111, approxPage: 93 },
  { q: 112, approxPage: 94 },
  { q: 113, approxPage: 95 },
  { q: 114, approxPage: 95 },
  { q: 115, approxPage: 96 },
  { q: 116, approxPage: 97 },
  { q: 117, approxPage: 98 },
  { q: 118, approxPage: 99 },
  { q: 119, approxPage: 100 },
  { q: 144, approxPage: 120 }
];

for (const c of checks) {
  console.log(`\n================ Missing Q${c.q} (around page ${c.approxPage}) ================`);
  for (let p = Math.max(1, c.approxPage - 1); p <= Math.min(143, c.approxPage + 1); p++) {
    console.log(`--- Page ${p} ---`);
    console.log((pages[String(p)] || '').substring(0, 300));
  }
}
