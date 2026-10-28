import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const images = [
  { name: 'page_90_91.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793164160581.png' },
  { name: 'page_92_93.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793164177241.png' },
  { name: 'page_94_95.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793164188688.png' },
  { name: 'page_96_97.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793164200110.png' }
];

async function rotateAll() {
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const dest = path.join(outDir, `rot_${i + 1}.png`);
    await sharp(img.src).rotate(270).toFile(dest);
    const meta = await sharp(dest).metadata();
    console.log(`Rotated ${img.name} -> rot_${i + 1}.png: ${meta.width}x${meta.height}`);
  }
}

rotateAll().catch(console.error);
