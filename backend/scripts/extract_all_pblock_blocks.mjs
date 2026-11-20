import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_ocr_cache.json'), 'utf8'));
const pageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_page_map.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_official_keys.json'), 'utf8'));

const blocks = {};

for (const entry of pageMap) {
  const p = entry.page;
  const pad = String(p).padStart(3, '0');
  const pageText = cache[pad] || '';
  const qNums = entry.questions;

  if (qNums.length === 1) {
    blocks[qNums[0]] = { page: p, text: pageText.trim() };
    continue;
  }

  // Find occurrences of "ANSWER:" on this page
  // There should be as many "ANSWER:" as questions on the page (or close to it)
  const lines = pageText.split('\n');
  let currentQIdx = 0;
  let currentLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if line indicates the start of next question
    // E.g., next qNum is qNums[currentQIdx + 1]
    const nextQNum = qNums[currentQIdx + 1];
    let isNextQ = false;

    if (nextQNum !== undefined) {
      // Check if line starts with nextQNum or OCR artifact
      const trimmed = line.trim();
      const numMatch = trimmed.match(/^(\d{1,2})[.:\s]/);
      if (numMatch && parseInt(numMatch[1], 10) === nextQNum) {
        isNextQ = true;
      } else if (p === 2 && currentQIdx === 1 && (trimmed.startsWith('8:') || trimmed.startsWith('6.'))) {
        // Q6 on page 2
        isNextQ = true;
      } else if (p === 4 && currentQIdx === 0 && (trimmed.startsWith('12.') || trimmed.startsWith('12:'))) {
        isNextQ = true;
      } else if (p === 6 && currentQIdx === 0 && (trimmed.includes('Match the items') || trimmed.startsWith('77.') || trimmed.startsWith('17.'))) {
        isNextQ = true;
      } else if (p === 8 && currentQIdx === 0 && (trimmed.startsWith('2,') || trimmed.startsWith('21.'))) {
        isNextQ = true;
      } else if (p === 18 && currentQIdx === 0 && (trimmed.includes('The INCORRECT statement regarding the structure of C60') || trimmed.startsWith('43.'))) {
        isNextQ = true;
      } else if (p === 19 && currentQIdx === 1 && (trimmed.includes('Mohr\'s salt') || trimmed.startsWith('46:') || trimmed.startsWith('46.'))) {
        isNextQ = true;
      } else if (p === 24 && currentQIdx === 0 && (trimmed.includes('geometry around boron') || trimmed.startsWith('54.') || trimmed.startsWith('64:'))) {
        isNextQ = true;
      } else if (p === 32 && currentQIdx === 0 && (trimmed.includes('Structures of BeCl') || trimmed.startsWith('ee.') || trimmed.startsWith('66.'))) {
        isNextQ = true;
      } else if (p === 33 && currentQIdx === 1 && (trimmed.includes('formula of Borax') || trimmed.startsWith('89:') || trimmed.startsWith('69.'))) {
        isNextQ = true;
      } else if (p === 34 && currentQIdx === 0 && (trimmed.includes('covalency and oxidation state') || trimmed.startsWith('71 ') || trimmed.startsWith('71.'))) {
        isNextQ = true;
      }
    }

    if (isNextQ) {
      blocks[qNums[currentQIdx]] = { page: p, text: currentLines.join('\n').trim() };
      currentQIdx++;
      currentLines = [line];
    } else {
      currentLines.push(line);
    }
  }

  if (currentQIdx < qNums.length) {
    blocks[qNums[currentQIdx]] = { page: p, text: currentLines.join('\n').trim() };
  }
}

console.log(`Extracted blocks for ${Object.keys(blocks).length} questions.`);
const missing = [];
for (let i = 1; i <= 96; i++) {
  if (!blocks[i]) missing.push(i);
}
console.log('Missing blocks:', missing);

fs.writeFileSync(path.resolve(__dirname, 'pblock_raw_blocks.json'), JSON.stringify(blocks, null, 2));
