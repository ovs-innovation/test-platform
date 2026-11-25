import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_dummy_qs_raw.json'), 'utf8'));

// Regex to normalize common Tesseract mangling of (A), (B), (C), (D)
function normalizeOptionsText(text) {
  let cleaned = text
    .replace(/\[4 marks.*?\][^\n]*/gi, '')
    .replace(/\[JEE Main.*?\][^\n]*/gi, '')
    .replace(/-\s*\d{4}\s*\{(?:Online|Offline)[^}]*\}/gi, '');

  // Look for patterns like (A) ... (B) ... (C) ... (D)
  // or ®) / (8) for B, (©) for C, (0) for D
  // Replace symbols
  cleaned = cleaned
    .replace(/(?:(?<=\s)|^)®\)/g, '(B)')
    .replace(/(?:(?<=\s)|^\()8\)/g, '(B)')
    .replace(/(?:(?<=\s)|^\()©\)/g, '(C)')
    .replace(/(?:(?<=\s)|^\()0\)/g, '(D)')
    .replace(/(?:(?<=\s)|^)©\)/g, '(C)');

  return cleaned;
}

let autoResolved = 0;
const unresolved = [];

for (const [qNum, qObj] of Object.entries(data)) {
  const norm = normalizeOptionsText(qObj.rawQuestion || '');
  
  // Try to find indices of (A), (B), (C), (D)
  const aIdx = norm.indexOf('(A)');
  const bIdx = norm.indexOf('(B)', aIdx > -1 ? aIdx + 3 : 0);
  const cIdx = norm.indexOf('(C)', bIdx > -1 ? bIdx + 3 : 0);
  const dIdx = norm.indexOf('(D)', cIdx > -1 ? cIdx + 3 : 0);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1 && aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
    const qText = norm.substring(0, aIdx).trim();
    const optA = norm.substring(aIdx + 3, bIdx).trim().replace(/^\.?\s*/, '');
    const optB = norm.substring(bIdx + 3, cIdx).trim().replace(/^\.?\s*/, '');
    const optC = norm.substring(cIdx + 3, dIdx).trim().replace(/^\.?\s*/, '');
    const optD = norm.substring(dIdx + 3).trim().replace(/^\.?\s*/, '');

    // Check if options are non-empty and reasonably sized
    if (optA && optB && optC && optD && optA.length < 300 && optB.length < 300 && optC.length < 300 && optD.length < 300) {
      autoResolved++;
      continue;
    }
  }

  unresolved.push(Number(qNum));
}

console.log(`Auto-resolved with normalization: ${autoResolved} / ${Object.keys(data).length}`);
console.log(`Remaining unresolved (${unresolved.length}):`, unresolved);
