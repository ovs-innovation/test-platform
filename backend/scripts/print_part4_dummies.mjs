import fs from 'fs';
const text = fs.readFileSync('backend/scripts/part4_inspection.txt', 'utf8');
const blocks = text.split('=== Q').filter(Boolean);

const dummyQNums = [121, 123, 124, 126, 129, 131, 136, 138, 139, 141, 145, 149, 153, 157];

for (const b of blocks) {
  const qNum = parseInt(b.slice(0, 5));
  if (dummyQNums.includes(qNum)) {
    console.log(`==================== Q${qNum} ====================`);
    console.log(b.trim());
  }
}
