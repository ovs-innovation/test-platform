import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userUploadDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.user_uploaded';
const outDir = path.resolve(__dirname, 'thermal_pages_batch3');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const file1 = 'media_1793074592814.png';
  const file2 = 'media_1793074674675.png';

  for (const f of [file1, file2]) {
    const filePath = path.join(userUploadDir, f);
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      continue;
    }
    const meta = await sharp(filePath).metadata();
    console.log(f, 'dimensions:', meta.width, 'x', meta.height);
    await sharp(filePath).rotate(270).toFile(path.join(outDir, f.replace('.png', '_rot270.png')));
    await sharp(filePath).rotate(90).toFile(path.join(outDir, f.replace('.png', '_rot90.png')));
    console.log('Successfully rotated', f);
  }
}

run().catch(console.error);
