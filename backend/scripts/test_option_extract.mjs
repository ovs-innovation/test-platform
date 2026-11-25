import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Test option extraction across 50 questions
const results = [];

for (let q = 1; q <= 50; q++) {
  const officialKey = keys[q];
  const isNumeric = !['A', 'B', 'C', 'D'].includes(officialKey);
  if (isNumeric) {
    results.push({ q, type: 'numeric', key: officialKey });
    continue;
  }
  
  // Find where Q appears in cache
  let foundPage = 0;
  let qText = '';
  for (let p = 1; p <= 211; p++) {
    const text = cache[p] || '';
    // Look for q. or q)
    const qIdx = text.search(new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\)]\\s+`, 'i'));
    if (qIdx !== -1) {
      foundPage = p;
      qText = text.slice(qIdx);
      break;
    }
  }

  // Look for options [A] [B] [C] [D] in qText
  // Truncate at solution/answer
  const solIdx = qText.search(/(?:Answer|ans|solution|sol\.|\bKVL\b|\bUsing\b)\s*[\:\=]/i);
  const block = solIdx !== -1 ? qText.slice(0, solIdx) : qText.slice(0, 500);

  results.push({
    q,
    page: foundPage,
    blockSnippet: block.replace(/\n+/g, ' ').slice(0, 150)
  });
}

console.log('Sample extracted snippets for first 15 questions:');
results.slice(0, 15).forEach(r => console.log(`Q${r.q} (p.${r.page}): ${r.blockSnippet}`));
