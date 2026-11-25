import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));

const targets = [31, 40, 41, 65, 87, 91, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 132, 134, 135, 146, 150, 169, 171];

for (const t of targets) {
  console.log(`\n=================== SEARCHING FOR Q${t} ===================`);
  let found = false;
  // Search for the number or nearby questions
  for (let p = 1; p <= 144; p++) {
    const text = cache[String(p)] || '';
    const lines = text.split('\n');
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l].trim();
      if (line.includes(`ANSWER:`) && (line.includes(String(t)) || false)) {
        // ...
      }
      // Check if line matches pattern near Q t
      if (new RegExp(`(^|[^0-9])${t}[\\.\\:\\;\\s\\,\\-]`).test(line) ||
          new RegExp(`(^|[^0-9])${t}$`).test(line)) {
        console.log(`  Page ${p}, Line ${l}: "${line}"`);
        found = true;
      }
    }
  }
  if (!found) {
    console.log(`  NOT FOUND DIRECTLY for Q${t}. Checking pages around expected position...`);
    // Estimate page: 176 questions across 144 pages, so ~1.2 questions per page
    const estPage = Math.min(144, Math.max(1, Math.round(t * 0.8)));
    for (let ep = Math.max(1, estPage - 3); ep <= Math.min(144, estPage + 5); ep++) {
      const text = cache[String(ep)] || '';
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      const marksLines = lines.filter(l => l.includes('marks') || l.includes('ANSWER:'));
      console.log(`    Page ${ep} has ${marksLines.length} questions. Marks/Answers:`, marksLines);
    }
  }
}
