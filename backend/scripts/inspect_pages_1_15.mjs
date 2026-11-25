import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// Check pages where Q7, Q8, Q11, Q15, Q19, Q22, Q23, Q24 appear
for (let p = 1; p <= 15; p++) {
  const text = pages[String(p)] || '';
  console.log(`\n================= PAGE ${p} =================`);
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  lines.forEach((l, i) => {
    if (i < 8 || l.includes('?') || l.includes('marks') || l.includes('ANSWER')) {
      console.log(`  [P${p}:L${i}] ${l.slice(0, 100)}`);
    }
  });
}
