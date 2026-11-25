import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));

// Find all questions that mention diagrams or figures
const diagramMentions = [];

for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  if (/figure|circuit\s*(diagram|shown)|graph|plot|given\s*circuit|arrangement\s*shown|network\s*of\s*capacitors|diagram\s*below|as\s*shown/i.test(text)) {
    diagramMentions.push(p);
  }
}

console.log(`Pages with diagram/figure/circuit mentions (${diagramMentions.length} pages):`, diagramMentions);
