import fs from 'fs';
import vm from 'vm';

const content = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs', 'utf8');
const lines = content.split('\n');

for (let k = 5; k < lines.length; k++) {
  // Try closing an object and array
  const code = lines.slice(3, k).join('\n') + '\n}]};';
  try {
    new vm.Script(code);
  } catch (err) {
    if (err.message.includes('Invalid or unexpected token')) {
      console.log(`Failed at line ${k}: ${err.message}`);
      console.log('Line content:', lines[k - 1]);
      break;
    }
  }
}

