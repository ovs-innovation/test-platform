import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrData = JSON.parse(fs.readFileSync(path.join(__dirname, 'ktg_ocr_all.json'), 'utf8'));

// Concatenate all pages with explicit page markers
let fullText = '';
for (let p = 1; p <= 90; p++) {
  const pText = ocrData[p]?.text || '';
  fullText += `\n<<<PAGE_${p}>>>\n` + pText + '\n';
}

const CUSTOM_PATTERNS = {
  11: /(?:\n|<<<PAGE_\d+>>>\n)\s*n\s+One kg of a diatomic gas/i,
  13: /(?:\n|<<<PAGE_\d+>>>\n)\s*LY\s+thermally insulated vessel/i,
  21: /(?:\n|<<<PAGE_\d+>>>\n)\s*2\]:\s+Which of the following/i,
  27: /(?:\n|<<<PAGE_\d+>>>\n)\s*2\s+The value closest to the thermal velocity/i,
  31: /(?:\n|<<<PAGE_\d+>>>\n)\s*3\.\s+2kg of a monoatomic gas/i,
  110: /(?:\n|<<<PAGE_\d+>>>\n)\s*MO\.\s+Match List/i,
  111: /(?:\n|<<<PAGE_\d+>>>\n)\s*m\.\s*5?\s*gas mixture consists/i,
  112: /(?:\n|<<<PAGE_\d+>>>\n)\s*M2\.\s+Three vessels of equal/i,
  113: /(?:\n|<<<PAGE_\d+>>>\n)\s*M3\.\s+The root mean square speed/i,
  114: /(?:\n|<<<PAGE_\d+>>>\n)\s*M4\.\s+If the r\.m\.s speed/i,
  115: /(?:\n|<<<PAGE_\d+>>>\n)\s*15\.\s+1?\s*The rms speed of oxygen molecule/i,
  116: /(?:\n|<<<PAGE_\d+>>>\n)\s*M6\.\s+The mean free path of molecules/i,
  117: /(?:\n|<<<PAGE_\d+>>>\n)\s*M7\.\s+A flask contains Hydrogen/i,
  118: /(?:\n|<<<PAGE_\d+>>>\n)\s*M8\.\s+The average kinetic energy/i,
  119: /(?:\n|<<<PAGE_\d+>>>\n)\s*M9\.\s+The total kinetic energy/i,
  131: /(?:\n|<<<PAGE_\d+>>>\n)\s*131\s+if is the number density/i,
  134: /(?:\n|<<<PAGE_\d+>>>\n)\s*18%\s+The specific heat at constant pressure/i,
  138: /(?:\n|<<<PAGE_\d+>>>\n)\s*138;\s+The temperature of a gas/i,
  141: /(?:\n|<<<PAGE_\d+>>>\n)\s*LL\s+The kinetic energy of translation/i,
  146: /(?:\n|<<<PAGE_\d+>>>\n)\s*148\.\s+The rms\.\s+speed of oxygen molecules at 47°C/i,
};

const questionPositions = [];

for (let q = 1; q <= 156; q++) {
  const prevIdx = questionPositions.length > 0 ? questionPositions[questionPositions.length - 1].index : -1;
  let foundIdx = -1;

  if (CUSTOM_PATTERNS[q]) {
    const rx = new RegExp(CUSTOM_PATTERNS[q].source, 'gi');
    let m;
    while ((m = rx.exec(fullText)) !== null) {
      if (m.index > prevIdx) {
        foundIdx = m.index;
        break;
      }
    }
  } else {
    const rx = new RegExp(`(?:\\n|<<<PAGE_\\d+>>>\\n)\\s*${q}[\\.:]\\s+`, 'g');
    let m;
    while ((m = rx.exec(fullText)) !== null) {
      if (m.index > prevIdx) {
        foundIdx = m.index;
        break;
      }
    }
  }

  if (foundIdx !== -1) {
    questionPositions.push({ qNum: q, index: foundIdx });
  } else {
    console.warn(`Could not find position for Q${q}! (prevIdx = ${prevIdx})`);
  }
}

console.log(`Matched ${questionPositions.length}/156 questions.`);

// Extract raw text block for each question
const questionBlocks = {};
for (let i = 0; i < questionPositions.length; i++) {
  const curr = questionPositions[i];
  const next = questionPositions[i + 1];
  const start = curr.index;
  const end = next ? next.index : fullText.length;
  questionBlocks[curr.qNum] = fullText.substring(start, end).trim();
}

fs.writeFileSync(
  path.join(__dirname, 'ktg_raw_blocks.json'),
  JSON.stringify(questionBlocks, null, 2)
);

console.log('Saved raw question blocks to ktg_raw_blocks.json');
