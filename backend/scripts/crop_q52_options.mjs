import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function cropQ52Options() {
  const img = await loadImage('./backend/scripts/biomolecules_q_slices/q_52.png');
  console.log(`Q52 size: ${img.width} x ${img.height}`);
  const cAll = createCanvas(img.width - 100, 850);
  cAll.getContext('2d').drawImage(img, 50, 90, img.width - 100, 850, 0, 0, img.width - 100, 850);
  fs.writeFileSync('./backend/scripts/crop_test/q52_options_all.png', cAll.toBuffer('image/png'));
  console.log('Saved q52_options_all.png');
}

cropQ52Options().catch(console.error);

