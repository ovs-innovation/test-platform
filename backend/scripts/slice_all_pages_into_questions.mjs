import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Regex to identify question start anywhere on a page:
// e.g. "1. ", "228. ", "30: ", "112. "
function findQuestionHeadersOnPage(text) {
  const lines = text.split('\n');
  const headers = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Matches like "1. ", "228. ", "30: ", "112. "
    let m = line.match(/^(?:Q\.?\s*)?(\d{1,3})[\.\:\-\)]\s+(.*)/i);
    if (!m) {
      if (line.match(/^bo\s+/i)) m = [null, '17', line];
      else if (line.match(/^2a\s+/i)) m = [null, '23', line];
      else if (line.match(/^33\s+/i)) m = [null, '33', line];
      else if (line.match(/^a\s+A body/i)) m = [null, '48', line];
      else if (line.match(/^5%\.?\s+/i)) m = [null, '51', line];
      else if (line.match(/^84\.\s+/i)) m = [null, '64', line];
      else if (line.match(/^n PIER/i)) m = [null, '71', line];
      else if (line.match(/^193[\.:]/i)) m = [null, '103', line];
      else if (line.match(/^108\.\s+The minimum/i)) m = [null, '106', line];
      else if (line.match(/^M0[\.:]\s+/i)) m = [null, '110', line];
      else if (line.match(/^M[\.:]\s+Inside/i)) m = [null, '111', line];
      else if (line.match(/^M2[\.:]\s+/i)) m = [null, '112', line];
      else if (line.match(/^["']3[\.:]\s+/i)) m = [null, '113', line];
      else if (line.match(/^na[\.:]\s+/i)) m = [null, '114', line];
      else if (line.match(/^M5[\.:]\s+/i)) m = [null, '115', line];
      else if (line.match(/^M86[\.:]\s+/i)) m = [null, '116', line];
      else if (line.match(/^M7[\.:]\s+/i)) m = [null, '117', line];
      else if (line.match(/^ns[\.:]\s+/i)) m = [null, '118', line];
      else if (line.match(/^M9[\.:]\s+/i)) m = [null, '119', line];
      else if (line.match(/^181\.\s+An object/i)) m = [null, '141', line];
      else if (line.match(/^51\.\s+The time/i)) m = [null, '151', line];
      else if (line.match(/^["']58\s+/i)) m = [null, '158', line];
      else if (line.match(/^184\.\s+The weight/i)) m = [null, '164', line];
      else if (line.match(/^fees\s+/i)) m = [null, '169', line];
      else if (line.match(/^72\.\s+.*The radii/i)) m = [null, '172', line];
      else if (line.match(/^74\.\s+.*gravitational/i)) m = [null, '174', line];
      else if (line.match(/^208\.\s+.*satellite of mass/i)) m = [null, '206', line];
      else if (line.match(/^2M\s+/i)) m = [null, '211', line];
      else if (line.match(/^219\s+/i)) m = [null, '219', line];
    }
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 228) {
        headers.push({ qNum, lineIdx: i, raw: line });
      }
    }
  }
  return headers;
}

// Slice each question
const slicedQuestions = {};

for (let p = 1; p <= 144; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n');
  const headers = findQuestionHeadersOnPage(text);

  for (let h = 0; h < headers.length; h++) {
    const qNum = headers[h].qNum;
    const startLine = headers[h].lineIdx;
    const endLine = (h + 1 < headers.length) ? headers[h + 1].lineIdx : lines.length;
    const block = lines.slice(startLine, endLine).join('\n');
    slicedQuestions[qNum] = block;
  }
}

console.log(`Sliced ${Object.keys(slicedQuestions).length}/228 questions!`);
const missing = [];
for (let q = 1; q <= 228; q++) {
  if (!slicedQuestions[q]) missing.push(q);
}
console.log('Still un-sliced:', missing.join(', '));

fs.writeFileSync(path.resolve(__dirname, 'gravitation_sliced_blocks.json'), JSON.stringify(slicedQuestions, null, 2));
