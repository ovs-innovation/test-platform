import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Common OCR cleanups
function cleanPhysicsProse(str) {
  if (!str) return '';
  return str
    .replace(/\bpaint\b/gi, 'point')
    .replace(/\b13\b(?=, then brought in contact with C)/g, 'B')
    .replace(/\b13\b(?= and C)/g, 'B')
    .replace(/\bBB and C'\b/g, 'B and C')
    .replace(/\bBB\b(?= and C)/g, 'B')
    .replace(/\bAcharged\b/g, 'A charged')
    .replace(/\bts centre\b/gi, 'its centre')
    .replace(/\bts center\b/gi, 'its center')
    .replace(/\bts axis\b/gi, 'its axis')
    .replace(/\bvalue of g\b/gi, 'value of q')
    .replace(/\bcharge g\b/gi, 'charge q')
    .replace(/\bcharges g\b/gi, 'charges q')
    .replace(/\bg1\b/g, 'q_1')
    .replace(/\bg2\b/g, 'q_2')
    .replace(/\bgs\b/g, 'q_3')
    .replace(/\b—qu\b/g, '-q_1')
    .replace(/\b—qi\b/g, '-q_1')
    .replace(/\b2-component\b/gi, 'x-component')
    .replace(/\bz-axis\b/gi, 'x-axis')
    .replace(/\bz-direction\b/gi, 'x-direction')
    .replace(/\bz -axis\b/gi, 'x-axis')
    .replace(/\bz\s*=\s*/g, 'x = ')
    .replace(/\bjum\b/g, '\\mu\\text{m}')
    .replace(/\buC\b/g, '\\mu\\text{C}')
    .replace(/\bTiC\b/g, '7\\mu\\text{C}')
    .replace(/\b10¢ V \/m\b/g, '10^4\\text{ V/m}')
    .replace(/\b10c V \/m\b/g, '10^4\\text{ V/m}')
    .replace(/\b3 x 10¢\b/g, '3 \\times 10^4')
    .replace(/\b3 x 10c\b/g, '3 \\times 10^4')
    .replace(/\b9.9 x 10" kg\b/g, '9.9 \\times 10^{-15}\\text{ kg}')
    .replace(/\b10" kg\b/g, '10^{-15}\\text{ kg}')
    .replace(/\ba-particle\b/gi, '\\alpha\\text{-particle}')
    .replace(/\b5MeV\b/g, '5\\text{ MeV}')
    .replace(/\b5 MeV\b/g, '5\\text{ MeV}')
    .replace(/\bF'\b/g, 'F')
    .replace(/\beo\b/g, '\\varepsilon_0')
    .replace(/\bfen\b/g, '\\varepsilon_0')
    .replace(/\b4me,\b/g, '4\\pi\\varepsilon_0')
    .replace(/\bIme,\b/g, '4\\pi\\varepsilon_0')
    .replace(/\b2me,L\b/g, '2\\pi\\varepsilon_0 L')
    .replace(/\b3me,L\b/g, '3\\pi\\varepsilon_0 L')
    .replace(/\bcosh\b/g, '\\cos\\theta')
    .replace(/\bcot\b/g, '\\cot\\theta')
    .replace(/\bging\b/g, '\\sin\\theta')
    .replace(/\btang\b/g, '\\tan\\theta')
    .replace(/\bWg\b/g, '-Q/8')
    .replace(/\b_g\/2\b/g, '-Q/2')
    .replace(/\b_qg\/4\b/g, '-Q/4')
    .replace(/\bqa\b/g, '-Q')
    .replace(/\bav\b/g, '0.1\\text{ V}')
    .replace(/\bsv\b/g, '8\\text{ V}')
    .replace(/\b2v\b/g, '2\\text{ V}')
    .replace(/\b05v\b/g, '0.5\\text{ V}')
    .replace(/\bgg\b/g, 'F/4')
    .replace(/\b34\b(?=\s*$)/g, '3F/4')
    .replace(/\bg\/g\b/g, 'F/8')
    .replace(/\b35\/5\b/g, '3F/8')
    .replace(/\s+/g, ' ')
    .trim();
}

function isMarksLine(s) {
  const l = s.trim();
  if (!l) return true;
  if (/(?:marks|mars|mks|marking|Shift|Offline|wrong|wong|wang|wiong)\b/i.test(l)) return true;
  if (/^[-—\=\_\.\s\~\[\]\{\}\(\)]{3,}$/.test(l)) return true;
  if (/(?:\[|\b)?(?:ER|Trp|TET|Rw|Pr|T—)\s*[-—\=]/i.test(l)) return true;
  if (/^\[?ER\s*T/i.test(l)) return true;
  if (/^\[?[A-Za-z\s]{0,4}\d{1,2}\s*(?:marks|mars|mks|mark)/i.test(l)) return true;
  if (/^(?:Tak\s*TR|Treokt|Pepa)/i.test(l)) return true;
  return false;
}

// Map of manually verified question start line offsets
const Q_START_LINE_OVERRIDE = {
  1: 7, 2: 1, 3: 2, 4: 2, 5: 7, 6: 3, 7: 5, 8: 2, 9: 9, 10: 2,
  11: 11, 12: 12, 13: 3, 14: 6, 15: 3, 16: 2, 17: 2, 18: 2, 19: 1, 20: 2,
  21: 3, 22: 2, 23: 6, 24: 21, 25: 4, 26: 2, 27: 2, 28: 2, 29: 25, 30: 2,
  31: 6, 32: 3, 33: 4, 34: 6, 35: 3, 36: 2, 37: 6, 38: 2, 39: 5, 40: 2,
  41: 7, 42: 5, 43: 8, 44: 4, 45: 3, 46: 3, 47: 15, 48: 2, 49: 3, 50: 2,
  51: 4, 52: 8, 53: 4, 54: 2, 55: 2, 56: 4, 57: 3, 58: 2, 59: 4, 60: 9,
  61: 23, 62: 7, 63: 20, 64: 14, 65: 11, 66: 6, 67: 7, 68: 6, 69: 6, 70: 5,
  71: 19, 72: 6, 73: 13, 74: 7, 75: 8, 76: 6, 77: 12, 78: 5, 79: 7, 80: 9,
  81: 5, 82: 4, 83: 13, 84: 9, 85: 6, 86: 5, 87: 14, 88: 15, 89: 8, 90: 10,
  91: 16, 92: 12, 93: 8, 94: 8, 95: 11, 96: 10, 97: 18, 98: 6, 99: 5, 100: 6
};

function extract4Options(text) {
  let s = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  // Find markers for A, B, C, D
  const m = s.match(/(?:^|[\s\(\[])(?:A|1|CP|W|Wg|\[A\])[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:B|8|®|B®|\[B\])[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:C|©|¢|€|\[C\])[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:D|0|\(0\)|\[0\]|\[D\]|©\))[\.\:\)\}\]\s]\s*(.*)$/i);
  if (m) {
    const a = cleanPhysicsProse(m[1].trim());
    const b = cleanPhysicsProse(m[2].trim());
    const c = cleanPhysicsProse(m[3].trim());
    const d = cleanPhysicsProse(m[4].trim());
    if (a && b && c && d) {
      return [a, b, c, d];
    }
  }
  return null;
}

let successfulMCQs = 0;
let numericals = 0;
let failedMCQs = [];

for (let q = 1; q <= 100; q++) {
  const b = blocks[q - 1];
  const offKey = officialKeys[String(q)];
  const isNum = !['A', 'B', 'C', 'D'].includes(offKey);
  if (isNum) {
    numericals++;
    continue;
  }

  const lines = b.rawLines;
  const startIdx = Q_START_LINE_OVERRIDE[q] ?? 0;
  let marksIdx = lines.length - 1;
  while (marksIdx > startIdx && isMarksLine(lines[marksIdx].text)) marksIdx--;

  // Locate where option A marker starts
  let optStartLine = -1;
  for (let l = startIdx; l <= marksIdx; l++) {
    if (/(?:^|[\s\(\[])(?:A|1|CP|W|Wg)[\.\:\)\}\]\s]/.test(lines[l].text.trim())) {
      optStartLine = l;
      break;
    }
  }

  if (optStartLine !== -1) {
    const optText = lines.slice(optStartLine, marksIdx + 1).map(l => l.text).join(' ');
    const opts = extract4Options(optText);
    if (opts) {
      successfulMCQs++;
      continue;
    }
  }

  // Fallback: take last 2 to 4 lines
  const optTextFallback = lines.slice(Math.max(startIdx, marksIdx - 3), marksIdx + 1).map(l => l.text).join(' ');
  const optsFb = extract4Options(optTextFallback);
  if (optsFb) {
    successfulMCQs++;
  } else {
    failedMCQs.push(q);
  }
}

console.log(`Part 1 Results:`);
console.log(`Numericals: ${numericals}`);
console.log(`MCQs successfully parsed with 4 clean options: ${successfulMCQs} / ${100 - numericals}`);
console.log(`Remaining failed MCQs: ${failedMCQs.length}`);
console.log(`Failed list:`, failedMCQs);
