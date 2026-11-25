import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');

// Match "=== PAGE X ==="
const pageBlocks = linearText.split(/=== PAGE (\d+) ===/).slice(1);
const pages = {};
for (let i = 0; i < pageBlocks.length; i += 2) {
  const pNum = parseInt(pageBlocks[i], 10);
  const pText = pageBlocks[i + 1] || '';
  pages[pNum] = pText;
}

console.log(`Loaded ${Object.keys(pages).length} pages.`);

// Find all occurrences of "Q" or numbers followed by dot or parenthesis or "JEE Main"
// In these PYQ books, questions usually start with "1.", "2.", ... or "[JEE Main" or similar
// Let's inspect page 1, 2, 3 to see exact question headers
for (let p = 1; p <= 5; p++) {
  console.log(`\n---------------- PAGE ${p} ----------------`);
  const lines = pages[p].split('\n').filter(l => l.trim().length > 0);
  console.log(lines.slice(0, 15).join('\n'));
}
