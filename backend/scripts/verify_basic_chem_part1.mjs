import { BASIC_CHEM_PART1 } from './clean_basic_chem_part1.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_official_keys.json'), 'utf8'));

console.log('=== VERIFYING PART 1 ===');
console.log(`Total questions: ${BASIC_CHEM_PART1.length}`);

let errs = 0;
BASIC_CHEM_PART1.forEach((q, idx) => {
  const expectedQNum = idx + 1;
  if (q.qNum !== expectedQNum) {
    console.error(`Mismatch in qNum: got ${q.qNum}, expected ${expectedQNum}`);
    errs++;
  }

  const expectedKey = officialKeys[q.qNum];
  const expectedOptIdx = expectedKey.charCodeAt(0) - 65;
  if (q.correct_option !== expectedOptIdx) {
    console.error(`Key mismatch on Q${q.qNum}: got ${q.correct_option} (${String.fromCharCode(65 + q.correct_option)}), expected ${expectedKey}`);
    errs++;
  }

  if (!q.options || q.options.length !== 4) {
    console.error(`Invalid options length on Q${q.qNum}:`, q.options);
    errs++;
  }

  q.options.forEach((opt, oIdx) => {
    if (!opt || typeof opt !== 'string' || opt.trim() === '' || /Option \([A-D]\)/i.test(opt)) {
      console.error(`Dummy or empty option on Q${q.qNum} opt ${oIdx}: "${opt}"`);
      errs++;
    }
  });
});

if (errs === 0) {
  console.log('PART 1 100% VERIFIED! 0 ERRORS!');
} else {
  console.error(`Part 1 had ${errs} errors.`);
}
