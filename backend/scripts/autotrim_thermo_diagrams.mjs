import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR = path.resolve(__dirname, 'thermo_diagrams');

async function trimAll() {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.png'));
  console.log(`Trimming ${files.length} diagrams...`);

  for (const f of files) {
    const full = path.join(DIR, f);
    const buf = fs.readFileSync(full);
    try {
      const trimmed = await sharp(buf).trim().toBuffer();
      fs.writeFileSync(full, trimmed);
      console.log(`Trimmed ${f}`);
    } catch (e) {
      console.warn(`Trim warning for ${f}:`, e.message);
    }
  }
  console.log('All diagrams trimmed!');
}

trimAll().catch(console.error);
