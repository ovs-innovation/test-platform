import sharp from 'sharp';
import path from 'path';

const scratch = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi_batch6';
const src = path.join(scratch, 'rot_1.png');

async function cropColumns() {
  const meta = await sharp(src).metadata();
  console.log('rot_1 meta:', meta.width, meta.height);
  // rot_1 has 3 columns:
  // Col 1: x from 0 to 215
  // Col 2: x from 210 to 425
  // Col 3: x from 420 to 637
  await sharp(src).extract({ left: 0, top: 0, width: 220, height: meta.height }).toFile(path.join(scratch, 'col1.png'));
  await sharp(src).extract({ left: 215, top: 0, width: 215, height: meta.height }).toFile(path.join(scratch, 'col2.png'));
  await sharp(src).extract({ left: 425, top: 0, width: meta.width - 425, height: meta.height }).toFile(path.join(scratch, 'col3.png'));
  console.log('Cropped 3 columns');
}

cropColumns().catch(console.error);
