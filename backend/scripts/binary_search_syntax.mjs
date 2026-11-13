import fs from 'fs';
import vm from 'vm';

const lines = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs', 'utf8').split('\n');

let low = 1;
let high = lines.length;
let failingLine = -1;

for (let i = 1; i <= lines.length; i++) {
  // Take lines 0 to i
  // We need valid syntax: replace export with const, and close brackets
  const chunk = lines.slice(0, i).join('\n');
  const code = chunk.replace(/export\s+const\s+part2Questions\s*=\s*/, 'const part2Questions = ');
  
  // Try closing brackets
  const attempts = [
    code,
    code + '\n];',
    code + '\n  }\n];',
    code + '\n    ]\n  }\n];',
    code + '\n      }\n    ]\n  }\n];',
    code + '\n    }\n  }\n];',
    code + '"\n    }\n  }\n];'
  ];

  let hasTokenError = false;
  for (const att of attempts) {
    try {
      new vm.Script(att);
      hasTokenError = false;
      break;
    } catch (e) {
      if (e.message.includes('Invalid or unexpected token')) {
        hasTokenError = true;
      }
    }
  }

  if (hasTokenError) {
    console.log(`First syntax error at line ${i}:`);
    console.log(lines[i - 1]);
    failingLine = i;
    break;
  }
}

if (failingLine === -1) {
  console.log('No Invalid or unexpected token found in partial chunks!');
}

