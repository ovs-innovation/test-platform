import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

const matches = [];
for (let p = 1; p <= 78; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/(?:above reaction|above sequence|given reaction|in the above|consider the following reaction|consider the reaction)/i.test(l)) {
      matches.push({ page: p, line: l.trim(), prev: lines[i-1]?.trim(), next: lines[i+1]?.trim() });
    }
  }
}

console.log(`Found ${matches.length} matches:`);
matches.forEach(m => console.log(`Page ${m.page}: "${m.line}"\n   Prev: "${m.prev}"\n   Next: "${m.next}"\n`));
