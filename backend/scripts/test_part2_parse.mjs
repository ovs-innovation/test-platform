import fs from 'fs';
import vm from 'vm';

const content = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs', 'utf8');

// Strip "import fs..." and "export const part2Questions ="
const body = content.replace(/import\s+fs[^\n]*\n/, '').replace(/const\s+urls[^\n]*\n/, '').replace(/export\s+const\s+part2Questions\s*=\s*/, 'const part2Questions = ');

try {
  new vm.Script(body);
  console.log('Script is valid JS!');
} catch (err) {
  console.error('Script parse error:', err.message);
  console.error(err.stack);
}

