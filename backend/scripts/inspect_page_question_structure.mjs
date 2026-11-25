import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

for (let p = 1; p <= 15; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  console.log(`\n================ PAGE ${p} (lines: ${lines.length}) ================`);
  // Print lines that start with digits or common question markers
  lines.forEach((l, idx) => {
    if (/^(?:\d{1,3}|[BL|A-Z]{1,2}\d{0,2})[\.\:\;\,\s\-\)]/i.test(l) || /^\d{1,3}$/.test(l)) {
      console.log(`  [line ${idx}]: ${l.substring(0, 90)}`);
    }
  });
}
