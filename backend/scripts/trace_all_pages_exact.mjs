import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Build page mapping for each page 1..211
const pageMap = [];

for (let p = 1; p <= 211; p++) {
  const text = cache[p] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Find all possible question numbers mentioned in lines
  const qNums = [];
  lines.forEach(line => {
    // Look for lines that look like a question heading
    // e.g. "53: latter’ A’", "7. The lange", "408. The stored charge", "102. In the given circuit", etc.
    const m = line.match(/^([0-9]{1,3}|[A-Z]{1,2}[0-9]?)\s*[\.\:\)]\s*(.*)/);
    if (m) {
      qNums.push({ token: m[1], line: line.slice(0, 60) });
    }
  });
  
  pageMap.push({ page: p, qNums });
}

fs.writeFileSync(path.resolve(__dirname, 'page_q_tokens.json'), JSON.stringify(pageMap, null, 2));
console.log('Saved page_q_tokens.json');
