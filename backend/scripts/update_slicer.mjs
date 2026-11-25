import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slicerPath = path.resolve(__dirname, 'slice_all_221_blocks.mjs');
let content = fs.readFileSync(slicerPath, 'utf8');

content = content.replace(
  '(q === 178 && /^78\\.\\s*When 800/i.test(line))',
  '(q === 178 && /^78\\.\\s*Combustion of glucose/i.test(line))'
);
content = content.replace(
  '(q === 154 && /^54\\.\\s*A sample of a metal/i.test(line))',
  '(q === 154 && /^"?54\\.\\s*The volume/i.test(line))'
);
content = content.replace(
  '(q === 157 && /^57\\.\\s*When 0\\.01/i.test(line))',
  '(q === 157 && /^57\\s*An organic/i.test(line))'
);
content = content.replace(
  '(q === 158 && /^58\\.\\s*The mass/i.test(line))',
  '(q === 158 && /^58\\.\\s*20mL/i.test(line))'
);
content = content.replace(
  '(q === 191 && /^91\\.\\s*Volume of 0\\.02/i.test(line))',
  '(q === 191 && /^TOL\\.|^191\\./i.test(line))'
);
content = content.replace(
  '(q === 197 && /^""97\\.|97\\.\\s*CaCOs/i.test(line))',
  '(q === 197 && /^"?97\\.\\s*CaCO/i.test(line))'
);
content = content.replace(
  '(q === 211 && /^21\\.\\s*A sample of a metal/i.test(line))',
  '(q === 211 && /^2M\\.|^211\\./i.test(line))'
);

fs.writeFileSync(slicerPath, content);
console.log('Successfully updated slicer.');
