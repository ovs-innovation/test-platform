import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));

console.log('Total blocks:', blocks.length);

// Scan for diagram keywords in each block's lines
const diagCandidates = [];
for (const b of blocks) {
  const fullText = b.rawLines.map(l => l.text).join('\n');
  const m = fullText.match(/(?:shown in (?:the )?(?:figure|diagram)|given (?:in the )?(?:figure|diagram)|as in (?:the )?figure|circuit diagram|adjacent figure|following graph|represented by the (?:graph|figure))/i);
  if (m) {
    diagCandidates.push({ qNum: b.qNum, page: b.ans.p, match: m[0] });
  }
}

console.log(`Found ${diagCandidates.length} diagram candidates.`);
console.log('Sample diagram candidates:', diagCandidates.slice(0, 25));
fs.writeFileSync(path.resolve(__dirname, 'electro_diagram_candidates.json'), JSON.stringify(diagCandidates, null, 2));
