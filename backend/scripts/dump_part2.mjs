import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

let out = '';
for (let p = 31; p <= 75; p++) {
  const page = pages.find(x => x.page === p);
  out += `\n==================== PAGE ${p} ====================\n`;
  for (let i = 0; i < page.lines.length; i++) {
    const t = typeof page.lines[i] === 'string' ? page.lines[i] : page.lines[i].Text;
    out += `[${i}] ${t}\n`;
  }
}

fs.writeFileSync('./backend/scripts/part2_pages_dump.txt', out, 'utf8');
console.log('Saved part2_pages_dump.txt');

