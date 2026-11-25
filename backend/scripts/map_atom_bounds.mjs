import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));

// Build list of all lines with (page, lineIdx)
const lines = [];
for (let p = 1; p <= 151; p++) {
  const pLines = (cache[String(p)] || '').split('\n');
  for (let l = 0; l < pLines.length; l++) {
    lines.push({
      page: p,
      lIdx: l,
      text: pLines[l]
    });
  }
}

// Function to find question start line
function findQuestionIndex(qNum, startFrom) {
  for (let i = startFrom; i < lines.length; i++) {
    const t = lines[i].text.trim();
    if (qNum === 11 && /1\.\s+Of the following sets/i.test(t)) return i;
    if (qNum === 31 && /3%\s+In an atom/i.test(t)) return i;
    if (qNum === 45 && /^45\./.test(t)) return i;
    if (qNum === 51 && /5%\s+if the shortest/i.test(t)) return i;
    if (qNum === 71 && lines[i].page === 38 && (lines[i].lIdx === 0 || /radial node|ANSWER:\s*C/i.test(t))) return i;
    if (qNum === 75 && /^75\./.test(t)) return i;
    if (qNum === 81 && /^8\s+The number of subshells/i.test(t)) return i;
    if (qNum === 91 && /^oa\.\s+Electromagnetic radiation/i.test(t)) return i;
    if (qNum === 110 && /^10\.\s+The number of photons/i.test(t)) return i;
    if (qNum === 111 && /^m\.\s+Ge/i.test(t)) return i;
    if (qNum === 112 && /^M2\.\s+The value of magnetic/i.test(t)) return i;
    if (qNum === 113 && /^M3\.\s+A 50 watt/i.test(t)) return i;
    if (qNum === 114 && /^114\./.test(t)) return i;
    if (qNum === 115 && /^M5\.\s+The energy of one mole/i.test(t)) return i;
    if (qNum === 116 && /^ne\.\s+The pair/i.test(t)) return i;
    if (qNum === 117 && /^M7\.\s+The longest wavelength/i.test(t)) return i;
    if (qNum === 118 && /^118\./.test(t)) return i;
    if (qNum === 119 && /^M9\.\s+if the radius/i.test(t)) return i;
    if (qNum === 120 && /^120\./.test(t)) return i;
    if (qNum === 121 && /^121\./.test(t)) return i;
    if (qNum === 122 && /^\$22\s+Consider the following set/i.test(t)) return i;
    if (qNum === 125 && /^125\./.test(t)) return i;
    if (qNum === 131 && /^13%\s+Consider an imaginary/i.test(t)) return i;
    if (qNum === 172 && /^172\./.test(t)) return i;
    if (qNum === 182 && /^182[;\.]\s+In an atom/i.test(t)) return i;
    if (qNum === 189 && lines[i].page === 113 && (/List\s*-\s*I/i.test(t) || /Choose the correct/i.test(t))) return i;
    if (qNum === 208 && /^208\./.test(t)) return i;
    if (qNum === 223 && lines[i].page === 137 && (lines[i].lIdx === 0 || /electron probability/i.test(t))) return i;
    if (qNum === 236 && /238\.\s+The Bohr radius/i.test(t)) return i;
    if (qNum === 237 && /^237\.\s+Consider two radiations/i.test(t)) return i;

    // Standard pattern
    if (new RegExp(`^${qNum}\\.\\s+`).test(t)) {
      return i;
    }
  }
  return -1;
}

const bounds = [];
let currIdx = 0;
for (let q = 1; q <= 237; q++) {
  const start = findQuestionIndex(q, currIdx);
  if (start === -1) {
    console.error(`Failed to find start of Q${q}`);
    break;
  }
  bounds.push({ qNum: q, startLine: start });
  currIdx = start + 1;
}

console.log(`Found starts for ${bounds.length} / 237 questions.`);
for (let i = 0; i < bounds.length; i++) {
  const nextStart = (i < bounds.length - 1) ? bounds[i + 1].startLine : lines.length;
  bounds[i].endLine = nextStart;
}

fs.writeFileSync(path.resolve(__dirname, 'atom_question_bounds.json'), JSON.stringify(bounds, null, 2));
console.log('Saved atom_question_bounds.json');
