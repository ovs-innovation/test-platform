import fs from 'fs';

const content = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs', 'utf8');
const body = content.replace(/import\s+fs[^\n]*\n/, '').replace(/const\s+urls[^\n]*\n/, '').replace(/export\s+const\s+part2Questions\s*=\s*/, 'const part2Questions = ');

const lines = body.split('\n');
console.log('Body line 22:', JSON.stringify(lines[21]));
console.log('Body line 21:', JSON.stringify(lines[20]));
console.log('Body line 23:', JSON.stringify(lines[22]));

