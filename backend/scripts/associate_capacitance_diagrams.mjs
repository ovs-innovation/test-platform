import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));
const files = fs.readdirSync(path.resolve(__dirname, 'capacitance_diagrams'));

// Parse files: p{page}_span{span}_y{y}_h{h}.png
const spansByPage = {};
for (const f of files) {
  const m = f.match(/^p(\d+)_span(\d+)_y(\d+)_h(\d+)\.png$/);
  if (m) {
    const p = parseInt(m[1], 10);
    const spanIdx = parseInt(m[2], 10);
    const y = parseInt(m[3], 10);
    const h = parseInt(m[4], 10);
    if (!spansByPage[p]) spansByPage[p] = [];
    spansByPage[p].push({ file: f, spanIdx, y, h });
  }
}

// For each page, check which spans are true diagrams (e.g. h >= 70, or multiple tall spans)
const questionDiagrams = {};
const solutionDiagrams = {};

for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  const spans = spansByPage[p] || [];
  spans.sort((a, b) => a.y - b.y);

  // Check if page mentions diagram/circuit/figure
  const hasDiag = /figure|circuit|diagram|graph|plot|shown|arrangement/i.test(text);
  // Filter spans with h >= 65 (genuine diagrams/circuits)
  const tallSpans = spans.filter(s => s.h >= 65);

  if (hasDiag && tallSpans.length > 0) {
    questionDiagrams[p] = tallSpans[0]; // first tall span is usually the question diagram
    if (tallSpans.length > 1) {
      solutionDiagrams[p] = tallSpans.slice(1);
    }
  }
}

console.log(`Mapped diagrams on ${Object.keys(questionDiagrams).length} pages.`);
for (const p of Object.keys(questionDiagrams).slice(0, 20)) {
  console.log(`  Page ${p}: Question diagram -> ${questionDiagrams[p].file} (h=${questionDiagrams[p].h})`);
}
