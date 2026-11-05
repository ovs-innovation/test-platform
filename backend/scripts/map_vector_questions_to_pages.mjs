import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);
const ansKey = JSON.parse(fs.readFileSync('./backend/scripts/official_answer_key.json', 'utf8'));

const qPages = {};

for (const p of pages) {
  const text = p.text;
  for (let q = 1; q <= 305; q++) {
    const re = new RegExp(`(^|\\n)\\s*(?:•\\s*)?${q}\\s*[\\.\\)]\\s+`, 'i');
    if (re.test(text)) {
      if (!qPages[q]) qPages[q] = [];
      qPages[q].push(p.page);
    }
  }
}

console.log('Directly mapped question numbers count:', Object.keys(qPages).length);

let currentQ = 1;
const pageToQs = {};
for (const p of pages) {
  pageToQs[p.page] = [];
  for (const line of p.lines) {
    const t = typeof line === 'string' ? line : line.Text;
    if (/ANSWER\s*:\s*[A-Z0-9\.\-]+/i.test(t)) {
      pageToQs[p.page].push(currentQ);
      currentQ++;
    }
  }
}

console.log('Sequentially mapped total questions:', currentQ - 1);
fs.writeFileSync('./backend/scripts/page_to_qs_map.json', JSON.stringify(pageToQs, null, 2));

for (let p = 1; p <= 10; p++) {
  console.log(`Page ${p} has questions:`, pageToQs[p]);
}
