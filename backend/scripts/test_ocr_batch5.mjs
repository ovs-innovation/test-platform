import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMG5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689988274_c316d297.jpg';

async function main() {
  const meta = await sharp(IMG5).metadata();
  console.log('Original img5 meta:', meta.width, 'x', meta.height);
}

main().catch(console.error);
