import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { P3_CORRECTIONS_201_250 } from './apply_p3_corrections_201_250.mjs';
import { P3_CORRECTIONS_251_300 } from './apply_p3_corrections_251_300.mjs';

const combinedP3 = {
  ...P3_CORRECTIONS_201_250,
  ...P3_CORRECTIONS_251_300
};

const keys = Object.keys(combinedP3).map(Number).sort((a,b)=>a-b);
console.log('Total questions in Part 3:', keys.length, 'from', keys[0], 'to', keys[keys.length-1]);

fs.writeFileSync(
  path.resolve(__dirname, 'clean_electro_part3.mjs'),
  `export const ELECTRO_PART3_OVERRIDES = ${JSON.stringify(combinedP3, null, 2)};\n`
);
console.log('Successfully wrote clean_electro_part3.mjs!');
