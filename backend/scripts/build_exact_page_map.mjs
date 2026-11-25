import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Build exact page mapping for every page from 1 to 211
const pageMap = {};

for (let p = 1; p <= 211; p++) {
  const text = cache[p] || '';
  // Find all question numbers on this page
  // Look for occurrences of numbers at start of lines or after solution
  const matches = [...text.matchAll(/(?:^|\n)\s*(?:Q\.?\s*)?(\d{1,3}|[A-Z]{1,2}\d?)\s*[\.\:\)]\s*(.*)/gi)];
  const rawList = matches.map(m => ({ token: m[1], preview: m[2].slice(0, 40) }));
  pageMap[p] = rawList;
}

// Print page map from 1 to 211
console.log('Sample mapped pages:');
for (let p = 1; p <= 211; p += 10) {
  console.log(`P.${p}:`, pageMap[p].map(x => x.token).join(', '));
}

fs.writeFileSync(path.resolve(__dirname, 'raw_page_q_map.json'), JSON.stringify(pageMap, null, 2));
console.log('Saved raw_page_q_map.json');
