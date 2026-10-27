import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, 'waves_pages');
fs.mkdirSync(outDir, { recursive: true });

const srcDir = 'C:\\Users\\rs004\\.gemini\\antigravity-ide\\brain\\d5ca2a07-dcd1-40f5-92f2-f44308e59fc5\\.user_uploaded';

const files = [
  { src: 'media_1793035338039.png', name: 'page_1.png' },
  { src: 'media_1793035358070.png', name: 'page_2.png' },
  { src: 'media_1793035385641.png', name: 'page_3.png' },
  { src: 'media_1793035401878.png', name: 'page_4.png' },
  { src: 'media_1793035418310.png', name: 'page_5.png' }
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
