import sharp from 'sharp';
import path from 'path';

const src = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter/rot_3.png';
const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter';

async function cropBatch3() {
  const meta = await sharp(src).metadata();
  console.log('Rot 3 dims:', meta.width, meta.height);

  // Q47 is middle-left
  await sharp(src).extract({
    left: 0,
    top: Math.floor(meta.height * 0.28),
    width: Math.floor(meta.width * 0.26),
    height: Math.floor(meta.height * 0.32)
  }).toFile(path.join(outDir, 'crop_q47.png'));

  // Q48 is lower-left
  await sharp(src).extract({
    left: 0,
    top: Math.floor(meta.height * 0.60),
    width: Math.floor(meta.width * 0.26),
    height: Math.floor(meta.height * 0.32)
  }).toFile(path.join(outDir, 'crop_q48.png'));

  console.log('Batch 3 crops done.');
}

cropBatch3().catch(console.error);
