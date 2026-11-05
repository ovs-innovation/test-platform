import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const missing = [
  2, 3, 4, 5, 6, 7, 8, 9,
  26, 30, 44, 49, 75, 83, 84, 86,
  87, 88, 95, 136, 147, 165, 194, 199,
  206
];

// Let's print pages where these questions reside
const checks = [
  { q: 2, p: 1 }, { q: 3, p: 1 }, { q: 4, p: 2 }, { q: 5, p: 2 },
  { q: 6, p: 2 }, { q: 7, p: 2 }, { q: 8, p: 3 }, { q: 9, p: 3 },
  { q: 26, p: 10 }, { q: 30, p: 12 }, { q: 44, p: 21 }, { q: 49, p: 25 },
  { q: 75, p: 43 }, { q: 83, p: 48 }, { q: 84, p: 48 }, { q: 86, p: 50 },
  { q: 87, p: 50 }, { q: 88, p: 50 }, { q: 95, p: 54 }, { q: 136, p: 79 },
  { q: 147, p: 86 }, { q: 165, p: 101 }, { q: 194, p: 124 }, { q: 199, p: 127 },
  { q: 206, p: 132 }
];

for (const ch of checks) {
  const pg = pages.find(x => x.page === ch.p);
  console.log(`\n================ Q${ch.q} (Page ${ch.p}) ================`);
  const lines = pg.lines.map(l => l.Text.trim());
  lines.forEach((l, idx) => {
    if (/ANSWER/i.test(l) || /^\d+\.?$/.test(l) || /marks/i.test(l) || /^[A-D]\b/.test(l) || /^[A-D]\./.test(l)) {
      console.log(`  [line ${idx}] ${l}`);
    }
  });
}

