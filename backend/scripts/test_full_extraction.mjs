import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Common cleanups
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

function extract4Options(text) {
  let s = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  // Match standard option patterns
  const m = s.match(/(?:^|[\s\(\[])(?:A|1|CP|W|Wg|\[A\])[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:B|8|®|B®|\[B\])[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:C|©|¢|€|\[C\])[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:D|0|\(0\)|\[0\]|\[D\]|©\))[\.\:\)\}\]\s]\s*(.*)$/i);
  if (m) {
    const a = cleanProse(m[1].trim());
    const b = cleanProse(m[2].trim());
    const c = cleanProse(m[3].trim());
    const d = cleanProse(m[4].trim());
    if (a && b && c && d && a.length > 0 && b.length > 0 && c.length > 0 && d.length > 0) {
      return [a, b, c, d];
    }
  }
  return null;
}

let mcqSuccess = 0;
let numSuccess = 0;
const needsReview = [];

for (let q = 1; q <= 300; q++) {
  const b = blocks[q - 1];
  const offKey = officialKeys[String(q)];
  const isNum = !['A', 'B', 'C', 'D'].includes(offKey);

  if (isNum) {
    numSuccess++;
    continue;
  }

  const lines = b.rawLines;
  let marksIdx = lines.length - 1;
  while (marksIdx > 0 && isMarksLine(lines[marksIdx].text)) marksIdx--;

  let opts = null;
  // Try different line windows ending at marksIdx
  for (let windowSize = 2; windowSize <= 6; windowSize++) {
    const startL = Math.max(0, marksIdx - windowSize + 1);
    const combined = lines.slice(startL, marksIdx + 1).map(l => l.text).join(' ');
    opts = extract4Options(combined);
    if (opts) break;
  }

  if (opts) {
    mcqSuccess++;
  } else {
    needsReview.push({ q, marksIdx, lines: lines.slice(Math.max(0, marksIdx - 3), marksIdx + 1).map(l => l.text) });
  }
}

console.log(`Extraction Test across all 300:`);
console.log(`Numericals: ${numSuccess} / 57`);
console.log(`MCQs auto-extracted cleanly: ${mcqSuccess} / 243`);
console.log(`MCQs needing review/overrides: ${needsReview.length}`);
console.log(`Sample needing review:`, needsReview.slice(0, 10).map(r => ({ q: r.q, lines: r.lines })));
fs.writeFileSync(path.resolve(__dirname, 'mcqs_needing_review.json'), JSON.stringify(needsReview, null, 2));
