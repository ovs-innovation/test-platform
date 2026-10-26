import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/.user_uploaded';
const outDir = path.resolve(__dirname, 'wpe_pages');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = [
  'media_1793014382173.png',
  'media_1793014395947.png',
  'media_1793014410417.png',
  'media_1793014423939.png',
  'media_1793014435351.png'
];

async function run() {
  for (let i = 0; i < files.length; i++) {
    const src = path.join(srcDir, files[i]);
    const out = path.join(outDir, `page_${i + 1}.png`);
    await sharp(src).rotate(270).toFile(out);
    console.log(`Rotated page ${i + 1} to ${out}`);
  }
}

run().catch(console.error);
