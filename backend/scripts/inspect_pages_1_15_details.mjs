import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pageRanges = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_page_ranges.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_ocr_cache.json'), 'utf8'));

// Inspect Q1 to Q30
for (const entry of pageRanges.slice(0, 15)) {
  console.log(`\n=== PAGE ${entry.p} (Qs: ${entry.qs.join(', ')}) ===`);
  const lines = (cache[entry.p] || '').split('\n').filter(l => l.trim().length > 0);
  console.log(lines.slice(0, 10).join('\n'));
}
