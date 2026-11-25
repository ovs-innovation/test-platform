import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Let's get the metadata of page_079.png
async function inspect() {
  const p79 = path.resolve(__dirname, 'basic_chem_pages/page_079.png');
  const meta = await sharp(p79).metadata();
  console.log(`Page 79 dimensions: ${meta.width} x ${meta.height}`);
}

inspect().catch(console.error);
