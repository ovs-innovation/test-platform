import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linear = fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_linear.txt'), 'utf8');
const lines = linear.split('\n');

const diagLines = [];
lines.forEach((l, idx) => {
  if (/(?:as shown in|shown in|in the figure|circuit diagram|in the given figure|shown below|adjacent figure)/i.test(l)) {
    // Find page number
    let p = 1;
    for (let i = idx; i >= 0; i--) {
      const m = lines[i].match(/=== PAGE (\d+) ===/);
      if (m) { p = parseInt(m[1], 10); break; }
    }
    diagLines.push({ p, lineNum: idx + 1, text: l.trim() });
  }
});

console.log(`Found ${diagLines.length} diagram lines across pages.`);
diagLines.forEach((d, idx) => {
  console.log(`[${idx + 1}] Page ${d.p}: ${d.text.substring(0, 90)}`);
});
