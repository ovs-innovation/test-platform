import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function cropQ8() {
  const pos = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_q_positions.json', 'utf8')).find(p => p.qNum === 8);
  const pageImg = await loadImage(`./backend/scripts/hydrocarbons_pages/page_${pos.pageNum}.png`);

  const c = createCanvas(900, 340);
  const ctx = c.getContext('2d');
  ctx.drawImage(pageImg, 60, 240, 900, 340, 0, 0, 900, 340);
  fs.writeFileSync('./backend/uploads/hydrocarbons/q8_diag.png', c.toBuffer('image/png'));
  console.log('Saved q8_diag.png');
}

cropQ8().catch(console.error);

