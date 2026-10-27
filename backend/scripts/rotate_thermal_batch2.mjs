import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkAndRotate() {
  const dir = path.resolve(__dirname, 'thermal_pages_batch2');
  fs.mkdirSync(dir, { recursive: true });

  const uploads = [
    'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded/media_1793073141721.png',
    'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded/media_1793073169984.png',
    'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded/media_1793073184872.png',
    'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded/media_1793073206410.png',
    'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded/media_1793073224495.png',
  ];

  for (let i = 0; i < uploads.length; i++) {
    const meta = await sharp(uploads[i]).metadata();
    console.log(`Image ${i + 1}: ${meta.width}x${meta.height}`);
    await sharp(uploads[i]).rotate(270).toFile(path.join(dir, `page_${i + 1}_rot270.png`));
  }
  console.log('All 5 pages rotated and saved in scripts/thermal_pages_batch2/');
}

checkAndRotate().catch(console.error);
