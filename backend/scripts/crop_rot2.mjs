import sharp from 'sharp';
import path from 'path';

const scratch = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi_batch6';
const src = path.join(scratch, 'rot_2.png');

async function cropColumns() {
  const meta = await sharp(src).metadata();
  console.log('rot_2 meta:', meta.width, meta.height);
  // rot_2 has pages 110 and 111.
  // Page 110: left half (x: 0 to 320)
  // Page 111: right half (x: 310 to 632)
  await sharp(src).extract({ left: 0, top: 0, width: 320, height: meta.height }).toFile(path.join(scratch, 'p110.png'));
  await sharp(src).extract({ left: 310, top: 0, width: meta.width - 310, height: meta.height }).toFile(path.join(scratch, 'p111.png'));
  console.log('Cropped p110 and p111');
}

cropColumns().catch(console.error);
