import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));

// Keywords that indicate a question diagram
const diagramKeywords = [
  'figure',
  'fig.',
  'diagram',
  'shown in',
  'shown below',
  'as shown',
  'represented in',
  'arrangement',
  'setup'
];

const candidatePages = [];
for (let p = 1; p <= 128; p++) {
  const text = (pages[p] || '').toLowerCase();
  for (const kw of diagramKeywords) {
    if (text.includes(kw)) {
      candidatePages.push({ page: p, keyword: kw });
      break;
    }
  }
}

console.log(`Found ${candidatePages.length} pages mentioning diagram keywords:`);
console.log(candidatePages.map(c => `Page ${c.page} (${c.keyword})`).join(', '));
