import fs from 'fs';

const base = JSON.parse(fs.readFileSync('backend/scripts/gravitation_base_records.json', 'utf8'));

console.log('Total base records:', base.length);
let validPages = 0;
const pageDistribution = {};

for (const b of base) {
  if (b.page >= 1 && b.page <= 144) {
    validPages++;
    pageDistribution[b.page] = (pageDistribution[b.page] || 0) + 1;
  }
}

console.log(`Valid pages: ${validPages} / 228`);
console.log('Sample mapping:');
for (let i = 0; i < 20; i++) {
  console.log(`Q${base[i].qNum} -> Page ${base[i].page}, Official Key: ${base[i].official_key}`);
}
console.log('Last 10 mapping:');
for (let i = base.length - 10; i < base.length; i++) {
  console.log(`Q${base[i].qNum} -> Page ${base[i].page}, Official Key: ${base[i].official_key}`);
}
