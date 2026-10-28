import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi_batch6';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const images = [
  { name: 'raw_1.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793171520491.png' },
  { name: 'raw_2.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793171537913.png' },
  { name: 'raw_3.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793171562233.png' },
  { name: 'raw_4.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793171573947.png' }
];

async function rotateAll() {
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const dest = path.join(outDir, `rot_${i + 1}.png`);
    // Check orientation: let's rotate 270 (or 90) depending on original
    await sharp(img.src).rotate(270).toFile(dest);
    const meta = await sharp(dest).metadata();
    console.log(`Rotated rot_${i + 1}.png: ${meta.width}x${meta.height}`);
  }
}

rotateAll().catch(console.error);
