import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

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

function cleanMarkerA(s) {
  return s.replace(/^[\[\(\{]?(?:A|[13]|CP|OEY|€|4|W|Wg|W_|ARE|Pe)[\.\:\)\}\]\s]\s*/i, '').replace(/^[\[\(]/, '').trim();
}
function cleanMarkerC(s) {
  return s.replace(/^[\[\(\{]?(?:C|©|\(©\)|¢|€)[\.\:\)\}\]\s]\s*/i, '').replace(/^[\[\(]/, '').trim();
}

const sepB = /(?:\s+|\b)(?:\(B\)|\[B\]|B[\.\:\)]|\bB®|®|©\)|18\)|\(8\)|\b8\))\s*/i;
const sepD = /(?:\s+|\b)(?:\(D\)|\[D\]|D[\.\:\)]|\(0\)|\[0\]|\(O\)|\b0\)|0\)|©\)|©)\s*/i;

function tryExtractOptions(lines, marksIdx) {
  // Strategy 1: Multi-line string match
  for (let w = 2; w <= 5; w++) {
    const startL = Math.max(0, marksIdx - w + 1);
    const combined = lines.slice(startL, marksIdx + 1).map(l => l.text).join(' ');
    const s = combined.replace(/\s+/g, ' ').trim();
    const m = s.match(/(?:^|[\s\(\[])(?:A|1|CP|W|Wg|\[A\])[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:B|8|®|B®|\[B\])[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:C|©|¢|€|\[C\])[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:D|0|\(0\)|\[0\]|\[D\]|©\))[\.\:\)\}\]\s]\s*(.*)$/i);
    if (m) {
      const a = cleanProse(m[1].trim());
      const b = cleanProse(m[2].trim());
      const c = cleanProse(m[3].trim());
      const d = cleanProse(m[4].trim());
      if (a && b && c && d) return [a, b, c, d];
    }
  }

  // Strategy 2: 2-line split (line1 has A and B, line2 has C and D)
  let cdIdx = marksIdx;
  while (cdIdx > 0 && !lines[cdIdx].text.trim()) cdIdx--;
  let abIdx = cdIdx - 1;
  while (abIdx > 0 && !lines[abIdx].text.trim()) abIdx--;

  if (abIdx >= 0 && cdIdx > abIdx) {
    const l1 = lines[abIdx].text;
    const l2 = lines[cdIdx].text;
    const mB = l1.match(sepB);
    const mD = l2.match(sepD);
    if (mB && mD) {
      const a = cleanProse(cleanMarkerA(l1.substring(0, mB.index)));
      const b = cleanProse(l1.substring(mB.index + mB[0].length));
      const c = cleanProse(cleanMarkerC(l2.substring(0, mD.index)));
      const d = cleanProse(l2.substring(mD.index + mD[0].length));
      if (a && b && c && d) return [a, b, c, d];
    }
  }

  return null;
}

function testRange(startQ, endQ) {
  let success = 0, num = 0, fail = [];
  for (let q = startQ; q <= endQ; q++) {
    const b = blocks[q - 1];
    const offKey = officialKeys[String(q)];
    const isNum = !['A', 'B', 'C', 'D'].includes(offKey);
    if (isNum) {
      num++;
      continue;
    }
    const lines = b.rawLines;
    let marksIdx = lines.length - 1;
    while (marksIdx > 0 && isMarksLine(lines[marksIdx].text)) marksIdx--;

    const opts = tryExtractOptions(lines, marksIdx);
    if (opts) {
      success++;
    } else {
      fail.push(q);
    }
  }
  const totalMCQ = (endQ - startQ + 1) - num;
  console.log(`Range Q${startQ}..Q${endQ}: ${success} / ${totalMCQ} MCQs auto-parsed (${num} numericals). Failed: ${fail.length}`);
  return fail;
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

const f2 = testRange(101, 200);
console.log('Part 2 Failed Qs:', f2);
const f3 = testRange(201, 300);
console.log('Part 3 Failed Qs:', f3);
