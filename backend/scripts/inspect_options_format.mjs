import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Print lines around options for questions 1 to 20
for (let p = 1; p <= 8; p++) {
  console.log(`=== Page ${p} ===`);
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    if (l.trim()) console.log(`  [${idx}] ${l.trim()}`);
  });
}
