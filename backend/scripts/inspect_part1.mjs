import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));
const bounds = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_question_bounds.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));

// Flatten all lines
const lines = [];
for (let p = 1; p <= 151; p++) {
  const pLines = (cache[String(p)] || '').split('\n');
  for (let l = 0; l < pLines.length; l++) {
    lines.push({ page: p, text: pLines[l] });
  }
}

console.log('=== PART 1: Q1 to Q60 SUMMARY ===');
for (let q = 1; q <= 60; q++) {
  const b = bounds[q - 1];
  const chunk = lines.slice(b.startLine, b.endLine).map(l => l.text);
  const key = officialKeys[q];
  console.log(`Q${q} (Page ${lines[b.startLine].page}) [Key: ${key}]: ${chunk[0].slice(0, 70)}`);
}
