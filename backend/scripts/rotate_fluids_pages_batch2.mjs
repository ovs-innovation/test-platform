import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, 'fluids_pages_batch2');
fs.mkdirSync(outDir, { recursive: true });

const srcDir = 'C:\\Users\\rs004\\.gemini\\antigravity-ide\\brain\\d5ca2a07-dcd1-40f5-92f2-f44308e59fc5\\.tempmediaStorage';

const files = [
  { src: 'media_1793032237328.png', name: 'page_6.png' },
  { src: 'media_1793032253432.png', name: 'page_7.png' },
  { src: 'media_1793032275657.png', name: 'page_8.png' },
  { src: 'media_1793032295527.png', name: 'page_9.png' },
  { src: 'media_1793032329333.png', name: 'page_10.png' }
];

async function rotatePages() {
  for (const f of files) {
    const srcPath = path.join(srcDir, f.src);
    const destPath = path.join(outDir, f.name);
    await sharp(srcPath).rotate(270).toFile(destPath);
    console.log(`Rotated ${f.src} -> ${destPath}`);
  }
}

rotatePages().catch(console.error);
