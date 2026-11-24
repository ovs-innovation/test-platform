import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_clean_diagram_urls.json'), 'utf8'));

// Build continuous lines
const allLines = [];
for (let p = 1; p <= 128; p++) {
  const pLines = (pages[p] || '').split('\n').map(l => l.trim()).filter(Boolean);
  for (let li = 0; li < pLines.length; li++) {
    allLines.push({ p, li, text: pLines[li] });
  }
}

// Locate all 191 marks lines
const markIndices = [];
for (let i = 0; i < allLines.length; i++) {
  if (allLines[i].text.match(/\[?\s*4\s*marks/i)) {
    markIndices.push(i);
  }
}

// Explicit start overrides for the 21 questions where OCR number was slightly glitched
const startLineExact = {
  1: 8,
  9: 74,
  11: 93,
  13: 128,
  15: 152,
  16: 160,
  41: 568,
  47: 721,
  117: 1883,
  118: 1896,
  119: 1923,
  131: 2200,
  147: 2405
};

// Map each question's start index
const qStarts = {};
for (let q = 1; q <= 191; q++) {
  if (startLineExact[q] !== undefined) {
    qStarts[q] = startLineExact[q];
    continue;
  }

  const markIdx = markIndices[q - 1];
  const prevAnsIdx = q === 1 ? 7 : (function() {
    const prevMark = markIndices[q - 2];
    for (let k = prevMark; k < markIdx; k++) {
      if (allLines[k].text.match(/^ANSWER:/i)) return k;
    }
    return prevMark + 1;
  })();

  const numRegex = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.:;\\s]`, 'i');
  let found = -1;
  for (let i = markIdx - 1; i > prevAnsIdx; i--) {
    if (numRegex.test(allLines[i].text)) {
      found = i;
      break;
    }
  }

  if (found === -1) {
    // Look backwards from markIdx - 1 for standard opening
    for (let i = markIdx - 1; i > prevAnsIdx; i--) {
      const line = allLines[i].text;
      if (/^(\d{1,3}[\.:\s]|In\s|Two\s|A\s|An\s|When\s|Light\s|Consider\s|Direction:|If\s|Using\s|The\s|For\s|Some\s|At\s|Three\s|Unpolarized\s|White\s)/i.test(line)) {
        if (!line.startsWith('For first') && !line.startsWith('For second') && !line.startsWith('In diffraction,')) {
          found = i;
        }
      }
    }
  }

  qStarts[q] = found !== -1 ? found : prevAnsIdx + 1;
}

// Function to clean text
function cleanText(text) {
  return text
    .replace(/^(\bQ\.?\s*)?\d{1,3}[\.:;]\s*/i, '')
    .replace(/^%\s*(na|In a)/i, 'In a')
    .replace(/^es\s*(na|In a)/i, 'In a')
    .replace(/^By\s*/i, '')
    .replace(/^8:\s*/i, '')
    .replace(/^Ana\s*/i, 'In a ')
    .replace(/^4%\s*/i, '')
    .replace(/^M9\.\s*/i, '')
    .replace(/^BL\s*ng\s*/i, 'In a ')
    .replace(/^az;\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Build initial dataset
const questions = [];

for (let q = 1; q <= 191; q++) {
  const startIdx = qStarts[q];
  const markIdx = markIndices[q - 1];
  const expectedKey = String(officialKeys[q]).trim();
  const isNumeric = !['A', 'B', 'C', 'D'].includes(expectedKey);

  // Find answer index
  let ansIdx = -1;
  for (let i = markIdx; i < Math.min(markIdx + 6, allLines.length); i++) {
    if (allLines[i].text.match(/^ANSWER:/i)) {
      ansIdx = i;
      break;
    }
  }

  // Next question start index or file end for solution
  const nextStartIdx = q < 191 ? (qStarts[q + 1] || markIndices[q] - 5) : allLines.length;
  
  // Extract solution
  const solLines = [];
  if (ansIdx !== -1) {
    for (let i = ansIdx + 1; i < nextStartIdx; i++) {
      solLines.push(allLines[i].text);
    }
  }
  const rawSolution = solLines.join('\n').trim();

  // Extract question text and options
  const qLines = [];
  const optLines = [];
  let readingOptions = false;

  for (let i = startIdx; i < markIdx; i++) {
    const l = allLines[i].text;
    if (!isNumeric && (/\([A-Da-d1-4]\)/.test(l) || /^[A-Da-d1-4][\.\)]/.test(l) || /^[©®]\s*/.test(l))) {
      readingOptions = true;
    }
    if (readingOptions) {
      optLines.push(l);
    } else {
      qLines.push(l);
    }
  }

  const rawQText = qLines.join(' ');
  const cleanedQText = cleanText(rawQText);

  // Diagram URL
  const diagKey = `q${q}_diagram.png`;
  const imageUrl = diagramUrls[diagKey] || null;

  questions.push({
    qNum: q,
    page: allLines[startIdx].p,
    question_type: isNumeric ? 'numerical' : 'single',
    question_text: cleanedQText,
    optLines,
    expectedKey,
    isNumeric,
    imageUrl,
    solution: rawSolution
  });
}

console.log(`Generated preliminary data for ${questions.length} questions.`);
fs.writeFileSync(path.resolve(__dirname, 'wave_optics_prelim_191.json'), JSON.stringify(questions, null, 2));
