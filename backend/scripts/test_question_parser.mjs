import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// Test parsing on pages 1 to 5
const fullText = [];
for (let p = 1; p <= 5; p++) {
  fullText.push(ocrCache[String(p)] || '');
}
const text = fullText.join('\n');

// Split by "ANSWER:"
const rawBlocks = text.split(/^ANSWER\s*:\s*([^\n]+)/im);
console.log(`Raw answer split blocks: ${rawBlocks.length}`);

for (let i = 1; i < rawBlocks.length; i += 2) {
  const ans = rawBlocks[i].trim();
  const beforeBlock = rawBlocks[i - 1];
  console.log(`\n--- Question (Answer: ${ans}) ---`);
  const lines = beforeBlock.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  console.log('Last 6 lines before answer:');
  console.log(lines.slice(-6).join(' | '));
}
