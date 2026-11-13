import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function testCropQ6() {
  const pageImg = await loadImage('./backend/scripts/hydrocarbons_pages/page_5.png');

  const crops = [
    { name: 'test_q6_opt_a.png', x: 110, y: 250, w: 450, h: 210 },
    { name: 'test_q6_opt_b.png', x: 110, y: 475, w: 450, h: 210 },
    { name: 'test_q6_opt_c.png', x: 110, y: 695, w: 450, h: 210 },
    { name: 'test_q6_opt_d.png', x: 110, y: 920, w: 450, h: 210 }
  ];

  for (const c of crops) {
    const canvas = createCanvas(c.w, c.h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImg, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
    fs.writeFileSync(`./backend/scripts/${c.name}`, canvas.toBuffer('image/png'));
    console.log(`Saved ${c.name}`);
  }
}

testCropQ6().catch(console.error);

