import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

function isMetaLine(l) {
  const s = l.trim();
  if (!s) return true;
  if (/^[-—\=\_\.\s\~]{3,}$/.test(s)) return true;
  if (/[ER|Trp|TET|Rw]\s*[-—\=]/i.test(s)) return true;
  if (/(?:marks|mars|mks|marking|Shift|Offline|wrong|wong|wang|wiong)/i.test(s) && (s.includes('marks') || s.includes('mars') || s.includes('mks') || s.includes('200') || s.includes('201') || s.includes('202') || s.includes('Shift') || s.includes('Jan') || s.includes('Apr') || s.includes('Feb') || s.includes('Jul') || s.includes('Aug') || s.includes('Sep'))) return true;
  return false;
}

function stripLeftMarker(str, key) {
  let s = str.trim();
  s = s.replace(/^[\[\(\{]?(?:[AC]|[13]|CP|Wg|OEY|€|©|¢)[\.\:\)\}\]\s]\s*/i, '');
  return s.trim();
}

function splitLineOptions(line, leftKey, rightKey) {
  let s = line.trim();
  s = stripLeftMarker(s, leftKey);
  
  let seps = [];
  if (rightKey === 'B') {
    seps = [
      /\s+(?:\(B\)|\[B\]|\bB\b[\.\:\)]|\bB®|®\)?|\(8\)|18\)|\b8\))\s*/i,
      /\s+(?:©\)|®)\s*/,
      /\s{3,}/
    ];
  } else if (rightKey === 'D') {
    seps = [
      /\s+(?:\(D\)|\[D\]|\bD\b[\.\:\)]|\(0\)|\[0\]|\(O\)|\b0\)|0\))\s*/i,
      /\s+(?:©\)|©|\(©\))\s*/,
      /\s{3,}/
    ];
  }

  for (const sep of seps) {
    const parts = s.split(sep);
    if (parts.length >= 2) {
      const left = parts[0].trim();
      const right = parts.slice(1).join(' ').trim();
      if (left.length > 0 && right.length > 0) {
        return [left, right];
      }
    }
  }

  return null;
}

const answers = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    if (/^.*answ[a-z]{0,3}\s*:/i.test(l.trim())) {
      if (p === 169 && l.includes('20')) return;
      if (p === 170 && l.includes('10%')) return;
      answers.push({ p, lIdx: idx, text: l.trim() });
    }
  });
}

let mcqSuccess = 0;
let mcqTotal = 0;
const failedQ = [];

for (let i = 0; i < answers.length; i++) {
  const qNum = i + 1;
  const offKey = officialKeys[qNum];
  const isNum = !['A', 'B', 'C', 'D'].includes(offKey);
  if (isNum) continue;
  mcqTotal++;

  const ans = answers[i];
  const pLines = (cache[String(ans.p)] || '').split('\n');
  const minLine = (i > 0 && answers[i - 1].p === ans.p) ? answers[i - 1].lIdx + 1 : 0;
  
  // Find question start
  let qStartLine = minLine;
  for (let l = minLine; l < ans.lIdx; l++) {
    const t = pLines[l].trim();
    if (!t) continue;
    if (t.includes('AcadXL') || t.includes('PREVIOUS YEAR') || t.includes('300 previous') || t.includes('Maximum marks:')) continue;
    const reg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${qNum}[\\.\\:\\;\\,\\s\\-\\)\\~*#]`, 'i');
    if (reg.test(t)) {
      qStartLine = l;
      break;
    }
  }

  let cLines = [];
  for (let l = ans.lIdx - 1; l > qStartLine; l--) {
    if (!isMetaLine(pLines[l])) {
      cLines.unshift({ idx: l, text: pLines[l].trim() });
    }
  }

  let found = false;
  if (cLines.length >= 2) {
    const abLine = cLines[cLines.length - 2].text;
    const cdLine = cLines[cLines.length - 1].text;
    const abRes = splitLineOptions(abLine, 'A', 'B');
    const cdRes = splitLineOptions(cdLine, 'C', 'D');
    if (abRes && cdRes) {
      found = true;
      mcqSuccess++;
    }
  }

  if (!found) {
    failedQ.push({ qNum, p: ans.p, cLines: cLines.map(c => c.text) });
  }
}

console.log(`2-line option split success: ${mcqSuccess} / ${mcqTotal}`);
console.log(`Sample failed Qs (${failedQ.length} total):`);
failedQ.slice(0, 10).forEach(f => {
  console.log(`Q${f.qNum} (P${f.p}):`, f.cLines);
});
