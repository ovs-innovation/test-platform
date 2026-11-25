import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawBlocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_official_keys.json'), 'utf8'));

// Let's inspect each question 1..60
for (let q = 1; q <= 60; q++) {
  const key = officialKeys[q];
  const block = rawBlocks[q]?.text || '';
  const isMcq = ['A', 'B', 'C', 'D'].includes(key);

  console.log(`Q${q} [${isMcq ? 'MCQ: ' + key : 'NUM: ' + key}]`);
}
