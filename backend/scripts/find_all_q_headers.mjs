import fs from 'fs';

const rawParts = [
  { part: 1, file: 'backend/scripts/thermo_part1_raw.txt', expected: [1, 50] },
  { part: 2, file: 'backend/scripts/thermo_part2_raw.txt', expected: [51, 100] },
  { part: 3, file: 'backend/scripts/thermo_part3_raw.txt', expected: [101, 150] },
  { part: 4, file: 'backend/scripts/thermo_part4_raw.txt', expected: [151, 200] },
  { part: 5, file: 'backend/scripts/thermo_part5_raw.txt', expected: [201, 245] },
];

for (const p of rawParts) {
  const content = fs.readFileSync(p.file, 'utf8');
  console.log(`\n--- PART ${p.part} (${p.expected[0]} to ${p.expected[1]}) ---`);
  const found = new Set();
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Check various question header patterns
    const m = line.match(/^([0-9]{1,3})\.\s+(.*)/);
    if (m) {
      const qNum = parseInt(m[1]);
      if (qNum >= p.expected[0] && qNum <= p.expected[1]) {
        found.add(qNum);
      }
    }
    // Also check patterns like "M. " or "Q.11" or "11 "
    const mAlt = line.match(/^([A-Z0-9]{1,3})[\.\s]+(.*)/);
  });

  const missing = [];
  for (let q = p.expected[0]; q <= p.expected[1]; q++) {
    if (!found.has(q)) missing.push(q);
  }
  console.log(`Found: ${found.size} / ${p.expected[1] - p.expected[0] + 1}`);
  if (missing.length > 0) {
    console.log(`Missing headers directly matching '^Q.':`, missing);
  }
}
