import fs from 'fs';
const key = JSON.parse(fs.readFileSync('backend/scripts/fluids_official_key.json', 'utf8'));
const numericals = Object.entries(key).filter(([q, ans]) => typeof ans === 'number' || (!['A','B','C','D'].includes(String(ans).trim())));
console.log('Total numericals:', numericals.length);
console.log('Numericals:', numericals.map(([q, a]) => `Q${q}: ${a}`).join(', '));
