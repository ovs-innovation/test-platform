import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_official_keys.json'), 'utf8'));

// Find all question units by locating "[4 marks..." and "ANSWER: ..."
const units = [];

for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

  // Find all occurrences of "ANSWER: "
  const ansIndices = [];
  for (let l = 0; l < lines.length; l++) {
    if (lines[l].trim().startsWith('ANSWER:')) {
      ansIndices.push(l);
    }
  }

  // For each ANSWER line on this page:
  for (let k = 0; k < ansIndices.length; k++) {
    const ansLineIdx = ansIndices[k];
    const ansLine = lines[ansLineIdx].trim();
    const ansVal = ansLine.replace(/^ANSWER:\s*/, '').trim();

    // Look backwards for marks line
    let marksLineIdx = -1;
    for (let l = ansLineIdx - 1; l >= Math.max(0, ansLineIdx - 12); l--) {
      if (lines[l].includes('marks') && (lines[l].includes('wrong') || lines[l].includes('negative') || lines[l].includes('Shift') || lines[l].includes('Offline'))) {
        marksLineIdx = l;
        break;
      }
    }

    // Question start is either previous answer's solution end or top of page
    const qStartIdx = (k === 0) ? 0 : ansIndices[k - 1] + 1;
    // But within qStartIdx..marksLineIdx, find the question text and header
    const qLines = lines.slice(qStartIdx, marksLineIdx !== -1 ? marksLineIdx : ansLineIdx);
    
    // Solution lines go from ansLineIdx + 1 until next question or end of page
    const nextQBoundary = (k + 1 < ansIndices.length) ? ansIndices[k + 1] - 8 : lines.length;
    const solLines = lines.slice(ansLineIdx + 1, Math.max(ansLineIdx + 1, nextQBoundary));

    units.push({
      page: p,
      ansVal,
      marksLine: marksLineIdx !== -1 ? lines[marksLineIdx].trim() : '',
      qText: qLines.map(l => l.trim()).filter(Boolean).join('\n'),
      solText: solLines.map(l => l.trim()).filter(Boolean).join('\n')
    });
  }
}

console.log(`Extracted ${units.length} total question units from all 144 pages.`);
for (let i = 0; i < units.length; i++) {
  const expectedKey = officialKeys[i + 1];
  const u = units[i];
  if (i < 10 || i > units.length - 10) {
    console.log(`Q#${i + 1} (Page ${u.page}): UnitAns="${u.ansVal}", OfficialKey="${expectedKey}" -> Match: ${u.ansVal.toUpperCase().startsWith(String(expectedKey).toUpperCase())}`);
  }
}
