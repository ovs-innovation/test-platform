import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function main() {
  const p16 = await loadImage('./backend/scripts/organic_pages/page_16.png');
  const c = createCanvas(550, 400);
  const ctx = c.getContext('2d');
  // Q38 is from y=1680 to 2200 on 2x image
  ctx.drawImage(p16, 50, 840 * 2, 550, 400, 0, 0, 550, 400);
  fs.writeFileSync('./backend/uploads/organic_chemistry/q38_diag.png', c.toBuffer('image/png'));
  console.log('Saved q38_diag.png');
}

main().catch(console.error);

