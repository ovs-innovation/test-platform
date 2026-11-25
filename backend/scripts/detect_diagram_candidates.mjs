import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');
const pageBlocks = linearText.split(/=== PAGE (\d+) ===/).slice(1);
const pages = {};
for (let i = 0; i < pageBlocks.length; i += 2) {
  const pNum = parseInt(pageBlocks[i], 10);
  const pText = pageBlocks[i + 1] || '';
  pages[pNum] = pText;
}

const diagramKeywords = [
  'figure', 'shown in', 'diagram', 'graph', 'fig', 'circuit', 'as shown', 'given below', 'following figure'
];

const candidates = [];
for (let p = 1; p <= 250; p++) {
  const text = (pages[p] || '').toLowerCase();
  for (const kw of diagramKeywords) {
    if (text.includes(kw)) {
      candidates.push({ page: p, keyword: kw });
      break;
    }
  }
}

console.log(`Found ${candidates.length} pages mentioning diagrams/figures.`);
console.log('Sample candidate pages:', candidates.slice(0, 20));
fs.writeFileSync(
  path.resolve(__dirname, 'ray_diagram_candidate_pages.json'),
  JSON.stringify(candidates, null, 2)
);
