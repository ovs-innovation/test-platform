import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, 'waves_pages_batch2');
fs.mkdirSync(outDir, { recursive: true });

const srcDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded';

const files = [
  { src: 'media_1793069328432.png', name: 'page_1_rot270.png' },
  { src: 'media_1793069328470.png', name: 'page_2_rot270.png' },
  { src: 'media_1793069328483.png', name: 'page_3_rot270.png' },
  { src: 'media_1793069328497.png', name: 'page_4_rot270.png' },
  { src: 'media_1793069328512.png', name: 'page_5_rot270.png' }
];

async function rotatePages() {
  for (const f of files) {
    const srcPath = path.join(srcDir, f.src);
    const destPath = path.join(outDir, f.name);
    await sharp(srcPath).rotate(270).toFile(destPath);
    console.log(`Rotated 270: ${f.src} -> ${destPath}`);
  }
}

rotatePages().catch(console.error);
