import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const targets = [28, 29, 32, 37, 48, 58, 59, 70, 84, 87, 93, 144];

for (const t of targets) {
  console.log(`\n=================== SEARCHING FOR Q${t} ===================`);
  let found = false;
  for (const p of pages) {
    if (p.page === 128) continue;
    // Look for target question number
    const regex = new RegExp(`(?:^|\\n|\\s)${t}\\s*[\\.\\•\\)]`, 'g');
    if (regex.test(p.text)) {
      console.log(`--- Page ${p.page} ---`);
      console.log(p.text);
      found = true;
    }
  }
  if (!found) {
    console.log(`Not found with exact number marker. Let's search around expected page range:`);
    // Approximate page: each question is ~0.8 to 1.2 pages
    const approxPage = Math.round(t * (127 / 160));
    console.log(`Checking pages ${approxPage - 2} to ${approxPage + 2}:`);
    for (let pIdx = Math.max(1, approxPage - 2); pIdx <= Math.min(127, approxPage + 2); pIdx++) {
      const p = pages[pIdx - 1];
      console.log(`[P${p.page}] ${p.text.slice(0, 150)}...`);
    }
  }
}

