import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_linear.txt'), 'utf8');
const lines = text.split('\n');
let curPage = 0;
const qPages = {};
for (let i = 0; i < lines.length; i++) {
  const pMatch = lines[i].match(/===\s*PAGE\s*(\d+)\s*===/i);
  if (pMatch) curPage = parseInt(pMatch[1], 10);
  const qMatch = lines[i].match(/^\s*(\d{1,3})\s*[\.\,\:\-]\s*(.*)$/);
  if (qMatch) {
    const qNum = parseInt(qMatch[1], 10);
    if (qNum >= 201 && qNum <= 300 && !qPages[qNum]) {
      qPages[qNum] = { page: curPage, lineIdx: i, header: qMatch[0] };
    }
  }
}
console.log('Found headers:', Object.keys(qPages).length);
const missing = [];
for (let q = 201; q <= 300; q++) {
  if (qPages[q]) {
    console.log('Q' + q + ' (P' + qPages[q].page + '): ' + qPages[q].header.slice(0, 80));
  } else {
    missing.push(q);
  }
}
console.log('Missing count:', missing.length, missing);
