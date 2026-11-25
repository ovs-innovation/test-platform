import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawText = fs.readFileSync(path.resolve(__dirname, 'atom_full_linear_pages.txt'), 'utf8');

// Regex patterns to identify each question start 1..237
const START_PATTERNS = [
  null, // 0 index unused
];

for (let i = 1; i <= 237; i++) {
  if (i === 11) {
    START_PATTERNS.push(/(\n1\.\s+Of the following sets which one does NOT contain)/i);
  } else if (i === 31) {
    START_PATTERNS.push(/(\n3%\s+In an atom how many orbital)/i);
  } else if (i === 45) {
    START_PATTERNS.push(/(\n45\.\s*\n|\n45\.\s+At temperature)/i);
  } else if (i === 51) {
    START_PATTERNS.push(/(\n5%\s+if the shortest wavelength in Lyman)/i);
  } else if (i === 71) {
    START_PATTERNS.push(/(\n<<<PAGE_38>>>[\s\S]*?(?=\[4 marks))/i);
  } else if (i === 75) {
    START_PATTERNS.push(/(\n75\.\s*\n|\n75\.\s+The 75|75\.\s*)/i);
  } else if (i === 81) {
    START_PATTERNS.push(/(\n81\s+0\.81|\n81\.\s+|\n81\s+The energy of light)/i);
  } else if (i === 172) {
    START_PATTERNS.push(/(\n172\.\s*\n|\n172\.\s+Match)/i);
  } else if (i === 182) {
    START_PATTERNS.push(/(\n182[;\.]\s+In an atom, total number of electrons)/i);
  } else if (i === 208) {
    START_PATTERNS.push(/(\n208\.\s*\n|\n208\.\s+)/i);
  } else if (i === 236) {
    START_PATTERNS.push(/(\n238\.\s+The Bohr radius of a hydrogen like)/i);
  } else {
    START_PATTERNS.push(new RegExp(`(\\n${i}\\.\\s+)`));
  }
}

// Let's test finding the positions of each pattern
const positions = [];
let lastPos = 0;
for (let i = 1; i <= 237; i++) {
  const pat = START_PATTERNS[i];
  const slice = rawText.slice(lastPos);
  const m = slice.match(pat);
  if (m) {
    const absIdx = lastPos + m.index;
    positions.push({ qNum: i, index: absIdx, matched: m[0].slice(0, 40) });
    lastPos = absIdx + 5;
  } else {
    positions.push({ qNum: i, notFound: true });
  }
}

const missing = positions.filter(p => p.notFound);
console.log(`Found ${positions.length - missing.length} / 237 questions.`);
if (missing.length > 0) {
  console.log('Missing question numbers:', missing.map(m => m.qNum));
}
