import sharp from 'sharp';
import path from 'path';

const src = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter/rot_1.png';
const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter';

async function cropQ16Full() {
  const meta = await sharp(src).metadata();
  // Q16 is at left ~47% to 75%, top ~52% to 100%
  await sharp(src).extract({
    left: Math.floor(meta.width * 0.46),
    top: Math.floor(meta.height * 0.52),
    width: Math.floor(meta.width * 0.28),
    height: Math.floor(meta.height * 0.47)
  }).toFile(path.join(outDir, 'crop_q16_full.png'));
  console.log('Q16 full crop done.');
}

cropQ16Full().catch(console.error);
