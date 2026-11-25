import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

const units = [];
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

  const ansIndices = [];
  for (let l = 0; l < lines.length; l++) {
    if (/answ[a-z]{0,3}\s*:/i.test(lines[l].trim())) {
      ansIndices.push(l);
    }
  }

  for (let k = 0; k < ansIndices.length; k++) {
    const ansLineIdx = ansIndices[k];
    const qStartIdx = (k === 0) ? 0 : ansIndices[k - 1] + 1;
    
    let marksLineIdx = -1;
    for (let l = ansLineIdx - 1; l >= qStartIdx; l--) {
      if (lines[l].includes('marks') || lines[l].includes('Shift') || lines[l].includes('Offline') || lines[l].includes('Jan') || lines[l].includes('Apr')) {
        marksLineIdx = l;
        break;
      }
    }

    const qLines = lines.slice(qStartIdx, marksLineIdx !== -1 ? marksLineIdx : ansLineIdx).map(l => l.trim()).filter(Boolean);
    const ansLine = lines[ansLineIdx].trim();
    const ansVal = ansLine.replace(/^.*answ[a-z]{0,3}\s*:\s*/i, '').trim();

    // Check if qLines has a question number
    let detectedQ = null;
    for (const ql of qLines) {
      const m = ql.match(/^(\d{1,3})[\.\s\:\-]/);
      if (m) {
        detectedQ = parseInt(m[1], 10);
        break;
      }
    }

    units.push({
      page: p,
      detectedQ,
      ansVal,
      preview: qLines[0] || ''
    });
  }
}

for (let i = 0; i < units.length; i++) {
  const u = units[i];
  if (!u.detectedQ) {
    console.log(`Unit ${i} (p${u.page}): NO DETECTED Q! preview: "${u.preview.substring(0, 50)}", ansVal: "${u.ansVal}"`);
  }
}
