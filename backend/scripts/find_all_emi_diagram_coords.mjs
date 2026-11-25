import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_monotonic_chunks.json'), 'utf8'));

// Check each question for diagram references or visual drawings
const list = [];
for (let q = 1; q <= 173; q++) {
  const c = chunks[q];
  const qLines = [];
  for (const l of c.lines) {
    if (l.match(/\[\d+\s*marks/i) || l.match(/^ANSWER\s*:/i)) break;
    qLines.push(l);
  }
  const qText = qLines.join(' ');
  const hasFig = /(shown in figure|in figure|see figure|given figure|circuit shown|shown below|following figure|figure shows|as shown|from figure|given circuit|shown in the figure|the circuit shown)/i.test(qText);
  // Also check if question mentions diagram keywords or specific question numbers like Q2
  if (hasFig || q === 2 || q === 8 || q === 29 || q === 72 || q === 122 || q === 150) {
    list.push({ q, page: c.startPage, endPage: c.endPage, text: qText.substring(0, 100) });
  }
}

console.log(`Total questions identified with diagrams: ${list.length}`);
console.log(list.map(x => `Q${x.q} (p${x.page})`).join(', '));
