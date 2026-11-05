import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const targets = [14, 20, 27, 34, 36, 47, 51, 57, 65, 67, 79, 87, 89, 112, 137, 146];

for (const t of targets) {
  console.log(`\nSearching for Q${t}:`);
  for (const p of pages) {
    if (p.page === 128) continue;
    const lines = p.lines || [];
    for (let lIdx = 0; lIdx < lines.length; lIdx++) {
      const line = lines[lIdx];
      // match number anywhere in line
      const m = line.Text.match(new RegExp(`(?:^|\\s)${t}[\\.\\•\\-\\)]\\s*(.*)`));
      if (m) {
        console.log(`  P${p.page} L${lIdx}: "${line.Text}"`);
      }
    }
  }
}

