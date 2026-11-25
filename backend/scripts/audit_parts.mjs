import { ELECTRO_PART1_OVERRIDES } from './clean_electro_part1.mjs';
import { ELECTRO_PART2_OVERRIDES } from './clean_electro_part2.mjs';
import { ELECTRO_PART3_OVERRIDES } from './clean_electro_part3.mjs';
import fs from 'fs';

const keysData = JSON.parse(fs.readFileSync('./backend/scripts/electrostatics_official_keys.json', 'utf8'));
const officialKeys = keysData;

function auditPart(name, partOverrides, expectedStart, expectedEnd) {
  console.log(`\n=== Auditing ${name} (Q${expectedStart}-Q${expectedEnd}) ===`);
  const keys = Object.keys(partOverrides).map(Number).sort((a,b)=>a-b);
  console.log(`Total questions in ${name}:`, keys.length);
  let badMCQ = 0;
  let numericalCount = 0;
  let dummyCount = 0;
  const badList = [];

  for (let qNum = expectedStart; qNum <= expectedEnd; qNum++) {
    const q = partOverrides[qNum];
    if (!q) {
      console.log(`Missing Q${qNum}!`);
      badList.push(qNum);
      continue;
    }
    const official = officialKeys[String(qNum)];
    const isNum = !['A', 'B', 'C', 'D'].includes(official);
    if (isNum) {
      numericalCount++;
      if (q.options && q.options.length > 0) {
        console.log(`Q${qNum} numerical has non-empty options:`, q.options);
        badList.push(qNum);
      }
    } else {
      if (!q.options || q.options.length !== 4) {
        badMCQ++;
        badList.push(qNum);
        console.log(`Q${qNum} has ${q.options ? q.options.length : 0} options`);
      } else {
        const dummy = q.options.filter(o => /^(?:\(?([A-D])\)?|Option [A-D])$/i.test(o.trim()));
        if (dummy.length > 0) {
          badMCQ++;
          dummyCount++;
          badList.push(qNum);
          console.log(`Q${qNum} has dummy options:`, dummy);
        }
      }
    }
  }

  console.log(`Numericals count: ${numericalCount}`);
  console.log(`Bad MCQs count: ${badMCQ} (Dummy options: ${dummyCount})`);
  console.log(`Bad question numbers:`, badList);
}

auditPart('Part 1', ELECTRO_PART1_OVERRIDES, 1, 100);
auditPart('Part 2', ELECTRO_PART2_OVERRIDES, 101, 200);
auditPart('Part 3', ELECTRO_PART3_OVERRIDES, 201, 300);
