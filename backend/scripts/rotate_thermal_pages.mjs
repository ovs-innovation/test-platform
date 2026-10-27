import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, 'thermal_pages');
fs.mkdirSync(outDir, { recursive: true });

const srcDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded';

const files = [
  { src: 'media_1793070840142.png', name: 'page_1_rot270.png' },
  { src: 'media_1793070870456.png', name: 'page_2_rot270.png' },
  { src: 'media_1793070890399.png', name: 'page_3_rot270.png' },
  { src: 'media_1793070905076.png', name: 'page_4_rot270.png' },
  { src: 'media_1793070926229.png', name: 'page_5_rot270.png' }
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
