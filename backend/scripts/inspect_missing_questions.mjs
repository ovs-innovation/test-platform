import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));
const missing = [11, 31, 45, 51, 71, 75, 81, 91, 110, 111, 112, 113, 115, 116, 117, 119, 122, 125, 131, 172, 182, 189, 208, 223, 236];

for (const num of missing) {
  let found = false;
  for (let p = 1; p <= 152; p++) {
    const text = cache[String(p)] || '';
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (new RegExp(`^${num}[^0-9]`).test(line) || new RegExp(`\\b${num}\\s*\\.`).test(line)) {
        console.log(`Q${num} on Page ${p}: "${line.slice(0, 80)}"`);
        found = true;
        break;
      }
    }
    if (found) break;
  }
  if (!found) {
    // Check pages around estimated position
    const estPage = Math.round(num * 152 / 237);
    console.log(`Q${num} NOT directly found. Checking around Page ${estPage}:`);
    for (let p = Math.max(1, estPage - 2); p <= Math.min(152, estPage + 2); p++) {
      const lines = (cache[String(p)] || '').split('\n').filter(l => l.trim().length > 0);
      console.log(`  Page ${p} first 2 lines:`, lines.slice(0, 2).map(l => l.trim().slice(0, 60)));
    }
  }
}
