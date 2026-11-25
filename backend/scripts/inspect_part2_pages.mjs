import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pageRanges = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_page_ranges.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_ocr_cache.json'), 'utf8'));

// Part 2 covers Q61 to Q120
// Let's find pages for Q61 to Q120
const part2Pages = pageRanges.filter(r => r.qs.some(q => q >= 61 && q <= 120));
console.log(`Part 2 spans pages ${part2Pages[0].p} to ${part2Pages[part2Pages.length - 1].p}`);

for (const entry of part2Pages) {
  console.log(`\n=== PAGE ${entry.p} (Qs: ${entry.qs.join(', ')}) ===`);
  const lines = (cache[entry.p] || '').split('\n').filter(l => l.trim().length > 0);
  console.log(lines.slice(0, 8).join('\n'));
}
