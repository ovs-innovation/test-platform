import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'basic_chem_pages');
const outDir = path.resolve(__dirname, 'basic_chem_diagrams');

async function inspectAllCandidates() {
  const pages = [31, 33, 41, 44, 45, 66];
  for (const p of pages) {
    const pad = String(p).padStart(3, '0');
    const pPath = path.resolve(pagesDir, `page_${pad}.png`);
    await sharp(pPath)
      .resize(800, null)
      .toFile(path.join(outDir, `page_${pad}_overview.png`));
  }
  console.log('Saved overviews for pages:', pages);
}

inspectAllCandidates().catch(console.error);
