import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// Print the first 25 pages with all question-like starts
for (let p = 1; p <= 25; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  console.log(`\n=== PAGE ${p} ===`);
  lines.forEach((l, i) => {
    // If line has marks or answer or looks like start of question
    if (l.match(/^[0-9a-zA-Z]{1,4}[\.\s]/) && (l.length > 20 || l.match(/^[0-9]{1,3}\./))) {
      console.log(`  [L${i}] ${l.slice(0, 90)}`);
    } else if (l.includes('ANSWER:')) {
      console.log(`  [L${i}] ${l}`);
    }
  });
}
