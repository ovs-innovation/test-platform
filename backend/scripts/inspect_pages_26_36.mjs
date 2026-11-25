import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

for (let p = 26; p <= 36; p++) {
  console.log(`\n=== PAGE ${p} ===`);
  const lines = (pages[String(p)] || '').split('\n').filter(l => l.trim().length > 0);
  lines.forEach((l, i) => {
    if (l.match(/^[0-9a-zA-Z]{1,4}[\.\s]/) || l.includes('ANSWER:') || l.includes('marks')) {
      console.log(`  [L${i}] ${l.slice(0, 90)}`);
    }
  });
}
