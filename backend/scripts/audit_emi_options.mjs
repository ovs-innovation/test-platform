import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_monotonic_chunks.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_jee_official_keys.json'), 'utf8'));

const NUMERICAL_QS = new Set([56,63,64,69,71,73,79,80,81,82,84,91,92,94,99,100,101,102,106,108,111,112,113,116,119,120,122,123,124,126,128,129,131,133,134,135,137,138,139,140,141,143,145,149,150,154,158,160,162,168,169]);

function parseOptionsFromChunk(c) {
  const lines = c.lines;
  // find line with marks or ANSWER
  let endIdx = lines.findIndex(l => /\[\d+\s*marks/i.test(l) || /^ANSWER\s*:/i.test(l));
  if (endIdx === -1) endIdx = lines.length;

  const relevant = lines.slice(0, endIdx);
  const text = relevant.join('\n');

  // Look for options (A), (B), (C), (D) or (a), (b), (c), (d)
  // Options may be on separate lines or on same line
  // Common patterns:
  // (A) optA (B) optB
  // (C) optC (D) optD
  const optMatches = [...text.matchAll(/\(([A-D])\)\s*([^(\n]+(?:\n(?!\([A-D]\))[^(\n]+)*)/gi)];
  
  // Or check if options are marked like A. optA B. optB
  if (optMatches.length >= 4) {
    const opts = {};
    for (const m of optMatches) {
      const k = m[1].toUpperCase();
      if (!opts[k]) opts[k] = m[2].trim().replace(/\s+/g, ' ');
    }
    if (opts['A'] && opts['B'] && opts['C'] && opts['D']) {
      return [opts['A'], opts['B'], opts['C'], opts['D']];
    }
  }

  return null;
}

const audit = {
  totalMcq: 0,
  parsedMcq: 0,
  failedMcq: []
};

for (let q = 1; q <= 173; q++) {
  if (NUMERICAL_QS.has(q)) continue;
  audit.totalMcq++;
  const c = chunks[q];
  const opts = parseOptionsFromChunk(c);
  if (opts && opts.length === 4) {
    audit.parsedMcq++;
  } else {
    audit.failedMcq.push(q);
  }
}

console.log(`Parsed options automatically: ${audit.parsedMcq} / ${audit.totalMcq}`);
console.log(`Failed MCQs count: ${audit.failedMcq.length}`);
console.log('Failed MCQs:', audit.failedMcq);
