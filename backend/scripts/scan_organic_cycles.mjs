import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

const candidates = [];
for (let p = 1; p <= 78; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  if (/benzene|toluene|aniline|phenol|bromopentane|cyclopentane|cyclohexane/i.test(text)) {
    candidates.push(p);
  }
}

console.log('Pages mentioning organic cyclic compounds:', candidates);
