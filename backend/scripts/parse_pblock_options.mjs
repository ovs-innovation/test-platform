import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawBlocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_official_keys.json'), 'utf8'));

// Test option parsing
for (let i = 1; i <= 96; i++) {
  if (i === 46 || i === 69) continue; // Numerical
  const block = rawBlocks[i];
  const text = block.text;

  // Question stem is before (A) or options
  // Options are between stem and [4 marks] or ANSWER:
  const marksIdx = text.search(/(?:\[?\s*4\s*marks|ANSWER:)/i);
  const qSection = marksIdx !== -1 ? text.slice(0, marksIdx) : text;
  
  // Let's find options in qSection
  // Check if (A), (B), (C), (D) exist
  const hasA = /\([Aa4]\)|[Aa]\s*\]/.test(qSection);
  const hasB = /\([Bb8]\)|[Bb]\s*\]/.test(qSection);
  const hasC = /\([Cc©]\)|[Cc]\s*\]/.test(qSection);
  const hasD = /\([Dd0O]\)|[Dd]\s*\]/.test(qSection);

  if (!hasA || !hasB || !hasC || !hasD) {
    console.log(`[Q${i}] Option markers check: A=${hasA}, B=${hasB}, C=${hasC}, D=${hasD}`);
  }
}
