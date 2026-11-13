import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function cropQ62Bond() {
  const page15 = await loadImage('./backend/scripts/biomolecules_pages/page_15.png');
  // Q62 is on page 15, y: 615 to y: 1350
  // Between y: 640 and y: 910 is the peptide bond diagram!
  const c1 = createCanvas(600, 260);
  c1.getContext('2d').drawImage(page15, 60, 650, 600, 260, 0, 0, 600, 260);
  fs.writeFileSync('./backend/scripts/crop_test/q62_bond.png', c1.toBuffer('image/png'));

  // Between y: 1000 and y: 1240 is the group in option (B)!
  const c2 = createCanvas(600, 240);
  c2.getContext('2d').drawImage(page15, 60, 1000, 600, 240, 0, 0, 600, 240);
  fs.writeFileSync('./backend/scripts/crop_test/q62_group.png', c2.toBuffer('image/png'));
  console.log('Saved q62_bond.png and q62_group.png');
}

cropQ62Bond().catch(console.error);

