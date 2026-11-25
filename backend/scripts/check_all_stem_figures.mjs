import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Scan every page's question stem (before "ANSWER:" or "[4 marks")
for (let p = 1; p <= 144; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n');
  
  // Find lines before ANSWER
  const stemLines = [];
  for (const line of lines) {
    if (/ANSWER\s*:/i.test(line) || /\[4 marks/i.test(line)) break;
    stemLines.push(line);
  }
  const stem = stemLines.join(' ').toLowerCase();
  if (stem.includes('figure') || stem.includes('shown in') || stem.includes('graph') || stem.includes('diagram')) {
    console.log(`Page ${p} has figure mention in question stem:`);
    console.log(`   ${stem.slice(0, 140)}...`);
  }
}
