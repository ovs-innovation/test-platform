import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));

const qMap = {};

// Helper: check each page for question patterns
for (let p = 1; p <= 144; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n');

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li].trim();
    // Patterns: "1. ", "1: ", "1- ", "Q. 1", "Q1", "1) "
    const m = line.match(/^(?:Q\.?\s*)?(\d{1,3})[\.\:\-\)\s]\s*(.*)/i);
    if (m) {
      const qNum = parseInt(m[1]);
      if (qNum >= 1 && qNum <= 228) {
        if (!qMap[qNum]) {
          qMap[qNum] = { page: p, lineIdx: li, header: line };
        }
      }
    }
  }
}

const missing = [];
for (let i = 1; i <= 228; i++) {
  if (!qMap[i]) missing.push(i);
}
console.log(`Found ${Object.keys(qMap).length}/228 questions`);
console.log('Still missing:', missing);

// Let's inspect where missing questions might be by looking at pages between adjacent found questions
for (const miss of missing) {
  const prev = miss - 1;
  const next = miss + 1;
  const prevPage = qMap[prev]?.page || 1;
  const nextPage = qMap[next]?.page || 144;
  console.log(`Missing Q${miss} should be between page ${prevPage} and page ${nextPage}`);
  for (let p = prevPage; p <= nextPage; p++) {
    const pad = String(p).padStart(3, '0');
    const text = cache[pad] || '';
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    console.log(`   Page ${p} has ${lines.length} lines. First 2 lines: "${lines[0]?.slice(0, 60)}" | "${lines[1]?.slice(0, 60)}"`);
  }
}
