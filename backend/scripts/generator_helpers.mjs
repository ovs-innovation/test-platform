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
    .replace(/\s+/g, ' ')
    .trim();
}

function isMarksLine(s) {
  const l = s.trim();
  if (!l) return true;
  if (/(?:marks|mars|mark|wong|wrong|wang|marking|Shift|Offline|\b20\d\d\b)/i.test(l)) return true;
  if (/^[-—\=\_\.\s\~\[\]\{\}\(\)]{3,}$/.test(l)) return true;
  if (/(?:\[|\b)?(?:ER|Trp|TET|Rw|Pr|T—)\s*[-—\=]/i.test(l)) return true;
  return false;
}

// Map of manually verified question start line offsets for questions where OCR was noisy
const Q_START_LINE_OVERRIDE = {
  6: 3,
  9: 9,
  11: 11,
  63: 20,
  66: 6,
  68: 6,
  69: 6,
  74: 7,
  91: 16,
  98: 6,
  99: 5,
  100: 6,
  101: 5,
  102: 6,
  103: 6,
  106: 4,
  110: 5,
  111: 4,
  112: 4,
  113: 4,
  115: 5,
  116: 4,
  117: 6,
  118: 5,
  119: 5,
  131: 4,
  136: 5,
  141: 5,
  146: 5,
  151: 4,
  157: 5,
  158: 4,
  166: 5,
  171: 4,
  176: 4,
  191: 4,
  193: 4,
  199: 5,
  206: 5,
  211: 4,
  230: 5,
  236: 4,
  239: 5,
  241: 5,
  242: 4,
  269: 4,
  271: 4
};

function getQStartLine(b) {
  const qNum = b.qNum;
  if (Q_START_LINE_OVERRIDE[qNum] !== undefined && Q_START_LINE_OVERRIDE[qNum] < b.rawLines.length) {
    return Q_START_LINE_OVERRIDE[qNum];
  }

  const lines = b.rawLines;
  const numRegex = new RegExp(`^(?:[~*#_>|§©®M\\s()[\\]-]{0,3})?\\b${qNum}[\\.\\:\\;\\,\\s\\-\\)\\~*#]`, 'i');
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].text.trim();
    if (t.includes('AcadXL') || t.includes('PREVIOUS YEAR') || t.includes('300 previous') || t.includes('Maximum marks:')) continue;
    if (numRegex.test(t)) {
      return i;
    }
  }

  // Fallback: check for question starter words
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].text.trim();
    if (t.includes('AcadXL') || t.includes('PREVIOUS YEAR') || t.includes('300 previous') || t.includes('Maximum marks:')) continue;
    if (/^(?:[0-9M©§®A-Za-z]{1,4}[\.\:\-\)]\s*)*(?:A|An|The|If|Two|Three|Four|Five|Six|Consider|On|In|Charges?|What|Find|Assume|Which|Let|When|Acharged)\b/i.test(t)) {
      if (!/^(?:According to|Apply (?:the )?condition|By (?:the )?principle|By Gauss|Since|We know that|Therefore|Here W|From the formula)\b/i.test(t)) {
        return i;
      }
    }
  }

  return 0;
}

console.log('Script helper loaded.');
