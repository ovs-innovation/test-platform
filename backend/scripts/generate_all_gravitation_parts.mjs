import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Build sequential text stream with question boundaries
// Questions: 1 to 228
const rawQuestions = {};

// Clean OCR artifacts
function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/AcadXL[™®\s]*/gi, '')
    .replace(/PREVIOUS YEAR QUESTIONS WITH SOLUTIONS.*?\n/gi, '')
    .replace(/EDUCATION WITH DISCIPLINE/gi, '')
    .replace(/Free to download.*?\n/gi, '')
    .replace(/Practise these online.*?\n/gi, '')
    .replace(/Gravitation — JEE Main PYQ Bank.*?\n/gi, '')
    .replace(/Time: \d+ minutes - Maximum marks: \d+ - Questions: \d+/gi, '')
    .trim();
}

// Map each question number to its page and block
let currentQ = 0;
let currentBlock = [];

for (let p = 1; p <= 144; p++) {
  const pad = String(p).padStart(3, '0');
  const pageText = cache[pad] || '';
  const lines = pageText.split('\n');

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    // Check if line starts with question header, e.g. "1. ", "228. ", "30: ", "112. "
    // Also handle OCR seeing "M1.", "M2.", "2M ", "ns.", "5:"
    let m = line.match(/^\s*(?:Q\.?\s*)?(\d{1,3})[\.\:\-\)]\s+(.*)/i);
    if (!m) {
      // Check special OCR misrecognitions
      if (line.match(/^\s*M\.?\s+/i) && currentQ === 110) m = [null, '111', line.replace(/^\s*M\.?\s+/i, '')];
      else if (line.match(/^\s*M2\.?\s+/i) && currentQ === 111) m = [null, '112', line.replace(/^\s*M2\.?\s+/i, '')];
      else if (line.match(/^\s*["']3\.?\s+/i) && currentQ === 112) m = [null, '113', line.replace(/^\s*["']3\.?\s+/i, '')];
      else if (line.match(/^\s*M5\.?\s+/i) && currentQ === 114) m = [null, '115', line.replace(/^\s*M5\.?\s+/i, '')];
      else if (line.match(/^\s*M86\.?\s+/i) && currentQ === 115) m = [null, '116', line.replace(/^\s*M86\.?\s+/i, '')];
      else if (line.match(/^\s*M7\.?\s+/i) && currentQ === 116) m = [null, '117', line.replace(/^\s*M7\.?\s+/i, '')];
      else if (line.match(/^\s*ns\.?\s+/i) && currentQ === 117) m = [null, '118', line.replace(/^\s*ns\.?\s+/i, '')];
      else if (line.match(/^\s*M9\.?\s+/i) && currentQ === 118) m = [null, '119', line.replace(/^\s*M9\.?\s+/i, '')];
      else if (line.match(/^\s*2M\s+/i) && currentQ === 210) m = [null, '211', line.replace(/^\s*2M\s+/i, '')];
      else if (line.match(/^\s*51\.\s+/i) && currentQ === 150) m = [null, '151', line.replace(/^\s*51\.\s+/i, '')];
      else if (line.match(/^\s*["']58\s+/i) && currentQ === 157) m = [null, '158', line.replace(/^\s*["']58\s+/i, '')];
      else if (line.match(/^\s*fees\s+/i) && currentQ === 168) m = [null, '169', line.replace(/^\s*fees\s+/i, '')];
    }

    if (m) {
      const qNum = parseInt(m[1]);
      if (qNum >= 1 && qNum <= 228 && (qNum === currentQ + 1 || (qNum > currentQ && qNum <= currentQ + 3))) {
        if (currentQ > 0 && currentBlock.length > 0) {
          if (!rawQuestions[currentQ]) {
            rawQuestions[currentQ] = currentBlock.join('\n');
          }
        }
        currentQ = qNum;
        currentBlock = [line];
        continue;
      }
    }

    if (currentQ > 0) {
      currentBlock.push(line);
    }
  }
}

if (currentQ > 0 && currentBlock.length > 0 && !rawQuestions[currentQ]) {
  rawQuestions[currentQ] = currentBlock.join('\n');
}

console.log(`Parsed blocks for ${Object.keys(rawQuestions).length}/228 questions`);
const missing = [];
for (let i = 1; i <= 228; i++) {
  if (!rawQuestions[i]) missing.push(i);
}
console.log('Missing question blocks:', missing.join(', '));

fs.writeFileSync(path.resolve(__dirname, 'gravitation_raw_blocks.json'), JSON.stringify(rawQuestions, null, 2));
