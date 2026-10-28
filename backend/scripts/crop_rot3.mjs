import sharp from 'sharp';
import path from 'path';

const scratch = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi_batch6';
const src = path.join(scratch, 'rot_3.png');

async function cropColumns() {
  const meta = await sharp(src).metadata();
  console.log('rot_3 meta:', meta.width, meta.height);
  // rot_3 has pages 112 and 113.
  // Page 112: left half (x: 0 to 325)
  // Page 113: right half (x: 320 to 645)
  await sharp(src).extract({ left: 0, top: 0, width: 330, height: meta.height }).toFile(path.join(scratch, 'p112.png'));
  await sharp(src).extract({ left: 320, top: 0, width: meta.width - 320, height: meta.height }).toFile(path.join(scratch, 'p113.png'));
  console.log('Cropped p112 and p113');
}

cropColumns().catch(console.error);
