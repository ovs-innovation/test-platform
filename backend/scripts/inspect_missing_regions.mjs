import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const targets = [
  { q: 14, p: [6] },
  { q: 20, p: [11] },
  { q: 27, p: [14, 15] },
  { q: 34, p: [20, 21] },
  { q: 36, p: [21, 22] },
  { q: 47, p: [30, 31] },
  { q: 51, p: [35, 36] },
  { q: 57, p: [38, 39] },
  { q: 65, p: [43, 44] },
  { q: 67, p: [44, 45] },
  { q: 79, p: [53, 54] },
  { q: 87, p: [60] },
  { q: 89, p: [61] },
  { q: 112, p: [81, 82] },
  { q: 137, p: [104] },
  { q: 146, p: [109, 110] }
];

for (const t of targets) {
  console.log(`\n================== Target Q${t.q} ==================`);
  for (const pNum of t.p) {
    console.log(`--- Page ${pNum} ---`);
    console.log(pages[pNum - 1].text);
  }
}

