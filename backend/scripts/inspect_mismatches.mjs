import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const targetPages = [69, 217, 231, 241, 243];

for (const pNum of targetPages) {
  const p = pages.find(x => x.page === pNum);
  console.log(`\n================= PAGE ${pNum} =================`);
  for (let i = 0; i < p.lines.length; i++) {
    const t = typeof p.lines[i] === 'string' ? p.lines[i] : p.lines[i].Text;
    console.log(`[${i}] ${t}`);
  }
}

