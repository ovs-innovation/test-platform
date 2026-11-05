import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const missing = [
  2, 3, 4, 5, 6, 7, 8, 9,
  26, 30, 44, 49, 75, 83, 84, 86,
  87, 88, 95, 136, 147, 165, 194, 199,
  206
];

console.log("Searching for missing questions in pages 1 to 168:");

for (const q of missing) {
  // Let's find pages where question q might be
  // Look for "q." or "q " or ANSWER: around it
  let found = [];
  for (const pg of pages) {
    if (pg.page === 169) continue;
    const lines = pg.lines;
    for (let i = 0; i < lines.length; i++) {
      const text = lines[i].Text.trim();
      // Question header check
      const re = new RegExp(`^${q}\\.\\s*`, 'i');
      if (re.test(text) || text === `${q}.` || text.startsWith(`${q}. `)) {
        found.push({ page: pg.page, lineIdx: i, line: text });
      }
    }
  }
  if (found.length > 0) {
    console.log(`Q${q} found on page(s):`, found.map(f => `p${f.page}:${f.line}`));
  } else {
    // Search for ANSWER: on pages around estimated page
    console.log(`Q${q} not found with strict header regex, will search by page range`);
  }
}

