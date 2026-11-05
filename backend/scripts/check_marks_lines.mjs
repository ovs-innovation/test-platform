import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

let marksCount = 0;
const marksLines = [];

for (const p of pages) {
  for (let i = 0; i < p.lines.length; i++) {
    const t = typeof p.lines[i] === 'string' ? p.lines[i] : p.lines[i].Text;
    if (/\b(?:4\s*marks|marks[,\.]?\s*[\-—–]?[1i]?\s*for)\b/i.test(t)) {
      marksCount++;
      marksLines.push({ page: p.page, lineIdx: i, text: t });
    }
  }
}

console.log('Total marks lines found:', marksCount);

