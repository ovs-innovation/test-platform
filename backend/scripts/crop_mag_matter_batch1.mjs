import sharp from 'sharp';
import path from 'path';

const src = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter/rot_1.png';
const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter';

async function cropDetails() {
  const meta = await sharp(src).metadata();
  console.log('Image dimensions:', meta.width, meta.height);

  // Q16 is middle-right
  // Q17 is top-right
  // Q19 is lower-right
  // Q20 is bottom-right
  await sharp(src).extract({ left: Math.floor(meta.width * 0.45), top: Math.floor(meta.height * 0.5), width: Math.floor(meta.width * 0.28), height: Math.floor(meta.height * 0.35) })
    .toFile(path.join(outDir, 'crop_q16.png'));

  await sharp(src).extract({ left: Math.floor(meta.width * 0.7), top: 0, width: Math.floor(meta.width * 0.3), height: Math.floor(meta.height * 0.4) })
    .toFile(path.join(outDir, 'crop_q17.png'));

  await sharp(src).extract({ left: Math.floor(meta.width * 0.7), top: Math.floor(meta.height * 0.45), width: Math.floor(meta.width * 0.3), height: Math.floor(meta.height * 0.55) })
    .toFile(path.join(outDir, 'crop_q19_20.png'));

  console.log('Crops generated.');
}

cropDetails().catch(console.error);
