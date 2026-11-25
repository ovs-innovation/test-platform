import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_linear.txt'), 'utf8');
const lines = text.split('\n');
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Build page index
const pageStartLines = {};
let curPage = 0;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/===\s*PAGE\s*(\d+)\s*===/i);
  if (m) {
    curPage = parseInt(m[1], 10);
    pageStartLines[curPage] = i;
  }
}

// Map each question number 201..300 to its start line index in lines
// In Part 3, questions appear sequentially on pages 112 to 170
const qLocations = {};

// We can scan lines starting from page 112
const p112Start = pageStartLines[112] || 0;

for (let q = 201; q <= 300; q++) {
  // Regex to match question header
  // e.g. "201.", "201 ", "201:", "201-", or sometimes OCR misreads "211" as "2M" or "238:" or "249:"
  let foundIdx = -1;
  const regexes = [
    new RegExp(`^\\s*${q}\\s*[\\.\\:\\,\\-]\\s*`),
    new RegExp(`^\\s*${q}\\s+[A-Za-z]`),
    new RegExp(`^\\s*\\[?${q}\\]?\\s*[\\.\\:\\,\\-]\\s*`)
  ];

  // Special cases for OCR header typos
  if (q === 206) regexes.push(/^\s*208\.\s+The electric field due to a short electric dipole/);
  if (q === 211) regexes.push(/^\s*2M\.\s+Two charges of/);
  if (q === 220) regexes.push(/^\s*220\:\s+re distance between/);
  if (q === 230) regexes.push(/^\s*238\.\s+5 line charge of length/);
  if (q === 231) regexes.push(/^\s*0\s+For a short dipole placed at origin O/);
  if (q === 236) regexes.push(/A cube of side 2 m is placed.*(\n.*){1,10}/);
  if (q === 238) regexes.push(/^\s*238\:\s+five charges \+g/);
  if (q === 239) regexes.push(/^\s*247\.\s+particle of mass/);
  if (q === 241) regexes.push(/The electric field between two plates/);
  if (q === 242) regexes.push(/Inside uniformly charged spherical shell/);
  if (q === 246) regexes.push(/^\s*246\.\s*=/);
  if (q === 247) regexes.push(/^\s*247\.\s+particle of mass/);
  if (q === 249) regexes.push(/^\s*249\:\s+an electric dipole of dipole moment/);
  if (q === 257) regexes.push(/^\s*257\s+5 point charge/);
  if (q === 267) regexes.push(/^\s*267\:\s+5 dipole with two/);
  if (q === 269) regexes.push(/^\s*289\.\s+10 metal spheres/);
  if (q === 271) regexes.push(/An electric charge q is distributed uniformly/);
  if (q === 277) regexes.push(/^\s*277\:\s+Six point charges are kept/);

  // Search in lines
  for (let i = p112Start; i < lines.length; i++) {
    for (const r of regexes) {
      if (r.test(lines[i])) {
        // avoid matching page 171 answer key
        if (i > (pageStartLines[171] || 999999)) continue;
        foundIdx = i;
        break;
      }
    }
    if (foundIdx !== -1) break;
  }

  if (foundIdx !== -1) {
    qLocations[q] = foundIdx;
  } else {
    console.log(`Q${q} NOT found!`);
  }
}

console.log('Total found locations:', Object.keys(qLocations).length);
fs.writeFileSync(path.resolve(__dirname, 'p3_locations.json'), JSON.stringify(qLocations, null, 2));
