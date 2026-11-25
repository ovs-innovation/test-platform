import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawBlocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_official_keys.json'), 'utf8'));

const [startQ, endQ] = process.argv.slice(2).map(Number);

console.log(`=== BATCH Q${startQ} to Q${endQ} ===`);
for (let q = startQ; q <= endQ; q++) {
  console.log(`\n-------------------- Q${q} (Official Key: ${officialKeys[q]}) --------------------`);
  console.log(rawBlocks[q]?.text);
}
