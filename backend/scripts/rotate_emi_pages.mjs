import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const images = [
  { name: 'rot_1.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793166610925.png' },
  { name: 'rot_2.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793166627099.png' },
  { name: 'rot_3.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793166654209.png' },
  { name: 'rot_4.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793166673539.png' },
  { name: 'rot_5.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793166696981.png' }
];

async function rotateAll() {
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const dest = path.join(outDir, img.name);
    await sharp(img.src).rotate(270).toFile(dest);
    const meta = await sharp(dest).metadata();
    console.log(`Rotated ${img.name}: ${meta.width}x${meta.height}`);
  }
}

rotateAll().catch(console.error);
