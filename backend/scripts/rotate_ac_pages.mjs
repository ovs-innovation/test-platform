import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/ac';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const images = [
  { name: 'ac_rot_1.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793174003674.png' },
  { name: 'ac_rot_2.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793174026685.png' },
  { name: 'ac_rot_3.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793174042417.png' },
  { name: 'ac_rot_4.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793174064428.png' },
  { name: 'ac_rot_5.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793174083654.png' }
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
