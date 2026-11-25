import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

let validCount = 0;
const validLines = [];

for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx].trim();
    const m = l.match(/^\s*answ[a-z]{0,3}\s*:\s*([A-D0-9©¢§M8\(\)\,\s]{1,8})$/i);
    if (m) {
      validCount++;
      validLines.push({ page: p, line: l, ans: m[1].trim() });
    }
  }
}

console.log(`Matching answer lines with strict regex: ${validCount}`);
