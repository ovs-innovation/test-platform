import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// We want to map each of 300 questions strictly forward from page 1 to 170
const questions = [];
let curP = 1;
let curLine = 0;

for (let q = 1; q <= 300; q++) {
  let found = null;

  // Patterns for question q
  const pats = [
    new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i'),
    new RegExp(`^${q}\\s+[A-Za-z]`, 'i')
  ];

  // Specific OCR misreads:
  const misreadMap = {
    1: /^1\s+[A-Za-z]/,
    6: /^©[\.\:\s]/,
    9: /^©[\.\:\s]/,
    11: /^M[\.\:\s]/,
    29: /^(Two identical charged spheres suspended|answeR)/i,
    50: /^50[\.\:\s]/,
    63: /^83[\.\:\s]/,
    66: /^86[\.\:\s]/,
    68: /^8[\.\:\s]/,
    69: /^89[\.\:\s]/,
    74: /^7a[\.\:\s]/,
    91: /^91[\.\:\s]/,
    106: /^106[\.\:\s]/,
    111: /^111[\.\:\s]/,
    112: /^112[\.\:\s]/,
    113: /^113[\.\:\s]/,
    115: /^115[\.\:\s]/,
    116: /^116[\.\:\s]/,
    117: /^117[\.\:\s]/,
    118: /^118[\.\:\s]/,
    119: /^119[\.\:\s]/,
    131: /^13[1lI|][\.\:\s]/,
    136: /^13[68b][\.\:\s]/,
    141: /^14[1lI|][\.\:\s]/,
    146: /^14[68b][\.\:\s]/,
    151: /^15[1lI|][\.\:\s]/,
    158: /^15[8B][\.\:\s]/,
    166: /^16[68b][\.\:\s]/,
    171: /^17[1lI|][\.\:\s]/,
    176: /^17[68b][\.\:\s]/,
    191: /^19[1lI|][\.\:\s]/,
    193: /^193[\.\:\s]/,
    199: /^199[\.\:\s]/,
    206: /^20[68b][\.\:\s]/,
    211: /^21[1lI|][\.\:\s]/,
    230: /^230[\.\:\s]/,
    236: /^23[68b][\.\:\s]/,
    239: /^239[\.\:\s]/,
    241: /^24[1lI|][\.\:\s]/,
    242: /^242[\.\:\s]/,
    269: /^269[\.\:\s]/,
    271: /^27[1lI|][\.\:\s]/
  };

  // Search starting from curP, curLine
  for (let p = curP; p <= Math.min(170, curP + 4); p++) {
    const text = cache[String(p)] || '';
    const lines = text.split('\n');
    const startL = (p === curP) ? curLine : 0;

    for (let l = startL; l < lines.length; l++) {
      const line = lines[l].trim();
      if (!line) continue;

      if (line.includes('AcadXL') || line.includes('PREVIOUS YEAR') || line.includes('300 previous') || line.includes('Maximum marks:')) continue;
      if (line.includes('marks') && (line.includes('wrong') || line.includes('negative'))) continue;
      if (/^.*answ[a-z]{0,3}\s*:/i.test(line)) continue;

      let isMatch = pats.some(pat => pat.test(line));
      if (!isMatch && misreadMap[q] && misreadMap[q].test(line)) {
        isMatch = true;
      }

      if (isMatch) {
        found = { q, page: p, lineIdx: l, line };
        curP = p;
        curLine = l + 1;
        break;
      }
    }
    if (found) break;
  }

  if (found) {
    questions.push(found);
  } else {
    // If not found, log where it looked
    questions.push({ q, page: curP, lineIdx: curLine, missing: true });
    // Advance curLine slightly or stay
  }
}

const foundCount = questions.filter(q => !q.missing).length;
console.log(`Monotonic forward search found: ${foundCount} / 300 questions.`);
const missing = questions.filter(q => q.missing).map(q => q.q);
if (missing.length > 0) {
  console.log(`Missing count: ${missing.length}`, missing);
}
