import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function cropQ62() {
  const page14 = await loadImage('./backend/scripts/biomolecules_pages/page_14.png');
  // Q62 is on page 14. Let's crop from y: 600 to y: 1320
  const c = createCanvas(page14.width, 750);
  c.getContext('2d').drawImage(page14, 0, 590, page14.width, 750, 0, 0, page14.width, 750);
  fs.writeFileSync('./backend/scripts/crop_test/q62_detail.png', c.toBuffer('image/png'));
  console.log('Saved q62_detail.png');
}

cropQ62().catch(console.error);

