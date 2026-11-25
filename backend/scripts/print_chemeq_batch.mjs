import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chemeq_raw_blocks.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chemeq_official_keys.json'), 'utf8'));

const startQ = parseInt(process.argv[2] || '1', 10);
const endQ = parseInt(process.argv[3] || '10', 10);

for (let i = startQ; i <= endQ; i++) {
  const block = raw[String(i)];
  console.log(`\n==================== Q${i} (Page ${block?.page}, Key: ${keys[String(i)]}) ====================`);
  console.log(block?.text);
}
