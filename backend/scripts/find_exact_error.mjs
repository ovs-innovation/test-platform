import fs from 'fs';
import vm from 'vm';

const content = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs', 'utf8');
const lines = content.split('\n');

for (let k = 5; k < lines.length; k++) {
  const code = lines.slice(3, k).join('\n') + '\n];';
  try {
    new vm.Script('const part2Questions = ' + code);
  } catch (err) {
    if (!err.message.includes('Unexpected') && !err.message.includes('missing')) {
      console.log(`Failed at k=${k} (line ${k}): ${err.message}`);
      console.log('Offending line:', lines[k - 1]);
      break;
    }
  }
}

