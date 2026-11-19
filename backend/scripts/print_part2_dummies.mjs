import fs from 'fs';
const text = fs.readFileSync('backend/scripts/part2_inspection.txt', 'utf8');
const blocks = text.split('=== Q').filter(Boolean);

const dummyQNums = [41, 42, 43, 44, 49, 51, 53, 54, 56, 57, 58, 59, 60, 61, 64, 66, 67, 68, 70, 71, 72, 73, 76, 79];

for (const b of blocks) {
  const qNum = parseInt(b.slice(0, 5));
  if (dummyQNums.includes(qNum)) {
    console.log(`==================== Q${qNum} ====================`);
    console.log(b.trim());
  }
}
