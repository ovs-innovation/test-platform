import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_clean_diagram_urls.json'), 'utf8'));

console.log('Total URLs in electrostatics_clean_diagram_urls.json:', Object.keys(urls).length);
for (const [k, v] of Object.entries(urls)) {
  console.log(`${k} -> ${v}`);
}
