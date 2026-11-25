import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));

const testQs = [4, 13, 16, 19, 22, 32, 38, 56, 57, 65, 69, 77, 80, 84, 90, 93, 96, 98];

for (const q of testQs) {
  const b = blocks[q - 1];
  console.log(`\n================ Q${q} (Page ${b.ans.p}) ================`);
  b.rawLines.forEach((l, idx) => {
    if (idx < 10) console.log(`  [${idx}] ${l.text}`);
  });
}
