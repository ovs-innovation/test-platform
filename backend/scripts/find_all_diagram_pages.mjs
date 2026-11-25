import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'jee_gravitation_pages');
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Keywords that indicate a diagram or graph in question
const diagramKeywords = [
  'shown in the figure', 'as shown in figure', 'shown below', 'figure shows',
  'in the figure', 'following figure', 'given figure', 'represented by',
  'variation of', 'graph shows', 'graph represents', 'plot of', 'shown in fig',
  'see figure', 'in fig', 'refer to figure', '(a) (b) (c) (d)', 'cavity',
  'which graph', 'correct graph'
];

const matches = [];

for (let p = 1; p <= 144; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lower = text.toLowerCase();

  const foundKws = diagramKeywords.filter(kw => lower.includes(kw));
  if (foundKws.length > 0) {
    matches.push({ page: p, keywords: foundKws });
  }
}

console.log(`Detected ${matches.length} candidate pages with diagram keywords.`);
for (const m of matches) {
  console.log(`Page ${m.page}: [${m.keywords.join(', ')}]`);
}

fs.writeFileSync(path.resolve(__dirname, 'gravitation_diagram_pages.json'), JSON.stringify(matches, null, 2));
