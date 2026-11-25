import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawBlocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_raw_blocks.json'), 'utf8'));

for (let i = 1; i <= 20; i++) {
  console.log(`\n================ Q${i} ================`);
  console.log(rawBlocks[i]?.text);
}
