import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userUploads = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded';
const scratch = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag';
if (!fs.existsSync(scratch)) fs.mkdirSync(scratch, { recursive: true });

const files = [
  'media_1793155750438.png',
  'media_1793155767092.png',
  'media_1793155780074.png',
  'media_1793155793317.png',
  'media_1793155812257.png'
];

async function processAll() {
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const inPath = path.join(userUploads, f);
    const meta = await sharp(inPath).metadata();
    console.log(f, 'Width:', meta.width, 'Height:', meta.height);
    // Rotate 270 degrees to be right-side up
    await sharp(inPath).rotate(270).toFile(path.join(scratch, `rot_${i + 1}.png`));
    console.log(`Saved rot_${i + 1}.png`);
  }
}

processAll().catch(console.error);
