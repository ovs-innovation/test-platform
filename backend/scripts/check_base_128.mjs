import fs from 'fs';
const base = JSON.parse(fs.readFileSync('backend/scripts/gravitation_base_records.json', 'utf8'));
for (const b of base) {
  if (b.page >= 127 && b.page <= 130) {
    console.log(`Q${b.qNum}: page ${b.page}, official_key ${b.official_key}`);
  }
}
