import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Look at pages 15 to 25
for (let p = 15; p <= 25; p++) {
  console.log(`\n================== PAGE ${p} ==================`);
  const lines = cache[p].split('\n').map(l => l.trim()).filter(Boolean);
  lines.forEach(line => {
    // Check if line looks like options or question or answer
    if (/(?:^|\s)(?:\[?[A-D][\]\)]|\(?[A-D]\)|\b[A-D]\b[\.\:\)])/i.test(line) ||
        /(?:ans|solution|sol\.)/i.test(line) ||
        /^\d{1,3}\./.test(line)) {
      console.log('   ', line);
    }
  });
}
