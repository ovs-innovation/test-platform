import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_monotonic_chunks.json'), 'utf8'));

// Inspect lines before [4 marks for a sample of failed questions
const sampleFailed = [2, 3, 4, 6, 12, 16, 20, 24, 25, 26, 27, 28, 30, 31, 33, 35, 38, 40];

for (const q of sampleFailed) {
  const c = chunks[q];
  console.log(`\n================ Q${q} LINES ================`);
  c.lines.forEach((l, idx) => {
    console.log(`  [${idx}]: ${l}`);
  });
}
