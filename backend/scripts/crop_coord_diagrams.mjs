import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const uploadsDir = './backend/uploads/coordination_compounds';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

async function cropDiagrams() {
  // 1. Q62 diagram on page 14
  // Page 14 img: Q62 is between y=520 and y=1030
  // Let's crop the dimethylglyoxime formula box
  const img14 = await loadImage('./backend/scripts/coord_pages/page_14.png');
  // Crop around dimethylglyoxime formula
  // In page 14: y approx 580 to 760, x approx 70 to 880
  const c62 = createCanvas(840, 200);
  const ctx62 = c62.getContext('2d');
  ctx62.drawImage(img14, 70, 580, 840, 200, 0, 0, 840, 200);
  fs.writeFileSync(path.join(uploadsDir, 'q62_diagram.png'), c62.toBuffer('image/png'));
  console.log('Saved q62_diagram.png');

  // 2. Q93 option diagrams on page 20
  // In page 20: Q93 is between y=150 and y=1140
  // Option (A): y=200 to 420
  // Option (B): y=430 to 650
  // Option (C): y=660 to 880
  // Option (D): y=890 to 1110
  const img20 = await loadImage('./backend/scripts/coord_pages/page_20.png');

  const optSpecs = [
    { key: 'a', y: 200, h: 220 },
    { key: 'b', y: 430, h: 220 },
    { key: 'c', y: 660, h: 220 },
    { key: 'd', y: 890, h: 220 },
  ];

  for (const opt of optSpecs) {
    const c = createCanvas(400, opt.h);
    const ctx = c.getContext('2d');
    ctx.drawImage(img20, 100, opt.y, 400, opt.h, 0, 0, 400, opt.h);
    fs.writeFileSync(path.join(uploadsDir, `q93_opt_${opt.key}.png`), c.toBuffer('image/png'));
    console.log(`Saved q93_opt_${opt.key}.png`);
  }
}

cropDiagrams().catch(console.error);

