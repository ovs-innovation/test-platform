import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/gravitation_raw_blocks_verified.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/gravitation_official_keys.json', 'utf8'));

for (let q = 181; q <= 228; q++) {
  console.log(`\n=================== Q${q} (Key: ${officialKeys[q]}) ===================`);
  console.log((blocks[q] || '').slice(0, 400));
}
