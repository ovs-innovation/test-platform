import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function cropQ22() {
  const img = await loadImage('./backend/scripts/biomolecules_q_slices/q_22.png');
  // Aldoses are shown below the question text and above the options
  // Let's create an exact crop of the 4 aldoses diagram
  // Question text is at the top (~80px).
  // Aldoses are between y: 90 and y: 550, width ~ 850
  const c = createCanvas(850, 480);
  c.getContext('2d').drawImage(img, 60, 90, 850, 480, 0, 0, 850, 480);
  fs.writeFileSync('./backend/scripts/crop_test/q22_aldoses_clean.png', c.toBuffer('image/png'));
  console.log('Saved q22_aldoses_clean.png');
}

cropQ22().catch(console.error);

