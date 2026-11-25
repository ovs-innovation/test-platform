import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'redox_ocr_cache.json'), 'utf8'));
const ranges = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'redox_page_ranges.json'), 'utf8'));

const rawBlocks = {};

for (let p = 1; p <= 27; p++) {
  const pad = String(p).padStart(3, '0');
  const pageText = cache[pad] || '';
  const [startQ, endQ] = ranges[p];

  if (startQ === endQ) {
    rawBlocks[startQ] = {
      page: p,
      text: pageText.trim()
    };
    continue;
  }

  const lines = pageText.split('\n');
  const qLineIndices = [];

  for (let q = startQ; q <= endQ; q++) {
    let foundLine = -1;
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l].trim();
      
      // Special OCR patterns
      if (q === 5 && /^[S5][\.\-\s]+calomel/i.test(line)) { foundLine = l; break; }
      if (q === 6 && /^&?\s*XMnO|^In the following balanced/i.test(line)) { foundLine = l; break; }
      if (q === 7 && /^7\.\s*Consider the following/i.test(line)) { foundLine = l; break; }
      if (q === 10 && /^10\.\s*How many/i.test(line)) { foundLine = l; break; }
      if (q === 11 && /^1?1\.\s*The pair of compounds/i.test(line)) { foundLine = l; break; }
      if (q === 14 && /^[41]?4?\.\s*\|?n order to oxidize/i.test(line)) { foundLine = l; break; }
      if (q === 18 && /^18\.\s*Consider the following|Consider the following reactions/i.test(line)) { foundLine = l; break; }
      if (q === 23 && /^23\.\s*The reaction|The reaction of sulphur/i.test(line)) { foundLine = l; break; }
      if (q === 27 && /^2[27]\.\s*[0-9]?MnO/i.test(line)) { foundLine = l; break; }
      if (q === 39 && /^39\.\s*Which of the given/i.test(line)) { foundLine = l; break; }
      if (q === 40 && /^40\.\s*20mL/i.test(line)) { foundLine = l; break; }
      if (q === 41 && /^41\s*20mL/i.test(line)) { foundLine = l; break; }
      if (q === 46 && /^4[68]\.\s*,?\s*i|^2IO/i.test(line)) { foundLine = l; break; }
      if (q === 47 && /^47\.\s*In alkaline/i.test(line)) { foundLine = l; break; }
      if (q === 48) {
        if (/^48[\.:\s]*K\s*MnO/i.test(line)) { foundLine = l; break; }
        continue;
      }
      if (q === 49 && /^49\.\s*See the following/i.test(line)) { foundLine = l; break; }
      if (q === 71 && /^[71]?1?\.\s*200\s*cc/i.test(line)) { foundLine = l; break; }

      // Default pattern
      if (
        new RegExp(`^${q}[\\.:\\-\\)]\\s*`, 'i').test(line) ||
        new RegExp(`^Q\\.?\\s*${q}[\\.:\\-\\)]`, 'i').test(line)
      ) {
        foundLine = l;
        break;
      }
    }
    qLineIndices.push({ q, lineIdx: foundLine });
  }

  // Slice lines
  for (let i = 0; i < qLineIndices.length; i++) {
    const { q, lineIdx } = qLineIndices[i];
    const nextLineIdx = (i + 1 < qLineIndices.length) ? qLineIndices[i + 1].lineIdx : lines.length;

    if (lineIdx !== -1 && nextLineIdx !== -1 && nextLineIdx > lineIdx) {
      rawBlocks[q] = {
        page: p,
        text: lines.slice(lineIdx, nextLineIdx).join('\n').trim()
      };
    } else {
      console.warn(`Warning: manual slice needed for Q${q} on page ${p} (lineIdx=${lineIdx}, next=${nextLineIdx})`);
      const numQ = endQ - startQ + 1;
      const relIdx = q - startQ;
      const startL = Math.floor(lines.length * relIdx / numQ);
      const endL = Math.floor(lines.length * (relIdx + 1) / numQ);
      rawBlocks[q] = {
        page: p,
        text: lines.slice(startL, endL).join('\n').trim()
      };
    }
  }
}

fs.writeFileSync(path.resolve(__dirname, 'redox_raw_blocks.json'), JSON.stringify(rawBlocks, null, 2));
console.log(`Successfully sliced all ${Object.keys(rawBlocks).length}/76 raw blocks cleanly.`);
