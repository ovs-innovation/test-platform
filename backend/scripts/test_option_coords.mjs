import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

for (let pNum of [1, 2, 3]) {
  const p = pages.find(x => x.page === pNum);
  console.log(`\nPage ${pNum} Option coordinates:`);
  for (const line of p.lines) {
    const words = Array.isArray(line.Words) ? line.Words : (line.Words ? [line.Words] : []);
    for (const w of words) {
      if (/^\([A-D]\)$/.test(w.Text)) {
        console.log(`  ${w.Text} at X=${w.X}, Y=${w.Y}`);
      }
    }
  }
}
