import fs from 'fs';
const text = fs.readFileSync('backend/scripts/part3_inspection.txt', 'utf8');
const blocks = text.split('=== Q').filter(Boolean);

const dummyQNums = [84, 86, 87, 90, 91, 92, 94, 95, 96, 97, 98, 103, 104, 105, 107, 111, 112, 114, 115, 116, 117, 118, 120];

for (const b of blocks) {
  const qNum = parseInt(b.slice(0, 5));
  if (dummyQNums.includes(qNum)) {
    console.log(`==================== Q${qNum} ====================`);
    console.log(b.trim());
  }
}
