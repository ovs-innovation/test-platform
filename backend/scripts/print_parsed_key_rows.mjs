import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rows = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_key_rows_parsed.json'), 'utf8'));

console.log('Total rows parsed:', rows.length);
rows.forEach(r => {
  console.log(`R${r.row} (Q${r.qStart}..Q${r.qEnd}): ${r.text}`);
});
