import fs from 'fs';
const f = fs.readFileSync('backend/scripts/sync_all_fluids_to_live.mjs', 'utf8');
console.log(f.slice(2500, 5000));
