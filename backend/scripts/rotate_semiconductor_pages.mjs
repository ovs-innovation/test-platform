import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outputDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/semiconductor';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = [
  { id: 1, path: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793182226990.png' },
  { id: 2, path: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793182242411.png' },
  { id: 3, path: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793182258665.png' },
  { id: 4, path: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793182275376.png' },
  { id: 5, path: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793182295785.png' }
];

async function processImages() {
  for (const img of images) {
    const rotPath = path.join(outputDir, `semi_rot_${img.id}.png`);
    await sharp(img.path)
      .rotate(270)
      .toFile(rotPath);

    const meta = await sharp(rotPath).metadata();
    console.log(`Rotated image ${img.id}: ${meta.width}x${meta.height}`);

    const midX = Math.floor(meta.width / 2);

    const leftPage = path.join(outputDir, `semi_spread_${img.id}_left.png`);
    const rightPage = path.join(outputDir, `semi_spread_${img.id}_right.png`);

    await sharp(rotPath)
      .extract({ left: 0, top: 0, width: midX, height: meta.height })
      .toFile(leftPage);

    await sharp(rotPath)
      .extract({ left: midX, top: 0, width: meta.width - midX, height: meta.height })
      .toFile(rightPage);

    console.log(`Saved spread ${img.id} left and right pages.`);
  }
}

processImages().catch(console.error);
