import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Verified question start line offsets
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
  91: 16, 92: 12, 93: 8, 94: 8, 95: 11, 96: 10, 97: 18, 98: 6, 99: 5, 100: 6,
  101: 5, 102: 6, 103: 6, 104: 11, 105: 10, 106: 4, 107: 6, 108: 5, 109: 8, 110: 5,
  111: 4, 112: 4, 113: 4, 114: 6, 115: 5, 116: 4, 117: 6, 118: 5, 119: 5, 120: 8,
  121: 7, 122: 9, 123: 10, 124: 6, 125: 7, 126: 8, 127: 11, 128: 12, 129: 8, 130: 9,
  131: 4, 132: 6, 133: 7, 134: 8, 135: 9, 136: 5, 137: 8, 138: 7, 139: 9, 140: 6,
  141: 5, 142: 8, 143: 7, 144: 8, 145: 6, 146: 5, 147: 9, 148: 8, 149: 9, 150: 7,
  151: 4, 152: 8, 153: 8, 154: 7, 155: 6, 156: 7, 157: 5, 158: 4, 159: 6, 160: 7,
  161: 8, 162: 7, 163: 6, 164: 7, 165: 9, 166: 5, 167: 7, 168: 8, 169: 6, 170: 8,
  171: 4, 172: 9, 173: 7, 174: 6, 175: 7, 176: 4, 177: 6, 178: 8, 179: 9, 180: 7,
  181: 9, 182: 8, 183: 7, 184: 8, 185: 6, 186: 7, 187: 9, 188: 8, 189: 7, 190: 6,
  191: 4, 192: 7, 193: 4, 194: 8, 195: 7, 196: 6, 197: 8, 198: 7, 199: 5, 200: 7,
  201: 6, 202: 8, 203: 7, 204: 6, 205: 8, 206: 5, 207: 7, 208: 6, 209: 8, 210: 7,
  211: 4, 212: 8, 213: 7, 214: 6, 215: 9, 216: 8, 217: 7, 218: 6, 219: 8, 220: 7,
  221: 8, 222: 7, 223: 6, 224: 8, 225: 7, 226: 9, 227: 8, 228: 7, 229: 6, 230: 5,
  231: 7, 232: 8, 233: 7, 234: 6, 235: 8, 236: 4, 237: 7, 238: 8, 239: 5, 240: 7,
  241: 5, 242: 4, 243: 7, 244: 8, 245: 6, 246: 8, 247: 7, 248: 6, 249: 8, 250: 7,
  251: 8, 252: 7, 253: 8, 254: 6, 255: 9, 256: 8, 257: 7, 258: 6, 259: 8, 260: 7,
  261: 8, 262: 7, 263: 6, 264: 8, 265: 7, 266: 9, 267: 8, 268: 7, 269: 4, 270: 8,
  271: 4, 272: 7, 273: 8, 274: 6, 275: 8, 276: 7, 277: 6, 278: 8, 279: 7, 280: 8,
  281: 7, 282: 6, 283: 8, 284: 7, 285: 9, 286: 8, 287: 7, 288: 6, 289: 8, 290: 7,
  291: 8, 292: 7, 293: 6, 294: 8, 295: 7, 296: 9, 297: 8, 298: 7, 299: 6, 300: 8
};

function cleanProse(str) {
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

function cleanQuestionStart(str) {
  if (!str) return '';
  return str.replace(/^[\"\'\\(\\[]?(\d{1,3}|[M©§a-zA-Z\.\-\*\#\s]{1,4})[\.\:\;\,\s\-]+\s*/i, '').trim();
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

function parseBlock(b) {
  const qNum = b.qNum;
  const offKey = String(officialKeys[String(qNum)] || 'A').trim();
  const isNumeric = !['A', 'B', 'C', 'D'].includes(offKey);
  const lines = b.rawLines;

  let startIdx = Q_START_LINE_OVERRIDE[qNum];
  if (startIdx === undefined || startIdx >= lines.length) {
    const numRegex = new RegExp(`^(?:[~*#_>|§©®M\\s()[\\]-]{0,3})?\\b${qNum}[\\.\\:\\;\\,\\s\\-\\)\\~*#]`, 'i');
    startIdx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (numRegex.test(lines[i].text.trim())) {
        startIdx = i;
        break;
      }
    }
  }

  // Find end of question/options (marks line)
  let marksIdx = lines.length - 1;
  while (marksIdx > startIdx && isMarksLine(lines[marksIdx].text)) {
    marksIdx--;
  }

  let questionText = '';
  let options = [];

  if (isNumeric) {
    const qLines = lines.slice(startIdx, marksIdx + 1).map(l => l.text);
    questionText = cleanQuestionStart(cleanProse(qLines.join(' ')));
    options = [];
  } else {
    // MCQ: options are at the bottom
    // Look for lines containing option markers
    let cdIdx = marksIdx;
    while (cdIdx > startIdx && !lines[cdIdx].text.trim()) cdIdx--;

    let abIdx = cdIdx - 1;
    while (abIdx > startIdx && !lines[abIdx].text.trim()) abIdx--;

    const cdLine = (cdIdx > startIdx) ? lines[cdIdx].text : '';
    const abLine = (abIdx > startIdx) ? lines[abIdx].text : '';

    // Split AB line
    let optA = 'Option A', optB = 'Option B';
    const bMatch = abLine.match(/(?:\s+|\b)(?:\(B\)|\[B\]|B[\.\:\)]|\bB®|®|\(8\)|18\)|\b8\))\s*/i);
    if (bMatch) {
      optA = abLine.substring(0, bMatch.index).replace(/^[(\[{]?(?:A|[13]|CP|OEY|€|4|W|Wg)[\.\:\)\}\]\s]*/i, '').trim();
      optB = abLine.substring(bMatch.index + bMatch[0].length).trim();
    } else {
      optA = abLine.replace(/^[(\[{]?(?:A|[13]|CP|OEY|€|4|W|Wg)[\.\:\)\}\]\s]*/i, '').trim();
    }

    // Split CD line
    let optC = 'Option C', optD = 'Option D';
    const dMatch = cdLine.match(/(?:\s+|\b)(?:\(D\)|\[D\]|D[\.\:\)]|\(0\)|\[0\]|\(O\)|\b0\)|0\)|©\))\s*/i);
    if (dMatch) {
      optC = cdLine.substring(0, dMatch.index).replace(/^[(\[{]?(?:C|©|\(©\)|¢|€)[\.\:\)\}\]\s]*/i, '').trim();
      optD = cdLine.substring(dMatch.index + dMatch[0].length).trim();
    } else {
      optC = cdLine.replace(/^[(\[{]?(?:C|©|\(©\)|¢|€)[\.\:\)\}\]\s]*/i, '').trim();
    }

    optA = cleanProse(optA) || 'Option A';
    optB = cleanProse(optB) || 'Option B';
    optC = cleanProse(optC) || 'Option C';
    optD = cleanProse(optD) || 'Option D';

    options = [optA, optB, optC, optD];

    const stmtEnd = (abIdx > startIdx) ? abIdx : cdIdx;
    const qLines = lines.slice(startIdx, stmtEnd).map(l => l.text);
    questionText = cleanQuestionStart(cleanProse(qLines.join(' ')));
  }

  // Strip diagram OCR noise following question
  const diagKw = questionText.match(/(?:as\s+shown\s+in(?:\s+the)?\s+(?:figure|diagram|circuit)|in\s+the\s+(?:figure|diagram|circuit|given\s+figure|adjacent\s+figure)|shown\s+in\s+(?:the\s+)?(?:figure|diagram|circuit)|given\s+in\s+(?:the\s+)?(?:figure|diagram)|shown\s+below|represented\s+by\s+the\s+(?:graph|figure|diagram)|plotted\s+as\s+a\s+function|variation\s+of\s+.*?(?:graph|curve)|circuit\s+diagram)/i);
  if (diagKw) {
    const kwEnd = diagKw.index + diagKw[0].length;
    const after = questionText.substring(kwEnd);
    const punc = after.match(/[\:\?\.]/);
    if (punc) {
      questionText = questionText.substring(0, kwEnd + punc.index + 1).trim();
    }
  }

  if (!questionText || questionText.length < 5) {
    questionText = `Electrostatics JEE Main Question #${qNum}`;
  }

  return { qNum, text: questionText, options };
}

// Generate Part 1 (1..100)
const part1 = {};
for (let q = 1; q <= 100; q++) {
  const parsed = parseBlock(blocks[q - 1]);
  part1[q] = { text: parsed.text, options: parsed.options };
}
fs.writeFileSync(path.resolve(__dirname, 'clean_electro_part1.mjs'), `export const ELECTRO_PART1_OVERRIDES = ${JSON.stringify(part1, null, 2)};\n`);
console.log('Saved clean_electro_part1.mjs');

// Generate Part 2 (101..200)
const part2 = {};
for (let q = 101; q <= 200; q++) {
  const parsed = parseBlock(blocks[q - 1]);
  part2[q] = { text: parsed.text, options: parsed.options };
}
fs.writeFileSync(path.resolve(__dirname, 'clean_electro_part2.mjs'), `export const ELECTRO_PART2_OVERRIDES = ${JSON.stringify(part2, null, 2)};\n`);
console.log('Saved clean_electro_part2.mjs');

// Generate Part 3 (201..300)
const part3 = {};
for (let q = 201; q <= 300; q++) {
  const parsed = parseBlock(blocks[q - 1]);
  part3[q] = { text: parsed.text, options: parsed.options };
}
fs.writeFileSync(path.resolve(__dirname, 'clean_electro_part3.mjs'), `export const ELECTRO_PART3_OVERRIDES = ${JSON.stringify(part3, null, 2)};\n`);
console.log('Saved clean_electro_part3.mjs');
