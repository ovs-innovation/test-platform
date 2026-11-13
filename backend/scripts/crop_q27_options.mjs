import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function cropQ27Options() {
  const img = await loadImage('./backend/scripts/biomolecules_q_slices/q_27.png');
  console.log(`Q27 size: ${img.width} x ${img.height}`);
  // Let's crop options A, B, C, D
  // In Q27, let's see where (A), (B), (C), (D) are located.
  // We can also crop all options together as an image or individually.
  const cAll = createCanvas(img.width - 100, 850);
  cAll.getContext('2d').drawImage(img, 50, 90, img.width - 100, 850, 0, 0, img.width - 100, 850);
  fs.writeFileSync('./backend/scripts/crop_test/q27_options_all.png', cAll.toBuffer('image/png'));
  console.log('Saved q27_options_all.png');
}

cropQ27Options().catch(console.error);

