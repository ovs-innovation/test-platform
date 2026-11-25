import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// 1. Gather all 300 answers strictly
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

console.log(`Found ${answers.length} answer anchors.`);

// Build blocks
const qBlocks = [];
for (let i = 0; i < answers.length; i++) {
  const qNum = i + 1;
  const ans = answers[i];
  const prevAns = i > 0 ? answers[i - 1] : null;

  // Let's find lines between prevAns and ans
  let lines = [];
  if (!prevAns) {
    // Q1: from start of Page 1 up to ans.lIdx
    const p1Lines = cache['1'].split('\n');
    lines = p1Lines.slice(0, ans.lIdx).map((text, idx) => ({ p: 1, lIdx: idx, text }));
  } else if (prevAns.p === ans.p) {
    // Same page: lines between prevAns.lIdx and ans.lIdx
    const pLines = cache[String(ans.p)].split('\n');
    lines = pLines.slice(prevAns.lIdx + 1, ans.lIdx).map((text, idx) => ({ p: ans.p, lIdx: prevAns.lIdx + 1 + idx, text }));
  } else {
    // Spans across pages: from prevAns.lIdx + 1 on prevAns.p through to ans.lIdx on ans.p
    for (let p = prevAns.p; p <= ans.p; p++) {
      const pLines = (cache[String(p)] || '').split('\n');
      const startIdx = (p === prevAns.p) ? prevAns.lIdx + 1 : 0;
      const endIdx = (p === ans.p) ? ans.lIdx : pLines.length;
      for (let l = startIdx; l < endIdx; l++) {
        lines.push({ p, lIdx: l, text: pLines[l] });
      }
    }
  }

  qBlocks.push({
    qNum,
    ans,
    prevAns,
    rawLines: lines
  });
}

console.log(`Compiled ${qBlocks.length} raw question blocks.`);
fs.writeFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), JSON.stringify(qBlocks, null, 2));
