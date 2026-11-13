import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function cropQ62Top() {
  const img = await loadImage('./backend/scripts/biomolecules_q_slices/q_62.png');
  const c = createCanvas(600, 250);
  c.getContext('2d').drawImage(img, 50, 40, 600, 250, 0, 0, 600, 250);
  fs.writeFileSync('./backend/scripts/crop_test/q62_structure.png', c.toBuffer('image/png'));
  console.log('Saved q62_structure.png');
}

cropQ62Top().catch(console.error);

