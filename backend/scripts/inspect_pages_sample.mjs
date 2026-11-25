import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));

// Print pages 6 to 12 to see Q10, Q11, Q12
console.log('=== PAGES 5 TO 10 ===');
for (let p = 5; p <= 10; p++) {
  console.log(`\n--- PAGE ${p} ---`);
  console.log(cache[String(p)]);
}
