import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));

// Test regex: `^${q}[\\.\\s\\:\\;\\,\\-]` or `^${q}$`
const locations = {};

for (let q = 1; q <= 176; q++) {
  let found = null;

  for (let p = 1; p <= 144; p++) {
    const text = cache[String(p)] || '';
    const lines = text.split('\n');
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l].trim();
      if (!line) continue;

      // 1. Exact match on own line: "29.", "29", "29:"
      if (new RegExp(`^${q}[\\.\\:\\;\\,\\-]?$`).test(line)) {
        found = { q, page: p, lineIdx: l, lineText: line, nextLine: lines[l+1]?.trim() };
        break;
      }

      // 2. Standard match: "29. In the figure" or "29 In the figure"
      if (new RegExp(`^${q}[\\.\\:\\;\\,\\-\\s]\\s*\\w+`, 'i').test(line)) {
        found = { q, page: p, lineIdx: l, lineText: line };
        break;
      }
    }
    if (found) break;
  }

  locations[q] = found;
}

const foundList = Object.values(locations).filter(Boolean);
console.log(`Found locations for ${foundList.length} / 176 questions.`);
const missing = Object.keys(locations).filter(q => !locations[q]);
console.log('Still missing question numbers:', missing);
