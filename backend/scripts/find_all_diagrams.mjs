import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const keywords = ['figure', 'fig', 'diagram', 'graph', 'shown in', 'given in the', 'plot', 'as shown'];

for (const p of pages) {
  for (const line of p.lines) {
    const text = typeof line === 'string' ? line : line.Text;
    for (const kw of keywords) {
      const re = new RegExp(`\\b${kw}\\b`, 'i');
      if (re.test(text)) {
        console.log(`Page ${p.page} [${kw}]: ${text}`);
      }
    }
  }
}

