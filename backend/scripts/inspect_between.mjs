import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));

// Build list of known question locations
const known = {};
for (let qNum = 1; qNum <= 237; qNum++) {
  for (let p = 1; p <= 151; p++) {
    const lines = (cache[String(p)] || '').split('\n');
    for (let l = 0; l < lines.length; l++) {
      if (new RegExp(`^${qNum}\\.\\s+`).test(lines[l].trim())) {
        known[qNum] = { page: p, lineIdx: l, text: lines[l].trim() };
        break;
      }
    }
    if (known[qNum]) break;
  }
}

const missing = [11, 31, 45, 51, 71, 75, 81, 91, 110, 111, 112, 113, 115, 116, 117, 119, 122, 125, 131, 172, 182, 189, 208, 223, 236];

let out = '';
for (const m of missing) {
  const prevQ = known[m - 1];
  const nextQ = known[m + 1];
  out += `\n=== MISSING Q${m} ===\n`;
  out += `Predecessor Q${m-1} on Page ${prevQ ? prevQ.page : '?'}\n`;
  out += `Successor Q${m+1} on Page ${nextQ ? nextQ.page : '?'}\n`;
  const startP = prevQ ? prevQ.page : 1;
  const endP = nextQ ? nextQ.page : startP + 1;
  for (let p = startP; p <= endP; p++) {
    out += `--- Page ${p} ---\n`;
    out += cache[String(p)] + '\n';
  }
}

fs.writeFileSync(path.resolve(__dirname, 'missing_between_dump.txt'), out, 'utf8');
console.log('Wrote missing_between_dump.txt cleanly in utf8.');
