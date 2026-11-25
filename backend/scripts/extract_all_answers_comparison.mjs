import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// 1. Extract every "ANSWER: ..." from question pages 1..170
const pageAnswers = [];
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.startsWith('ANSWER:')) {
      const ans = l.replace(/^ANSWER:\s*/, '').trim();
      pageAnswers.push({ page: p, ans });
    }
  }
}

console.log(`Found ${pageAnswers.length} ANSWER entries on question pages 1..170.`);

// Let's print out the first 20 and last 20 answers to verify count and order
console.log('First 15 answers:');
console.log(pageAnswers.slice(0, 15));

console.log('Last 15 answers:');
console.log(pageAnswers.slice(-15));

fs.writeFileSync(
  path.resolve(__dirname, 'electrostatics_page_answers.json'),
  JSON.stringify(pageAnswers, null, 2)
);
