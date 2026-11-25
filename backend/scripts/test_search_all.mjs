import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

export function findQuestionInPages(q, startP = 1, endP = 211) {
  for (let p = startP; p <= endP; p++) {
    const text = cache[p] || '';
    const reg = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\:\\)]\\s*(.*)`, 'i');
    const m = text.match(reg);
    if (m) {
      const sub = text.slice(m.index);
      return { q, page: p, text: sub };
    }
  }
  return null;
}

console.log('Testing search from page 1:');
for (let q = 51; q <= 65; q++) {
  const res = findQuestionInPages(q);
  if (res) {
    console.log(`Q${q} (Page ${res.page}): ${res.text.slice(0, 100).replace(/\n/g, ' ')}...`);
  } else {
    console.log(`Q${q} NOT FOUND directly with ${q}.`);
  }
}
