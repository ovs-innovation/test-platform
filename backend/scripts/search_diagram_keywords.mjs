import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

const keywords = [
  /\bfig\b/i,
  /\bfigure\b/i,
  /\bdiagram\b/i,
  /\bgraph\b/i,
  /\bplot\b/i,
  /\bcurve\b/i,
  /shown in/i,
  /given in the/i,
  /following figure/i,
  /following graph/i
];

const results = [];
for (let p = 1; p <= 78; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    for (const kw of keywords) {
      if (kw.test(line)) {
        results.push({
          page: p,
          lineNum: l,
          line: line.trim(),
          context: lines.slice(Math.max(0, l - 2), Math.min(lines.length, l + 3)).map(s => s.trim()).join(' ')
        });
        break;
      }
    }
  }
}

console.log(`Found ${results.length} matches:`);
results.forEach(r => {
  console.log(`[Page ${r.page}] ${r.line}`);
  console.log(`   Context: ${r.context.slice(0, 150)}...\n`);
});
