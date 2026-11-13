import fs from 'fs';

const content = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs', 'utf8');
const body = content.replace(/import\s+fs[^\n]*\n/, '').replace(/const\s+urls[^\n]*\n/, '').replace(/export\s+const\s+part2Questions\s*=\s*/, 'const part2Questions = ');

const lines = body.split('\n');
for (let i = 0; i < 35; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}

