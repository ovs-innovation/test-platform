import sharp from 'sharp';
import path from 'path';

const src = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter/rot_2.png';
const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter';

async function cropBatch2() {
  const meta = await sharp(src).metadata();
  console.log('Rot 2 dims:', meta.width, meta.height);

  // Q30 is middle-left / lower-left
  await sharp(src).extract({
    left: Math.floor(meta.width * 0.28),
    top: Math.floor(meta.height * 0.38),
    width: Math.floor(meta.width * 0.22),
    height: Math.floor(meta.height * 0.28)
  }).toFile(path.join(outDir, 'crop_q30.png'));

  // Q32 is bottom-left
  await sharp(src).extract({
    left: Math.floor(meta.width * 0.26),
    top: Math.floor(meta.height * 0.72),
    width: Math.floor(meta.width * 0.24),
    height: Math.floor(meta.height * 0.28)
  }).toFile(path.join(outDir, 'crop_q32.png'));

  // Q35 is middle-right
  await sharp(src).extract({
    left: Math.floor(meta.width * 0.48),
    top: Math.floor(meta.height * 0.43),
    width: Math.floor(meta.width * 0.26),
    height: Math.floor(meta.height * 0.25)
  }).toFile(path.join(outDir, 'crop_q35.png'));

  console.log('Batch 2 crops done.');
}

cropBatch2().catch(console.error);
