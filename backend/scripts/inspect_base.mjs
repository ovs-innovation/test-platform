import fs from 'fs';

const base = JSON.parse(fs.readFileSync('backend/scripts/gravitation_base_records.json', 'utf8'));
console.log('First 5 entries of base:');
for (let i = 0; i < 5; i++) {
  const item = base[i];
  console.log(`[Base ${i}] qNum: ${item.qNum}, page: ${item.page}, official_key: ${item.official_key}`);
  console.log('  Page text snippet:', (item.page_text || '').slice(0, 100).replace(/\n/g, ' '));
}
